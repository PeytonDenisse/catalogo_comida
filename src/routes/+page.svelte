<script>
	import { onMount } from "svelte";

	/* =========================
	   DIET STATE
	========================= */
	let diets = [];
	let dietName = "";
	let editingDietId = null;

	async function loadDiets() {
		const res = await fetch("/api/categoryDiets");
		const data = await res.json();
		diets = data.data;
	}

	async function addDiet() {
		const formData = new FormData();
		formData.append("name", dietName);

		await fetch("/api/categoryDiets", {
			method: "POST",
			body: formData
		});

		dietName = "";
		loadDiets();
	}

	async function updateDiet() {
		const formData = new FormData();
		formData.append("id", editingDietId);
		formData.append("name", dietName);

		await fetch("/api/categoryDiets", {
			method: "PUT",
			body: formData
		});

		dietName = "";
		editingDietId = null;
		loadDiets();
	}

	async function deleteDiet(id) {
		await fetch(`/api/categoryDiets?id=${id}`, {
			method: "DELETE"
		});
		loadDiets();
	}

	function startEditDiet(diet) {
		dietName = diet.name;
		editingDietId = diet.id;
	}


	/* =========================
	   TIME STATE
	========================= */
	let times = [];
	let timeName = "";
	let editingTimeId = null;

	async function loadTimes() {
		const res = await fetch("/api/categoryTime");
		const data = await res.json();
		times = data.data;
	}

	async function addTime() {
		const formData = new FormData();
		formData.append("name", timeName);

		await fetch("/api/categoryTime", {
			method: "POST",
			body: formData
		});

		timeName = "";
		loadTimes();
	}

	async function updateTime() {
		const formData = new FormData();
		formData.append("id", editingTimeId);
		formData.append("name", timeName);

		await fetch("/api/categoryTime", {
			method: "PUT",
			body: formData
		});

		timeName = "";
		editingTimeId = null;
		loadTimes();
	}

	async function deleteTime(id) {
		await fetch(`/api/categoryTime?id=${id}`, {
			method: "DELETE"
		});
		loadTimes();
	}

	function startEditTime(time) {
		timeName = time.name;
		editingTimeId = time.id;
	}


	/* =========================
	   TYPE STATE
	========================= */
	let types = [];
	let typeName = "";
	let editingTypeId = null;

	async function loadTypes() {
		const res = await fetch("/api/categoryType");
		const data = await res.json();
		types = data.data;
	}

	async function addType() {
		const formData = new FormData();
		formData.append("name", typeName);

		await fetch("/api/categoryType", {
			method: "POST",
			body: formData
		});

		typeName = "";
		loadTypes();
	}

	async function updateType() {
		const formData = new FormData();
		formData.append("id", editingTypeId);
		formData.append("name", typeName);

		await fetch("/api/categoryType", {
			method: "PUT",
			body: formData
		});

		typeName = "";
		editingTypeId = null;
		loadTypes();
	}

	async function deleteType(id) {
		await fetch(`/api/categoryType?id=${id}`, {
			method: "DELETE"
		});
		loadTypes();
	}

	function startEditType(type) {
		typeName = type.name;
		editingTypeId = type.id;
	}

	onMount(() => {
		loadDiets();
		loadTimes();
		loadTypes();
	});
</script>


<!-- =========================
     DIET SECTION
========================= -->

<h1>Diet Categories</h1>

<input bind:value={dietName} placeholder="Enter diet name" />
<button on:click={addDiet}>Add</button>
<button on:click={updateDiet}>Update</button>

<hr />

{#each diets as diet}
	<div>
		{diet.name}
		<button on:click={() => startEditDiet(diet)}>Edit</button>
		<button on:click={() => deleteDiet(diet.id)}>Delete</button>
	</div>
{/each}

<hr /><hr />


<!-- =========================
     TIME SECTION
========================= -->

<h1>Time Categories</h1>

<input bind:value={timeName} placeholder="Enter time name" />
<button on:click={addTime}>Add</button>
<button on:click={updateTime}>Update</button>

<hr />

{#each times as time}
	<div>
		{time.name}
		<button on:click={() => startEditTime(time)}>Edit</button>
		<button on:click={() => deleteTime(time.id)}>Delete</button>
	</div>
{/each}

<hr /><hr />


<!-- =========================
     TYPE SECTION
========================= -->

<h1>Type Categories</h1>

<input bind:value={typeName} placeholder="Enter type name" />
<button on:click={addType}>Add</button>
<button on:click={updateType}>Update</button>

<hr />

{#each types as type}
	<div>
		{type.name}
		<button on:click={() => startEditType(type)}>Edit</button>
		<button on:click={() => deleteType(type.id)}>Delete</button>
	</div>
{/each}