<script>
import { onMount } from "svelte";

let foods = [];
let foodById = null;
let searchId = "";

let id = "";
let title = "";
let description = "";
let image_url = "";
let price = "";
let cat_time_id = "";
let cat_type_id = "";
let cat_diet_id = "";

async function loadFoods(){

    const res = await fetch("/api/food");
    const data = await res.json();

    foods = data.data || [];
}


// GET FOOD BY ID
async function getFood(){

    if(!searchId) return;

    const res = await fetch(`/api/food/${searchId}`);
    const data = await res.json();

    foodById = data.data;
}


// BUILD FORM
function buildForm(){

    const form = new FormData();

    form.append("title", title);
    form.append("description", description);
    form.append("image_url", image_url);
    form.append("price", price);
    form.append("cat_time_id", cat_time_id);
    form.append("cat_type_id", cat_type_id);
    form.append("cat_diet_id", cat_diet_id);

    return form;
}


// CREATE
async function createFood(){

    const form = buildForm();

    await fetch("/api/food",{
        method:"POST",
        body:form
    });

    clearForm();
    loadFoods();
}


// UPDATE
async function updateFood(){

    const form = buildForm();
    form.append("id", id);

    await fetch("/api/food",{
        method:"PUT",
        body:form
    });

    clearForm();
    loadFoods();
}


// DELETE
async function deleteFood(foodId){

    await fetch(`/api/food?id=${foodId}`,{
        method:"DELETE"
    });

    loadFoods();
}


function editFood(food){

    id = food.id;
    title = food.title;
    description = food.description;
    image_url = food.image_url;
    price = food.price;
    cat_time_id = food.cat_time_id;
    cat_type_id = food.cat_type_id;
    cat_diet_id = food.cat_diet_id;
}


function clearForm(){

    id="";
    title="";
    description="";
    image_url="";
    price="";
    cat_time_id="";
    cat_type_id="";
    cat_diet_id="";
}


onMount(()=>{
    loadFoods();
});
</script>



<h1>Food CRUD Test 🍔</h1>

<h2>{id ? "Update Food" : "Create Food"}</h2>

<input placeholder="Title" bind:value={title} />
<input placeholder="Description" bind:value={description} />
<input placeholder="Image URL" bind:value={image_url} />
<input placeholder="Price" type="number" bind:value={price} />

<input placeholder="Time Category ID" bind:value={cat_time_id} />
<input placeholder="Type Category ID" bind:value={cat_type_id} />
<input placeholder="Diet Category ID" bind:value={cat_diet_id} />


{#if id}
<button on:click={updateFood}>Update</button>
{:else}
<button on:click={createFood}>Create</button>
{/if}

<button on:click={clearForm}>Clear</button>

<hr>

<h2>Get Food By ID 🔍</h2>

<input placeholder="Enter Food ID" bind:value={searchId} />
<button on:click={getFood}>Search</button>

{#if foodById}
<div style="border:2px solid green; padding:10px; margin-top:10px;">
    <p><strong>{foodById.title}</strong></p>
    <p>{foodById.description}</p>
    <p>Price: ${foodById.price}</p>
</div>
{/if}

<hr>

<h2>All Food</h2>

{#each foods as food}

<div style="border:1px solid black; margin:10px; padding:10px;">

<p><strong>{food.title}</strong></p>
<p>{food.description}</p>
<p>Price: ${food.price}</p>

<button on:click={()=>editFood(food)}>Edit</button>
<button on:click={()=>deleteFood(food.id)}>Delete</button>

</div>

{/each}