<script>
	import { onMount } from "svelte";

	/* =========================
	FOOD STATE
	========================= */
	let foods = [];
	let title = "";
	let description = "";
	let image_url = "";
	let price = "";
	let cat_time_id = "";
	let cat_type_id = "";
	let cat_diet_id = "";
	let editingFoodId = null;

	async function loadFoods() {
		const res = await fetch("/api/food");
		const data = await res.json();
		foods = data.data;
	}

	async function addFood() {
		const formData = new FormData();
		formData.append("title", title);
		formData.append("description", description);
		formData.append("image_url", image_url);
		formData.append("price", price);
		formData.append("cat_time_id", cat_time_id);
		formData.append("cat_type_id", cat_type_id);
		formData.append("cat_diet_id", cat_diet_id);

		await fetch("/api/food", {
			method: "POST",
			body: formData
		});

		resetFoodForm();
		loadFoods();
	}

	async function updateFood() {
		const formData = new FormData();
		formData.append("id", editingFoodId);
		formData.append("title", title);
		formData.append("description", description);
		formData.append("image_url", image_url);
		formData.append("price", price);
		formData.append("cat_time_id", cat_time_id);
		formData.append("cat_type_id", cat_type_id);
		formData.append("cat_diet_id", cat_diet_id);

		await fetch("/api/food", {
			method: "PUT",
			body: formData
		});

		resetFoodForm();
		loadFoods();
	}

	async function deleteFood(id) {
		await fetch(`/api/food?id=${id}`, {
			method: "DELETE"
		});
		loadFoods();
	}

	function startEditFood(food) {
		title = food.title;
		description = food.description;
		image_url = food.image_url;
		price = food.price;
		cat_time_id = food.cat_time_id;
		cat_type_id = food.cat_type_id;
		cat_diet_id = food.cat_diet_id;
		editingFoodId = food.id;
	}

	function resetFoodForm() {
		title = "";
		description = "";
		image_url = "";
		price = "";
		cat_time_id = "";
		cat_type_id = "";
		cat_diet_id = "";
		editingFoodId = null;
	}

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
		loadFoods();
	});
</script>