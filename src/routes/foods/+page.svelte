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
            <div class="noimg">
              <span>🍔</span>
              <small>Sin imagen</small>
            </div>
          {/if}
        </div>

        <div class="info">
          <h2>{f.title}</h2>
          <p>{f.description}</p>
          <div class="bottom">
            <span class="price">${f.price}</span>
          </div>
        </div>
      </a>
    {:else}
      <div class="empty-box">
        <div class="empty-icon">🍽️</div>
        <h3>No hay comida todavía</h3>
        <p>Agrega productos desde el panel administrador.</p>
      </div>
    {/each}
  </section>
</main>

<style>
  :global(body) {
    margin: 0;
    font-family: "Segoe UI", system-ui, sans-serif;
    background: linear-gradient(135deg, #15121f 0%, #111827 50%, #0f172a 100%);
    color: #1f2937;
  }

  .wrap {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
  }

  .hero {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1.5rem;
    margin-bottom: 2rem;
    padding: 2rem;
    border-radius: 28px;
    background: linear-gradient(135deg, #ff7a59 0%, #ffb347 55%, #ffd166 100%);
    box-shadow: 0 18px 40px rgba(255, 122, 89, 0.22);
    color: white;
    flex-wrap: wrap;
  }

  .hero-text {
    max-width: 700px;
  }

  .badge {
    display: inline-block;
    background: rgba(255, 255, 255, 0.22);
    border: 1px solid rgba(255, 255, 255, 0.25);
    padding: 0.45rem 0.85rem;
    border-radius: 999px;
    font-size: 0.9rem;
    font-weight: 700;
    margin-bottom: 1rem;
    backdrop-filter: blur(8px);
  }

  h1 {
    margin: 0;
    font-size: clamp(2.3rem, 5vw, 4rem);
    line-height: 1.05;
    font-weight: 900;
    color: white;
    text-shadow: 0 3px 12px rgba(0, 0, 0, 0.18);
  }

  .hero p {
    margin: 0.9rem 0 0 0;
    font-size: 1.08rem;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.96);
    max-width: 560px;
  }

  .admin-btn {
    background: white;
    color: #ff6b4a;
    text-decoration: none;
    font-weight: 800;
    padding: 0.9rem 1.2rem;
    border-radius: 14px;
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.12);
    transition: transform 0.18s ease, box-shadow 0.18s ease;
  }

  .admin-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.16);
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
    text-decoration: unset;
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

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
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

  h2 {
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
    grid-column: 1 / -1;
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

  @media (max-width: 700px) {
    .wrap {
      padding: 1rem;
    }

    .hero {
      padding: 1.4rem;
    }

    .admin-btn {
      width: 100%;
      text-align: center;
      box-sizing: border-box;
    }
  }
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