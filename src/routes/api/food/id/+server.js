export async function GET({ url }) {

    const id = url.searchParams.get("id");

    if(id){
        const res = await getFoodById(id);
        return json(res);
    }

    const res = await getFoods();
    return json(res);
}