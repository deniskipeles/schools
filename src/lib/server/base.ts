// import { PUBLIC_KEY } from '$env/static/public';
import { pb } from '$lib/pocketbase';
import { serializeNonPOJOs } from '$lib/tools';

export async function loadCompany() {
    let record = await pb.collection('companies').getFirstListItem('name!=""', {
        // expand: 'relField1,relField2.subRelField',
    });
    record = serializeNonPOJOs(record);
    return record;
}




