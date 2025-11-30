import { getClient } from '@nevmstas/hygraph-client';
import { PUBLIC_HYGRAPH_URL, PUBLIC_HYGRAPH_TOKEN } from '$env/static/public';

if (!PUBLIC_HYGRAPH_URL) {
	throw new Error('PUBLIC_HYGRAPH_URL is not defined');
}

if (!PUBLIC_HYGRAPH_TOKEN) {
	throw new Error('PUBLIC_HYGRAPH_TOKEN is not defined');
}

export const gqlClient = getClient(PUBLIC_HYGRAPH_URL, PUBLIC_HYGRAPH_TOKEN);

