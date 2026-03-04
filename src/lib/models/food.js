import { query } from "$lib/db";

// CREATE
export async function createFood(food){
    try {
        const res = await query(
            `INSERT INTO food 
            (title, description, image_url, price, cat_time_id, cat_type_id, cat_diet_id)
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
                food.title,
                food.description,
                food.image_url,
                food.price,
                food.cat_time_id,
                food.cat_type_id,
                food.cat_diet_id
            ]
        );

        return { success: true, data: res };
    } catch (error) {
        return { success: false, message: "Error creating food" };
    }
}


// READ ALL
export async function getAllFood(){
    try {
        const res = await query("SELECT * FROM food");
        return { success: true, data: res };
    } catch (error) {
        return { success: false, message: "Error getting food" };
    }
}


// READ ONE (for your 404 validation later 👀)
export async function getFoodById(id){
    try {
        const res = await query(
            "SELECT * FROM food WHERE id = ?",
            [id]
        );

        return { success: true, data: res };
    } catch (error) {
        return { success: false, message: "Error getting food" };
    }
}


// DELETE
export async function deleteFood(id){
    try {
        const res = await query(
            "DELETE FROM food WHERE id = ?",
            [id]
        );

        return { success: true, data: res };
    } catch (error) {
        return { success: false, message: "Error deleting food" };
    }
}


// UPDATE
export async function updateFood(id, food){
    try {
        const res = await query(
            `UPDATE food 
             SET title = ?, 
                 description = ?, 
                 image_url = ?, 
                 price = ?, 
                 cat_time_id = ?, 
                 cat_type_id = ?, 
                 cat_diet_id = ?
             WHERE id = ?`,
            [
                food.title,
                food.description,
                food.image_url,
                food.price,
                food.cat_time_id,
                food.cat_type_id,
                food.cat_diet_id,
                id
            ]
        );

        return { success: true, data: res };
    } catch (error) {
        return { success: false, message: "Error updating food" };
    }
}