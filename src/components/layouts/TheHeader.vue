<template>
    <div class="navbar navbar-default topnav">
        <div class="container">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" @click="toggleNav">
                    <span class="sr-only">Toggle</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>

                <router-link to="/" class="navbar-brand">
                    <span class="title">{{ logo.title}}</span>
                    <img :src="require(`@/assets/${logo.src}`)" :alt="logo.title">
                </router-link>
            </div>
            <div id="top-navbar-collapse" :class="['collapse', 'navbar-collapse', { in:showCollapsedNav }]">
                <ul class="nav navbar-nav">
                    <li v-for="(item, index ) in navList" :class="{ active: index === activeNavIndex}">
                        <a href="#" @click="changeNavIndex(index)">{{ item  }}</a>
                    </li>
                </ul>

                <div class="navbar-right">
                    <TheEntry/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import TheEntry from '@/components/layouts/TheEntry'

    export default {
        name: 'TheHeader',
        components: {
            TheEntry
        },
        data() {
            return {
                logo: {
                    src: 'logo.png',
                    title: 'vue.js'
                },
                navList: ['navBar1', 'navBar2', 'navBar3', 'navBar4'],
                activeNavIndex: 0,
                showCollapsedNav: false
            }
        },
        methods: {
            changeNavIndex(index) {
                this.activeNavIndex = index
            },
            toggleNav() {
               this.showCollapsedNav = !this.showCollapsedNav
            }
        }
    }
</script>

<style scoped>
    .title
    {
        display: none;
    }
    .navbar-default .navbar-nav > .active > a
    {
        background: #4fc08d;
        color: #ffffff;
    }
</style>