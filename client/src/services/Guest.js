import Axios from '../utils/Axios';

export const loginAsGuest = (payload) => {
    return new Promise((resolve, reject) => {
        Axios.post('/guest/signin', payload)
            .then((result) => {
                resolve(result.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export const signupAsGuest = (payload) => {
    return new Promise((resolve, reject) => {
        Axios.post('/guest/signup', payload)
            .then((result) => {
                resolve(result.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export const getGuest = () => {
    return new Promise((resolve, reject) => {
        Axios.get('/guest/profile-me')
            .then((result) => {
                resolve(result.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
};
