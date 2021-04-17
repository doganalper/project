import { fetchUserData } from '@/services/User.js';
import { fetchProjectDetail } from '@/services/Projects.js';

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
    commit('projectDetailLoading', true);
    commit('setProjectDetail', null);
    commit('setTeams', null);
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
        commit('projectDetailLoading', false);
    }
};
