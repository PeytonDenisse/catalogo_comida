
<script>
    import { goto } from "$app/navigation";

    async function handleRegister(e){
        const formData = new FormData(e.target);
        const res = await fetch('/api/login/register', {method: 'POST', body: formData});
        const data = await res.json();
        console.log(data);
        
        if(data.success){
            goto('/panel')
        }
    }

</script>

<main>
    <form on:submit|preventDefault={handleRegister}>
        <input type="text" placeholder="nombre" name="name" required>
        <input type="email" placeholder="email" name="email" required>
        <input type="password" placeholder="contraseña" name="pass" required autocomplete="off">
        <button type="submit">Registrarse</button>
    </form>
</main>