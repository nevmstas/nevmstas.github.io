<script lang="ts">
	import ContentBlock from './ContentBlock.svelte';

	interface Project {
		id: string;
		title: string;
		description: string;
		skills?: string[];
	}

	interface Props {
		projects?: Project[];
	}

	let { projects = [] }: Props = $props();
</script>

<section id="projects" class="content-section">
	{#if projects.length > 0}
		{#each projects as project}
			<ContentBlock
				title={project.title}
				description={project.description}
				skills={project.skills || []}
			/>
		{/each}
	{:else}
		<article class="content-block">
			<h2 class="block-title">Projects</h2>
			<p class="block-description">Projects section coming soon...</p>
		</article>
	{/if}
</section>

<style>
	.content-section {
		width: 100%;
	}

	.content-block {
		padding: 1.5rem 1rem;
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
</style>

