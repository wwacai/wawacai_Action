/*
[rewrite_local]
https:\/\/bp-api.coohua.com\/shua-lovegn\/* url script-request-header https://raw.githubusercontent.com/wwacai/wawacai_Action/main/Task/asgy.js

[MITM]
hostname = bp-api.coohua.com

*/

const $ = new Env('asgy');
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
}


if (typeof $request !== 'undefined') {
    GetCookie()
    $.done();

} else {
    !(async () => {
        $.msg($.name,"开始🎉🎉🎉")
    })()
    .catch((e) => {
            $.log('', `❌ ${O}, 失败! 原因: ${e}!`, '')
        })
        .finally(() => {
            $.done();
        })
}
