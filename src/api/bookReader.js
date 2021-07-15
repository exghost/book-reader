import axios from 'axios';

export const bookReaderBase = axios.create({
    baseURL: 'http://localhost:4056/graphql',
});

export const login = async (email, password ) => {
    let response;
    try {
        response = await bookReaderBase({
            method: 'post',
            data: {
                query: `
                mutation {
                    login(email: "${email}", password: "${password}") {
                        id
                        email
                    }
                }
                `
            },
            withCredentials: true
        });
    } catch {
        throw new Error('Unable to login');
    }

    if(response.data.errors) throw new Error(`Invalid credentials`);
    return response.data?.data?.login;
};

export const invalidateTokens = async () => {
    let response;
    try {
        response = await bookReaderBase({
            method: 'post',
            data: {
                query: `
                mutation {
                    invalidateTokens
                }
                `
            },
            withCredentials: true
        });
    } catch {
        throw new Error('Unable to invalidate tokens');
    }

    if(response.data.errors) {
        throw new Error(`Unable to invalidate tokens`);
    }
    return response.data?.data?.login;
}

export const registerUser = async (email, password) => {
    let response;
    try {
        response = await bookReaderBase({
            method: 'post',
            data: {
                query: `
                    mutation {
                        registerUser(email: "${email}", password: "${password}") {
                            id
                            email
                        }
                    }
                `
            },
            withCredentials: true
        });
    } catch(err) {
        throw new Error('Unable to complete account registration');
    }

    if(response.data.errors) throw new Error('An account with that email already exists');
    return response.data?.data?.registerUser;
};

export const getCurrentUser = async () => {
    let response;
    try {
        response = await bookReaderBase({
            method: 'post',
            data: {
                query: `
                    query {
                        me {
                            id
                            email
                        }
                    }
                `
            },
            withCredentials: true
        })
    } catch(err) {
        throw new Error('Unable to connect');
    }

    if(response.data?.errors) throw new Error(response.data.errors[0].message);
    
    return response.data?.data?.me;
}

export const addBook = async ({title, isbn, publishYear, edition, authors, genres, tags, bookFile }) => {
    let formData = new FormData();

    const query = `
    mutation ($data: CreateBookInput!, $file: Upload!) { 
        addBook(data: $data, file: $file) { 
            id 
            title 
            isbn
            edition 
            publishYear
            filename
            authors {
                name
            }
            tags {
                label
            }
            genres {
                label
            }
        } 
    } 
    `;

    const variables = {
        data: {
            title,
            isbn,
            publishYear: Number(publishYear),
            edition: Number(edition),
            authors,
            genres,
            tags
        },
        file: null
    }

    const operations = JSON.stringify({ query, variables });
    const map = JSON.stringify({ "0": ["variables.file"] });

    formData.append("operations", operations);
    formData.append("map", map);
    formData.append("0", bookFile);

    let response = await bookReaderBase({
        method: "POST",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true
    });

    console.log(response);
    return response.data?.data?.addBook;
};

export const fetchBook = async (id) => {
    let response;
    try {
        response = await bookReaderBase({
            method: 'post',
            data: {
                query: `
                    query {
                        book(id: ${id}) {
                            id
                            title
                            isbn
                            edition
                            publishYear
                            authors {
                                name
                            }
                            genres {
                                label
                            }
                            tags {
                                label
                            }
                        }
                    }
                `
            },
            withCredentials: true
        });
    } catch(err) {
        throw new Error('Unable to retrieve book');
    }

    if(response.data.errors) throw new Error(response.data.errors[0].message);
    return response.data?.data?.book;
}

export const fetchBooksByCurrentUser = async () => {    
    let response;
    try {
        response = await bookReaderBase({
            method: 'post',
            data: {
                query: `
                    query {
                        booksByCurrentUser {
                            id
                            title
                            isbn
                            edition
                            publishYear
                            filename
                            authors {
                                name
                            }
                            genres {
                                label
                            }
                            tags {
                                label
                            }
                        }
                    }
                `
            },
            withCredentials: true
        });
    } catch(err) {
        throw new Error('Unable to fetch books');
    }

    if(response.data.errors) throw new Error(response.data.errors[0].message);
    return response.data?.data?.booksByCurrentUser;
}

export const updateBook = async (bookData) => {
    const {
        id,
        title,
        isbn,
        edition,
        publishYear,
        authors,
        genres,
        tags,
    } = bookData;

    let response;

    let variables = {
        data: {
            id: Number(id),
            title,
            isbn,
            edition: Number(edition),
            publishYear: Number(publishYear),
            authors,
            genres,
            tags
        }
    };
    console.log(variables);
    try {
        response  = await bookReaderBase({
            method: 'post',
            data: {
                query: `
                mutation($data: EditBookInput!) {
                    updateBook(data: $data) {
                        id
                        title
                        isbn
                        edition
                        publishYear
                        filename
                        authors {
                            name
                        }
                        genres {
                            label
                        }
                        tags {
                            label
                        }
                    }
                }
                `,
                variables: JSON.stringify(variables)
            },
            withCredentials: true
        });
    } catch(err) {
        throw new Error('Unable to update book');
    }

    if(response.data.errors) throw new Error(response.data.errors[0].message);
    return response.data?.data?.updateBook;
}