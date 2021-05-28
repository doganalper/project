const TeamModel = require('../models/teamModel');
const StageModel = require('../models/stageModel');
const JobModel = require('../models/jobModel');

exports.createStage = async (req, res) => {
    const { teamId } = req.params;
    const { name } = req.body;
    try {
        const createdStage = await StageModel.create({
            name: name,
            teamId: teamId
        })
        await TeamModel.updateOne(
            { _id: teamId },
            { $push: { stages: createdStage.id } }
        )

        return res.status(200).json({
            message: 'Stage created!',
            stage: createdStage
        });
    } catch (err) {
        return res.status(400).json({
            message: 'There was an error'
        })
    }
};

exports.deleteStage = async (req, res) => {
    const { stageId } = req.params;
    try {
        const foundStage = await StageModel.findById(stageId);
        console.log(foundStage);
        const isDeleted = await StageModel.deleteOne({ _id: stageId });
        if (isDeleted.deletedCount !== 0) {
            for (const jobId of foundStage.jobs) {
                await JobModel.remove({ _id: jobId });
            }
            await TeamModel.updateOne({ _id: foundStage.teamId }, { $pullAll: { stages: [stageId] } });
            return res.status(200).json({
                message: 'Deleted successfully!',
                stageId: stageId
            })
        } else {
            return res.status(400).json({
                message: 'Stage could not be found!'
            })
        }
    } catch (err) {
        return res.status(400).json({
            message: 'There was an error'
        })
    }
}

exports.updateStageInfo = async (req, res) => {
    const { name, stageId } = req.body;
    if (!name || !stageId) return res.status(400).json({ message: 'Fields must be provided' })
    else {
        await StageModel.updateOne(
            { _id: stageId },
            { name: name }
        )
        return res.status(200).json({
            message: 'Updated Successfully',
            newName: name,
            stageId: stageId
        })
    }
}