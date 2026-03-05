<script>
	import { onMount } from "svelte";
	import Card from "$lib/components/Card.svelte";

	/* =========================
	   DIET STATE
	========================= */
	let diets = $state([]); // Usando Svelte 5 runes ($state)
	let dietName = $state("");
	let editingDietId = $state(null);

	async function loadDiets() {
		const res = await fetch("/api/categoryDiets");
		const data = await res.json();
		diets = data.data;
	}

	async function addDiet() {
		const formData = new FormData();
		formData.append("name", dietName);
		await fetch("/api/categoryDiets", { method: "POST", body: formData });
		dietName = "";
		loadDiets();
	}

	async function updateDiet() {
		const formData = new FormData();
		formData.append("id", editingDietId);
		formData.append("name", dietName);
		await fetch("/api/categoryDiets", { method: "PUT", body: formData });
		dietName = "";
		editingDietId = null;
		loadDiets();
	}

	async function deleteDiet(id) {
		await fetch(`/api/categoryDiets?id=${id}`, { method: "DELETE" });
		loadDiets();
	}

	function startEditDiet(diet) {
		dietName = diet.name;
		editingDietId = diet.id;
	}

	/* =========================
	   TIME STATE
	========================= */
	let times = $state([]);
	let timeName = $state("");
	let editingTimeId = $state(null);

	async function loadTimes() {
		const res = await fetch("/api/categoryTime");
		const data = await res.json();
		times = data.data;
	}

	async function addTime() {
		const formData = new FormData();
		formData.append("name", timeName);
		await fetch("/api/categoryTime", { method: "POST", body: formData });
		timeName = "";
		loadTimes();
	}

	async function updateTime() {
		const formData = new FormData();
		formData.append("id", editingTimeId);
		formData.append("name", timeName);
		await fetch("/api/categoryTime", { method: "PUT", body: formData });
		timeName = "";
		editingTimeId = null;
		loadTimes();
	}

	async function deleteTime(id) {
		await fetch(`/api/categoryTime?id=${id}`, { method: "DELETE" });
		loadTimes();
	}

	/* =========================
	   TYPE STATE
	========================= */
	let types = $state([]);
	let typeName = $state("");
	let editingTypeId = $state(null);

	async function loadTypes() {
		const res = await fetch("/api/categoryType");
		const data = await res.json();
		types = data.data;
	}

	async function addType() {
		const formData = new FormData();
		formData.append("name", typeName);
		await fetch("/api/categoryType", { method: "POST", body: formData });
		typeName = "";
		loadTypes();
	}

	async function updateType() {
		const formData = new FormData();
		formData.append("id", editingTypeId);
		formData.append("name", typeName);
		await fetch("/api/categoryType", { method: "PUT", body: formData });
		typeName = "";
		editingTypeId = null;
		loadTypes();
	}

	async function deleteType(id) {
		await fetch(`/api/categoryType?id=${id}`, { method: "DELETE" });
		loadTypes();
	}

	onMount(() => {
		loadDiets();
		loadTimes();
		loadTypes();
		loadFoods();
	});
</script>

<div class="container">
	<section>
		<header>
			<h1>Catálogo de Tipos</h1>
			<div class="input-group">
				<input bind:value={typeName} placeholder="Nombre del tipo (ej. Italiana)" />
				<button class="btn-main" on:click={editingTypeId ? updateType : addType}>
					{editingTypeId ? "Actualizar" : "Agregar"}
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
            <span>Intenta agregar uno nuevo arriba.</span>
        </div>
    {/each}
</div>

	<hr class="separator" />

	<section>
		<h2>Dietas</h2>
		<div class="input-group">
			<input bind:value={dietName} placeholder="Nombre de dieta" />
			<button class="btn-main" on:click={editingDietId ? updateDiet : addDiet}>Acción</button>
		</div>
		<ul class="simple-list">
			{#each diets as diet}
				<li>
					{diet.name}
					<button on:click={() => startEditDiet(diet)}>✎</button>
					<button on:click={() => deleteDiet(diet.id)}>🗑</button>
				</li>
			{/each}
		</ul>
	</section>
</div>

<style>
	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem;
		color: white;
	}

	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		gap: 1rem;
		margin-bottom: 2rem;
	}

	.input-group {
		display: flex;
		gap: 0.5rem;
	}

	input {
		padding: 0.8rem;
		border-radius: 8px;
		border: 1px solid #444;
		background: #1a1a1a;
		color: white;
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

	.card-wrapper {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.admin-actions {
		display: flex;
		justify-content: space-between;
		gap: 0.5rem;
	}

	.admin-actions button {
		flex: 1;
		padding: 0.5rem;
		border-radius: 4px;
		border: none;
		cursor: pointer;
		font-size: 0.8rem;
	}

	.edit { background: #4444ff; color: white; }
	.delete { background: #ff4444; color: white; }

	.simple-list {
		list-style: none;
		padding: 0;
	}

	.simple-list li {
		background: #2a2a2a;
		margin-bottom: 0.5rem;
		padding: 1rem;
		border-radius: 8px;
		display: flex;
		gap: 1rem;
		align-items: center;
	}

	.separator {
		margin: 4rem 0;
		border: 0;
		border-top: 1px solid #333;
	}
</style>