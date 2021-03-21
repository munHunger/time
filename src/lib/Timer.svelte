<script>
    import { nord } from "$lib/nord";
    import Icon from "$lib/Icon.svelte"

    export let start;
    let current;


    setInterval(() => {
        current = new Date();
    }, 1000);

    $: time = ((current ? current.getTime() : 0) - (start || 0)) / 1000;

    $: minutes = Math.floor(time / 60);
    $: minname = minutes > 1 ? "mins" : "min";
    $: seconds = Math.floor(time - minutes * 60)
    function clicked() {
        if(!start)
            start = new Date().getTime();
    }
</script>

<div class="circle" style="background-color: {nord[2]}" on:click={clicked}>
    <div class="center large">
        {#if !start}
            <span>START</span>
        {:else}
            {minutes}:{seconds}
        {/if}
    </div>
    {#if start}
        <div class="plus">
            <span style="display:inline-block; transform:rotate(-180deg);" on:click={() => start -= 15 * 60 * 1000}>
                <Icon plus></Icon>
            </span>
        </div>
        <div class="minus">
            <span style="display:inline-block; transform:rotate(90deg);" on:click={() => start += 15 * 60 * 1000}>
                <Icon minus></Icon>
            </span>
        </div>
    {/if}
</div>

<style>

    .plus {
        position: absolute;
        top: 0%;
        transform-origin: 8rem 8rem;
        transform: rotate(180deg) translate(0%, 0%);
    }
    .minus {
        position: absolute;
        top: 0%;
        transform-origin: 8rem 8rem;
        transform: rotate(-90deg) translate(0%, 0%);
    }

    .circle {
        position: relative;
        display: inline-block;
        width: 16rem;
        height: 16rem;
        margin: 2rem;
        border-radius: 100%;
        box-shadow: inset 0 0.3rem 1rem rgba(255,255,255,0.25), 0 1rem 1.2rem 0.2rem rgba(0,0,0,0.2);
    }

    .large {
        font-size: 2rem;
    }

    .center {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
</style>