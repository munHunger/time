<script>
  import { nord } from "$lib/nord";

  import { onMount } from "svelte";
  onMount(() => {
    if (document) {
      document.documentElement.style.cssText = "--bg-color:" + nord[0];
      document.documentElement.style.cssText += "--fg-color:" + nord[5];
    }
  });
</script>

<style>
  :global(input) {
    color: var(--fg-color);
    background-color: var(--bg-color);
    text-align: center;
    border: none;
    border-radius: 0.25rem;
    outline: none;
  }

  :global(body) {
    padding: 0;
    margin: 0;
    background-color: var(--bg-color);
    color: var(--fg-color);
  }
</style>
