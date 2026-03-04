export async function loginUser({ mail, pass }) {
    const res = await query("SELECT id, password FROM Usuarios WHERE email = ?", [mail]);
    if (res.length > 0) {
        if(res[0].password === "12345"){
            return { success: true, status: 'change_password', idUser: res[0].id };
        }

        const match = await bcrypt.compare(pass, res[0].password);

        if (match) {
            return { success: true, status: 'logged_in', idUser: res[0].id };
        } else {
            return { success: false, status: 'invalid_password', message: 'Contraseña incorrecta.' };
        }
    }else{
        return { success: false, status: 'user_not_found', message: 'Usuario no encontrado.' };
    }
}

export async function changeUserPassword({ idUser, newPass }) {
    const hashedPass = await bcrypt.hash(newPass, 10);
    const res = await query("UPDATE Usuarios SET password = ? WHERE id = ?", [hashedPass, idUser]);
    return { success: true, status: 'password_changed', message: 'Contraseña actualizada correctamente.', idUser: idUser };
}

export async function newUser({ nombre, email, pass, departamento }){
    const res = await query("INSERT INTO Usuarios (nombre, email, password, departamento_id) VALUES (?,?,?,?)", [nombre, email, pass, departamento]);
    return res;
}
