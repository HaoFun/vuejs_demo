<template>
    <div class="blog-container">
        <div class="blog-pages">
            <div class="col-md-12 panel">
                <div class="panel-body">
                    <h2 class="text-center">Article</h2>
                    <hr>
                    <div data-validator-form>
                        <div class="form-group">
                            <input v-model.trim="title" v-validator:blur.required="{ title: 'title' }" type="text" class="form-control" placeholder="Plesase enter article's title">
                        </div>
                        <div class="form-group">
                            <textarea id="editor"></textarea>
                        </div>
                        <br>
                        <div class="form-group">
                            <button class="btn btn-primary" type="submit" @click="post">
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import SimpleMDE from 'simplemde'
    import hljs from 'highlight.js'
    import ls from '@/utils/localStorage'

    window.hljs = hljs

    export default {
        name: 'Create',
        data() {
            return {
                title: '',
                content: ''
            }
        },
        mounted() {
            const simplemde = new SimpleMDE({
                element: document.querySelector('#editor'),
                placeholder: 'Please use markdown',
                spellChecker: false,
                autoDownloadFontAwesome: false,
                autosave: {
                    enabled: true,
                    uniqueId: 'vuejs-essential'
                },
                renderingConfig: {
                    codeSyntaxHighlighting: true
                }
            })

            simplemde.codemirror.on('change', () => {
                this.content = simplemde.value()
            })

            this.simplemde = simplemde
            this.fillContent()
        },
        methods: {
            saveTitle() {
                ls.setItem('smde_title', this.title)
            },
            fillContent() {
                const simplemde = this.simplemde
                const title = ls.getItem('smde_title')

                if (title !== null) {
                    this.title = title
                }

                this.content = simplemde.value()
            },
            post() {
                const title = this.title
                const content = this.content

                if (title !== '' && content.trim() !== '') {
                    const article = {
                        title,
                        content
                    }

                    this.$store.dispatch('post', { article })
                    this.clearData()
                }
            },
            clearData() {
                this.title = ''
                ls.removeItem('smde_title')
                this.simplemde.value('')
                this.simplemde.clearAutosavedValue()
            }
        }
    }
</script>

<style scoped>
    .blog-container {
        max-width: 980px;
        margin: 0 auto;
        margin-top: 20px;
    }
    .article-body {
        height: 200px;
    }
</style>