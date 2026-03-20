<script>
  import { goto } from '$app/navigation';
  import { Search } from "@lucide/svelte";

  export let data;

  // Variables de estado para filtros
  let searchText = "";
  let selectedType = "";
  let selectedDiet = "";
  let selectedTime = "";

  // Lógica reactiva de filtrado combinada
  $: foodsFiltered = (data.foods || []).filter((food) => {
    const matchesSearch =
      !searchText ||
      food.title?.toLowerCase().includes(searchText.toLowerCase()) ||
      food.description?.toLowerCase().includes(searchText.toLowerCase());

    const matchesType =
      !selectedType || String(food.cat_type_id) === String(selectedType);

    const matchesDiet =
      !selectedDiet || String(food.cat_diet_id) === String(selectedDiet);

    const matchesTime =
      !selectedTime || String(food.cat_time_id) === String(selectedTime);

    return matchesSearch && matchesType && matchesDiet && matchesTime;
  });

  function handleLogout() {
    goto('/login'); 
  }

  function clearFilters() {
    searchText = "";
    selectedType = "";
    selectedDiet = "";
    selectedTime = "";
  }
</script>

<svelte:head>
  <title>Catálogo | Dynamic Food</title>
</svelte:head>

<nav class="navbar">
  <div class="nav-left">
    <a href="/admin/dashboard" class="btn-link">
      <span class="back-icon">⬅</span> Dashboard
    </a>
  </div>

  <div class="nav-right">
    <span class="badge-admin">Admin Mode</span>
    <button class="logout-btn" on:click={handleLogout}>
      Cerrar sesión
    </button>
  </div>
</nav>

<main class="page">
  <section class="hero">
    <div class="hero-overlay">
      <div class="hero-content">
        <h1>Dynamic Food</h1>
        <p>Encuentra tu comida favorita usando búsqueda y filtros.</p>
      </div>
    </div>
  </section>

  <section class="controls-panel">
    <div class="search-bar-container">
      <div class="search-input-wrapper">
        <Search size={18} color="#7d8393"/>
        <input
          type="text"
          placeholder="Buscar una comida..."
          bind:value={searchText}
        />
      </div>
    </div>

    <div class="filters-bar">
      <div class="filter-item">
        <label for="type">Tipo</label>
        <select id="type" bind:value={selectedType}>
          <option value="">Todos</option>
          {#each data.types || [] as type}
            <option value={type.id}>{type.name}</option>
          {/each}
        </select>
      </div>

      <div class="filter-item">
        <label for="diet">Dieta</label>
        <select id="diet" bind:value={selectedDiet}>
          <option value="">Todas</option>
          {#each data.diets || [] as diet}
            <option value={diet.id}>{diet.name}</option>
          {/each}
        </select>
      </div>

      <div class="filter-item">
        <label for="time">Horario</label>
        <select id="time" bind:value={selectedTime}>
          <option value="">Todos</option>
          {#each data.times || [] as time}
            <option value={time.id}>{time.name}</option>
          {/each}
        </select>
      </div>

      <div class="filter-actions">
        <button class="clear-btn" on:click={clearFilters}>Limpiar filtros</button>
      </div>
    </div>

    <div class="results-info">
      <span>{foodsFiltered.length} resultado(s) encontrado(s)</span>
    </div>
  </section>

  <section class="content">
    {#if foodsFiltered.length > 0}
      <div class="grid">
        {#each foodsFiltered as f}
          <a href="/foods/{f.id}" class="card">
            <div class="img">
              {#if f.image_url}
                <img src={f.image_url} alt={f.title} />
              {:else}
                <div class="noimg">
                  <span>🍔</span>
                  <small>Sin imagen</small>
                </div>
              {/if}
            </div>

            <div class="info">
              <h3>{f.title}</h3>
              <p>{f.description || "Sin descripción disponible."}</p>
              <div class="bottom">
                <span class="price">${f.price}</span>
              </div>
            </div>
          </a>
        {/each}
      </div>
    {:else}
      <div class="empty-box">
        <div class="empty-icon">🍽️</div>
        <h3>No encontramos resultados</h3>
        <p>Prueba con otra búsqueda o cambia los filtros seleccionados.</p>
      </div>
    {/if}
  </section>
</main>

<style>
  :global(body) {
    margin: 0;
    font-family: "Segoe UI", system-ui, sans-serif;
    background: linear-gradient(135deg, #15121f 0%, #111827 50%, #0f172a 100%);
    color: #f3f4f6;
  }

  .navbar {
    max-width: 1200px;
    margin: 1rem auto;
    padding: 0.8rem 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .btn-link { color: #dcd4ff; text-decoration: none; font-weight: 600; }
  .badge-admin { background: #dcd4ff; color: #5b21b6; padding: 0.3rem 0.8rem; border-radius: 20px; font-size: 0.8rem; font-weight: 800; }
  .logout-btn { background: #fee2e2; color: #b91c1c; border: none; padding: 0.4rem 1rem; border-radius: 8px; cursor: pointer; font-weight: bold; }

  .page { max-width: 1200px; margin: 0 auto; padding: 1rem; }

  .hero {
    height: 250px;
    border-radius: 24px;
    overflow: hidden;
    background: url("https://images.pexels.com/photos/3023476/pexels-photo-3023476.jpeg") center/cover;
    margin-bottom: 2rem;
  }

  .hero-overlay {
    background: rgba(0, 0, 0, 0.5);
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  .controls-panel {
    background: #ece6e2;
    padding: 1.5rem;
    border-radius: 24px;
    color: #1f2937;
    margin-bottom: 2rem;
  }

  .search-input-wrapper {
    display: flex;
    align-items: center;
    background: white;
    padding: 0.5rem 1rem;
    border-radius: 12px;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  .search-input-wrapper input {
    border: none;
    outline: none;
    width: 100%;
    font-size: 1rem;
  }

  .filters-bar {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
    align-items: flex-end;
  }

  .filter-item { display: flex; flex-direction: column; gap: 0.3rem; }
  .filter-item label { font-size: 0.8rem; font-weight: 800; }
  .filter-item select { padding: 0.6rem; border-radius: 8px; border: 1px solid #ccc; }

  .clear-btn {
    background: #dcd4ff;
    color: #5b21b6;
    border: none;
    padding: 0.7rem;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
  }

  .card {
    background: white;
    border-radius: 20px;
    overflow: hidden;
    text-decoration: none;
    color: #333;
    transition: transform 0.2s;
  }

  .card:hover { transform: translateY(-5px); }
  .img { height: 180px; overflow: hidden; }
  .img img { width: 100%; height: 100%; object-fit: cover; }
  .info { padding: 1.2rem; }
  .price { background: #fff1e8; color: #ff6b4a; padding: 0.3rem 0.8rem; border-radius: 20px; font-weight: 800; }
  .bottom { display: flex; justify-content: flex-end; margin-top: 1rem; }

  .empty-box { text-align: center; padding: 4rem; background: rgba(255,255,255,0.05); border-radius: 20px; }
</style>