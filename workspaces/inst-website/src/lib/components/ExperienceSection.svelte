<script lang="ts">
	interface Experience {
		id: string;
		company?: string | null;
		jobTitile?: string | null;
		description: string[];
		startDate?: any;
		endDate?: any;
		skills?: Array<{ name: string }> | null;
		companyLogo?: { url: string; id: string } | null;
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

	function formatDate(date: any): string {
		if (!date) return '';
		try {
			const d = new Date(date);
			return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
		} catch {
			return '';
		}
	}

	function getPeriod(experience: Experience): string {
		const start = formatDate(experience.startDate);
		const end = experience.endDate ? formatDate(experience.endDate) : 'Present';
		if (!start) return '';
		return `${start} - ${end}`;
	}
</script>

<section id="experience" class="w-full">
	<h2 class="text-lg font-semibold mb-2 text-gray-50 leading-snug px-4 pt-6">Experience</h2>
	{#each experiences as experience}
		{#if experience.jobTitile && experience.company}
			<article class="py-5 px-4 first:pt-6">
				<div class="flex items-center gap-3 mb-3">
					{#if experience.companyLogo?.url}
						<img
							src={experience.companyLogo.url}
							alt={experience.company || 'Company logo'}
							class="w-10 h-10 rounded-full object-cover shrink-0 border-2 border-gray-400"
						/>
					{/if}
					<h2 class="text-lg font-semibold text-gray-50 leading-snug">{experience.jobTitile} @ {experience.company}</h2>
				</div>
				{#if getBulletPoints(experience).length > 0}
					<ul class="list-none p-0 m-0 mb-3">
						{#each getBulletPoints(experience) as bullet}
							<li class="text-sm leading-relaxed text-gray-400 mb-2 pl-5 relative before:content-['•'] before:text-gray-50 before:font-semibold before:mr-2">{bullet}</li>
						{/each}
					</ul>
				{/if}
				{#if getSkills(experience).length > 0}
					<div class="flex flex-wrap gap-2 mt-3">
						{#each getSkills(experience) as skill}
							<span class="text-xs text-gray-50 font-medium tracking-wide">#{skill}</span>
						{/each}
					</div>
				{/if}
				{#if getPeriod(experience)}
					<div class="text-xs text-gray-400 mt-2">{getPeriod(experience)}</div>
				{/if}
			</article>
		{/if}
	{/each}
</section>

