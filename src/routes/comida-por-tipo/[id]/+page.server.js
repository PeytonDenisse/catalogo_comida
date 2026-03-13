import { redirect } from "@sveltejs/kit";
import { getCategoryTypeById } from "$lib/models/categoryType";

export async function load({ params }){
    const id = params.id;
    let catData = {};

    const resCatData = await getCategoryTypeById(id);
    if(resCatData.success){
        catData = resCatData.data[0];
    }else{
        throw redirect(302, '/foods');
    }

    return{ catData }
}