<nav class="navbar">
    <a href="/" class="btn-back">⬅ Volver al Catálogo</a>
    <div class="actions">
        <span>Admin Mode</span>
        <button class="btn-logout" on:click={handleLogout}>Cerrar Sesión</button>
    </div>
</nav>

<style>
    .navbar {
        display: flex;
        justify-content: space-between;
        padding: 1rem;
        background: #111;
        border-bottom: 1px solid #333;
    }
    .btn-logout { background: #ff4444; border: none; color: white; padding: 5px 10px; border-radius: 5px; cursor: pointer; }
</style>