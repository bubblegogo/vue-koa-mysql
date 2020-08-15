<template>
  <div class="app-container">
    <el-row :gutter="10">
      <el-col :sm="24" :xl="24">
        <div class="chart-container">
          <el-tabs  v-model="activeTable">
            <el-tab-pane :label="$t('codv.sure_cnt')" name="sure_cnt"></el-tab-pane>
            <el-tab-pane :label="$t('codv.cure_cnt')"  name="cure_cnt"></el-tab-pane>
            <el-tab-pane :label="$t('codv.doubt_cnt')" name="doubt_cnt"></el-tab-pane>
            <el-tab-pane :label="$t('codv.inc_sure')" name="inc_sure"></el-tab-pane>
            <el-tab-pane :label="$t('codv.die_cnt')" name="die_cnt"></el-tab-pane>
            <el-tab-pane :label="$t('codv.inc_die')"  name="inc_die"></el-tab-pane>

          </el-tabs>
          <component :is="activeTable" :chart-data='lineData' height="100%" width="100%" ></component>
        </div>
      </el-col>


    </el-row>
  </div>
</template>

<script>
import { codvfeatchhome } from '@/api/codvapi'
import lineChart from '@/components/Echarts/Line'
export default {
  name: 'codvhomeline',
  components: {
    sure_cnt: lineChart,
    cure_cnt: lineChart,
    doubt_cnt: lineChart,
    inc_sure: lineChart,
    die_cnt: lineChart,
    inc_die: lineChart
  },

  data() {
    return {
      activeTable: 'sure_cnt',
      codv_data: null,
      codv_chart: {
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: []
        },
        dataZoom: [
          {
            show: true,
            realtime: true,
            start: 0,
            end: 100
          },
          {
            type: 'inside',
            realtime: true,
            start: 0,
            end: 100
          }
        ],
        grid: {
          left: '3%',
          right: '4%',
          bottom: '5%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: []
        },
        yAxis: {
          type: 'value'
        },
        series: []
      }
    }
  },
  computed: {
    lineData() {
      if (this.codv_data) {
        let new_chart = JSON.parse(JSON.stringify(this.codv_chart))
        let series_data = []
        this.codv_data.forEach(codv => {
          new_chart.xAxis.data.push(codv.day)
          series_data.push(codv[this.activeTable])
        })
        new_chart.series.push({
          data: series_data,
          smooth: true,
          type: 'line'
        })
        return new_chart
      } else {
        return {}
      }
    }
  },

  // 获取数据
  async created() {
    this.getChartData()
  },
  methods: {
    async getChartData() {
      /*
      * 使用 ES2017 async/await 也可以使用 $nextTick() 来解决异步数据请求
      * 前者是使用 效率要比后者要高，由于后者是在渲染一次后重新回调渲染
      * */
      const data = await codvfeatchhome()
      this.codv_data = data.data.list
    }
  }
}
</script>

<style scoped>
  .chart-container{
    position: relative;
    width: 100%;
    height: calc(100vh - 150px);
  }
  .chart-container /deep/ .el-tabs__header {
    margin: 0;
  }

</style>
