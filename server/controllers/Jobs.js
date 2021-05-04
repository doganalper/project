const StageModel = require('../models/stageModel');
const JobModel = require('../models/jobModel');

exports.createJob = async (req, res) => {
    const {stageId} = req.params;
    const {name} = req.body;

    try {
        const createdJob = await JobModel.create({
            stageId: stageId,
            name: name
        })

        await StageModel.updateOne({_id: stageId}, {
            $push: {jobs: createdJob.id}
        })

        return res.status(200).json({
            message: 'Job created',
            job: createdJob
        })
    } catch (err) {
        return res.status(400).json({
            message: 'There was an error'
        })
    }
};

exports.removeJob = async (req, res) => {
    const {stageId} = req.params;
    const {jobId} = req.body;

    try {
        const isDeleted = await JobModel.deleteOne({_id: jobId});

        if (isDeleted.deletedCount !== 0) {
            await StageModel.updateOne({_id: stageId}, {
                $pullAll: {jobs: [jobId]}
            })
            return res.status(200).json({
                message: 'Job deleted',
                jobId: jobId
            })
        } else {
            return res.status(400).json({
                message: 'There was an error'
            })
        }
    } catch (err) {
        return res.status(400).json({
            message: 'There was an error'
        })
    }
};

exports.changeJobStage = async (req, res) => {
    const {stageId} = req.params;
    const {newStageId, jobId} = req.body;

    try {
        await StageModel.updateOne(
            {_id: stageId},
            {$pullAll: {jobs: [jobId]}}
        )
        await StageModel.updateOne(
            {_id: newStageId},
            {$push: {jobs: jobId}}
        )
        await JobModel.updateOne(
            {_id: jobId},
            {stageId: newStageId}
        )
        return res.status(200).json({
            message: 'Job moved to another stage',
            newStage: newStageId,
            oldStage: stageId,
            job: jobId
        })
    } catch (err) {
        return res.status(400).json({
            message: 'There was an error'
        })
    }
}