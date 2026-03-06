<script>
    import { goto } from '$app/navigation';
    function handleLogout() {
        console.log("Sesión cerrada");
        goto('/login'); 
    }
</script>

<nav class="navbar">
    <a href="/" class="btn-back">⬅ Volver al Catálogo</a>
    <div class="actions">
        <span class="badge-admin">Admin Mode</span>
        <button class="btn-logout" on:click={handleLogout}>Cerrar Sesión</button>
    </div>
</nav>

<style>
    .navbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 2rem;
        background: #111;
        border-bottom: 1px solid #333;
        position: sticky;
        top: 0;
        z-index: 100;
        color: white;
    }
    .btn-back { 
        color: #ffaa00; 
        text-decoration: none; 
        font-size: 0.9rem; 
        font-weight: bold;
    }
    .btn-back:hover { text-decoration: underline; }
    
    .badge-admin { 
        background: #333; 
        padding: 4px 10px; 
        border-radius: 4px; 
        font-size: 0.8rem; 
        margin-right: 15px;
        color: #aaa;
    }
    
    .btn-logout { 
        background: #ff4444; 
        border: none; 
        color: white; 
        padding: 8px 15px; 
        border-radius: 6px; 
        cursor: pointer; 
        font-weight: bold;
        transition: background 0.2s;
    }
    .btn-logout:hover { background: #cc3333; }
</style>