export type User = {
	name: string
}

export type Expense = {
	title: string
	by: string
	for: string[]
	amount: number
	settled: boolean
}

export type Balance = [string, number]

export type Due = {
	from: string
	to: string
	amount: number
}
