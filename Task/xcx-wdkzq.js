/*
[mitm]
hostname = r1.nullpointerexception.cn
#圈x
[rewrite local]
https://wx.chinaxing.cn/app/index.php url script-request-header https://raw.githubusercontent.com/ZhiYi-N/Private-Script/master/Scripts/ranlv.js

*/

const $ = Env('微打卡赚钱')
const notify = $.isNode() ?require('./sendNotify') : '';
let status, videoid,myid,supportvideoid,supportrank,show,message,note,random,wkpower,spanswer,spbdid,gold
status = (status = ($.getval("wkstatus") || "1") ) > 1 ? `${status}` : ""; // 账号扩展字符
//const sphdArr = [], spuserurlArr = [], spsignurlArr = [], spvideourlArr = [], spanswerurlArr = [] ,sptongjiurlArr = [], spshiwanurlArr = [], sptxurlArr = []
let sphd = $.getdata('sphd')
let spuserurl = $.getdata('spuserurl')
let spsignurl = $.getdata('spsignurl')
let spanswerurl = $.getdata('spanswerurl')
let sptongjiurl = $.getdata('sptongjiurl')
let spshiwanurl = $.getdata('spshiwanurl')
let spvideourl = $.getdata('spvideourl')
let sptxurl = $.getdata('sptxurl')
let tz = ($.getval('tz') || '1');//0关闭通知，1默认开启
let cash = ($.getval('rlcash') || '1')//默认不自动提现
const logs =0;//0为关闭日志，1为开启

let min = 25;
let max = 50;

var hour=''
var minute=''
if ($.isNode()) {
   hour = new Date( new Date().getTime() + 8 * 60 * 60 * 1000 ).getHours();
   minute = new Date( new Date().getTime() + 8 * 60 * 60 * 1000 ).getMinutes
   console.log(`现在时间为${hour}：${minute}\n`)
}else{
   hour = (new Date()).getHours();
   minute = (new Date()).getMinutes();
   console.log(`现在时间为${hour}：${minute}\n`)
}

//CK运行
let isGetCookie = typeof $request !== 'undefined'
if (isGetCookie) {
   GetCookie();
   $.done()
}


