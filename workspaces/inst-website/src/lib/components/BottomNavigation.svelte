<script lang="ts">
	import { Home, User, Briefcase, GraduationCap, Folder } from '@lucide/svelte';

	interface Props {
		activeTab?: string;
	}

	let { activeTab = 'home' }: Props = $props();

	const tabs = [
		{ id: 'home', Icon: Home, label: 'Home' },
		{ id: 'experience', Icon: Briefcase, label: 'Experience' },
		{ id: 'education', Icon: GraduationCap, label: 'Education' },
		{ id: 'projects', Icon: Folder, label: 'Projects' },
		{ id: 'profile', Icon: User, label: 'Profile' }
	];

	function scrollToSection(sectionId: string) {
		const element = document.getElementById(sectionId);
		if (element) {
			// Get the scrollable container
			const scrollContainer = element.closest('.scrollable-content');
			if (scrollContainer) {
				const containerTop = scrollContainer.getBoundingClientRect().top;
				const elementTop = element.getBoundingClientRect().top;
				const offset = elementTop - containerTop - 20; // 20px offset from top
				scrollContainer.scrollBy({ top: offset, behavior: 'smooth' });
			} else {
				element.scrollIntoView({ behavior: 'smooth', block: 'start' });
			}
		}
	}
</script>

<nav class="bg-black z-10 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] h-[60px] w-full flex justify-center">
	<div class="max-w-[430px] mx-auto flex justify-around items-center h-full w-full">
		{#each tabs as tab}
			{@const Icon = tab.Icon}
			<button
				class="flex items-center justify-center bg-transparent border-none cursor-pointer text-gray-400 p-3 transition-colors duration-200 flex-1 min-h-11 [-webkit-tap-highlight-color:transparent] hover:text-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gray-50 focus-visible:outline-offset-2 focus-visible:rounded"
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
			</button>
		{/each}
	</div>
</nav>

