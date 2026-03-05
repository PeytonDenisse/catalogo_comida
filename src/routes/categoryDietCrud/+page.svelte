<script>
import { onMount } from "svelte";

let foods = [];
let searchId = "";

// form fields
let id = "";
let title = "";
let description = "";
let image_url = "";
let price = "";
let cat_time_id = "";
let cat_type_id = "";
let cat_diet_id = "";


async function loadAll(){
    const res = await fetch("/api/food");
    const data = await res.json();
    foods = data.data || [];
}


// GET BY ID
async function getFoodById(){
    if(!searchId) return;

    const res = await fetch(`/api/food/${searchId}`);
    const data = await res.json();

    if(data.data){
        editFood(data.data);
    }else{
        alert("Food not found");
    }
}


// CREATE
async function createFood(){

    const formData = buildFormData();

    await fetch("/api/food",{
        method:"POST",
        body:formData
    });

    clearForm();
    loadAll();
}


// UPDATE
async function updateFood(){

    const formData = buildFormData();

    await fetch(`/api/food/${id}`,{
        method:"PUT",
        body:formData
    });

    clearForm();
    loadAll();
}


// DELETE
async function deleteFood(foodId){

    await fetch(`/api/food/${foodId}`,{
        method:"DELETE"
    });

    loadAll();
}


function buildFormData(){

    const formData = new FormData();

    formData.append("title",title);
    formData.append("description",description);
    formData.append("image_url",image_url);
    formData.append("price",price);
    formData.append("cat_time_id",cat_time_id);
    formData.append("cat_type_id",cat_type_id);
    formData.append("cat_diet_id",cat_diet_id);

    return formData;
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
    loadAll();
});
</script>


<h1>Food API Test 🍔</h1>

<h2>{id ? "Update Food" : "Create Food"}</h2>

<input placeholder="title" bind:value={title} />
<input placeholder="description" bind:value={description} />
<input placeholder="image url" bind:value={image_url} />
<input placeholder="price" type="number" bind:value={price} />

<input placeholder="time category id" bind:value={cat_time_id}/>
<input placeholder="type category id" bind:value={cat_type_id}/>
<input placeholder="diet category id" bind:value={cat_diet_id}/>

{#if id}
<button on:click={updateFood}>Update</button>
{:else}
<button on:click={createFood}>Create</button>
{/if}

<button on:click={clearForm}>Clear</button>


<hr>


<h2>Get Food By ID</h2>

<input placeholder="food id" bind:value={searchId}/>
<button on:click={getFoodById}>Search</button>


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