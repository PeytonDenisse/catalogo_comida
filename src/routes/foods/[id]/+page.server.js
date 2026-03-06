import { getFoodById } from "$lib/models/food";

export async function load({ params }){
    const id = params.id;
    let foodData = {};

    const resFoodData = await getFoodById(id);
    if(resFoodData.success){
        foodData = resFoodData.data[0];
    }

    return{ foodData: foodData }
}