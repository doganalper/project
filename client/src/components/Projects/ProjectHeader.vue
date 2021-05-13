<template>
    <div class="project-header">
        <div class="project-header-name">
            <b>Proje:</b> {{ $store.state.openProject.projectDetail.name }}
            <div class="change-div" v-if="$store.state.userData.isAdmin">
                <transition name="input">
                    <input
                        type="text"
                        v-model="newProjectName"
                        v-show="isRenameOpen"
                        placeholder="Press enter to change"
                        @keyup.enter="changeProjectName"
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
        <div
            v-if="$store.state.userData.isAdmin && $store.state.openProject.teams.length !== 0"
            class="project-header-create"
        >
            <input
                type="text"
                v-model="createdTeamName"
                placeholder="Press enter to create team"
                @keyup.enter="createTeam"
            />
        </div>
        <div class="project-header-description">
            <div v-if="$store.state.userData.isAdmin">
                <unicon
                    name="pen"
                    fill="royalblue"
                    class="pen"
                    width="15"
                    @click="isDescriptionOpen = !isDescriptionOpen"
                />
                <transition name="input">
                    <input
                        type="text"
                        v-model="newDescription"
                        v-show="isDescriptionOpen"
                        placeholder="Press enter to change"
                        @keyup.enter="changeDescription"
                    />
                </transition>
            </div>
            <span>
                {{ getDescription }}
            </span>
        </div>
    </div>
</template>

<script>
import { changeProjectDetail } from '@/services/Projects.js';

export default {
    data() {
        return {
            isRenameOpen: false,
            newProjectName: null,
            isDescriptionOpen: false,
            newDescription: null,
            createdTeamName: null
        };
    },
    methods: {
        changeProjectName() {
            this.changeDetail({
                name: this.newProjectName
            });
            this.newProjectName = null;
        },
        changeDescription() {
            this.changeDetail({
                description: this.newDescription
            });
            this.newDescription = null;
        },
        async changeDetail(changedObject) {
            const newDetail = await changeProjectDetail(
                this.$store.state.openProject.projectDetail._id,
                changedObject
            );
            console.log(newDetail);
            this.$store.commit('changeProjectDetail', newDetail);
        },
        createTeam() {
            if (this.createdTeamName) this.$emit('createTeam', this.createdTeamName);
            this.createdTeamName = null;
        }
    },
    computed: {
        getDescription() {
            return this.$store.state.openProject.projectDetail.description
                ? this.$store.state.openProject.projectDetail.description
                : "There's no description for this project!";
        }
    }
};
</script>

<style lang="scss">
.project-header {
    background-color: rgb(247, 247, 247);
    border-bottom: 1px solid lightgray;
    padding: 0.8rem 1.2rem;
    font-size: 0.9rem;
    display: flex;
    flex-flow: row;
    align-items: center;
    justify-content: space-between;

    &-name {
        display: flex;
        align-items: center;

        .change-div {
            margin-left: 0.5rem;
            display: flex;
        }
    }

    &-description {
        display: flex;
        align-items: center;

        div {
            display: flex;
            align-items: center;
        }

        span {
            margin-left: 0.5rem;
        }
    }

    .pen {
        cursor: pointer;
    }

    input {
        margin: 0 0.5rem;
    }
}
</style>
