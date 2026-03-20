<script>
    import { onMount } from "svelte";
    export let data;

    let categoriasList = [];

    onMount(()=>{
        console.log(data);
        
    })
</script>

<svelte:head>
    <title>Categoria | Dynamic Foods</title>
</svelte:head>

{#each categoriasList as cat }
    
{/each}
