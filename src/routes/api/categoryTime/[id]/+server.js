import { getCategoryTimeById } from "$lib/models/categoryTime";
import { json } from "@sveltejs/kit";

export async function GET({ params }) {

    const id = params.id;
    const res = await getCategoryTimeById(id);

    return json(res);
}