import { getCategoriesDiet } from "$lib/models/categoryDiet";

export async function GET(){
    const res = await getCategoriesDiet();
}