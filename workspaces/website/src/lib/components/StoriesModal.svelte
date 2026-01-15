<script lang="ts">
	import { X, ExternalLink } from '@lucide/svelte';
	import { fade, scale } from 'svelte/transition';
	import type { PublicationsQuery } from '@nevmstas/hygraph-client';

	interface Props {
		publications: PublicationsQuery['publications'];
		onclose: () => void;
	}

	let { publications, onclose }: Props = $props();

	let currentIndex = $state(0);

	function next() {
		if (currentIndex < publications.length - 1) {
			currentIndex++;
		} else {
			onclose();
		}
	}

	function prev() {
		if (currentIndex > 0) {
			currentIndex--;
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') onclose();
		if (e.key === 'ArrowRight') next();
		if (e.key === 'ArrowLeft') prev();
	}

	const currentPublication = $derived(publications[currentIndex]);
</script>

<svelte:window onkeydown={handleKeydown} />

<div
	class="fixed inset-0 z-50 bg-black/90 flex justify-center"
	role="dialog"
	aria-modal="true"
	aria-label="Publications"
	tabindex="-1"
	onclick={onclose}
	onkeydown={(e) => e.key === 'Enter' && onclose()}
	transition:fade={{ duration: 200 }}
>
	<div
		class="relative w-full max-w-[440px] h-full max-h-[80vh] bg-black rounded-xl overflow-hidden"
		role="presentation"
		onclick={(e) => e.stopPropagation()}
		onkeydown={(e) => e.stopPropagation()}
		transition:scale={{ duration: 200, start: 0.95 }}
	>
		{#if currentPublication.image?.url}
			<img
				src={currentPublication.image.url}
				alt={currentPublication.title}
				class="absolute inset-0 w-full h-full object-contain"
			/>
			<div class="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80"></div>
		{/if}

		<div class="absolute top-4 left-4 right-4 flex gap-1 z-10">
			{#each publications as _, i}
				<div class="flex-1 h-0.5 rounded-full bg-white/30 overflow-hidden">
					<div
						class="h-full bg-white transition-all duration-300"
						style="width: {i <= currentIndex ? '100%' : '0%'}"
					></div>
				</div>
			{/each}
		</div>

		<button
			type="button"
			onclick={onclose}
			class="absolute top-10 right-4 text-white/80 hover:text-white z-10 p-2"
			aria-label="Close"
		>
			<X size={24} />
		</button>

		<button
			type="button"
			onclick={prev}
			class="absolute left-0 top-0 bottom-0 w-1/3 z-10 cursor-pointer"
			aria-label="Previous publication"
		></button>
		<button
			type="button"
			onclick={next}
			class="absolute right-0 top-0 bottom-0 w-1/3 z-10 cursor-pointer"
			aria-label="Next publication"
		></button>

		<div class="absolute bottom-0 left-0 right-0 p-6 z-10">
			<div class="text-center">
				<h2 class="text-2xl font-bold text-white mb-2 drop-shadow-lg">{currentPublication.title}</h2>
				{#if currentPublication.description}
					<p class="text-gray-200 mb-4 drop-shadow-lg">{currentPublication.description}</p>
				{/if}
				<a
					href={currentPublication.link}
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-medium rounded-full hover:bg-gray-200 transition-colors"
				>
					View Publication
					<ExternalLink size={18} />
				</a>
			</div>
		</div>
	</div>
</div>
