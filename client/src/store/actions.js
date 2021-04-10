import { fetchUserData } from '@/services/User.js';

export const getUserData = async ({ commit }) => {
    commit('userDataLoading', true);
    const userData = await fetchUserData();
    commit('setUserData', userData)
    commit('userDataLoading', false);
}