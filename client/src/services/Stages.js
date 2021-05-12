import Axios from '../utils/Axios';

export const removeStage = (stageId) => {
    return new Promise((resolve, reject) => {
        Axios.delete(`/stage/${stageId}`)
            .then((result) => {
                resolve(result.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export const createStage = (teamId, teamName) => {
    return new Promise((resolve, reject) => {
        Axios.post(`/stage/${teamId}/create`, {
            name: teamName
        })
            .then((result) => {
                resolve(result.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export const changeStageName = (payload) => {
    return new Promise((resolve, reject) => {
        Axios.post(`/stage/update`, payload)
            .then((result) => {
                resolve(result.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
};
