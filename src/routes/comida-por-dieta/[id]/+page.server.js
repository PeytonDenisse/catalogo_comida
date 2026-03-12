import { redirect } from "@sveltejs/kit";
import { getCategoryDietById } from "$lib/models/categoryDiet.js";

export async function load({ params }){
    const id = params.id;
    let catData = {};

    const resCatData = await getCategoryDietById(id);
    if(resCatData.success){
        catData = resCatData.data[0];
    }else{
        throw redirect(302, '/foods');
    }

    return{ catData }
}