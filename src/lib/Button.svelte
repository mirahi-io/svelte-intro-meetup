<script lang="ts">
	export let outline = false
</script>

<button class:outline on:click {...$$restProps}>
	<slot />
</button>

<style>
	button {
		text-transform: uppercase;
	}
</style>
