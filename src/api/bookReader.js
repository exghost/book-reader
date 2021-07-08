import axios from 'axios';

export const bookReaderBase = axios.create({
    baseURL: 'http://localhost:3000',
});

export const login = (email, password ) => {
    return bookReaderBase({
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
};