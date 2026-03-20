<script>
  import { goto } from "$app/navigation";
</script>

<main class="menu-page">
  <section class="menu-card">
    <span class="badge">Panel de administración</span>
    <h1>¿Qué quieres hacer?</h1>
    <p>Selecciona una opción para continuar.</p>

    <div class="menu-buttons">
      <button class="menu-btn primary" on:click={() => goto("/panel/crear-categoria")}>
        Crear categoría
      </button>

      <button class="menu-btn secondary" on:click={() => goto("/panel/crear-comida")}>
        Crear comida
      </button>

      <button class="menu-btn ghost" on:click={() => goto("/panel/dashboard")}>
        Dashboard
      </button>
    </div>
  </section>
</main>

<style>
  :global(body) {
    margin: 0;
    font-family: "Segoe UI", system-ui, sans-serif;
    background: linear-gradient(135deg, #15121f 0%, #111827 50%, #0f172a 100%);
  }

  .menu-page {
    min-height: 100dvh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    box-sizing: border-box;
  }

  .menu-card {
    width: 100%;
    max-width: 520px;
    background: #ece6e2;
    border: 1px solid #d4cbc5;
    border-radius: 24px;
    padding: 2rem;
    text-align: center;
    box-shadow: 0 16px 35px rgba(0, 0, 0, 0.18);
  }

  .badge {
    display: inline-block;
    padding: 0.4rem 0.8rem;
    border-radius: 999px;
    background: #dcd4ff;
    color: #5b21b6;
    font-size: 0.85rem;
    font-weight: 800;
    margin-bottom: 1rem;
  }

  h1 {
    margin: 0;
    color: #1f2937;
    font-size: clamp(2rem, 4vw, 2.6rem);
    font-weight: 800;
  }

  p {
    margin: 0.8rem 0 1.6rem;
    color: #4b5563;
    font-size: 1rem;
  }

  .menu-buttons {
    display: flex;
    flex-direction: column;
    gap: 0.9rem;
  }

  .menu-btn {
    border: none;
    border-radius: 16px;
    padding: 1rem 1.2rem;
    font-size: 1rem;
    font-weight: 800;
    cursor: pointer;
    transition: transform 0.16s ease, opacity 0.16s ease, box-shadow 0.16s ease;
  }

  .menu-btn:hover {
    transform: translateY(-2px);
  }

  .primary {
    background: linear-gradient(135deg, #6d5dfc, #7c3aed);
    color: white;
    box-shadow: 0 10px 22px rgba(109, 93, 252, 0.2);
  }

  .secondary {
    background: #f6dccf;
    color: #d65a12;
  }

  .ghost {
    background: #d4ccc7;
    color: #394150;
  }
</style>  