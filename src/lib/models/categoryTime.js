import { query } from "$lib/db";

// CREATE
export async function createCategoryTime(name){
    try {
        const res = await query(
            "INSERT INTO category_time (name) VALUES (?)",
            [name]
        );

        return { success: true, data: res };
    } catch (error) {
        return { success: false, data: [], message: "Error del servidor" };
    }
}

// READ
export async function getCategoriesTime(){
    try {
        const res = await query(
            "SELECT * FROM category_time"
        );

        return { success: true, data: res };
    } catch (error) {
        return { success: false, data: [], message: "Error del servidor" };
    }
}

// DELETE
export async function deleteCategoryTime(id){
    try {
        const res = await query(
            "DELETE FROM category_time WHERE id = ?",
            [id]
        );

        return { success: true, data: res };
    } catch (error) {
        return { success: false, message: "Error deleting" };
    }
}

// UPDATE
export async function updateCategoryTime(id, name){
    try {
        const res = await query(
            "UPDATE category_time SET name = ? WHERE id = ?",
            [name, id]
        );

        return { success: true, data: res };
    } catch (error) {
        return { success: false, message: "Error updating" };
    }
}