import { gqlClient } from '$lib/gql-client';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const [profileData, experiencesData, educationsData] = await Promise.all([
		gqlClient.Profile(),
		gqlClient.Experiences(),
		gqlClient.Education()
	]);

	return {
		profile: profileData.profiles[0] || {
			name: 'Your Name',
			avatar: null
		},
		experiences: experiencesData.experiences,
		educations: educationsData.educations
	};
};

