<script>
  import { onMount } from "svelte";

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
      error = "Error cargando la informacion";
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

    if (!title.trim()) return (error = "El titulo es obligatorio");
    if (!price || isNaN(Number(price))) return (error = "Precio invalido");
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
    const ok = confirm(`Seguro que quieres eliminar: ${label}?`);
    if (!ok) return;

    await fetch(`/api/food?id=${id}`, { method: "DELETE" });
    await loadAll();
  }

  $: previewPrice = Number(price || 0).toFixed(2);

  onMount(loadAll);
</script>

<main class="wrap">
  <section class="hero">
    <div class="hero-left">
      <span class="badge">Gestion de comidas</span>
      <h1>{foodEditingId ? "Edita una comida existente" : "Crea una nueva comida"}</h1>
      <p class="sub">
        El formulario y la vista previa conviven en una sola pantalla para que el alta
        se sienta mas profesional y menos saturada de acciones repetidas.
      </p>
    </div>

    <div class="hero-actions">
      <div class="hero-mini-card">
        <span>Estado del formulario</span>
        <strong>{foodEditingId ? "Modo edicion" : "Listo para crear"}</strong>
      </div>

      <div class="hero-mini-card">
        <span>Total actual</span>
        <strong>{foods.length} comidas</strong>
      </div>

      <button class="btn btn-light" on:click={loadAll} disabled={loading}>
        {loading ? "Actualizando..." : "Refrescar datos"}
      </button>
    </div>
  </section>

  {#if error}
    <div class="error">{error}</div>
  {/if}

  <section class="stats-strip">
    <article>
      <span>Precio de vista previa</span>
      <strong>${previewPrice}</strong>
    </article>
    <article>
      <span>Categorias listas</span>
      <strong>{types.length + diets.length + times.length}</strong>
    </article>
    <article>
      <span>Seleccion actual</span>
      <strong>{title ? title : "Sin titulo"}</strong>
    </article>
  </section>

  <section class="form-layout">
    <div class="panel-card">
      <div class="section-head">
        <h2>Formulario</h2>
        <span class="counter">{foodEditingId ? "Editando" : "Nuevo registro"}</span>
      </div>

      <div class="foodForm">
        <div class="row2">
          <input placeholder="Titulo" bind:value={title} />
          <input placeholder="Imagen URL" bind:value={image_url} />
        </div>

        <textarea placeholder="Descripcion" bind:value={description}></textarea>

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
        <span class="counter soft">${previewPrice}</span>
      </div>

      <article class="preview-food">
        <div class="preview-img">
          {#if image_url}
            <img src={image_url} alt={title || "Vista previa"} />
          {:else}
            <div class="noimg">Sin imagen</div>
          {/if}
        </div>

        <div class="preview-info">
          <h3>{title || "Nombre de la comida"}</h3>
          <p>{description || "Aqui aparecera la descripcion de la comida."}</p>

          <div class="bottom">
            <span class="price">${previewPrice}</span>
            <span class="preview-meta">
              {cat_type_id || cat_time_id || cat_diet_id ? "Categorias seleccionadas" : "Sin categorias"}
            </span>
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
              <div class="noimg">Sin imagen</div>
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
        <p class="muted">No hay comidas todavia.</p>
      {/each}
    </div>
  </section>
</main>

<style>
  .wrap {
    display: flex;
    flex-direction: column;
    gap: 1.1rem;
  }

  .hero {
    display: grid;
    grid-template-columns: minmax(0, 1.1fr) minmax(300px, 0.9fr);
    gap: 1rem;
    padding: 1.55rem;
    border-radius: 30px;
    background: linear-gradient(145deg, rgba(255, 248, 239, 0.98), rgba(236, 226, 216, 0.95));
    border: 1px solid rgba(255, 248, 239, 0.08);
    box-shadow: 0 24px 48px rgba(0, 0, 0, 0.18);
  }

  .hero-left {
    min-width: 0;
  }

  .badge {
    display: inline-block;
    padding: 0.4rem 0.82rem;
    border-radius: 999px;
    background: #f4e1b3;
    color: #8a4b08;
    font-size: 0.8rem;
    font-weight: 800;
    margin-bottom: 0.65rem;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  h1 {
    margin: 0;
    color: #1c1917;
    font-size: clamp(2.15rem, 4vw, 3.25rem);
    line-height: 0.98;
    font-weight: 800;
    letter-spacing: -0.04em;
  }

  .sub {
    margin: 0.65rem 0 0;
    font-size: 1rem;
    color: #374151;
    line-height: 1.7;
    font-weight: 600;
  }

  .hero-actions {
    display: grid;
    gap: 0.8rem;
    align-content: start;
  }

  .hero-mini-card {
    padding: 1rem;
    border-radius: 22px;
    background: rgba(255, 255, 255, 0.64);
    border: 1px solid rgba(160, 148, 138, 0.18);
    color: #374151;
  }

  .hero-mini-card span {
    display: block;
    font-size: 0.84rem;
    color: #6b7280;
    margin-bottom: 0.3rem;
  }

  .hero-mini-card strong {
    color: #111827;
    font-size: 1.12rem;
  }

  .stats-strip {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1rem;
  }

  .stats-strip article {
    padding: 1rem 1.1rem;
    border-radius: 22px;
    background: rgba(255, 248, 239, 0.92);
    border: 1px solid rgba(255, 248, 239, 0.08);
    box-shadow: 0 20px 38px rgba(0, 0, 0, 0.14);
    color: #1f2937;
  }

  .stats-strip span {
    display: block;
    margin-bottom: 0.45rem;
    color: #6b7280;
    font-size: 0.85rem;
  }

  .stats-strip strong {
    display: block;
    color: #111827;
    font-size: 1.4rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .error {
    background: rgba(69, 10, 10, 0.72);
    border: 1px solid rgba(248, 113, 113, 0.35);
    color: #fecaca;
    padding: 0.95rem 1rem;
    border-radius: 16px;
    font-weight: 600;
  }

  .form-layout {
    display: grid;
    grid-template-columns: 1.25fr 0.75fr;
    gap: 1rem;
    align-items: start;
  }

  .panel-card {
    background: rgba(255, 248, 239, 0.92);
    color: #1f2937;
    border-radius: 26px;
    padding: 1.1rem;
    box-shadow: 0 20px 38px rgba(0, 0, 0, 0.14);
    border: 1px solid rgba(255, 248, 239, 0.08);
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
    color: #111827;
    font-size: 1.25rem;
    font-weight: 800;
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

  .counter.soft {
    background: #efe4d8;
    color: #8a4b08;
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
    border-radius: 16px;
    border: 1px solid #decfc2;
    background: #fcf8f4;
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
    border-color: #0f766e;
    box-shadow: 0 0 0 3px rgba(15, 118, 110, 0.12);
    background: #ffffff;
  }

  textarea {
    min-height: 115px;
    resize: vertical;
  }

  .preview-card {
    position: sticky;
    top: 1rem;
  }

  .preview-food {
    border-radius: 22px;
    overflow: hidden;
    background: #f3ece6;
    border: 1px solid #e2d3c5;
  }

  .preview-img {
    height: 210px;
    background: linear-gradient(135deg, #eaddd2, #d8c9bb);
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
    font-size: 1.2rem;
  }

  .preview-info p {
    margin: 0;
    color: #586173;
    line-height: 1.55;
    min-height: 52px;
  }

  .bottom {
    margin-top: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.8rem;
  }

  .price {
    white-space: nowrap;
    background: #efe4d8;
    color: #8a4b08;
    padding: 0.42rem 0.78rem;
    border-radius: 999px;
    font-weight: 900;
    font-size: 0.92rem;
  }

  .preview-meta {
    color: #6b7280;
    font-size: 0.85rem;
    text-align: right;
  }

  .foodsGrid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 1rem;
  }

  .foodCard {
    border-radius: 22px;
    overflow: hidden;
    background: #f3ece6;
    border: 1px solid #e2d3c5;
    box-shadow: 0 8px 20px rgba(15, 23, 42, 0.06);
    transition: transform 0.16s ease, box-shadow 0.16s ease;
  }

  .foodCard:hover {
    transform: translateY(-3px);
    box-shadow: 0 14px 28px rgba(15, 23, 42, 0.12);
  }

  .img {
    height: 170px;
    background: linear-gradient(135deg, #eaddd2, #d8c9bb);
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
    color: #6b7280;
    font-weight: 800;
    letter-spacing: 0.04em;
    text-transform: uppercase;
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
    line-height: 1.52;
    margin: 0;
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
    border-radius: 16px;
    font-weight: 800;
    cursor: pointer;
    text-decoration: none;
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

  .btn-primary {
    background: linear-gradient(135deg, #0f766e, #0b5f59);
    color: white;
    box-shadow: 0 10px 24px rgba(15, 118, 110, 0.22);
  }

  .btn-light {
    background: #ffffff;
    color: #111827;
    border: 1px solid #d6c8bc;
    font-weight: 700;
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
    padding: 0.48rem 0.76rem;
    border-radius: 12px;
    font-size: 0.85rem;
    min-width: 82px;
  }

  @media (max-width: 1100px) {
    .hero,
    .stats-strip,
    .form-layout {
      grid-template-columns: 1fr;
    }

    .preview-card {
      position: static;
    }
  }

  @media (max-width: 860px) {
    .row2.four {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media (max-width: 700px) {
    .hero {
      padding: 1.15rem;
    }

    .row2,
    .row2.four {
      grid-template-columns: 1fr;
    }

    .end {
      flex-direction: column;
    }

    .foodTop,
    .bottom {
      flex-direction: column;
      align-items: flex-start;
    }

    .actions {
      width: 100%;
      flex-wrap: wrap;
    }

    .actions .btn,
    .end .btn {
      flex: 1;
    }
  }
</style>
