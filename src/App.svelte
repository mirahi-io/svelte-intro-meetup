<script lang="ts">
	import Balances from './lib/Balances.svelte'
	import Dues from './lib/Dues.svelte'
	import Expenses from './lib/Expenses.svelte'
	import { expenses, balances, dues, users } from './lib/stores'
	import type { Expense, User } from './types'

	const title = 'Bill Split'
	const views = ['expenses', 'balance', 'dues'] as const
	type View = (typeof views)[number]

	let selectedView: View = 'expenses'

	const changeView = (view: View) => () => (selectedView = view)

	const addExpense = (e: CustomEvent<Expense>) => {
		const f = e.detail
		if (!f.title || !f.amount || !f.for.length || !f.by) {
			throw new Error('incomplete data!')
		}
		// TODO H.b: ⬇ add the received expense to the list
	}

	const addUser = (e: CustomEvent<User>) => {
		users.update((list) => [e.detail, ...list])
	}

	const clearDebts = () => {
		// TODO F.b: remove all expenses
	}
</script>

<main>
	<h1>title</h1>

	<!-- TODO A.a: ⬆ use custom title -->
	<!-- TODO A.b: ⬇ use Button instead of button, with text in uppercase -->

	<button class="secondary">expenses</button>
	<button class="secondary outline">balance</button>
	<button class="secondary outline">dues</button>

	<!-- TODO B: ⬆ those Buttons should all have "secondary" as class, outline prop for views not selected -->

	<!-- TODO C: ⬆ loop through views instead of hardcoding 3 buttons, ⬇ render only selected view -->

	<hr />

	<Expenses expenses={$expenses} users={$users} on:add={addExpense} />

	<hr />

	<Balances balances={$balances} />

	<hr />

	<Dues />
</main>
