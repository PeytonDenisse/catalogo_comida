<script>
  import { onMount } from "svelte";
  export let data; // viene de +layout.server.js

  let loading = false;
  let error = "";

  // LISTAS
  let diets = [];
  let times = [];
  let types = [];
  let foods = [];

  // FORM CATEGORIES
  let dietName = "";
  let timeName = "";
  let typeName = "";

  let editingDietId = null;
  let editingTimeId = null;
  let editingTypeId = null;

  // FORM FOOD
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

  // ===== CRUD TYPES =====
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

  // ===== CRUD DIETS =====
  async function saveDiet() {
    error = "";
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
    await loadAll();
  }

  async function deleteDiet(id, label) {
    if (!confirmDelete(label)) return;
    await fetch(`/api/categoryDiets?id=${id}`, { method: "DELETE" });
    await loadAll();
  }

  // ===== CRUD TIMES =====
  async function saveTime() {
    error = "";
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
    await loadAll();
  }

  async function deleteTime(id, label) {
    if (!confirmDelete(label)) return;
    await fetch(`/api/categoryTime?id=${id}`, { method: "DELETE" });
    await loadAll();
  }

  // ===== CRUD FOODS =====
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

    // validaciones simples
    if (!title.trim()) return (error = "El título es obligatorio");
    if (!price || isNaN(Number(price))) return (error = "Precio inválido");
    if (!cat_time_id || !cat_type_id || !cat_diet_id) return (error = "Selecciona Time/Type/Diet");

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
  <header class="top">
    <div>
      <h1>Panel Admin 🍽️</h1>
      <p class="sub">Bienvenido, {data.user.username} ({data.user.email})</p>
    </div>
    <div class="right">
      <button class="btn ghost" on:click={loadAll} disabled={loading}>
        {loading ? "Actualizando..." : "Refrescar"}
      </button>
      <a class="btn" href="/foods">Ver catálogo</a>
    </div>
  </header>

  {#if error}
    <div class="error">{error}</div>
  {/if}

  <!-- ====== CATEGORIES ====== -->
  <section class="grid3">
    <div class="card">
      <h2>Types</h2>
      <div class="row">
        <input placeholder="Ej: Mexicana" bind:value={typeName} />
        <button class="btn" on:click={saveType}>{editingTypeId ? "Actualizar" : "Agregar"}</button>
      </div>

      <div class="list">
        {#each types as t}
          <div class="item">
            <span>{t.name}</span>
            <div class="actions">
              <button class="btn sm ghost" on:click={() => { typeName = t.name; editingTypeId = t.id; }}>Editar</button>
              <button class="btn sm danger" on:click={() => deleteType(t.id, t.name)}>Eliminar</button>
            </div>
          </div>
        {:else}
          <p class="muted">No hay types</p>
        {/each}
      </div>
    </div>

    <div class="card">
      <h2>Diets</h2>
      <div class="row">
        <input placeholder="Ej: Vegana" bind:value={dietName} />
        <button class="btn" on:click={saveDiet}>{editingDietId ? "Actualizar" : "Agregar"}</button>
      </div>

      <div class="list">
        {#each diets as d}
          <div class="item">
            <span>{d.name}</span>
            <div class="actions">
              <button class="btn sm ghost" on:click={() => { dietName = d.name; editingDietId = d.id; }}>Editar</button>
              <button class="btn sm danger" on:click={() => deleteDiet(d.id, d.name)}>Eliminar</button>
            </div>
          </div>
        {:else}
          <p class="muted">No hay diets</p>
        {/each}
      </div>
    </div>

    <div class="card">
      <h2>Times</h2>
      <div class="row">
        <input placeholder="Ej: Desayuno" bind:value={timeName} />
        <button class="btn" on:click={saveTime}>{editingTimeId ? "Actualizar" : "Agregar"}</button>
      </div>

      <div class="list">
        {#each times as t}
          <div class="item">
            <span>{t.name}</span>
            <div class="actions">
              <button class="btn sm ghost" on:click={() => { timeName = t.name; editingTimeId = t.id; }}>Editar</button>
              <button class="btn sm danger" on:click={() => deleteTime(t.id, t.name)}>Eliminar</button>
            </div>
          </div>
        {:else}
          <p class="muted">No hay times</p>
        {/each}
      </div>
    </div>
  </section>

  <!-- ====== FOODS ====== -->
  <section class="card big">
    <h2>Foods</h2>

    <div class="foodForm">
      <div class="row2">
        <input placeholder="Título" bind:value={title} />
        <input placeholder="Imagen URL" bind:value={image_url} />
      </div>

      <textarea placeholder="Descripción" bind:value={description}></textarea>

      <div class="row2">
        <input type="number" placeholder="Precio" bind:value={price} />

        <select bind:value={cat_time_id}>
          <option value="">Time</option>
          {#each times as t}
            <option value={t.id}>{t.name}</option>
          {/each}
        </select>

        <select bind:value={cat_type_id}>
          <option value="">Type</option>
          {#each types as t}
            <option value={t.id}>{t.name}</option>
          {/each}
        </select>

        <select bind:value={cat_diet_id}>
          <option value="">Diet</option>
          {#each diets as d}
            <option value={d.id}>{d.name}</option>
          {/each}
        </select>
      </div>

      <div class="row end">
        <button class="btn ghost" on:click={clearFoodForm} disabled={loading}>Limpiar</button>
        <button class="btn" on:click={saveFood} disabled={loading}>
          {foodEditingId ? "Actualizar Food" : "Crear Food"}
        </button>
      </div>
    </div>

    <div class="foodsGrid">
      {#each foods as f}
        <div class="foodCard">
          <div class="img">
            {#if f.image_url}
              <img src={f.image_url} alt={f.title} />
            {:else}
              <div class="noimg">Sin imagen</div>
            {/if}
          </div>
          <div class="info">
            <h3>{f.title}</h3>
            <p class="desc">{f.description}</p>
            <p class="price">${f.price}</p>

            <div class="actions">
              <button class="btn sm ghost" on:click={() => fillFoodForm(f)}>Editar</button>
              <button class="btn sm danger" on:click={() => deleteFood(f.id, f.title)}>Eliminar</button>
            </div>
          </div>
        </div>
      {:else}
        <p class="muted">No hay foods</p>
      {/each}
    </div>
  </section>
</main>

<style>
  :global(body){ margin:0; background:#0f0f0f; color:white; font-family: system-ui; }
  .wrap{ max-width:1200px; margin:0 auto; padding: 2rem; display:flex; flex-direction:column; gap: 1.5rem; }
  .top{ display:flex; justify-content:space-between; align-items:flex-start; gap: 1rem; flex-wrap:wrap; }
  h1{ margin:0; }
  .sub{ margin:.3rem 0 0; color:#9aa0a6; }
  .right{ display:flex; gap:.6rem; align-items:center; }
  .error{ background: rgba(255,70,70,.12); border: 1px solid rgba(255,70,70,.35); padding: .8rem 1rem; border-radius: 12px; color:#ff6b6b; }

  .grid3{ display:grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
  @media (max-width: 1000px){ .grid3{ grid-template-columns: 1fr; } }

  .card{ background:#141414; border:1px solid #222; border-radius: 16px; padding: 1rem; }
  .big{ padding: 1.2rem; }
  .row{ display:flex; gap:.6rem; margin:.8rem 0; }
  .row2{ display:grid; grid-template-columns: 1fr 1fr; gap:.6rem; }
  @media (max-width: 700px){ .row2{ grid-template-columns: 1fr; } }
  .end{ justify-content:flex-end; }

  input, select, textarea{
    width:100%; padding:.8rem 1rem; border-radius: 12px;
    border:1px solid #2a2a2a; background:#1b1b1b; color:white;
    outline:none;
  }
  textarea{ min-height: 90px; resize: vertical; }

  .btn{
    background:#646cff; border:none; color:white;
    padding:.8rem 1rem; border-radius: 12px;
    font-weight:700; cursor:pointer;
  }
  .btn:disabled{ opacity:.6; cursor:not-allowed; }
  .ghost{ background: #1b1b1b; border: 1px solid #2a2a2a; }
  .danger{ background: #ff3b3b; }
  .sm{ padding:.45rem .7rem; border-radius: 10px; font-size: .85rem; }

  .list{ display:flex; flex-direction:column; gap:.6rem; }
  .item{ display:flex; justify-content:space-between; align-items:center; background:#111; border:1px solid #222; padding:.7rem .9rem; border-radius: 12px; }
  .actions{ display:flex; gap:.5rem; }

  .foodForm{ display:flex; flex-direction:column; gap:.6rem; margin: .8rem 0 1.2rem; }
  .foodsGrid{ display:grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 1rem; }

  .foodCard{ border:1px solid #222; border-radius: 16px; overflow:hidden; background:#101010; }
  .img{ height: 160px; background:#0b0b0b; display:flex; align-items:center; justify-content:center; }
  img{ width:100%; height:100%; object-fit:cover; display:block; }
  .noimg{ color:#666; }
  .info{ padding: .9rem; display:flex; flex-direction:column; gap:.3rem; }
  h3{ margin:0; }
  .desc{ color:#b3b3b3; font-size:.9rem; min-height: 38px; }
  .price{ font-weight:800; margin:.2rem 0 .4rem; }
  .muted{ color:#777; margin: .5rem 0; }
</style>