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

export const getGuestsByArray = (guestsArray) => {
    return new Promise((resolve, reject) => {
        Axios.post('/guest/getByArray', {
            guestsArr: guestsArray
        })
            .then((result) => {
                resolve(result.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export const getRequestsByArray = (requestsArray) => {
    return new Promise((resolve, reject) => {
        Axios.post('/guest/getRequests', {
            requestIdArr: requestsArray
        })
            .then((result) => {
                resolve(result.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export const getRequestInfo = (requestId) => {
    return new Promise((resolve, reject) => {
        Axios.get('/guest/getRequest/' + requestId)
            .then((result) => {
                resolve(result.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export const changeRequestStatus = (reqId) => {
    return new Promise((resolve, reject) => {
        Axios.patch(`/guest/request/status`, {
            requestId: reqId
        })
            .then((result) => {
                resolve(result.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export const createRequestComment = (payload) => {
    return new Promise((resolve, reject) => {
        Axios.post(`/guest/request/comment/add`, payload)
            .then((result) => {
                resolve(result.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export const removeRequest = (requestId, projectId) => {
    return new Promise((resolve, reject) => {
        Axios.patch(`/guest/request/${projectId}`, {
            requestId
        })
            .then((result) => {
                resolve(result.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export const createRequest = (projectId, payload) => {
    return new Promise((resolve, reject) => {
        Axios.post(`/guest/request/${projectId}`, payload)
            .then((result) => {
                resolve(result.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
};