const sphdArr = ['{"Accept-Encoding":"gzip,deflate,br","Connection":"keep-alive","Referer":"https://servicewechat.com/wxcac07b570b08f3ae/29/page-frame.html","Content-Type":"application/x-www-form-urlencoded","Host":"zm.shujumagician.com","User-Agent":"Mozilla/5.0(iPhone;CPUiPhoneOS13_6_1likeMacOSX)AppleWebKit/605.1.15(KHTML,likeGecko)Mobile/15E148MicroMessenger/8.0.1(0x1800012a)NetType/WIFILanguage/zh_CN","Accept-Language":"zh-cn"}']
const spuserurlArr = ['https://zm.shujumagician.com/app/index.php?i=24&t=0&v=1.0.0&from=wxapp&c=entry&a=wxapp&do=user&sign=3a77b09c4102a2a76711131a55596dcf&m=skai_tooli&dopost=get_user_data&userid=62','https://zm.shujumagician.com/app/index.php?i=24&t=0&v=1.0.0&from=wxapp&c=entry&a=wxapp&do=user&sign=a7ba4c73bded4f4cba5aad49b62ba3c6&m=skai_tooli&dopost=get_user_data&userid=337']
const spsignurlArr = ['https://zm.shujumagician.com/app/index.php?i=24&t=0&v=1.0.0&from=wxapp&c=entry&a=wxapp&do=user&sign=260425a41807ead12002add8769c5e26&m=skai_tooli&dopost=make_sign&userid=62','https://zm.shujumagician.com/app/index.php?i=24&t=0&v=1.0.0&from=wxapp&c=entry&a=wxapp&do=user&sign=a7ba4c73bded4f4cba5aad49b62ba3c6&m=skai_tooli&dopost=make_sign&userid=337']
const spanswerurlArr = ['https://zm.shujumagician.com/app/index.php?i=24&t=0&v=1.0.0&from=wxapp&c=entry&a=wxapp&do=question&sign=c2b12f370310a6fa2e64dfd8afb40b1f&m=skai_tooli&dopost=choose&userid=62&istrue=1','https://zm.shujumagician.com/app/index.php?i=24&t=0&v=1.0.0&from=wxapp&c=entry&a=wxapp&do=question&sign=a7ba4c73bded4f4cba5aad49b62ba3c6&m=skai_tooli&dopost=choose&userid=337&istrue=1']
const sptongjiurlArr = ['https://zm.shujumagician.com/app/index.php?i=24&t=0&v=1.0.0&from=wxapp&c=entry&a=wxapp&do=sysinfo&m=skai_tooli&dopost=get_tongji_app_key','https://zm.shujumagician.com/app/index.php?i=24&t=0&v=1.0.0&from=wxapp&c=entry&a=wxapp&do=sysinfo&m=skai_tooli&dopost=get_tongji_app_key']
const spvideourlArr = ['https://zm.shujumagician.com/app/index.php?i=24&t=0&v=1.0.0&from=wxapp&c=entry&a=wxapp&do=user&sign=977aded0283121ef5a9a319be7bff696&m=skai_tooli&dopost=get_some_answernum_ad_video&userid=62','https://zm.shujumagician.com/app/index.php?i=24&t=0&v=1.0.0&from=wxapp&c=entry&a=wxapp&do=user&sign=a7ba4c73bded4f4cba5aad49b62ba3c6&m=skai_tooli&dopost=get_some_answernum_ad_video&userid=337']
const spshiwanurlArr = ['https://zm.shujumagician.com/app/index.php?i=24&t=0&v=1.0.0&from=wxapp&c=entry&a=wxapp&do=user&sign=76fa356c537053c3b4344d2fb5580938&m=skai_tooli&dopost=get_shiwan_card&userid=62&xcxid=','https://zm.shujumagician.com/app/index.php?i=24&t=0&v=1.0.0&from=wxapp&c=entry&a=wxapp&do=user&sign=a7ba4c73bded4f4cba5aad49b62ba3c6&m=skai_tooli&dopost=get_shiwan_card&userid=337&xcxid=']
const sptxurlArr = ['https://zm.shujumagician.com/app/index.php?i=24&t=0&v=1.0.0&from=wxapp&c=entry&a=wxapp&do=cashout&sign=ec5681d2e9f15ec0f47f32caedbd8504&m=skai_tooli&dopost=make_money&userid=62&id=3','https://zm.shujumagician.com/app/index.php?i=24&t=0&v=1.0.0&from=wxapp&c=entry&a=wxapp&do=cashout&sign=a7ba4c73bded4f4cba5aad49b62ba3c6&m=skai_tooli&dopost=make_money&userid=337&id=3'] //id3为3元提现，id4为10元提现，id5为30元提现


if ($.isNode()) {
  /*
  if (process.env.sphd && process.env.sphd.indexOf('#') > -1) {
  sphd = process.env.sphd.split('#');
  console.log(`您选择的是用"#"隔开\n`)
  }
  else if (process.env.sphd && process.env.sphd.indexOf('\n') > -1) {
   sphd = process.env.sphd.split('\n');
   console.log(`您选择的是用换行隔开\n`)
  } else {
   sphd = process.env.sphd.split()
  };

  if (process.env.spsignurl && process.env.spsignurl.indexOf('#') > -1) {
   spsignurl = process.env.spsignurl.split('#');
   console.log(`您选择的是用"#"隔开\n`)
  }
  else if (process.env.spsignurl && process.env.spsignurl.indexOf('\n') > -1) {
   spsignurl = process.env.spsignurl.split('\n');
   console.log(`您选择的是用换行隔开\n`)
  } else {
   spsignurl = process.env.spsignurl.split()
  };
  Object.keys(sphd).forEach((item) => {
        if (sphd[item]) {
          sphdArr.push(sphd[item])
        }
    });
  Object.keys(spsignurl).forEach((item) => {
        if (spsignurl[item]) {
          spsignurlArr.push(spsignurl[item])
        }
    });
  */
    console.log(`============ 脚本执行-国际标准时间(UTC)：${new Date().toLocaleString()}  =============\n`)
    console.log(`============ 脚本执行-北京时间(UTC+8)：${new Date(new Date().getTime() + 8 * 60 * 60 * 1000).toLocaleString()}  =============\n`)
 } else {
    sphdArr.push($.getdata('sphd'))
    spsignurlArr.push($.getdata('spsignurl'))
    let wkcount = ($.getval('wkcount') || '1');
  for (let i = 2; i <= wkcount; i++) {
    sphdArr.push($.getdata(`sphd${i}`))
    spsignurlArr.push($.getdata(`spsignurl${i}`))
  }
}

