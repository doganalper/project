const ProjectModel = require('../models/projectModel');
const UserModel = require('../models/userModel');

exports.createProject = async (req, res) => {
    const { name } = req.body;
    const user = req.user;
    if (!name) return res.status(400).json({ message: "Fields cannot be empty!" });
    else {
        try {
            const createdProject = await ProjectModel.create({
                name: name,
                admins: [user.id]
            });

            await UserModel.updateOne(
                { _id: user.id },
                { $push: { projects: createdProject.id } }
            )

            return res.status(200).json({
                message: 'Project created!',
                name: name,
                project_id: createdProject.id
            });
        } catch (err) {
            console.log(err.message);
            return res.status(400).json({
                message: 'There was an error!'
            })
        }
    }
}

exports.deleteProject = async (req, res) => {
    const { projectId } = req.body;
    const user = req.user;
    if (!projectId) return res.status(400).json({ message: "Fields cannot be empty!" });
    else {
        try {
            const deletedProject = await ProjectModel.deleteOne({ _id: projectId });
            if (deletedProject.deletedCount !== 0) {
                await UserModel.updateOne({ _id: user.id }, { $pullAll: { projects: [projectId] } });
                return res.status(200).json({
                    message: 'Deleted successfully!'
                })
            } else {
                return res.status(400).json({
                    message: 'Project could not be found!'
                })
            }
        } catch (err) {
            console.log(err);
            return res.status(400).json({
                message: 'There was an error!'
            })
        }
    }
}

exports.updateProject = async (req, res) => {
    const { projectId } = req.params;
    const {
        name,
        description
    } = req.body;

    if (!name && !description) return res.status(400).json({ message: "At least one of the fields should be filled!" });
    else {
        try {
            const project = await ProjectModel.findById(projectId).exec();
            const query = { _id: projectId };
            const updateObject = {
                $set: {
                    name: name ? name : project.name,
                    description: description ? description : project.description
                }
            }
            ProjectModel.findOneAndUpdate(query, updateObject, { new: true }, (err, doc) => {
                if (err) {
                    console.log(err);
                    return res.status(400).json({ message: 'There was an error!' })
                } else {
                    return res.status(200).json({
                        projectId: doc.id,
                        description: doc.description,
                        name: doc.name
                    })
                }
            })
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: 'There was an error!' })
        }
    }
}

exports.addUserToProject = async (req, res) => {
    const { projectId } = req.params;
    const { userEmail } = req.body;
    if (!userEmail) return res.status(400).json({ message: 'Fields cannot be empty!' });
    else {
        try {
            const userArr = await UserModel.find({ email: userEmail });
            if (userArr.length === 0) {
                return res.status(404).json({ message: "Couldn't found user with this email!" })
            } else {
                const user = userArr[0];
                console.log(user);
                await UserModel.updateOne(
                    { email: user.email },
                    { $push: { projects: projectId } }
                )

                await ProjectModel.updateOne(
                    { _id: projectId },
                    { $push: { members: user.id } }
                )

                return res.status(200).json({ message: 'User added to project!' })
            }

        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: 'There was an error!' })
        }
    }
}

exports.removeUserFromProject = async (req, res) => {
    const { projectId } = req.params;
    const { userId } = req.body;

    if (!userId) return res.status(400).json({ message: 'Fields cannot be empty!' });
    else {
        const project = await ProjectModel.findById(projectId).exec();
        if (project.admins.includes(`${userId}`)) res.status(400).json({ message: 'You cannot remove other admins from projects!' });
        if (!project.members.includes(userId)) res.status(404).json({ message: 'There is no one in this project with given user id!' })
        else {
            try {
                await ProjectModel.updateOne({ _id: projectId }, { $pullAll: { members: [userId] } });
                await UserModel.updateOne({ _id: userId }, { $pullAll: { projects: [projectId] } })
                return res.status(200).json({
                    message: 'User removed from project',
                    project: {
                        members: project.members,
                        admins: project.admins
                    },
                    user: userId
                });
            } catch (error) {
                console.log(error);
                return res.status(400).json({ message: 'There was an error!' })
            }
        }
    }
}

// Role kısmı 1 ve 2 olabilir: 1 (admin) 2 (member)
exports.setUserRole = async (req, res) => {
    const { projectId } = req.params;
    const { userId, role } = req.body;

    if (!userId || !role) return res.status(400).json({ message: 'Fields cannot be empty' });
    else {
        const project = await ProjectModel.findById(projectId).exec();
        const user = await UserModel.findById(userId).exec();
        if (role === 1 && !project.admins.includes(`${userId}`)) {
            await ProjectModel.updateOne({ _id: projectId }, { $pullAll: { members: [userId] } });
            await ProjectModel.updateOne(
                { _id: projectId },
                { $push: { admins: userId } }
            )
            return res.status(200).json({ message: 'User role successfully setted!' })
        } else if (role === 2 && !project.members.includes(`${userId}`)) {
            await ProjectModel.updateOne({ _id: projectId }, { $pullAll: { admins: [userId] } });
            await ProjectModel.updateOne(
                { _id: projectId },
                { $push: { members: userId } }
            )
            return res.status(200).json({ message: 'User role successfully setted!' })
        } else {
            return res.status(400).json({ message: 'User already in this part for this project!' });
        }
    }
}

exports.getProjectDetails = async (req, res) => {
    const userId = req.user.id;
    const { projectId } = req.params;

    try {
        const project = await ProjectModel.findById(projectId).exec();
        return res.status(200).json(project);
    } catch (error) {
        console.log(project);
        return res.status(400).json({ message: 'There was an error!' });
    }
}