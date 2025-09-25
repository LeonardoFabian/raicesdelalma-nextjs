import { initialData } from './seed';
import 'dotenv/config'
import { Prisma } from '@prisma/client'
import prisma from '../lib/prisma';
import * as bcrypt from "bcryptjs"


const d = (v: string | number) => new Prisma.Decimal(v)

// ------------------------------
// Borrado en orden seguro
// (ajusta según tus modelos existentes)
// ------------------------------
async function cleanDatabase() {
    // Limpieza en orden seguro (hijos -> padres)
    await prisma.giftMessageView.deleteMany();
    await prisma.giftMessage.deleteMany();
    await prisma.wishlist.deleteMany();
    await prisma.businessHour.deleteMany();
    await prisma.socialLink.deleteMany();
    await prisma.businessSettings.deleteMany();
    await prisma.grossReceiptsLog.deleteMany();
    await prisma.orderAddress.deleteMany();
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.userAddress.deleteMany();
    await prisma.country.deleteMany();
    await prisma.productOptionGroup.deleteMany();
    await prisma.optionItem.deleteMany();
    await prisma.optionGroup.deleteMany();

    await prisma.productComponent.deleteMany();
    await prisma.productSize.deleteMany();

    await prisma.purchaseItem?.deleteMany(); // si existe
    await prisma.purchase?.deleteMany();     // si existe

    await prisma.media?.deleteMany();        // si tu Media referencia Product

    await prisma.accessory?.deleteMany();    // si existe
    await prisma.supplier?.deleteMany();     // si existe

    await prisma.product.deleteMany();
    await prisma.size.deleteMany();
    await prisma.category.deleteMany();

    // NextAuth (si está en tu schema)
    await prisma.verificationToken?.deleteMany();
    await prisma.session?.deleteMany();
    await prisma.account?.deleteMany();

    await prisma.user.deleteMany();
}

