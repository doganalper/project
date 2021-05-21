const GuestModel = require('../models/guestModel');
const RequestModel = require('../models/requestModel');
const ProjectModel = require('../models/projectModel');
const RequestCommentModel = require('../models/requestCommentModel');

const { generateAccessToken } = require('../utils/authFunctions');

exports.createGuest = async (req, res) => {
    const { name, surname, password, email } = req.body;
    if (!name || !surname || !password || !email) return res.status(400).json({ status: 400, message: "Fields cannot be empty" });
    else {
        try {
            const createdGuest = await GuestModel.create({
                email: email,
                name: name,
                surname: surname,
                password: password
            });
            const token = generateAccessToken({ id: createdGuest.id, email: createdGuest.email });
            return res.status(200).json({
                message: 'Guest Created!',
                accessToken: token,
                userType: 'guest'
            })
        } catch (err) {
            console.log(err);
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
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Fields cannot be empty' });
    else {
        const foundGuest = await GuestModel.findOne({ email: email, password: password });
        if (!foundGuest) {
            return res.status(404).json({ message: 'Guest not found!' })
        }
        const token = generateAccessToken({ id: foundGuest.id, email: email });
        return res.status(200).json({ accessToken: token, userType: 'guest' });
    }
};

exports.getUser = async (req, res) => {
    const user = req.user;
    const foundUser = await GuestModel.findById(user.id);

    const projectInfos = foundUser.includedProjects.map(async (projectId) => {
        /* return await CommentModel.findOne({_id: commentId}, async (err, doc) => {
            const commentInfo = await doc.toObject();
            commentInfo.isUser = (doc.userId === user.id);
            return commentInfo;
        }) */

        return await ProjectModel.findOne({ _id: projectId }, async (err, doc) => {
            return doc.toObject();
        })
    });
    const projectsArr = await Promise.all(projectInfos);

    res.json({
        userId: user.id,
        email: foundUser.email,
        name: `${foundUser.name} ${foundUser.surname}`,
        projects: projectsArr,
        requests: foundUser.requests
    });
};

exports.createRequest = async (req, res) => {
    const { header, dueDate } = req.body;
    const projectId = req.params.projectId;
    const guest = req.user;

    try {
        const createdRequest = await RequestModel.create({
            creator: guest.id,
            projectId: projectId,
            header: header,
            dueDate: dueDate,
        });

        console.log(createdRequest);

        await GuestModel.updateOne({ _id: guest.id }, { $push: { requests: createdRequest._id } });
        await ProjectModel.updateOne({ _id: projectId }, { $push: { requests: createdRequest._id } });

        return res.status(200).json(createdRequest);
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: 'Something went wrong!'
        })
    }
};

exports.removeRequest = async (req, res) => {
    const { requestId } = req.body;
    const projectId = req.params.projectId;

    try {
        const foundRequest = await RequestModel.findById(requestId).exec();
        console.log(foundRequest);
        const isDeleted = await RequestModel.deleteOne({ _id: requestId });

        if (isDeleted.deletedCount !== 0) {
            await GuestModel.updateOne({ _id: foundRequest.creator }, {
                $pullAll: { requests: [requestId] }
            });

            await ProjectModel.updateOne({ _id: foundRequest.projectId }, {
                $pullAll: { requests: [requestId] }
            })

            return res.status(200).json({
                message: 'Request Deleted',
                requestId: foundRequest._id
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: 'There was an error!'
        })
    }
};

exports.addCommentToRequest = async (req, res) => {
    const {
        requestId,
        content,
        userId,
        userType
    } = req.body;

    try {
        const createdComment = await RequestCommentModel.create({
            requestId: requestId,
            content: content,
            userId: userId,
            userType: userType
        });

        console.log(createdComment);

        await RequestModel.updateOne({ _id: requestId }, {
            $push: { comments: createdComment._id }
        })

        return res.status(200).json(createdComment);
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: 'something went wrong'
        })
    }
};

exports.changeRequestStatus = async (req, res) => {
    const { requestId } = req.body;

    try {
        const foundRequest = await RequestModel.findOne({ _id: requestId });
        await RequestModel.updateOne({ _id: requestId }, {
            isFinished: !foundRequest.isFinished
        });

        return res.status(200).json({
            status: !foundRequest.isFinished
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: 'Something went wrong!'
        })
    }
};

exports.updateRequest = async (req, res) => {
    const {
        newDueDate,
        header,
        content
    } = req.body;
    const projectId = req.params.projectId;

    try {
        const foundRequest = await RequestModel.findById(projectId).exec();
        await RequestModel.updateOne({ _id: projectId }, {
            dueDate: newDueDate ? newDueDate : foundRequest.dueDate,
            header: header ? header : foundRequest.header,
            content: content ? content : foundRequest.content
        })

        const changedRequestInfo = await RequestModel.findById(projectId).exec();
        return res.status(200).json(changedRequestInfo);
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: 'Something went wrong!'
        })
    }
}