import { dev } from '$app/environment';
import { CONSTANTS } from '$lib/CONSTANTS';
import { supabase } from '$lib/supabase';
import { getServerSession } from '@supabase/auth-helpers-sveltekit'

export const csr = dev;

/** @type {import('./$types').PageServerLoad} */
export async function load(event) {

	let { data: school, error } = await supabase
		.from('schools')
		.select("*")
		// Filters
		.eq('id', CONSTANTS.school)
		.limit(1)
		.single()

	return {
		school,
		error,
		session: await getServerSession(event),
		// ip: event.getClientAddress(),
		// city: decodeURIComponent(/** @type {string} */ (event.request.headers.get('x-vercel-ip-city')))
	};
}
