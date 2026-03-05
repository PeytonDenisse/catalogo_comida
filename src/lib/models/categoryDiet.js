import { query } from "$lib/db";
import { get } from "svelte/store";

export async function createCategoryDiet(name){
    try {
        const res = await query("INSERT INTO category_diet (name) VALUES (?)", [name]);
        return {success: true, data: res}
    } catch (error) {
        return {success: false, data: [], message: 'Error del servidor'}
    }
}


export async function getCategoriesDiet(){
    try {
        const res = await query("SELECT * FROM category_diet")
        return {success: true, data: res}
    } catch (error) {
        return {success: false, data: [], message: 'Error del servidor'}
    }
}

// GET ONE (with 404 validation)
// export async function getCategoryDietById(id){
//     try {
//         const res = await query(
//             "SELECT * FROM category_diet WHERE id = ?",
//             [id]
//         );

//         if (res.length === 0) {
//             return { 
//                 success: false, 
//                 message: "Category diet not found",
//                 status: 404
//             };
//         }

//         return { success: true, data: res[0] };

//     } catch (error) {
//         return { 
//             success: false, 
//             message: "Error getting category diet" 
//         };
//     }
// }


// Delete
export async function deleteCategoryDiet(id){
    try {
        const res = await query(
            "DELETE FROM category_diet WHERE id = ?",
            [id]
        );
        return { success: true, data: res };
    } catch (error) {
        return { success: false, message: "Error deleting" };
    }
}



// update
export async function updateCategoryDiet(id, name){
    try {
        const res = await query(
            "UPDATE category_diet SET name = ? WHERE id = ?",
            [name, id]
        );

        return { success: true, data: res };
    } catch (error) {
        return { success: false, message: "Error updating" };
    }
}