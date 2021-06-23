/*
[rewrite_local]
https://bp-api.coohua.com/shua-lovegn url script-request-header https://raw.githubusercontent.com/wwacai/wawacai_Action/main/Task/asgy.js

[MITM]
hostname = bp-api.coohua.com

*/

const $ = new Env('asgy');
let status;
status = (status = ($.getval("asgystatus") || "1") ) > 1 ? `${status}` : ""; // 账号扩展字符

if (typeof $request !== 'undefined') {
  if ($request.url.indexOf("free/water") > -1) {
     const asgyhd1 = JSON.stringify($request.headers)
     if(asgyhd1)    $.setdata(asgyhd1,`asgyhd1${status}`)
     $.log(asgyhd1)
     $.msg($.name,"",'asgyhd1'+`${status}` +'数据获取成功！')
   }
  if ($request.url.indexOf("task/receive/common") > -1) {
     const asgyhd2 = JSON.stringify($request.headers)
     if(asgyhd2)    $.setdata(asgyhd2,`asgyhd2${status}`)
     $.log(asgyhd2)
     $.msg($.name,"",'asgyhd2'+`${status}` +'数据获取成功！')
   }
}

