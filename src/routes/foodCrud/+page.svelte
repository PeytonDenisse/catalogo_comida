<script>
    import { onMount } from "svelte";

    let foods = [];

    // category lists
    let times = [];
    let types = [];
    let diets = [];

    // form fields
    let id = "";
    let title = "";
    let description = "";
    let image_url = "";
    let price = "";
    let cat_time_id = "";
    let cat_type_id = "";
    let cat_diet_id = "";

    // LOAD EVERYTHING
    async function loadAll() {
        const foodRes = await fetch("/api/food");
        const foodData = await foodRes.json();
        foods = foodData.data || [];

        const timeRes = await fetch("/api/categoryTime");
        const timeData = await timeRes.json();
        times = timeData.data || [];

        const typeRes = await fetch("/api/categoryType");
        const typeData = await typeRes.json();
        types = typeData.data || [];

        const dietRes = await fetch("/api/categoryDiets");
        const dietData = await dietRes.json();
        diets = dietData.data || [];
    }

    onMount(() => {
        loadAll();
    });

    async function createFood() {

    if (!validarFormulario()) return;

    const formData = buildFormData();

    await fetch("/api/food", {
        method: "POST",
        body: formData
    });

    clearForm();
    loadAll();
}

    async function updateFood() {

        if (!validarFormulario()) return;

        const formData = buildFormData();
        formData.append("id", id);

        await fetch("/api/food", {
            method: "PUT",
            body: formData
        });

        clearForm();
        loadAll();
    }

    function buildFormData() {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("image_url", image_url);
        formData.append("price", price);
        formData.append("cat_time_id", cat_time_id);
        formData.append("cat_type_id", cat_type_id);
        formData.append("cat_diet_id", cat_diet_id);
        return formData;
    }

    async function deleteFoodItem(foodId) {
        await fetch(`/api/food?id=${foodId}`, {
            method: "DELETE"
        });
        loadAll();
    }

    function editFood(food) {
        id = food.id;
        title = food.title;
        description = food.description;
        image_url = food.image_url;
        price = food.price;
        cat_time_id = food.cat_time_id;
        cat_type_id = food.cat_type_id;
        cat_diet_id = food.cat_diet_id;
    }

    function clearForm() {
        id = "";
        title = "";
        description = "";
        image_url = "";
        price = "";
        cat_time_id = "";
        cat_type_id = "";
        cat_diet_id = "";
    }

    function validarFormulario() {

    const nombreRegex = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/;

    if (!title || !nombreRegex.test(title)) {
        alert("El nombre de la comida solo puede tener letras");
        return false;
    }

    if (!description || description.length < 5) {
        alert("La descripción debe tener al menos 5 caracteres");
        return false;
    }

    if (!price || price <= 0) {
        alert("El precio debe ser mayor a 0");
        return false;
    }

    if (!cat_time_id || !cat_type_id || !cat_diet_id) {
        alert("Debes seleccionar todas las categorías");
        return false;
    }

    return true;
}
</script>

<h1>Food Test Page 🍔</h1>

<h2>{id ? "Update Food" : "Create Food"}</h2>

<input placeholder="Title" bind:value={title} />
<input placeholder="Description" bind:value={description} />
<input placeholder="Image URL" bind:value={image_url} />
<input placeholder="Price" type="number" bind:value={price} />

<!-- TIME DROPDOWN -->
<select bind:value={cat_time_id}>
    <option value="">Select Time</option>
    {#each times as time}
        <option value={time.id}>{time.name}</option>
    {/each}
</select>

<!-- TYPE DROPDOWN -->
<select bind:value={cat_type_id}>
    <option value="">Select Type</option>
    {#each types as type}
        <option value={type.id}>{type.name}</option>
    {/each}
</select>

<!-- DIET DROPDOWN -->
<select bind:value={cat_diet_id}>
    <option value="">Select Diet</option>
    {#each diets as diet}
        <option value={diet.id}>{diet.name}</option>
    {/each}
</select>

{#if id}
    <button on:click={updateFood}>Update</button>
{:else}
    <button on:click={createFood}>Create</button>
{/if}

<button on:click={clearForm}>Clear</button>

<hr>

<h2>All Food</h2>

{#each foods as food}
    <div style="border:1px solid black; margin:10px; padding:10px;">
        <p><strong>{food.title}</strong></p>
        <p>{food.description}</p>
        <p>Price: ${food.price}</p>

        <button on:click={() => editFood(food)}>Edit</button>
        <button on:click={() => deleteFoodItem(food.id)}>Delete</button>
    </div>
{/each}