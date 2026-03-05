import { changeUserPassword } from "$lib/models/user";
import { json } from "@sveltejs/kit";

export async function POST({cookies, request}) {
    const data = await request.formData();
    
    const res = await changeUserPassword({idUser: data.get('idUser'), newPass: data.get('pass1')});

    if(res.success){
        cookies.set('dFoodToken', res.idUser, {
            httpOnly: true,
            path: "/",
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7 * 4});
    }

    return json(res);
}