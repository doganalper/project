<template>
    <div class="team-header">
        <div class="team-header-name">
            <b>Takım: </b> {{ $store.state.openTeam.teamDetail.name }}
            <div class="change-div" v-if="$store.state.userData.isAdmin">
                <transition name="input">
                    <input
                        type="text"
                        v-model="newName"
                        v-show="isRenameOpen"
                        placeholder="Press enter to change"
                        @keyup.enter="changeTeamName"
                    />
                </transition>
                <unicon
                    name="pen"
                    fill="royalblue"
                    class="pen"
                    width="15"
                    @click="isRenameOpen = !isRenameOpen"
                />
            </div>
        </div>
        <div class="icons">
            <unicon
                name="trash-alt"
                class="icons-trash"
                fill="darkred"
                v-if="$store.state.userData.isAdmin"
                width="14"
                @click="removeTeamHandler"
            />
            <unicon
                name="cog"
                fill="royalblue"
                class="pen"
                width="15"
                @click="setSettings"
                v-if="$store.state.userData.isAdmin"
            />
            <div class="" v-else>{{ $store.state.openTeam.teamDetail.description }}</div>
        </div>
        <v-dialog />
    </div>
</template>

<script>
import { changeTeamDetails, removeTeam } from '@/services/Teams';

export default {
    data() {
        return {
            isRenameOpen: false,
            newName: null
        };
    },
    methods: {
        setSettings() {
            this.$emit('setSettingsPanel');
        },
        async changeTeamName() {
            if (this.newName) {
                const newDetail = await changeTeamDetails(
                    this.$store.state.openTeam.teamDetail._id,
                    { name: this.newName }
                );
                this.$store.commit('changeTeamDetail', newDetail);
                this.newName = null;
                this.isRenameOpen = null;
            }
        },
        removeTeamHandler() {
            this.$modal.show('dialog', {
                title: 'Do you want to delete this team?',
                text: 'This team will be deleted without any possibility to return!',
                buttons: [
                    {
                        title: 'Cancel',
                        handler: () => {
                            this.$modal.hide('dialog');
                        }
                    },
                    {
                        title: 'Remove Team',
                        class: 'delete-team-button',
                        handler: async () => {
                            const response = await removeTeam(
                                this.$store.state.openTeam.teamDetail._id
                            );
                            console.log(response);
                            if (response.status === 200) {
                                this.$modal.hide('dialog');
                                this.$router.push(
                                    `/project/${this.$store.state.openProject.projectDetail._id}`
                                );
                            }
                        }
                    }
                ]
            });
        }
    }
};
</script>

<style lang="scss">
.team-header {
    background-color: rgb(247, 247, 247);
    border-bottom: 1px solid lightgray;
    padding: 0.8rem 1.2rem;
    font-size: 0.9rem;
    display: flex;
    flex-flow: row;
    align-items: center;
    justify-content: space-between;

    .delete-team-button {
        width: 100%;
        font-size: 0.8rem;
        border: none;
        background: lightsalmon;
        padding: 0.4rem 0;
        font-weight: 600;
        cursor: pointer;
    }

    &-name {
        display: flex;
        align-items: center;

        .change-div {
            margin-left: 0.5rem;
            display: flex;
        }
    }

    input {
        margin: 0 0.5rem;
    }

    .icons {
        &-trash {
            margin-right: 0.7rem;
        }
    }
}
</style>
