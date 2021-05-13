<template>
    <div class="teams-settings flex-col">
        <div class="teams-settings-main flex-row">
            <div class="setting-div flex-col">
                Description:
                <textarea
                    cols="20"
                    rows="4"
                    v-model="description"
                    :placeholder="getTeamDescription"
                >
                </textarea>
                <button class="changeDescription" @click="changeDescription">
                    Change Description
                </button>
            </div>
            <div class="setting-div flex-col">
                Add User:
                <select v-model="addUserSelect">
                    <option disabled selected="true" :value="null">Select a user</option>
                    <option
                        :value="{ userId: user.info._id }"
                        v-for="user in usersNotInTeam"
                        :key="user.info._id"
                    >
                        {{ user.info.name }}
                    </option>
                </select>
                <button class="changeDescription" @click="addUser">Add User</button>
            </div>
            <div class="setting-div flex-col">
                Remove User:
                <select v-model="removeUserSelect">
                    <option disabled selected="true" :value="null">Select a user</option>
                    <option
                        :value="{ userId: user.info._id }"
                        v-for="user in usersInTeam"
                        :key="user.info._id"
                    >
                        {{ user.info.name }}
                    </option>
                </select>
                <button class="changeDescription" @click="removeUser">Remove User</button>
            </div>
            <div class="setting-div">Team fotoğrafı değiştir</div>
        </div>
    </div>
</template>

<script>
import { changeTeamDetails } from '@/services/Teams';

export default {
    props: {
        usersNotInTeam: {
            type: Array,
            default: () => []
        },
        usersInTeam: {
            type: Array,
            default: () => []
        },
        teamDescription: {
            type: String
        }
    },
    data() {
        return {
            description: null,
            addUserSelect: null,
            removeUserSelect: null
        };
    },
    methods: {
        async changeDescription() {
            if (this.description) {
                const newDetail = await changeTeamDetails(
                    this.$store.state.openTeam.teamDetail._id,
                    { description: this.description }
                );
                this.$store.commit('changeTeamDetail', newDetail);
                this.description = null;
            }
        },
        addUser() {
            if (this.addUserSelect) {
                this.$store.dispatch('addUserToTeamAction', {
                    teamId: this.$router.currentRoute.params.teamId,
                    userId: this.addUserSelect
                });
            }
            this.addUserSelect = null;
        },
        removeUser() {
            if (this.removeUserSelect) {
                this.$store.dispatch('removeUsersFromTeamAction', {
                    teamId: this.$router.currentRoute.params.teamId,
                    userId: this.removeUserSelect
                });
            }
            this.removeUserSelect = null;
        }
    },
    computed: {
        getTeamDescription() {
            return this.$store.state.openTeam.teamDetail.description
                ? this.$store.state.openTeam.teamDetail.description
                : 'Enter your description here!';
        }
    }
};
</script>

<style lang="scss">
.teams-settings {
    border-bottom: 1px solid rgb(199, 199, 199);
    background-color: rgb(243, 243, 243);
    padding: 1.2rem 2rem;

    &-main {
        column-gap: 1%;

        .setting-div {
            width: (100% / 4) - 1%;
            padding-right: 0.5rem;

            .changeDescription {
                padding: 0.3rem 0;
                background-color: lightgreen;
                border: none;
                width: 40%;
                margin: 0 auto;
                margin-top: 0.5rem;
                border-radius: 0.4rem;
            }

            select {
                width: 70%;
                margin: 0 auto;
            }
        }
    }

    textarea {
        padding: 0.4rem;
        box-sizing: border-box;
    }
}
</style>
