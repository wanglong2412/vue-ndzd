<template>
  <div class="back-home" @click="goHome">
    <svg-icon icon-class="home"></svg-icon>
  </div>
</template>

<script>
  export default {
    name: 'BackHome',
    components: {},
    data () {
      return {}
    },
    props: {},
    computed: {},
    created () {
    },
    methods: {
      goHome () {
        this.$router.push({
          name: 'UserIndex',
          query: {}
        })
      }
    },
    watch: {},
    beforeRouteEnter (to, from, next) {
      // console.log(to)
      // console.log(from)
      next()
    },
    beforeRouteUpdate (to, from, next) {
      // console.log(to)
      // console.log(from)
      next()
    }
  }
</script>

<style lang="less" scoped>
  @import '../../assets/styles/themes/default/index';
  @import '../../assets/styles/mixins/index';

  .back-home {
    position: fixed;
    right: 15px;
    bottom: 20px;
    width: 40px;
    height: 40px;
    background-color: #fff;
    border: 1px solid @brand-primary;
    border-radius: 100%;
    z-index: 1000;

    .svg-icon {
      position: absolute;
      left: 50%;
      top: 50%;
      fill: @brand-primary;
      display: inline-block;
      width: 30px;
      height: 30px;
      transform: translate(-50%, -50%);
    }
  }
</style>
