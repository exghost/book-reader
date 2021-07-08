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
    console.log(email);
    console.log(password);
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
    //console.log(response);
    return [];
    return response.data?.data?.registerUser;
}