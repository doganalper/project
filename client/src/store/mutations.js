export const setUserData = (state, payload) => {
    state.userData = payload;
};

export const userDataLoading = (state, payload) => {
    state.userDataLoading = payload;
};

export const addToUserProjects = (state, payload) => {
    state.userData.projects.push(payload)
}