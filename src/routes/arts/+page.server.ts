import { loadArtistAlbums, loadArts } from '$lib/server';
import { serializeNonPOJOs } from '$lib/tools';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals, url }) {
  let { pb, ...rest } = locals
  let list_albums: any = []
  try {
    const arts = await loadArts(url)
    list_albums = (await loadArtistAlbums(locals?.user))?.items?.map((obj) => {
      return { value: obj?.id, label: obj?.album_name };
    }) ?? [];
    return {
      ...rest,
      arts,
      error: null,
      list_albums
    };
  } catch (error) {
    return {
      ...rest,
      arts: null,
      list_albums,
      error: serializeNonPOJOs(error)
    };
  }
}
