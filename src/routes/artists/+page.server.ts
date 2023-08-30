import { loadArtistAlbums, loadArtists } from '$lib/server';
import { serializeNonPOJOs } from '$lib/tools';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals, url }) {
  let { pb, ...rest } = locals
  
  try {
    const artists = await loadArtists(url)
    return {
      ...rest,
      artists,
      error: null,
    };
  } catch (error) {
    return {
      ...rest,
      artists: null,
      error: serializeNonPOJOs(error)
    };
  }
}
