<script lang="ts">
	import type { Expense, User } from '../types'

	export let expense: Expense
	export let users: User[] = []

	const formatRecipients = (names: string[]) => {
		if (names.length === users.length) return 'everyone'
		if (names.length === users.length - 1)
			return 'everyone but ' + users.find((user) => !names.includes(user.name)).name
		return names.reduce((list, name, i) => {
			if (!i) return name
			return list + (i < names.length - 1 ? ', ' : ' & ') + name
		}, '')
	}
</script>

<article>
	<strong>{expense.title}</strong>
	-
	<span>
		{expense.by} paid ${expense.amount} for {formatRecipients(expense.for)}
	</span>
</article>

<style>
	strong {
		text-transform: capitalize;
	}
</style>
