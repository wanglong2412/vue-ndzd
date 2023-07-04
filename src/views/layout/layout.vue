<template>
  <div class="cyui-layout">
    <router-view name="headerView"></router-view>
    <keep-alive :include="cachedViews">
      <router-view :key="key"></router-view>
    </keep-alive>
    <router-view name="tabbarView"></router-view>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'Layout',
    components: {},
    props: {},
    data() {
      return {}
    },
    computed: {
      ...mapGetters('keepAlive', [
        'cachedViews'
      ]),
      key() {
        return this.$route.path
      }
    },
    created() {
    },
    watch: {
      cachedViews: {
        handler: function(newVal, oldVal) {
          // console.log(newVal)
        }
      }
    },
    methods: {},
    beforeRouteEnter(to, from, next) {
      // console.log(to)
      // console.log(from)
      next()
    },
    beforeRouteUpdate(to, from, next) {
      // console.log(to)
      // console.log(from)
      next()
    },
    beforeRouteLeave(to, from, next) {
      // console.log(to)
      // console.log(from)
      next()
    }
  }
</script>
<style lang="less" scoped>
  @import '../../assets/styles/themes/default/index';
  @import '../../assets/styles/mixins/index';
</style>
