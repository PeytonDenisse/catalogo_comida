import { query } from "$lib/db";

export async function getItems(){
    const res = await query("SELECT * FROM items");
}

