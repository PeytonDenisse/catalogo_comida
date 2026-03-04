<div class="cont-modal">
    <slot />
</div>

<style>
    .cont-modal{
        flex: 1;
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        width: 100%;
        background-color: rgba(0, 0, 0, 0.4);
        z-index: 999;
        animation: fadeIn 0.2s;
        border-top-left-radius: 7px;
        border-top-right-radius: 7px;
        box-shadow: 0px 11000px 0px 10990px rgba(0, 0, 0, 0.4);
    }
</style>