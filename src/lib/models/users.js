import { query } from "$lib/db";
import bcrypt from 'bcrypt';

export async function loginUser({ mail, pass }) {
    const res = await query("SELECT id, password, accessToken FROM users WHERE email = ?", [mail]);
    if (res.length > 0) {
        if(res[0].password === "12345"){
            return { success: true, status: 'change_password', idUser: res[0].id };
        }

        const match = await bcrypt.compare(pass, res[0].password);

        if (match) {
            return { success: true, status: 'logged_in', token: res[0].accessToken };
        } else {
            return { success: false, status: 'invalid_password', message: 'Contraseña incorrecta.' };
        }
    }else{
        return { success: false, status: 'user_not_found', message: 'Usuario no encontrado.' };
    }
}

export async function changeUserPassword({ idUser, newPass }) {
    const hashedPass = await bcrypt.hash(newPass, 10);
    const res = await query("UPDATE users SET password = ? WHERE id = ?", [hashedPass, idUser]);
    return { success: true, status: 'password_changed', message: 'Contraseña actualizada correctamente.', idUser: idUser };
}

export async function newUser({ name, email, pass }){

    const hashedPass = await bcrypt.hash(pass, 10);
    const token = crypto.randomUUID();
    const res = await query("INSERT INTO users (username, email, password, accessToken) VALUES (?,?,?,?)", [name, email, hashedPass, token]);
    
    if(res.affectedRows > 0){
        return {success: true, token: token};
    }else{
        return {success: false};
    }
}

export async function getUserByToken(token){
    const res = await query("SELECT * FROM users WHERE accessToken = ?", [token])
    if(res.length > 0){
        return {success: true, data: res[0]}
    }else{
        return {success: false}
    }
}