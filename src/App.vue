<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'App',
    mixins: [],
    components: {},
    data() {
      return {
        loading: {}
      }
    },
    props: {},
    computed: {
      ...mapState('base', {
        isLoading: state => state.isLoading
      })
    },
    methods: {},
    watch: {
      isLoading(newVal, oldVal) {
        if (newVal) {
          this.$toast.allowMultiple()
          this.loading = this.$toast.loading({
            className: 'cyui-loading',
            duration: 0, // 持续展示 toast
            forbidClick: true, // 禁用背景点击
            loadingType: 'spinner',
            message: '加载中...'
          })
        } else {
          this.loading.clear()
        }
      }
    },
    created() {
    },
    mounted() {
    }
  }
</script>

<style lang="less" scoped>
  #app {
    width: 100%;
    height: 100%;
  }
</style>
