<template>
    <div class="no-project screen-center fullscreen flex-col">
        <img src="/svg/searching.svg" />
        <span class="no-project-text">Lütfen bir proje oluşturun!</span>
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
            <button @click="showCreateDiv">Projeyi oluştur</button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            showCreateInput: false,
            createdProjectName: null,
            errorText: null
        };
    },
    methods: {
        showCreateDiv() {
            this.errorText = null;
            if (this.createdProjectName) this.$emit('createProject', this.createdProjectName);
            else this.showCreateInput = !this.showCreateInput;
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
            cursor: pointer;
        }
    }
}
</style>
