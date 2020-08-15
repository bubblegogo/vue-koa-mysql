<template>
  <div :style="{height:height,width:width}" v-loading="isLoading" >
    <div :id="randomId" :class="className" :style="{height:height,width:width,visibility:isChartVisible ? 'visible' : 'hidden'}" />
  </div>
</template>

<script>

import echarts from 'echarts'
import 'echarts/map/js/china.js'
import resize from './resize/index'
require('echarts/theme/macarons') // echarts theme
export default {
  name: 'chinaMap',
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
    }
  },

  data() {
    return {
      chart: null,
      isLoading: true,
      isOption: false,
      randomId: 'echarts-dom' + Date.now() + Math.random()
    }
  },
  computed: {
    isChartVisible() {
      setTimeout(() => {
        this.isLoading = false
      }, 500)
      return !this.isLoading && !this.isOption
    }
  },

  mounted() {
    // this.$nextTick(()=>{
    this.initChart()
    // })
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById(this.randomId), 'macarons')
      setTimeout(() => { // 用于延迟加载地图初始化
        this.setOptions(this.chartData)
      },500)
    },
    setOptions(option) {
      // 初始化图表
      this.chart.setOption(option)
      this.chart.on('dblclick', (param) => {
        this.$emit('eventmapclick',param.name)
      })
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
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
