export const setUserData = (state, payload) => {
    state.userData = payload;
};

export const userDataLoading = (state, payload) => {
    state.userDataLoading = payload;
};

export const setIfUserAdmin = (state, payload) => {
    state.userData = { ...state.userData, isAdmin: payload };
};

export const addToUserProjects = (state, payload) => {
    state.userData.projects.push(payload);
};

export const projectDetailLoading = (state, payload) => {
    state.openProject.projectDetailLoading = payload;
};

export const removeProject = (state, projectId) => {
    const projectsArr = state.userData.projects.filter((project) => project.id !== projectId);
    state.userData.projects = projectsArr;
};

export const setProjectDetail = (state, payload) => {
    state.openProject.projectDetail = payload;
};

export const setTeams = (state, payload) => {
    state.openProject.teams = payload;
};

export const setProjectMembers = (state, payload) => {
    state.openProject.members = payload;
};

export const setAddUserErrorText = (state, payload) => {
    state.openProject.membersErrorText = payload;
};

export const addToProjectTeams = (state, payload) => {
    state.openProject.teams.push(payload);
};

export const changeProjectDetail = (state, changedDetail) => {
    state.openProject.projectDetail.name = changedDetail.name;
    state.openProject.projectDetail.description = changedDetail.description;
};

export const setTeamLoading = (state, payload) => {
    state.openTeam.teamDetailLoading = payload;
};

export const setTeamDetail = (state, teamDetail) => {
    state.openTeam.teamDetail = teamDetail;
};

export const setIfUserTeamAdmin = (state, isAdmin) => {
    state.openTeam.isAdmin = isAdmin;
};

export const changeTeamDetail = (state, changedDetail) => {
    state.openTeam.teamDetail.name = changedDetail.name;
    state.openTeam.teamDetail.description = changedDetail.description;
};

export const setStages = (state, stages) => {
    state.openTeam.stages = stages;
};

export const changeJobStage = (state, payload) => {
    state.openTeam.stages.find(
        (stage) => stage.stageInfo._id === payload.oldStageId
    ).jobs = state.openTeam.stages
        .find((stage) => stage.stageInfo._id === payload.oldStageId)
        .jobs.filter((job) => job._id !== payload.job._id);
    state.openTeam.stages
        .find((stage) => stage.stageInfo._id === payload.newStageId)
        .jobs.push(payload.job);
};

export const removeStageMutation = (state, removedStageId) => {
    state.openTeam.stages = state.openTeam.stages.filter(
        (stage) => stage.stageInfo._id !== removedStageId
    );
};

export const createJobMutation = (state, payload) => {
    state.openTeam.stages
        .find((stage) => stage.stageInfo._id === payload.stageId)
        .jobs.push(payload.createdJob);
};

export const createStageMutation = (state, payload) => {
    state.openTeam.stages.push(payload);
};

export const changeStageNameMutation = (state, payload) => {
    state.openTeam.stages.find((stage) => stage.stageInfo._id === payload.stageId).stageInfo.name =
        payload.newName;
};

export const setTeamMembersMutation = (state, payload) => {
    state.openTeam.teamMembers = payload;
};

// {jobId: this.jobInfo._id, status: newStatus.isFinished, stageId: this.jobInfo.stageId}
export const changeJobStatusMutation = (state, payload) => {
    state.openTeam.stages
        .find((stage) => stage.stageInfo._id === payload.stageId)
        .jobs.find((job) => job._id === payload.jobId).isFinished = payload.status;
};

export const changeJobInfoMutation = (state, payload) => {
    const foundJob = state.openTeam.stages
        .find((stage) => stage.stageInfo._id === payload.stageId)
        .jobs.find((job) => job._id === payload.jobId);
    foundJob.name = payload.name;
    foundJob.description = payload.description;
};

export const removeJobMutation = (state, payload) => {
    const filtered = state.openTeam.stages
        .find((stage) => stage.stageInfo._id === payload.stageId)
        .jobs.filter((job) => job._id !== payload.jobId);
    state.openTeam.stages.find((stage) => stage.stageInfo._id === payload.stageId).jobs = filtered;
};
