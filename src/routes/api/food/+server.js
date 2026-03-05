import {
    createFood,
    getAllFood,
    getFoodById,
    updateFood,
    deleteFood
} from "$lib/models/food";

import { json } from "@sveltejs/kit";


// GET ALL FOOD
export async function GET() {
    const res = await getAllFood();
    return json(res);
}



// CREATE
export async function POST({ request }) {

    const data = await request.formData();

    const food = {
        title: data.get("title"),
        description: data.get("description"),
        image_url: data.get("image_url"),
        price: data.get("price"),
        cat_time_id: data.get("cat_time_id"),
        cat_type_id: data.get("cat_type_id"),
        cat_diet_id: data.get("cat_diet_id")
    };

    const res = await createFood(food);

    return json(res);
}


// UPDATE
export async function PUT({ request }) {

    const data = await request.formData();

    const id = data.get("id");

    const food = {
        title: data.get("title"),
        description: data.get("description"),
        image_url: data.get("image_url"),
        price: data.get("price"),
        cat_time_id: data.get("cat_time_id"),
        cat_type_id: data.get("cat_type_id"),
        cat_diet_id: data.get("cat_diet_id")
    };

    const res = await updateFood(id, food);

    return json(res);
}


// DELETE
export async function DELETE({ url }) {

    const id = url.searchParams.get("id");

    const res = await deleteFood(id);

    return json(res);
}