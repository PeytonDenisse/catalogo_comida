import { getUserByToken } from "$lib/models/users";

export async function load({ cookies }){

    const token = await cookies.get('dFoodToken');
    const userData = await getUserByToken(token)

    return({userData})
}