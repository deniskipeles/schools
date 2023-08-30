import { pb } from "$lib/pocketbase";
import { createArt, updateArt } from "$lib/server";
import { serializeNonPOJOs } from "$lib/tools";
import { json } from "@sveltejs/kit";

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, locals: { user } }) {
  let formData = await request.formData();
  try {
    // formData = {
    //   ...formData,
    //   company_id: company?.id,
    // };
    if (user) {
      formData.append('artist', user?.id);
    }

    let record = await createArt(formData);

    record = serializeNonPOJOs(record);
    return json({ success: true, data: { ...record } });
  } catch (error: any) {
    error = serializeNonPOJOs(error);
    return json({ success: false, error });
  }
}




/** @type {import('./$types').RequestHandler} */
export async function PUT({ request, locals: { user } }) {
  let formData = await request.formData();
  try {
    // formData = {
    //   ...formData,
    //   company_id: company?.id,
    // };
    if (user) {
      formData.append('artist', user?.id);
    }

    let record = await updateArt(formData?.get('id') as string, formData);

    record = serializeNonPOJOs(record);
    return json({ success: true, data: { ...record } });
  } catch (error: any) {
    error = serializeNonPOJOs(error);
    return json({ success: false, error });
  }
}
