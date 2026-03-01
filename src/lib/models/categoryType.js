import { query } from "$lib/db";

// CREATE
export async function createCategoryType(name){
    try {
        const res = await query(
            "INSERT INTO category_type (name) VALUES (?)",
            [name]
        );

        return { success: true, data: res };
    } catch (error) {
        return { success: false, data: [], message: "Server error" };
    }
}

// READ
export async function getCategoriesType(){
    try {
        const res = await query(
            "SELECT * FROM category_type"
        );

        return { success: true, data: res };
    } catch (error) {
        return { success: false, data: [], message: "Server error" };
    }
}

// DELETE
export async function deleteCategoryType(id){
    try {
        const res = await query(
            "DELETE FROM category_type WHERE id = ?",
            [id]
        );

        return { success: true, data: res };
    } catch (error) {
        return { success: false, message: "Error deleting" };
    }
}

// UPDATE
export async function updateCategoryType(id, name){
    try {
        const res = await query(
            "UPDATE category_type SET name = ? WHERE id = ?",
            [name, id]
        );

        return { success: true, data: res };
    } catch (error) {
        return { success: false, message: "Error updating" };
    }
}