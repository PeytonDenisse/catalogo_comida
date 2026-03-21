<script>
  import { page } from "$app/stores";

  const navItems = [
    { href: "/admin", title: "Inicio", detail: "Accesos" },
    { href: "/admin/dashboard", title: "Dashboard", detail: "Resumen" },
    { href: "/admin/crear-categoria", title: "Categorias", detail: "Tipos y dietas" },
    { href: "/admin/crear-comida", title: "Comidas", detail: "Formulario" }
  ];

  function isActive(pathname, href) {
    return pathname === href || (href !== "/admin" && pathname.startsWith(`${href}/`));
  }
</script>

<div class="admin-shell">
  <aside class="sidebar">
    <div class="brand-block">
      <span class="brand-kicker">Administracion</span>
      <h2>Catalogo de comida</h2>
      <p>Panel administrativo</p>
    </div>

    <nav class="sidebar-nav" aria-label="Navegacion de administracion">
      {#each navItems as item}
        <a
          href={item.href}
          class:active={isActive($page.url.pathname, item.href)}
          class="nav-link"
        >
          <span class="nav-title">{item.title}</span>
          <span class="nav-detail">{item.detail}</span>
        </a>
      {/each}
    </nav>

    <div class="sidebar-card">
      <span class="sidebar-card-label">Acceso rapido</span>
      <strong>Todo el modulo se mueve desde aqui.</strong>
      <p>Menos botones arriba, mas orden visual.</p>
    </div>
  </aside>

  <div class="content-area">
    <header class="mobile-header">
      <div>
        <span class="mobile-kicker">Panel admin</span>
        <strong>Catalogo de comida</strong>
      </div>
      <a class="mobile-dashboard" href="/admin/dashboard">Dashboard</a>
    </header>

    <div class="content-frame">
      <slot />
    </div>
  </div>
</div>

<style>
  :global(body) {
    margin: 0;
    min-height: 100vh;
    background:
      radial-gradient(circle at top left, rgba(148, 163, 184, 0.2), transparent 30%),
      radial-gradient(circle at bottom right, rgba(203, 213, 225, 0.16), transparent 28%),
      linear-gradient(160deg, #efe6dc 0%, #e8ddd2 45%, #ddd2c7 100%);
    font-family: "Trebuchet MS", "Segoe UI", sans-serif;
  }

  .admin-shell {
    min-height: 100vh;
    display: grid;
    grid-template-columns: 290px minmax(0, 1fr);
    color: #1f2937;
  }

  .sidebar {
    position: sticky;
    top: 0;
    height: 100vh;
    padding: 1.5rem;
    box-sizing: border-box;
    border-right: 1px solid rgba(120, 113, 108, 0.14);
    background: linear-gradient(180deg, rgba(255, 252, 248, 0.88), rgba(247, 240, 232, 0.82));
    display: flex;
    flex-direction: column;
    gap: 1.35rem;
    backdrop-filter: blur(12px);
  }

  .brand-block {
    padding: 1.25rem;
    border-radius: 24px;
    background: linear-gradient(145deg, rgba(255, 255, 255, 0.78), rgba(244, 236, 227, 0.9));
    border: 1px solid rgba(120, 113, 108, 0.12);
    box-shadow: 0 18px 36px rgba(120, 113, 108, 0.12);
  }

  .brand-kicker,
  .mobile-kicker,
  .sidebar-card-label {
    display: inline-flex;
    align-items: center;
    width: fit-content;
    padding: 0.32rem 0.72rem;
    border-radius: 999px;
    background: #ece0d2;
    color: #7c4a19;
    font-size: 0.76rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .brand-block h2 {
    margin: 0.85rem 0 0.55rem;
    font-size: 1.7rem;
    line-height: 1.05;
    color: #1c1917;
  }

  .brand-block p,
  .sidebar-card p {
    margin: 0;
    color: #6b7280;
    line-height: 1.55;
    font-size: 0.95rem;
  }

  .sidebar-nav {
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
  }

  .nav-link {
    display: flex;
    flex-direction: column;
    gap: 0.28rem;
    padding: 0.95rem 1rem;
    border-radius: 18px;
    text-decoration: none;
    color: #253047;
    background: rgba(255, 255, 255, 0.42);
    border: 1px solid rgba(120, 113, 108, 0.08);
    transition: transform 0.18s ease, background 0.18s ease, border-color 0.18s ease,
      box-shadow 0.18s ease;
  }

  .nav-link:hover,
  .nav-link.active {
    transform: translateX(4px);
    background: linear-gradient(135deg, #1f766d, #125e58);
    border-color: rgba(15, 118, 110, 0.3);
    box-shadow: 0 16px 30px rgba(15, 118, 110, 0.2);
  }

  .nav-title {
    font-size: 1rem;
    font-weight: 800;
    color: inherit;
  }

  .nav-detail {
    color: rgba(75, 85, 99, 0.86);
    font-size: 0.86rem;
  }

  .nav-link.active .nav-title,
  .nav-link.active .nav-detail {
    color: #fff;
  }

  .sidebar-card {
    margin-top: auto;
    padding: 1rem;
    border-radius: 22px;
    background: rgba(255, 255, 255, 0.56);
    border: 1px solid rgba(120, 113, 108, 0.08);
  }

  .sidebar-card strong {
    display: block;
    margin: 0.8rem 0 0.45rem;
    line-height: 1.45;
    color: #1c1917;
  }

  .content-area {
    min-width: 0;
    padding: 1.25rem;
    box-sizing: border-box;
  }

  .mobile-header {
    display: none;
  }

  .content-frame {
    min-width: 0;
  }

  @media (max-width: 980px) {
    .admin-shell {
      grid-template-columns: 1fr;
    }

    .sidebar {
      position: static;
      height: auto;
      border-right: none;
      border-bottom: 1px solid rgba(120, 113, 108, 0.12);
    }
  }

  @media (max-width: 720px) {
    .sidebar {
      display: none;
    }

    .content-area {
      padding: 0.9rem;
    }

    .mobile-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
      padding: 1rem 1.05rem;
      margin-bottom: 0.9rem;
      border-radius: 20px;
      background: rgba(255, 252, 248, 0.88);
      border: 1px solid rgba(120, 113, 108, 0.12);
      color: #1c1917;
    }

    .mobile-header strong {
      display: block;
      margin-top: 0.35rem;
      font-size: 1.05rem;
    }

    .mobile-dashboard {
      text-decoration: none;
      padding: 0.8rem 1rem;
      border-radius: 14px;
      background: linear-gradient(135deg, #0f766e, #0b5f59);
      color: #fff;
      font-weight: 800;
      white-space: nowrap;
    }
  }
</style>
