<script>
    import { goto } from "$app/navigation";

    async function handleLogin(){
        const res = await fetch('/api/login');
        const data = await res.json();
    }

</script>

<main>
    <form action="">
        <input type="email" placeholder="Correo">
        <input type="password" placeholder="Contraseña">
        <a href="/registrarse">Crear una cuenta</a>
    </form>
</main>

<style>
    main{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100dvh;
        min-height: 100dvh;
        background-color: #333;
    }

    form{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 8px;
        height: 50%;
        width: 25%;
        background-color: #222;
        border-radius: 2px;
    }
</style>