import { getAllFood } from "$lib/models/food";
import { getCategoriesTime } from "$lib/models/categoryTime";
import { getCategoriesType } from "$lib/models/categoryType";
import { getCategoriesDiet } from "$lib/models/categoryDiet";

export async function load(){

    const foods = await getAllFood();
    const times = await getCategoriesTime();
    const types = await getCategoriesType();
    const diets = await getCategoriesDiet();

    return{
        foods: foods.data,
        times: times.data,
        types: types.data,
        diets: diets.data
    }
}