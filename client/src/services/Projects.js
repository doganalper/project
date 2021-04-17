import Axios from '../utils/Axios';

export const createProject = (projectName) => {
    return new Promise((resolve, reject) => {
        Axios.post('/projects/create', {
            name: projectName
        })
            .then((result) => {
                resolve(result.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export const fetchProjectDetail = (projectId) => {
    return new Promise((resolve, reject) => {
        Axios.get(`/projects/${projectId}`)
            .then((result) => {
                resolve(result.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
};
