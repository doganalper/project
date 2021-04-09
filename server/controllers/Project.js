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