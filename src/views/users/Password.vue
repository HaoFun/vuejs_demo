<template>
    <div class="col-md-9 left-col">
        <div class="panel panel-default padding-md">
            <div class="panel-body">
                <h2><i class="fa fa-lock"></i> Change Password</h2>
                <hr>
                <div class="form-horizontal" data-validator-form>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">Password</label>
                        <div class="col-sm-6">
                            <input v-model.trim="password" id="password" v-validator.required="{ title:'password', regex: /^\w{6,16}$/, error: 'password length must to 6 ~ 16 char.' }" type="password" class="form-control" placeholder="Please enter password">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">Confirm password</label>
                        <div class="col-sm-6">
                            <input v-model.trim="cpassword" v-validator.required="{ title:'cpassword', target: '#password' }" type="password" class="form-control" placeholder="Please enter confirm password">
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-offset-2 col-sm-6">
                            <button type="submit" class="btn btn-primary" @click="updatePassword">Edit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'EditPassword',
        data() {
            return {
                password: '',
                cpassword: ''
            }
        },
        created() {
            const user = this.$store.state.user

            if (user && typeof user === 'object') {
                this.password = user.password
            }
        },
        methods: {
            updatePassword(e) {
                this.$nextTick(() => {
                    if (e.target.canSubmit) {
                        this.$store.dispatch('updateUser', { password: this.password })
                        this.$message.show('Update password success')
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>