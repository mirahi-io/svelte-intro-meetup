<script lang="ts">
	import { createEventDispatcher } from 'svelte'
	import Button from './Button.svelte'
	import type { Balance, User } from '../types'

	export let balances: Balance[] = []

	const formatBalance = (balance: number) => {
		if (!balance) return 'is settled up'
		return (balance > 0 ? 'is owed $' : 'owes $') + Math.abs(balance)
	}

	let newUser = ''

	const dispatch = createEventDispatcher<{
		add: User
	}>()

	const addUser = () => {
		dispatch('add', { name: newUser })
		newUser = ''
	}
</script>

<div>
	<input placeholder="Uncle Scrooge" bind:value={newUser} />
	<Button on:click={addUser}>add user</Button>
</div>

{#each balances as [name, balance]}
	<article>
		{name}
		{formatBalance(balance)}
	</article>
{/each}
