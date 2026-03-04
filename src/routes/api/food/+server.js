import { createFood } from "$lib/models/food";
import { json } from "@sveltejs/kit";

export async function POST({ request }){
    const data = await request.formData();
    const res = await createFood({
        title: data.get('title'),
        description: data.get('description'),
        image_url: data.get('image_url'),
        price: parseFloat(data.get('price')),
        cat_time_id: parseInt(data.get('cat_time_id')),
        cat_type_id: parseInt(data.get('cat_type_id')),
        cat_diet_id: parseInt(data.get('cat_diet_id'))
    });

    return json(res);
}



