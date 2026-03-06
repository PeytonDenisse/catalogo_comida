import { getCategoryTypeById } from "$lib/models/categoryType";
import { json } from "@sveltejs/kit";

export async function GET({ params }) {

    const id = params.id;
    const res = await getCategoryTypeById(id);

    return json(res);
}