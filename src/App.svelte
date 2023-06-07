<script lang="ts">
	import Balances from './lib/Balances.svelte'
	import Button from './lib/Button.svelte'
	import Dues from './lib/Dues.svelte'
	import Expenses from './lib/Expenses.svelte'
	import Transition from './lib/Transition.svelte'
	import { expenses, balances, dues, users } from './lib/stores'
	import type { Expense, User } from './types'

	const views = ['expenses', 'balance', 'dues'] as const
	type View = (typeof views)[number]

	let selectedView: View = 'expenses'

	const changeView = (view: View) => () => (selectedView = view)

	const addExpense = (e: CustomEvent<Expense>) => {
		expenses.update((list) => [e.detail, ...list])
	}

	const addUser = (e: CustomEvent<User>) => {
		users.update((list) => [e.detail, ...list])
	}

	const clearDebts = (_e: CustomEvent) => {
		expenses.update((list) => list.map((expense) => ({ ...expense, settled: true })))
	}
</script>

<main>
	<h1>Bill Split</h1>

	{#each views as view}
		<Button on:click={changeView(view)} class="secondary" outline={view !== selectedView}
			>{view}</Button
		>
	{/each}

	{#if selectedView === 'expenses'}
		<Transition>
			<Expenses expenses={$expenses} users={$users} on:add={addExpense} />
		</Transition>
	{/if}

	{#if selectedView === 'balance'}
		<Transition>
			<Balances balances={$balances} on:add={addUser} />
		</Transition>
	{/if}

	{#if selectedView === 'dues'}
		<Transition>
			<Dues dues={$dues} on:clear={clearDebts} />
		</Transition>
	{/if}
</main>
