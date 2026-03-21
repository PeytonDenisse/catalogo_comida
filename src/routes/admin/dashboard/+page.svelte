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
  <section class="hero">
    <div class="hero-left">
      <span class="badge">Dashboard</span>
      <h1>Resumen general</h1>
      <p class="sub">
        <strong>{data.user.username}</strong>
        <span class="dot">•</span>
        <span>{data.user.email}</span>
      </p>
    </div>

    <div class="hero-actions">
      <button class="btn btn-light" on:click={loadAll} disabled={loading}>
        {loading ? "Actualizando..." : "Refrescar"}
      </button>
      <button class="btn btn-danger-soft" on:click={handleLogout}>
        Salir
      </button>
    </div>
  </section>

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
        <h3>Resumen rapido</h3>
      </div>

      <div class="summary-list">
        <div class="summary-item">
          <span>Total de comidas</span>
          <strong>{foods.length}</strong>
        </div>
        <div class="summary-item">
          <span>Total de categorias</span>
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
        <button class="quick-btn purple" on:click={() => goto("/admin/crear-comida")}>
          Nueva comida
        </button>
        <button class="quick-btn beige" on:click={() => goto("/admin/crear-categoria")}>
          Nueva categoria
        </button>
        <button class="quick-btn white" on:click={() => goto("/foods")}>
          Ver catalogo
        </button>
      </div>
    </div>

    <div class="panel-card latest-card">
      <div class="section-head">
        <h3>Ultimas comidas</h3>
        <span class="counter">{foods.length}</span>
      </div>

      <div class="food-list">
        {#each latestFoods as food}
          <div class="food-item">
            <div class="thumb">
              {#if food.image_url}
                <img src={food.image_url} alt={food.title} />
              {:else}
                <span>Sin imagen</span>
              {/if}
            </div>

            <div class="food-meta">
              <strong>{food.title}</strong>
              <span>{food.description}</span>
            </div>

            <div class="food-price">${food.price}</div>
          </div>
        {:else}
          <p class="muted">Todavia no hay comidas registradas.</p>
        {/each}
      </div>
    </div>
  </section>
</main>

<style>
  .wrap {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .hero {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
    padding: 1.3rem 1.45rem;
    border-radius: 30px;
    background: linear-gradient(145deg, rgba(255, 248, 239, 0.98), rgba(236, 226, 216, 0.95));
    border: 1px solid rgba(255, 248, 239, 0.08);
    box-shadow: 0 22px 42px rgba(120, 113, 108, 0.16);
  }

  .badge {
    display: inline-block;
    padding: 0.4rem 0.82rem;
    border-radius: 999px;
    background: #f4e1b3;
    color: #8a4b08;
    font-size: 0.8rem;
    font-weight: 800;
    margin-bottom: 0.7rem;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  h1 {
    margin: 0;
    color: #1c1917;
    font-size: clamp(1.9rem, 4vw, 2.9rem);
    line-height: 1;
    font-weight: 800;
    letter-spacing: -0.04em;
  }

  .sub {
    margin: 0.55rem 0 0;
    color: #4b5563;
    line-height: 1.55;
    display: flex;
    flex-wrap: wrap;
    gap: 0.45rem;
    align-items: center;
  }

  .sub strong {
    color: #111827;
  }

  .dot {
    opacity: 0.5;
  }

  .hero-actions {
    display: flex;
    gap: 0.7rem;
    flex-wrap: wrap;
  }

  .error {
    background: rgba(69, 10, 10, 0.72);
    border: 1px solid rgba(248, 113, 113, 0.35);
    color: #fecaca;
    padding: 0.95rem 1rem;
    border-radius: 16px;
    font-weight: 600;
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
  }

  .stat-card {
    background: rgba(255, 248, 239, 0.92);
    color: #1f2937;
    border-radius: 24px;
    padding: 1.15rem;
    border: 1px solid rgba(255, 248, 239, 0.08);
    box-shadow: 0 18px 34px rgba(120, 113, 108, 0.12);
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
    background: rgba(255, 248, 239, 0.92);
    color: #1f2937;
    border-radius: 26px;
    padding: 1.1rem;
    box-shadow: 0 18px 34px rgba(120, 113, 108, 0.12);
    border: 1px solid rgba(255, 248, 239, 0.08);
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
    background: #dff3ef;
    color: #0f766e;
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
    background: #f5ede7;
    border: 1px solid #e4d5c7;
    border-radius: 16px;
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
    grid-template-columns: repeat(3, 1fr);
    gap: 0.75rem;
  }

  .quick-btn {
    border: none;
    border-radius: 16px;
    padding: 0.95rem 1rem;
    font-weight: 800;
    cursor: pointer;
    transition: transform 0.16s ease, box-shadow 0.16s ease;
  }

  .quick-btn:hover {
    transform: translateY(-2px);
  }

  .quick-btn.purple {
    background: linear-gradient(135deg, #0f766e, #0b5f59);
    color: white;
    box-shadow: 0 10px 20px rgba(15, 118, 110, 0.18);
  }

  .quick-btn.beige {
    background: #efe4d8;
    color: #5b3412;
  }

  .quick-btn.white {
    background: white;
    color: #111827;
    border: 1px solid #d7d1cc;
  }

  .food-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .food-item {
    display: grid;
    grid-template-columns: 68px minmax(0, 1fr) auto;
    gap: 0.8rem;
    align-items: center;
    padding: 0.8rem;
    border-radius: 18px;
    background: #f5ede7;
    border: 1px solid #e4d5c7;
  }

  .thumb {
    width: 68px;
    height: 68px;
    border-radius: 16px;
    overflow: hidden;
    background: #e7ddd5;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #6b7280;
    font-size: 0.82rem;
    text-align: center;
  }

  .thumb img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .food-meta {
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 0.18rem;
  }

  .food-meta strong {
    color: #111827;
  }

  .food-meta span {
    color: #6b7280;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .food-price {
    color: #0f766e;
    font-weight: 900;
    white-space: nowrap;
  }

  .muted {
    color: #6b7280;
    margin: 0;
    font-weight: 600;
  }

  .btn {
    border: none;
    padding: 0.85rem 1rem;
    border-radius: 16px;
    font-weight: 800;
    cursor: pointer;
    transition: transform 0.16s ease, opacity 0.16s ease, box-shadow 0.16s ease, background 0.16s ease;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .btn:hover {
    transform: translateY(-1px);
  }

  .btn:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }

  .btn-light {
    background: #ffffff;
    color: #111827;
    border: 1px solid #d6c8bc;
  }

  .btn-danger-soft {
    background: #efe4d8;
    color: #5b3412;
    border: 1px solid #dbc5b0;
  }

  @media (max-width: 1100px) {
    .stats-grid,
    .dashboard-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 760px) {
    .quick-grid {
      grid-template-columns: 1fr;
    }

    .food-item {
      grid-template-columns: 1fr;
      justify-items: start;
    }
  }
</style>
