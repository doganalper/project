import Axios from '../utils/Axios';

export const changeJobStage = (currStageId, newStageId, jobId) => {
    return new Promise((resolve, reject) => {
        Axios.patch(`/job/${currStageId}`, {
            newStageId,
            jobId
        })
            .then((result) => {
                resolve(result.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export const createNewJob = (stageId, newJobName) => {
    return new Promise((resolve, reject) => {
        Axios.post(`/job/${stageId}`, {
            name: newJobName
        })
            .then((result) => {
                resolve(result.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export const getJobInfo = (jobId) => {
    return new Promise((resolve, reject) => {
        Axios.get(`/job/get/${jobId}`)
            .then((result) => {
                resolve(result.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export const changeJobStatus = (jobId, status) => {
    return new Promise((resolve, reject) => {
        Axios.post(`/job/changeStatus`, {
            jobId: jobId,
            status: status
        })
            .then((result) => {
                resolve(result.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export const changeJobAssigned = (jobId, userId) => {
    return new Promise((resolve, reject) => {
        Axios.post(`/job/assign`, {
            userId: userId,
            jobId: jobId
        })
            .then((result) => {
                resolve(result.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export const setDueDate = (jobId, date) => {
    return new Promise((resolve, reject) => {
        Axios.post(`/job/setDueDate`, {
            date: date,
            jobId: jobId
        })
            .then((result) => {
                resolve(result.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export const changeJobInfo = (payload) => {
    return new Promise((resolve, reject) => {
        Axios.post(`/job/update`, payload)
            .then((result) => {
                resolve(result.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export const removeComment = (commentId) => {
    return new Promise((resolve, reject) => {
        Axios.delete(`/job/comment/${commentId}`)
            .then((result) => {
                resolve(result.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export const createComment = (jobId, content) => {
    return new Promise((resolve, reject) => {
        Axios.post('/job/comment/add', {
            jobId: jobId,
            content: content
        })
            .then((result) => {
                resolve(result.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export const createSubJob = (jobId, subJobName) => {
    return new Promise((resolve, reject) => {
        Axios.post('/job/subJob', {
            jobId: jobId,
            subJobName: subJobName
        })
            .then((result) => {
                resolve(result.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export const changeSubJobStatus = (subJobId, status) => {
    return new Promise((resolve, reject) => {
        Axios.patch('/job/subJob', {
            subJobId: subJobId,
            status: status
        })
            .then((result) => {
                resolve(result.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export const removeSubJob = (subJobId) => {
    return new Promise((resolve, reject) => {
        Axios.delete(`/job/subJob/${subJobId}`)
            .then((result) => {
                resolve(result.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export const removeJob = (stageId,jobId) => {
    return new Promise((resolve, reject) => {
        Axios.post(`/job/deleteJob/${stageId}`, {
            jobId: jobId
        })
            .then((result) => {
                resolve(result.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
}