import { derived, writable } from 'svelte/store'
import type { User, Expense, Due, Balance } from '../types'

const roundCents = (amount: number) => Math.round(amount * 100) / 100

const defaultUsers: User[] = [
	{
		name: 'Huey',
	},
	{
		name: 'Dewey',
	},
	{
		name: 'Louie',
	},
	{
		name: 'Donald',
	},
]

const defaultExpenses: Expense[] = [
	{
		title: 'ice cream',
		amount: 15,
		by: 'Donald',
		for: ['Huey', 'Dewey', 'Louie'],
		settled: false,
	},
	{
		title: 'bus fare',
		amount: 5,
		by: 'Dewey',
		for: ['Huey', 'Louie'],
		settled: false,
	},
	{
		title: 'comic book',
		amount: 10,
		by: 'Louie',
		for: ['Dewey'],
		settled: false,
	},
	{
		title: 'sandwiches',
		amount: 20,
		by: 'Donald',
		for: ['Dewey', 'Huey', 'Louie', 'Donald'],
		settled: false,
	},
	{
		title: 'best uncle mug',
		amount: 30,
		by: 'Huey',
		for: ['Dewey', 'Huey', 'Louie'],
		settled: false,
	},
	{
		title: 'cinema',
		amount: 40,
		by: 'Dewey',
		for: ['Dewey', 'Huey', 'Louie', 'Donald'],
		settled: false,
	},
]

export const users = writable<User[]>(defaultUsers)

export const expenses = writable<Expense[]>(defaultExpenses)

export const balances = derived([users, expenses], ([$users, $expenses]): Balance[] => {
	const ledger: {
		[name: string]: number
	} = $users.reduce(
		(acc, user) => ({
			...acc,
			[user.name]: 0,
		}),
		{}
	)

	$expenses
		.filter((expense) => !expense.settled)
		.forEach((expense) => {
			const amount = expense.amount / expense.for.length

			const minusPayer = expense.for.filter((user) => user !== expense.by)
			const paidMinusOwn = amount * minusPayer.length

			ledger[expense.by] += paidMinusOwn

			for (let borrower of minusPayer) {
				ledger[borrower] -= amount
			}
		})

	const roundedVals = Object.entries(ledger).map(([user, amount]) => {
		return [user, roundCents(amount)] as [string, number]
	})

	const sorted = roundedVals.sort(([_user1, val1], [_user2, val2]) => val1 - val2)

	return sorted
})

export const dues = derived(balances, ($ledger) => {
	let copy = [...$ledger]
	let dues: Due[] = []

	while (copy.length) {
		const [owesMost, owesMostAmount] = copy[0]
		const [isOwedMost, isOwedMostAmount] = copy.at(-1)

		const reimbursement = roundCents(Math.min(Math.abs(owesMostAmount), Math.abs(isOwedMostAmount)))

		if (!reimbursement) break

		const due: Due = {
			amount: reimbursement,
			from: owesMost,
			to: isOwedMost,
		}

		dues = [...dues, due]

		copy[0] = [owesMost, owesMostAmount + reimbursement]
		copy[copy.length - 1] = [isOwedMost, isOwedMostAmount - reimbursement]

		copy = copy.filter(([_user, amount]) => amount)
	}

	return dues
})
