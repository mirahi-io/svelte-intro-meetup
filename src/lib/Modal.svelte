<script lang="ts">
	import { onMount } from 'svelte'
	import { createEventDispatcher } from 'svelte'
	import Button from './Button.svelte'

	export let open = false

	const dispatch = createEventDispatcher<{
		close: void
		confirm: void
	}>()

	const close = () => dispatch('close')
	const confirm = () => dispatch('confirm')

	const onEscape = (e: KeyboardEvent) => {
		if (e.key === 'Escape') {
			close()
		}
	}

	onMount(() => {
		window.addEventListener('keyup', onEscape)
		return () => {
			window?.removeEventListener('keyup', onEscape)
		}
	})
</script>

<dialog {open}>
	<article>
		<slot />
		{#if $$slots.footer}
			<footer>
				<slot name="footer">
					<Button class="secondary" on:click={close}>cancel</Button>
					<Button on:click={confirm}>confirm</Button>
				</slot>
			</footer>
		{/if}
	</article>
</dialog>

<style>
	dialog {
		text-align: left;
	}
</style>
