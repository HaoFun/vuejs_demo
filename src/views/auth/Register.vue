<template>
    <div class="row">
        <div class="col-md-4 col-md-offset-4 floating-box">
            <Message :show.sync="msgShow" :type="msgType" :msg="msg"/>
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">Register Page</h3>
                </div>
                <div class="panel-body" data-validator-form>
                    <div class="form-group">
                        <label for="username" class="control-label">User Name</label>
                        <input v-model.trim="username" v-validator:input.required="{ regex: /^[a-zA-Z]+\w*\s?\w*$/, error: '用戶名必須已英文字母為首' }" type="text" id="username" name="username" class="form-control" placeholder="write a user name">
                    </div>
                    <div class="form-group">
                        <label for="password" class="control-label">Password</label>
                        <input v-model.trim="password" v-validator:input.required="{ regex: /^\w{6,16}/, error: '密碼必須為 6 ~ 16 位'}" type="password" id="password" name="password" class="form-control" placeholder="write a password">
                    </div>
                    <div class="form-group">
                        <label for="password-confirm">Password Confirm</label>
                        <input v-model.trim="cpassword" v-validator:input.required="{ target: '#password' }" type="password" id="password-confirm" name="password-confirm" class="form-control" placeholder="write a confirm password">
                    </div>
                    <div class="form-group">
                        <label for="captcha">Captcha</label>
                        <input v-model.trim="captcha" v-validator:input.required="{ title: '圖片驗證碼' }" type="text" id="captcha" name="captcha" class="form-control" placeholder="write a captcha">
                    </div>
                    <div class="thumbnail" title="Reset captcha" @click="getCaptcha">
                        <div class="captcha vcenter" v-html="captchaTpl"></div>
                    </div>
                    <button type="submit" class="btn btn-lg btn-primary btn-block" @click="register">Submit</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import createCaptcha from '@/utils/createCaptcha'
    import ls from '@/utils/localStorage'

    export default {
        name: 'Register',
        data: () => ({
            captchaTpl: '',
            username: '',
            password: '',
            cpassword: '',
            captcha: '',
            msg: '',
            msgType: '',
            msgShow: false
        }),
        created() {
            this.getCaptcha()
        },
        methods: {
            getCaptcha() {
                const {tpl, captcha } = createCaptcha(6)
                this.captchaTpl = tpl
                this.localCaptcha = captcha
            },
            register(e) {
                this.$nextTick(() => {
                    const target = e.target.type === 'submit' ? e.target : e.target.parentElement
                    if (target.canSubmit) {
                        this.submit()
                    }
                })
            },
            submit() {
                if (this.captcha.toUpperCase() !== this.localCaptcha) {
                    this.showMsg('Captcha failed', 'warning')
                    this.getCaptcha()
                } else {
                    const user = {
                        name: this.username,
                        password: this.password
                    }
                    const localUser = ls.getItem('user')

                    if (localUser) {
                        if (localUser.name === user.name) {
                            this.showMsg('User exists', 'warning')
                        } else {
                            this.login(user)
                        }
                    } else {
                        this.login(user)
                    }
                }
            },
            login(user) {
                ls.setItem('user', user)
                this.showMsg('success', 'success')
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
    .thumbnail { width: 170px; margin-top: 10px; cursor: pointer;}
    .thumbnail .captcha { height: 46px; background: #E1E6E8;}
    .captcha { font-size: 24px; font-weight: bold; user-select: none;}
</style>