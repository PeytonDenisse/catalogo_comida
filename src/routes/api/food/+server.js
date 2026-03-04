import { createFood, getAllFood, getFoodById, deleteFood } from "$lib/models/food";
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


export async function GET(){
    const res = await getAllFood();
    return json(res);
}

export async function DELETE({ url }) {
    const id = url.searchParams.get("id");              

    const red = await deleteFood(id);
    return json(red);
}

export async function PUT({ request }) {
    const data = await request.formData();

    const id = data.get("id");
    const title = data.get("title");
    const description = data.get("description");
    const image_url = data.get("image_url");
    const price = parseFloat(data.get("price"));
    const cat_time_id = parseInt(data.get("cat_time_id"));
    const cat_type_id = parseInt(data.get("cat_type_id"));
    const cat_diet_id = parseInt(data.get("cat_diet_id"));

    const res = await updateFood(id, {
        title,
        description,
        image_url,
        price,
        cat_time_id,
        cat_type_id,
        cat_diet_id
    });

    return json(res);
}
