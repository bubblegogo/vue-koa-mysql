module.exports = async (ctx,next)=>{
    //请求成功
    //code 1:err  2:success
    ctx.jsonReturn = ({code,data,message}) =>{
        ctx.body = { code , data, message};
    };
    //传递给下一个中间件
    await next();
    
}