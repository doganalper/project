<template>
  <div v-if="userInfo" class="comment flex-row">
      <div class="comment-userImage">
        <span v-if="userInfo.userImage">
          {{getNameFirsts(userInfo.name, userInfo.surname)}}
        </span>
        <!-- <img v-else :src="userInfo.userImage"> -->
      </div>
      <span class="comment-content">
        {{comment.content}}
      </span>
      <span class="comment-isUser">
        <unicon name="trash-alt" fill="red" width="18" v-if="comment.isUser" @click="removeComment"/>
      </span>
  </div>
</template>

<script>
import Axios from '@/utils/Axios';
import {removeComment} from '@/services/Job.js';

export default {
  props: {
    comment: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      userInfo: null
    }
  },
  methods: {
    getNameFirsts(name, surname) {
      const first = name.charAt(0);
      const second = surname.charAt(0);
      return `${first}${second}`;
    },
    async removeComment() {
      const removedComment = await removeComment(this.comment._id);
      console.log(removedComment);
      this.$emit('commentRemoved', removedComment.commentId);
    }
  },
  async mounted() {
    const response = await Axios.post(`/user/get-user`, {userId: this.comment.userId});
    const userInfo = response.data;
    console.log(userInfo);
    this.userInfo = userInfo;
  }
}
</script>

<style lang="scss">
.comment {
  justify-content: space-between;
  margin-bottom: 1rem;
  align-items: center;

  &:last-of-type {
    margin-bottom: 0.2rem;
  }
  &-userImage {
    width: 7%;
    align-self: flex-start;
    padding-top: 0.2rem;
  }
  &-content {
    width: 100%;
    align-self: flex-start;
  }
  &-isUser {
    margin-left: 1rem;
    width: 7%;
    align-self: flex-start;
  }
}
</style>