[If you want to, you can do the exercise on Stackblitz instead.](https://stackblitz.com/edit/svelte-workshop-broken)

[You can follow along with the awesome official doc.](https://svelte.dev/tutorial/basics)

### Part A

Use the 'title' variable instead of a hardcoded string.
Update the Button component so its text is always uppercase, and use it instead of ```<button>``` in App.svelte.

### Part B

Modify Button so that it can be given a class, and add a boolean prop to conditionally apply the 'outline' class, like this: 

```
  <Button class="secondary" outline={false}>expenses</Button>
  <Button class="secondary" outline={true}>balance</Button>
  <Button class="secondary" outline={true}>dues</Button>
```

### Part C

Loop through the views instead of having the same button written 3 times, and fix the view changing.

### Part D

Modify Balances so that you can add new users.

### Part E

Add initial data to the expenses store.

### Part F

Create Dues component where you display dues and can click a button to delete all expenses.

### Part G

Add default slot & footer slot to modal, so that form & footer buttons appear.

### Part H

Fix the form so that an expense can be submitted, and it adds an expense.

### Bonus

* Add a transition between page views.
* Mark expenses as settled instead of deleting them.
* Allow modal to be closed with ‘Esc’.

### Other useful links

[State of JS 2022](https://2022.stateofjs.com/en-US/libraries/front-end-frameworks/)

[Stack Overflow survey 2022](https://survey.stackoverflow.co/2022/#section-most-loved-dreaded-and-wanted-web-frameworks-and-technologies)

[Framework benchmarks](https://krausest.github.io/js-framework-benchmark)

[Component Party](https://component-party.dev/)
