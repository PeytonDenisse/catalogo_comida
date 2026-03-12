import { redirect } from "@sveltejs/kit";
import { getCategoryTimeById } from "$lib/models/categoryTime";

export async function load({ params }){
    const id = params.id;
    let catData = {};

    const resFoodData = await getCategoryTimeById(id);
    if(resFoodData.success){
        catData = resFoodData.data[0];
    }else{
        throw redirect(302, '/foods');
    }

    return{ catData }
}