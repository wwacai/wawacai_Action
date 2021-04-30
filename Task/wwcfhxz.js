
const $ = Env('fhxz')
const notify = $.isNode() ?require('./sendNotify') : '';
let status, videoid,myid,supportvideoid,supportrank,show,message,note,random,wkpower,CGanswer,CGbdid,gameindex ,subtype,subType,farmlandId,itemId,title,cashAmount
status = (status = ($.getval("wkstatus") || "1") ) > 1 ? `${status}` : ""; // 账号扩展字符
//const CGHDArr = [], CGIDArr = []
let CGHD = $.getdata('CGHD')
let CGID = $.getdata('CGID')
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


const CGHDArr = ['{"Accept-Encoding":"gzip,deflate,br","Connection":"keep-alive","Content-Type":"application/octet-stream","Host":"sunnytown.hyskgame.com","User-Agent":"fuhaoxiaozhen/22CFNetwork/1128.0.1Darwin/19.6.0","Accept-Language":"zh-cn","X-Unity-Version":"2019.2.9f1"}','{"Accept-Encoding":"gzip,deflate,br","Connection":"keep-alive","Content-Type":"application/octet-stream","Host":"sunnytown.hyskgame.com","User-Agent":"fuhaoxiaozhen/22CFNetwork/1128.0.1Darwin/19.6.0","Accept-Language":"zh-cn","X-Unity-Version":"2019.2.9f1"}','{"Accept-Encoding":"gzip,deflate,br","Connection":"keep-alive","Content-Type":"application/octet-stream","Host":"sunnytown.hyskgame.com","User-Agent":"fuhaoxiaozhen/22CFNetwork/1128.0.1Darwin/19.6.0","Accept-Language":"zh-cn","X-Unity-Version":"2019.2.9f1"}','{"Accept-Encoding":"gzip,deflate,br","Connection":"keep-alive","Content-Type":"application/octet-stream","Host":"sunnytown.hyskgame.com","User-Agent":"fuhaoxiaozhen/22CFNetwork/1128.0.1Darwin/19.6.0","Accept-Language":"zh-cn","X-Unity-Version":"2019.2.9f1"}','{"Accept-Encoding":"gzip,deflate,br","Connection":"keep-alive","Content-Type":"application/octet-stream","Host":"sunnytown.hyskgame.com","User-Agent":"fuhaoxiaozhen/22CFNetwork/1128.0.1Darwin/19.6.0","Accept-Language":"zh-cn","X-Unity-Version":"2019.2.9f1"}','{"Accept-Encoding":"gzip,deflate,br","Connection":"keep-alive","Content-Type":"application/octet-stream","Host":"sunnytown.hyskgame.com","User-Agent":"fuhaoxiaozhen/22CFNetwork/1128.0.1Darwin/19.6.0","Accept-Language":"zh-cn","X-Unity-Version":"2019.2.9f1"}']
const CGIDArr = ['187941_1619496880_261f8db29348ae0541c66bcf031cbb93','192270_1619530164_554a793159f42544f18d921f18728509','198628_1619617925_07620b1bda45fe4db845beeae23684ae','211126_1619777406_0dac8e5f20e1a8d115579922b73763fa','211465_1619787896_5988be524ef28813fd7023ff5408cb4b']//三，菜，娃1，娃2，小肥肥，
if ($.isNode()) {
  /*
  if (process.env.CGHD && process.env.CGHD.indexOf('#') > -1) {
  CGHD = process.env.CGHD.split('#');
  console.log(`您选择的是用"#"隔开\n`)
  }
  else if (process.env.CGHD && process.env.CGHD.indexOf('\n') > -1) {
   CGHD = process.env.CGHD.split('\n');
   console.log(`您选择的是用换行隔开\n`)
  } else {
   CGHD = process.env.CGHD.split()
  };

  if (process.env.CGID && process.env.CGID.indexOf('#') > -1) {
   CGID = process.env.CGID.split('#');
   console.log(`您选择的是用"#"隔开\n`)
  }
  else if (process.env.CGID && process.env.CGID.indexOf('\n') > -1) {
   CGID = process.env.CGID.split('\n');
   console.log(`您选择的是用换行隔开\n`)
  } else {
   CGID = process.env.CGID.split()
  };
  Object.keys(CGHD).forEach((item) => {
        if (CGHD[item]) {
          CGHDArr.push(CGHD[item])
        }
    });
  Object.keys(CGID).forEach((item) => {
        if (CGID[item]) {
          CGIDArr.push(CGID[item])
        }
    });
  */
    console.log(`============ 脚本执行-国际标准时间(UTC)：${new Date().toLocaleString()}  =============\n`)
    console.log(`============ 脚本执行-北京时间(UTC+8)：${new Date(new Date().getTime() + 8 * 60 * 60 * 1000).toLocaleString()}  =============\n`)
 } else {
    CGHDArr.push($.getdata('CGHD'))
    CGIDArr.push($.getdata('CGID'))
    let wkcount = ($.getval('wkcount') || '1');
  for (let i = 2; i <= wkcount; i++) {
    CGHDArr.push($.getdata(`CGHD${i}`))
    CGIDArr.push($.getdata(`CGID${i}`))
  }
}

