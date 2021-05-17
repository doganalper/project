const ProjectModel = require('../models/projectModel');
const UserModel = require('../models/userModel');
const TeamModel = require('../models/teamModel');
const StageModel = require('../models/stageModel');
const JobModel = require('../models/jobModel');

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
        description
    } = req.body;

    if (!name && !description) return res.status(400).json({ message: "At least one of the fields should be filled!" });
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

exports.changeTeamImage = async (req, res) => {
    const {teamId} = req.params;
    console.log(req.file);
    try {
        await TeamModel.updateOne({_id: teamId}, {
            teamImg: req.file.filename
        })
        res.status(200).json({message:'Picture changed'});
    } catch (err) {
        console.log(err);
        res.status(400).json({
            message: 'something went wrong'
        })
    }
}

exports.getTeamDetail = async (req, res) => {
    const { teamId } = req.params;
    try {
        const teamDetail = await TeamModel.findById(teamId).exec();
        let stages = [];
        let members = [];
        if (teamDetail.stages.length !== 0) {
            for (const stageId of teamDetail.stages) {
                const stage = await StageModel.find({ _id: '' + stageId }).exec();
                const jobs = [];
                for (const jobId of stage[0].jobs) {
                    const job = await JobModel.find({_id: ''+ jobId}).exec();
                    jobs.push(...job)
                }
                for (const memberId of teamDetail.members) {
                    const user = await UserModel.findById(memberId).exec();
                    members.push(user);
                };
                stages.push({
                    stageInfo: stage[0],
                    jobs: [...jobs],
                })
            }
        }
        const returnObject = {
            teamDetail: teamDetail,
            teamMembers: [...members],
            stages
        };
        return res.status(200).json(returnObject);
    } catch (err) {
        console.log(err);
        return res.status(400).json({ message: 'There was an error!' })
    }
}

exports.addUserToTeam = async (req, res) => {
    const { teamId } = req.params;
    const { userId } = req.body;

    if (!userId) return res.status(400).json({ message: 'Fields cannot be empty!' })
    try {
        const projectDetail = await ProjectModel.findOne({ teams: { $all: [teamId] } });
        if (!projectDetail.members.includes(userId) && !projectDetail.admins.includes(userId)) {
            return res.status(401).json({ message: 'You cannot do that!' })
        } else {
            const user = await UserModel.findById(userId);
            await TeamModel.updateOne(
                { _id: teamId },
                { $push: { members: user._id } }
            )
            const team = await TeamModel.findById(teamId);
            const teamMemberInfos = [];
            for (const memberId of team.members) {
                const member = await UserModel.findById(memberId).exec();
                teamMemberInfos.push(member);
            }
            const returnObject = {
                team: team,
                members: teamMemberInfos
            }
            return res.status(200).json(returnObject);
        }
    } catch (err) {
        console.log(err);
        return res.status(400).json({ message: 'There was an error!' })
    }
}

exports.removeUserFromTeam = async (req,res) => {
    const { teamId } = req.params;
    const { userId } = req.body;
    
    if (!userId) return res.status(400).json({ message: 'Fields cannot be empty!' })
    else {
        await TeamModel.updateOne({ _id: teamId }, { $pullAll: { members: [userId] } });
        const team = await TeamModel.findById(teamId);
        const teamMemberInfos = [];
        for (const memberId of team.members) {
            const member = await UserModel.findById(memberId).exec();
            teamMemberInfos.push(member);
        }
        const returnObject = {
            team: team,
            members: teamMemberInfos
        }
        return res.status(200).json(returnObject);
    }
}