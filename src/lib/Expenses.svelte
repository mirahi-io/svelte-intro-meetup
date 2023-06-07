<script lang="ts">
	import { createEventDispatcher } from 'svelte'
	import type { Expense, User } from '../types'
	import Modal from './Modal.svelte'
	import ExpenseForm from './ExpenseForm.svelte'
	import ExpenseItem from './ExpenseItem.svelte'
	import Button from './Button.svelte'

	export let expenses: Expense[] = []
	export let users: User[] = []

	const dispatch = createEventDispatcher<{
		add: Expense
	}>()

	const emptyForm: Expense = {
		title: '',
		by: '',
		for: [],
		amount: 0,
		settled: false,
	}

	let form: Expense = { ...emptyForm }

	let addExpenseModal = false
	const toggleModal = (visible: boolean) => () => (addExpenseModal = visible)

	const addExpense = (_e: CustomEvent) => {
		dispatch('add', form)
		addExpenseModal = false
		form = { ...emptyForm }
	}
</script>

<Button on:click={toggleModal(true)}>add expense</Button>

{#each expenses as expense}
	<ExpenseItem {expense} {users} />
{/each}

<Modal open={addExpenseModal} on:close={toggleModal(false)}>
	<ExpenseForm id="add" bind:form {users} on:submit={addExpense} />
	<svelte:fragment slot="footer">
		<Button class="secondary" on:click={toggleModal(false)}>cancel</Button>
		<Button type="submit" form="add">submit</Button>
	</svelte:fragment>
</Modal>
