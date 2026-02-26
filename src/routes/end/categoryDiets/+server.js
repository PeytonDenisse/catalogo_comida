import { createCategoryDiet, getCategoriesDiet } from "$lib/models/categoryDiet";
import { json } from "@sveltejs/kit";

export async function GET(){
    const res = await getCategoriesDiet();
    return json(res);
}

export async function POST({ request }){
    const data = await request.formData();
    const res = await createCategoryDiet(data.get('name'));

    return json(res);
}