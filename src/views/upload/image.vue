<template>
  <el-upload
    class="upload-demo"
    drag
    action=""
    :http-request="handleRequest"
     multiple>
    <i class="el-icon-upload"></i>
    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    <div class="el-upload__tip" slot="tip">支持上传所有格式文件，单个文件不超过1G</div>
  </el-upload>
</template>

<script>
  import axios from 'axios'
  import SparkMD5 from 'spark-md5'
  export default {
    components: { // 组件引入

    },
    data() {
      return {
        maxSize: 1 * 1024 * 1024 * 1024, // 上传最大文件限制 1G
        eachSize: 100 * 1024 * 1024, // 大于100M 个大小的文件使用分块上传(后端可以支持断点续传)
        requestCancelQueue: [], // 请求方法队列（调用取消上传
        sendLimit: 4, // 请求并发数
        chunks:[],
        exitChunks:[]
      }
    },
    computed: { // 计算属性监听

    },
    created() {

    },
    methods:{

      // 第一步 文件切片 并生成 md5
      createFileChunk(file, eachSize){
        const fileChunk = []
        let chunk = 0
        while(chunk < file.size){
          fileChunk.push({index:chunk,file:file.slice(chunk, chunk + eachSize)})
          chunk += eachSize
        }
        return fileChunk
      },

      // 第二步 通过前端切片 md5 校验文件是否传递过后端

      // 第三步 并发数控制 以及失败后自动启动
      async handleRequest(options) {
        const { maxSize, eachSize, splitUpload, singleUpload } = this
        const { file, onProgress, onSuccess, onError } = options
        const chunks =  this.createFileChunk(file,eachSize)

        // 计算 hash 文件指纹表示
        const hash = await this.calculateHash(file)

        /*
          // web-worker
          this.hash = await this.calculateHashWorker(chunks)
          // requestIdleCallback
          this.hash = await this.calculateHashIdle(chunks)
          // 抽样哈希 牺牲一定的准确率 换来效率 hash 一样的不一定是同一个文件，但是不一样的一定不是 可以考虑用来预判
          const hash = await  this.calculateHashSmaple(file,eachSize)
         */

        // 检查文件是否已上传
        const checkdata = await axios.post('/file/check',{
          ext: this.ext(file.name),
          hash: hash
        })

        const {uploaded,uplodedList} = checkdata.data.data
        if(uploaded){ //表示已经存在
          return this.$message.success("秒传:上传成功")
        }
        this.chunks = chunks.map((chunk,index)=>{

          //每一个切片的名字
          const chunkName = hash+'-'+index
          return {
            hash: hash,
            chunk: chunk.file,
            name: chunkName,
            index: index,
            // 设置进度条
            progress: uplodedList.indexOf(chunkName) > -1 ? 100 : 0
          }
        })


        // 传入 已经存在的切片清单
        let list = await this.uploadChunks(uplodedList)
        // 把数据组装在 form 中并 返回
        try{
          await this.sendRequest(list,4)
          if(uplodedList.length+list.length == this.chunks.length){
            await this.mergeRequest()
          }
        }catch (e) {
          this.$message.error("上传出错，充实")

        }
      },

      uploadChunks(uplodedList){
        return new Promise((resolve,reject)=>{
          try{
            let list  = [];
            for(let chunk of this.chunks ){
              if(!uplodedList.some(ck=> ck.name == chunk.name) ){

                let from = new FormData()
                // 设置文件上传接口的需要的参数
                from.append('hash', chunk.hash)
                from.append('name', chunk.name)
                from.append('index', chunk.index)
                from.append('progress', chunk.progress)
                // 设置上传的当前的文件块
                from.append('file', new Blob([chunk.chunk]))

                list.push({'from':from,index:chunk.index})
              }
            }
            resolve(list)
          }catch (e) {
              reject(e)
          }
        })
      },

      // 合并文件
      async mergeRequest(file, hash){
        await axios.post("/file/merge",{
          exit: this.ext(file.name), //当前文件
          size: this.eachSize,
          hash: hash//当前文件的hash 值
        })
      },

      async sendRequest(chunks,limit =4){
        return new Promise((resolve,reject)=>{
          const len = chunks.length
          let counter = 0
          //全局开关
          let isStop = false
          const start = async ()=>{
            if(isStop) return
            const task = chunks.shift() // 取第一个
            if(task){
              const {from,index} = task
              try{
                await axios.post('/file/sliceupload',from,{
                  onUploadProgress:progress=>{
                    this.chunks[index].progress= Number( (progress.loaded/progress.total)*100 ).toFixed(2)
                  }
                })
                if(counter == len-1){ // 最后一个
                  resolve()
                }else{
                  counter++
                  start()
                }
              }catch (e) {
                //当前切片报错 尝试3次重试机制，重新push 到数组中
                console.log('出错了')
                //进度条修改成红色

                this.chunks[index].progress =1
                if(task.error < 3){
                  task.error++
                  //队首进去 准备重试
                  chunks.unshift(task)
                  start()
                }else{
                  // 错误3次 直接结束
                  isStop = true
                  reject()
                }
              }
            }
          }
          start()

        })
      },

      ext(filename){
        return filename.split('.').pop()
      },
      // 直接计算md5 大的文件会卡顿
      async calculateHash(file){

        const ret = await this.blobToData(file)

        return SparkMD5.hash(ret)
      },
      async blobToData(blob){
        return new Promise(resolve => {
          const fileReader = new FileReader()
          fileReader.onload = function () {
            resolve(fileReader.result)
          }
          fileReader.readAsBinaryString(blob)
        })
      },


    }
  }
</script>
