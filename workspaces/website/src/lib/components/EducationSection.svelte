<script lang="ts">
	import { GraduationCap } from '@lucide/svelte';

	interface Education {
		id: string;
		degree?: string | null;
		institution?: string | null;
		specialization?: string | null;
		achievements?: string[] | null;
		period?: string | null;
	}

	interface Props {
		educations: Education[];
	}

	let { educations }: Props = $props();

	function getDescription(education: Education): string {
		let desc = education.institution || '';
		if (education.specialization) {
			desc += desc ? ` • ${education.specialization}` : education.specialization;
		}
		if (education.achievements && education.achievements.length > 0) {
			desc += desc ? `\n${education.achievements.join(', ')}` : education.achievements.join(', ');
		}
		return desc || 'No description available';
	}
</script>

<section id="education" class="w-full">
	<h2 class="text-lg font-semibold mb-2 text-gray-50 leading-snug px-4 pt-6">Education</h2>
	{#each educations as education}
		{#if education.degree}
			<article class="py-5 px-4 first:pt-6">
				<div class="flex items-center gap-3 mb-3">
					<div class="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center shrink-0 border-2 border-gray-400">
						<GraduationCap size={20} class="text-gray-50" />
					</div>
					<h2 class="text-lg font-semibold text-gray-50 leading-snug">
						{education.degree}
						{#if education.specialization}
							<span class="text-gray-400"> in {education.specialization}</span>
						{/if}
					</h2>
				</div>
				<p class="text-sm leading-relaxed text-gray-400 mb-3 whitespace-pre-line">
					{education.institution}
				</p>
				{#if education.period}
					<div class="text-xs text-gray-400 mt-2">{education.period}</div>
				{/if}
			</article>
		{/if}
	{/each}
</section>