!(async () => {
if (!spsignurlArr[0]) {
    $.msg($.name, '【提示】请先获取cookie')
    return;
  }
   console.log(`------------- 共${spsignurlArr.length}个账号----------------\n`)
  for (let i = 0; i < spsignurlArr.length; i++) {
    if (spsignurlArr[i]) {
      message = ''
      note =''
      sphd = sphdArr[i];
      spuserurl = spuserurlArr[i];
      spsignurl = spsignurlArr[i];
      spanswerurl = spanswerurlArr[i];
      sptongjiurl = sptongjiurlArr[i];
      spvideourl = spvideourlArr[i];
      spshiwanurl = spshiwanurlArr[i];
      sptxurl = sptxurlArr[i];
      $.index = i + 1;
      console.log(`\n开始【${$.name} ${$.index}】`)
      await userinfo()
      await signin()
      for (let i = 1; i < 29; i++) {
         console.log('开始刷答题'+i);
         await answer()
         random = Math.floor(Math.random()*(max-min+1)+min)*1000
         console.log(random);
         await $.wait(random);
         }
      await readvideo()
      if (hour<21){
         randomnum = Math.floor(Math.random()*(4000-1+1)+1)
         cishu = 1
         for (let i = randomnum; i < 5000; i++) {
            console.log('开始刷小程序'+i);
            cishu += 1
            await readxcx(i)
            random = Math.floor(Math.random()*(max-min+1)+min)*1000
            console.log(random);
            await $.wait(random);
            if (cishu>180){
              return
             }
            }
      }
      //await withdraw()
      await showmsg()


  }
 }
})()
    .catch((e) => $.logErr(e))
    .finally(() => $.done())

function GetCookie() {
if($request&&$request.url.indexOf("get_user_data")>=0) {
   const sphd = $request.url.split('&')[7]
   if(sphd)     $.setdata(sphd,`sphd${status}`)
   $.log(`[${wawacai}] 获取sphd请求: 成功,sphd: ${sphd}`)
   $.msg(`sphd${status}: 成功🎉`, ``)
   const spsignurl = $request.url.split('&')[10]
    if(spsignurl)    $.setdata(spsignurl,`spsignurl${status}`)
    $.log(`[${wawacai}] 获取spsignurl请求: 成功,spsignurl: ${spsignurl}`)
    $.msg(`spsignurl${status}: 成功🎉`, ``)
}
}


//userinfo
async function userinfo(){
 return new Promise((resolve) => {
    let userinfo_url = {
        url: `${spuserurl}`,
        headers: JSON.parse(sphd),
    	}
   $.get(userinfo_url,async(error, response, data) =>{
    try{
        const result = JSON.parse(data)
        $.log(data)
        await sleep(Math.random()*3*1000)
        message += '🔔【个人信息】 '
        if(result.result == "success"){
          console.log(`🎈个人信息\n 用户名：${result.userdata.uname}\n 金币为：${result.userdata.money}\n 当前剩余答题卡：${result.userdata.answernum}\n 答对${result.userdata.totalrightnum}题  。\n`)
          message += `🎈个人信息\n 用户名：${result.userdata.uname}\n 金币为：${result.userdata.money}\n 当前剩余答题卡：${result.userdata.answernum}\n 答对${result.userdata.totalrightnum}题  。\n`
          }else{
          console.log('👀个人信息错误'+result.message+"\n")
          message += '👀个人信息错误'+result.message+"\n"
          }
        }catch(error) {
          $.logErr(error, response);
      } finally {
        resolve();
      }
    })
   })
  }

