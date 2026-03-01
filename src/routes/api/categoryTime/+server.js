import { createCategoryTime, updateCategoryTime, deleteCategoryTime, getCategoriesTime } from "$lib/models/categoryTime";
import { json } from "@sveltejs/kit";

export async function GET(){
    const res = await getCategoriesTime();
    return json(res);
}

export async function POST({ request }){
    const data = await request.formData();
    const res = await createCategoryTime(data.get('name'));

    return json(res);
}


export async function DELETE({ url }) {
    const id = url.searchParams.get("id");

    const res = await deleteCategoryTime(id);
    return json(res);
}

export async function PUT({ request }) {
    const data = await request.formData();

    const id = data.get("id");
    const name = data.get("name");

    const res = await updateCategoryTime(id, name);

    return json(res);
}