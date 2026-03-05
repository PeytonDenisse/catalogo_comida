export async function GET({ url }) {
    const id = url.searchParams.get("id");

    const res = await getCategoryDietById(id);
    return json(res);
}
