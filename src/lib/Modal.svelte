<script>
    import { nord } from "$lib/nord"
</script>
<div class="modal" style="background-color: {nord[1]}">
    <slot />
</div>

<style>
    .modal {
        position: fixed;
        left: 50%;
        top: 5%;
        transform: translateX(-50%);
        padding: 1rem;
        border-radius: 1rem;
        box-shadow: 0px 0.1rem 0.25rem 0.1rem rgba(0,0,0,0.3);
    }
</style>