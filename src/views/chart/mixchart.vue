<template>
  <div class="app-container">
    <el-row :gutter="10">
      <el-col :sm="12" :xl="24">
        <div class="chart-container">
          <line-chart height="100%" width="100%" :chart-data="lineChart" />
        </div>
      </el-col>
      <el-col :sm="12" :xl="24">
        <div class="chart-container">
          <line-chart height="100%" width="100%" :chart-data="chartData" />
        </div>
      </el-col>

    </el-row>
  </div>

</template>

<script>
import lineChart from '@/components/Echarts/Line'
export default {
  name: "mixchart",
  components: {
    lineChart
  },
  data() {
    return {
      lineChart: {
          tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            data: ['直接访问', '邮件营销','联盟广告']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis:  {
            type: 'value'
          },
          yAxis: {
            type: 'category',
            data: ['周一','周二','周三','周四','周五','周六','周日']
          },
          series: [
            {
              name: '直接访问',
              type: 'bar',
              stack: '总量',
              label: {
                normal: {
                  show: true,
                  position: 'insideRight'
                }
              },
              data: [320, 302, 301, 334, 390, 330, 320]
            },
            {
              name: '邮件营销',
              type: 'bar',
              stack: '总量',
              label: {
                normal: {
                  show: true,
                  position: 'insideRight'
                }
              },
              data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
              name: '联盟广告',
              type: 'bar',
              stack: '总量',
              label: {
                normal: {
                  show: true,
                  position: 'insideRight'
                }
              },
              data: [220, 182, 191, 234, 290, 330, 310]
            }

          ]
      },
      chartData: {
        title: {
          text: '某个配',
          subtext: '纯属虚构',
          x:'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
              { value:335, name: '直接访问' },
              { value:310, name: '邮件营销' },
              { value:234, name: '联盟广告' },
              { value:135, name: '视频广告' },
              { value:1548, name: '搜索引擎' }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
    }
  }
}
</script>

<style scoped>
  .chart-container{
    position: relative;
    width: 100%;
    height: calc(100vh - 84px);
  }
</style>