!(async () => {
if (!CGIDArr[0]) {
    $.msg($.name, '【提示】请先获取cookie')
    return;
  }
   console.log(`------------- 共${CGIDArr.length}个账号----------------\n`)
  for (let i = 0; i < CGIDArr.length; i++) {
    if (CGIDArr[i]) {
      message = ''
      note =''
      CGHD = CGHDArr[i];
      CGID = CGIDArr[i];
      $.index = i + 1;
      console.log(`\n开始【${$.name} ${$.index}】`)
      random = Math.floor(Math.random()*(max-min+1)+min)*1000
      console.log(random);
      await refreshToken()
      await refreshstealing()
      await $.wait(random);
      await addstealing()
      await $.wait(random);
      await stealingVege()
      if ( 1< hour < 3 ){
        await txmarket_exchange()
      }
      for (let i = 1; i < 10; i++) {
        console.log('开始执行土地'+i);
        await harvest(i)
        await $.wait(random);
        }
      await Boxglod()
      await $.wait(random);
      await carglod()
      await $.wait(random);
      await lottery()
      await $.wait(random);
      await buyPet()
      await $.wait(random);
      await speedUpAll()

  }
 }
})()
    .catch((e) => $.logErr(e))
    .finally(() => $.done())

function GetCookie() {
if($request&&$request.url.indexOf("get_user_data")>=0) {
   const CGHD = $request.url.split('&')[7]
   if(CGHD)     $.setdata(CGHD,`CGHD${status}`)
   $.log(`[${wawacai}] 获取CGHD请求: 成功,CGHD: ${CGHD}`)
   $.msg(`CGHD${status}: 成功🎉`, ``)
   const CGID = $request.url.split('&')[10]
    if(CGID)    $.setdata(CGID,`CGID${status}`)
    $.log(`[${wawacai}] 获取CGID请求: 成功,CGID: ${CGID}`)
    $.msg(`CGID${status}: 成功🎉`, ``)
}
}


//refreshToken
async function refreshToken(){
 return new Promise((resolve) => {
    let refreshToken_url = {
        url: `https://sunnytown.hyskgame.com/api/messages?accessToken=&msgtype=account_signInAccessToken`,
        headers: JSON.parse(CGHD),
        body: `[{"type":"account_signInAccessToken","data":{"accessToken":"${CGID}"}}]`
    	}
   $.post(refreshToken_url,async(error, response, data) =>{
    try{
        const result = JSON.parse(data)
        //$.log(data)
        if(result[0].type == "account_signInAccessToken"){
          CGID = result[0].data.accessToken
          console.log(`🎈刷新token成功 \n`)//${CGID}
        }else{
          console.log('👀刷新token失败'+result[0].data.message+result[0].data.rawMessage+"\n")
         }
        }catch(error) {
          $.logErr(error, response);
      } finally {
        resolve();
      }
    })
   })
  }

//carglod
async function carglod(){
 return new Promise((resolve) => {
    let carglod_url = {
        url: `https://sunnytown.hyskgame.com/api/messages?accessToken=${CGID}&msgtype=carBox_receiveCarReward`,
        headers: JSON.parse(CGHD),
        body: `[{"type":"carBox_receiveCarReward","data":{}}]`
    	}
   $.post(carglod_url,async(error, response, data) =>{
    try{
        const result = JSON.parse(data)
        //$.log(data)
        if(result[0].type == "user_notifyPropertyUpdated"){
          console.log(`🎈小车金币收获成功 收获${result[1].data.rewardProp.number}金币。 \n`)
        }else{
          console.log('👀小车金币失败'+result[0].data.message+result[0].data.rawMessage+"\n")
         }
        }catch(error) {
          $.logErr(error, response);
      } finally {
        resolve();
      }
    })
   })
  }

