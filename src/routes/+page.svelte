<script>
    import { goto } from "$app/navigation";
</script>

<main class="home">
    <div class="blob blob1"></div>
    <div class="blob blob2"></div>
    <div class="blob blob3"></div>

    <section>
        <h1>🍔 Dynamic Food</h1>
        <h1 class="title">
            Catálogo de Comida
        </h1>
        <p class="subtitle">
            Encuentra comida deliciosa por tipo, dieta y horario.
            Todo en un solo lugar y de forma súper fácil.
        </p>
        <div class="buttons">
            <button class="primary" on:click={() => goto("/foods")}>
                Ver catálogo
            </button>
    
            <button class="secondary" on:click={() => goto("/login")}>
                Panel admin
            </button>
        </div>
    </section>

</main>

<style>
    :global(body){
        margin: 0;
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    }

    .home{
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 1.5rem;
        background:
            linear-gradient(135deg, #1a1026 0%, #111827 45%, #1f2937 100%);
        position: relative;
        overflow: hidden;
    }

    .blob{
        position: absolute;
        border-radius: 50%;
        filter: blur(70px);
        opacity: 0.45;
        z-index: 0;
    }

    .blob1{
        width: 260px;
        height: 260px;
        background: #ff7a59;
        top: 8%;
        left: 10%;
    }

    .blob2{
        width: 300px;
        height: 300px;
        background: #8b5cf6;
        bottom: 8%;
        right: 8%;
    }

    .blob3{
        width: 220px;
        height: 220px;
        background: #f59e0b;
        bottom: 18%;
        left: 18%;
    }

    .card{
        position: relative;
        z-index: 1;
        width: 100%;
        max-width: 720px;
        text-align: center;
        padding: 3rem 2rem;
        border-radius: 28px;
        background: rgba(255, 255, 255, 0.08);
        border: 1px solid rgba(255, 255, 255, 0.12);
        backdrop-filter: blur(14px);
        box-shadow: 0 20px 50px rgba(0, 0, 0, 0.35);
    }

    .emoji-row{
        display: flex;
        justify-content: center;
        gap: 0.8rem;
        font-size: 1.8rem;
        margin-bottom: 1rem;
    }

    .title{
        margin: 0;
        font-size: clamp(2.5rem, 6vw, 4.2rem);
        font-weight: 800;
        line-height: 1.05;
        color: #ffffff;
        text-shadow: 0 4px 18px rgba(0, 0, 0, 0.28);
        margin-bottom: 1rem;
    }

    .subtitle{
        margin: 0 auto 2rem auto;
        max-width: 560px;
        font-size: 1.08rem;
        line-height: 1.7;
        color: #e5e7eb;
    }

    .buttons{
        display: flex;
        justify-content: center;
        gap: 1rem;
        flex-wrap: wrap;
    }

    button{
        border: none;
        border-radius: 14px;
        padding: 0.95rem 1.6rem;
        font-size: 1rem;
        font-weight: 700;
        cursor: pointer;
        transition: transform 0.18s ease, box-shadow 0.18s ease, background 0.18s ease;
    }

    .primary{
        background: linear-gradient(135deg, #ff7a59, #ffb347);
        color: white;
        box-shadow: 0 10px 25px rgba(255, 122, 89, 0.35);
    }

    .primary:hover{
        transform: translateY(-2px) scale(1.02);
        box-shadow: 0 14px 28px rgba(255, 122, 89, 0.45);
    }

    .secondary{
        background: rgba(255, 255, 255, 0.1);
        color: white;
        border: 1px solid rgba(255,255,255,0.15);
    }

    .secondary:hover{
        transform: translateY(-2px);
        background: rgba(255, 255, 255, 0.16);
    }

    @media (max-width: 600px){
        .card{
            padding: 2.2rem 1.2rem;
            border-radius: 22px;
        }

        .emoji-row{
            font-size: 1.5rem;
        }

        .subtitle{
            font-size: 1rem;
        }

        button{
            width: 100%;
        }

        .buttons{
            flex-direction: column;
        }
    }
</style>