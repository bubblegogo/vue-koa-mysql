<template>
  <div :style="{height:height,width:width}" v-loading="isLoading"  >
    <div :id="randomId"  :class="className" :style="{height:height,width:width,visibility:isChartVisible ? 'visible' : 'hidden'}" />
  </div>
</template>

<script>
import echarts from 'echarts'
import resize from './resize/index'
require('echarts/theme/macarons') // echarts theme
export default {
  name: 'provinceMap',
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    },
    chartData: {
      type: Object,
      required: true
    },
    mapKey: {
      type: String,
      required: true
    },
    randomId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      chart: null,
      isLoading: true
    }
  },
  computed: {
    isChartVisible() {
      setTimeout(() => {
        this.isLoading = false
      }, 500)
      return !this.isLoading
    }
  },
  mounted() {
    this.initChart()
  },
  methods: {
    initChart(proJson) {
      require(`echarts/map/js/province/${this.mapKey}.js`)
      this.chart = echarts.init(document.getElementById(this.randomId), 'macarons')
      setTimeout(() => { // 用于延迟加载地图初始化
        this.setOptions(this.chartData)
      }, 500)
    },
    setOptions(option) {
      // 初始化图表
      this.chart.setOption(option)
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(this.chartData)
      }
    },
    mapKey: {
      handler(val) {
        if (val) {
          this.isLoading = true
          if (this.chart) this.chart.dispose()
          this.initChart()
          setTimeout(() => {
            this.isLoading = false
          }, 500)
        }
      }
    }
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  }
}
</script>
