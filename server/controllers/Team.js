const ProjectModel = require('../models/projectModel');
const UserModel = require('../models/userModel');
const TeamModel = require('../models/teamModel');

exports.createTeam = async (req, res) => {
    const { projectId } = req.params;
    const user = req.user;
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "Fields cannot be empty!" });
    else {
        try {
            const createdTeam = await TeamModel.create({
                projectId: projectId,
                name: name,
                admins: [user.id]
            });

            await ProjectModel.updateOne(
                { _id: projectId },
                { $push: { teams: createdTeam.id } }
            )

            return res.status(200).json({
                message: 'Project created!',
                name: name,
                project_id: createdTeam.id
            });
        } catch (err) {
            console.log(err.message);
            return res.status(400).json({
                message: 'There was an error!'
            })
        }
    }
}

exports.deleteTeam = async (req, res) => {
    const { teamId } = req.params;
    try {
        const team = await TeamModel.findById(teamId).exec();
        const project = await ProjectModel.findById(team.projectId).exec();

        const deletedTeam = await TeamModel.deleteOne({ _id: teamId });
        if (deletedTeam.deletedCount !== 0) {
            await ProjectModel.updateOne({ _id: project.id }, { $pullAll: { teams: [teamId] } });
            return res.status(200).json({
                message: 'Deleted succesfully!'
            })
        } else {
            return res.status(400).json({
                message: 'Team could not be found!'
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: 'There was an error!'
        })
    }
}

exports.updateTeam = async (req, res) => {
    const { teamId } = req.params;
    const {
        name,
        description,
        image
    } = req.body;

    if (!name && !description && !image) return res.status(400).json({ message: "At least one of the fields should be filled!" });
    else {
        try {
            const team = await TeamModel.findById(teamId).exec();
            const query = { _id: teamId };
            const updateObject = {
                $set: {
                    name: name ? name : team.name,
                    description: description ? description : team.description,
                    teamImg: image ? image : team.teamImg
                }
            }

            TeamModel.findOneAndUpdate(query, updateObject, { new: true }, (err, doc) => {
                if (err) {
                    console.log(err);
                    return res.status(400).json({ message: 'There was an error!' })
                } else {
                    return res.status(200).json({
                        teamId: doc.id,
                        description: doc.description,
                        name: doc.name
                    })
                }
            })
        } catch (err) {
            console.log(error);
            return res.status(400).json({ message: 'There was an error!' })
        }
    }
}

exports.getTeamDetail = async (req, res) => {
    const { teamId } = req.params;
    try {
        const teamDetail = await TeamModel.findById(teamId).exec();
        return res.status(200).json(teamDetail);
    } catch (err) {
        console.log(err);
        return res.status(400).json({ message: 'There was an error!' })
    }
}