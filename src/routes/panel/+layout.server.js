import { redirect } from "@sveltejs/kit";
import { getUserByToken } from "$lib/models/users";

export async function load({ cookies }) {
    const token = cookies.get("dFoodToken");

    if (!token) throw redirect(302, "/login");

    const userRes = await getUserByToken(token);
    if (!userRes.success) throw redirect(302, "/login");

    return { user: userRes.data };
}