<template>
    <div class="projects-section screen-center fullscreen flex-col">
        <div class="projects">
            <div class="headerSection" @click="isAdminProjectsOpen = !isAdminProjectsOpen">
                <unicon :name="isAdminProjectsOpen ? 'angle-up' : 'angle-down'" fill="black" />
                <span>Admin Projects</span>
            </div>
            <div v-if="isAdminProjectsOpen">
                <div v-if="filteredProjects.adminProjects.length !== 0" class="projects-line">
                    <div
                        v-for="project in filteredProjects.adminProjects"
                        :key="project.id"
                        class="project-frame"
                    >
                        <div class="project-frame-picture screen-center">
                            <!-- TODO: check if project has image setted -->
                            <unicon name="list-ui-alt" fill="black" />
                        </div>
                        {{ project.name }}
                    </div>
                </div>
                <span v-else>You aren't a part of any project</span>
            </div>
        </div>
        <div class="projects">
            <div class="headerSection" @click="isMemberProjectsOpen = !isMemberProjectsOpen">
                <unicon :name="isMemberProjectsOpen ? 'angle-up' : 'angle-down'" fill="black" />
                <span>Projects that you are member</span>
            </div>
            <div v-if="isMemberProjectsOpen">
                <div v-if="filteredProjects.memberProjects.length !== 0" class="projects-line">
                    <div
                        v-for="project in filteredProjects.memberProjects"
                        :key="project.id"
                        class="project-frame"
                    >
                        <div class="project-frame-picture screen-center">
                            <!-- TODO: check if project has image setted -->
                            <unicon name="list-ui-alt" fill="black" />
                        </div>
                        {{ project.name }}
                    </div>
                </div>
                <span v-else>You aren't a part of any project</span>
            </div>
        </div>
        <div class="bracket flex-row">
            <div class="hl"></div>
            <span>Or</span>
            <div class="hl"></div>
        </div>
        <div class="create-project flex-col">
            <input type="text" v-model="newProjectName" />
            <button @click="createProject">Create a project</button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        projects: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            isAdminProjectsOpen: true,
            isMemberProjectsOpen: true,
            newProjectName: null
        };
    },
    methods: {
        createProject() {
            if (this.newProjectName) {
                this.$emit('createProject', this.newProjectName);
                this.newProjectName = null;
            }
        }
    },
    computed: {
        filteredProjects() {
            return this.$store.getters.getFilteredProjects;
        }
    }
};
</script>

<style lang="scss">
.projects-section {
    height: 100vh;

    .projects {
        display: flex;
        flex-flow: column;
        width: 50%;
        border: 1px solid black;
        border-radius: 0.4rem;
        padding: 1rem 0.5rem;
        box-shadow: 0px 0px 38px -16px rgba(0, 0, 0, 0.5);

        &:first-of-type {
            margin-bottom: 1.5rem;
        }

        .headerSection {
            display: flex;
            align-items: center;
            cursor: pointer;
            span {
                font-weight: 600;
            }
        }

        &-line {
            padding: 0.3rem 0.6rem;
            padding-bottom: 0;
            display: flex;
            flex-flow: row;
            align-items: center;
            justify-content: flex-start;
            flex-wrap: wrap;

            .project-frame {
                display: flex;
                flex-flow: column;
                align-items: center;
                margin-right: 1.5rem;
                margin-bottom: 0.4rem;
                cursor: pointer;
                transition: all 0.1s;

                &:last-of-type {
                    margin-right: 0;
                }

                &:hover {
                    transform: scale(1.05);
                }

                &-picture {
                    border: 1px solid black;
                    width: 6rem;
                    height: 6rem;
                    margin-bottom: 0.5rem;
                }
            }
        }
    }

    .bracket {
        align-items: center;
        justify-content: space-between;
        margin: 1rem 0;
        width: 50%;

        .hl {
            border: 1px solid lightgray;
            width: 45%;
            height: 1px;
        }

        span {
            font-weight: 600;
        }
    }

    .create-project {
        width: 15%;
        font-size: 1.1rem;

        input {
            margin-bottom: 0.6rem;
            font-size: 1.1rem;
            padding: 0.05rem 0.5rem;
        }

        button {
            margin-top: 1rem;
            border: greenyellow;
            border-radius: 1rem;
            padding: 0.5rem 1rem;
            background-color: greenyellow;
            font-size: 1.2rem;
            cursor: pointer;
        }
    }
}
</style>