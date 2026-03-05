<script>
    let { 
        nombre = "Producto sin nombre", 
        precio = 0, 
        imagen = "https://via.placeholder.com/150", 
        stock = 0,
        categoria = "General"
    } = $props();
</script>

<div class="card" class:out-of-stock={stock <= 0}>
    <div class="image-container">
        <img src={imagen} alt={nombre} />
        {#if stock <= 0}
            <div class="badge-error">Agotado</div>
        {/if}
    </div>

    <div class="content">
        <span class="category">{categoria}</span>
        <h3>{nombre}</h3>
        <p class="price">${precio}</p>
        
        {#if stock > 0}
            <button class="btn-add">Agregar al carrito</button>
        {:else}
            <button class="btn-disabled" disabled>No disponible</button>
        {/if}
    </div>
</div>

<style>
    .card {
        background: #2a2a2a; /* Color oscuro acorde a tu app.css */
        border-radius: 12px;
        overflow: hidden;
        transition: transform 0.3s ease;
        display: flex;
        flex-direction: column;
        height: 100%;
        border: 1px solid #444;
    }

    .card:hover {
        transform: translateY(-5px);
    }

    .out-of-stock {
        opacity: 0.7;
        filter: grayscale(0.5);
    }

    .image-container {
        position: relative;
        width: 100%;
        aspect-ratio: 16 / 9;
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .badge-error {
        position: absolute;
        top: 10px;
        right: 10px;
        background: #ff4444;
        color: white;
        padding: 5px 10px;
        border-radius: 4px;
        font-weight: bold;
        font-size: 0.8rem;
    }

    .content {
        padding: 1.5rem;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .category {
        font-size: 0.75rem;
        color: #aaa;
        text-transform: uppercase;
    }

    h3 {
        margin: 0;
        font-size: 1.2rem;
        color: white;
    }

    .price {
        font-size: 1.5rem;
        font-weight: bold;
        color: #4caf50;
    }

    button {
        margin-top: auto;
        padding: 10px;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-weight: bold;
        transition: background 0.2s;
    }

    .btn-add {
        background: #ffaa00;
        color: #242424;
    }

    .btn-add:hover {
        background: #ffc247;
    }

    .btn-disabled {
        background: #444;
        color: #888;
        cursor: not-allowed;
    }

    @media (max-width: 600px) {
        .card {
            max-width: 100%;
        }
    }
</style>