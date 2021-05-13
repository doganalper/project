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
}