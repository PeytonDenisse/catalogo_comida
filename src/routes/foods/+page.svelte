<script>
  export let data;
</script>

<main class="wrap">
  <header class="top">
    <h1>Catálogo 🍔</h1>
    <a class="btn" href="/login">Admin</a>
  </header>

  <section class="grid">
    {#each data.foods as f}
      <article class="card">
        <div class="img">
          {#if f.image_url}
            <img src={f.image_url} alt={f.title} />
          {:else}
            <div class="noimg">Sin imagen</div>
          {/if}
        </div>

        <div class="info">
          <h2>{f.title}</h2>
          <p>{f.description}</p>
          <div class="price">${f.price}</div>
        </div>
      </article>
    {:else}
      <p class="empty">No hay comida todavía.</p>
    {/each}
  </section>
</main>

<style>
  :global(body){ margin:0; background:#0f0f0f; color:white; font-family: system-ui; }
  .wrap{ max-width: 1200px; margin:0 auto; padding: 2rem; }
  .top{ display:flex; justify-content:space-between; align-items:center; margin-bottom: 1rem; }
  .btn{ background:#646cff; color:white; text-decoration:none; padding:.8rem 1rem; border-radius: 12px; font-weight:800; }
  .grid{ display:grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 1rem; }
  .card{ background:#101010; border:1px solid #222; border-radius: 16px; overflow:hidden; }
  .img{ height: 170px; background:#070707; display:flex; justify-content:center; align-items:center; }
  img{ width:100%; height:100%; object-fit:cover; display:block; }
  .noimg{ color:#666; }
  .info{ padding: 1rem; }
  h2{ margin:0; font-size: 1.1rem; }
  p{ color:#b3b3b3; min-height: 40px; }
  .price{ font-weight:900; margin-top:.5rem; }
  .empty{ color:#777; }
</style>