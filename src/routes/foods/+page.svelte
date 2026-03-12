<script>
    import { search } from "$lib/stores/search";

    export let data;

    let foodsFiltered = [];

    $: foodsFiltered = data.foods.filter(f =>
        f.title.toLowerCase().includes($search.toLowerCase())
    );
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

  <section class="grid">
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

:global(body){
  margin:0;
  font-family:"Segoe UI",system-ui,sans-serif;
  background:linear-gradient(135deg,#15121f 0%,#111827 50%,#0f172a 100%);
  color:#1f2937;
}

.wrap{
  max-width:1200px;
  margin:0 auto;
  padding:2rem;
}

.main-banner{
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  height:300px;
  width:100%;
  margin-bottom:32px;
  color:#fff;

  background-image:url(https://images.pexels.com/photos/3023476/pexels-photo-3023476.jpeg);
  background-size:cover;
  background-position:0 700px;
  border-top-left-radius:20px;
  border-top-right-radius:20px;
}

.text-banner{
  height:100%;
  width:100%;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  background-color:rgba(0,0,0,0.4);
}

.text-banner h1{
  color:#fff;
  margin:0;
  font-size:clamp(2.3rem,5vw,4rem);
  font-weight:900;
}

.grid{
  display:grid;
  grid-template-columns:repeat(auto-fill,minmax(270px,1fr));
  gap:1.2rem;
}

.card{
  background:white;
  border-radius:22px;
  overflow:hidden;
  box-shadow:0 12px 30px rgba(0,0,0,0.08);
  border:1px solid #ffe8db;
  transition:transform 0.18s ease, box-shadow 0.18s ease;
  text-decoration:none;
}

.card:hover{
  transform:translateY(-4px);
  box-shadow:0 18px 34px rgba(0,0,0,0.12);
}

.img{
  height:190px;
  background:linear-gradient(135deg,#fff1e8,#ffe2d1);
  display:flex;
  align-items:center;
  justify-content:center;
  overflow:hidden;
}

img{
  width:100%;
  height:100%;
  object-fit:cover;
}

.noimg{
  display:flex;
  flex-direction:column;
  align-items:center;
  gap:.3rem;
  color:#c96a4b;
}

.noimg span{
  font-size:2rem;
}

.info{
  padding:1rem;
}

h2{
  margin:0 0 .45rem 0;
  font-size:1.15rem;
  color:#1f2937;
}

.info p{
  margin:0;
  color:#6b7280;
  line-height:1.5;
  min-height:46px;
}

.bottom{
  margin-top:1rem;
  display:flex;
  justify-content:flex-end;
}

.price{
  background:#fff1e8;
  color:#ff6b4a;
  font-weight:900;
  padding:.45rem .85rem;
  border-radius:999px;
  font-size:.95rem;
}

.empty-box{
  grid-column:1/-1;
  background:white;
  border:2px dashed #ffd1bb;
  border-radius:22px;
  padding:3rem 1rem;
  text-align:center;
  color:#6b7280;
}

.empty-icon{
  font-size:2.5rem;
  margin-bottom:.6rem;
}

.empty-box h3{
  margin:0 0 .5rem 0;
  color:#1f2937;
}

</style>