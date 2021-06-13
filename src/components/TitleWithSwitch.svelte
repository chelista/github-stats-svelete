<script>
import {createEventDispatcher} from 'svelte';

const dispatch = createEventDispatcher();
let on = false;
function handleClick() {
    on = !on;
    dispatch('switch', {on});
}
</script>

<div>
    <slot />
    <span class="switch">
        <label>
            Off
            <input type="checkbox" on:click={handleClick}>
            <span class="lever"></span>
            Auto Refresh
        </label>
    </span>
</div>

<style>
</style>
