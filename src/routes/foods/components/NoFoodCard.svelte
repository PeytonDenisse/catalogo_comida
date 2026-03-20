<script>
    import { FrownIcon } from "@lucide/svelte";

</script>

<div class="empty-box">
    <div class="empty-icon">🍽️</div>
    <h3>No se encontro comida <FrownIcon size={13} /></h3>
    <p>Prueba con otra búsqueda o cambia los filtros.</p>
</div>

<style>
    .empty-box{
    grid-column:1/-1;
    background:white;
    border:2px dashed #ffd1bb;
    border-radius:22px;
    padding:3rem 1rem;
    text-align:center;
    color:#6b7280;
    }

    .empty-icon{
    font-size:2.5rem;
    margin-bottom:.6rem;
    }

  .empty-box {
    grid-column: 1 / -1;
    background: white;
    border: 2px dashed #ffd1bb;
    border-radius: 22px;
    padding: 3rem 1rem;
    text-align: center;
    color: #6b7280;
  }

  .empty-icon {
    font-size: 2.5rem;
    margin-bottom: 0.6rem;
  }

  .empty-box h3 {
    margin: 0 0 0.5rem 0;
    color: #1f2937;
  }

  .empty-box p {
    margin: 0;
  }
</style>