//signin
async function signin(){
 return new Promise((resolve) => {
    let signin_url = {
        url: `${spsignurl}`,
        headers: JSON.parse(sphd),
    	}
   $.get(signin_url,async(error, response, data) =>{
    try{
        const result = JSON.parse(data)
        $.log(data)
        await sleep(Math.random()*3*1000)
        message += '🔔【签到】 '
        if(result.result == "success"){
          console.log(`🎈签到成功 ${result.userdata.totalrightnum}题  。\n`)
          message += `🎈签到成功 ${result.userdata.totalrightnum}题  。\n`
          }else{
          console.log('👀签到错误'+result.message+"\n")
          message += '👀签到错误'+result.message+"\n"
          }
        }catch(error) {
          $.logErr(error, response);
      } finally {
        resolve();
      }
    })
   })
  }


//answer
async function answer(){
 return new Promise((resolve) => {
    let answer_url = {
        url: `${spanswerurl}`,
        headers: JSON.parse(sphd),
    	}
   $.get(answer_url,async(error, response, data) =>{
    try{
        const result = JSON.parse(data)
        $.log(data)
        await sleep(Math.random()*3*1000)
        message += '🔔【答题】 '
        if(result.result == "success"){
          console.log(`🎈回答正确，金币+${result.addmoney}个，现有金币${result.money}，答题卡${result.answernum}个，共答对${result.totalrightnum}个。\n`)
          message += `🎈回答正确，金币+${result.addmoney}个，现有金币${result.money}，答题卡${result.answernum}个，共答对${result.totalrightnum}个。\n`
          random = Math.floor(Math.random()*(max-min+1)+min)*1000
          console.log(random);
          await $.wait(random);
          await answer_tongji()
          }else{
          console.log('👀回答错误'+result.message+"\n")
          message += '👀回答错误'+result.message+"\n"
          }
        }catch(error) {
          $.logErr(error, response);
      } finally {
        resolve();
      }
    })
   })
  }


//answer_tongji
async function answer_tongji(){
 return new Promise((resolve) => {
    let answer_tongji_url = {
        url: `${sptongjiurl}`,
        headers: JSON.parse(sphd),
    	}
   $.get(answer_tongji_url,async(error, response, data) =>{
    try{
        const result = JSON.parse(data)
        $.log(data)
        await sleep(Math.random()*3*1000)
        message += '🔔【答题上报统计】 '
        if(result.result == "success"){
          console.log(`🎈答题上报统计成功\n`)
          message += `🎈答题上报统计成功\n`
          random = Math.floor(Math.random()*(max-min+1)+min)*1000
          console.log(random);
          await $.wait(random);
          //await answer()
          }else{
          console.log('👀答题上报统计错误'+result.message+"\n")
          message += '👀答题上报统计错误'+result.message+"\n"
          }
        }catch(error) {
          $.logErr(error, response);
      } finally {
        resolve();
      }
    })
   })
  }

//readvideo
async function readvideo(){
 return new Promise((resolve) => {
    let readvideo_url = {
        url: `${spvideourl}`,
        headers: JSON.parse(sphd),
    	}
   $.get(readvideo_url,async(error, response, data) =>{
    try{
        const result = JSON.parse(data)
        $.log(data)
        await sleep(Math.random()*3*1000)
        message += '🔔【看视频得答题卡】 '
        if(result.result == "success"){
          console.log(`🎈看视频得答题卡成功，获得答题卡+${result.addcardnum}个，现有答题卡${result.answernum}，累计看视频${result.userdata.ad_video_num}个。\n`)
          message += `🎈看视频得答题卡成功，获得答题卡+${result.addcardnum}个，现有答题卡${result.answernum}，累计看视频${result.userdata.ad_video_num}个。\n`
          //await readvideo_tongji()
          }else{
          console.log('👀观看视频错误'+result.message+"\n")
          message += '👀观看视频错误'+result.message+"\n"
          }
        }catch(error) {
          $.logErr(error, response);
      } finally {
        resolve();
      }
    })
   })
  }

