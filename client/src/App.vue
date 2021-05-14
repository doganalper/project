<template>
    <div class="full-screen">
        <router-view />
    </div>
</template>
<style lang="scss">
* {
    font-family: 'Gill Sans', sans-serif;
    box-sizing: border-box;

    &:focus {
        outline: none;
    }

    &::selection {
        background-color: white;
    }

    textarea {
        resize: none;

        &::selection {
            background-color: lightskyblue;
            color: white;
        }
    }

    .input-enter,
    .input-leave-to {
        visibility: hidden;
        width: 0;
        margin: 0;
        padding: 0;
        opacity: 0;
    }

    .input-enter-active,
    .input-leave-active {
        transition: all 0.2s ease-out;
    }
}
</style>
