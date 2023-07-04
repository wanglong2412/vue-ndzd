import { createNamespace } from 'vant/es/utils'
import { TouchMixin } from 'vant/es/mixins/touch'
import './index.less'

const [createComponent] = createNamespace('tabs')
const MIN_SWIPE_DISTANCE = 50

export default createComponent({
  mixins: [TouchMixin],

  props: {
    isSwipe: {
      type: Boolean,
      default: true
    }
  },

  computed: {
    listeners() {
      if (this.isSwipe) {
        return {
          touchstart: this.touchStart,
          touchmove: this.touchMove,
          touchend: this.onTouchEnd,
          touchcancel: this.onTouchEnd
        }
      }
    }
  },

  methods: { // watch swipe touch end
    onTouchEnd() {
      const { direction, deltaX } = this

      /* istanbul ignore else */
      if (direction === 'horizontal' && this.offsetX >= MIN_SWIPE_DISTANCE) {
        /* istanbul ignore else */
        if (deltaX > 0) {
          console.log('onTouchRight')
          this.$emit('change', 'right')
        } else if (deltaX < 0) {
          console.log('onTouchLeft')
          this.$emit('change', 'left')
        }
      }
    },

    genChildren() {
      return this.slots()
    }
  },

  render() {
    return (
      <div
        class='cyui-slide'
        {...{ on: this.listeners }}
      >
        {this.genChildren()}
      </div>
    )
  }
})
