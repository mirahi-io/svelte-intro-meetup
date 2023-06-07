<script lang="ts">
	import { createEventDispatcher } from 'svelte'
	import type { Expense, User } from '../types'

	export let form: Expense
	export let users: User[] = []

	const dispatch = createEventDispatcher<{
		submit: void
	}>()

	const submit = (e: SubmitEvent) => {
		e.preventDefault()
		dispatch('submit')
	}
</script>

<form on:submit={submit} {...$$restProps}>
	<label for="title">
		Title
		<input
			type="text"
			id="title"
			name="title"
			placeholder="Marbles, chocolate, ..."
			bind:value={form.title}
			required
		/>
	</label>

	<label for="buyer">Who paid?</label>
	<select bind:value={form.by} id="buyer" required>
		<option value="" selected>Select a user…</option>
		{#each users as user}
			<option>{user.name}</option>
		{/each}
	</select>

	<fieldset>
		<legend>For whom?</legend>
		{#each users as user}
			<label for={user.name}>
				<input
					type="checkbox"
					id={user.name}
					name="size"
					value={user.name}
					bind:group={form.for}
					required={!form.for.length}
				/>
				{user.name}
			</label>
		{/each}
	</fieldset>

	<label for="amount">
		Amount
		<input
			type="number"
			id="amount"
			name="amount"
			placeholder="23.45"
			min="1"
			max="999"
			bind:value={form.amount}
			required
		/>
	</label>
</form>
