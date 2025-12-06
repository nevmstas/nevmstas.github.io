<script lang="ts">
	import ProfileHeader from '$lib/components/ProfileHeader.svelte';
	import BottomNavigation from '$lib/components/BottomNavigation.svelte';
	import ExperienceSection from '$lib/components/ExperienceSection.svelte';
	import EducationSection from '$lib/components/EducationSection.svelte';
	import ProjectsSection from '$lib/components/ProjectsSection.svelte';
	import AboutMeSection from '$lib/components/AboutMeSection.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const { profile, experiences, educations, projects, resumeData } = data;


</script>

<div class="relative w-full h-screen overflow-hidden flex flex-col">
	<ProfileHeader
		name={profile.name || 'Your Name'}
		avatarUrl={profile.avatar?.url || undefined}
		yearsOfExperience={6}
		secondStat={{ value: '100k', label: 'impact' }}
		thirdStat={{ value: '1000k', label: 'features' }}
		linkedIn={profile.linkedIn}
		github={profile.github}
		resumeData={resumeData}
	/>

	<main
		id="content"
		class="flex-1 overflow-y-auto overflow-x-hidden [scrollbar-width:none] [-webkit-scrollbar-width:none] [-webkit-overflow-scrolling:touch] scroll-smooth"
	>
		<div class="flex flex-col justify-start items-center *:max-w-[430px]">
			<AboutMeSection aboutMe={profile.aboutMe} />
			<ProjectsSection projects={projects || []} />
			<ExperienceSection {experiences} />
			<EducationSection {educations} />
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
