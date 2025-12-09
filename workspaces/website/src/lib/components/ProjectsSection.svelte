<script lang="ts">
	interface Project {
		id: string;
		name: string;
		description?: string | null;
		website?: string | null;
		githubLink?: string | null;
		skills?: Array<{ name: string }> | null;
		icon?: { url: string } | null;
	}

	interface Props {
		projects?: Project[];
	}

	let { projects = [] }: Props = $props();

	function getSkills(project: Project): string[] {
		return project.skills?.map((s) => s.name.toLowerCase()) || [];
	}
</script>

<section id="projects" class="w-full fade-in-delay-2">
	<h2 class="text-xl font-semibold mb-2 text-gray-50 leading-snug px-4 pt-6">Projects</h2>
	{#if projects.length > 0}
		{#each projects as project}
			<article class="py-5 px-4 first:pt-6">
				<div class="flex items-center gap-3 mb-3">
					{#if project.icon?.url}
						<img
							src={project.icon.url}
							alt={project.name || 'Project icon'}
							class="w-10 h-10 rounded-full object-cover shrink-0 border-2 border-gray-400"
						/>
					{/if}
					<h2 class="text-xl font-semibold text-gray-50 leading-snug">{project.name}</h2>
				</div>
				{#if project.website || project.githubLink}
					<div class="flex flex-wrap gap-3 mb-3">
						{#if project.website}
							<a
								href={project.website}
								target="_blank"
								rel="noopener noreferrer"
								class="text-sm text-gray-400 hover:text-gray-50 underline"
							>
								Website
							</a>
						{/if}
						{#if project.githubLink}
							<a
								href={project.githubLink}
								target="_blank"
								rel="noopener noreferrer"
								class="text-sm text-gray-400 hover:text-gray-50 underline"
							>
								GitHub
							</a>
						{/if}
					</div>
				{/if}
				{#if project.description}
					<p class="text-base leading-relaxed text-gray-400 mb-3 whitespace-pre-line">{project.description}</p>
				{/if}
				{#if getSkills(project).length > 0}
					<div class="flex flex-wrap gap-2 mt-3">
						{#each getSkills(project) as skill}
							<span class="text-sm text-gray-50 font-medium tracking-wide">#{skill}</span>
						{/each}
					</div>
				{/if}
				
			</article>
		{/each}
	{:else}
		<article class="py-6 px-4">
			<p class="text-base leading-relaxed text-gray-400 mb-3">Projects section coming soon...</p>
		</article>
	{/if}
</section>

