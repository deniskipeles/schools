import { loadArts, loadSingleArt } from '$lib/server';
import { serializeNonPOJOs } from '$lib/tools';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals,params }) {
  let { pb, ...rest } = locals
  try {
    const arts = await loadSingleArt(params?.art_id)
    return {
      ...rest,
      arts,
      error: null
    };
  } catch (error) {
    return {
      ...rest,
      arts: null,
      error: serializeNonPOJOs(error)
    };
  }
}
