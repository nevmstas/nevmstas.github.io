<script lang="ts">
	import ContentBlock from './ContentBlock.svelte';

	interface Props {
		aboutMe?: string | null;
	}

	let { aboutMe }: Props = $props();
</script>

{#if aboutMe}
	<section id="about-me" class="w-full">
		<ContentBlock title="About Me" description={aboutMe} skills={[]} />
	</section>
{/if}


