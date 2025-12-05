<script lang="ts">
	import { Linkedin, Github } from '@lucide/svelte';

	interface Props {
		name: string;
		avatarUrl?: string;
		yearsOfExperience: number;
		stat2: number;
		stat2Label: string;
		stat3: number;
		stat3Label: string;
		linkedIn?: string | null;
		github?: string | null;
	}

	let { name, avatarUrl, yearsOfExperience, stat2, stat2Label, stat3, stat3Label, linkedIn, github }: Props = $props();
</script>

<header class="fixed top-0 left-0 right-0 bg-black z-10 p-4 pt-[max(1rem,env(safe-area-inset-top))] w-full flex justify-center">
	<div class="max-w-[430px] mx-auto flex justify-center items-center w-full">
		<div class="w-20 h-20 shrink-0 rounded-full overflow-hidden bg-gray-900 mr-5">
			{#if avatarUrl}
				<img src={avatarUrl} alt={name} class="w-full h-full object-cover" />
			{:else}
				<div class="w-full h-full bg-gray-900 flex items-center justify-center before:content-[''] before:w-2/5 before:h-2/5 before:rounded-full before:bg-gray-400 before:opacity-30"></div>
			{/if}
		</div>
		<div class="flex-1 flex flex-col gap-3 min-w-0">
			<h1 class="text-lg font-semibold m-0 text-gray-50 leading-tight">{name}</h1>
			<div class="flex gap-4">
				<div class="flex flex-col gap-0.5">
					<div class="text-xl font-bold text-gray-50 leading-tight">{yearsOfExperience}</div>
					<div class="text-xs text-gray-400 uppercase tracking-wide">Years</div>
				</div>
				<div class="flex flex-col gap-0.5">
					<div class="text-xl font-bold text-gray-50 leading-tight">{stat2}</div>
					<div class="text-xs text-gray-400 uppercase tracking-wide">{stat2Label}</div>
				</div>
				<div class="flex flex-col gap-0.5">
					<div class="text-xl font-bold text-gray-50 leading-tight">{stat3}</div>
					<div class="text-xs text-gray-400 uppercase tracking-wide">{stat3Label}</div>
				</div>
			</div>
			<div class="flex gap-3 items-center">
				{#if linkedIn}
					<a
						href={linkedIn}
						target="_blank"
						rel="noopener noreferrer"
						class="flex items-center justify-center text-gray-400 transition-colors duration-200 no-underline hover:text-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gray-50 focus-visible:outline-offset-2 focus-visible:rounded"
						aria-label="LinkedIn"
					>
						<Linkedin size={20} />
					</a>
				{/if}
				{#if github}
					<a
						href={github}
						target="_blank"
						rel="noopener noreferrer"
						class="flex items-center justify-center text-gray-400 transition-colors duration-200 no-underline hover:text-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gray-50 focus-visible:outline-offset-2 focus-visible:rounded"
						aria-label="GitHub"
					>
						<Github size={20} />
					</a>
				{/if}
			</div>
		</div>
	</div>
</header>

