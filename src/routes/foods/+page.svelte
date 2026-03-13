<script>
  export let data;

  let searchText = "";
  let selectedType = "";
  let selectedDiet = "";
  let selectedTime = "";

  $: foodsFiltered = data.foods.filter((food) => {
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

  function clearFilters() {
    searchText = "";
    selectedType = "";
    selectedDiet = "";
    selectedTime = "";
  }
</script>

<svelte:head >
  <title>Catálogo | Dynamic Food</title>
</svelte:head>

<main class="page">
  <section class="hero">
    <div class="hero-overlay">
      <div class="hero-content">
        <h1 style="color: white;">Dynamic Food</h1>
        <p>Encuentra tu comida favorita usando búsqueda y filtros.</p>
      </div>
    </div>
  </section>

  <section class="controls-panel">
    <div class="search-box">
      <input
        type="text"
        placeholder="Buscar una comida..."
        bind:value={searchText}
      />
    </div>

    <div class="filters-bar">
      <div class="filter-item">
        <label for="type">Tipo</label>
        <select id="type" bind:value={selectedType}>
          <option value="">Todos</option>
          {#each data.types as type}
            <option value={type.id}>{type.name}</option>
          {/each}
        </select>
      </div>

      <div class="filter-item">
        <label for="diet">Dieta</label>
        <select id="diet" bind:value={selectedDiet}>
          <option value="">Todas</option>
          {#each data.diets as diet}
            <option value={diet.id}>{diet.name}</option>
          {/each}
        </select>
      </div>

      <div class="filter-item">
        <label for="time">Horario</label>
        <select id="time" bind:value={selectedTime}>
          <option value="">Todos</option>
          {#each data.times as time}
            <option value={time.id}>{time.name}</option>
          {/each}
        </select>
      </div>

      <div class="filter-actions">
        <button class="clear-btn" on:click={clearFilters}>Limpiar filtros</button>
      </div>
    </div>

    <div class="results-info">
      <span>{foodsFiltered.length} resultado(s)</span>
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
              <p>{f.description}</p>

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
        <p>Prueba con otra búsqueda o cambia los filtros.</p>
      </div>
    {/if}
  </section>
</main>

<style>
  :global(body) {
    margin: 0;
    font-family: "Segoe UI", system-ui, sans-serif;
    background: linear-gradient(135deg, #15121f 0%, #111827 50%, #0f172a 100%);
    color: #1f2937;
  }

  .page {
    max-width: 1280px;
    margin: 0 auto;
    padding: 2rem;
  }

  .hero {
    height: 280px;
    border-radius: 24px;
    overflow: hidden;
    margin-bottom: 1.25rem;
    background-image: url("https://images.pexels.com/photos/3023476/pexels-photo-3023476.jpeg");
    background-size: cover;
    background-position: center;
    box-shadow: 0 18px 35px rgba(0, 0, 0, 0.2);
  }

  .hero-overlay {
    width: 100%;
    height: 100%;
    background: rgba(6, 10, 25, 0.48);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    box-sizing: border-box;
  }

  .hero-content {
    text-align: center;
    color: white;
  }

  .hero-content h1 {
    margin: 0;
    font-size: clamp(2.4rem, 5vw, 4.4rem);
    font-weight: 900;
  }

  .hero-content p {
    margin: 0.8rem 0 0;
    font-size: 1.05rem;
    color: rgba(255, 255, 255, 0.94);
  }

  .controls-panel {
    background: #e6dfdb;
    border: 1px solid #d4cbc5;
    border-radius: 24px;
    padding: 1rem;
    margin-bottom: 1.4rem;
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.1);
  }

  .search-box {
    margin-bottom: 0.9rem;
  }

  .search-box input {
    width: 100%;
    height: 54px;
    padding: 0 1rem;
    border-radius: 16px;
    border: 1px solid #c9c0bb;
    background: #f8f5f3;
    color: #172033;
    box-sizing: border-box;
    outline: none;
    font-size: 1rem;
    font-weight: 500;
    transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
  }

  .search-box input::placeholder {
    color: #7d8393;
  }

  .search-box input:focus {
    border-color: #7c3aed;
    box-shadow: 0 0 0 4px rgba(124, 58, 237, 0.12);
    background: #fbf8f7;
  }

  .filters-bar {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr auto;
    gap: 0.85rem;
    align-items: end;
  }

  .filter-item {
    display: flex;
    flex-direction: column;
    gap: 0.45rem;
  }

  .filter-item label {
    color: #374151;
    font-size: 0.9rem;
    font-weight: 700;
  }

  .filter-item select {
    height: 46px;
    border-radius: 12px;
    border: 1px solid #c9c0bb;
    background: #f4efec;
    color: #172033;
    padding: 0 0.8rem;
    outline: none;
    font-size: 0.95rem;
  }

  .filter-item select:focus {
    border-color: #7c3aed;
    box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.12);
  }

  .filter-actions {
    display: flex;
    align-items: end;
  }

  .clear-btn {
    height: 46px;
    border: none;
    border-radius: 12px;
    background: #dcd4ff;
    color: #5b21b6;
    padding: 0 1rem;
    font-weight: 800;
    cursor: pointer;
    white-space: nowrap;
    transition: background 0.16s ease, transform 0.16s ease;
  }

  .clear-btn:hover {
    background: #d3c9ff;
    transform: translateY(-1px);
  }

  .results-info {
    margin-top: 0.9rem;
    color: #374151;
    font-size: 0.95rem;
    font-weight: 700;
  }

  .content {
    min-width: 0;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
    gap: 1.2rem;
  }

  .card {
    background: white;
    border-radius: 22px;
    overflow: hidden;
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
    border: 1px solid #ffe8db;
    transition: transform 0.18s ease, box-shadow 0.18s ease;
    text-decoration: none;
  }

  .card:hover {
    transform: translateY(-4px);
    box-shadow: 0 18px 34px rgba(0, 0, 0, 0.12);
  }

  .img {
    height: 190px;
    background: linear-gradient(135deg, #fff1e8, #ffe2d1);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .noimg {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.3rem;
    color: #c96a4b;
  }

  .noimg span {
    font-size: 2rem;
  }

  .info {
    padding: 1rem;
  }

  .info h3 {
    margin: 0 0 0.45rem 0;
    font-size: 1.15rem;
    color: #1f2937;
  }

  .info p {
    margin: 0;
    color: #6b7280;
    line-height: 1.5;
    min-height: 46px;
  }

  .bottom {
    margin-top: 1rem;
    display: flex;
    justify-content: flex-end;
  }

  .price {
    background: #fff1e8;
    color: #ff6b4a;
    font-weight: 900;
    padding: 0.45rem 0.85rem;
    border-radius: 999px;
    font-size: 0.95rem;
  }

  .empty-box {
    background: white;
    border: 2px dashed #ffd1bb;
    border-radius: 22px;
    padding: 3rem 1rem;
    text-align: center;
    color: #6b7280;
  }

  .empty-icon {
    font-size: 2.5rem;
    margin-bottom: 0.6rem;
  }

  .empty-box h3 {
    margin: 0 0 0.5rem 0;
    color: #1f2937;
  }

  .empty-box p {
    margin: 0;
  }

  @media (max-width: 980px) {
    .filters-bar {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media (max-width: 700px) {
    .page {
      padding: 1rem;
    }

    .filters-bar {
      grid-template-columns: 1fr;
    }
  }
</style>