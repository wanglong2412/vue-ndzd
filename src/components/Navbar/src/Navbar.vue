<template>
  <div class="cyui-navbar">
    <div class="cyui-navbar-body">
      <van-tabs ref="tab"
                v-model="tabValue"
                :swipe-threshold="swipeThreshold"
                :lazy-render="lazyRender"
                @click="handleTabClick"
                @change="handleTabChange"
                @disabled="handleTabDisabled"
                @rendered="handleTabRendered"
                @scroll="handleTabScroll">
        <van-tab v-for="(item, index) in listData"
                 :key="`tab${index}`"
                 :name="item[props.id]"
                 :disabled="!!item[props.disabled]">
          <template #title>
            <slot name="title" :item="item">
              <div class="cyui-navbar-title cyui-badge">
                <slot name="titleIcon" :item="item" :icon="item[props.icon]">
                  <div class="cyui-navbar-title-icon" v-if="showTitleIcon">
                    <img :src="item[props.icon]" alt="">
                  </div>
                </slot>
                <slot name="titleText" :title="item[props.title]">
                  <div class="cyui-navbar-title-text">{{item[props.label]}}</div>
                </slot>
                <slot name="titleNumber" :item="item" :number="item[props.number]">
                  <div class="cyui-navbar-title-number" v-if="showTitleNumber && item[props.number] > 0">
                    {{item[props.number]}}
                  </div>
                </slot>
                <slot name="titleDot" :item="item">
                  <span class="cyui-badge-dot" v-if="showTitleDot && item[props.dot]"></span>
                </slot>
              </div>
            </slot>
          </template>
        </van-tab>
      </van-tabs>
    </div>
    <div class="cyui-navbar-right" v-if="showNavbarRight">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'Navbar',
    mixins: [],
    components: {},
    data() {
      return {
        tabValue: ''
      }
    },
    props: {
      value: {
        type: [String, Number],
        default: ''
      },
      listData: {
        type: Array,
        default() {
          return []
        }
      },
      lazyRender: {
        type: Boolean,
        default: true
      },
      swipeThreshold: {
        type: [Number, String],
        default: 3
      },
      showTitleIcon: {
        type: Boolean,
        default: false
      },
      showTitleNumber: {
        type: Boolean,
        default: false
      },
      showTitleDot: {
        type: Boolean,
        default: false
      },
      showNavbarRight: {
        type: Boolean,
        default: false
      },
      props: {
        type: Object,
        default() {
          return {
            id: 'id',
            label: 'label',
            disabled: 'disabled',
            icon: 'icon',
            number: 'number',
            dot: false
          }
        }
      }
    },
    computed: {},
    methods: {
      handleTabClick(name, title) {
        this.$emit('click', {
          name,
          title
        })
      },
      handleTabChange(name, title) {
        this.$emit('input', name)
        this.$emit('change', {
          name,
          title
        })
      },
      handleTabDisabled(name, title) {
        this.$emit('disabled', {
          name,
          title
        })
      },
      handleTabRendered(name, title) {
        this.$emit('rendered', {
          name,
          title
        })
      },
      handleTabScroll({ scrollTop, isFixed }) {
        this.$emit('scroll', {
          scrollTop,
          isFixed
        })
      },
      async initData() {
      }
    },
    watch: {
      value: {
        handler: function (newVal, oldVal) {
          if (newVal !== this.tabValue) {
            this.tabValue = newVal
          }
        },
        immediate: true
      },
      listData: {
        handler: function (newVal, oldVal) {
          this.$refs.tab && this.$refs.tab.resize() // 每次格式化列表数据后对tab栏目进行重绘
        },
        deep: true
      }
    },
    created() {
      this.initData()
    },
    mounted() {
    }
  }
</script>

<style lang="less" scoped>
  @import '../../../assets/styles/themes/default/index';
  @import '../../../assets/styles/mixins/index';

  @navbarPrefixCls: ~'@{css-prefix}navbar';

  .@{navbarPrefixCls} {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 44px;

    &-body {
      flex: 1;
      min-width: 0;
      padding-right: 0;

      & /deep/ .van-tabs {
        &.van-tabs--line {

          .van-tabs__wrap {
            height: 44px;

            .van-tabs__nav {
              align-items: center;
              background-color: transparent;
            }

            .van-tab {
              position: relative;
              height: 34px;
              line-height: 24px;
              padding: 0 15px;
              font-size: 15px;
              font-weight: 400;
              color: #B9B9B9;

              &.van-tab--active {
                font-weight: 600;
                color: #A67342;

                .@{css-prefix}navbar-title {
                  &-number {
                    background: linear-gradient(225deg,
                    rgba(215, 183, 134, 1) 0%,
                    rgba(207, 158, 116, 1) 100%);
                  }
                }
              }
            }
          }
        }

        .van-tabs__nav--line {
          padding: 0;

          .van-tabs__line {
            bottom: 0;
            background: linear-gradient(90deg, rgba(205, 138, 110, 1) 0%, rgba(205, 166, 110, 1) 100%);
          }
        }
      }
    }

    &-right {
      position: relative;
      padding: 0 15px;

      .hairline('left', 1PX, #E3E3E3);
    }

    & &-btn {
      position: relative;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      align-self: stretch;
      height: 24px;
      line-height: 24px;
      font-size: 15px;
      text-align: center;
      color: #333333;

      .@{navbarPrefixCls}-btn-icon {
        position: relative;
        display: block;
        color: inherit;

        .svg-icon {
          position: relative;
          top: 4px;
          width: 16px;
          height: 16px;
          line-height: 1;
          vertical-align: top;
        }
      }

      .@{navbarPrefixCls}-btn-label {
        display: block;
        line-height: 1;
        font-size: 15px;
        color: #333333;
        text-align: center;
      }

      .@{navbarPrefixCls}-btn-label + .@{navbarPrefixCls}-btn-icon {
        margin-left: 3px;
      }

      & + & {
        padding-left: 10px;
      }

      &.is-selected {
        color: #A67342;

        .@{navbarPrefixCls}-btn-label {
          color: #A67342;
        }
      }
    }
  }

  .@{css-prefix}navbar-title {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 34px;
    line-height: 24px;
    padding: 0 5px;

    &-icon {
      > img {
        display: block;
        width: 16px;
        height: 16px;
        line-height: 1;
      }
    }

    &-number {
      position: relative;
      top: -1px;
      min-width: 20px;
      height: 20px;
      margin-left: 5px;
      padding: 0 5px;
      line-height: 22px;
      font-size: 13px;
      color: #FFFFFF;
      text-align: center;
      border-radius: 10px 10px 10px 0;
      background: linear-gradient(221deg,
      rgba(227, 224, 224, 1) 0%,
      rgba(197, 197, 197, 1) 100%);
    }

    .@{css-prefix}badge-dot {
      position: absolute;
      top: 3px;
      right: 2px;
      width: 9px;
      height: 9px;
      background: rgba(197, 36, 47, 1);
      border: 1PX solid #FFFFFF;
      border-radius: 50%;
      transform: translateX(0%);
    }
  }
</style>
