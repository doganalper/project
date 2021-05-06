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
};

exports.assignUserToJob = async (req,res) => {
    const {userId, jobId} = req.body;
    if (!userId || !jobId) return res.status(400).json({message: 'Fields cannot be empty!'})
    else {
        await JobModel.updateOne({_id: jobId}, {
            assignedId: userId
        });
        return res.status(200).json({
            message: 'User Assigned',
            userId: userId
        })
    }
};

exports.changeJobStatus = async (req, res) => {
    const {jobId, status} = req.body;
    if (!jobId) return res.status(400).json({message: 'Fields cannot be empty!'})
    else {
        await JobModel.updateOne({_id: jobId}, {
            isFinished: status
        })
        return res.status(200).json({
            message: 'Status changed',
            isJobFinished: status
        })
    }
};

exports.updateJobInfo = async (req, res) => {
    const {
        name,
        description,
        jobId
    } = req.body;

    if (!name && !description) return res.status(400).json({message: 'Please provide at least one field!'})
    else {
        const job = await JobModel.findById(jobId).exec();
        const query = {_id: jobId};
        const updateObject = {
            $set: {
                name: name ? name : job.name,
                description: description ? description : job.description
            }
        }

        JobModel.findOneAndUpdate(query, updateObject, {new: true}, (err, doc) => {
            if (err) {
                return res.status(400).json({message: 'There was an error!'})
            } else {
                console.log(doc);
                return res.status(200).json({
                    jobId: jobId,
                    description: doc.description,
                    name: doc.name
                })
            }
        })
    }
};

exports.setDueDate = async (req,res) => {
    const {date, jobId} = req.body;
    if (!date || !jobId) return res.status(400).json({message: 'Fields must not be empty!'})
    else {
        await JobModel.updateOne({_id: jobId}, {
            dueDate: date
        })
        return res.status(200).json({
            newDate: date,
            jobId: jobId
        })
    }
};