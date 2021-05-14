<template>
  <div class="create-subjob">
      <input v-model="subJobName" placeholder="Enter sub job name" @keyup.enter="createSubJobHandler" />
  </div>
</template>

<script>
import {createSubJob} from '@/services/Job.js';

export default {
  props: {
    jobId: {
      type: String
    }
  },
  data() {
    return {
      subJobName: null
    }
  },
  methods: {
    async createSubJobHandler() {
      if(this.subJobName) {
        const response = await createSubJob(this.jobId, this.subJobName);
        this.subJobName = null;
        this.$emit('subJobCreated', response);
      }
    }
  }
}
</script>

<style lang="scss">
.create-subjob {
  input {
    width: 100%;
    border: 1px solid lightgrey;
    padding: 0.3rem
  }
}
</style>
