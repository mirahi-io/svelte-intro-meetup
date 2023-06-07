<script lang="ts">
	import { createEventDispatcher } from 'svelte'
	import type { Balance, User } from '../types'
	import Button from './Button.svelte'

	export let balances: Balance[] = []

	const formatBalance = (balance: number) => {
		if (!balance) return 'is settled up'
		return (balance > 0 ? 'is owed ' : 'owes ') + Math.abs(balance)
	}

	let newUser = ''

	const dispatch = createEventDispatcher<{
		add: User
	}>()

	// TODO D: ⬇ bind new user name to input, ↕ dispatch custom event with user
</script>

<div>
	<input placeholder="Uncle Scrooge" />
	<Button>add user</Button>
</div>

{#each balances as [name, balance]}
	<article>
		{name}
		{formatBalance(balance)}
	</article>
{/each}
