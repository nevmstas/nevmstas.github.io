<script lang="ts">
	import { House, User, Briefcase, GraduationCap, Folder, Github, HandMetal, Brain } from '@lucide/svelte';

	interface Props {
		activeTab?: string;
	}

	let { activeTab = 'home' }: Props = $props();

	const tabs = [
		// { id: 'home', Icon: House, label: 'Home' },
		{ id: 'profile', Icon: HandMetal, label: 'About me' },
		{ id: 'projects', Icon: Github, label: 'Projects' },
		{ id: 'experience', Icon: Brain, label: 'Experience' },
		{ id: 'education', Icon: GraduationCap, label: 'Education' },
	];

	function scrollToSection(sectionId: string) {
		const element = document.getElementById(sectionId);
		const content = document.getElementById('content');
		if (element && content) {
			// Get the scrollable container (content element)
			const containerTop = content.getBoundingClientRect().top;
			const elementTop = element.getBoundingClientRect().top;
			const offset = elementTop - containerTop - 20; // 20px offset from top
			content.scrollBy({ top: offset, behavior: 'smooth' });
		}
	}
</script>

<nav class="fixed bottom-0 left-0 right-0 bg-black z-10 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] h-[60px] w-full flex justify-center fade-in-delay-4">
	<div class="max-w-[440px] mx-auto flex justify-around items-center h-full w-full">
		{#each tabs as tab}
			{@const Icon = tab.Icon}
			<button
				class="relative flex items-center justify-center bg-transparent border-none cursor-pointer text-gray-400 p-3 transition-colors duration-200 flex-1 min-h-11 [-webkit-tap-highlight-color:transparent] hover:text-gray-50 focus-visible:outline focus-visible:outline-gray-50 focus-visible:outline-offset-2 focus-visible:rounded group"
				class:text-gray-50={activeTab === tab.id}
				onclick={() => {
					if (tab.id === 'home' || tab.id === 'profile') {
						const content = document.getElementById('content');
						if (content) {
							content.scrollTo({ top: 0, behavior: 'smooth' });
						}
					} else {
						scrollToSection(tab.id);
					}
				}}
				aria-label={tab.label}
			>
				<Icon size={24} />
				<span class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-20">
					{tab.label}
				</span>
			</button>
		{/each}
	</div>
</nav>

