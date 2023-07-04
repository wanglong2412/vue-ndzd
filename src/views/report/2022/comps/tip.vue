<template>
  <div>
    <transition enter-active-class="animate__animated animate__fadeIn animate__slow"
                leave-active-class="animate__animated animate__fadeOut animate__slow">
      <div class="cyui-page-wrapper cyui-page-name"
           :style="{
                    ...{ paddingTop: `${statusbarHeight}px` }
                  }"
           v-if="`${current}` === `${sort}`">
        李晓春的个人年报
      </div>
    </transition>
    <transition enter-active-class="animate__animated animate__fadeInRight animate__normal"
                leave-active-class="animate__animated animate__fadeOutRight animate__faster">
      <div class="cyui-t-line"
           :style="{
                    ...{ top: `${(statusbarHeight + 38)}px` }
                  }"
           v-if="`${current}` === `${sort}`"></div>
    </transition>
  </div>
</template>

<script>
  import common from '@mixins/common'
  import { formatPx2Rem } from '@utils/index'
  export default {
    name: 'tip',
    mixins: [common],
    components: {},
    data() {
      return {}
    },
    props: {
      statusbarHeight: {
        type: String,
        require: true,
        default: '0'
      },
      current: {
        type: Number,
        require: true,
        default: -1
      },
      sort: {
        type: Number,
        require: true,
        default: 0
      }
    },
    computed: {},
    methods: {
      formatPx2Rem
    },
    watch: {},
    created() {},
    mounted() {}
  }
</script>

<style lang="less" scoped>
  @import '~@assets/styles/themes/default/index';
  @import '~@assets/styles/mixins/index';
  @import '~@assets/styles/mixins/page';
</style>
