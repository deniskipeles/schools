import { dev } from '$app/environment';
import { CONSTANTS } from '$lib/CONSTANTS';
import { supabase } from '$lib/supabase';
import { getServerSession } from '@supabase/auth-helpers-sveltekit'

export const csr = dev;

/** @type {import('./$types').PageServerLoad} */
export async function load(event) {

		
	let { data: teachers, error } = await supabase
		.from('teachers')
		.select(`
			id,
			name,
			description,
			photo,
			teacher_no,
			teacher_since,
			teacher_type,
			position,
			active,
			teacher_subjects(
				subjects(
					name,
					id,
					code
				)
			)
		`)
		.eq('school_id',CONSTANTS.school)


	return {
		teachers,
		error,
		session: await getServerSession(event),
	};
}
