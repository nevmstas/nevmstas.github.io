<script lang="ts">
	import ContentBlock from './ContentBlock.svelte';

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
	{#each educations as education}
		{#if education.degree}
			<ContentBlock
				title={education.degree}
				description={getDescription(education)}
				skills={[]}
			/>
		{/if}
	{/each}
</section>

