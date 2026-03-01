import { createCategoryType, updateCategoryType, deleteCategoryType, getCategoriesType } from "$lib/models/categoryType";

import { json } from "@sveltejs/kit";

export async function GET(){
    const res = await getCategoriesType();
    return json(res);
}

export async function POST({ request }){
    const data = await request.formData();
    const res = await createCategoryType(data.get('name'));

    return json(res);
}

export async function DELETE({ url }) {
    const id = url.searchParams.get("id");

    const res = await deleteCategoryType(id);
    return json(res);
}

export async function PUT({ request }) {
    const data = await request.formData();

    const id = data.get("id");
    const name = data.get("name");

    const res = await updateCategoryType(id, name);

    return json(res);
}