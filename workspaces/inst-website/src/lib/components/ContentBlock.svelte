<script lang="ts">
	interface Props {
		title: string;
		description: string;
		skills?: string[];
	}

	let { title, description, skills = [] }: Props = $props();
</script>

<article class="content-block">
	<h2 class="block-title">{title}</h2>
	<p class="block-description">{description}</p>
	{#if skills.length > 0}
		<div class="block-skills">
			{#each skills as skill}
				<span class="skill-tag">#{skill}</span>
			{/each}
		</div>
	{/if}
</article>

<style>
	.content-block {
		padding: 1.25rem 1rem;
	}

	.content-block:first-child {
		padding-top: 1.5rem;
	}

	.block-title {
		font-size: 1.125rem;
		font-weight: 600;
		margin-bottom: 0.5rem;
		color: var(--text-primary);
		line-height: 1.4;
	}

	.block-description {
		font-size: 0.9375rem;
		line-height: 1.6;
		color: var(--text-secondary);
		margin-bottom: 0.75rem;
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

