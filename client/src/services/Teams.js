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

export const getTeamDetail = (teamId) => {
    return new Promise((resolve, reject) => {
        Axios.get(`/teams/${teamId}`)
            .then((result) => {
                resolve(result.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export const changeTeamDetails = (teamId, detailObject) => {
    const detailPayload = {};
    if (detailObject.name) {
        detailPayload['name'] = detailObject.name;
    }
    if (detailObject.description) {
        detailPayload['description'] = detailObject.description;
    }
    return new Promise((resolve, reject) => {
        Axios.patch(`/teams/${teamId}`, detailPayload)
            .then((result) => {
                resolve(result.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export const addUserToTeam = (teamId, userId) => {
    return new Promise((resolve, reject) => {
        Axios.post(`/teams/${teamId}/add`, { userId: userId.userId })
            .then((result) => {
                resolve(result.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export const removeUsersFromTeam = (teamId, userId) => {
    return new Promise((resolve, reject) => {
        Axios.post(`/teams/${teamId}/remove`, { userId: userId.userId })
            .then((result) => {
                resolve(result.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
};
