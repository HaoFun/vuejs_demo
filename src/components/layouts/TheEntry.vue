<template>
    <div class="navbar-right">
        <ul v-if="auth" class="nav navbar-nav github-login">
            <li>
                <a v-dropdown href="javscript:;">
                    <i class="fa fa-plus text-md"></i>
                </a>
                <ul class="dropdown-menu">
                    <li>
                        <router-link to="/articles/create">
                            <i class="fa fa-paint-brush text-md"></i>
                            Create post
                        </router-link>
                    </li>
                </ul>
            </li>
            <li>
                <a v-dropdown href="javascript:;">
                    <span v-if="user">
                        <span v-if="user.name">{{ user.name }}</span>
                    </span>
                    <span v-else>
                        Null
                    </span>
                    <span class="caret"></span>
                </a>
                <ul class="dropdown-menu">
                    <li>
                        <router-link to="/users/1/edit">
                            <i class="fa fa-cog text-md i-middle"></i>
                            Edit
                        </router-link>
                    </li>
                    <li>
                        <a href="javascript:;" @click="logout">
                            <i class="fa fa-sign-out text-md"></i> Logout
                        </a>
                    </li>
                </ul>
            </li>
        </ul>
        <div v-else class="nav navbar-nav github-login">
            <router-link to="/auth/login" class="btn btn-default login-btn">
                <i class="fa fa-user"></i>Login
            </router-link>

            <router-link to="/auth/register" class="btn btn-default login-btn">
                <i class="fa fa-user-plus"></i>Register
            </router-link>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
        name: 'TheEntry',
        computed: {
            ...mapState([
                'auth',
                'user'
            ])
        },
        methods: {
            logout() {
                this.$swal({
                    text: 'Logout ?',
                    confirmButtonText: 'Yes'
                }).then((res) => {
                    if (res.value) {
                        this.$store.dispatch('logout')
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>