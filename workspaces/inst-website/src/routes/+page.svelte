<script lang="ts">
	import ProfileHeader from '$lib/components/ProfileHeader.svelte';
	import BottomNavigation from '$lib/components/BottomNavigation.svelte';
	import ExperienceSection from '$lib/components/ExperienceSection.svelte';
	import EducationSection from '$lib/components/EducationSection.svelte';
	import ProjectsSection from '$lib/components/ProjectsSection.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const { profile, experiences, educations } = data;

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

	// Calculate total projects (using experiences as projects for now, or can be customized)
	const totalProjects = experiences.length;

	// Calculate total skills (unique skills across all experiences)
	const allSkills = new Set<string>();
	experiences.forEach((exp) => {
		exp.skills?.forEach((skill) => allSkills.add(skill.name));
	});
	const totalSkills = allSkills.size;

	const yearsOfExperience = calculateYearsOfExperience();
</script>

<div class="page-container">
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

	<main id="content" class="scrollable-content">
		<ExperienceSection {experiences} />
		<EducationSection {educations} />
		<ProjectsSection />
	</main>

	<BottomNavigation />
</div>

<style>
	.page-container {
		position: relative;
		width: 100%;
		height: 100vh;
		overflow: hidden;
		display: flex;
		flex-direction: column;
	}

	.scrollable-content {
		flex: 1;
		overflow-y: auto;
		overflow-x: hidden;
		-webkit-overflow-scrolling: touch;
		padding-top: calc(1rem + 80px + 1rem + max(1rem, env(safe-area-inset-top))); /* Space for fixed header: padding-top + avatar + padding-bottom + safe area */
		padding-bottom: 60px; /* Space for fixed bottom nav */
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		scroll-behavior: smooth;
		min-height: 0; /* Important for flex scrolling */
	}

	.scrollable-content > :global(*) {
		width: 100%;
		max-width: 430px;
	}

	/* Hide scrollbar but keep functionality */
	.scrollable-content::-webkit-scrollbar {
		width: 0;
		background: transparent;
	}
</style>
