<script>
	import { onMount } from "svelte";
	import Card from "$lib/components/Card.svelte";
	import Navbar from "$lib/components/Navbar.svelte";

	/* =========================
	   ESTADOS (RUNES SVELTE 5)
	========================= */
	let diets = $state([]);
	let dietName = $state("");
	let editingDietId = $state(null);

	let times = $state([]);
	let timeName = $state("");
	let editingTimeId = $state(null);

	let types = $state([]);
	let typeName = $state("");
	let editingTypeId = $state(null);

	/* --- LÓGICA DE CARGA --- */
	async function loadAll() {
		const [resDiets, resTimes, resTypes] = await Promise.all([
			fetch("/api/categoryDiets"),
			fetch("/api/categoryTime"),
			fetch("/api/categoryType")
		]);
		
		const [dataDiets, dataTimes, dataTypes] = await Promise.all([
			resDiets.json(), resTimes.json(), resTypes.json()
		]);

		diets = dataDiets.data;
		times = dataTimes.data;
		types = dataTypes.data;
	}

	/* --- LÓGICA CRUD PARA TYPES (EJEMPLO) --- */
	async function addType() {
		const formData = new FormData();
		formData.append("name", typeName);
		await fetch("/api/categoryType", { method: "POST", body: formData });
		typeName = "";
		loadAll();
	}

	async function updateType() {
		const formData = new FormData();
		formData.append("id", editingTypeId);
		formData.append("name", typeName);
		await fetch("/api/categoryType", { method: "PUT", body: formData });
		typeName = "";
		editingTypeId = null;
		loadAll();
	}

	async function deleteType(id) {
		await fetch(`/api/categoryType?id=${id}`, { method: "DELETE" });
		loadAll();
	}

	onMount(loadAll);
</script>

<Navbar />

<div class="container">
	<section>
		<header class="section-header">
			<h1>Catálogo de Tipos</h1>
			<div class="input-group">
				<input bind:value={typeName} placeholder="Ej: Italiana, Mexicana..." />
				<button class="btn-main" on:click={editingTypeId ? updateType : addType}>
					{editingTypeId ? "Actualizar" : "Agregar Nuevo"}
				</button>
			</div>
		</header>

		<div class="product-grid">
			{#each types as type}
				<div class="card-wrapper">
					<Card 
						nombre={type.name} 
						categoria="Categoría de comida" 
						precio={0} 
						stock={10} 
					/>
					<div class="admin-actions">
						<button class="edit" on:click={() => { typeName = type.name; editingTypeId = type.id; }}>Editar</button>
						<button class="delete" on:click={() => deleteType(type.id)}>Eliminar</button>
					</div>
				</div>
			{:else}
				<div class="empty-state">
					<p>🚫 No se encontraron tipos de comida.</p>
					<span>Usa el formulario de arriba para crear el primero.</span>
				</div>
			{/each}
		</div>
	</section>
<div class="product-grid">
    {#each types as type}
        <div class="card-wrapper">
            <Card 
                nombre={type.name} 
                categoria="Categoría de comida" 
                precio={0} 
                stock={10} 
            />
            <div class="admin-actions">
                <button class="edit" on:click={() => { typeName = type.name; editingTypeId = type.id; }}>Editar</button>
                <button class="delete" on:click={() => deleteType(type.id)}>Eliminar</button>
            </div>
        </div>
    {:else}
        <div class="empty-state">
            <p>🚫 No se encontraron tipos de comida.</p>
            <span>Intenta agregar uno nuevo arriba.</span>
        </div>
    {/each}
</div>

	<hr class="separator" />

	<section>
		<h2>Gestión de Dietas</h2>
		<ul class="simple-list">
			{#each diets as diet}
				<li>
					<span>{diet.name}</span>
					<div class="list-buttons">
						<button class="edit-sm" on:click={() => { dietName = diet.name; editingDietId = diet.id; }}>✎</button>
						<button class="delete-sm" on:click={() => deleteDiet(diet.id)}>🗑</button>
					</div>
				</li>
			{/each}
		</ul>
	</section>
</div>

<style>
	:global(body) { background-color: #0f0f0f; margin: 0; font-family: sans-serif; }

	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem;
		color: white;
	}

	.section-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		gap: 1rem;
		margin-bottom: 2rem;
	}

	.input-group { display: flex; gap: 0.5rem; }

	input {
		padding: 0.8rem;
		border-radius: 8px;
		border: 1px solid #333;
		background: #1a1a1a;
		color: white;
		width: 250px;
	}

	.btn-main {
		background: #ffaa00;
		color: #1a1a1a;
		border: none;
		padding: 0.8rem 1.5rem;
		border-radius: 8px;
		font-weight: bold;
		cursor: pointer;
	}

	.product-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		gap: 2rem;
	}

	.card-wrapper { display: flex; flex-direction: column; gap: 0.8rem; }

	.admin-actions { display: flex; gap: 0.5rem; }

	.admin-actions button {
		flex: 1;
		padding: 0.6rem;
		border-radius: 6px;
		border: none;
		cursor: pointer;
		font-weight: bold;
	}

	.edit { background: #3333ff; color: white; }
	.delete { background: #cc0000; color: white; }

	.empty-state {
		grid-column: 1 / -1;
		text-align: center;
		padding: 4rem;
		border: 2px dashed #222;
		border-radius: 20px;
		color: #555;
	}

	.separator { margin: 4rem 0; border: 0; border-top: 1px solid #222; }

	.simple-list { list-style: none; padding: 0; }
	.simple-list li {
		background: #1a1a1a;
		margin-bottom: 0.5rem;
		padding: 1rem;
		border-radius: 10px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>