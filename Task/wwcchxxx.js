/*
[mitm]
hostname = xxx2.67mob.com
#圈x
[rewrite local]
https://xxx2.67mob.com/v2/auth/login-by-wx url script-request-header https://raw.githubusercontent.com/wwacai/wawacai_Action/main/Task/wwcchxxx.js

*/


const $ = Env('chxxx')
const notify = $.isNode() ?require('./sendNotify') : '';
let status, videoid,myid,supportvideoid,supportrank,show,message,note,random,wkpower,CGanswer,CGbdid,gameindex ,subtype,subType,farmlandId,itemId,title,cashAmount,chtoken,chhd
status = (status = ($.getval("wkstatus") || "1") ) > 1 ? `${status}` : ""; // 账号扩展字符
//const chbodyArr = [], chidArr = []
let chbody = $.getdata('chbody')
let chid = $.getdata('chid')
let tz = ($.getval('tz') || '1');//0关闭通知，1默认开启
let cash = ($.getval('rlcash') || '1')//默认不自动提现
const logs =0;//0为关闭日志，1为开启

let min = 35;
let max = 45;

var hour=''
var minute=''
if ($.isNode()) {
   hour = new Date( new Date().getTime() + 8 * 60 * 60 * 1000 ).getHours();
   minute = new Date( new Date().getTime() + 8 * 60 * 60 * 1000 ).getMinutes();
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


///const chbodyArr = ['{"access_token":"45_GEmC4s7kIebMmVTv6mTSXI0h6ZLwhzHRqre-NAjBqtgbItu3V_bHecHd4IvJaZ76Dwot88LlN-1UB5MjZoyHyrIZ7z2WYiyAcO-Y3rbIab8","channel_id":188,"channel_sub_id":1,"device_no":"dad650934163052bd0048b254b4aa805","gender":1,"head_url":"https://thirdwx.qlogo.cn/mmopen/vi_32/KUQlIP30FJPB7rTr1ibRDqnVGeDEVDQHnClG7Nt39rsUibt9JqF2HhmwZ5A5Ng5eVcGeZntcoYEEZ7rrjlWib3aMQ/132","nick":"三加一","open_id":"oxwz-wPdmdBdcNHajwWOGEosNGKc","union_id":"oZ5V-5tTWcAg63X3WJnIKtRalPqA","idfa":"BB69F700-679A-40BF-905E-18241BB18689","imei":"","os_type":0,"os_version":1,"version":"1.8.0"}']
const chidArr = ['30569','30958','30961','30959','30960']//三，菜，小肥肥，娃1，娃2，
const chhdArr = ['{"uid":"30569","Connection":"keep-alive","Content-Type":"application/x-www-form-urlencoded","Accept-Encoding":"gzip, deflate, br","Host":"xxx2.67mob.com","Content-Length":"92","User-Agent":"PopStar-master-mobile/3.0 CFNetwork/1128.0.1 Darwin/19.6.0","Accept-Language":"zh-cn","token":"2b0e20f7-a029-4aa5-bb95-5e456bb1c6a5","Cache-Control":"no-cache"}','{'Accept':'*/*','uid':'30958','Connection':'keep-alive','Content-Type':'application/x-www-form-urlencoded','Accept-Encoding':'gzip, deflate, br','Host':'xxx2.67mob.com','User-Agent':'PopStar-master-mobile/3.0 CFNetwork/1128.0.1 Darwin/19.6.0','Accept-Language':'zh-cn','token':'2613d2a3-68bd-4cb8-b7fb-defcde3f09aa','Cache-Control':'no-cache'}','{'Accept':'*/*','uid':'30961','Connection':'keep-alive','Content-Type':'application/x-www-form-urlencoded','Accept-Encoding':'gzip, deflate, br','Host':'xxx2.67mob.com','User-Agent':'PopStar-master-mobile/3.0 CFNetwork/1128.0.1 Darwin/19.6.0','Accept-Language':'zh-cn','token':'2dc7bb5c-ab50-4f7e-93f2-64768b9929af','Cache-Control':'no-cache'}','{'Accept':'*/*','uid':'30959','Connection':'keep-alive','Content-Type':'application/x-www-form-urlencoded','Accept-Encoding':'gzip, deflate, br','Host':'xxx2.67mob.com','User-Agent':'PopStar-master-mobile/3.0 CFNetwork/1128.0.1 Darwin/19.6.0','Accept-Language':'zh-cn','token':'dd23895c-35d3-4a10-baac-20d692fe9ab2','Cache-Control':'no-cache'}''{'Accept':'*/*','uid':'30960','Connection':'keep-alive','Content-Type':'application/x-www-form-urlencoded','Accept-Encoding':'gzip, deflate, br','Host':'xxx2.67mob.com','User-Agent':'PopStar-master-mobile/3.0 CFNetwork/1128.0.1 Darwin/19.6.0','Accept-Language':'zh-cn','token':'150c1afc-0200-4c4c-9ee8-d09b6a070b11','Cache-Control':'no-cache'}']

/*
if ($.isNode()) {
  if (process.env.chbody && process.env.chbody.indexOf('#') > -1) {
  chbody = process.env.chbody.split('#');
  console.log(`您选择的是用"#"隔开\n`)
  }
  else if (process.env.chbody && process.env.chbody.indexOf('\n') > -1) {
   chbody = process.env.chbody.split('\n');
   console.log(`您选择的是用换行隔开\n`)
  } else {
   chbody = process.env.chbody.split()
  };
  Object.keys(chbody).forEach((item) => {
        if (chbody[item]) {
          chbodyArr.push(chbody[item])
        }
    });
    console.log(`============ 脚本执行-国际标准时间(UTC)：${new Date().toLocaleString()}  =============\n`)
    console.log(`============ 脚本执行-北京时间(UTC+8)：${new Date(new Date().getTime() + 8 * 60 * 60 * 1000).toLocaleString()}  =============\n`)
 } else {
    //chbodyArr.push($.getdata('chbody'))
    let wkcount = ($.getval('wkcount') || '1');
  for (let i = 1; i <= wkcount; i++) {
    chbodyArr.push($.getdata(`chbody${i}`))
  }
}

*/

!(async () => {
if (!chhdArr[0]) {
    $.msg($.name, '【提示】请先获取cookie')
    return;
  }
   console.log(`------------- 共${chhdArr.length}个账号----------------\n`)
  for (let i = 0; i < chhdArr.length; i++) {
    if (chhdArr[i]) {
      message = ''
      note =''
      chhd = chhdArr[i];
      chid = chidArr[i];
      $.index = i + 1;
      console.log(`\n开始【${$.name} ${$.index}】`)
      await userinfo()
      if ( 8< hour < 10 ||   17< hour  < 19 ){
        await signin()
        await diamond()
        await lotteryad()
      }
      await diamond()
      for (let i = 1; i < 5; i++) {
         await gamestart()
      }
      await lottery()

  }
 }
})()
    .catch((e) => $.logErr(e))
    .finally(() => $.done())

function GetCookie() {
if($request&&$request.url.indexOf("login-by-wx")>=0) {
   const chbody = $request.body
   if(chbody)     $.setdata(chbody,`chbody${status}`)
   $.log(`[${wawacai}] 获取chbody请求: 成功,chbody: ${chbody}`)
   $.msg(`chbody${status}: 成功🎉`, ``)
}
}


//refreshToken
async function refreshToken(){
 return new Promise((resolve) => {
    let refreshToken_url = {
        url: `https://xxx2.67mob.com/v2/auth/login-by-wx`,
        headers: {
                'Accept-Encoding' : `gzip, deflate, br`,
                'Connection' : `keep-alive`,
                'Content-Type' : `application/x-www-form-urlencoded`,
                'Cache-Control' : `no-cache`,
                'Host' : `xxx2.67mob.com`,
                'User-Agent' : `PopStar-master-mobile/3.0 CFNetwork/1128.0.1 Darwin/19.6.0`,
                'Accept-Language' : `zh-cn`
                },
        body: chbody
            }
   $.post(refreshToken_url,async(error, response, data) =>{
    try{
        const result = JSON.parse(data)
        $.log(data)
        //$.log(JSON.stringify(refreshToken_url))
        if(result.code == 0){
          chtoken = result.token
          chid = result.uid
          console.log(`🎈刷新token成功 \n`)//${chid}
          console.log(chtoken)//${chid}
          return chtoken
          return chid
        }else{
          console.log('👀刷新token失败'+result.err_msg+data+"\n")
         }
        }catch(error) {
          $.logErr(error, response);
      } finally {
        resolve();
      }
    })
   })
  }

//userinfo
async function userinfo(){
 return new Promise((resolve) => {
    let userinfo_url = {
        url: `https://xxx2.67mob.com/v2/xxx-game/get-userinfo`,
        headers: chhd,
        body: `{"uid":${chid},"channel_id":188}`
      }
   $.post(userinfo_url,async(error, response, data) =>{
    try{
        const result = JSON.parse(data)
        $.log(data)
        //$.log(JSON.stringify(userinfo_url))
        if(result.uid != 0){
          console.log(`🎈获取个人信息成功 \n`)
          console.log(`🎈现有钻石数${result.diamond} 现有金币数${result.gold_coin} 总计观看广告数${result.ad_num} 总计提现数${result.with_drawal_times}  \n`)
        }else{
          console.log('👀获取个人信息失败'+result.err_msg+data+"\n")
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
        url: `https://xxx2.67mob.com/v2/xxx-game/get-userinfo`,
        headers: chhd,
        body: `{"channel_id":188,"type":1}`
      }
   $.post(signin_url,async(error, response, data) =>{
    try{
        const result = JSON.parse(data)
        $.log(data)
        //$.log(JSON.stringify(userinfo_url))
        if(result.uid != 0){
          console.log(`🎈签到成功 \n`)
          //console.log(`🎈现有钻石数${result.diamond} 现有金币数${result.gold_coin} 总计观看广告数${result.ad_num} 总计提现数${result.with_drawal_times}  \n`)
        }else{
          console.log('👀签到失败'+result.err_msg+data+"\n")
         }
        }catch(error) {
          $.logErr(error, response);
      } finally {
        resolve();
      }
    })
   })
  }

//gamestart
async function gamestart(){
 return new Promise((resolve) => {
    let gamestart_url = {
        url: `https://xxx2.67mob.com/v2/xxx-game/start`,
        headers: chhd,
        body: `{"channel_id":188}`
      }
   $.post(gamestart_url,async(error, response, data) =>{
    try{
        const result = JSON.parse(data)
        $.log(data)
        //$.log(JSON.stringify(gamestart_url))
        if(result.code == 0){
          console.log(`🎈开始游戏成功 \n`)
          random = Math.floor(Math.random()*(max-min+1)+min)*1000
          console.log(random);
          await $.wait(random);
          await gamepass()

        }else{
          console.log('👀开始游戏失败'+result.err_msg+data+"\n")
         }
        }catch(error) {
          $.logErr(error, response);
      } finally {
        resolve();
      }
    })
   })
  }

//gamestart
async function gamepass(){
 return new Promise((resolve) => {
    let gamepass_url = {
        url: `https://xxx2.67mob.com/v2/xxx-game/pass`,
        headers: chhd,
        body: `{"gk":6,"score":${Math.floor(Math.random()*(2500-1000+1)+1000)},"win":1}`
      }
   $.post(gamepass_url,async(error, response, data) =>{
    try{
        const result = JSON.parse(data)
        $.log(data)
        //$.log(JSON.stringify(gamepass_url))
        if(result.code == 0){
          console.log(`🎈游戏通关成功 \n`)
          console.log(`🎈获取钻石${result.diamond}个 金币数${result.gold_coin}个 观看广告获得${result.ad_mul}个钻石 \n`)
          if(result.diamond == 0){
            await gameplus()
          }
          random = Math.floor(Math.random()*(max-min+1)+min)*1000
          console.log(random);
          await $.wait(random);
          await gamead()

        }else{
          console.log('👀游戏通关失败'+result.err_msg+data+"\n")
         }
        }catch(error) {
          $.logErr(error, response);
      } finally {
        resolve();
      }
    })
   })
  }

//gamead
async function gamead(){
 return new Promise((resolve) => {
    let gamead_url = {
        url: `https://xxx2.67mob.com/v2/xxx-game/play-ad`,
        headers: chhd,
        body: `{"action_type":3,"ad_company":"2","ad_pos_id":128,"channel_id":188,"channel_sub_id":1,"gk":6}`
      }
   $.post(gamead_url,async(error, response, data) =>{
    try{
        const result = JSON.parse(data)
        $.log(data)
        //$.log(JSON.stringify(gamead_url))
        if(result.code == 0){
          console.log(`🎈游戏通关翻倍成功 \n`)
          console.log(`🎈获取钻石${result.prop_num}个 \n`)
          random = Math.floor(Math.random()*(max-min+1)+min)*1000
          console.log(random);
          await $.wait(random);
        }else{
          console.log('👀游戏通关翻倍失败'+result.err_msg+data+"\n")
         }
        }catch(error) {
          $.logErr(error, response);
      } finally {
        resolve();
      }
    })
   })
  }

//gameplus
async function gameplus(){
 return new Promise((resolve) => {
    let gameplus_url = {
        url: `https://xxx2.67mob.com/v2/xxx-game/play-ad`,
        headers: chhd,
        body: `{"action_type":3,"ad_company":"3","ad_pos_id":120,"channel_id":188,"channel_sub_id":1,"gk":6}`
      }
   $.post(gameplus_url,async(error, response, data) =>{
    try{
        const result = JSON.parse(data)
        $.log(data)
        //$.log(JSON.stringify(gameplus_url))
        if(result.code == 0){
          console.log(`🎈补充体力成功 \n`)
          //console.log(`🎈获取钻石${result.diamond} 金币数${result.gold_coin} 观看广告获得${result.ad_mul} \n`)
        }else{
          console.log('👀补充体力失败'+result.err_msg+data+"\n")
         }
        }catch(error) {
          $.logErr(error, response);
      } finally {
        resolve();
      }
    })
   })
  }


//diamond
async function diamond(){
 return new Promise((resolve) => {
    let diamond_url = {
        url: `https://xxx2.67mob.com/v2/xxx-game/play-ad`,
        headers: chhd,
        body: `{"action_type":3,"ad_company":"2","ad_pos_id":31,"channel_id":188,"channel_sub_id":1,"gk":6}`
      }
   $.post(diamond_url,async(error, response, data) =>{
    try{
        const result = JSON.parse(data)
        $.log(data)
        //$.log(JSON.stringify(diamond_url))
        if(result.code == 0){
          console.log(`🎈领取钻石成功 \n`)
          console.log(`🎈获取钻石${result.prop_num}个 \n`)
        }else{
          console.log('👀领取钻石失败'+result.err_msg+data+"\n")
         }
        }catch(error) {
          $.logErr(error, response);
      } finally {
        resolve();
      }
    })
   })
  }


//lotteryad
async function lotteryad(){
 return new Promise((resolve) => {
    let lotteryad_url = {
        url: `https://xxx2.67mob.com/v2/xxx-game/play-ad`,
        headers: chhd,
        body: `{"action_type":3,"ad_company":"2","ad_pos_id":36,"channel_id":188,"channel_sub_id":1,"gk":6}`
      }
   $.post(lotteryad_url,async(error, response, data) =>{
    try{
        const result = JSON.parse(data)
        $.log(data)
        //$.log(JSON.stringify(diamond_url))
        if(result.code == 0){
          console.log(`🎈转盘广告成功 \n`)
          console.log(`🎈获取钻石${result.prop_num}个 \n`)
          await lotteryad2()
        }else{
          console.log('👀转盘广告失败'+result.err_msg+data+"\n")
         }
        }catch(error) {
          $.logErr(error, response);
      } finally {
        resolve();
      }
    })
   })
  }

//lotteryad2
async function lotteryad2(){
 return new Promise((resolve) => {
    let lotteryad2_url = {
        url: `https://xxx2.67mob.com/v2/xxx-game/playad-for-lottery`,
        headers: chhd,
        body: ``
      }
   $.post(lotteryad2_url,async(error, response, data) =>{
    try{
        const result = JSON.parse(data)
        $.log(data)
        //$.log(JSON.stringify(diamond_url))
        if(result.code == 0){
          console.log(`🎈转盘广告2成功 \n`)
          console.log(`🎈获取钻石${result.prop_num}个 \n`)
        }else{
          console.log('👀转盘广告2失败'+result.err_msg+data+"\n")
         }
        }catch(error) {
          $.logErr(error, response);
      } finally {
        resolve();
      }
    })
   })
  }


//lottery
async function lottery(){
 return new Promise((resolve) => {
    let lottery_url = {
        url: `https://xxx2.67mob.com/v2/xxx-game/lottery3`,
        headers: chhd,
        body: `{"uid":${chid}}`
      }
   $.post(lottery_url,async(error, response, data) =>{
    try{
        const result = JSON.parse(data)
        $.log(data)
        //$.log(JSON.stringify(diamond_url))
        if(result.code == 0){
          console.log(`🎈转盘成功 \n`)
          console.log(`🎈获取${result.des}${result.prop_num}个 \n`)
        }else{
          console.log('👀转盘失败'+result.err_msg+data+"\n")
         }
        }catch(error) {
          $.logErr(error, response);
      } finally {
        resolve();
      }
    })
   })
  }


function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
