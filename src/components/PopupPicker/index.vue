<template>
  <van-popup
    v-model="popupShow"
    position="bottom"
    @click-overlay="handleClickOverlay">
    <cosy-picker
      ref="picker"
      show-toolbar
      :columns="columnsData"
      :loading="loading"
      :value-key="labelKey"
      :item-height="90"
      @confirm="onConfirm"
      @cancel="onCancel"
      @change="onChange"/>
  </van-popup>
</template>

<script>
  import CosyPicker from '@components/Picker'

  export default {
    name: 'PopupPicker',
    mixins: [],
    components: {
      CosyPicker
    },
    props: {
      show: {
        type: Boolean,
        default: false
      },
      loading: {
        type: Boolean,
        default: false
      },
      value: {
        type: Array,
        default: () => ([])
      },
      columnsNum: { // 列数
        type: [String, Number],
        required: true,
        default: 1
      },
      data: { // 选项列表数据
        type: Array,
        default: () => ([])
      },
      dataFormat: { // 数据格式
        type: Object,
        default () {
          return {
            children: 'children',
            label: 'label',
            value: 'value'
          }
        }
      }
    },
    data () {
      return {
        popupShow: this.show,
        currentValue: this.value, // 当前的值
        currentIndexs: [], // 当前index
        currentData: [],
        columnsData: [] // picker里的数据
      }
    },
    computed: {
      labelKey () {
        return this.dataFormat.label || 'label'
      },
      valueKey () {
        return this.dataFormat.value || 'value'
      },
      childrenKey () {
        return this.dataFormat.children || 'children'
      }
    },
    methods: {
      handleClickOverlay () {
        this.resetPickerData(this.value)
        this.$emit('cancel', {})
      },
      onCancel () {
        // console.log(this.value)
        this.popupShow = false
        this.resetPickerData(this.value)
        this.$emit('cancel', {})
      },
      onConfirm (values) {
        let { valueKey, labelKey } = this
        this.popupShow = false
        this.$emit('input', values.map((item) => {
          return item[valueKey]
        }))
        this.$emit('confirm', {
          values: values.map((item) => {
            return item[valueKey]
          }),
          labels: values.map((item) => {
            return item[labelKey]
          })
        })
      },
      onChange (picker, values, index) { // 滚动后重置后面列数据
        let { columnsNum, valueKey, labelKey, childrenKey } = this
        let value = values[index][valueKey]
        let childrenData = values[index][childrenKey] || []
        for (let i = +index + 1; i < columnsNum; i++) {
          picker.setColumnValues(i, childrenData)
          value = childrenData[0][valueKey]
          childrenData = this.getChildrenData(childrenData, value)
        }
        this.$emit('change', {
          values: picker.getValues().map((item) => {
            return item[valueKey]
          }),
          labels: picker.getValues().map((item) => {
            return item[labelKey]
          }),
          indexs: picker.getIndexes()
        })
      },
      getChildrenData (data, value) { // 获取子数据
        let { childrenKey } = this
        let itemData = null
        if (value) {
          itemData = data.find((item, index) => {
            return item[this.valueKey] === value
          })
        } else {
          itemData = data[0]
        }

        return itemData && itemData[childrenKey] ? itemData[childrenKey] : []
      },
      getValues () {
        let { valueKey } = this
        let { picker } = this.$refs
        let values = picker.getValues()
        this.currentValue = values.map((item) => {
          return item[valueKey]
        })
      },
      resetPickerData (currentValue) { // 重置数据
        this.getColumnsData(currentValue)
        this.getIndexsData(currentValue)
      },
      getIndexsData (currentValue) { // 根据values获取当前index
        let { currentData, columnsNum, valueKey, childrenKey } = this
        let { picker } = this.$refs
        let childrenData = currentData
        let currentIndexs = []
        for (let i = 0; i < columnsNum; i++) {
          let currentIndex = 0
          let itemData = childrenData.find((item, index) => {
            if (item[valueKey] === currentValue[i]) {
              currentIndex = index
              return true
            }
          })
          picker.setColumnIndex(i, currentIndex)
          currentIndexs.push(currentIndex)
          childrenData = itemData && itemData[childrenKey] ? itemData[childrenKey] : []
        }
        return currentIndexs
      },
      getColumnsData (currentValue) { // 根据values获取当前所有列
        let { currentData, columnsNum } = this
        let { picker } = this.$refs
        let childrenData = currentData
        let columnsData = []
        for (let i = 0; i < columnsNum; i++) {
          picker.setColumnValues(i, childrenData)
          columnsData.push(childrenData)
          childrenData = this.getChildrenData(childrenData, currentValue[i])
        }
        return columnsData
      },
      initColumnsData () { // 初始化
        let { currentValue, currentData, columnsNum, valueKey, childrenKey } = this
        let childrenData = currentData
        let columnsData = []
        for (let i = 0; i < columnsNum; i++) {
          let itemData = null
          let currentIndex = 0
          if (currentValue[i]) {
            itemData = childrenData.find((item, index) => {
              if (item[valueKey] === currentValue[i]) {
                currentIndex = index
                return true
              }
            })
          } else {
            itemData = childrenData[currentIndex]
          }
          columnsData.push({
            values: childrenData,
            defaultIndex: currentIndex
          })
          childrenData = itemData && itemData[childrenKey] ? itemData[childrenKey] : []
        }
        // console.log(columnsData)
        this.columnsData = columnsData
      },
      initData () {
        this.initColumnsData()
      }
    },
    watch: {
      value: {
        handler (newVal, oldVal) {
          if (JSON.stringify(newVal) !== JSON.stringify(this.currentValue)) {
            this.currentValue = JSON.parse(JSON.stringify(newVal))
          }
        },
        immediate: true
      },
      data: {
        handler (newVal, oldVal) {
          if (JSON.stringify(newVal) !== JSON.stringify(this.currentData)) {
            this.currentData = JSON.parse(JSON.stringify(newVal))
          }
        },
        deep: true,
        immediate: true
      },
      currentValue (newVal, oldVal) {
        this.initColumnsData()
      },
      currentData (newVal, oldVal) {
        this.initColumnsData()
      },
      show (newVal, oldVal) {
        this.popupShow = newVal
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

<style lang="less">
</style>
