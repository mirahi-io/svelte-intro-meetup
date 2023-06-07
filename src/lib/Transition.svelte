<script>
	import { fly } from 'svelte/transition'

	const pageTransitionDuration = 200
</script>

<div {...$$restProps}>
	<slot />
</div>
