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

  let dietName = "";
  let timeName = "";
  let typeName = "";

  let editingDietId = null;
  let editingTimeId = null;
  let editingTypeId = null;

  let foodEditingId = null;
  let title = "";
  let description = "";
  let image_url = "";
  let price = "";
  let cat_time_id = "";
  let cat_type_id = "";
  let cat_diet_id = "";

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
    } catch (e) {
      error = "Error cargando datos del servidor";
    } finally {
      loading = false;
    }
  }

  function confirmDelete(label) {
    return confirm(`¿Seguro que quieres eliminar: ${label}?`);
  }

  function handleLogout() {
    goto("/");
  }

  async function saveType() {
    error = "";
    const formData = new FormData();
    formData.append("name", typeName);

    try {
      if (!typeName.trim()) return;

      if (editingTypeId) {
        formData.append("id", editingTypeId);
        await fetch("/api/categoryType", { method: "PUT", body: formData });
      } else {
        await fetch("/api/categoryType", { method: "POST", body: formData });
      }

      typeName = "";
      editingTypeId = null;
      await loadAll();
    } catch {
      error = "No se pudo guardar el tipo";
    }
  }

  async function deleteType(id, label) {
    if (!confirmDelete(label)) return;
    await fetch(`/api/categoryType?id=${id}`, { method: "DELETE" });
    await loadAll();
  }

  async function saveDiet() {
    error = "";
    const formData = new FormData();
    formData.append("name", dietName);

    try {
      if (!dietName.trim()) return;

      if (editingDietId) {
        formData.append("id", editingDietId);
        await fetch("/api/categoryDiets", { method: "PUT", body: formData });
      } else {
        await fetch("/api/categoryDiets", { method: "POST", body: formData });
      }

      dietName = "";
      editingDietId = null;
      await loadAll();
    } catch {
      error = "No se pudo guardar la dieta";
    }
  }

  async function deleteDiet(id, label) {
    if (!confirmDelete(label)) return;
    await fetch(`/api/categoryDiets?id=${id}`, { method: "DELETE" });
    await loadAll();
  }

  async function saveTime() {
    error = "";
    const formData = new FormData();
    formData.append("name", timeName);

    try {
      if (!timeName.trim()) return;

      if (editingTimeId) {
        formData.append("id", editingTimeId);
        await fetch("/api/categoryTime", { method: "PUT", body: formData });
      } else {
        await fetch("/api/categoryTime", { method: "POST", body: formData });
      }

      timeName = "";
      editingTimeId = null;
      await loadAll();
    } catch {
      error = "No se pudo guardar el horario";
    }
  }

  async function deleteTime(id, label) {
    if (!confirmDelete(label)) return;
    await fetch(`/api/categoryTime?id=${id}`, { method: "DELETE" });
    await loadAll();
  }

  function fillFoodForm(food) {
    foodEditingId = food.id;
    title = food.title;
    description = food.description;
    image_url = food.image_url;
    price = food.price;
    cat_time_id = String(food.cat_time_id);
    cat_type_id = String(food.cat_type_id);
    cat_diet_id = String(food.cat_diet_id);
  }

  function clearFoodForm() {
    foodEditingId = null;
    title = "";
    description = "";
    image_url = "";
    price = "";
    cat_time_id = "";
    cat_type_id = "";
    cat_diet_id = "";
  }

  async function saveFood() {
    error = "";

    if (!title.trim()) return (error = "El título es obligatorio");
    if (!price || isNaN(Number(price))) return (error = "Precio inválido");
    if (!cat_time_id || !cat_type_id || !cat_diet_id) {
      return (error = "Selecciona horario, tipo y dieta");
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image_url", image_url);
    formData.append("price", price);
    formData.append("cat_time_id", cat_time_id);
    formData.append("cat_type_id", cat_type_id);
    formData.append("cat_diet_id", cat_diet_id);

    if (foodEditingId) {
      formData.append("id", foodEditingId);
      await fetch("/api/food", { method: "PUT", body: formData });
    } else {
      await fetch("/api/food", { method: "POST", body: formData });
    }

    clearFoodForm();
    await loadAll();
  }

  async function deleteFood(id, label) {
    if (!confirmDelete(label)) return;
    await fetch(`/api/food?id=${id}`, { method: "DELETE" });
    await loadAll();
  }

  onMount(loadAll);
</script>

<main class="wrap">
  <header class="hero">
    <div class="hero-left">
      <span class="badge">Panel de administración</span>
      <h1>Administra tu catálogo</h1>
      <p class="sub">
        Bienvenido, <strong>{data.user.username}</strong>
        <span class="dot">•</span>
        <span>{data.user.email}</span>
      </p>
    </div>

    <div class="hero-actions">

      <a href="/panel" class="btn btn-light">
        ⬅ Volver al dashboard
      </a>

      <button class="btn btn-light" on:click={loadAll} disabled={loading}>
        {loading ? "Actualizando..." : "Refrescar"}
      </button>

      <a class="btn btn-primary" href="/foods">Ver catálogo</a>

      <button class="btn btn-danger-soft" on:click={handleLogout}>
        Cerrar sesión
      </button>

    </div>
  </header>

  {#if error}
    <div class="error">{error}</div>
  {/if}

  <section class="grid3">
    <div class="panel-card">
      <div class="section-head">
        <h2>Tipos</h2>
        <span class="counter">{types.length}</span>
      </div>

      <div class="row">
        <input placeholder="Ej: Mexicana" bind:value={typeName} />
        <button class="btn btn-primary" on:click={saveType}>
          {editingTypeId ? "Actualizar" : "Agregar"}
        </button>
      </div>

      <div class="list">
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
              <button class="btn btn-danger sm" on:click={() => deleteType(t.id, t.name)}>
                Eliminar
              </button>
            </div>
          </div>
        {:else}
          <p class="muted">No hay tipos</p>
        {/each}
      </div>
    </div>

    <div class="panel-card">
      <div class="section-head">
        <h2>Dietas</h2>
        <span class="counter">{diets.length}</span>
      </div>

      <div class="row">
        <input placeholder="Ej: Vegana" bind:value={dietName} />
        <button class="btn btn-primary" on:click={saveDiet}>
          {editingDietId ? "Actualizar" : "Agregar"}
        </button>
      </div>

      <div class="list">
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
              <button class="btn btn-danger sm" on:click={() => deleteDiet(d.id, d.name)}>
                Eliminar
              </button>
            </div>
          </div>
        {:else}
          <p class="muted">No hay dietas</p>
        {/each}
      </div>
    </div>

    <div class="panel-card">
      <div class="section-head">
        <h2>Horarios</h2>
        <span class="counter">{times.length}</span>
      </div>

      <div class="row">
        <input placeholder="Ej: Desayuno" bind:value={timeName} />
        <button class="btn btn-primary" on:click={saveTime}>
          {editingTimeId ? "Actualizar" : "Agregar"}
        </button>
      </div>

      <div class="list">
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
              <button class="btn btn-danger sm" on:click={() => deleteTime(t.id, t.name)}>
                Eliminar
              </button>
            </div>
          </div>
        {:else}
          <p class="muted">No hay horarios</p>
        {/each}
      </div>
    </div>
  </section>

  <section class="foods-section">
    <div class="section-top">
      <div>
        <span class="badge badge-dark">Gestión de productos</span>
        <h2>Comidas</h2>
      </div>
      <span class="counter">{foods.length} elementos</span>
    </div>

    <div class="foodForm">
      <div class="row2">
        <input placeholder="Título" bind:value={title} />
        <input placeholder="Imagen URL" bind:value={image_url} />
      </div>

      <textarea placeholder="Descripción" bind:value={description}></textarea>

      <div class="row2 four">
        <input type="number" placeholder="Precio" bind:value={price} />

        <select bind:value={cat_time_id}>
          <option value="">Horario</option>
          {#each times as t}
            <option value={t.id}>{t.name}</option>
          {/each}
        </select>

        <select bind:value={cat_type_id}>
          <option value="">Tipo</option>
          {#each types as t}
            <option value={t.id}>{t.name}</option>
          {/each}
        </select>

        <select bind:value={cat_diet_id}>
          <option value="">Dieta</option>
          {#each diets as d}
            <option value={d.id}>{d.name}</option>
          {/each}
        </select>
      </div>

    <div class="row end">


      <button class="btn btn-soft" on:click={clearFoodForm} disabled={loading}>
        Limpiar
      </button>

      <button class="btn btn-primary" on:click={saveFood} disabled={loading}>
        {foodEditingId ? "Actualizar comida" : "Crear comida"}
      </button>

    </div>
    </div>

    <div class="foodsGrid">
      {#each foods as f}
        <article class="foodCard">
          <div class="img">
            {#if f.image_url}
              <img src={f.image_url} alt={f.title} />
            {:else}
              <div class="noimg">🍽️ Sin imagen</div>
            {/if}
          </div>

          <div class="info">
            <div class="foodTop">
              <h3>{f.title}</h3>
              <span class="price">${f.price}</span>
            </div>

            <p class="desc">{f.description}</p>

            <div class="actions">
              <button class="btn btn-soft sm" on:click={() => fillFoodForm(f)}>
                Editar
              </button>
              <button class="btn btn-danger sm" on:click={() => deleteFood(f.id, f.title)}>
                Eliminar
              </button>
            </div>
          </div>
        </article>
      {:else}
        <p class="muted">No hay comidas</p>
      {/each}
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
    border: none;
    margin-bottom: 0.65rem;
  }

  .badge-dark {
    background: #ddd6fe;
    color: #5b21b6;
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

  .grid3 {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.2rem;
  }

  .panel-card,
  .foods-section {
    background: #e6dfdb;
    color: #1f2937;
    border-radius: 22px;
    padding: 1rem;
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.08);
    border: 1px solid #d4cbc5;
  }

  .section-head,
  .section-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.8rem;
    margin-bottom: 0.9rem;
  }

  .section-head h2,
  .section-top h2 {
    margin: 0;
    color: #1f2544;
    font-size: 1.25rem;
    font-weight: 800;
  }

  .counter {
    background: #dcd4ff;
    color: #5b21b6;
    border-radius: 999px;
    padding: 0.36rem 0.72rem;
    font-size: 0.82rem;
    font-weight: 800;
    white-space: nowrap;
  }

  .row {
    display: flex;
    gap: 0.65rem;
    margin: 0.9rem 0 1rem;
  }

  .row2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.7rem;
  }

  .row2.four {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }

  .end {
    justify-content: flex-end;
  }

  .list {
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
  }

  .item {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: center;
    gap: 0.8rem;
    padding: 0.9rem;
    border-radius: 14px;
    background: #dcd5d1;
    border: 1px solid #cbc1bb;
  }

  .item-name {
    color: #253047;
    font-weight: 700;
    line-height: 1.35;
    min-width: 0;
    word-break: break-word;
  }

  .actions {
    display: flex;
    gap: 0.5rem;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: flex-end;
  }

  .muted {
    color: #6f7687;
    margin: 0.4rem 0;
    font-weight: 600;
  }

  input,
  select,
  textarea {
    width: 100%;
    padding: 0.95rem 1rem;
    border-radius: 14px;
    border: 1px solid #c9c0bb;
    background: #f4efec;
    color: #172033;
    outline: none;
    box-sizing: border-box;
    font-size: 0.96rem;
    transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
  }

  input::placeholder,
  textarea::placeholder {
    color: #7d8393;
  }

  input:focus,
  select:focus,
  textarea:focus {
    border-color: #7c3aed;
    box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.12);
    background: #f8f5f3;
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

  .btn-primary:hover {
    background: linear-gradient(135deg, #7b6cff, #8a5cf6);
    color: white;
  }

  .btn-light {
    background: #ffffff;
    color: #111827;
    border: 1px solid #cfc7c2;
    font-weight: 700;
  }

  .btn-light:hover {
    background: #f3f4f6;
  }

  .btn-soft {
    background: #d4ccc7;
    color: #394150;
    border: 1px solid #bfb6b0;
  }

  .btn-soft:hover {
    background: #cec5c0;
  }

  .btn-danger {
    background: linear-gradient(135deg, #ef4444, #dc2626);
    color: white;
  }

  .btn-danger:hover {
    background: linear-gradient(135deg, #f05252, #e3342f);
  }

  .btn-danger-soft {
    background: #f3d6d6;
    color: #9f1d1d;
    border: 1px solid #ddb4b4;
  }

  .btn-danger-soft:hover {
    background: #edcaca;
  }

  .sm {
    padding: 0.48rem 0.76rem;
    border-radius: 10px;
    font-size: 0.85rem;
    min-width: 82px;
    justify-content: center;
  }

  .foodForm {
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
    margin: 0.8rem 0 1.2rem;
  }

  .foodsGrid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 1rem;
  }

  .foodCard {
    border-radius: 18px;
    overflow: hidden;
    background: #ddd6d2;
    border: 1px solid #c9c0bb;
    box-shadow: 0 8px 20px rgba(15, 23, 42, 0.06);
    transition: transform 0.16s ease, box-shadow 0.16s ease;
  }

  .foodCard:hover {
    transform: translateY(-3px);
    box-shadow: 0 14px 28px rgba(15, 23, 42, 0.12);
  }

  .img {
    height: 170px;
    background: #cfc7c2;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .noimg {
    color: #5f6878;
    font-size: 0.95rem;
    font-weight: 600;
  }

  .info {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.55rem;
  }

  .foodTop {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 0.8rem;
  }

  h3 {
    margin: 0;
    color: #162033;
    font-size: 1.08rem;
    font-weight: 800;
  }

  .desc {
    color: #586173;
    font-size: 0.93rem;
    min-height: 42px;
    line-height: 1.48;
    margin: 0;
  }

  .price {
    white-space: nowrap;
    background: #f6dccf;
    color: #d65a12;
    padding: 0.36rem 0.72rem;
    border-radius: 999px;
    font-weight: 900;
    font-size: 0.9rem;
  }

  textarea {
    min-height: 105px;
    resize: vertical;
  }

  @media (max-width: 1000px) {
    .grid3 {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 900px) {
    .row2,
    .row2.four {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 640px) {
    .wrap {
      padding: 1rem;
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

    .row {
      flex-direction: column;
    }

    .item {
      grid-template-columns: 1fr;
      align-items: stretch;
    }

    .actions {
      width: 100%;
      justify-content: stretch;
      flex-wrap: wrap;
    }

    .actions .btn {
      flex: 1;
      text-align: center;
      justify-content: center;
    }

    .foodTop {
      flex-direction: column;
      align-items: flex-start;
    }
  }
</style>