import Axios from '../utils/Axios';

export const createTeam = (teamName, projectId) => {
    return new Promise((resolve, reject) => {
        Axios.post(`/teams/create/${projectId}`, {
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
