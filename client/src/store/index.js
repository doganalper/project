import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
import * as mutations from './mutations';
import * as getters from './getters';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        userData: null,
        userDataLoading: null,
        openProject: {
            projectDetailLoading: null,
            projectDetail: null,
            teams: [],
            members: [],
            membersErrorText: null
        },
        openTeam: {
            teamDetailLoading: null,
            teamDetail: null
        }
    },
    mutations,
    actions,
    getters,
    modules: {}
});
