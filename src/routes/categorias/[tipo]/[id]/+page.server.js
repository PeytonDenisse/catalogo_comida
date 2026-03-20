import { redirect } from "@sveltejs/kit";
import { getCategoryDietById } from "$lib/models/categoryDiet.js";
import { getCategoryTimeById } from "$lib/models/categoryTime";
import { getCategoryTypeById } from "$lib/models/categoryType";

export async function load({ params }){
    const { id } = params;
    let catData = {};

    const resCatData = await getCategoryDietById(id);
    if(resCatData.success){
        catData = resCatData.data[0];
    }else{
        throw redirect(302, '/foods');
    }

    return{ catData }
}