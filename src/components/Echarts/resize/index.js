import { debounce } from '@/utils'
export default {
  data() {
    return {
      _sidebar: null
    }
  },
  mounted() {
    this.__resizeHandler = debounce(() => {
      if (this.chart) {
        this.chart.resize()
      }
    }, 100)
    this.initResizeEvent()
    this.initSideResizeEvent()
  },
  beforeDestroy() {
    this.destoryResizeEvent()
    this.destroySideResizeEvent()
  },
  // to fixed bug when cached by keep-alive
  activated() {
    this.initResizeEvent()
    this.initSideResizeEvent()
  },
  deactivated() {
    this.destroyResizeEvent()
    this.destroySideResizeEvent()
  },
  methods: {
    initResizeEvent() {
      window.addEventListener('resize', this.__resizeHandler)
    },
    initSideResizeEvent() {
      // 左侧菜单监听
      this._sidebar = document.getElementsByClassName('sidebar-container')[0]
      this._sidebar && this._sidebar.addEventListener('transitionend', this.resizeHandler)
    },
    destoryResizeEvent() {
      window.removeEventListener('resize', this.__resizeHandler)
    },
    destroySideResizeEvent() {
      this._sidebar && this._sidebar.removeEventListener('transitionend', this.resizeHandler)
    },
    resizeHandler(e) {

      console.log("echarts resize 47 index")
      if (e.propertyName === 'width') {
        this.__resizeHandler()
      }

    }
  }
}
