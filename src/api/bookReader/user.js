import bookReaderBase from "api/bookReader/base";


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
};