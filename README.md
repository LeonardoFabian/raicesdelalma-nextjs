# Development

## Getting Started

1. Abrir una terminal (consola)
2. Si no tienes Node Version Manager (NVM), instalarlo.
3. Utilizar el Node Version Manager (NVM) para establecer la versión de Node a utilizar, en este caso `nvm use 20.12.2`

## Levantando el proyecto

Previamente debes tener docker instalado y configurado en tu dispositivo...

1. Abre una terminal para ejecutar el siguiente comando para levantar la base de datos

```sh
docker compose up -d

```

## Levantar el proyecto (desde cero)

1. Clonar el repositorio
2. Crear una copia de .env.template y renombrarlo a .env
3. Reemplazar las variables de entorno
4. Abrir Docker Desktop y levantar el contenedor de Docker desde cero

   * Apaga y elimina los volumenes: `docker compose down -v`
   * Borra la carpeta ./postgres si existe: `rm -rf ./postgres`
   * Levantar el contenedor con las nuevas variables (.env): `docker compose up -d --remove-orphans`
   * Revisar los logs: `docker logs [container_name]`

5. Instalar Prisma `npm install prisma --save-dev`
6. Inicializar Prisma con el proveedor que estes utilizando: `npx prisma init --datasource-provider PostgreSQL`
7. Establecer DATABASE_URL de Prisma para conectar con la DB en el .env `DATABASE_URL="postgresql://user:pass@localhost:5432/database"`
8. Siga las instrucciones de la seccion "Comandos de Prisma"
9. Ejecuta las migraciones `npx prisma migrate dev --name NombreDeLaMigracion`
10. Ejecutar el comando `npm install`
11. Ejecutar el comando `npm run dev`
12. Ejecutar las migraciones de prisma `npx prisma migrate dev`
13. Genera el cliente de prisma `npx prisma generate`
14. Ejecutar el SEED mediante el script `npm run seed` o tambien llamando al endpoint `localhost:3000/api/seed`

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Generate Email templates

