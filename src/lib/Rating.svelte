<script>
    import Icon from "$lib/Icon.svelte"
    import { nord } from "$lib/nord";

	import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    let current = 0;
    
    function onSelect() {
		dispatch('rating', current);
    }
</script>

<div>
    {#each new Array(5).fill(undefined).map((v,i) => i) as i}
        <span on:mouseover="{() => current = i}" on:click="{() => onSelect(i)}"  style="color:{nord[i <= current ? 8 : 3]}">
            {#if i <= current}
                <Icon starFilled />
            {:else}
                <Icon star />
            {/if}
        </span>
    {/each}
</div>