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
        throw new Error('Issue logging in');
    }

    if(response.data.errors) throw new Error(`Invalid credentials`);
    return response.data?.data?.login;
};