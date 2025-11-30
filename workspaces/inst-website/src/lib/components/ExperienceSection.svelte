<script lang="ts">
	interface Experience {
		id: string;
		company?: string | null;
		jobTitile?: string | null;
		description: string[];
		startDate?: any;
		endDate?: any;
		skills?: Array<{ name: string }> | null;
	}

	interface Props {
		experiences: Experience[];
	}

	let { experiences }: Props = $props();

	function getSkills(experience: Experience): string[] {
		return experience.skills?.map((s) => s.name.toLowerCase()) || [];
	}

	function getBulletPoints(experience: Experience): string[] {
		if (Array.isArray(experience.description)) {
			return experience.description;
		}
		return [];
	}
</script>

<section id="experience" class="content-section">
	{#each experiences as experience}
		{#if experience.jobTitile && experience.company}
			<article class="content-block">
				<h2 class="block-title">{experience.jobTitile} @ {experience.company}</h2>
				{#if getBulletPoints(experience).length > 0}
					<ul class="block-bullets">
						{#each getBulletPoints(experience) as bullet}
							<li class="bullet-item">{bullet}</li>
						{/each}
					</ul>
				{/if}
				{#if getSkills(experience).length > 0}
					<div class="block-skills">
						{#each getSkills(experience) as skill}
							<span class="skill-tag">#{skill}</span>
						{/each}
					</div>
				{/if}
			</article>
		{/if}
	{/each}
</section>

<style>
	.content-section {
		width: 100%;
	}

	.content-block {
		padding: 1.25rem 1rem;
	}

	.content-block:first-child {
		padding-top: 1.5rem;
	}

	.block-title {
		font-size: 1.125rem;
		font-weight: 600;
		margin-bottom: 0.75rem;
		color: var(--text-primary);
		line-height: 1.4;
	}

	.block-bullets {
		list-style: none;
		padding: 0;
		margin: 0 0 0.75rem 0;
	}

	.bullet-item {
		font-size: 0.9375rem;
		line-height: 1.6;
		color: var(--text-secondary);
		margin-bottom: 0.5rem;
		padding-left: 1.25rem;
		position: relative;
	}

	.bullet-item::before {
		content: '•';
		position: absolute;
		left: 0;
		color: var(--text-primary);
		font-weight: 600;
	}

	.block-skills {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-top: 0.75rem;
	}

	.skill-tag {
		font-size: 0.8125rem;
		color: var(--text-primary);
		font-weight: 500;
		letter-spacing: 0.3px;
	}
</style>

