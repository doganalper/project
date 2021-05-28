<template>
    <modal name="requestDetail" :height="'auto'" @before-open="beforeOpen"> A </modal>
</template>

<script>
export default {
    methods: {
        async beforeOpen(event) {
            console.log(event.params.requestId);
        }
    }
};
</script>

<style></style>
