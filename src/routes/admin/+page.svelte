<script>
  import { goto } from "$app/navigation";

  export let loading = false;
  export let error = null;
  export let types = [];
  export let diets = [];
  export let times = [];
  export let foods = [];

  // Variables de formulario (binds)
  let typeName = "", editingTypeId = null;
  let dietName = "", editingDietId = null;
  let timeName = "", editingTimeId = null;
  let title = "", image_url = "", description = "", price = 0;
  let cat_time_id = "", cat_type_id = "", cat_diet_id = "", foodEditingId = null;

  // Funciones placeholder (debes tenerlas definidas)
  const loadAll = () => {};
  const saveType = () => {};
  const deleteType = (id, name) => {};
  const saveDiet = () => {};
  const deleteDiet = (id, name) => {};
  const saveTime = () => {};
  const deleteTime = (id, name) => {};
  const saveFood = () => {};
  const clearFoodForm = () => {};
  const fillFoodForm = (f) => {};
  const deleteFood = (id, title) => {};
</script>

<main class="admin-container">
  <section class="menu-card">
    <span class="badge">Panel de administración</span>
    <h1>¿Qué quieres hacer?</h1>
    <p>Selecciona una opción para continuar.</p>

    <div class="menu-buttons">
      <div class="hero-actions">
        <button class="btn-link" on:click={() => goto('/admin/dashboard')} style="...">
          ⬅ Volver
        </button>
        <button class="btn btn-light" on:click={loadAll} disabled={loading}>
          {loading ? "Actualizando..." : "Refrescar"}
        </button>
      </div>

      <button class="menu-btn secondary" on:click={() => goto("/admin/crear-comida")}>
        Crear comida
      </button>

      <button class="menu-btn primary" on:click={() => goto("/admin/crear-categoria")}>
        Crear categoría
      </button>

      <button class="menu-btn ghost" on:click={() => goto("/admin/dashboard")}>
        Dashboard
      </button>
    </div>
  </section>

  {#if error}
    <div class="error-banner">{error}</div>
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
              <button class="btn btn-soft sm" on:click={() => { typeName = t.name; editingTypeId = t.id; }}>Editar</button>
              <button class="btn btn-danger sm" on:click={() => deleteType(t.id, t.name)}>Eliminar</button>
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
              <button class="btn btn-soft sm" on:click={() => { dietName = d.name; editingDietId = d.id; }}>Editar</button>
              <button class="btn btn-danger sm" on:click={() => deleteDiet(d.id, d.name)}>Eliminar</button>
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
              <button class="btn btn-soft sm" on:click={() => { timeName = t.name; editingTimeId = t.id; }}>Editar</button>
              <button class="btn btn-danger sm" on:click={() => deleteTime(t.id, t.name)}>Eliminar</button>
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
        <span class="badge-dark">Gestión de productos</span>
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
          {#each times as t}<option value={t.id}>{t.name}</option>{/each}
        </select>
        <select bind:value={cat_type_id}>
          <option value="">Tipo</option>
          {#each types as t}<option value={t.id}>{t.name}</option>{/each}
        </select>
        <select bind:value={cat_diet_id}>
          <option value="">Dieta</option>
          {#each diets as d}<option value={d.id}>{d.name}</option>{/each}
        </select>
      </div>

      <div class="row end">
        <button class="btn btn-soft" on:click={clearFoodForm} disabled={loading}>Limpiar</button>
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
              <button class="btn btn-soft sm" on:click={() => fillFoodForm(f)}>Editar</button>
              <button class="btn btn-danger sm" on:click={() => deleteFood(f.id, f.title)}>Eliminar</button>
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
  /* Mantengo tus estilos originales pero corregidos para la nueva estructura */
  :global(body) {
    margin: 0;
    font-family: "Segoe UI", system-ui, sans-serif;
    background: linear-gradient(135deg, #15121f 0%, #111827 50%, #0f172a 100%);
    color: white;
  }

  .admin-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 1rem;
  }

  .menu-card {
    background: #ece6e2;
    border-radius: 24px;
    padding: 2rem;
    text-align: center;
    color: #1f2937;
    margin-bottom: 2rem;
  }

  .menu-buttons {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 400px;
    margin: 0 auto;
  }

  .hero-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  .btn-link {
    text-decoration: none;
    color: #5b21b6;
    font-weight: bold;
  }

  .grid3 {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-bottom: 3rem;
  }

  .panel-card {
    background: rgba(255, 255, 255, 0.05);
    padding: 1.5rem;
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .row { display: flex; gap: 0.5rem; margin-bottom: 1rem; }
  .row2 { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem; }
  .four { grid-template-columns: repeat(4, 1fr); }

  input, textarea, select {
    padding: 0.6rem;
    border-radius: 8px;
    border: 1px solid #444;
    background: #1f2937;
    color: white;
    width: 100%;
  }

  .menu-btn {
    border: none;
    border-radius: 12px;
    padding: 0.8rem;
    font-weight: bold;
    cursor: pointer;
  }

  .primary { background: #6d5dfc; color: white; }
  .secondary { background: #f6dccf; color: #d65a12; }
  .ghost { background: #d4ccc7; color: #394150; }

  .foodCard {
    background: white;
    color: #333;
    border-radius: 12px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
  .foodCard img { width: 100%; height: 150px; object-fit: cover; }
  .info { padding: 1rem; }

  .badge {
    background: #dcd4ff;
    color: #5b21b6;
    padding: 0.2rem 0.6rem;
    border-radius: 10px;
    font-size: 0.8rem;
  }
</style>