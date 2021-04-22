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
