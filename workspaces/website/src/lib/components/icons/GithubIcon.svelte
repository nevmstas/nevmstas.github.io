<script lang="ts">
	import { tweened } from 'svelte/motion';
	import { cubicInOut, cubicOut } from 'svelte/easing';

	interface Props {
		size?: number;
		color?: string;
		strokeWidth?: number;
		class?: string;
	}

	let {
		size = 24,
		color = 'currentColor',
		strokeWidth = 2,
		class: className = ''
	}: Props = $props();

	const scale = tweened(1, { duration: 250, easing: cubicInOut });
	const rotate = tweened(0, { duration: 250, easing: cubicInOut });

	async function start() {
		scale.set(1.1, { duration: 250 }).then(() => scale.set(1, { duration: 250 }));
		await rotate.set(-5, { duration: 125 });
		await rotate.set(5, { duration: 250 });
		await rotate.set(0, { duration: 125 });
	}

	function stop() {
		scale.set(1, { duration: 200, easing: cubicOut });
		rotate.set(0, { duration: 200, easing: cubicOut });
	}

	export function startAnimation() {
		start();
	}

	export function stopAnimation() {
		stop();
	}
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<svg
	onmouseenter={start}
	onmouseleave={stop}
	xmlns="http://www.w3.org/2000/svg"
	width={size}
	height={size}
	viewBox="0 0 24 24"
	fill="none"
	stroke={color}
	stroke-width={strokeWidth}
	stroke-linecap="round"
	stroke-linejoin="round"
	class="inline-flex items-center justify-center {className}"
	style="overflow: visible"
>
	<g style="transform-origin: center; transform: scale({$scale}) rotate({$rotate}deg)">
		<path stroke="none" d="M0 0h24v24H0z" fill="none" />
		<path
			d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5"
		/>
	</g>
</svg>
