import { getFoodById, updateFood, deleteFood } from "$lib/models/food";
import { json } from "@sveltejs/kit";

// GET ONE FOOD
export async function GET({ params }) {

    const id = params.id;

    const res = await getFoodById(id);

    return json(res);
}
