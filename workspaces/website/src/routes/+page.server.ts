import { gqlClient } from '$lib/gql-client';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const [profileData, experiencesData, educationsData, projectsData, resumeData, publicationsData] =
		await Promise.all([
			gqlClient.Profile(),
			gqlClient.Experiences(),
			gqlClient.Education(),
			gqlClient.Project(),
			gqlClient.Resume(),
			gqlClient.Publications()
		]);

	return {
		profile: profileData.profiles[0] || {
			name: 'Your Name',
			avatar: null
		},
		experiences: experiencesData.experiences,
		educations: educationsData.educations,
		projects: projectsData.projects,
		resumeData,
		publications: publicationsData.publications
	};
};

