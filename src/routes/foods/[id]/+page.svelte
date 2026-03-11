<script>
  export let data;

  const foodData = data.foodData;
</script>

<main class="page">
  <section class="container">
    <a href="/foods" class="back-btn">← Volver al catálogo</a>

    <div class="detail-card">
      <div class="image-section">
        {#if foodData.image_url}
          <img src={foodData.image_url} alt={foodData.title} />
        {:else}
          <div class="image-placeholder">
            <span>🍽️</span>
            <p>Sin imagen disponible</p>
          </div>
        {/if}
      </div>

      <div class="content-section">
        <div class="top-info">
          <span class="tag">Detalle de comida</span>
          <h1>{foodData.title}</h1>
          <p class="description">{foodData.description}</p>
        </div>

        <div class="info-grid">
          <div class="info-box">
            <span class="label">Nombre</span>
            <p>{foodData.title}</p>
          </div>

          <div class="info-box price-box">
            <span class="label">Precio</span>
            <p class="price">${Number(foodData.price || 0).toFixed(2)}</p>
          </div>
        </div>

        <div class="full-description">
          <h2>Descripción</h2>
          <p>{foodData.description}</p>
        </div>
      </div>
    </div>
  </section>
</main>

<style>
  :global(body) {
    margin: 0;
    font-family: "Segoe UI", system-ui, sans-serif;
    background: linear-gradient(135deg, #15121f 0%, #111827 50%, #0f172a 100%);
    color: #111827;
  }

  .page {
    min-height: 100vh;
    padding: 2rem;
    box-sizing: border-box;
  }

  .container {
    max-width: 1150px;
    margin: 0 auto;
  }

  .back-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    margin-bottom: 1rem;
    padding: 0.8rem 1rem;
    background: #ece6e2;
    color: #1f2937;
    text-decoration: none;
    border-radius: 14px;
    border: 1px solid #d4cbc5;
    font-weight: 700;
    box-shadow: 0 8px 18px rgba(0, 0, 0, 0.08);
    transition: transform 0.16s ease, background 0.16s ease;
  }

  .back-btn:hover {
    transform: translateY(-1px);
    background: #f4efec;
  }

  .detail-card {
    display: grid;
    grid-template-columns: 1.05fr 1fr;
    gap: 1.4rem;
    background: #ece6e2;
    border: 1px solid #d4cbc5;
    border-radius: 28px;
    padding: 1.2rem;
    box-shadow: 0 18px 38px rgba(0, 0, 0, 0.16);
  }

  .image-section {
    background: #d8d0cb;
    border-radius: 22px;
    overflow: hidden;
    min-height: 460px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .image-section img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .image-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.6rem;
    color: #6b7280;
    text-align: center;
  }

  .image-placeholder span {
    font-size: 3rem;
  }

  .content-section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .top-info {
    background: #ddd6d2;
    border: 1px solid #c9c0bb;
    border-radius: 22px;
    padding: 1.3rem;
  }

  .tag {
    display: inline-block;
    margin-bottom: 0.8rem;
    background: #ddd6fe;
    color: #5b21b6;
    padding: 0.42rem 0.8rem;
    border-radius: 999px;
    font-size: 0.85rem;
    font-weight: 800;
  }

  h1 {
    margin: 0;
    color: #18223b;
    font-size: clamp(2rem, 4vw, 3rem);
    line-height: 1.05;
    font-weight: 900;
  }

  .description {
    margin: 0.9rem 0 0;
    color: #4b5563;
    line-height: 1.65;
    font-size: 1rem;
  }

  .info-grid {
    display: grid;
    grid-template-columns: 1fr 220px;
    gap: 1rem;
  }

  .info-box {
    background: #ddd6d2;
    border: 1px solid #c9c0bb;
    border-radius: 20px;
    padding: 1rem 1.1rem;
  }

  .label {
    display: block;
    font-size: 0.85rem;
    font-weight: 800;
    color: #6b7280;
    margin-bottom: 0.45rem;
    text-transform: uppercase;
    letter-spacing: 0.03em;
  }

  .info-box p {
    margin: 0;
    color: #18223b;
    font-weight: 700;
    line-height: 1.4;
  }

  .price-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .price {
    color: #d65a12 !important;
    font-size: 1.8rem;
    font-weight: 900 !important;
  }

  .full-description {
    background: #ddd6d2;
    border: 1px solid #c9c0bb;
    border-radius: 22px;
    padding: 1.2rem;
  }

  .full-description h2 {
    margin: 0 0 0.8rem 0;
    color: #18223b;
    font-size: 1.15rem;
  }

  .full-description p {
    margin: 0;
    color: #4b5563;
    line-height: 1.75;
  }

  @media (max-width: 900px) {
    .detail-card {
      grid-template-columns: 1fr;
    }

    .image-section {
      min-height: 320px;
    }

    .info-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 640px) {
    .page {
      padding: 1rem;
    }

    .detail-card {
      padding: 1rem;
      border-radius: 22px;
    }

    .image-section,
    .top-info,
    .info-box,
    .full-description {
      border-radius: 18px;
    }

    h1 {
      font-size: 2rem;
    }
  }
</style>