<template>
    <div class="users-show">
        <div class="col-md-3 main-col">
            <div class="box">
                <div class="padding-md">
                    <div class="list-group text-center">
                        <router-link v-for="link in links" :key="link.name" :to="`/users/1/${link.name}`" class="list-group-item">
                            <i :class="`text-md fa fa-${link.icon}`"></i>
                            {{ link.title }}
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
        <router-view/>
    </div>
</template>

<script>
export default {
    name: 'UsersEdit',
    data() {
        return {
            links: [
                {
                    name: 'edit',
                    title: 'change info',
                    icon: 'list-alt'
                },
                {
                    name: 'edit_avatar',
                    title: 'change avatar',
                    icon: 'image'
                },
                {
                    name: 'edit_password',
                    title: 'change password',
                    icon: 'lock'
                }
            ]
        }
    }
}
</script>

<style scoped>
    .floating-box {
        margin-top: 0px;
    }
</style>