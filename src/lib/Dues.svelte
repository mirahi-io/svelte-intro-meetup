<script lang="ts">
	import { createEventDispatcher } from 'svelte'
	import type { Due } from '../types'
	import Button from './Button.svelte'

	export let dues: Due[] = []

	const dispatch = createEventDispatcher<{
		clear: void
	}>()

	const clear = () => {
		dispatch('clear')
	}
</script>

<Button on:click={clear}>clear all debts</Button>

{#each dues as due}
	<article>{due.from} owes ${due.amount} to {due.to}</article>
{/each}
