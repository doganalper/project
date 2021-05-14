<template>
    <div class="create-comment flex-col">
        <textarea
            cols="20"
            rows="3"
            spellcheck="false"
            v-model="comment"
            placeholder="Enter your comment here and press Enter"
        >
        </textarea>
        <div class="create-comment-button">
            <button @click="createComment">Create</button>
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
            comment: null
        };
    },
    methods: {
        async createComment() {
            const response = await createComment(this.jobId, this.comment);
            this.comment = null;
            this.$emit('commentCreated', { ...response, isUser: true });
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
        text-align: end;
        margin-bottom: 0.4rem;
    }
}
</style>
