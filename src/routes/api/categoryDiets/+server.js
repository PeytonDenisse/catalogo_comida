import {getCategoryDietById, updateCategoryDiet, deleteCategoryDiet, createCategoryDiet, getCategoriesDiet } from "$lib/models/categoryDiet";
import { json } from "@sveltejs/kit";

export async function GET(){
    const res = await getCategoriesDiet();
    return json(res);
}

export async function GET({ url }) {
    const id = url.searchParams.get("id");

    const res = await getCategoryDietById(id);
    return json(res);
}

export async function POST({ request }){
    const data = await request.formData();
    const res = await createCategoryDiet(data.get('name'));

    return json(res);
}


export async function DELETE({ url }) {
    const id = url.searchParams.get("id");

    const res = await deleteCategoryDiet(id);
    return json(res);
}

export async function PUT({ request }) {
    const data = await request.formData();

    const id = data.get("id");
    const name = data.get("name");

    const res = await updateCategoryDiet(id, name);

    return json(res);
}