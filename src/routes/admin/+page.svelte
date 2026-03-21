<main class="home-page">
  <section class="actions-grid">
    <a class="action-card warm" href="/admin/crear-categoria">
      <span class="tag">Categorias</span>
      <h2>Gestionar categorias</h2>
      <strong>Tipos, dietas y horarios</strong>
    </a>

    <a class="action-card teal" href="/admin/crear-comida">
      <span class="tag">Comidas</span>
      <h2>Registrar comidas</h2>
      <strong>Formulario y vista previa</strong>
    </a>

    <a class="action-card neutral" href="/admin/dashboard">
      <span class="tag">Dashboard</span>
      <h2>Ver dashboard</h2>
      <strong>Metricas y resumen</strong>
    </a>
  </section>
</main>

<style>
  .home-page {
    display: block;
  }

  .tag {
    display: inline-flex;
    width: fit-content;
    padding: 0.38rem 0.75rem;
    border-radius: 999px;
    background: #f4e1b3;
    color: #8a4b08;
    font-size: 0.78rem;
    font-weight: 800;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  .actions-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1rem;
  }

  .action-card {
    display: flex;
    flex-direction: column;
    gap: 0.9rem;
    min-height: 180px;
    padding: 1.35rem;
    border-radius: 30px;
    text-decoration: none;
    border: 1px solid rgba(255, 248, 239, 0.08);
    box-shadow: 0 24px 48px rgba(120, 113, 108, 0.16);
    transition: transform 0.18s ease, box-shadow 0.18s ease;
  }

  .action-card:hover {
    transform: translateY(-4px);
  }

  .action-card h2 {
    margin: 0;
    font-size: 1.6rem;
    letter-spacing: -0.03em;
  }

  .action-card strong {
    margin-top: auto;
    font-size: 1rem;
    opacity: 0.86;
  }

  .action-card.warm {
    background: linear-gradient(155deg, #f8ede2, #f3dcc8);
    color: #5b3412;
  }

  .action-card.teal {
    background: linear-gradient(155deg, #dff3ef, #cbe8e3);
    color: #134e4a;
  }

  .action-card.neutral {
    background: linear-gradient(155deg, #ece7e2, #dfd7cf);
    color: #253047;
  }

  @media (max-width: 980px) {
    .actions-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 700px) {
    .action-card {
      padding: 1.1rem;
      border-radius: 22px;
      min-height: 150px;
    }
  }
</style>
