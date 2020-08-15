<template>
  <div class="app-container">

    <el-row :gutter="10">
      <el-col :sm="12" :xl="12" :xs="24">
        <div class="chart-container">
          <china-map height="100%" width="100%" :chart-data="mapChartData" @eventmapclick="eventMapClick" />
        </div>
      </el-col>

      <el-col :sm="12" :xl="12" :xs="24">
        <div class="chart-container">
          <province-map height="100%" width="100%" :random-id="randomId" :map-key="mapKey" :chart-data="provinceChartData" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import { codvfeatchcountry } from '@/api/codvapi'
  import chinaMap from '@/components/Echarts/ChinaMap'
  import provinceMap from '@/components/Echarts/ProvinceMap'
  import { zh_en_key_val, map_chart } from '@/utils/constant'

  export default {
    name: 'mapchart',
    components: {
      chinaMap,
      provinceMap
    },
    data() {
      return {
        codv_data: null,
        mapKey: 'beijing',
        zhenkeyval: zh_en_key_val(),
        randomId: 'echarts-dom' + Date.now() + Math.random(),
        codv_chart: map_chart()
      }
    },
    computed: {
      mapChartData() {
        if (this.codv_data) {
          let new_chart = JSON.parse(JSON.stringify(this.codv_chart))
          let incConfirm_data = [], maxvalue = 10
          this.codv_data.forEach(codv => {
            if (codv.parent_name == null) {
              const valnum = JSON.parse(codv.inc_province)['incConfirmed']
              incConfirm_data.push({
                'name': codv.child_statistic.replace(/中国|省|市|回族|壮族|维吾尔|自治区|区/ig, ''),
                'value': valnum
              })
              maxvalue = maxvalue < valnum ? valnum : maxvalue
            }
          })
          new_chart.series.push({
            name: '昨日新增病例', // 浮动框的标题
            type: 'map',
            geoIndex: 0,
            data: incConfirm_data
          })
          new_chart.dataRange.max = maxvalue
          return new_chart
        } else {
          return {}
        }
      },
      provinceChartData() {
        return this.getProData()
      }
    },
    async created() {
      this.getChartData()
    },
    methods: {
      async getChartData() {
        /*
        * 使用 ES2017 async/await 也可以使用 $nextTick() 来解决异步数据请求
        * 前者是使用 效率要比后者要高，由于后者是在渲染一次后重新回调渲染
        * */
        const data = await codvfeatchcountry()
        this.codv_data = data.data.list
      },
      eventMapClick(val) {
        const index = this.zhenkeyval.zh_name.indexOf(val)
        const eName = this.zhenkeyval.en_name[index]
        this.mapKey = eName
        this.getProData(val)
      },

      getProData(eName) {
        if (eName == null) {
          eName = this.zhenkeyval.zh_name[this.zhenkeyval.en_name.indexOf(this.mapKey)]
        }
        if (this.codv_data) {
          let new_chart = JSON.parse(JSON.stringify(this.codv_chart))
          let incConfirm_data = [], maxvalue = 10
          this.codv_data.forEach(codv => {
            if (codv.parent_name == null) return
            const isprovince = codv.parent_name.indexOf('省') !== -1
            const dbName = eName + (isprovince ? '省' : '市')
            if (codv.parent_name === dbName) {
              const valnum = codv.total_confirmed
              incConfirm_data.push({
                'name': isprovince ? codv.child_statistic + '市' : codv.child_statistic,
                'value': valnum
              })
              maxvalue = maxvalue < valnum ? valnum : maxvalue
            }
          })
          new_chart.series.push({
            name: '市级别数据', // 浮动框的标题
            type: 'map',
            geoIndex: 0,
            data: incConfirm_data
          })
          new_chart.dataRange.max = maxvalue
          new_chart.geo.map = eName
          return new_chart
        } else {
          return {}
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
