<template>
  <van-popup
    v-model="popupShow"
    position="bottom"
    @click-overlay="handleClickOverlay">
    <div>
      <div class="popup-calendar">
        <div class="popup-calendar-header">
          <div class="popup-calendar-header-left" @click="onCancel">
            取消
          </div>
          <div class="popup-calendar-header-title">
            <slot name="title">请选择</slot>
          </div>
          <div class="popup-calendar-header-right" @click="onConfirm">
            确定
          </div>
        </div>
        <div class="popup-calendar-body">
          <calendar
            v-model="currentValue"
            :start-date="startDate"
            :end-date="endDate"
            @on-change="onCalendarValueChange"></calendar>
        </div>
      </div>
    </div>
  </van-popup>
</template>

<script>
  import Calendar from '@components/Calendar'

  export default {
    name: 'PopupCalendar',
    mixins: [],
    components: {
      Calendar
    },
    props: {
      show: {
        type: Boolean,
        default: false
      },
      value: {
        type: [String, Array],
        default: () => ('')
      },
      startDate: {
        type: [String],
        default: ''
      },
      endDate: {
        type: [String],
        default: ''
      }
    },
    data () {
      return {
        popupShow: false,
        currentValue: ''
      }
    },
    computed: {},
    methods: {
      handleClickOverlay () {
        this.$emit('cancel', {})
      },
      onCancel () {
        this.popupShow = false
        this.$emit('cancel', {})
      },
      onConfirm () {
        let { currentValue } = this
        this.popupShow = false
        this.$emit('input', currentValue)
        this.$emit('confirm', currentValue)
      },
      onCalendarValueChange (val) {
        this.$emit('change', val)
      },
      initData () {
      }
    },
    watch: {
      show: {
        handler: function (newVal, oldVal) {
          this.popupShow = newVal
          if (newVal) {
            let { value } = this
            if (typeof value === 'string') {
              if (value !== this.currentValue) {
                this.currentValue = value
              }
            } else {
              if (JSON.stringify(value) !== JSON.stringify(this.currentValue)) {
                this.currentValue = JSON.parse(JSON.stringify(value))
              }
            }
          }
        },
        immediate: true
      },
      popupShow (newVal, oldVal) {
        // console.log(newVal)
        this.$emit('update:show', newVal)
      }
    },
    created () {
    },
    mounted () {
      this.initData()
    }
  }
</script>

<style lang="less" scoped>
  @import '../../../assets/styles/themes/default/index';
  @import '../../../assets/styles/mixins/index';

  @theme-color: @brand-primary;
  @popup-header-height: 44px;
  @popup-header-bg-color: #fff;
  @popup-header-font-size: 14px;
  @popup-header-left-text-color: @theme-color;
  @popup-header-right-text-color: @theme-color;
  @popup-header-title-text-color: #222;
  @popup-header-left-text-padding: 15px;
  @popup-header-right-text-padding: 15px;

  .popup-calendar-header {
    position: relative;
    display: flex;
    height: @popup-header-height;
    line-height: @popup-header-height;
    font-size: @popup-header-font-size;
    background-color: @popup-header-bg-color;
    .hairline('bottom')
  }

  .popup-calendar-header-title {
    flex: 1;
    text-align: center;
    color: @popup-header-title-text-color;
  }

  .popup-calendar-header-left {
    padding-left: @popup-header-left-text-padding;
    color: @popup-header-left-text-color;
  }

  .popup-calendar-header-right {
    padding-right: @popup-header-right-text-padding;
    color: @popup-header-right-text-color;
  }

  .popup-calendar-header.vux-1px-b:after {
    border-color: #D9D9D9;
  }
</style>
