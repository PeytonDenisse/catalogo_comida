<script>
    import { goto } from "$app/navigation";

    let email = "";
    let password = "";
    let errorMessage = "";
    let isLoading = false;

    async function handleLogin() {
        errorMessage = "";
        isLoading = true;

        try {
        const formData = new FormData();
        formData.append("mail", email);
        formData.append("pass", password);

        const res = await fetch("/api/login", { method: "POST", body: formData });
        const data = await res.json();

        if (!data.success) {
            errorMessage = data.message || "Error al iniciar sesión";
            return;
        }

        // Si tu backend manda a cambiar contraseña
        if (data.status === "change_password") {
            goto(`/login/newpass?idUser=${data.idUser}`);
            return;
        }

        // logged_in -> cookie ya se setea en +server.js
        goto("/panel");
        } catch (e) {
        errorMessage = "Error de conexión con el servidor";
        } finally {
        isLoading = false;
        }
    }
    </script>

    <main>
    <form on:submit|preventDefault={handleLogin}>
        <h2>Iniciar Sesión</h2>

        {#if errorMessage}
        <div class="error">{errorMessage}</div>
        {/if}

        <div class="input-group">
        <label for="email">Correo electrónico</label>
        <input id="email" type="email" bind:value={email} placeholder="ejemplo@correo.com" required />
        </div>

        <div class="input-group">
        <label for="password">Contraseña</label>
        <input id="password" type="password" bind:value={password} placeholder="••••••••" required />
        </div>

        <button type="submit" disabled={isLoading}>
        {isLoading ? "Ingresando..." : "Ingresar"}
        </button>

        <div class="footer-links">
        <span>¿No tienes cuenta?</span>
        <a href="/register">Crear una cuenta</a>
        </div>
    </form>
</main>

<style>
    main { min-height: 100dvh; display:flex; justify-content:center; align-items:center; background:#151320; padding: 1rem; }
    form { width: 100%; max-width: 400px; background:#1e1e1e; padding: 2rem; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,.4); display:flex; flex-direction:column; gap: 1rem; }
    h2 { color: white; margin: 0; text-align:center; }
    .input-group { display:flex; flex-direction:column; gap:.4rem; }
    label { color:#b3b3b3; font-size:.85rem; }
    input { padding:.8rem 1rem; border-radius:10px; border:1px solid #333; background:#2a2a2a; color:white; }
    input:focus { outline:none; border-color:#646cff; }
    button { padding:.9rem; border:none; border-radius:10px; background:#646cff; color:white; font-weight:700; cursor:pointer; }
    button:disabled { opacity:.6; cursor:not-allowed; }
    .footer-links { color:#b3b3b3; text-align:center; font-size:.9rem; }
    a { color:#646cff; text-decoration:none; margin-left:.3rem; font-weight:600; }
    a:hover { text-decoration:underline; }
    .error { background: rgba(255, 70, 70, .12); border: 1px solid rgba(255,70,70,.35); color:#ff6b6b; padding:.7rem; border-radius: 10px; font-size:.9rem; }
</style>