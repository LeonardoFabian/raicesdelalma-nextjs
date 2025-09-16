// import { revalidatePath } from "next/cache";
// import prisma from "@/lib/prisma";
// import { Category } from "@prisma/client";
// import { getServerSideUserSession } from "@/auth/actions/auth-actions";


// export const getCategories = async (): Promise<Category[]> => {
//     const categories = await prisma?.category.findMany({
//         orderBy: { title: "asc" },
//     });

//     if (!categories) return [];

//     return categories;
// }

// const updateCategory = async ( id: number, data: Category ) => {
//     const dbCategory = await prisma?.category.findFirst({ where: { id } });

//     if (!dbCategory) throw `Category with id ${id} not found`;

//     const category = await prisma?.category.update({ where: { id }, data });

//     revalidatePath(`/admin/category/${id}`);
//     return category;
// }

// const createCategory = async ( data: Category ) => {
//     const user = await getServerSideUserSession();
//     try {
//         const category = await prisma.category.create({ data: {...data, userId: user?.id} });
//     } catch (error) {
//         return {
//             message: `Error creating category: ${error}`,
//         }
//     }
// }