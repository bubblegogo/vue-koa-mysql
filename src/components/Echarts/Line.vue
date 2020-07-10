<template>
  <div :style="{height:height,width:width}" v-loading="isLoading" >
    <div  :id="randomId" :class="className" :style="{height:height,width:width,visibility:isChartVisible ? 'visible' : 'hidden'}" />
  </div>
</template>
<script>
import echarts from 'echarts'
import resize from './resize/index'
require('echarts/theme/macarons') // echarts theme
export default {
  name: 'lineChart',
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
      console.log(this.chartData)
      this.chart = echarts.init(document.getElementById(this.randomId), 'macarons')
      this.setOptions(this.chartData)
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

<style scoped>
</style>
