<template>
    <modal name="requestDetail" :height="'auto'" @before-open="beforeOpen">
        <div class="request-detail" v-if="requestInfo">
            <div class="request-detail-header flex-row">
                <div class="left flex-row">
                    {{ requestInfo.header }}
                    <unicon name="times" fill="red" width="17" @click="removeRequestHandler" />
                </div>
                <unicon
                    name="check-circle"
                    :fill="requestInfo.isFinished ? 'green' : 'red'"
                    width="17"
                    class="subJob-check"
                    @click="changeRequestStatusHandler"
                />
            </div>
            <div class="request-detail-details flex-col">
                <span class="creator">Created By: {{ requestInfo.creator }}</span>
                <span class="dueDate">Created At: {{ parseDate(requestInfo.createdDate) }}</span>
                <span
                    class="dueDate"
                    :style="
                        Math.ceil(
                            Math.abs(new Date() - new Date(requestInfo.dueDate)) /
                                (1000 * 60 * 60 * 24)
                        ) < 4
                            ? { color: 'red' }
                            : { color: 'green' }
                    "
                    >Due Date: {{ parseDate(requestInfo.dueDate) }} ({{
                        Math.ceil(
                            Math.abs(new Date() - new Date(requestInfo.dueDate)) /
                                (1000 * 60 * 60 * 24)
                        )
                    }}
                    days left)</span
                >
            </div>
            <div class="request-detail-comments flex-row" @click="isCommentsOpen = !isCommentsOpen">
                <span>Comments:</span>
                <unicon :name="isCommentsOpen ? 'angle-down' : 'angle-up'" />
            </div>
            <div class="request-detail-create-comment flex-col" v-if="isCommentsOpen">
                <textarea
                    cols="20"
                    rows="3"
                    spellcheck="false"
                    v-model="comment"
                    placeholder="Enter your comment here"
                >
                </textarea>
                <div class="create-comment-button flex-row">
                    <button @click="createCommentHandler">Add</button>
                    <unicon name="paperclip" fill="blue" width="18" class="clip" @click="addFile" />
                    <input type="file" class="file" ref="file" @change="onSelect" />
                </div>
            </div>
            <div class="request-detail-comments-list flex-col" v-if="isCommentsOpen">
                <div
                    class="comment flex-row"
                    v-for="comment in requestInfo.comments"
                    :key="comment._id"
                >
                    <span class="name"
                        >{{
                            comment.user.name
                                ? comment.user.name + ' ' + comment.user.surname
                                : comment.user
                        }}:
                    </span>
                    <span class="content">{{ comment.content }}</span>
                </div>
            </div>
        </div>
    </modal>
</template>

<script>
import {
    getRequestInfo,
    changeRequestStatus,
    createRequestComment,
    removeRequest
} from '@/services/Guest.js';

export default {
    data() {
        return {
            requestInfo: null,
            eventId: null,
            isCommentsOpen: false,
            comment: null,
            file: null
        };
    },
    methods: {
        async beforeOpen(event) {
            this.eventId = event.params.requestId;
            const response = await getRequestInfo(this.eventId);
            this.requestInfo = response;
            console.log(this.requestInfo);
        },
        parseDate(date) {
            return new Date(date).toDateString();
        },
        async changeRequestStatusHandler() {
            await changeRequestStatus(this.eventId);
            this.requestInfo.isFinished = !this.requestInfo.isFinished;
        },
        async createCommentHandler() {
            if (this.comment) {
                const payload = {
                    requestId: this.eventId,
                    content: this.comment,
                    userId: this.$store.state.userData.userId,
                    userType: localStorage.getItem('userType')
                };
                const response = await createRequestComment(payload);
                console.log(this.$store.state.userData.name);
                const newComment = {
                    ...response,
                    user: this.$store.state.userData.name
                };
                this.comment = null;
                this.requestInfo.comments.push(newComment);
            }
        },
        async removeRequestHandler() {
            const response = await removeRequest(this.requestInfo._id, this.requestInfo.projectId);
            console.log(response);
            this.$emit('requestDeleted', this.requestInfo._id);
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
.request-detail {
    padding: 1rem;
    &-header {
        border-bottom: 1.5px solid lightgray;
        margin-bottom: 0.5rem;
        align-items: center;
        justify-content: space-between;

        .left {
            align-items: center;
        }
    }
    &-details {
        row-gap: 0.4rem;
    }
    &-comments {
        margin-top: 0.4rem;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid lightgray;
        cursor: pointer;
    }
    &-comments-list {
        padding-top: 0.5rem;
        row-gap: 0.3rem;
        .comment {
            align-items: center;
            font-size: 0.9rem;
            padding-top: 0.3rem;
            border-top: 0.5px solid lightgray;
            .name {
                padding-right: 0.5rem;
            }
            .content {
                padding-left: 0.5rem;
            }
        }
    }
    &-create-comment {
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
    .clip {
        margin-left: 0.6rem;
        cursor: pointer;
    }
    .file {
        visibility: hidden;
    }
}
</style>
