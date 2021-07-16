import bookReaderBase from 'api/bookReader/base';


export const authorCount = async () => {
    let response;
    
    try {
        response = await bookReaderBase({
            method: 'post',
            data: {
                query: `
                    query {
                        authorCount
                    }
                `
            }
        })
    } catch (err) {
        throw new Error('Unable to get author count');
    }

    if(response.data?.error) throw new Error('Unable to get author count');

    return response.data?.data?.authorCount;
}


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