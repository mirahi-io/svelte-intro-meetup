<script>
	import { fly } from 'svelte/transition'

	const pageTransitionDuration = 200
</script>

<div
	in:fly={{
		x: 40,
		duration: pageTransitionDuration,
		delay: pageTransitionDuration * 1.5,
	}}
	out:fly={{ x: -40, duration: pageTransitionDuration }}
	{...$$restProps}
>
	<slot />
</div>
