import { query } from "$lib/db";

export async function createCategoryDiet(name){
    try {
        const res = await query("INSERT INTO category_diet (name) VALUES (?)", [name]);
        return {success: true, data: res}
    } catch (error) {
        return {success: false, data: [], message: 'Error del servidor'}
    }
    return res;
}

export async function getCategoriesDiet(){
    try {
        const res = await query("SELECT * FROM category_diet")
        return {success: true, data: res}
    } catch (error) {
        return {success: false, data: [], message: 'Error del servidor'}
    }
}