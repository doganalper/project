<template>
    <modal name="psswdModal" :height="'auto'" :scrollable="true">
        <div class="modal-div flex-col">
            <span class="modal-div-header">Change Password</span>
            <input v-model="oldPass" type="password" placeholder="Old Password" />
            <input v-model="newPass1" type="password" placeholder="New Password" />
            <input v-model="newPass2" type="password" placeholder="Re-enter Password" />
            <span class="modal-div-errorText" v-if="errorText">
                {{ errorText }}
            </span>
            <button @click="changePasswordHandler">Change Password</button>
        </div>
    </modal>
</template>

<script>
import { changePassword } from '@/services/User';

export default {
    data() {
        return {
            oldPass: null,
            newPass1: null,
            newPass2: null,
            errorText: null
        };
    },
    methods: {
        async changePasswordHandler() {
            if (this.newPass1 === this.newPass2) {
                try {
                    await changePassword({
                        oldPassword: this.oldPass,
                        newPassword1: this.newPass1,
                        newPassword2: this.newPass2
                    });
                    this.errorText = null;
                    this.oldPass = null;
                    this.newPass1 = null;
                    this.newPass2 = null;
                    this.$modal.hide('psswdModal');
                } catch (error) {
                    console.log(error);
                    this.errorText = 'Old password is wrong!';
                }
            } else {
                this.errorText = 'New passwords doesnt match!';
            }
        }
    }
};
</script>

<style lang="scss">
.modal-div {
    padding: 1rem;

    &-header {
        margin-bottom: 0.7rem;
    }

    input {
        margin-bottom: 0.7rem;
        padding: 0.4rem;
        border: 1px solid lightgray;
    }

    &-errorText {
        margin-bottom: 0.3rem;
    }

    button {
        font-size: 1rem;
        background-color: lightgreen;
        cursor: pointer;
        border: none;
        padding: 0.3rem 0;
        width: 30%;
        border-radius: 1rem;
        margin: 0 auto;
    }
}
</style>
