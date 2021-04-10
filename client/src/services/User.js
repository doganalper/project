import Axios from '../utils/Axios';

export const fetchUserData = () => {
    return new Promise((resolve, reject) => {
        Axios.get('/user/profile-me')
            .then((result) => {
                resolve(result.data)
            }).catch((err) => {
                reject(err)
            });
    });
}