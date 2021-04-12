const UserModel = require('../models/userModel');
const ProjectModel = require('../models/projectModel');

const { generateAccessToken } = require('../utils/authFunctions');

exports.createUser = async (req, res) => {
    const { name, surname, password, email } = req.body;
    if (!name || !surname || !password || !email) return res.status(400).json({ status: 400, message: "Fields cannot be empty" });
    else {
        try {
            const createdUser = await UserModel.create({
                email: email,
                name: name,
                surname: surname,
                password: password
            });
            const token = generateAccessToken({ id: createdUser.id, email: createdUser.email });
            return res.status(200).json({
                status: 200,
                message: "User created!",
                accessToken: token
            })
        } catch (err) {
            const error = err.message.split(' ')[0];
            let errorMessage;
            if (error === 'E11000') {
                errorMessage = "This user already exists";
            }
            return res.status(400).json({
                status: 400,
                message: errorMessage
            })
        }
    }
}

exports.login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) res.status(400).json({ status: 400, message: "Fields cannot be empty" });
    else {
        const foundUser = await UserModel.findOne({ email: email, password: password });
        if (!foundUser) {
            return res.status(404).json({ status: 404, message: "User not found!" });
        }
        const token = generateAccessToken({ id: foundUser.id, email: email });
        return res.status(200).json({ status: 200, accessToken: token });
    }
}

exports.getUser = async (req, res) => {
    const user = req.user;
    const foundUser = await UserModel.findById(user.id);

    let projects = [];
    if (foundUser.projects.lengt !== 0) {
        for (const projectId of foundUser.projects) {
            const project = await ProjectModel.find({ _id: '' + projectId }).exec();
            const status = project[0].admins.includes(user.id) ? 'admin' : 'member';
            projects.push({
                name: project[0].name,
                id: project[0].id,
                status: status
            })
        }
    }

    res.json({
        email: foundUser.email,
        name: `${foundUser.name} ${foundUser.surname}`,
        profileImage: foundUser.userImage,
        projects: projects
    });
}