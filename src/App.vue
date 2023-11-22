<template>
    <div id="app">
        <container></container>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import Container from './components/Container.vue'

    @Component({
        components: {
            Container
        }
    })
    export default class App extends Vue { }
</script>

<style>
</style>
