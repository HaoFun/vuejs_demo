<template>
    <div class="col-md-9 left-col">
        <div class="panel panel-default padding-md">
            <div class="panel-body">
                <h2><i class="fa fa-cog"></i>Edit user</h2>
                <hr>
                <div class="form-horizontal" data-validator-form>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">Username</label>
                        <div class="col-sm-6">
                            <input v-model.trim="username" v-validator:input.required="{title:'username', regex: /^[a-zA-Z]+\w*\s?\w*$/, error: 'username failed'}" type="text" class="form-control">

                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">Sex</label>
                        <div class="col-sm-6">
                            <select v-model="sex" class="form-control">
                                <option value="">null</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">Hobby</label>
                        <div class="col-sm-6">
                            <label class="checkbox-inline">
                                <input v-model="hobbies" value="music" type="checkbox"> music
                            </label>
                            <label class="checkbox-inline">
                                <input v-model="hobbies" value="game" type="checkbox"> game
                            </label>
                            <label class="checkbox-inline">
                                <input v-model="hobbies" value="hiking" type="checkbox"> hiking
                            </label>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">info</label>
                        <div class="col-sm-6">
                            <textarea v-model.trim="introduction" type="text" class="form-control"></textarea>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-offset-2 col-sm-6">
                            <button type="submit" class="btn btn-primary" @click="updateProfile">Edit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'EditProfile',
        data() {
            return {
                username: '',
                sex: '',
                hobbies: [],
                introduction: ''
            }
        },
        created() {
            const user = this.$store.state.user
            if (user && typeof user === 'object') {
                const { name, sex, hobbies, introduction } = user

                this.username = name
                this.sex = sex || this.sex
                this.hobbies = hobbies || this.hobbies
                this.introduction = introduction

            }
        },
        methods: {
            updateProfile(e) {
                this.$nextTick(() => {
                    if (e.target.canSubmit) {
                        this.$store.dispatch('updateUser', {
                            name: this.username,
                            sex: this.sex,
                            hobbies: this.hobbies,
                            introduction: this.introduction
                        })
                        this.$message.show('Updated success')
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>