<script>
  import { Search } from "@lucide/svelte";
</script>

<div class="cont-search">
    <input 
      type="text"
      placeholder="Buscar comida..."
      bind:value={search}
    />
  <button><Search size={16} /></button>
</div>