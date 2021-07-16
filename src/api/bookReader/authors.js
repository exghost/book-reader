import bookReaderBase from 'api/bookReader/base';


export const fetchAllAuthors = async () => {
    let response;
    
    try {
        response = await bookReaderBase({
            method: 'post',
            data: {
                query: `
                    query {
                        allAuthors {
                            name
                        }
                    }
                `
            }
        })
    } catch (err) {
        throw new Error('Unable to fetch authors');
    }

    if(response.data?.error) throw new Error('Unable to fetch authors');

    return response.data?.data?.allAuthors;
}