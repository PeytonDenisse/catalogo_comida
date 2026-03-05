<script>
    import { goto } from "$app/navigation";
    import ViewContModal from '$lib/components/modals/ViewContModal.svelte';
    import ViewModal from "$lib/components/modals/ViewModal.svelte";

    let actualModal = '';
    let actualID = 0;

    async function handleLogin(e){
        const form = e.target;
        const formData = new FormData(form);
        const res = await fetch('/api/login', {method: 'POST', body: formData});
        const data = await res.json();
        console.log(data);

        if(data.success){
            switch (data.status) {
                case "logged_in":
                    goto("/panel")
                break;
            }
        }else{
            alert(data.message)
        }
    }

</script>

<main>
    <form on:submit|preventDefault={handleLogin}>
        <h1>Iniciar Sesión</h1>
        <p class="sub">ingrese sus credenciales</p>
        <input type="mail" placeholder="Correo" name="mail" required>
        <input type="password" placeholder="Contraseña" name="pass" required autocomplete="off">
        <button type="submit">Iniciar Sesión</button>
        <a href="/register"> Crear una cuenta nueva </a>
        <a href="/" class="back-link">⬅ Volver al catálogo</a> 
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