import { loginUser } from "$lib/models/users";
import { json } from "@sveltejs/kit";

export async function POST({ request, cookies }){

    const data = await request.formData();
    const mail = data.get('mail');
    const pass = data.get('pass');

    const res = await loginUser({ mail, pass });
    
    if(res.success && res.status === 'logged_in'){
        cookies.set('dFoodToken', res.token, {
            httpOnly: true,
            path: "/",
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7 * 4});
    }

    return json(res);
}