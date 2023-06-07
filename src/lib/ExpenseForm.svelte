<script lang="ts">
	import { createEventDispatcher } from 'svelte'
	import type { Expense, User } from '../types'

	export let form: Expense
	export let users: User[] = []

	const dispatch = createEventDispatcher()

	const submit = (e: SubmitEvent) => {
		e.preventDefault()
		dispatch('submit')
	}
</script>

<form on:submit={submit} {...$$restProps}>
	<!-- TODO H.a: ⬇ add missing field & fix the others so that an expense can be submitted -->

	<label for="buyer">Who paid?</label>
	<select id="buyer" required>
		<option value="" selected>Select a user…</option>
	</select>

	<fieldset>
		<legend>For whom?</legend>
		{#each users as user}
			<label for={user.name}>
				<input type="checkbox" id={user.name} name="size" required={!form.for.length} />
				{user.name}
			</label>
		{/each}
	</fieldset>

	<label for="amount">
		Amount
		<input disabled />
	</label>
</form>
