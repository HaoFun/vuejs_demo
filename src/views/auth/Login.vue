<template>
    <div class="row">
        <div class="col-md-4 col-md-offset-4 floating-box">
            <Message :show.sync="msgShow" :type="msgType" :msg="msg"/>
            <div class="panel panel-default">
                 <div class="panel-heading">
                     <h3 class="panel-title">Login Page</h3>
                 </div>
                
                <div class="panel-body" data-validator-form>
                    <div class="form-group">
                        <label class="control-label">Username</label>
                        <input v-model.trim="username" v-validator.required="{title: 'username'}" type="text" class="form-control" placeholder="Please enter your username">
                    </div>
                    <div class="form-group">
                        <label class="control-label">Password</label>
                        <input v-model.trim="password" v-validator.requried="{title: 'password'}" type="password" class="form-control" placeholder="Please enter your password">
                    </div>
                    <br>
                    <button @click="login" type="submit" class="btn btn-lg btn-success btn-block">
                        <i class="fa fa-btn fa-sign-in">Login</i>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Login',
        data() {
            return {
                username: '',
                password: '',
                msg: '',
                msgType: '',
                msgShow: false
            }
        },
        methods: {
            login(e) {
                this.$nextTick(() => {
                    const target = e.target.type === 'submit' ? e.target: e.target.parentElement

                    if (target.canSubmit) {
                        this.submit()
                    }
                })
            },
            submit() {
                const user = {
                    name: this.username,
                    password: this.password
                }
                const localUser = this.$store.state.user

                if (localUser) {
                    if (localUser.name !== user.name || localUser.password !== user.password) {
                        this.showMsg('Username or password failed.');
                    } else {
                        this.$store.dispatch('login')
                    }
                } else {
                    this.showMsg('Not found user.');
                }
            },
            showMsg(msg, type = 'warning') {
                this.msg = msg
                this.msgType = type
                this.msgShow = false

                this.$nextTick(() => {
                    this.msgShow = true
                })
            }
        }
    }
</script>

<style scoped>
    .floating-box {
        margin-top: 0px;
    }
</style>