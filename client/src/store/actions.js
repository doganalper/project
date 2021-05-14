import { fetchUserData } from '@/services/User.js';
import {
    fetchProjectDetail,
    addUserToProject,
    removeUserFromProject
} from '@/services/Projects.js';
import { getTeamDetail, addUserToTeam, removeUsersFromTeam } from '@/services/Teams.js';
import { removeStage, createStage, changeStageName } from '@/services/Stages.js';
import { createNewJob } from '@/services/Job.js';

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

export const getTeamDetails = async ({ commit, state }, teamId) => {
    commit('setTeamLoading', true);
    const teamDetail = await getTeamDetail(teamId);
    if (!teamDetail) {
        commit('setTeamLoading', true);
    } else {
        if (teamDetail.teamDetail.admins.includes(state.userData.userId)) {
            commit('setIfUserTeamAdmin', true);
        } else {
            commit('setIfUserTeamAdmin', false);
        }
        commit('setTeamDetail', teamDetail.teamDetail);
        commit('setStages', teamDetail.stages);
        commit('setTeamMembersMutation', teamDetail.teamMembers);
        commit('setTeamLoading', false);
    }
};

export const removeStageAction = async ({ commit }, stageId) => {
    const removedStage = await removeStage(stageId);
    commit('removeStageMutation', removedStage.stageId);
};

export const createNewJobAction = async ({ commit }, payload) => {
    const addedJob = await createNewJob(payload.stageId, payload.jobName);
    commit('createJobMutation', { createdJob: addedJob.job, stageId: payload.stageId });
};

export const createStageAction = async ({ commit }, payload) => {
    const response = await createStage(payload.teamId, payload.stageName);
    const stage = response.stage;
    const createdStage = {
        jobs: [],
        stageInfo: { ...stage }
    };
    commit('createStageMutation', createdStage);
};

/* {stageId: stageId, name: this.stageChangeInput} */
export const changeStageNameAction = async ({ commit }, payload) => {
    const stageName = await changeStageName(payload);
    commit('changeStageNameMutation', stageName);
};

export const addUserToTeamAction = async ({ commit }, payload) => {
    const response = await addUserToTeam(payload.teamId, payload.userId);
    commit('setTeamMembersMutation', response.member);
    commit('setTeamDetail', response.team);
};

export const removeUsersFromTeamAction = async ({ commit }, payload) => {
    const response = await removeUsersFromTeam(payload.teamId, payload.userId);
    commit('setTeamMembersMutation', response.member);
    commit('setTeamDetail', response.team);
};
