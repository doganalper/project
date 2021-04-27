import { fetchUserData } from '@/services/User.js';
import {
    fetchProjectDetail,
    addUserToProject,
    removeUserFromProject
} from '@/services/Projects.js';
import { getTeamDetail } from '@/services/Teams.js';

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
    commit('setAddUserErrorText', null);
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
        commit('setProjectMembers', [
            ...state.openProject.members,
            {
                info: user.info,
                isAdmin: false
            }
        ]);
    } catch (error) {
        commit('setAddUserErrorText', 'You cannot add this user to project!');
    }
};

export const removeUserFromProjectAction = async ({ commit, state }, userId) => {
    await removeUserFromProject(state.openProject.projectDetail._id, userId);
    const newArr = state.openProject.members.filter((member) => member.info._id !== userId);
    commit('setProjectMembers', newArr);
};

export const geTeamDetails = async ({ commit, state }, teamId) => {
    commit('setTeamLoading', true);
    commit('setTeamDetail', null);
    const teamDetail = await getTeamDetail(teamId);
    if (!teamDetail) {
        commit('setTeamLoading', true);
    } else {
        if (teamDetail.admins.includes(state.userData.userId)) {
            commit('setIfUserTeamAdmin', true);
        } else {
            commit('setIfUserTeamAdmin', false);
        }
        commit('setTeamDetail', teamDetail);
        commit('setTeamLoading', false);
    }
};
