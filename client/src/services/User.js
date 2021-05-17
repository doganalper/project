import Axios from '../utils/Axios';

export const fetchUserData = () => {
    return new Promise((resolve, reject) => {
        Axios.get('/user/profile-me')
            .then((result) => {
                resolve(result.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export const changeUserInfo = (payload) => {
    return new Promise((resolve, reject) => {
        Axios.post(`/user/update-me`, payload)
            .then((result) => {
                resolve(result.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export const changePassword = (payload) => {
    return new Promise((resolve, reject) => {
        Axios.post('/user/change-password', payload)
            .then((result) => {
                resolve(result.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
};