async function main() {
    console.log('Cleaning database...');
    await cleanDatabase();

    console.log('🌍 Creating countries...')
    await prisma.country.createMany({
      data: initialData.countries
    });
    
    console.log('👤 Creando usuario admin…')
    await prisma.user.createMany({
        data: initialData.users.map(u => ({
          ...u,        
          email: u.email,
          password: bcrypt.hashSync(u.password),
          role: u.role,
          name: u.name,
          isActive: true        
        }))
    });

    const user = await prisma.user.findFirst({
      where: { role: 'admin' }
    });

    if(!user) {
      throw new Error('Admin user not found')
    }

    console.log('🏢 Creando configuración de negocio (BusinessSettings)…');

    const businessSettings = await prisma.businessSettings.create({
      data: {
        id: 'default', // porque el modelo usa @id como string fijo
        businessName: 'Purple Butterfly Bouquets',
        email: 'info@purplebutterflybouquets.com',
        phone: '+1 302 682 5779',
        website: 'https://purplebutterflybouquets.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    });

    console.log('🔗 Creando enlaces de redes sociales…');
    await prisma.socialLink.createMany({
      data: initialData.socialLinks.map((link) => ({
        ...link,
        settingsId: businessSettings.id
      }))
    });

    // creating business hours
    console.log('🕒 Creando los horarios...');
    await prisma.businessHour.createMany({
      data: initialData.businessHours.map((h) => ({
        ...h,
        settingsId: businessSettings.id
      }))
    });

    console.log('🏷️ Creando categorías…')
    await prisma.category.createMany({
        data: initialData.categories.map(c => ({
            ...c,
            userId: user.id
        }))
    });

    // Categories
    
    const dbCategories = await prisma.category.findMany({ where: { userId: user.id }})
    //   const categoryBySlug = new Map(dbCategories.map(c => [c.slug, c.id]))
    const categoriesMap = dbCategories.reduce((map, category) => {
        map[category.slug.toLowerCase()] = category.id;
        return map;
    }, {} as Record<string, string>); // <string=title, categoryId>

    // Sizes

    console.log('📏 Creando tallas…')
    await prisma.size.createMany({
        data: initialData.sizes.map(s => ({ ...s, userId: user.id })),
        skipDuplicates: true
    })

    const dbSizes = await prisma.size.findMany({ where: { userId: user.id }})
      const sizeByLabel = new Map(dbSizes.map(s => [s.label, s.id]));
    // const sizeByLabel = dbSizes.reduce((map, size) => {
    // map[size.label.toLowerCase()] = size.id;
    // return map;
    // }, {} as Record<string, number>);

    // Products

    console.log('🛍️ Creando productos…')
    const createdProducts: { 
        product: { id: string; slug: string }, 
        sizesConnect: { label: string }[] 
    }[] = []

    for (const p of initialData.products) {
  const { images, categorySlug, productSizes, ...rest } = p;

  // return the Category ID o category[slug] = ID
  const categoryId = categoriesMap[categorySlug.toLowerCase()];
  if (!categoryId) {
    console.warn(`⚠️ Category "${categorySlug}" no existe. Saltando "${p.title}".`);
    continue;
  }

  const dbProduct = await prisma.product.create({
    data: {
      ...rest,
      categoryId,
      userId: user.id,
    },
    select: { id: true, slug: true },
  });

  const sizesConnect = productSizes?.connect ?? [];
  createdProducts.push({ product: dbProduct, sizesConnect });

  const imagesData = images.map((image) => ({
    url: image,
    productId: dbProduct.id,
  }));

  if (imagesData.length) {
    await prisma.media?.createMany?.({ data: imagesData });
  }
}
    // Product Size

    console.log('🔗 Creando pivote ProductSize…')
    for (const { product, sizesConnect } of createdProducts) {
        if (!sizesConnect || sizesConnect.length === 0) continue

        const sizeIds = sizesConnect
        .map(s => sizeByLabel.get(s.label))
        .filter(Boolean) as number[]

        if (sizeIds.length === 0) continue

        await prisma.productSize.createMany({
        data: sizeIds.map(sizeId => ({
            productId: product.id,
            sizeId,
            stock: 10,
            extraPrice: 6.99,
        })),
        skipDuplicates: true
        })
    }

  // ------------------------------
  // Extras: supplier / accessory / purchase
  // ------------------------------
  console.log('📦 Creando proveedor + accesorio ejemplo…')
  const supplier = await (prisma as any).supplier?.upsert?.({
    where: { name: 'PaperCo Delaware' },
    create: { name: 'PaperCo Delaware', email: 'sales@paperco.com', userId: user.id },
    update: {}
  })
  const ribbon = await (prisma as any).accessory?.upsert?.({
    where: { sku: 'RIB-PUR-1' },
    create: {
      name: 'Purple Satin Ribbon 1in',
      sku: 'RIB-PUR-1',
      type: 'Wrap',
      unit: 'roll',
      defaultCost: d('2.50'),
      defaultPrice: d('4.00'),
      stockQty: 10,
      supplierId: supplier?.id,
      userId: user.id
    },
    update: { supplierId: supplier?.id, userId: user.id }
  })

  if (supplier && ribbon) {
    console.log('🧾 Registrando compra de ejemplo…')
    const purchase = await (prisma as any).purchase?.create?.({
      data: {
        supplierId: supplier.id,
        invoiceNumber: 'INV-2025-0012',
        invoicePhoto: 'https://example-cdn.com/invoices/invoice-0012.jpg',
        userId: user.id,
        items: {
          create: [
            { accessoryId: ribbon.id, quantity: 5, unitCost: d('2.30'), lineTotal: d('11.50') }
          ]
        }
      }
    })
    await (prisma as any).accessory?.update?.({
      where: { id: ribbon.id },
      data: { stockQty: { increment: 5 } }
    })

    // BOM para un producto de ejemplo
    const target = createdProducts.find(p => p.product.slug === 'coffee-and-roses-deluxe') ?? createdProducts[0]
    if (target?.product?.id) {
      await prisma.productComponent.createMany({
        data: [{ productId: target.product.id, accessoryId: ribbon.id, quantity: d('0.20') }],
        skipDuplicates: true
      })
    }

    // ------------------------------
    // Extras: Option Groups / Items
    // ------------------------------
    console.log('⚙️ Creando Option Groups / Items (configurador)…')
    // Nota: si no tienes unique para title+userId, este truco con create+upsert te evita conflictos
    const ogId = (await prisma.optionGroup.create({
      data: {
        title: 'Coffee Type',
        description: 'Choose the coffee style',
        isRequired: true,
        minSelect: 1,
        maxSelect: 1,
        sortOrder: 1,
        userId: user.id
      }
    })).id

    const coffeeType = await prisma.optionGroup.upsert({
      where: { id: ogId },
      create: {
        title: 'Coffee Type',
        description: 'Choose the coffee style',
        isRequired: true,
        minSelect: 1,
        maxSelect: 1,
        sortOrder: 1,
        userId: user.id
      },
      update: {}
    })

    await prisma.optionItem.createMany({
      data: [
        { groupId: coffeeType.id, name: 'Americano', extraPrice: d('0.00'), isActive: true, sortOrder: 1 },
        { groupId: coffeeType.id, name: 'Latte', extraPrice: d('1.50'), isActive: true, sortOrder: 2 },
        { groupId: coffeeType.id, name: 'Mocha', extraPrice: d('2.00'), isActive: true, sortOrder: 3 }
      ],
      skipDuplicates: true
    })

    const mugGroup = await prisma.optionGroup.create({
      data: {
        title: 'Mug Type',
        description: 'Pick a mug',
        isRequired: false,
        minSelect: 0,
        maxSelect: 1,
        sortOrder: 2,
        userId: user.id
      }
    })
    await prisma.optionItem.createMany({
      data: [
        { groupId: mugGroup.id, name: 'Standard Mug', extraPrice: d('0.00'), isActive: true, sortOrder: 1 },
        { groupId: mugGroup.id, name: 'Purple Ceramic Mug', extraPrice: d('3.50'), isActive: true, sortOrder: 2 }
      ]
    })

    if (target?.product?.id) {
      await prisma.productOptionGroup.createMany({
        data: [
          { productId: target.product.id, groupId: coffeeType.id },
          { productId: target.product.id, groupId: mugGroup.id }
        ],
        skipDuplicates: true
      })
    }
  }

  console.log('✅ Seed execute!!!')    

}

(() => {

    if (process.env.NODE_ENV === 'production') return;

    main();
})();