<script>
    import { Search } from "@lucide/svelte";

  export let data;
</script>

<svelte:head>
  <title>Catalogo | Dynamic Food</title>
</svelte:head>

<main class="wrap">
  <header class="main-banner">
    <div class="text-banner">
      <h1>Dynamic Food</h1>
    </div>
  </header>

  <div class="cont-search">
    <input type="text" placeholder="Buscar una comida">
    <button><Search size={16} /></button>
  </div>

  <section class="grid">
    {#each data.foods as f}
      <a href='/foods/{f.id}' class="card">
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
      </a>
    {:else}
      <p class="empty">No hay comida todavía.</p>
    {/each}
  </section>
</main>

<style>
  :global(body){ margin:0; background:#0f0f0f; color:white; font-family: system-ui; }
  .wrap{ max-width: 1200px; margin:0 auto; padding: 2rem; }
  .top{ display:flex; justify-content:space-between; align-items:center; margin-bottom: 1rem; }
  .grid{ display:grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 1rem; }
  .card{ background:#101010; border:1px solid #222; border-radius: 16px; overflow:hidden; text-decoration: unset; color: #fff;}
  .img{ height: 170px; background:#070707; display:flex; justify-content:center; align-items:center; }
  img{ width:100%; height:100%; object-fit:cover; display:block; }
  .noimg{ color:#666; }
  .info{ padding: 1rem; }
  h2{ margin:0; font-size: 1.1rem; color: #fff; }
  p{ color:#b3b3b3; min-height: 40px; }
  .price{ font-weight:900; margin-top:.5rem; }
  .empty{ color:#777; }

  .cont-search{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 16px;
    gap: 2px;

    input{
      height: 35px;
      width: 95%;
      box-sizing: border-box;
      border: 1px solid grey;
      background: unset;
      color: #fff;
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
    }

    button{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 35px;
      width: 5%;
      box-sizing: border-box;
      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;
      border: 1px solid rgb(39, 39, 148);
      color: #fff;
      background-color: rgb(39, 39, 148);
    }
  }

  .main-banner{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 300px;
    width: 100%;
    margin-bottom: 32px;
    color: #fff;

    background-image: url(https://images.pexels.com/photos/3023476/pexels-photo-3023476.jpeg);
    background-size: cover;
    background-position: 0 700px;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    
    .text-banner{
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: rgba(0, 0, 0, 0.4);

      h1{ color: #fff; }
    }
  }

</style>