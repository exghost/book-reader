import bookReaderBase from 'api/bookReader/base';

export const fetchAllGenres = async () => {
    let response;
    
    try {
        response = await bookReaderBase({
            method: 'post',
            data: {
                query: `
                    query {
                        allGenres {
                            label
                        }
                    }
                `
            }
        })
    } catch (err) {
        throw new Error('Unable to fetch genres');
    }

    if(response.data?.error) throw new Error('Unable to fetch genres');

    return response.data?.data?.allGenres;
}