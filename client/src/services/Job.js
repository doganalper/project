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
