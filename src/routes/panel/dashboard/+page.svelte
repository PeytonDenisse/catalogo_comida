<script>
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";

  export let data;

  let loading = false;
  let error = "";

  let diets = [];
  let times = [];
  let types = [];
  let foods = [];

  async function loadAll() {
    loading = true;
    error = "";

    try {
      const [rD, rT, rTy, rF] = await Promise.all([
        fetch("/api/categoryDiets"),
        fetch("/api/categoryTime"),
        fetch("/api/categoryType"),
        fetch("/api/food")
      ]);

      const [dD, dT, dTy, dF] = await Promise.all([
        rD.json(),
        rT.json(),
        rTy.json(),
        rF.json()
      ]);

      diets = dD.data || [];
      times = dT.data || [];
      types = dTy.data || [];
      foods = dF.data || [];
    } catch {
      error = "Error cargando datos del dashboard";
    } finally {
      loading = false;
    }
  }

  function handleLogout() {
    goto("/");
  }

  $: totalCategories = types.length + diets.length + times.length;
  $: latestFoods = foods.slice(0, 6);
  $: stats = [
    {
      title: "Comidas",
      value: foods.length,
      subtitle: foods.length === 1 ? "producto registrado" : "productos registrados",
      tone: "purple"
    },
    {
      title: "Tipos",
      value: types.length,
      subtitle: types.length === 1 ? "tipo creado" : "tipos creados",
      tone: "orange"
    },
    {
      title: "Dietas",
      value: diets.length,
      subtitle: diets.length === 1 ? "dieta creada" : "dietas creadas",
      tone: "green"
    },
    {
      title: "Horarios",
      value: times.length,
      subtitle: times.length === 1 ? "horario creado" : "horarios creados",
      tone: "blue"
    }
  ];

  onMount(loadAll);
</script>

