<script>
    import { Search } from "@lucide/svelte";
    export let searchText;

</script>

<div class="cont-search">
    <input type="text" placeholder="Buscar una comida" bind:value={searchText}>
    <select name="" id="">
        <option value=""></option>
    </select>
    <button><Search size={16} /></button>
</div>

<style>
.cont-search{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 16px;
    gap: 2px;

    input{
      height: 40px;
      width: 95%;
      padding: 8px;
      border: 1px solid rgb(77, 77, 77);
      background: unset;
      color: #fff;
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
      box-sizing: border-box;
      outline: unset;
      font-weight: 500;
    }

    input:focus{
      border-color: var(--color-accent);
    }

    button{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 40px;
      width: 5%;
      box-sizing: border-box;
      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;
      border: 1px solid rgb(39, 39, 148);
      color: #fff;
      background-color: rgb(39, 39, 148);
    }
  }

</style>