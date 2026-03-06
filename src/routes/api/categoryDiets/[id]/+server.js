import { getCategoryDietById } from "$lib/models/categoryDiet";
import { json } from "@sveltejs/kit";

export async function GET({ params }) {

    const id = params.id;

    const res = await getCategoryDietById(id);

    return json(res);
}