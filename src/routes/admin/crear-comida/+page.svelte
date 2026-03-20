<script>
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";

  let loading = false;
  let error = "";

  let diets = [];
  let times = [];
  let types = [];
  let foods = [];

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
    } catch {
      error = "Error cargando la información";
    } finally {
      loading = false;
    }
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
    window.scrollTo({ top: 0, behavior: "smooth" });
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
    const ok = confirm(`¿Seguro que quieres eliminar: ${label}?`);
    if (!ok) return;

    await fetch(`/api/food?id=${id}`, { method: "DELETE" });
    await loadAll();
  }

  $: previewPrice = Number(price || 0).toFixed(2);

  onMount(loadAll);
</script>

<main class="wrap">
  <header class="hero">
    <div class="hero-left">
      <span class="badge">Crear comida</span>
      <h1>{foodEditingId ? "Editar comida" : "Nueva comida"}</h1>
      <p class="sub">
        Completa el formulario y administra tus productos.
      </p>
    </div>

    <div class="hero-actions">
      <button class="btn btn-light" on:click={loadAll} disabled={loading}>
        {loading ? "Actualizando..." : "Refrescar"}
      </button>

      <button class="btn btn-soft" on:click={() => goto("/admin/dashboard")}>
        Volver
      </button>

      <button class="btn btn-primary" on:click={saveFood} disabled={loading}>
        {foodEditingId ? "Guardar cambios" : "Crear comida"}
      </button>
    </div>
  </header>

  {#if error}
    <div class="error">{error}</div>
  {/if}

  <section class="form-layout">
    <div class="panel-card form-card">
      <div class="section-head">
        <h2>Formulario</h2>
        <span class="counter">{foods.length} comidas</span>
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
    </div>

    <div class="panel-card preview-card">
      <div class="section-head">
        <h2>Vista previa</h2>
      </div>

      <article class="preview-food">
        <div class="preview-img">
          {#if image_url}
            <img src={image_url} alt={title || "Vista previa"} />
          {:else}
            <div class="noimg">🍽️ Sin imagen</div>
          {/if}
        </div>

        <div class="preview-info">
          <h3>{title || "Nombre de la comida"}</h3>
          <p>{description || "Aquí aparecerá la descripción de la comida."}</p>
          <div class="bottom">
            <span class="price">${previewPrice}</span>
          </div>
        </div>
      </article>
    </div>
  </section>

  <section class="panel-card">
    <div class="section-head">
      <h2>Comidas registradas</h2>
      <span class="counter">{foods.length}</span>
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
        <p class="muted">No hay comidas todavía.</p>
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

  .form-layout {
    display: grid;
    grid-template-columns: 1.25fr 0.75fr;
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
    margin-bottom: 0.9rem;
  }

  .section-head h2 {
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

  .foodForm {
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
  }

  .row,
  .row2 {
    display: grid;
    gap: 0.7rem;
  }

  .row2 {
    grid-template-columns: 1fr 1fr;
  }

  .row2.four {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }

  .end {
    display: flex;
    justify-content: flex-end;
    gap: 0.7rem;
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

  textarea {
    min-height: 105px;
    resize: vertical;
  }

  .preview-food {
    border-radius: 18px;
    overflow: hidden;
    background: #ddd6d2;
    border: 1px solid #c9c0bb;
  }

  .preview-img {
    height: 210px;
    background: #cfc7c2;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .preview-img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .preview-info {
    padding: 1rem;
  }

  .preview-info h3 {
    margin: 0 0 0.5rem;
    color: #162033;
    font-size: 1.15rem;
  }

  .preview-info p {
    margin: 0;
    color: #586173;
    line-height: 1.5;
    min-height: 52px;
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

  .img img {
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

  .info h3 {
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

  .bottom {
    margin-top: 1rem;
    display: flex;
    justify-content: flex-end;
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

  .btn-danger {
    background: linear-gradient(135deg, #ef4444, #dc2626);
    color: white;
  }

  .sm {
    padding: 0.48rem 0.76rem;
    border-radius: 10px;
    font-size: 0.85rem;
    min-width: 82px;
    justify-content: center;
  }

  @media (max-width: 1000px) {
    .form-layout {
      grid-template-columns: 1fr;
    }

    .row2.four {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media (max-width: 700px) {
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

    .row2,
    .row2.four {
      grid-template-columns: 1fr;
    }

    .end {
      flex-direction: column;
    }

    .foodTop {
      flex-direction: column;
      align-items: flex-start;
    }

    .actions {
      width: 100%;
      flex-wrap: wrap;
    }

    .actions .btn {
      flex: 1;
      justify-content: center;
    }
  }
</style>