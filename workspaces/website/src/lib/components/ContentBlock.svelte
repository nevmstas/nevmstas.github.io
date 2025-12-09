<script lang="ts">
	interface Props {
		title: string;
		description: string;
		skills?: string[];
	}

	let { title, description, skills = [] }: Props = $props();
</script>

<article class="py-5 px-4 first:pt-6">
	<h2 class="text-xl font-semibold mb-2 text-gray-50 leading-snug">{title}</h2>
	<p class="text-base leading-relaxed text-gray-400 mb-3 whitespace-pre-line">{description}</p>
	{#if skills.length > 0}
		<div class="flex flex-wrap gap-2 mt-3">
			{#each skills as skill}
				<span class="text-sm text-gray-50 font-medium tracking-wide">#{skill}</span>
			{/each}
		</div>
	{/if}
</article>