//Boxglod
async function Boxglod(){
 return new Promise((resolve) => {
    let carglod_url = {
        url: `https://sunnytown.hyskgame.com/api/messages?accessToken=${CGID}&msgtype=carBox_receiveBoxReward`,
        headers: JSON.parse(CGHD),
        body: `[{"type":"carBox_receiveBoxReward","data":{}}]`
    	}
   $.post(carglod_url,async(error, response, data) =>{
    try{
        const result = JSON.parse(data)
        //$.log(data)
        if(result[0].type == "user_notifyPropertyUpdated"){
          console.log(`🎈热气球收获成功 收获${result[1].data.rewardProp.number}金币。 \n`)
        }else{
          console.log('👀热气球失败'+result[0].data.message+result[0].data.rawMessage+"\n")
         }
        }catch(error) {
          $.logErr(error, response);
      } finally {
        resolve();
      }
    })
   })
  }


//refreshstealing
async function refreshstealing(){
return new Promise((resolve) => {
  let refreshstealing_url = {
      url: `https://sunnytown.hyskgame.com/api/messages?accessToken=${CGID}&msgtype=stealingVege_refreshTargetUsers`,
      headers: JSON.parse(CGHD),
      body: `[{"type":"stealingVege_refreshTargetUsers","data":{}}]`
    }
 $.post(refreshstealing_url,async(error, response, data) =>{
  try{
      const result = JSON.parse(data)
      //$.log(data)
      if(result[0].type == "stealingVege_addTicket"){
        console.log(`🎈刷新偷取列表成功 。\n`)
      }else{
        console.log('👀刷新偷取列表失败'+result[0].data.message+result[0].data.rawMessage+"\n")
       }
      }catch(error) {
        $.logErr(error, response);
    } finally {
      resolve();
    }
  })
 })
}


  //addstealing
  async function addstealing(){
   return new Promise((resolve) => {
      let addstealing_url = {
          url: `https://sunnytown.hyskgame.com/api/messages?accessToken=${CGID}&msgtype=stealingVege_addTicket`,
          headers: JSON.parse(CGHD),
          body: `[{"type":"stealingVege_addTicket","data":{}}]`
      	}
     $.post(addstealing_url,async(error, response, data) =>{
      try{
          const result = JSON.parse(data)
          //$.log(data)
          if(result[0].type == "stealingVege_addTicket"){
            console.log(`🎈增加偷取次数成功 剩余增加次数${result[0].data.stealingVege.remainingAddTickets}。 \n`)
          }else{
            console.log('👀增加偷取次数失败'+result[0].data.message+result[0].data.rawMessage+"\n")
           }
          }catch(error) {
            $.logErr(error, response);
        } finally {
          resolve();
        }
      })
     })
    }

