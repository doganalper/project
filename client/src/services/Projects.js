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

export const addUserToProject = (projectId, userEmail) => {
    return new Promise((resolve, reject) => {
        Axios.post(`/projects/user/${projectId}`, {
            userEmail: userEmail
        })
            .then((result) => {
                resolve(result.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export const removeUserFromProject = (projectId, userId) => {
    return new Promise((resolve, reject) => {
        Axios.patch(`/projects/user/${projectId}`, {
            userId: userId
        })
            .then((result) => {
                resolve(result.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export const changeProjectDetail = (projectId, newDetails) => {
    const detailPayload = {};
    if (newDetails.name) {
        detailPayload['name'] = newDetails.name;
    }
    if (newDetails.description) {
        detailPayload['description'] = newDetails.description;
    }
    return new Promise((resolve, reject) => {
        Axios.patch(`/projects/update/${projectId}`, detailPayload)
            .then((result) => {
                resolve(result.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export const deleteProject = (projectId) => {
    return new Promise((resolve, reject) => {
        Axios.delete(`/projects/delete/${projectId}`)
            .then((result) => {
                resolve(result);
            })
            .catch((err) => {
                reject(err);
            });
    });
};
