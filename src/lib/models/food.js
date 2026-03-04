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
