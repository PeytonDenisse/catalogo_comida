import { newUser } from "$lib/models/users";
import { json } from "@sveltejs/kit";

export async function POST({ request, cookies }){
    const data = await request.formData();

    const res = await newUser({
        name: data.get('name'),
        email: data.get('email'),
        pass: data.get('pass')
    })

    if(res.success){
        cookies.set('dFoodToken', res.token, {
        httpOnly: true,
        path: "/",
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7 * 4});
    }

    return json(res);
}