//readxcx
async function readxcx(time){
 return new Promise((resolve) => {
    let readxcx_url = {
        url: `${spshiwanurl+time}`,
        headers: JSON.parse(sphd),
    	}
   $.get(readxcx_url,async(error, response, data) =>{
    try{
        const result = JSON.parse(data)
        $.log(data)
        await sleep(Math.random()*3*1000)
        message += '🔔【看小程序得答题卡】 '
        if(result.result == "success"){
          console.log(`🎈看小程序得答题卡成功，获得答题卡+${result.addcardnum}个，现有答题卡${result.answernum}。\n`)
          message += `🎈看小程序得答题卡成功，获得答题卡+${result.addcardnum}个，现有答题卡${result.answernum}。\n`
          //await readvideo_tongji()
          }else{
          console.log('👀看小程序得答题卡'+result.message+"\n")
          message += '👀看小程序得答题卡'+result.message+"\n"
          }
        }catch(error) {
          $.logErr(error, response);
      } finally {
        resolve();
      }
    })
   })
  }

//withdraw
async function withdraw(){
 return new Promise((resolve) => {
    let withdraw_url = {
        url: `${sptxurl}`,
        headers: JSON.parse(sphd),
    	}
   $.get(withdraw_url,async(error, response, data) =>{
    try{
        const result = JSON.parse(data)
        $.log(data)
        if(result.errno == 0){
        console.log(`${result.message}\n`)
        console.log(`成功提现0.3元\n`)
        message += `成功提现0.3元\n`
        await notify.sendNotify('@提现啦@'+$.name,message+note)
        }else{
        console.log('👀提现错误'+result.message+'\n')
        }
        }catch(e) {
          $.logErr(e, response);
      } finally {
        resolve();
      }
    })
   })
}

//wallet
async function wallet(){
let url = sphd.replace(/&video_id=\d{5}/,``)
 return new Promise((resolve) => {
    let wallet_url = {
   		url: `https://ranlv.lvfacn.com/api.php/Share/wallet?&&list_rows=1&page=1&type=2&member_id=${myid}&${url}`,
    	headers: JSON.parse(spsignurl),
    	}
   $.post(wallet_url,async(error, response, data) =>{
    try{
        $.log(`设置的金额为${cash}\n`)
        const result = JSON.parse(data)
        if(logs) $.log(data)
        if(result.code == 0){
        let hour,minute,second,year,month,day;
year = (new Date()).getFullYear();
month = (new Date()).getMonth() + 1;
day = (new Date()).getDate();
if (month >= 1 && month <= 9) {
            month = "0" + month;
    }
if (day >= 0 && day <= 9) {
            day = "0" + day;
   }
hour = (new Date()).getHours();
minute = (new Date()).getMinutes();
second = (new Date()).getSeconds();
let now = Number(year+month+day+hour+minute+second)
let cashArr = result.data.data.data.find(item => item.description === '提现')
let create_time = Number(cashArr.serialnum.match(/\d{14}/))
if(now - create_time >= 1000000){
$.log(`设置的提现金额为${cash},开始提现\n`)
await withdraw()
}
        }else{
        console.log('👀'+result.msg+'\n')
        }
        }catch(e) {
          $.logErr(e, response);
      } finally {
        resolve();
      }
    })
   })
}
//sleep
function sleep(time){
	 return new Promise((resolve) => setTimeout(resolve,time));
}
//reduce
Array.prototype.distinct = function (){
 var arr = this,
  result = [],
  len = arr.length;
 arr.forEach(function(v, i ,arr){  //这里利用map，filter方法也可以实现
  var bool = arr.indexOf(v,i+1);  //从传入参数的下一个索引值开始寻找是否存在重复
  if(bool === -1){
   result.push(v);
  }
 })
 return result;
};
//showmsg
async function showmsg(){
if(tz==1){
    $.log(message+note)
    if ($.isNode()){
      if (hour == 23) {
         await notify.sendNotify($.name,message+note)
       }
     }/*
     else{
             $.log(message+note)
               $.msg(zhiyi,'',message+note)
        }*/
   }else{
       $.log(message+note)
    }
 }


function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
