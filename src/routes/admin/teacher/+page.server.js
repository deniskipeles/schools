import { dev } from '$app/environment';
import { supabase } from '$lib/supabase';

export const csr = dev;

/** @type {import('./$types').PageServerLoad} */
export async function load(event) {

	let { data: questions, error } = await supabase
	.from('questions')
	.select('*')

	return {
		questions,
		error,
		ip: event.getClientAddress(),
		city: decodeURIComponent(/** @type {string} */ (event.request.headers.get('x-vercel-ip-city')))
	};
}
