const StageModel = require('../models/stageModel');
const JobModel = require('../models/jobModel');
const SubJobModel = require('../models/subJobModel');
const CommentModel = require('../models/commentModel');
const UserModel = require('../models/userModel');

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
    if (!jobId) return res.status(400).json({message: 'Fields cannot be empty!'})
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
            isFinished: status
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

exports.addSubJob = async (req,res) => {
    const {jobId, subJobName} = req.body;
    if (!jobId || !subJobName) return res.status(400).json({message: 'Fields must not be empty!'})
    else {
        const createdSubJob = await SubJobModel.create({
            jobId: jobId,
            name: subJobName
        });
        await JobModel.updateOne({_id: jobId}, {
            $push: {subWorks: createdSubJob.id}
        })
        return res.status(200).json(createdSubJob);
    }
}

exports.removeSubJob = async (req, res) => {
    const {subJobId} = req.params;
    try {
        const deletedSubJob = await SubJobModel.findById(subJobId).exec();
        const isDeleted = await SubJobModel.deleteOne({_id: subJobId});

        if (isDeleted.deletedCount !== 0) {
            await JobModel.updateOne({_id: deletedSubJob.jobId}, {
                $pullAll: {subWorks: [subJobId]}
            })
            return res.status(200).json({
                message: 'Job deleted',
                subJobId: subJobId
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

exports.changeSubJobStatus = async (req,res) => {
    const {subJobId, status} = req.body;
    if (!subJobId) return res.status(400).json({message: 'Fields cannot be empty!'})
    else {
        await SubJobModel.updateOne({_id: subJobId}, {
            isFinished: status
        })
        return res.status(200).json({
            message: 'Status changed',
            isJobFinished: status
        })
    }
};

exports.addComment = async (req, res) => {
    const {jobId, content} = req.body;
    const user = req.user
    if (!jobId || !content || content.trim().length === 0) return res.status(400).json({message: 'Fields must not be empty!'});
    else {
        const createdComment = await CommentModel.create({
            userId: user.id,
            jobId: jobId,
            content: content
        })

        await JobModel.updateOne({_id: jobId}, {
            $push: {comments: createdComment.id}
        })

        return res.status(200).json(createdComment);
    }
};

exports.removeComment = async (req ,res) => {
    const {commentId} = req.params;
    const user = req.user;
    try {
        const deletedComment = await CommentModel.findById(commentId).exec();
        if (deletedComment.userId !== user.id) return res.status(401).json({message: 'You can only delete your own comments'});
        else {
            const isDeleted = await CommentModel.deleteOne({_id: commentId});

            if (isDeleted.deletedCount !== 0) {
                await JobModel.updateOne({_id: deletedComment.jobId}, {
                    $pullAll: {comments: [commentId]}
                })
                return res.status(200).json({
                    message: 'Comment deleted',
                    commentId: commentId
                })
            } else {
                return res.status(400).json({
                    message: 'There was an error'
                })
            }
        }
    } catch (err) {
        console.log(err);
        return res.status(400).json({
            message: 'There was an error'
        })
    }
};

exports.getJobInfo = async (req, res) => {
    const {jobId} = req.params;
    const user = req.user;
    try {
        let jobInfo = await JobModel.findById(jobId).exec();
        let userInfo = null;
        if (jobInfo.assignedId !== null) {
            userInfo = await UserModel.findById(jobInfo.assignedId);
        }

        const commentInfos = [];
        for (const commentId of jobInfo.comments) {
            await CommentModel.findOne({_id: commentId}, async (err, doc) => {
                const commentInfo = await doc.toObject();
                commentInfo.isUser = (doc.userId === user.id);
                commentInfos.push(commentInfo);
            })
        }
        return res.status(200).json({
            ...{...jobInfo._doc},
            assignedUser: userInfo,
            comments: commentInfos
        })
    } catch (err) {
        console.log(err);
        return res.status(400).json({message: 'Something went wrong'})
    }
}
