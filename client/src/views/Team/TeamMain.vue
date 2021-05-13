<template>
    <div class="team-main full-screen" v-if="$store.state.openTeam.teamDetailLoading === false">
        <TeamHeader @setSettingsPanel="setSettingsPanel" />
        <TeamSettings
            v-if="isSettingsOpen"
            :usersNotInTeam="getUsersNotInTeam"
            :usersInTeam="getUsersInTeam"
        />
        <div class="stages">
            <div
                v-for="stage in $store.state.openTeam.stages"
                :key="stage.stageInfo._id"
                class="stage"
            >
                <span class="stage-id">{{ stage.stageInfo._id }}</span>
                <div class="stage-header">
                    <span>{{ stage.stageInfo.name }}</span>
                    <unicon
                        :name="
                            stageMenu.isOpen && stageMenu.openId === stage.stageInfo._id
                                ? 'angle-up'
                                : 'angle-down'
                        "
                        @click="changeMenu(stage.stageInfo._id)"
                    />
                </div>
                <div
                    v-if="stageMenu.isOpen && stageMenu.openId === stage.stageInfo._id"
                    class="stage-menu"
                >
                    <div class="stage-menu-icons">
                        <div>
                            <unicon
                                name="pen"
                                width="18"
                                fill="blue"
                                @click="setOpenInput('changeName')"
                            />
                            <unicon
                                name="plus"
                                width="20"
                                fill="green"
                                @click="setOpenInput('addJob')"
                            />
                        </div>
                        <unicon
                            name="times"
                            width="20"
                            fill="red"
                            @click="deleteStage(stage.stageInfo._id)"
                        />
                    </div>
                    <input
                        placeholder="Enter Job Name Here"
                        @keyup.enter="addEvent(stage.stageInfo._id)"
                        v-model="newJobName"
                        v-if="stageMenu.openInput === 'addJob'"
                    />
                    <input
                        placeholder="Enter Stage Name"
                        @keyup.enter="changeStageName(stage.stageInfo._id)"
                        v-model="stageChangeInput"
                        v-else-if="stageMenu.openInput === 'changeName'"
                    />
                </div>
                <div class="stage-body">
                    <Draggable :list="stage.jobs" group="job" :move="move">
                        <div
                            v-for="job in stage.jobs"
                            :key="job._id"
                            :class="job.isFinished ? 'card-bg-finished' : 'card-bg-notFinished'"
                            class="job-card"
                            @click="openModal(job._id)"
                        >
                            {{ job.name }}
                        </div>
                    </Draggable>
                </div>
            </div>
            <div class="flex-col create-stage">
                <span> Create New Stage </span>
                <input
                    v-model="newStageName"
                    type="text"
                    @keyup.enter="createNewStage"
                    placeholder="Enter Stage Name Here"
                />
            </div>
        </div>
        <JobModal />
    </div>
    <div v-else>Loading...</div>
</template>

<script>
import TeamHeader from '@/components/Teams/TeamHeader.vue';
import TeamSettings from '@/components/Teams/TeamsSettings.vue';
import Draggable from 'vuedraggable';
import { changeJobStage } from '@/services/Job.js';
import { mapGetters } from 'vuex';
import JobModal from '@/components/Job/JobModal.vue';

export default {
    data() {
        return {
            isSettingsOpen: false,
            stageMenu: {
                isOpen: false,
                openId: null,
                openInput: null
            },
            newJobName: null,
            newStageName: null,
            stageChangeInput: null
        };
    },
    components: {
        TeamHeader,
        TeamSettings,
        Draggable,
        JobModal
    },
    methods: {
        setSettingsPanel() {
            this.isSettingsOpen = !this.isSettingsOpen;
        },
        move(e) {
            const currId = e.from.parentNode.parentNode.children[0].innerText;
            const newStageId = e.to.parentNode.parentNode.children[0].innerText;
            const job = e.draggedContext.element;

            changeJobStage(currId, newStageId, job._id);
        },
        deleteStage(stageId) {
            this.stageMenu.isOpen = false;
            this.$store.dispatch('removeStageAction', stageId);
        },
        changeMenu(stageId) {
            if (this.stageMenu.isOpen) return (this.stageMenu.isOpen = false);
            this.stageMenu.isOpen = true;
            this.stageMenu.openId = stageId;
            this.stageMenu.openInput = null;
        },
        addEvent(stageId) {
            if (this.newJobName) {
                this.$store.dispatch('createNewJobAction', {
                    stageId: stageId,
                    jobName: this.newJobName
                });
            }
            this.newJobName = null;
        },
        createNewStage() {
            if (this.newStageName) {
                this.$store.dispatch('createStageAction', {
                    teamId: this.$router.currentRoute.params.teamId,
                    stageName: this.newStageName
                });
                this.newStageName = null;
            }
        },
        setOpenInput(inputType) {
            this.stageMenu.openInput = inputType;
        },
        changeStageName(stageId) {
            if (this.stageChangeInput) {
                this.$store.dispatch('changeStageNameAction', {
                    stageId: stageId,
                    name: this.stageChangeInput
                });
                this.stageChangeInput = null;
            }
        },
        openModal(jobId) {
            this.$modal.show('jobModal', { jobId: jobId });
        }
    },
    computed: {
        ...mapGetters(['getUsersNotInTeam', 'getUsersInTeam'])
    },
    mounted() {
        this.$store.dispatch('getTeamDetails', this.$router.currentRoute.params.teamId);
    }
};
</script>

<style lang="scss">
.team-main {
    display: flex;
    flex-flow: column;

    .stages {
        display: flex;
        column-gap: 2rem;
        padding: 1.4rem;
        overflow-x: auto;
        overflow-y: hidden;

        .stage {
            border: 1px solid rgb(184, 184, 184);
            box-shadow: -1px -2px 8px 3px rgba(232, 232, 232, 1);
            width: 18rem;
            min-height: 90vh;
            &-id {
                display: none;
            }

            &-header {
                border-bottom: 1px solid lightgray;
                padding: 0.5rem;
                display: flex;
                flex-flow: row;
                align-items: center;
                justify-content: space-between;
            }
            &-body {
                margin-top: 0.5rem;
                padding: 0 0.5rem;
            }

            &-menu {
                display: flex;
                flex-flow: column;
                justify-content: center;
                padding: 0 0.5rem;

                input {
                    margin: 0.3rem 0;
                    padding: 0.3rem 0.5rem;
                    font-size: 0.8rem;
                }

                &-icons {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 0.3rem;
                }
            }

            .job-card {
                border: 1px solid lightgray;
                border-radius: 0.5rem;
                padding: 1rem 0.5rem;
                font-weight: 500;
                margin-bottom: 0.6rem;
            }

            .card-bg {
                &-finished {
                    background-color: rgb(200, 229, 194);
                }
                &-notFinished {
                    background-color: rgb(241, 241, 241);
                }
            }
        }

        .create-stage {
            width: 13rem;
            text-align: center;
            span {
                color: rgb(184, 184, 184);
            }

            input {
                margin: 0 auto;
                margin-top: 0.5rem;
                width: 80%;
                border: 1px solid rgb(184, 184, 184);
                padding: 0.3rem 0.2rem;
            }
        }
    }
}
</style>
