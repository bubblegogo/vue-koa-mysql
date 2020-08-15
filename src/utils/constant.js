// 使用常量 在此定义
function article_type() {
  return [{
    value: 'linux',
    label: 'Linux'
  }, {
    value: 'vue',
    label: 'Vue'
  }, {
    value: 'java',
    label: 'Java'
  }, {
    value: 'node',
    label: 'Node'
  }, {
    value: 'javascript',
    label: 'JavaScript'
  }, {
    value: 'mysql',
    label: 'Mysql'
  }, {
    value: 'js',
    label: 'Js'
  }]
}

function zh_en_key_val() {
  return {
    zh_name: ['上海', '河北', '山西', '内蒙古', '辽宁', '吉林', '黑龙江', '江苏', '浙江', '安徽', '福建', '江西', '山东', '河南', '湖北', '湖南', '广东', '广西', '海南', '四川', '贵州', '云南', '西藏', '陕西', '甘肃', '青海', '宁夏', '新疆', '北京', '天津', '重庆', '香港', '澳门', '台湾'],
    en_name: ['shanghai', 'hebei', 'shanxi', 'neimenggu', 'liaoning', 'jilin', 'heilongjiang', 'jiangsu', 'zhejiang', 'anhui', 'fujian', 'jiangxi', 'shandong', 'henan', 'hubei', 'hunan', 'guangdong', 'guangxi', 'hainan', 'sichuan', 'guizhou', 'yunnan', 'xizang', 'shanxi1', 'gansu', 'qinghai', 'ningxia', 'xinjiang', 'beijing', 'tianjin', 'chongqing', 'xianggang', 'aomen', 'taiwan']
  }
}

function map_chart() {
  return { // 进行相关配置
    title: {
      text: '国内新型冠状病毒',
      subtext: '昨日新增冠状病毒地区',
      x: 'center',
      textStyle: {
        color: 'rgb(55, 75, 113)',
        fontFamily: '等线',
        fontSize: 18
      },
      subtextStyle: {
        fontSize: 15,
        fontFamily: '等线'
      }
    },
    tooltip: {

    }, // 鼠标移到图里面的浮动提示框
    dataRange: {
      show: false,
      min: 0,
      max: 10,
      text: ['High', 'Low'],
      realtime: true,
      calculable: true,
      color: ['red', 'yellow', 'lightskyblue']
    },
    geo: { // 这个是重点配置区
      roam: true,
      map: 'china', // 表示中国地图
      scaleLimit: {
        min: 0.5,
        max: 1.5
      },
      label: {
        normal: {
          show: true, // 是否显示对应地名
          textStyle: {
            color: 'rgba(0,0,0,0.4)'
          }
        }
      },
      itemStyle: {
        normal: {
          borderColor: 'rgba(0, 0, 0, 0.2)'
        },
        emphasis: {
          areaColor: null,
          shadowOffsetX: 0,
          shadowOffsetY: 0,
          shadowBlur: 20,
          borderWidth: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    },
    series: [{
      type: 'map', // mapType可选"scatter"或"map",即选择散点图模式或地图模式（显示省份数据为地图模式，显示城市为散点模式）
      coordinateSystem: 'geo' // 对应上方配置
    }]
  }
}
export {
  article_type,
  zh_en_key_val,
  map_chart
}