<main class="wrap">
  <header class="hero">
    <div class="hero-left">
      <span class="badge">Dashboard</span>
      <h1>Resumen general</h1>
      <p class="sub">
        Bienvenido, <strong>{data.user.username}</strong>
        <span class="dot">•</span>
        <span>{data.user.email}</span>
      </p>
    </div>

    <div class="hero-actions">
      <button class="btn btn-light" on:click={loadAll} disabled={loading}>
        {loading ? "Actualizando..." : "Refrescar"}
      </button>

      <button class="btn btn-primary" on:click={() => goto("/panel/crear-comida")}>
        Crear comida
      </button>

      <button class="btn btn-soft" on:click={() => goto("/panel/crear-categoria")}>
        Crear categoría
      </button>

      <button class="btn btn-danger-soft" on:click={handleLogout}>
        Salir
      </button>
    </div>
  </header>

  {#if error}
    <div class="error">{error}</div>
  {/if}

  <section class="stats-grid">
    {#each stats as stat}
      <article class="stat-card {stat.tone}">
        <div class="stat-top">
          <span class="stat-title">{stat.title}</span>
          <span class="mini-badge">{stat.value}</span>
        </div>

        <h2>{stat.value}</h2>
        <p>{stat.subtitle}</p>
      </article>
    {/each}
  </section>

  <section class="dashboard-grid">
    <div class="panel-card summary-card">
      <div class="section-head">
        <h3>Resumen rápido</h3>
      </div>

      <div class="summary-list">
        <div class="summary-item">
          <span>Total de comidas</span>
          <strong>{foods.length}</strong>
        </div>

        <div class="summary-item">
          <span>Total de categorías</span>
          <strong>{totalCategories}</strong>
        </div>

        <div class="summary-item">
          <span>Tipos creados</span>
          <strong>{types.length}</strong>
        </div>

        <div class="summary-item">
          <span>Dietas creadas</span>
          <strong>{diets.length}</strong>
        </div>

        <div class="summary-item">
          <span>Horarios creados</span>
          <strong>{times.length}</strong>
        </div>
      </div>

      <div class="quick-grid">
        <button class="quick-btn purple" on:click={() => goto("/panel/crear-comida")}>
          Nueva comida
        </button>

        <button class="quick-btn beige" on:click={() => goto("/panel/crear-categoria")}>
          Nueva categoría
        </button>

        <button class="quick-btn white" on:click={() => goto("/foods")}>
          Ver catálogo
        </button>
      </div>
    </div>

    <div class="panel-card latest-card">
      <div class="section-head">
        <h3>Últimas comidas</h3>
        <span class="counter">{foods.length}</span>
      </div>

      <div class="food-list">
        {#each latestFoods as food}
          <div class="food-item">
            <div class="thumb">
              {#if food.image_url}
                <img src={food.image_url} alt={food.title} />
              {:else}
                <span>🍽️</span>
              {/if}
            </div>

            <div class="food-meta">
              <strong>{food.title}</strong>
              <span>{food.description}</span>
            </div>

            <div class="food-price">${food.price}</div>
          </div>
        {:else}
          <p class="muted">Todavía no hay comidas registradas.</p>
        {/each}
      </div>
    </div>
  </section>
</main>

<style>
  :global(body) {
    margin: 0;
    background: linear-gradient(135deg, #15121f 0%, #111827 50%, #0f172a 100%);
    color: #f8fafc;
    font-family: "Segoe UI", system-ui, sans-serif;
  }

  .wrap {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1.4rem;
  }

  .hero {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1.2rem;
    flex-wrap: wrap;
    padding: 1.5rem 1.7rem;
    border-radius: 24px;
    background: linear-gradient(135deg, #f4efec, #ece6e2);
    border: 1px solid #d4cbc5;
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.12);
  }

  .hero-left {
    flex: 1;
    min-width: 260px;
  }

  .badge {
    display: inline-block;
    padding: 0.38rem 0.82rem;
    border-radius: 999px;
    background: #dcd4ff;
    color: #5b21b6;
    font-size: 0.86rem;
    font-weight: 800;
    margin-bottom: 0.65rem;
  }

  h1 {
    margin: 0;
    color: #1f2937;
    font-size: clamp(2rem, 4vw, 2.7rem);
    line-height: 1.05;
    font-weight: 800;
    letter-spacing: -0.03em;
  }

  .sub {
    margin: 0.65rem 0 0;
    font-size: 1rem;
    color: #374151;
    font-weight: 600;
    display: flex;
    flex-wrap: wrap;
    gap: 0.45rem;
    align-items: center;
  }

  .sub strong {
    color: #111827;
    font-weight: 800;
  }

  .dot {
    opacity: 0.6;
  }

  .hero-actions {
    display: flex;
    gap: 0.7rem;
    align-items: center;
    flex-wrap: wrap;
  }

  .hero-actions .btn {
    min-width: 126px;
    text-align: center;
    justify-content: center;
  }

  .error {
    background: #3b1d24;
    border: 1px solid #7f1d1d;
    color: #fecaca;
    padding: 0.95rem 1rem;
    border-radius: 14px;
    font-weight: 600;
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
  }

  .stat-card {
    background: #e6dfdb;
    color: #1f2937;
    border-radius: 20px;
    padding: 1.15rem;
    border: 1px solid #d4cbc5;
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.08);
  }

  .stat-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.7rem;
    margin-bottom: 0.8rem;
  }

  .stat-title {
    font-size: 0.95rem;
    font-weight: 800;
    color: #1f2544;
  }

  .mini-badge {
    padding: 0.3rem 0.65rem;
    border-radius: 999px;
    font-size: 0.8rem;
    font-weight: 800;
  }

  .stat-card.purple .mini-badge {
    background: #dcd4ff;
    color: #5b21b6;
  }

  .stat-card.orange .mini-badge {
    background: #f6dccf;
    color: #d65a12;
  }

  .stat-card.green .mini-badge {
    background: #d6f3df;
    color: #18794e;
  }

  .stat-card.blue .mini-badge {
    background: #d6e6ff;
    color: #1d4ed8;
  }

  .stat-card h2 {
    margin: 0;
    font-size: 2rem;
    color: #1f2544;
  }

  .stat-card p {
    margin: 0.45rem 0 0;
    color: #586173;
    line-height: 1.5;
  }

  .dashboard-grid {
    display: grid;
    grid-template-columns: 0.95fr 1.05fr;
    gap: 1rem;
  }

  .panel-card {
    background: #e6dfdb;
    color: #1f2937;
    border-radius: 22px;
    padding: 1rem;
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.08);
    border: 1px solid #d4cbc5;
  }

  .section-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.8rem;
    margin-bottom: 1rem;
  }

  .section-head h3 {
    margin: 0;
    color: #1f2544;
    font-size: 1.2rem;
    font-weight: 800;
  }

  .counter {
    background: #dcd4ff;
    color: #5b21b6;
    border-radius: 999px;
    padding: 0.36rem 0.72rem;
    font-size: 0.82rem;
    font-weight: 800;
  }

  .summary-list {
    display: grid;
    gap: 0.7rem;
    margin-bottom: 1rem;
  }

  .summary-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    background: #dcd5d1;
    border: 1px solid #cbc1bb;
    border-radius: 14px;
    padding: 0.9rem 1rem;
  }

  .summary-item span {
    color: #394150;
    font-weight: 600;
  }

  .summary-item strong {
    color: #1f2544;
    font-size: 1.1rem;
  }

  .quick-grid {
    display: grid;
    gap: 0.8rem;
  }

  .quick-btn {
    border: none;
    border-radius: 16px;
    padding: 1rem;
    font-size: 0.98rem;
    font-weight: 800;
    cursor: pointer;
    text-align: left;
    transition: transform 0.16s ease;
  }

  .quick-btn:hover {
    transform: translateY(-1px);
  }

  .quick-btn.purple {
    background: linear-gradient(135deg, #6d5dfc, #7c3aed);
    color: white;
  }

  .quick-btn.beige {
    background: #d4ccc7;
    color: #394150;
    border: 1px solid #bfb6b0;
  }

  .quick-btn.white {
    background: #ffffff;
    color: #111827;
    border: 1px solid #cfc7c2;
  }

  .food-list {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  }

  .food-item {
    display: grid;
    grid-template-columns: 64px 1fr auto;
    gap: 0.8rem;
    align-items: center;
    background: #dcd5d1;
    border: 1px solid #cbc1bb;
    border-radius: 16px;
    padding: 0.8rem;
  }

  .thumb {
    width: 64px;
    height: 64px;
    border-radius: 14px;
    overflow: hidden;
    background: #cfc7c2;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #5f6878;
  }

  .thumb img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .food-meta {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    min-width: 0;
  }

  .food-meta strong {
    color: #253047;
  }

  .food-meta span {
    color: #586173;
    font-size: 0.92rem;
    line-height: 1.4;
  }

  .food-price {
    background: #f6dccf;
    color: #d65a12;
    padding: 0.45rem 0.8rem;
    border-radius: 999px;
    font-weight: 900;
    white-space: nowrap;
  }

  .muted {
    color: #6f7687;
    margin: 0.4rem 0;
    font-weight: 600;
  }

  .btn {
    border: none;
    padding: 0.85rem 1rem;
    border-radius: 14px;
    font-weight: 800;
    cursor: pointer;
    text-decoration: none;
    transition: transform 0.16s ease, opacity 0.16s ease, box-shadow 0.16s ease, background 0.16s ease;
    display: inline-flex;
    align-items: center;
  }

  .btn:hover {
    transform: translateY(-1px);
  }

  .btn:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }

  .btn-primary {
    background: linear-gradient(135deg, #6d5dfc, #7c3aed);
    color: white;
    box-shadow: 0 8px 18px rgba(109, 93, 252, 0.18);
  }

  .btn-light {
    background: #ffffff;
    color: #111827;
    border: 1px solid #cfc7c2;
    font-weight: 700;
  }

  .btn-soft {
    background: #d4ccc7;
    color: #394150;
    border: 1px solid #bfb6b0;
  }

  .btn-danger-soft {
    background: #f3d6d6;
    color: #9f1d1d;
    border: 1px solid #ddb4b4;
  }

  @media (max-width: 1000px) {
    .stats-grid {
      grid-template-columns: 1fr 1fr;
    }

    .dashboard-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 700px) {
    .wrap {
      padding: 1rem;
    }

    .stats-grid {
      grid-template-columns: 1fr;
    }

    .hero {
      padding: 1.2rem;
      align-items: flex-start;
    }

    .hero-actions {
      width: 100%;
    }

    .hero-actions .btn {
      flex: 1;
    }

    .food-item {
      grid-template-columns: 1fr;
    }
  }
</style>