<script>
    import { goto } from "$app/navigation";
    import ViewContModal from '$lib/components/modals/ViewContModal.svelte';
    import ViewModal from "$lib/components/modals/ViewModal.svelte";

    // Variables para almacenar los datos del usuario
    let email = "";
    let password = "";

    async function handleLogin() {
        // Aquí iría tu lógica real
        console.log("Iniciando sesión con:", email);
        
        /* const res = await fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        */
    }
</script>

<main>
    <form on:submit|preventDefault={handleLogin}>
        <h2>Iniciar Sesión</h2>
        
        <div class="input-group">
            <label for="email">Correo electrónico</label>
            <input 
                id="email" 
                type="email" 
                bind:value={email} 
                placeholder="ejemplo@correo.com" 
                required
            >
        </div>

        <div class="input-group">
            <label for="password">Contraseña</label>
            <input 
                id="password" 
                type="password" 
                bind:value={password} 
                placeholder="••••••••" 
                required
            >
        </div>

        <button type="submit">Ingresar</button>
        
        <div class="footer-links">
            <span>¿No tienes cuenta?</span>
            <a href="/registrarse">Crear una cuenta</a>
        </div>
    </form>
</main>

<style>
    /* Aseguramos que la fuente se vea moderna */
    :global(body) {
        margin: 0;
        font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    }

    main {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100dvh;
        background-color: #121212; /* Fondo principal más oscuro */
        padding: 1rem; /* Margen de seguridad para pantallas pequeñas */
        box-sizing: border-box;
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 1.5rem; /* Mejor espaciado entre elementos */
        width: 100%;
        max-width: 400px; /* En lugar de 25%, usamos un max-width para que sea responsive */
        padding: 2.5rem;
        background-color: #1e1e1e; /* Color de la tarjeta */
        border-radius: 12px; /* Bordes más suaves */
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3); /* Sombra para darle profundidad */
        box-sizing: border-box;
    }

    h2 {
        margin: 0;
        color: #ffffff;
        text-align: center;
        font-size: 1.8rem;
        font-weight: 600;
    }

    .input-group {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    label {
        font-size: 0.85rem;
        color: #b3b3b3;
        font-weight: 500;
    }

    input {
        width: 100%;
        padding: 0.8rem 1rem;
        background-color: #2a2a2a;
        border: 1px solid #3a3a3a;
        border-radius: 8px;
        color: #ffffff;
        font-size: 1rem;
        box-sizing: border-box;
        transition: all 0.2s ease;
    }

    /* Efecto cuando el usuario hace clic en el input */
    input:focus {
        outline: none;
        border-color: #646cff;
        background-color: #333333;
    }

    button {
        margin-top: 0.5rem;
        padding: 0.8rem;
        background-color: #646cff; /* Color de acento (azul purpúreo) */
        color: white;
        border: none;
        border-radius: 8px;
        font-size: 1rem;
        font-weight: bold;
        cursor: pointer;
        transition: background-color 0.2s ease;
    }

    button:hover {
        background-color: #535bf2;
    }

    .footer-links {
        margin-top: 0.5rem;
        text-align: center;
        font-size: 0.9rem;
        color: #b3b3b3;
    }

    a {
        color: #646cff;
        text-decoration: none;
        font-weight: 600;
        margin-left: 0.3rem;
        transition: color 0.2s;
    }

    a:hover {
        color: #8c92ff;
        text-decoration: underline;
    }
</style>