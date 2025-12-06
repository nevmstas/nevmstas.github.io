<script lang="ts">
	import { Linkedin, Github } from '@lucide/svelte';
	import ResumeButton from './ResumeButton.svelte';
	import type { ResumeQuery } from '@nevmstas/hygraph-client';

	interface Props {
		name: string;
		avatarUrl?: string;
		yearsOfExperience: number;
		secondStat: { value: number | string; label: string };
		thirdStat: { value: number | string; label: string };
		linkedIn?: string | null;
		github?: string | null;
		resumeData?: ResumeQuery;
	}

	let {
		name,
		avatarUrl,
		yearsOfExperience,
		secondStat,
		thirdStat,
		linkedIn,
		github,
		resumeData
	}: Props = $props();
</script>

<header class="bg-black z-10 pt-[max(1rem,env(safe-area-inset-top))] flex justify-center">
	<div class="max-w-[430px] mx-auto px-4 flex flex-col gap-3 w-full py-4">
		<h1 class="text-lg font-semibold m-0 text-gray-50 leading-tight">{name}</h1>
		<div class="flex items-center gap-5">
			<div class="w-20 h-20 shrink-0 rounded-full overflow-hidden bg-gray-900">
				{#if avatarUrl}
					<img src={avatarUrl} alt={name} class="w-full h-full object-cover" />
				{:else}
					<div class="w-full h-full bg-gray-900 flex items-center justify-center before:content-[''] before:w-2/5 before:h-2/5 before:rounded-full before:bg-gray-400 before:opacity-30"></div>
				{/if}
			</div>
			<div class="flex gap-4">
				<div class="flex flex-col gap-0.5">
					<div class="text-s font-bold text-gray-50 leading-tight">{yearsOfExperience}</div>
					<div class="text-xs text-gray-50  tracking-wide">Years</div>
				</div>
				<div class="flex flex-col gap-0.5">
					<div class="text-s font-bold text-gray-50 leading-tight">{secondStat.value}</div>
					<div class="text-xs text-gray-50  tracking-wide">{secondStat.label}</div>
				</div>
				<div class="flex flex-col gap-0.5">
					<div class="text-s font-bold text-gray-50 leading-tight">{thirdStat.value}</div>
					<div class="text-xs text-gray-50 tracking-wide">{thirdStat.label}</div>
				</div>
			</div>
		</div>
		<div class="flex items-center gap-3 flex-wrap">
			{#if github}
			<a
				href={`https://github.com/${github}`}
				target="_blank"
				rel="noopener noreferrer"
				class="flex items-center justify-center text-gray-400 transition-colors duration-200 no-underline hover:text-gray-50 focus-visible:outline focus-visible:outline-gray-50 focus-visible:outline-offset-2 focus-visible:rounded"
				aria-label="GitHub"
			>
				<Github size={20} />
			</a>
		{/if}
			{#if linkedIn}
			<a
				href={`https://www.linkedin.com/${linkedIn}`}
				target="_blank"
				rel="noopener noreferrer"
				class="flex items-center justify-center text-gray-400 transition-colors duration-200 no-underline hover:text-gray-50 focus-visible:outline focus-visible:outline-gray-50 focus-visible:outline-offset-2 focus-visible:rounded"
				aria-label="LinkedIn"
			>
				<Linkedin size={20} />
			</a>
		{/if}

			{#if resumeData}
			<div class="flex items-center gap-2 text-gray-400 transition-colors duration-200 no-underline hover:text-gray-50 focus-visible:outline focus-visible:outline-gray-50 focus-visible:outline-offset-2 focus-visible:rounded cursor-pointer">
				<ResumeButton {resumeData} />
				<span>download cv</span>
			</div>
			{/if}

		</div>
	</div>
</header>

