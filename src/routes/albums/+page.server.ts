import { loadFirtsArt, loadViewAlbums } from '$lib/server';
import { serializeNonPOJOs } from '$lib/tools';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals, url }) {
  let { pb, ...rest } = locals
  let photo_object: any = {
    "id": "RECORD_ID",
    "collectionId": "a2vuhm7lyjqretr",
    "collectionName": "arts",
    "created": "2022-01-01 01:00:00.123Z",
    "updated": "2022-01-01 23:59:59.456Z",
  }
  try {
    const albums = await loadViewAlbums(url)
    photo_object = await loadFirtsArt()
    return {
      ...rest,
      albums,
      photo_object,
      error: null,
    };
  } catch (error) {
    return {
      ...rest,
      albums: null,
      photo_object,
      error: serializeNonPOJOs(error)
    };
  }
}
