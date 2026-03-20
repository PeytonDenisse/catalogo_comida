<script>
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";

  let loading = false;
  let error = "";

  let diets = [];
  let times = [];
  let types = [];

  let dietName = "";
  let timeName = "";
  let typeName = "";

  let editingDietId = null;
  let editingTimeId = null;
  let editingTypeId = null;

  async function loadAll() {
    loading = true;
    error = "";

    try {
      const [rD, rT, rTy] = await Promise.all([
        fetch("/api/categoryDiets"),
        fetch("/api/categoryTime"),
        fetch("/api/categoryType")
      ]);

      const [dD, dT, dTy] = await Promise.all([
        rD.json(),
        rT.json(),
        rTy.json()
      ]);

      diets = dD.data || [];
      times = dT.data || [];
      types = dTy.data || [];
    } catch {
      error = "Error cargando categorías";
    } finally {
      loading = false;
    }
  }

  async function saveType() {
    const formData = new FormData();
    formData.append("name", typeName);

    if (!typeName.trim()) return;

    if (editingTypeId) {
      formData.append("id", editingTypeId);
      await fetch("/api/categoryType", { method: "PUT", body: formData });
    } else {
      await fetch("/api/categoryType", { method: "POST", body: formData });
    }

    typeName = "";
    editingTypeId = null;
    loadAll();
  }

  async function saveDiet() {
    const formData = new FormData();
    formData.append("name", dietName);

    if (!dietName.trim()) return;

    if (editingDietId) {
      formData.append("id", editingDietId);
      await fetch("/api/categoryDiets", { method: "PUT", body: formData });
    } else {
      await fetch("/api/categoryDiets", { method: "POST", body: formData });
    }

    dietName = "";
    editingDietId = null;
    loadAll();
  }

  async function saveTime() {
    const formData = new FormData();
    formData.append("name", timeName);

    if (!timeName.trim()) return;

    if (editingTimeId) {
      formData.append("id", editingTimeId);
      await fetch("/api/categoryTime", { method: "PUT", body: formData });
    } else {
      await fetch("/api/categoryTime", { method: "POST", body: formData });
    }

    timeName = "";
    editingTimeId = null;
    loadAll();
  }

  async function deleteType(id) {
    await fetch(`/api/categoryType?id=${id}`, { method: "DELETE" });
    loadAll();
  }

  async function deleteDiet(id) {
    await fetch(`/api/categoryDiets?id=${id}`, { method: "DELETE" });
    loadAll();
  }

  async function deleteTime(id) {
    await fetch(`/api/categoryTime?id=${id}`, { method: "DELETE" });
    loadAll();
  }

  onMount(loadAll);
</script>

<main class="page">
  <div class="top">
    <button class="back" on:click={() => goto("/panel")}>← Volver</button>
    <h1>Categorías</h1>
  </div>

  {#if error}
    <div class="error">{error}</div>
  {/if}

  <section class="grid">
    <div class="card">
      <h2>Tipos</h2>
      <div class="row">
        <input bind:value={typeName} placeholder="Ej: Mexicana" />
        <button on:click={saveType}>{editingTypeId ? "Actualizar" : "Agregar"}</button>
      </div>

      {#each types as t}
        <div class="item">
          <span>{t.name}</span>
          <div class="actions">
            <button on:click={() => { typeName = t.name; editingTypeId = t.id; }}>Editar</button>
            <button class="danger" on:click={() => deleteType(t.id)}>Eliminar</button>
          </div>
        </div>
      {/each}
    </div>

    <div class="card">
      <h2>Dietas</h2>
      <div class="row">
        <input bind:value={dietName} placeholder="Ej: Vegana" />
        <button on:click={saveDiet}>{editingDietId ? "Actualizar" : "Agregar"}</button>
      </div>

      {#each diets as d}
        <div class="item">
          <span>{d.name}</span>
          <div class="actions">
            <button on:click={() => { dietName = d.name; editingDietId = d.id; }}>Editar</button>
            <button class="danger" on:click={() => deleteDiet(d.id)}>Eliminar</button>
          </div>
        </div>
      {/each}
    </div>

    <div class="card">
      <h2>Horarios</h2>
      <div class="row">
        <input bind:value={timeName} placeholder="Ej: Desayuno" />
        <button on:click={saveTime}>{editingTimeId ? "Actualizar" : "Agregar"}</button>
      </div>

      {#each times as t}
        <div class="item">
          <span>{t.name}</span>
          <div class="actions">
            <button on:click={() => { timeName = t.name; editingTimeId = t.id; }}>Editar</button>
            <button class="danger" on:click={() => deleteTime(t.id)}>Eliminar</button>
          </div>
        </div>
      {/each}
    </div>
  </section>
</main>

<style>
  :global(body) {
    margin: 0;
    background: linear-gradient(135deg, #15121f 0%, #111827 50%, #0f172a 100%);
    font-family: "Segoe UI", system-ui, sans-serif;
  }

  .page {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
  }

  .top {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  h1 { color: white; margin: 0; }
  .back {
    border: none;
    padding: 0.8rem 1rem;
    border-radius: 12px;
    background: #dcd4ff;
    color: #5b21b6;
    font-weight: 800;
    cursor: pointer;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }

  .card {
    background: #e6dfdb;
    border: 1px solid #d4cbc5;
    border-radius: 20px;
    padding: 1rem;
  }

  h2 {
    color: #1f2937;
    margin-top: 0;
  }

  .row {
    display: flex;
    gap: 0.6rem;
    margin-bottom: 1rem;
  }

  input {
    flex: 1;
    padding: 0.8rem 1rem;
    border-radius: 12px;
    border: 1px solid #c9c0bb;
    background: #f4efec;
  }

  button {
    border: none;
    padding: 0.8rem 1rem;
    border-radius: 12px;
    background: #6d5dfc;
    color: white;
    font-weight: 800;
    cursor: pointer;
  }

  .item {
    display: flex;
    justify-content: space-between;
    gap: 0.8rem;
    align-items: center;
    background: #dcd5d1;
    border: 1px solid #cbc1bb;
    border-radius: 12px;
    padding: 0.8rem;
    margin-bottom: 0.7rem;
  }

  .actions {
    display: flex;
    gap: 0.5rem;
  }

  .danger {
    background: #dc2626;
  }

  .error {
    background: #3b1d24;
    color: #fecaca;
    padding: 1rem;
    border-radius: 12px;
    margin-bottom: 1rem;
  }

  @media (max-width: 1000px) {
    .grid {
      grid-template-columns: 1fr;
    }
  }
</style>