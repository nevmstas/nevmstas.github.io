<script lang="ts">
	import { House, Ghost } from '@lucide/svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';


	let { error: errorProp, status: statusProp }: { error?: Error; status?: number } = $props();
	
	// Use props if available, otherwise fall back to $page store
	const status = statusProp ?? page.status ?? 500;
	const error = errorProp ?? page.error;
	const is404 = status === 404;
</script>

<div class="relative w-full h-dvh overflow-hidden flex flex-col bg-black text-gray-50">
	<div class="flex-1 flex flex-col items-center justify-center px-4 fade-in">
		<div class="max-w-[440px] w-full flex flex-col items-center text-center space-y-6">
			<div class="relative flex flex-col items-center">
				<Ghost size={120} class="text-gray-50 mb-4" />
				{#if is404}
					<div class="text-[3rem] font-bold text-gray-50 select-none leading-none">404</div>
				{:else}
					<div class="text-8xl font-bold text-gray-800 select-none">{status}</div>
				{/if}
			</div>

			<div class="space-y-2">
				{#if is404}
					<h1 class="text-2xl font-semibold text-gray-50">lost in the void</h1>
					<p class="text-gray-400 text-sm max-w-sm">
						this page doesn't exist. maybe it never did.
					</p>
				{:else}
					<h1 class="text-2xl font-semibold text-gray-50">Something Went Wrong</h1>
					<p class="text-gray-400 text-sm max-w-sm">
						An unexpected error occurred. Please try again later.
					</p>
				{/if}
			</div>

			{#if error?.message && !is404}
				<div class="mt-4 p-4 bg-gray-900 rounded-lg border border-gray-800 max-w-sm w-full">
					<p class="text-xs text-gray-500 font-mono break-all">{error.message}</p>
				</div>
			{/if}

			<button
				onclick={() => goto('/')}
				class="cursor-pointer mt-8 flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-gray-50 rounded-lg transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-gray-50 focus-visible:outline-offset-2"
			>
				<House size={20} />
				<span>Go Home</span>
			</button>
		</div>
	</div>
</div>