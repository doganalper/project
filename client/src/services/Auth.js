import Axios from '../utils/Axios';

export const signup = (payload) => {
    return new Promise((resolve, reject) => {
        Axios.post('/user/signup', payload)
            .then((result) => {
                resolve(result.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export const signin = (payload) => {
    return new Promise((resolve, reject) => {
        Axios.post('/user/signin', payload)
            .then((result) => {
                resolve(result.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
};
