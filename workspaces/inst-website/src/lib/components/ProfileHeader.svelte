<script lang="ts">
	import { Linkedin, Github } from '@lucide/svelte';

	interface Props {
		name: string;
		avatarUrl?: string;
		yearsOfExperience: number;
		stat2: number;
		stat2Label: string;
		stat3: number;
		stat3Label: string;
		linkedIn?: string | null;
		github?: string | null;
	}

	let { name, avatarUrl, yearsOfExperience, stat2, stat2Label, stat3, stat3Label, linkedIn, github }: Props = $props();
</script>

<header class="profile-header">
	<div class="profile-header-content">
		<div class="profile-avatar">
			{#if avatarUrl}
				<img src={avatarUrl} alt={name} />
			{:else}
				<div class="avatar-placeholder"></div>
			{/if}
		</div>
		<div class="profile-info">
			<h1 class="profile-name">{name}</h1>
			<div class="profile-stats">
				<div class="stat-item">
					<div class="stat-value">{yearsOfExperience}</div>
					<div class="stat-label">Years</div>
				</div>
				<div class="stat-item">
					<div class="stat-value">{stat2}</div>
					<div class="stat-label">{stat2Label}</div>
				</div>
				<div class="stat-item">
					<div class="stat-value">{stat3}</div>
					<div class="stat-label">{stat3Label}</div>
				</div>
			</div>
			<div class="profile-links">
				{#if linkedIn}
					<a href={linkedIn} target="_blank" rel="noopener noreferrer" class="link-item" aria-label="LinkedIn">
						<Linkedin size={20} />
					</a>
				{/if}
				{#if github}
					<a href={github} target="_blank" rel="noopener noreferrer" class="link-item" aria-label="GitHub">
						<Github size={20} />
					</a>
				{/if}
			</div>
		</div>
	</div>
</header>

<style>
	.profile-header {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		background-color: var(--bg-primary);
		z-index: 100;
		padding: 1rem;
		padding-top: max(1rem, env(safe-area-inset-top));
	}

	.profile-header-content {
		max-width: 430px;
		margin: 0 auto;
		display: flex;
		gap: 1rem;
		align-items: flex-start;
	}

	.profile-avatar {
		width: 80px;
		height: 80px;
		flex-shrink: 0;
		border-radius: 50%;
		overflow: hidden;
		background-color: var(--bg-secondary);
	}

	.profile-avatar img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.avatar-placeholder {
		width: 100%;
		height: 100%;
		background-color: var(--bg-secondary);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.avatar-placeholder::before {
		content: '';
		width: 40%;
		height: 40%;
		border-radius: 50%;
		background-color: var(--text-secondary);
		opacity: 0.3;
	}

	.profile-info {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		min-width: 0;
	}

	.profile-name {
		font-size: 1.125rem;
		font-weight: 600;
		margin: 0;
		color: var(--text-primary);
		line-height: 1.3;
	}

	.profile-stats {
		display: flex;
		gap: 1rem;
	}

	.stat-item {
		display: flex;
		flex-direction: column;
		gap: 0.125rem;
	}

	.stat-value {
		font-size: 1.25rem;
		font-weight: 700;
		color: var(--text-primary);
		line-height: 1.2;
	}

	.stat-label {
		font-size: 0.6875rem;
		color: var(--text-secondary);
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	.profile-links {
		display: flex;
		gap: 0.75rem;
		align-items: center;
	}

	.link-item {
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--text-secondary);
		transition: color 0.2s ease;
		text-decoration: none;
	}

	.link-item:hover {
		color: var(--text-primary);
	}

	.link-item:focus-visible {
		outline: 2px solid var(--text-primary);
		outline-offset: 2px;
		border-radius: 4px;
	}
</style>

