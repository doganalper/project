export const saveAuthToken = (token) => {
    localStorage.setItem('authToken', token);
};

export const getAccessToken = () => {
    return localStorage.getItem('authToken');
};

export const removeToken = () => {
    localStorage.removeItem('authToken');
};
