const TeamModel = require('../models/teamModel');
const StageModel = require('../models/stageModel');

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
        const isDeleted = await StageModel.deleteOne({ _id:  stageId});
        if (isDeleted.deletedCount !== 0) {
            await TeamModel.updateOne({ _id: foundStage.teamId }, { $pullAll: { stages: [stageId] } });
            return res.status(200).json({
                message: 'Deleted successfully!',
                projectId: stageId
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