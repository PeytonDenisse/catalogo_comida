import { redirect } from "@sveltejs/kit";
import { getCategoriesDiet } from "$lib/models/categoryDiet.js";
import { getCategoriesTime  } from "$lib/models/categoryTime";
import { getCategoriesType } from "$lib/models/categoryType";

export async function load({ params }){
    const { tipo } = params;
    let catData = {};

    switch(tipo){
        case 'dieta':
            catData = await getCategoriesDiet();
            break;
        case 'tiempo':
            catData = await getCategoriesTime();
            break;
        case 'tipo':
            catData = await getCategoriesType();
            break;
    }

    return{ catData }
}