<script lang="ts">
	export let open = false
</script>

<dialog {open}>
	<article>
		<!-- TODO G: ⬇ add a default slot & a conditional footer slot -->
		There should be something here
		<footer>This footer is always here</footer>
	</article>
</dialog>

<style>
	dialog {
		text-align: left;
	}
</style>
