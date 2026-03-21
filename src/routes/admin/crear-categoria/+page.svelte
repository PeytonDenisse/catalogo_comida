<script>
  import { onMount } from "svelte";

  let loading = false;
  let error = "";

  let diets = [];
  let times = [];
  let types = [];

  let dietName = "";
  let timeName = "";
  let typeName = "";

  let editingDietId = null;
  let editingTimeId = null;
  let editingTypeId = null;

  async function loadAll() {
    loading = true;
    error = "";

    try {
      const [rD, rT, rTy] = await Promise.all([
        fetch("/api/categoryDiets"),
        fetch("/api/categoryTime"),
        fetch("/api/categoryType")
      ]);

      const [dD, dT, dTy] = await Promise.all([rD.json(), rT.json(), rTy.json()]);

      diets = dD.data || [];
      times = dT.data || [];
      types = dTy.data || [];
    } catch {
      error = "Error cargando categorias";
    } finally {
      loading = false;
    }
  }

  async function saveType() {
    const formData = new FormData();
    formData.append("name", typeName);
    if (!typeName.trim()) return;

    if (editingTypeId) {
      formData.append("id", editingTypeId);
      await fetch("/api/categoryType", { method: "PUT", body: formData });
    } else {
      await fetch("/api/categoryType", { method: "POST", body: formData });
    }

    typeName = "";
    editingTypeId = null;
    loadAll();
  }

  async function saveDiet() {
    const formData = new FormData();
    formData.append("name", dietName);
    if (!dietName.trim()) return;

    if (editingDietId) {
      formData.append("id", editingDietId);
      await fetch("/api/categoryDiets", { method: "PUT", body: formData });
    } else {
      await fetch("/api/categoryDiets", { method: "POST", body: formData });
    }

    dietName = "";
    editingDietId = null;
    loadAll();
  }

  async function saveTime() {
    const formData = new FormData();
    formData.append("name", timeName);
    if (!timeName.trim()) return;

    if (editingTimeId) {
      formData.append("id", editingTimeId);
      await fetch("/api/categoryTime", { method: "PUT", body: formData });
    } else {
      await fetch("/api/categoryTime", { method: "POST", body: formData });
    }

    timeName = "";
    editingTimeId = null;
    loadAll();
  }

  async function deleteType(id) {
    await fetch(`/api/categoryType?id=${id}`, { method: "DELETE" });
    loadAll();
  }

  async function deleteDiet(id) {
    await fetch(`/api/categoryDiets?id=${id}`, { method: "DELETE" });
    loadAll();
  }

  async function deleteTime(id) {
    await fetch(`/api/categoryTime?id=${id}`, { method: "DELETE" });
    loadAll();
  }

  onMount(loadAll);
</script>

