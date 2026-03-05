<script>
    import { goto } from "$app/navigation";

    let errorMessage = $state("");
    let isLoading = $state(false);

    async function handleRegister(e){
        errorMessage = "";
        isLoading = true;
        
        const formData = new FormData(e.target);
        try {
            const res = await fetch('/api/login/register', {method: 'POST', body: formData});
            const data = await res.json();
            
            if(data.success){
                goto('/panel');
            } else {
                errorMessage = data.message || "Error al crear la cuenta";
            }
        } catch (err) {
            errorMessage = "Error de conexión con el servidor";
        } finally {
            isLoading = false;
        }
    }
</script>

<main>
    <div class="register-card">
        <h1>Crear Cuenta</h1>
        <p class="subtitle">Únete al catálogo de comida</p>

        {#if errorMessage}
            <div class="error-badge">{errorMessage}</div>
        {/if}

        <form on:submit|preventDefault={handleRegister}>
            <div class="field">
                <label for="name">Nombre completo</label>
                <input type="text" id="name" name="name" placeholder="Tu nombre" required>
            </div>

            <div class="field">
                <label for="email">Correo electrónico</label>
                <input type="email" id="email" name="email" placeholder="ejemplo@correo.com" required>
            </div>

            <div class="field">
                <label for="pass">Contraseña</label>
                <input type="password" id="pass" name="pass" placeholder="••••••••" required autocomplete="new-password">
            </div>

            <button type="submit" disabled={isLoading}>
                {isLoading ? "Procesando..." : "Registrarse"}
            </button>
        </form>

        <div class="footer">
            <span>¿Ya tienes cuenta?</span>
            <a href="/login">Inicia sesión aquí</a>
        </div>
    </div>
</main>

<style>
    main {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100dvh;
        background-color: #0f0f0f;
        font-family: 'Inter', sans-serif;
    }

    .register-card {
        background-color: #1a1a1a; 
        padding: 2.5rem;
        border-radius: 12px;
        width: 100%;
        max-width: 420px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        text-align: center;
    }

    h1 {
        color: white;
        margin: 0 0 0.5rem 0;
        font-size: 1.8rem;
    }

    .subtitle {
        color: #888;
        font-size: 0.9rem;
        margin-bottom: 2rem;
    }

    .error-badge {
        background: rgba(255, 68, 68, 0.1);
        color: #ff4444;
        border: 1px solid #ff4444;
        padding: 0.8rem;
        border-radius: 6px;
        margin-bottom: 1.5rem;
        font-size: 0.85rem;
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 1.2rem;
        text-align: left;
    }

    .field {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    label {
        color: #ccc;
        font-size: 0.85rem;
        font-weight: 500;
    }

    input {
        padding: 0.8rem 1rem;
        background: #2a2a2a;
        border: 1px solid #333;
        border-radius: 6px;
        color: white;
        transition: border-color 0.2s;
    }

    input:focus {
        outline: none;
        border-color: #6366f1; 
    }

    button {
        margin-top: 1rem;
        padding: 0.9rem;
        background-color: #6366f1; 
        color: white;
        border: none;
        border-radius: 6px;
        font-weight: 600;
        cursor: pointer;
        transition: background 0.2s, transform 0.1s;
    }

    button:hover:not(:disabled) {
        background-color: #4f46e5;
    }

    button:active:not(:disabled) {
        transform: scale(0.98);
    }

    button:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }

    .footer {
        margin-top: 2rem;
        font-size: 0.85rem;
        color: #888;
    }

    .footer a {
        color: #6366f1;
        text-decoration: none;
        font-weight: 600;
        margin-left: 0.5rem;
    }

    .footer a:hover {
        text-decoration: underline;
    }
</style>