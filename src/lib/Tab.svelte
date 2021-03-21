<script>
    import {nord} from "$lib/nord";
    export let onSelect;
    export let name;
    export let expanded = true;
    String.prototype.hashCode = function() {
        var hash = 0, i, chr;
        if (this.length === 0) return hash;
        for (i = 0; i < this.length; i++) {
            chr   = this.charCodeAt(i);
            hash  = ((hash << 5) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
        }
        return Math.abs(hash);
    };

</script>

<div class="tab {expanded ? '' : 'inactive'}" style="background-color: {nord[(name.hashCode() % 6) + 10]}"
    on:click="{onSelect}">
    {#if expanded}
        {name}
    {/if}
</div>

<style>
    .tab {
        padding: 2rem;
        border-bottom: 0.5rem solid rgba(0,0,0,0.5);
        font-size: 1.5rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.1s ease-in-out;
    }

    .inactive {
        padding: 0.5rem;
        border-bottom-width: 0;
    }
</style>