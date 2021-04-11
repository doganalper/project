<template>
    <div
        v-if="$store.state.userData.projects.length === 0"
        class="no-project screen-center fullscreen flex-col"
    >
        <img src="/svg/searching.svg" />
        <span class="no-project-text">Looks like you don't have a project <span>YET!</span></span>
        <div class="create-project flex-col">
            <div v-if="showCreateInput" class="flex-col">
                <input
                    v-if="!errorText"
                    type="text"
                    v-model="createdProjectName"
                    class="project-input"
                />
                <span v-if="errorText">{{ errorText }}</span>
            </div>
            <button @click="showCreateDiv">Create a project now</button>
        </div>
    </div>
    <div v-else>B</div>
</template>

<script>
import { createProject } from '@/services/Projects.js';

export default {
    data() {
        return {
            showCreateInput: false,
            createdProjectName: null,
            errorText: null
        };
    },
    methods: {
        async showCreateDiv() {
            this.errorText = null;
            if (this.createdProjectName) {
                try {
                    const response = await createProject(this.createdProjectName);
                    this.$store.commit('addToUserProjects', {
                        name: response.name,
                        id: response.project_id
                    });
                } catch (err) {
                    this.errorText = 'There was an error!';
                    this.createdProjectName = null;
                }
            } else {
                this.showCreateInput = !this.showCreateInput;
            }
        }
    }
};
</script>

<style lang="scss">
.no-project {
    height: 100vh;

    img {
        width: 20%;
    }

    &-text {
        font-size: 1.4rem;
        font-weight: 600;
        text-align: center;

        span {
            text-decoration: underline;
            text-decoration-thickness: 0.2rem;
        }
    }

    .create-project {
        margin-top: 1rem;
        .project-input {
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

            &:hover {
                cursor: pointer;
            }
        }
    }
}
</style>
