<script>
    import { onMount } from 'svelte';
    export let data;

    onMount(()=>{
        console.log(data);
    })

</script>


<main>
    {#each data.foods as food }
        <p>{food.title}</p>
    {/each}
</main>


<style>

    p{
        color: #fff;
    }

</style>