<template>
    <footer class="footer">
        <div class="container">
            <div class="row footer-top">
                <p class="padding-top-xsm">{{ description }}</p>
                <a v-for="item in contacts" href="#" v-title="item.title" :style="contactStyle">
                    <i :class="`fa fa-${item.icon}`"></i>
                </a>
            </div>
        </div>
    </footer>
</template>

<script>
    import title from '@/directives/title'

    export default {
        name: 'TheFooter',
        directives: {
            title
        },
        data() {
            return {
                description: 'Vue.js',
                contacts: [
                    {
                        icon: 'android',
                        title: 'android',
                    },
                    {
                        icon: 'apple',
                        title: 'apple',
                    },
                    {
                        icon: 'bath',
                        title: 'bath'
                    },
                    {
                        icon: 'bandcamp',
                        title: 'bandcamp'
                    }
                ],
                contactStyle: {
                    paddingRight: '20px'
                }
            }
        }
    }
</script>

<style scoped>
    .footer
    {
        padding-top: 0px;
        background: #4fc08d;
        bottom: 0;
        height: 50px;
        color: #ffffff;
    }
    a:hover, a:focus
    {
        color: #000000;
        transition: color .15s;
    }
</style>