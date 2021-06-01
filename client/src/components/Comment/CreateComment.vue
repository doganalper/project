<template>
    <div class="create-comment flex-col">
        <textarea
            cols="20"
            rows="3"
            spellcheck="false"
            v-model="comment"
            placeholder="Bir yorum giriniz!"
        >
        </textarea>
        <div class="create-comment-button">
            <input type="file" class="file" ref="file" @change="onSelect" />
            <unicon name="paperclip" fill="blue" width="18" class="clip" @click="addFile" />
            <button @click="createComment">Yorum Oluştur</button>
        </div>
    </div>
</template>

<script>
import { createComment } from '@/services/Job.js';

export default {
    props: {
        jobId: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            comment: null,
            file: null
        };
    },
    methods: {
        async createComment() {
            const response = await createComment(this.jobId, this.comment);
            this.comment = null;
            this.$emit('commentCreated', { ...response, isUser: true });
        },
        addFile() {
            this.$refs.file.click();
        },
        onSelect() {
            const file = this.$refs.file.files[0];
            this.file = file;
        }
    }
};
</script>

<style lang="scss">
.create-comment {
    textarea {
        margin: 0.4rem 0;
        padding: 0.3rem;
        border-color: lightgrey;

        &:focus {
            border-color: black;
        }
    }
    &-button {
        display: flex;
        flex-flow: row;
        align-items: center;
        justify-content: flex-end;
        .clip {
            margin-right: 0.5rem;
        }
        input {
            visibility: hidden;
        }
        margin-bottom: 0.4rem;
    }
}
</style>