<main class="page">
  <section class="hero">
    <div class="hero-left">
      <span class="badge">Gestion de categorias</span>
      <h1>Tipos, dietas y horarios</h1>
      <p>Define la base del catalogo desde una sola vista.</p>
    </div>

    <div class="hero-side">
      <button class="btn btn-primary" on:click={loadAll} disabled={loading}>
        {loading ? "Actualizando..." : "Refrescar datos"}
      </button>
    </div>
  </section>

  {#if error}
    <div class="error">{error}</div>
  {/if}

  <section class="summary-grid">
    <article class="summary-card">
      <span class="summary-label">Tipos</span>
      <strong>{types.length}</strong>
      <p>{types.length === 1 ? "tipo registrado" : "tipos registrados"}</p>
    </article>

    <article class="summary-card">
      <span class="summary-label">Dietas</span>
      <strong>{diets.length}</strong>
      <p>{diets.length === 1 ? "dieta registrada" : "dietas registradas"}</p>
    </article>

    <article class="summary-card">
      <span class="summary-label">Horarios</span>
      <strong>{times.length}</strong>
      <p>{times.length === 1 ? "horario registrado" : "horarios registrados"}</p>
    </article>
  </section>

  <section class="grid">
    <div class="card accent-warm">
      <div class="card-head">
        <div>
          <h2>Tipos</h2>
          <span class="card-sub">Mexicana, Italiana, Rapida</span>
        </div>
        <span class="counter">{types.length}</span>
      </div>

      <div class="form-row">
        <input bind:value={typeName} placeholder="Escribe un tipo" />
        <button class="btn btn-primary" on:click={saveType}>
          {editingTypeId ? "Actualizar" : "Agregar"}
        </button>
      </div>

      <div class="items">
        {#each types as t}
          <div class="item">
            <span class="item-name">{t.name}</span>
            <div class="actions">
              <button
                class="btn btn-soft sm"
                on:click={() => {
                  typeName = t.name;
                  editingTypeId = t.id;
                }}
              >
                Editar
              </button>
              <button class="btn btn-danger sm" on:click={() => deleteType(t.id)}>
                Eliminar
              </button>
            </div>
          </div>
        {:else}
          <p class="muted">No hay tipos registrados.</p>
        {/each}
      </div>
    </div>

    <div class="card accent-green">
      <div class="card-head">
        <div>
          <h2>Dietas</h2>
          <span class="card-sub">Vegana, Keto, Sin gluten</span>
        </div>
        <span class="counter">{diets.length}</span>
      </div>

      <div class="form-row">
        <input bind:value={dietName} placeholder="Escribe una dieta" />
        <button class="btn btn-primary" on:click={saveDiet}>
          {editingDietId ? "Actualizar" : "Agregar"}
        </button>
      </div>

      <div class="items">
        {#each diets as d}
          <div class="item">
            <span class="item-name">{d.name}</span>
            <div class="actions">
              <button
                class="btn btn-soft sm"
                on:click={() => {
                  dietName = d.name;
                  editingDietId = d.id;
                }}
              >
                Editar
              </button>
              <button class="btn btn-danger sm" on:click={() => deleteDiet(d.id)}>
                Eliminar
              </button>
            </div>
          </div>
        {:else}
          <p class="muted">No hay dietas registradas.</p>
        {/each}
      </div>
    </div>

    <div class="card accent-blue">
      <div class="card-head">
        <div>
          <h2>Horarios</h2>
          <span class="card-sub">Desayuno, Comida, Cena</span>
        </div>
        <span class="counter">{times.length}</span>
      </div>

      <div class="form-row">
        <input bind:value={timeName} placeholder="Escribe un horario" />
        <button class="btn btn-primary" on:click={saveTime}>
          {editingTimeId ? "Actualizar" : "Agregar"}
        </button>
      </div>

      <div class="items">
        {#each times as t}
          <div class="item">
            <span class="item-name">{t.name}</span>
            <div class="actions">
              <button
                class="btn btn-soft sm"
                on:click={() => {
                  timeName = t.name;
                  editingTimeId = t.id;
                }}
              >
                Editar
              </button>
              <button class="btn btn-danger sm" on:click={() => deleteTime(t.id)}>
                Eliminar
              </button>
            </div>
          </div>
        {:else}
          <p class="muted">No hay horarios registrados.</p>
        {/each}
      </div>
    </div>

    <aside class="guide-card">
      <span class="summary-label">Estado</span>
      <h2>Resumen</h2>

      <div class="guide-stats">
        <div>
          <span>Total visible</span>
          <strong>{types.length + diets.length + times.length}</strong>
        </div>
        <div>
          <span>Estado</span>
          <strong>{loading ? "Sincronizando" : "Listo"}</strong>
        </div>
        <div>
          <span>Siguiente paso</span>
          <strong>Registrar comidas</strong>
        </div>
      </div>
    </aside>
  </section>
</main>

<style>
  .page {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .hero {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: end;
    gap: 1.2rem;
    background: linear-gradient(145deg, rgba(255, 248, 239, 0.98), rgba(236, 226, 216, 0.95));
    border: 1px solid rgba(255, 248, 239, 0.08);
    border-radius: 30px;
    padding: 1.3rem 1.45rem;
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

  .hero h1 {
    margin: 0;
    color: #1c1917;
    font-size: clamp(1.9rem, 4vw, 2.9rem);
    line-height: 1;
    font-weight: 800;
    letter-spacing: -0.04em;
  }

  .hero p {
    margin: 0.55rem 0 0;
    color: #4b5563;
    line-height: 1.55;
  }

  .hero-side {
    display: flex;
    align-items: center;
  }

  .summary-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }

  .summary-card {
    background: rgba(255, 248, 239, 0.92);
    border: 1px solid rgba(255, 248, 239, 0.08);
    border-radius: 24px;
    padding: 1.15rem 1.2rem;
    box-shadow: 0 20px 38px rgba(120, 113, 108, 0.14);
    color: #1f2937;
  }

  .summary-label {
    display: inline-block;
    margin-bottom: 0.55rem;
    padding: 0.3rem 0.7rem;
    border-radius: 999px;
    background: #ece0d2;
    color: #8a4b08;
    font-size: 0.8rem;
    font-weight: 800;
  }

  .summary-card strong {
    display: block;
    font-size: 2rem;
    color: #0f172a;
    margin-bottom: 0.35rem;
  }

  .summary-card p {
    margin: 0;
    color: #586173;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr)) 280px;
    gap: 1rem;
    align-items: start;
  }

  .card {
    background: rgba(255, 248, 239, 0.92);
    border: 1px solid rgba(255, 248, 239, 0.08);
    border-radius: 26px;
    padding: 1.1rem;
    box-shadow: 0 20px 38px rgba(120, 113, 108, 0.13);
    display: flex;
    flex-direction: column;
    gap: 1rem;
    position: relative;
    overflow: hidden;
  }

  .card::before {
    content: "";
    position: absolute;
    inset: 0 auto 0 0;
    width: 6px;
  }

  .accent-warm::before {
    background: linear-gradient(180deg, #d97706, #b45309);
  }

  .accent-green::before {
    background: linear-gradient(180deg, #0f766e, #115e59);
  }

  .accent-blue::before {
    background: linear-gradient(180deg, #2563eb, #1d4ed8);
  }

  .card-head {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 0.8rem;
  }

  .card h2 {
    margin: 0;
    color: #111827;
    font-size: 1.3rem;
  }

  .card-sub {
    display: inline-block;
    margin-top: 0.25rem;
    color: #6b7280;
    font-size: 0.88rem;
  }

  .counter {
    background: #dff3ef;
    color: #0f766e;
    border-radius: 999px;
    padding: 0.36rem 0.72rem;
    font-size: 0.82rem;
    font-weight: 800;
    white-space: nowrap;
  }

  .form-row {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 0.65rem;
    align-items: start;
  }

  .items {
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
  }

  .item {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: center;
    gap: 0.8rem;
    background: #f5ede7;
    border: 1px solid #e4d5c7;
    border-radius: 18px;
    padding: 0.9rem;
  }

  .item-name {
    color: #1f2937;
    font-weight: 700;
    line-height: 1.35;
    min-width: 0;
    word-break: break-word;
  }

  .actions {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    justify-content: flex-end;
    flex-wrap: wrap;
  }

  .muted {
    color: #6f7687;
    margin: 0.3rem 0;
    font-weight: 600;
  }

  input {
    min-width: 0;
    padding: 0.9rem 1rem;
    border-radius: 16px;
    border: 1px solid #decfc2;
    background: #fcf8f4;
    color: #172033;
    outline: none;
    box-sizing: border-box;
    font-size: 0.95rem;
    transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
  }

  input::placeholder {
    color: #7d8393;
  }

  input:focus {
    border-color: #0f766e;
    box-shadow: 0 0 0 3px rgba(15, 118, 110, 0.12);
    background: #ffffff;
  }

  .btn {
    border: none;
    padding: 0.85rem 1rem;
    border-radius: 16px;
    font-weight: 800;
    cursor: pointer;
    text-decoration: none;
    transition: transform 0.16s ease, opacity 0.16s ease, box-shadow 0.16s ease, background 0.16s ease;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
  }

  .btn:hover {
    transform: translateY(-1px);
  }

  .btn:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }

  .btn-primary {
    background: linear-gradient(135deg, #0f766e, #0b5f59);
    color: white;
    box-shadow: 0 10px 24px rgba(15, 118, 110, 0.22);
  }

  .btn-soft {
    background: #efe4d8;
    color: #5b3412;
    border: 1px solid #dbc5b0;
  }

  .btn-danger {
    background: linear-gradient(135deg, #ef4444, #dc2626);
    color: white;
  }

  .sm {
    padding: 0.5rem 0.78rem;
    border-radius: 10px;
    font-size: 0.84rem;
    min-width: 0;
  }

  .error {
    background: rgba(69, 10, 10, 0.72);
    color: #fecaca;
    padding: 1rem;
    border-radius: 16px;
    border: 1px solid rgba(248, 113, 113, 0.35);
  }

  .guide-card {
    padding: 1.2rem;
    border-radius: 26px;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.76), rgba(244, 236, 227, 0.9));
    border: 1px solid rgba(120, 113, 108, 0.08);
    box-shadow: 0 20px 38px rgba(120, 113, 108, 0.14);
    color: #1f2937;
    position: sticky;
    top: 1rem;
  }

  .guide-card h2 {
    margin: 0.9rem 0 0.7rem;
    font-size: 1.35rem;
  }

  .guide-stats {
    display: grid;
    gap: 0.75rem;
  }

  .guide-stats div {
    padding: 0.9rem 1rem;
    border-radius: 18px;
    background: rgba(255, 255, 255, 0.56);
    border: 1px solid rgba(120, 113, 108, 0.08);
  }

  .guide-stats span {
    display: block;
    color: #6b7280;
    font-size: 0.85rem;
    margin-bottom: 0.25rem;
  }

  .guide-stats strong {
    color: #1c1917;
    font-size: 1.2rem;
  }

  @media (max-width: 1000px) {
    .hero,
    .summary-grid,
    .grid {
      grid-template-columns: 1fr;
    }

    .guide-card {
      position: static;
    }
  }

  @media (max-width: 860px) {
    .form-row {
      grid-template-columns: 1fr;
    }

    .form-row .btn {
      width: 100%;
    }
  }

  @media (max-width: 700px) {
    .hero {
      padding: 1.15rem;
      grid-template-columns: 1fr;
      align-items: start;
    }

    .item {
      grid-template-columns: 1fr;
      align-items: stretch;
    }

    .actions {
      width: 100%;
      display: grid;
      grid-template-columns: 1fr 1fr;
    }

    .actions .btn {
      flex: 1;
      width: 100%;
    }
  }
</style>
