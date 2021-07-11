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

export const addBook = async ({title, isbn, publishYear, edition, authors, genres, tags, bookFile }) => {
    let formData = new FormData();

    console.log(authors);

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
    console.log(response);
    if(response.data.errors) throw new Error(response.data.errors.message);
    return response.data?.data?.booksByCurrentUser;
}