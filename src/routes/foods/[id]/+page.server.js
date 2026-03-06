import { getFoodById } from "$lib/models/food";
import { redirect } from "@sveltejs/kit";

export async function load({ params }){
    const id = params.id;
    let foodData = {};

    const resFoodData = await getFoodById(id);
    if(resFoodData.success){
        foodData = resFoodData.data[0];
    }else{
        throw redirect(302, '/foods');
    }

    return{ foodData: foodData }
}