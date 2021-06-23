/*
[rewrite_local]
https:\/\/bp-api.coohua.com\/shua-lovegn\/* url script-request-header https://raw.githubusercontent.com/wwacai/wawacai_Action/main/Task/asgy.js
[MITM]
hostname = bp-api.coohua.com
*/

const $ = Env('果园')
let status;
status = (status = ($.getval("asgystatus") || "1") ) > 1 ? `${status}` : ""; // 账号扩展字符
//const qlphdArr = [],kzyhdArr = [],qlpcount = ''
let times = Math.round(Date.now() / 1000)
let qlphd = $.getdata('qlphd')
let kzyhd = $.getdata('kzyhd')

function GetCookie() {
    //签到
    if ($request && $request.url.indexOf("/free/water") >= 0) {
        //const xiaoleurlVal = $request.url;
        const asgyhd1 = JSON.stringify($request.headers);
        if(asgyhd1){
          $.setdata(asgyhd1,`asgyhd1${status}`)
          $.log(asgyhd1)
          $.msg($.name,"",'asgyhd1'+`${status}` +'数据获取成功！')
        }
    }
    if ($request && $request.url.indexOf("/task/receive/common") >= 0) {
        //const xiaoleurlVal = $request.url;
        const asgyhd2 = JSON.stringify($request.headers);
        if(asgyhd2){
          $.setdata(asgyhd2,`asgyhd2${status}`)
          $.log(asgyhd2)
          $.msg($.name,"",'asgyhd2'+`${status}` +'数据获取成功！')
        }
    }
}


//CK运行
let isGetCookie = typeof $request !== 'undefined'

!(async () => {
  if (isGetCookie) {
      GetCookie()
  }else{
    console.log('本地运行，跳过获取cookies');
  }
   console.log(`------------- 开始运行 ----------------\n`)
  if ($.getdata('mmhd')) {
    $.index = i + 1;
    console.log(`\n开始【${$.name} ${$.index}】`)
   }
})()
    .catch((e) => $.logErr(e))
    .finally(() => $.done())
    
