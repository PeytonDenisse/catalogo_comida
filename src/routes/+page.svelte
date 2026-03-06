<script>
    import { goto } from "$app/navigation";
</script>

<main class="home">

    <h1>🍔 Dynamic Food</h1>

    <p>Explora nuestro catálogo de alimentos.</p>

    <div class="buttons">
        <button on:click={() => goto("/foods")}>
            Ver catálogo
        </button>

        <button class="admin" on:click={() => goto("/login")}>
            Panel administrador
        </button>
    </div>

</main>

<style>

.home{
    min-height:100vh;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    background:#111;
    color:white;
    text-align:center;
}

h1{
    font-size:3rem;
    margin-bottom:1rem;
}

p{
    color:#aaa;
    margin-bottom:2rem;
}

.buttons{
    display:flex;
    gap:1rem;
}

button{
    padding:1rem 2rem;
    border:none;
    border-radius:10px;
    background:#6366f1;
    color:white;
    font-weight:bold;
    cursor:pointer;
}

.admin{
    background:#333;
}

button:hover{
    opacity:0.9;
}

</style>