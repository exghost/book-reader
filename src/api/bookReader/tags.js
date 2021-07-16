import bookReaderBase from 'api/bookReader/base';

export const fetchAllTags = async () => {
    let response;
    
    try {
        response = await bookReaderBase({
            method: 'post',
            data: {
                query: `
                    query {
                        allTags {
                            label
                        }
                    }
                `
            }
        })
    } catch (err) {
        throw new Error('Unable to fetch tags');
    }

    if(response.data?.error) throw new Error('Unable to fetch tags');

    return response.data?.data?.allTags;
}