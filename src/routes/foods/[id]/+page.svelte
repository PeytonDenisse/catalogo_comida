<script>
  import { onMount } from 'svelte';
  export let data;
  let foodData = {};

  onMount(()=>{
    foodData = data.foodData;
    console.log("foodData",foodData);
    
  });

</script>

<main>
  <div class="main-banner">
    <h1>{foodData.title}</h1>
  </div>

  <p>{foodData.description}</p>
</main>

<style>
  main{
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100dch;
  }

  .main-banner{
    margin-top: 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 300px;
    width: 90%;
    background-color: grey;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
  }

</style>