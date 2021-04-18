import { fetchUserData } from '@/services/User.js';
import { fetchProjectDetail, addUserToProject } from '@/services/Projects.js';

export const getUserData = async ({ commit }) => {
    commit('userDataLoading', true);
    const userData = await fetchUserData();
    if (!userData) {
        commit('userDataLoading', false);
    }
    commit('setUserData', userData);
    commit('userDataLoading', false);
};

export const getProjectDetail = async ({ commit, state }, projectId) => {
    commit('setProjectDetail', null);
    commit('setTeams', null);
    commit('setProjectMembers', null);
    commit('projectDetailLoading', true);
    const projectDetail = await fetchProjectDetail(projectId);
    if (!projectDetail) {
        commit('projectDetailLoading', false);
    } else {
        if (projectDetail.project.admins.includes(state.userData.userId)) {
            commit('setIfUserAdmin', true);
        } else {
            commit('setIfUserAdmin', false);
        }
        commit('setProjectDetail', projectDetail.project);
        commit('setTeams', projectDetail.teamsDetails);
        commit('setProjectMembers', projectDetail.projectMembers);
        commit('projectDetailLoading', false);
    }
};

export const addUserToProjectAction = async ({ commit, state }, mail) => {
    try {
        const user = await addUserToProject(state.openProject.projectDetail._id, mail);
        commit('setProjectMembers', [...state.openProject.members, {
            info: user.info,
            isAdmin: false
        }]);
    } catch (error) {
        commit('setAddUserErrorText', "This user is already in this project!");
    }
}