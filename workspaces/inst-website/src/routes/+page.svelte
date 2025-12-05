<script lang="ts">
	import ProfileHeader from '$lib/components/ProfileHeader.svelte';
	import BottomNavigation from '$lib/components/BottomNavigation.svelte';
	import ExperienceSection from '$lib/components/ExperienceSection.svelte';
	import EducationSection from '$lib/components/EducationSection.svelte';
	import ProjectsSection from '$lib/components/ProjectsSection.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const { profile, experiences, educations, projects } = data;

	// Calculate years of experience from earliest start date
	function calculateYearsOfExperience(): number {
		if (experiences.length === 0) return 0;
		const validDates = experiences
			.filter((exp) => exp.startDate)
			.map((exp) => new Date(exp.startDate).getTime())
			.filter((time) => !isNaN(time));
		
		if (validDates.length === 0) return 0;
		
		const earliestDate = new Date(Math.min(...validDates));
		const years = (new Date().getTime() - earliestDate.getTime()) / (1000 * 60 * 60 * 24 * 365);
		return Math.floor(years);
	}

	// Calculate total projects
	const totalProjects = projects?.length || 0;

	// Calculate total skills (unique skills across all experiences)
	const allSkills = new Set<string>();
	experiences.forEach((exp) => {
		exp.skills?.forEach((skill) => allSkills.add(skill.name));
	});
	const totalSkills = allSkills.size;

	const yearsOfExperience = calculateYearsOfExperience();
</script>

<div class="relative w-full h-screen overflow-hidden flex flex-col">
	<ProfileHeader
		name={profile.name || 'Your Name'}
		avatarUrl={profile.avatar?.url || undefined}
		yearsOfExperience={yearsOfExperience}
		stat2={totalProjects}
		stat2Label="Projects"
		stat3={totalSkills}
		stat3Label="Skills"
		linkedIn={profile.linkedIn}
		github={profile.github}
	/>

	<main
		id="content"
		class="flex-1 overflow-y-auto overflow-x-hidden [scrollbar-width:none] [-webkit-scrollbar-width:none] [-webkit-overflow-scrolling:touch] [scroll-behavior:smooth]"
	>
		<div class="flex flex-col justify-start items-center [&>*]:w-full [&>*]:max-w-[430px] pt-[160px] pb-[80px]">
			<ExperienceSection {experiences} />
			<EducationSection {educations} />
			<ProjectsSection projects={projects || []} />
		</div>
	</main>

	<BottomNavigation />
</div>

<style>
	#content::-webkit-scrollbar {
		width: 0;
		background: transparent;
	}
</style>
