<template>
  <div class="cyui-layout-wrapper">
    <cyui-layout>
      <template #header>
        <div class="cyui-header-wrapper"
             v-if="isCustomHeader"
             :style="{
            ...{ paddingTop: `${statusbarHeight}px` }
          }">
          <cyui-header :title="headerTitle"
                       @go-back="goBack"
                       @on-close="handleClosePage"
                       style="background-color: transparent;">
            <template #headerRight>
              <div></div>
            </template>
          </cyui-header>
        </div>
      </template>
      <template #default>
        <div class="cyui-home">
          <div class="haibao">
            <div class="btn"
                 @click="goGrnb"></div>
            <div class="tel1"
                 @click="callTell('1')"></div>
            <div class="tel2"
                 @click="callTell('2')"></div>
            <!-- <img src="@assets/images/grnb/grnb_text.png"
                 alt=""
                 class="bimg" /> -->
            <div class="test_enter"
                 @click="test_enter()"></div>
          </div>
        </div>
      </template>
    </cyui-layout>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import common from '@mixins/common'
  import { getStatusBarHeight } from '@utils/mxApi'
  export default {
    name: 'HomeIndex',
    mixins: [common],
    data() {
      return {
        headerTitle: '',
        statusbarHeight: '0' // 状态栏高度
      }
    },
    props: {},
    computed: {
      ...mapGetters(['userName', 'avatar', 'departmentName'])
    },
    methods: {
      async initData() {},
      goGrnb() {
        this.$router.push({
          name: 'Report2021'
        })
      },
      callTell(v) {
        if (v === '1') {
          window.location.href = 'tel://15051982986'
        } else {
          window.location.href = 'tel://18261168778'
        }
      },
      test_enter() {
        this.$router.push({
          name: 'Report2022'
        })
      }
    },
    filters: {},
    watch: {},
    created() {},
    mounted() {
      // 适配头部
      getStatusBarHeight({
        onlyStatusBar: true
      })
        .then((response) => {
          console.log('response', response)
          this.statusbarHeight = response
        })
        .catch((error) => {
          console.log(error)
        })
    },
    beforeRouteEnter(to, from, next) {
      next()
    },
    beforeRouteUpdate(to, from, next) {
      next()
    }
  }
</script>

<style lang="less" scoped>
  @import '../../assets/styles/themes/default/index';
  @import '../../assets/styles/mixins/index';

  @profilePrefixCls: ~'@{css-prefix}profile';

  .@{css-prefix}layout{
    // background: url('../../assets/images/grnb/grnb_bg.png') no-repeat;
    background-size: cover;
    background-attachment: fixed;
    margin: 0;
  }

  .@{css-prefix}home{
    font-size: 0;
    height: calc(100vh - 44px);
    margin-top: -44px;
    display: flex;
    align-items: center;
    .haibao{
      position: relative;

    }
    .bimg{
      width: 100%;
    }
    .btn{
      position: absolute;
      width: 100%;
      height: 40px;
      font-size: 20px;
      top: 340px;
      left: 0;
      z-index: 99;
    }
    .tel1{
      position: absolute;
      width: 160px;
      height: 30px;
      font-size: 20px;
      top: 540px;
      left: 120px;
      z-index: 99;
    }
    .tel2{
      position: absolute;
      width: 160px;
      height: 30px;
      font-size: 20px;
      top: 580px;
      left: 120px;
      z-index: 99;
    }
  }
  .test_enter{
    position: absolute;
    width: 100%;
    height: 40px;
    font-size: 20px;
    top: 190px;
    left: 0;
    z-index: 99;
  }
</style>
