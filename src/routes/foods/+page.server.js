import { getAllFood } from "$lib/models/food";

export async function load(){
    const foods = await getAllFood();


    return {foods: foods.data}
}