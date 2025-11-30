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

<nav class="bottom-nav">
	<div class="bottom-nav-content">
		{#each tabs as tab}
			{@const Icon = tab.Icon}
			<button
				class="nav-item"
				class:active={activeTab === tab.id}
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

<style>
	.bottom-nav {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: var(--bg-primary);
		z-index: 100;
		padding: 0.75rem 0;
		padding-bottom: max(0.75rem, env(safe-area-inset-bottom));
		height: 60px;
		min-height: calc(60px + env(safe-area-inset-bottom));
	}

	.bottom-nav-content {
		max-width: 430px;
		margin: 0 auto;
		display: flex;
		justify-content: space-around;
		align-items: center;
		height: 100%;
	}

	.nav-item {
		display: flex;
		align-items: center;
		justify-content: center;
		background: none;
		border: none;
		cursor: pointer;
		color: var(--text-secondary);
		padding: 0.75rem;
		transition: color 0.2s ease;
		flex: 1;
		min-height: 44px; /* Minimum touch target size for mobile */
		-webkit-tap-highlight-color: transparent;
	}

	.nav-item:hover {
		color: var(--text-primary);
	}

	.nav-item.active {
		color: var(--text-primary);
	}

	.nav-item:focus-visible {
		outline: 2px solid var(--text-primary);
		outline-offset: 2px;
		border-radius: 4px;
	}
</style>

