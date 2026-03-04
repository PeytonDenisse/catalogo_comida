<script>
    import { CircleXIcon } from "@lucide/svelte";
    export let clickClose = () => {}
    export let top = "30";
    export let noClick = false; 

</script>
<div class="modal" style="{(top+"px;")}">
    {#if !noClick}
        <button class="modal-tacha" on:click={clickClose}>
            <CircleXIcon strokeWidth={1.2} />
        </button>
    {/if}
    <slot />
</div>

<style>
     .modal{
        position: fixed;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 32px 32px;
        height: auto;
        max-height: 85dvh;
        width: 30%;
        background-color: var(--bg-color-2);
        border: 1px solid var(--color-grey-light);
        border-radius: 4px;
        animation: fadeUp 0.2s;
        overflow-y: auto;
        color: var(--color);

        .modal-tacha{
            position: absolute;
            right: 12px;
            top: 10px;
            color: var(--theme-gray);
            background: unset;
            border: unset;
        }
        .modal-tacha:hover{
            cursor: pointer;
            color: var(--second);
        }
    }

    .modal::-webkit-scrollbar{
        width: 7px;
    }

    .modal::-webkit-scrollbar-thumb{
        background-color: #333;
    }
</style>