//stealingVege
async function stealingVege(){
 return new Promise((resolve) => {
    let stealingVege_url = {
        url: `https://sunnytown.hyskgame.com/api/messages?accessToken=${CGID}&msgtype=stealingVege_attackTarget`,
        headers: JSON.parse(CGHD),
        body: `[{"type":"stealingVege_attackTarget","data":{"recordId":1}}]`
    	}
   $.post(stealingVege_url,async(error, response, data) =>{
    try{
        const result = JSON.parse(data)
        //$.log(data)
        if(result[0].type == "stealingVege_attackTarget"){
          console.log(`🎈偷取成功。 \n`)
        }else{
          console.log('👀偷取失败'+result[0].data.message+result[0].data.rawMessage+"\n")
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
        url: `https://sunnytown.hyskgame.com/api/messages?accessToken=${CGID}&msgtype=lottery_draw`,
        headers: JSON.parse(CGHD),
        body: `[{"type":"lottery_draw","data":{"priceType":3001}}]`
    	}
   $.post(lottery_url,async(error, response, data) =>{
    try{
        const result = JSON.parse(data)
        //$.log(data)
        if(result[0].type == "lottery_draw"){
          console.log(`🎈抽奖成功。\n`)
        }else{
          console.log('👀抽奖失败'+result[0].data.message+result[0].data.rawMessage+"\n")
         }
        }catch(error) {
          $.logErr(error, response);
      } finally {
        resolve();
      }
    })
   })
  }

//harvest
async function harvest(farmlandId){
 return new Promise((resolve) => {
    let harvest_url = {
        url: `https://sunnytown.hyskgame.com/api/messages?accessToken=${CGID}&msgtype=farmland_harvest`,
        headers: JSON.parse(CGHD),
        body: `[{"type":"farmland_harvest","data":{"farmlandDefId":${farmlandId}}}]`
    	}
   $.post(harvest_url,async(error, response, data) =>{
    try{
        const result = JSON.parse(data)
        //$.log(data)
        //if(result[0].type == "farmland_plant"){
        if(result[0].type == "user_notifyPropertyUpdated"){
          console.log(`🎈收获成功 土地${result[2].data.farmland.farmlandDefId}收获${result[2].data.farmland.plantPriceCoin}金币。 \n`)
          random = Math.floor(Math.random()*(max-min+1)+min)*1000
          console.log(random);
          await $.wait(random);
          await plant(farmlandId)
        }else if (result[0].data.rawMessage == "Farmland not done") {
          console.log(`🎈还没成熟。\n`)
          //random = Math.floor(Math.random()*(max-min+1)+min)*1000
          //console.log(random);
          //await $.wait(random);
          //await plant(farmlandId)
        }else if (result[0].data.rawMessage == "farmland not idle") {
          random = Math.floor(Math.random()*(max-min+1)+min)*1000
          console.log(random);
          await $.wait(random);
          await repair(farmlandId)
        }
        else{
          console.log('👀收获失败'+result[0].data.message+result[0].data.rawMessage+"\n")
         }
        }catch(error) {
          $.logErr(error, response);
      } finally {
        resolve();
      }
    })
   })
  }


//repair
async function repair(farmlandId){
 return new Promise((resolve) => {
    let repair_url = {
        url: `https://sunnytown.hyskgame.com/api/messages?accessToken=${CGID}&msgtype=farmland_repair`,
        headers: JSON.parse(CGHD),
        body: `[{"type":"farmland_repair","data":{"farmlandDefId":${farmlandId}}}]`
    	}
   $.post(repair_url,async(error, response, data) =>{
    try{
        const result = JSON.parse(data)
        //$.log(data)
        if(result[0].type == "farmland_repair"){
          console.log(`🎈维修成功 土地${result[0].data.farmland.farmlandDefId}维修成功。 \n`)
          random = Math.floor(Math.random()*(max-min+1)+min)*1000
          console.log(random);
          await $.wait(random);
          await plant(farmlandId)
        }else{
          console.log('👀维修失败'+result[0].data.message+result[0].data.rawMessage+"\n")
         }
        }catch(error) {
          $.logErr(error, response);
      } finally {
        resolve();
      }
    })
   })
  }

//plant
async function plant(farmlandId){
 return new Promise((resolve) => {
    let plant_url = {
        url: `https://sunnytown.hyskgame.com/api/messages?accessToken=${CGID}&msgtype=farmland_plant`,
        headers: JSON.parse(CGHD),
        body: `[{"type":"farmland_plant","data":{"farmlandDefId":${farmlandId},"priceType":3001}}]`
    	}
   $.post(plant_url,async(error, response, data) =>{
    try{
        const result = JSON.parse(data)
        //$.log(data)
        if(result[0].type == "farmland_plant"){
          console.log(`🎈种植成功 土地${result[0].data.farmland.farmlandDefId}种植成功。 \n`)
        }else if (result[0].data.rawMessage == "SYSTEM_ADS_SHOW_SO_FAST") {
          random = Math.floor(Math.random()*(max-min+1)+min)*1000
          console.log(random);
          await $.wait(random);
          await plant2(farmlandId)
        }else if (result[0].data.rawMessage == "farmland not idle") {
          random = Math.floor(Math.random()*(max-min+1)+min)*1000
          console.log(random);
          await $.wait(random);
          await repair(farmlandId)
        }else{
          console.log('👀种植失败'+result[0].data.message+result[0].data.rawMessage+"\n")
         }
        }catch(error) {
          $.logErr(error, response);
      } finally {
        resolve();
      }
    })
   })
  }

//plant
async function plant2(farmlandId){
 return new Promise((resolve) => {
    let plant_url = {
        url: `https://sunnytown.hyskgame.com/api/messages?accessToken=${CGID}&msgtype=farmland_plant`,
        headers: JSON.parse(CGHD),
        body: `[{"type":"farmland_plant","data":{"farmlandDefId":${farmlandId},"priceType":2001}}]`
    	}
   $.post(plant_url,async(error, response, data) =>{
    try{
        const result = JSON.parse(data)
        //$.log(data)
        if(result[0].type == "farmland_plant"){
          console.log(`🎈种植成功 土地${result[0].data.farmland.farmlandDefId}种植成功。 \n`)
        }else{
          console.log('👀种植失败'+result[0].data.message+result[0].data.rawMessage+"\n")
         }
        }catch(error) {
          $.logErr(error, response);
      } finally {
        resolve();
      }
    })
   })
  }

//speedUpAll
async function speedUpAll(farmlandId){
 return new Promise((resolve) => {
    let speedUpAll_url = {
        url: `https://sunnytown.hyskgame.com/api/messages?accessToken=${CGID}&msgtype=farmland_speedUpAll`,
        headers: JSON.parse(CGHD),
        body: `[{"type":"farmland_speedUpAll","data":{"farmlandDefId":0}}]`
    	}
   $.post(speedUpAll_url,async(error, response, data) =>{
    try{
        const result = JSON.parse(data)
        //$.log(data)
        if(result[0].type == "farmland_getSpeedUp"){
          console.log(`🎈加速成功\n`)
        }else{
          console.log('👀加速失败'+result[0].data.message+result[0].data.rawMessage+"\n")
         }
        }catch(error) {
          $.logErr(error, response);
      } finally {
        resolve();
      }
    })
   })
  }

//buyPet
async function buyPet(farmlandId){
 return new Promise((resolve) => {
    let buyPet_url = {
        url: `https://sunnytown.hyskgame.com/api/messages?accessToken=${CGID}&msgtype=pet_buyPet`,
        headers: JSON.parse(CGHD),
        body: `[{"type":"pet_buyPet","data":{}}]`
    	}
   $.post(buyPet_url,async(error, response, data) =>{
    try{
        const result = JSON.parse(data)
        //$.log(data)
        if(result[0].type == "farmland_getSpeedUp"){
          console.log(`🎈购买宠物成功\n`)
        }else{
          console.log('👀购买宠物失败'+result[0].data.message+result[0].data.rawMessage+"\n")
         }
        }catch(error) {
          $.logErr(error, response);
      } finally {
        resolve();
      }
    })
   })
  }

//txmarket
async function txmarket_exchange(){
 return new Promise((resolve) => {
    let txmarket_exchange_url = {
        url: `https://sunnytown.hyskgame.com/api/messages?accessToken=${CGID}&msgtype=market_getItemList`,
        headers: JSON.parse(CGHD),
        body: `[{"type":"market_getItemList","data":{}}]`
    	}
   $.post(txmarket_exchange_url,async(error, response, data) =>{
    try{
        const result = JSON.parse(data)
        //$.log(data)
        if(result[0].type == "market_getItemList"){
          console.log(`🎈获取订单列表成功\n`)
          for (let i = 0; i < 9; i++) {
            //console.log(result[0].data.marketItemList[i].funcType)
            if(result[0].data.marketItemList[i].stateCode == 1){
              itemId = result[0].data.marketItemList[i].itemDefId
              title = result[0].data.marketItemList[i].title
              cashAmount = result[0].data.marketItemList[i].cashAmount
              console.log(`🎈订单列表${itemId} ${title}可以提现${cashAmount} \n`)
              await txmarket(itemId)
            }
            }
        }else{
          console.log('👀获取订单列表失败'+result[0].data.message+result[0].data.rawMessage+"\n")
         }
        }catch(error) {
          $.logErr(error, response);
      } finally {
        resolve();
      }
    })
   })
  }

//txmarket
async function txmarket(itemId){
 return new Promise((resolve) => {
    let txmarket_url = {
        url: `https://sunnytown.hyskgame.com/api/messages?accessToken=${CGID}&msgtype=market_exchange`,
        headers: JSON.parse(CGHD),
        body: `[{"type":"market_exchange","data":{"itemDefId":${itemId}}}]`
    	}
   $.post(txmarket_url,async(error, response, data) =>{
    try{
        const result = JSON.parse(data)
        //$.log(data)
        if(result[0].type == "market_exchange"){
          console.log(`🎈🎈订单 ${result[1].data.marketItem.title}提现${result[1].data.marketItem.cashAmount}\成功🎈🎈 \n`)
        }else if(result[0].type == "backpack_notifyItemUpdated"){
          console.log(`🎈🎈订单 ${result[1].data.marketItem.title}提现${result[1].data.marketItem.cashAmount}\成功🎈🎈 \n`)
        }else{
          console.log('👀订单提现失败'+result[0].data.message+result[0].data.rawMessage+"\n")
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
