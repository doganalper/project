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
    if (foundUser.projects.length !== 0) {
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
        userId: user.id,
        email: foundUser.email,
        name: `${foundUser.name} ${foundUser.surname}`,
        profileImage: foundUser.userImage,
        projects: projects
    });
};

exports.changePassword = async (req, res) => {
    const user = req.user;
    const {oldPassword, newPassword1, newPassword2} = req.body;
    const foundUser = await UserModel.findById(user.id);

    if (oldPassword !== foundUser.password) return res.status(400).json({message: 'Old password is wrong'})
    else if (newPassword1 !== newPassword2) return res.status(400).json({message: 'New passwords does not match'})
    else {
        await UserModel.updateOne({_id: user.id}, {
            password: newPassword1
        })

        return res.status(200).json({
            message: 'Successful!'
        })
    }
};

exports.changeUserInfo = async (req, res) => {
    const user = req.user;
    const {name, surname} = req.body;

    if (!name && !surname) return res.status(400).json({message: 'At least one field must be provided'});
    else {
        await UserModel.updateOne({_id: user.id}, {
            name: name ? name : user.name,
            surname: surname ? surname : user.surname
        });

        const foundUser = await UserModel.findById(user.id).exec();

        return res.status(200).json({
            user: foundUser
        })
    }
}

exports.getUserById = async (req,res) => {
    const {userId} = req.body;

    const userInfo = await UserModel.findOne({_id: userId}, (err, doc) => {
        if (err) {
            console.log(err);
            return res.status(400).json({message:'Something went wrong!'})
        }
        let foundUser = doc.toObject();
        delete foundUser['password'];
        delete foundUser['projects'];
        return res.status(200).json(foundUser);
    })
}