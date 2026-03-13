import { redirect } from "@sveltejs/kit";
import { getCategoryTimeById } from "$lib/models/categoryTime";

export async function load({ params }){
    const id = params.id;
    let catData = {};

    const resCatData = await getCategoryTimeById(id);
    if(resCatData.success){
        catData = resCatData.data[0];
    }else{
        throw redirect(302, '/foods');
    }

    return{ catData }
}