* Put your email template using mjml in src/emails folder, for more info visit [MJML](https://documentation.mjml.io/)
* Open your terminal
* Run the following command: `npm run build:emails`. NOTE: you need to have multiple files in the src/emails folder.
* This generate an html email template in `src/lib/templates/emails/` folder

Try it live in: [MJML TRY IT LIVE](https://mjml.io/try-it-live/intro)

### Check Updates (update project)

1. install global [npm-check-updates](https://www.npmjs.com/package/npm-check-updates): `npm install -g npm-check-updates`
2. Open the terminal
3. Go to your project root folder
4. Execute the command: `ncu`
5. If your packages has an update, execute: `ncu -u` o `ncu --upgrade`
6. Rebuild project modules: `npm i` o `npm install`

Ajustar TailwindCSS para trabajar con Next 15:

1. Open the terminal
2. Go to your project folder
3. Execute the command: `npm i -D @tailwindcss/postcss tailwindcss postcss`
4. Update postcss.config.{js, cjs, mjs, ts} to use the new plugin:

* Remove:
   `tailwindcss` and `autoprefixer` and put:

```js
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};

```

5. Delete the cache: `rm -rf .next node_modules`
6. Install dependencies `npm install`
7. Execute the project `npm run dev`

## Visualize how your app looks on share

* In Development you can use ngrock: `https://ngrok.com`
* Install ngrok for your operating system
* Open the terminal
* Go to your app an run the following command: `ngrok config add-authtoken YOUR_NGROK_AUTH_TOKEN`
* Now, run the command: `ngrok http 3000`
* Copy the Forwarding URL and go to `https://www.opengraph.xyz/`
* Paste the ngrok forwarding URL and Check

# Prod

En proceso...

# Stage

En proceso...

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

1. Create a prisma postgresql database (name, etc)
2. Copy the DATABASE_URL and paste in the .env file
3. Execute the command `npx prisma migrate deploy`
4. Execute `npm run seed`

#### Update code in vercel

5. For updates, execute `git add .`
6. `git commit -m "your commit message here"`
7. `git push -u origin main`
8. Go to vercel project deployments tab and check for posible errors to fix

#### Update database schema in vercel

1. Comment the vercel prisma postgresql DATABASE_URL in your .env file
2. Uncomment the local DATABASE_URL in your .env file
3. Open Docker Desktop
4. In your project, execute the command `npx prisma migrate dev --name your_migration_name`
5. Uncomment the vercel prisma postgresql DATABASE_URL in .env
6. Comment your local DATABASE_URL in .env
7. Execute the command `npx prisma migrate deploy`

### Atajos de la extension de Nextjs para generar componentes

* Generar un layout `lrc`
* Generar slice de redux: `rxslice + tab`
* Generar un endpoint `rag`

### Comandos de Prisma

```bash

```

Open Prisma Studio: `npx prisma studio`

Crea el archivo .env para configurar la DATABASE_URL: `npx prisma init`

Ejecutar las migraciones cada vez que añada o remueva un campo `npx prisma migrate dev`

Instalar el cliente de Prisma: `npm install @prisma/client`

Generar el cliente de Prisma para realizar manipulaciones en la Base de datos: `npx prisma generate`

Crear un directorio para la libreria de Prisma: `mkdir lib && touch lib/prisma.ts`

NOTA: Si tienes una base de datos previamente creada, conectar tu base de datos añadiendo los modelos de Prisma a tu schema, reflejando tu schema actual de base de datos en tu schema.prisma `npx prisma db pull` y luego `npx prisma generate` y si hiciste cambios al modelo en tu schema.prisma ejecuta `npx prisma migrate dev`

Si quieres borrar todos los datos, con la aplicacion sin ejecutar, y docker levantado, ejecuta el comando desde el root del proyecto: `npx prisma db push` para pasar el schema a la base de datos sin pasar por las migraciones, lueg ejecuta `npx prisma generate` y luego levanta el proyecto `npm run dev` y luego ejecuta ```npm run seed`` o tambien puedes desde postman o el navegador llamar al endpoint que ejecuta los seeders `localhost:3000/api/seed`

### En caso de error

#### Abrir PowerShell en Windows

Presiona **Win + R** y escribe:

`powershell`

Deten los procesos de Node:

`Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force`

Limpiar binarios de prisma en node_modules:

* `Remove-Item -Recurse -Force .\node_modules\.prisma`
* `Remove-Item -Recurse -Force .\node_modules\@prisma`

Reinstala y regenera:

* `npm install`
* `npx prisma generate`

# Sora Prompt

genera la imagen de un producto sin fondo, tipo coffe bouquet, cuyo nombre sea "Bouquet of Roses" y el contexto: "The M bouquet includes 6 units, the L bouquet includes 12 units, and the XL bouquet includes 24 units." para la categoria de productos "valentine's day" y utiliza como etiqueta tipo pegatina o puede ser tarjeta el logo redondeado de la imagen que te acabo de pasar sin alterar el diseño del logo, quiero que el producto se vea realista, y no añadas el nombre del producto, ni el contexto, ni la categoria a la imagen como texto, el producto debe estar orientado a clientes de estados unidos y debe tener algun detalle especial o gift cuyo valor este por debajo de los $34.81

// genera la imagen de un producto sin fondo, tipo coffe bouquet, cuyo nombre sea "Bouquet of Roses" y el contexto: "usa rosas rojas reales acompañadas de chocolates y un starbucks" para la categoria de productos "valentine's day" y utiliza como etiqueta tipo pegatina o puede ser tarjeta el logo redondeado de la imagen que te acabo de pasar sin alterar el diseño del logo, quiero que el producto se vea realista, y no añadas el nombre del producto, ni el contexto, ni la categoria a la imagen como texto, el producto debe estar orientado a clientes de estados unidos y debe tener algun detalle especial o gift cuyo valor este por debajo de los $34.81

        // genera la imagen de un producto sin fondo, tipo coffe bouquet, cuyo nombre sea "Coffee & Roses Deluxe" y el contexto: "A romantic arrangement combining premium coffee beans with fresh red roses in a handcrafted basket." para la categoria de productos "valentine's day" y utiliza como etiqueta tipo pegatina o puede ser tarjeta el logo redondeado de la imagen que te acabo de pasar sin alterar el diseño del logo, quiero que el producto se vea realista, y no añadas el nombre del producto, ni el contexto, ni la categoria a la imagen como texto, el producto debe estar orientado a clientes de estados unidos y debe tener algun detalle especial o gift cuyo valor este entre los $48.50
    
          // genera la imagen de un producto sin fondo, tipo coffe bouquet, cuyo nombre sea "Sweet Morning Coffee Bouquet" y el contexto: "A bouquet of mixed flowers paired with artisanal ground coffee, perfect for a sweet morning surprise, and an starbucks coffee, y un bizcochito de chocolate con una vela, y un globo de helio morado y un globo dorado con el numero 30" para la categoria de productos "birthday" y utiliza como etiqueta tipo pegatina o puede ser tarjeta el logo redondeado de la imagen que te acabo de pasar sin alterar el diseño del logo, quiero que el producto se vea realista, y no añadas el nombre del producto, ni el contexto, ni la categoria a la imagen como texto, el producto debe estar orientado a clientes de estados unidos y debe tener algun detalle especial o gift cuyo valor este entre los $42.99
    

// genera la imagen de un producto sin fondo, tipo coffe bouquet, cuyo nombre sea "Tea Time Floral Gift Box" y el contexto: "ncludes premium herbal teas, a small floral arrangement, and honey sticks for a relaxing afternoon." para la categoria de productos "wellness" y utiliza como etiqueta tipo pegatina o puede ser tarjeta el logo redondeado de la imagen que te acabo de pasar sin alterar el diseño del logo, quiero que el producto se vea realista, y no añadas el nombre del producto, ni el contexto, ni la categoria a la imagen como texto, el producto debe estar orientado a clientes de estados unidos y debe tener algun detalle especial o gift cuyo valor este entre los $39.25

// genera la imagen de un producto sin fondo, tipo coffe bouquet, cuyo nombre sea "Tea Time Floral Gift Box" y el contexto: "ncludes premium herbal teas, a small floral arrangement, and honey sticks for a relaxing afternoon." para la categoria de productos "wellness" y utiliza como etiqueta tipo pegatina o puede ser tarjeta el logo redondeado de la imagen que te acabo de pasar sin alterar el diseño del logo, quiero que el producto se vea realista, y no añadas el nombre del producto, ni el contexto, ni la categoria a la imagen como texto, el producto debe estar orientado a clientes de estados unidos y debe tener algun detalle especial o gift cuyo valor este entre los $39.25

// genera la imagen de un producto sin fondo, tipo coffe bouquet, cuyo nombre sea "Purple Butterfly Signature Bouquet" y el contexto: "Our signature bouquet featuring seasonal flowers and gourmet coffee in an elegant reusable cup with our logo, and starbucks coffee en envase transparente." para la categoria de productos "specialty" y utiliza como etiqueta tipo pegatina o puede ser tarjeta el logo redondeado de la imagen que te acabo de pasar sin alterar el diseño del logo, quiero que el producto se vea realista, y no añadas el nombre del producto, ni el contexto, ni la categoria a la imagen como texto, el producto debe estar orientado a clientes de estados unidos y debe tener algun detalle especial o gift cuyo valor este entre los $55.00

// genera la imagen de un producto sin fondo, tipo coffe bouquet, cuyo nombre sea "Coffee Lovers Gift Basket" y el contexto: "An arrangement of assorted coffee blends, mini bouquets, and sweet treats in a decorative purple basket with our logo, purple roses and, and two starbucks mocha coffees en envases transparente." para la categoria de productos "Gifts" y utiliza como etiqueta tipo pegatina o puede ser tarjeta el logo redondeado de la imagen que te acabo de pasar sin alterar el diseño del logo, quiero que el producto se vea realista, y no añadas el nombre del producto, ni el contexto, ni la categoria a la imagen como texto, el producto debe estar orientado a clientes de estados unidos y debe tener algun detalle especial o gift cuyo valor este entre los $64.75

// genera la imagen de un producto sin fondo, tipo coffe bouquet, cuyo nombre sea "Romantic Coffee Date Set" y el contexto: "Two personalized coffee mugs, a small bouquet of roses, and premium roast coffee for two." para la categoria de productos "valentine's day" y utiliza como etiqueta tipo pegatina o puede ser tarjeta el logo redondeado de la imagen que te acabo de pasar sin alterar el diseño del logo, quiero que el producto se vea realista, y no añadas el nombre del producto, ni el contexto, ni la categoria a la imagen como texto, el producto debe estar orientado a clientes de estados unidos y debe tener algun detalle especial o gift cuyo valor este entre los $59.99

// genera la imagen de un producto sin fondo, tipo coffe bouquet, cuyo nombre sea "Golden Sunrise Coffee Bouquet" y el contexto: "A vibrant mix of yellow roses, daisies, and premium breakfast blend coffee to brighten any morning" para la categoria de productos "anniversary" y utiliza como etiqueta tipo pegatina o puede ser tarjeta el logo redondeado de la imagen que te acabo de pasar sin alterar el diseño del logo, quiero que el producto se vea realista, y no añadas el nombre del producto, ni el contexto, ni la categoria a la imagen como texto, el producto debe estar orientado a clientes de estados unidos y debe tener algun detalle especial o gift cuyo valor este entre los $46.50

# NextAuth

## Providers

### GitHub

GitHub returns a field on `Account` called `refresh_token_expires_in` which is a number. See their docs. Remember to add this field to your database schema, in case if you are using an `Adapter`.

#### Register a New OAuth app

* Go to Github profile => settings = Developer Documentation
* Click on OAuth App
* Click on Add New App
* Set the Application name: `My App Dev/Prod`
* Set the Homepage URL: `https://example.com`
* Set the Authorization callback URL (development) template /api/auth/callback/provider: `http://localhost:3000/api/auth/callback/github`
* Copy the generate Client ID: `example: 0123456789abcdefg`
* Paste the Client ID in your .env file: `GITHUB_ID=0123456789abcfefg`
* If you are in Development environment, comment the NEXTAUTH_URL: `# NEXTAUTH_URL=https://example.com`
* Go to `http://localhost:3000/api/auth/signin` to test
* Click on Signin with Github button and authorize the client

### Google

* Go to `https://next-auth.js.org/providers/google`
* Set the Google provider configuration in `/api/auth/[...nextauth]/route.ts`
* Go to `https://console.developers.google.com/apis/credentials`
* Clic on the top button with current project name and clic on Add new project
* Set the project name `example: MyProjectNext`
* Click on Create
* Click on select project
* Click on Add credentials tab, and then, click on Crear ID de cliente de OAuth
* Click on Configurar pantalla de consentimiento
* Complete the infor about your Brand
* Set de OAuth Client ID
* Select the application type: `Aplicacion Web`
* Set the name `Cliente Web - My Aplication`
* Set the URl of redireccionamiento autorizados `http://localhost:3000/api/auth/callback/google`
* Click on Create
* Save and secure the Google client ID generated
* Go to the client definition and copy the Client Secret
* Set the constansts in the .env file:

```sh
GOOGLE_CLIENT_ID=YourGoogleClientID
GOOGLE_CLIENT_SECRET=YourGoogleClientSecret

```

### NextAuth update

* Run the command `npm i next-auth` or  `npm i next-auth@beta` to update from the `^4.24.11` version to `^5.0.0-beta.29`
* Next, generate a secret key for your application:

```sh
# macOS
openssl rand -base64 32
# Windows can use https://generate-secret.vercel.app/32

```

* Copy and paste the generate code in your .env file: `NEXTAUTH_SECRET=PASTE_YOUR_SECRET_KEY_HERE`
* In the root of your project, create the file `auth.config.ts`
* Install zod `npm i zod` for credentials validation
* Paste de following code:

```ts
import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
 
export const authConfig: NextAuthConfig = {
    pages: {
        signIn: '/auth/login',
        newUser: '/auth/register',
    },
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                .object({ email: z.string().email(), password: z.string().min(6) })
                .safeParse(credentials);

                // search email
            },
        }),
    ]
} 

```
