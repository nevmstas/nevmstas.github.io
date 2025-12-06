<script lang="ts">
	import { FileUser } from '@lucide/svelte';
	import { openResumePdf } from '$lib/utils/open-resume-pdf';
	import type { ResumeQuery } from '@nevmstas/hygraph-client';

	interface Props {
		resumeData: ResumeQuery;
		download?: boolean;
	}

	let { resumeData, download = false }: Props = $props();

	async function handleClick(e: MouseEvent) {
		e.stopPropagation();
		e.preventDefault();
		await openResumePdf(resumeData, download);
	}
</script>

<button
	type="button"
	onclick={handleClick}
	class="flex items-center justify-center text-gray-400 transition-colors duration-200 no-underline hover:text-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gray-50 focus-visible:outline-offset-2 focus-visible:rounded cursor-pointer"
	aria-label="Resume"
>
	<FileUser size={20} />
</button>

