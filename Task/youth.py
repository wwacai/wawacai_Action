#!/usr/bin/env python3
# _*_ coding:utf-8 _*_

# 此脚本参考 https://github.com/Sunert/Scripts/blob/master/Task/youth.js

import traceback
import time
import re
import json
import sys
import os
from util import send, requests_session
from datetime import datetime, timezone, timedelta

# YOUTH_HEADER 为对象, 其他参数为字符串
# 选择微信提现30元，立即兑换，在请求包中找到withdraw2的请求，拷贝请求body类型 p=****** 的字符串，放入下面对应参数即可 YOUTH_WITHDRAWBODY
# 分享一篇文章，找到 put.json 的请求，拷贝请求体，放入对应参数 YOUTH_SHAREBODY
# 清除App后台，重新启动App，找到 start.json 的请求，拷贝请求体，放入对应参数 YOUTH_STARTBODY

#三加一
cookies1 = {
  'YOUTH_HEADER': {"Accept-Encoding":"gzip,deflate,br","Cookie":"Hm_lvt_268f0a31fc0d047e5253dd69ad3a4775=1616720387,1616726984,1616727057,1616727219;Hm_lvt_6c30047a5b80400b0fd3f410638b8f0c=1616720387,1616726984,1616727056,1616727219;sensorsdata2019jssdkcross=%7B%22distinct_id%22%3A%2252463773%22%2C%22%24device_id%22%3A%22177ccb021f1baa-00366a85d28b828-3c176b50-370944-177ccb021f2f11%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E7%9B%B4%E6%8E%A5%E6%B5%81%E9%87%8F%22%2C%22%24latest_referrer%22%3A%22%22%2C%22%24latest_referrer_host%22%3A%22%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC_%E7%9B%B4%E6%8E%A5%E6%89%93%E5%BC%80%22%7D%2C%22first_id%22%3A%22177ccb021f1baa-00366a85d28b828-3c176b50-370944-177ccb021f2f11%22%7D","Connection":"keep-alive","Content-Type":"","Accept":"*/*","Host":"kd.youth.cn","User-Agent":"Mozilla/5.0(iPhone;CPUiPhoneOS13_6_1likeMacOSX)AppleWebKit/605.1.15(KHTML,likeGecko)Mobile/15E148","Referer":"https://kd.youth.cn/h5/20190301taskcenter/ios/index.html?uuid=e55a2ce90c05c30d05d4df7fd4fce4c1&sign=7f4ccf0cb46d38d660f0254b0825ccd4&channel_code=80000000&uid=52463773&channel=80000000&access=Wlan&app_version=2.0.0&device_platform=iphone&cookie_id=41673bc5b5763861924aad168edb996d&openudid=e55a2ce90c05c30d05d4df7fd4fce4c1&device_type=1&device_brand=iphone&sm_device_id=20201227084142ef644179c39e692fcdc665eb5383e4830171ca8abc68a8f8&device_id=49236828&version_code=200&os_version=13.6.1&cookie=MDAwMDAwMDAwMJCMpN-w09Wtg5-Bb36eh6CPqHualq2jmrCarWOwzYVrhLKYma7eqmqXr6NthJl7mI-shMmXeqDau4StacS3o7GFonqWrqmyZYN5fW6EY2Ft&device_model=iPhone_6_Plus&subv=1.5.1&&cookie=MDAwMDAwMDAwMJCMpN-w09Wtg5-Bb36eh6CPqHualq2jmrCarWOwzYVrhLKYma7eqmqXr6NthJl7mI-shMmXeqDau4StacS3o7GFonqWrqmyZYN5fW6EY2Ft&cookie_id=41673bc5b5763861924aad168edb996d","Accept-Language":"zh-cn","X-Requested-With":"XMLHttpRequest"},
  'YOUTH_READBODY': 'p=9NwGV8Ov71o%3DGvDnjwMsu_lk8V15hrmPeFtKCBAoDX5kGur-cnFinG3YJaQn1aQuAf0HfbLO2j-FcQ8OlvBB8WMYdl7m77g2xANyr2PaCxHFkmIETQ3wdQgHpLiLcNDtb8idxaL_P3MQVnNizQsrLzSCJp5ESuB1rag_BcGfX1c8u6XWNIz6f_frO5n4xgDm2aFKC4e8F6wGN65h0b70EDI8b_ey6EyvFtSFr80necMNiLMpbfP9sTBXeF0e5NdX_0ykXv8a7HtLat9MyngR9lAZ_IZ8Syls6hrjdPsdF0EBcQCjlJt-7NvqMJucuuBHjJ9AKftr38iPZEtMKr1Joc7GENo-fdST77jLNV0LTp0YQIr_x4Uhh5wcJLSwUraTLz4v6hsBy5gGDe3YMxwODQy05ZUOJ3hyTXkbe687DeSg6ur0taYOCn-G6eUhJT6MHq_wqppL3lCqzd5RJ5-YI4dKo4dBzIBxJv37eNUOsm89PZWnFJbl6SvT0Zwf-NoDSZHO0yOgx62o1tTjFzSmIbQyIX96ANI9-LbJ7tayh2lCfTLwJjoCZYohIAPJB0FbxDKt-O7tEAIFrSwtSEfofHoDCWf0-FwTxfKf_CBItcmHSRCzPOC2OBRtuHfAt1QD386_cjKDzUP48GKhgb8Kz2yPt5AAd0w44vmIMr44XzXxtDd_h4AV3meB0axpIjENbCgTAfepOJlF1lowqLN8_mwvQqJo34V0vq4gu0r3ZFnl2bgOjV9MTfrgFc8ApOS8HPYWRALAu-rGeUL1zklk8P2J9y58apfOlHKt0h8Huqlfd1bAi1oJ0w6Lk9K5fWFJWEBU8ml4nGsvlRd-nO0q94byAGB4j4cJNhAG7zD8zdT6KWb0HXnS7oT4sXe51qjmhQ%3D%3D',
  'YOUTH_READTIMEBODY': 'p=9NwGV8Ov71o%3DGvDnjwMsu_ld4qx0YVkhCGSN79Nz9uYVRT2FlKyzzeRQkfNpi91m1uMr6_-349OB-6aJlP8QT1ZdQPfuBKAN73038JxG2PDvPLwzRpKLSOsodHj_5p2KvGLJLTxe6lfbK5_TBTkHhXvca5GLmeMMIM2me3E4Xk0LlYXICZPYUVReEICz7TFQo9ZG4ocF1vdped2B506aEWc1YyxSkeFTQ4YSrmF8rv5e2MVjo7S6kmSK_qDCao58WHvRXswXcdZTEE-pCiQmrz8HGOeDbe41euJ435T8bWJL46Ag0orqYfWk9s8vOM0atXXIs1GSFnynsRvoHYlTBbGFyMqU5CAOYvijWRsW5jWKD3kAsE_ZJbCjNFHtqFtixyuQSa8vjeVYKWFVe7Ioj5DF4v5JPjhqSobKzQayYLpNAKnbe5KxIboVn9dM3iBlmE9ohbluNXEsHV7Awa-pgvJUucdP6nu_3iKp61dfvNY6uut7bwmt6M7BGnsK02sBpzlKu8uD5JLty-lyNRnzTt-geGB2bciamIDZ82jYXtCA32bbKO7gnRM_8fCvlGWCElHqQGlz1zGx5QvEKk_B_X9ufGjiQjI7upHrb0aIJRkCVO3ZW2sjLHwCxVoxeF8WCa3vdauhY_ShNuvYbZsuwTQUymoPpDp6X4VbcWO7a_pZSnagu3zmRzuqYQmGflFXdV2dpPLanrDZTqNR3W9xP9RfZWfTqgo_nuN3v-KWtQPuvvC1A0LIihnUAtAPCfQ3GamfxJOxV63iwvCefr6ZsI8OFPFiV_rVbGVzATMNVVmiIZntdIEcjhzQWrxnGZw2ofpnWtwCas8x',
  'YOUTH_WITHDRAWBODY': 'p=9NwGV8Ov71o%3DGvDnjwMsu_ld4qx0YVkhCGSN79Nz9uYVRT2FlKyzzeRQkfNpi91m1uMr6_-349OB-6aJlP8QT1ZdQPfuBKAN73038JxG2PDvPLwzRpKLSOsodHj_5p2KvGLJLTxe6lfbK5_TBTkHhXvca5GLmeMMIM2me3E4Xk0LlYXICZPYUVReEICz7TFQo9ZG4ocF1vdped2B506aEWc1YyxSkeFTQ4YSrmF8rv5e2MVjo7S6kmSK_qDCao58WHvRXswXcdZTEE-pCiQmrz8HGOeDbe41euJ435T8bWJL46Ag0orqYfWYWuFb9XMFc_vN_Actqhg7khOQy4GqY4gqEn_RWM4LjUz6VcutwIxMbN8m4MzFrh82UnfCNEKCSuBDMmsLZR03RU75UuMSCGDlHuOkN_kZVIeCBxPZZIEnerYy_7M4Vw4wEDJAlYNz--3fs1mbP7ECaf_a5wIBj-VQMixeT1fNXV-0YEFDqIsZ4JLczTh4ttGJsDIPrO432G5BaMfqJdatBYw1l0aOz_eV6agkdGMNMDdwRmu3K_zlh7HThd1EKm2Z08PuK_UCaKRLJumKbw20pExNKkskGBLqg6TIhR4X0NSXxpOT_u9Weml7f38oVXS9IaSTehJR-JIWkbmbjLi6StK35O8o_KTvCenr0hKdY-2wu0UcvNl0HZbhSAVLAR0-7DNh_SA0yNL-K6M7VmMFcYwuLb41iFudU9SVOkF12kRTJB8XWaBB6jTEGjLSW6tGGfSsUt45CUzcLqvUxnvLNEzXaUMHMilo8OOtiB7jaL6J_tsyh4K7m9HNMPuNym-W7ppa_OnunlA6-KloTJWxdGnJFRuxVzg%3D',
  'YOUTH_SHAREBODY': 'access=4G&app_version=2.0.0&article_id=37119799&channel=80000000&channel_code=80000000&cid=80000000&client_version=2.0.0&device_brand=iphone&device_id=49236828&device_model=iPhone&device_platform=iphone&device_type=iphone&from=0&is_hot=0&isnew=1&mobile_type=2&net_type=2&openudid=e55a2ce90c05c30d05d4df7fd4fce4c1&os_version=13.6.1&phone_code=e55a2ce90c05c30d05d4df7fd4fce4c1&phone_network=4G&platform=3&request_time=1616727212&resolution=828x1792&sign=e9d1bc70d9aeb4b0bfd55ab788fb2fe1&sm_device_id=20201227084142ef644179c39e692fcdc665eb5383e4830171ca8abc68a8f8&stype=WEIXIN&szlm_ddid=D2FtXlYFBR9vqoo/8dhVmIm8Q/Wu/Zr2VBt6UZzFTN47wX7e&time=1616727212&uid=52463773&uuid=e55a2ce90c05c30d05d4df7fd4fce4c1',
  'YOUTH_STARTBODY': 'access=4G&app_version=2.0.0&channel=80000000&channel_code=80000000&cid=80000000&client_version=2.0.0&device_brand=iphone&device_id=49236828&device_model=iPhone&device_platform=iphone&device_type=iphone&isnew=1&mobile_type=2&net_type=2&openudid=e55a2ce90c05c30d05d4df7fd4fce4c1&os_version=13.6.1&phone_code=e55a2ce90c05c30d05d4df7fd4fce4c1&phone_network=4G&platform=3&request_time=1616727275&resolution=828x1792&sm_device_id=20201227084142ef644179c39e692fcdc665eb5383e4830171ca8abc68a8f8&szlm_ddid=D2FtXlYFBR9vqoo/8dhVmIm8Q/Wu/Zr2VBt6UZzFTN47wX7e&time=1616727276&token=651c529ed09b56711f62dae8df2f5b9a&uid=52463773&uuid=e55a2ce90c05c30d05d4df7fd4fce4c1'
}
#小肥肥
cookies2 = {
  'YOUTH_HEADER': {"Accept-Encoding":"br,gzip,deflate","Cookie":"sensorsdata2019jssdkcross=%7B%22distinct_id%22%3A%2252616860%22%2C%22%24device_id%22%3A%22176c768a773672-0b13ac8f66d1268-3e176b5f-304704-176c768a7748bb%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E7%9B%B4%E6%8E%A5%E6%B5%81%E9%87%8F%22%2C%22%24latest_referrer%22%3A%22%22%2C%22%24latest_referrer_host%22%3A%22%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC_%E7%9B%B4%E6%8E%A5%E6%89%93%E5%BC%80%22%7D%2C%22first_id%22%3A%22176c768a773672-0b13ac8f66d1268-3e176b5f-304704-176c768a7748bb%22%7D;Hm_lvt_268f0a31fc0d047e5253dd69ad3a4775=1616730902,1616731150,1616731151,1616731161;Hm_lvt_6c30047a5b80400b0fd3f410638b8f0c=1616729995,1616730090","Connection":"keep-alive","Accept":"text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8","Host":"kd.youth.cn","User-Agent":"Mozilla/5.0(iPhone;CPUiPhoneOS12_1_2likeMacOSX)AppleWebKit/605.1.15(KHTML,likeGecko)Mobile/16C101","Accept-Language":"zh-cn"},
  'YOUTH_READBODY': 'p=9NwGV8Ov71o%3DgW5NEpb6rjab0hHSxXenkWHSkCwB26b0x_gtnWSAWxe4W5DsfKJWZFOcxdp2_awTEWaYpXwMbPaAlbN3zhaYAKYyUX24vDqitB1R4HdvoWk_LD3PHEzXnteKaDFlgKcUBsLSdXsvElPtYZrCp5_ODJmMPARVepvB1xEGVCCxH-1HviGn9Ip5SpkM5Ah3zP9S-vWpyHgxeSaB_qwj1nIY1oH2Zy79EBo5gus597t8AJel7nvadMt3wRjRKxoS_MDzJNWfb5a6uUswk1cM7F5jmdgHE5CMF0HTOH9LMgHjkmFde_188eWj_XWvD2VEnB-9VjBFh7iT-aspJhUOzo1wSNrx8xo1xMbSRB554tz-Gj8sfq2PK4yRsuDLYxpg_24MBRGJXWo-TfZxv7dyOLJ8aOrWIKwVGBPOzipk3fD5w-dYqTvRBporHJIl1vPB-k9bATIqYt3GuzZXzUhwY9ArGskK8RgDPha2Fs971AVLDcM2dBe7nXqh1mU3Aaf2tczyVFsTxkLtwKJTcT3tLaCNGXt9vXhylFA7S5rVX-HBK8P6B2JkgxyZHs84JZEwSkroW58RARXgFLtkEy7zsgF8-PX6tvxVg735dsnJMehVDHnUu-7ZV7mVCYWgwlqmc_e48OxvY1fX6zU-8SnU00Dj58JUSvvHWWCAQl6Z4dOInTCsj6h7Tuik4TPRDOdURznkD-sM05D-X6qfHngPKcWC2vUWsiKOhpFvyg9T17exDwn2qlZPJSdaOe9b_6PemDCvN44oOg3XoNp1o5QzYp05BryDNyGfnSJkJlImRTlk3EL03bCNceYPyM3cLTAJ1Sglc3amLGkyuthB7YMUU_yiD_ZRpb99oT17TWMvmdEjwBeJ49GCcL89zGWVaDakRnFc',
  'YOUTH_READTIMEBODY': 'p=9NwGV8Ov71o%3DgW5NEpb6rjb84bkaCQyOq-myT0C-Ktb_mEtDEGsOrBruuZzIpWlevTEf2n4e6SDtwtHI8jh7tGLFm1iscPtbZwlhO1--2rPMqEVay5SHQZ0Xa5om9y_QnFioIoDSg-ArtrfwznZt1IhRAOspLNm4F1Z4mRILDUTDM9AS-u45jBBExBW41TQ7xz0TOuu78Hl9F5rtXPP6MXbOIPYZVIZovES2HvANdZ9fCtJengCkpHDcPKG--APjrlX2I3beeSSUGvWmzyFQlPZGo7aeQh9ijip1sfpubd49NLoQEXrWFIYmj8v567Dr6UsRP7Sp4p9JcDrz13EBVV3jCYNh0lgGL72bJSELJfOA0yq3LvTsUAxzcNZGQDs6J30q5xtv0FzLYFWAdOUdAMVVWApSOnVCYBdzM6kdnWsIjF62OJRmVwB_o8ilPHB-hD7hjSBZYWLfhRT2PsjRpR0WZvMg5jhYtrMVfGFi7uQ3r55unbDxi11Kpuh3l9yWyvGeKB8T9itR7QLaDjEJVY0NKuiXkCtEhn6T0bkXROON_ceCq2Yuto_HtwPerqJ_SblWi57xcN1naJc3yjTfGE4-I0e5yob8MncBuBjBiWMQwxJuUcmT5KJgp-Ph9v_VijAvhhh4RjSY8V0uu9kj--de_uQ7hvEg57UlPSe_xS-BNeJ96Faut1c8whOEu7ynqAHMKccO6hBcOi6FSnsb7YwpBULcYTikBiU3x0e2ZTBXhCOJKP2LlMtCSGYuKffXh-b1RdBlBXUaSfB5Yx8E04xo5Xy0ojhtEYlzXmPDsAD7Vp9ae-ZQimEKmDfTaLrOe8z3s11ShoalZfXl4MM4GDQ%3D',
  'YOUTH_WITHDRAWBODY': 'p=9NwGV8Ov71o%3DgW5NEpb6rjb84bkaCQyOq-myT0C-Ktb_mEtDEGsOrBruuZzIpWlevTEf2n4e6SDtwtHI8jh7tGLFm1iscPtbZwlhO1--2rPMqEVay5SHQZ0Xa5om9y_QnFioIoDSg-ArtrfwznZt1IhRAOspLNm4F1Z4mRILDUTDM9AS-u45jBBExBW41TQ7xz0TOuu78Hl9F5rtXPP6MXbOIPYZVIZovES2HvANdZ9fCtJengCkpHDcPKG--APjrlX2I3beeSSUGvWmzyFQlPZGo7aeQh9ijip1sfpubd49NLoQEXrWFIbZSwOCiY1lVbYjGXmruLpAfa0yM1CUdWTgorBja0Q6rTro8PQzDmqHVBpFXarQGXd3x4hZyHDeRPMAie2U24ndXCKKo6YYS-AHBfwTzfUaf1s1VW9Mik89keIQRR5pZYRfDea5MViUKC3Jtd3N91QtVoGL3H_MalaMFMLGUyWJO1Ozfjj-vgHMt1Z99LyEYt4L9QrSfqrwzJwbHV635A7c9EBzLwMPVkAlcJ4ejV7LTRRDWsQk6adcIV7dP22_JT7VVKQO7iT0hk6waa2svM215yH--et7q6RBNlKQVYjM3N9RGSdSaAQTxDuvqYVklukswXnxVrLvHF4xFRu7UgOrAjSd9vilkm8MDHyqDor-HrYhL0D-32Q9Tgw5OAiKa0mODnKmQbNhqiP9nTqcHD59y_0rLqc6AHHyna5SoYB6wplNMoDq4guDM9a16ZHf6RkiOcUB5rGL_aJXEwZ50rKTWV9njFHLBRJoFy2HVhGfqgSDZpJO0Z9s4hTBQOhsUu9V5Ok4CqUXiJI3BLQY4P7qTpWXawkgQYjYVj280zCqXw%3D%3D',
  'YOUTH_SHAREBODY': 'access=WIFI&app_version=2.0.2&article_id=37079397&channel=80000000&channel_code=80000000&cid=80000000&client_version=2.0.2&device_brand=iphone&device_id=49312960&device_model=iPhone&device_platform=iphone&device_type=iphone&from=0&is_hot=0&isnew=1&mobile_type=2&net_type=1&openudid=95fe8b77a9ac76516b3a643720ea29e1&os_version=12.1.2&phone_code=95fe8b77a9ac76516b3a643720ea29e1&phone_network=WIFI&platform=3&request_time=1616731213&resolution=828x1472&sign=1ba1e2b31438788b91bb7a316fd8572e&sm_device_id=202012292315220d2690c51c82a443249bcbef2ee9b9b1010c62f00e7becd6&stype=WEIXIN&szlm_ddid=D2%2BKF1Sd/bNq6jN2173eD0LPM2wegmk3qut6UZzFTN47wXb1&time=1616731214&uid=52616860&uuid=95fe8b77a9ac76516b3a643720ea29e1',
  'YOUTH_STARTBODY': 'access=WIFI&app_version=2.0.2&channel=80000000&channel_code=80000000&cid=80000000&client_version=2.0.2&device_brand=iphone&device_id=49312960&device_model=iPhone&device_platform=iphone&device_type=iphone&isnew=1&mobile_type=2&net_type=1&openudid=95fe8b77a9ac76516b3a643720ea29e1&os_version=12.1.2&phone_code=95fe8b77a9ac76516b3a643720ea29e1&phone_network=WIFI&platform=3&request_time=1616731193&resolution=828x1472&sm_device_id=202012292315220d2690c51c82a443249bcbef2ee9b9b1010c62f00e7becd6&szlm_ddid=D2%2BKF1Sd/bNq6jN2173eD0LPM2wegmk3qut6UZzFTN47wXb1&time=1616731193&token=657305ab015913387530de72a22bea39&uid=52616860&uuid=95fe8b77a9ac76516b3a643720ea29e1'
}
#菜鸡
cookies3 = {
  'YOUTH_HEADER': {"Accept-Encoding":"br,gzip,deflate","Cookie":"sensorsdata2019jssdkcross=%7B%22distinct_id%22%3A%2252533579%22%2C%22%24device_id%22%3A%22176c768a773672-0b13ac8f66d1268-3e176b5f-304704-176c768a7748bb%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E7%9B%B4%E6%8E%A5%E6%B5%81%E9%87%8F%22%2C%22%24latest_referrer%22%3A%22%22%2C%22%24latest_referrer_host%22%3A%22%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC_%E7%9B%B4%E6%8E%A5%E6%89%93%E5%BC%80%22%7D%2C%22first_id%22%3A%22176c768a773672-0b13ac8f66d1268-3e176b5f-304704-176c768a7748bb%22%7D;Hm_lvt_268f0a31fc0d047e5253dd69ad3a4775=1616169070,1616169098,1616169602,1616729896;Hm_lvt_6c30047a5b80400b0fd3f410638b8f0c=1613832071,1614062389,1614062431,1614072058","Connection":"keep-alive","Accept":"text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8","Host":"kd.youth.cn","User-Agent":"Mozilla/5.0(iPhone;CPUiPhoneOS12_1_2likeMacOSX)AppleWebKit/605.1.15(KHTML,likeGecko)Mobile/16C101","Accept-Language":"zh-cn"},
  'YOUTH_READBODY': 'p=9NwGV8Ov71o%3DgW5NEpb6rjab0hHSxXenkWHSkCwB26b0x_gtnWSAWxe4W5DsfKJWZItZscie6QeZ7vFAC37LtWMSopVClnIVhID3FEakaoU6EnOxAJvSHNy8d-WoL-mkiiHOhw_QgEwd5eqrMk17LcFJKViSXwl2X3Q0vbBuy1L8ROZZh8UXdvzBQsE34gzDhuAy-0tsLNbh3S19zKhZRpoWUyGenVdggrxWZR6tcbbPeuVPHqImo5QM0dv2c7EDcBSixTHKEWNIGY264S2Znm6t6RgdMIWnegppH3THmpmHRMTwM-LqfFKqV39mEIc2vW2lMB5UTCRoQRAT-254X5dvF3JE6--XWxKZ6oeHk7W8cUqyRJavWBTsbAXhnGVf10fohGp7EmeBsYHQttElaX2pSdTCV_-VgnRGAzfNZCLo8hmL5s_XTbTRiD8BIEhMREKWiatshq7qD6HX5wx1wg4n3i8hoVSFVBZjr5mh9DdSr042gZ-idFRhLiPEYtp55qSHW2bx4iO-AUFvY_Xpss93K3wU6UbOG8k4W9MGkJV6SUGs9avKQ72eSqbOLzENSkxcvqnS_WiID4INPb5RakX7m8TGq449VkMzZdrotRED8EXK8xaApT7fa4ZDyMJddyO97U6SRTsMeK9FXy_NFkcwvazmZ50rKZgX_IjdAQPa6pFsCohcu3YjQTzQKDXO64ssp8uz1NGYAFzmpCitdxlG_TsNC47B88qeV3tM5vPWpNRSoR1eTmsfbaIhN-UWFT4yVmqY-JFe_D877NZ1nd1Q83kiVfSUCDDXoSfOMDCf0ewH1Vqh7PiYnbcC3Jqvh55j6RWoP93UaOUjfQxScQI4SJSPt8LJNpppK2kmvMpccwJBGYaATv3Ujt9AsSjmDLEoT7q5PiAM',
  'YOUTH_READTIMEBODY': 'p=9NwGV8Ov71o%3DgW5NEpb6rjb84bkaCQyOq-myT0C-Ktb_mEtDEGsOrBruuZzIpWlevTEf2n4e6SDtwtHI8jh7tGLFm1iscPtbZwlhO1--2rPMqEVay5SHQZ0Xa5om9y_QnFioIoDSg-ArtrfwznZt1IhRAOspLNm4F1Z4mRILDUTDM9AS-u45jBBExBW41TQ7xz0TOuu78Hl9F5rtXPP6MXbOIPYZVIZovES2HvANdZ9fCtJengCkpHDcPKG--APjrlX2I3beeSSUGvWmzyFQlPZGo7aeQh9ijip1sfpubd49NLoQEXrWFIYmj8v567Dr6UsRP7Sp4p9JcDrz13EBVV3jCYNh0lgGL72bJSELJfOA0yq3LvTsUAxzcNZGQDs6J30q5xtv0FzLYFWAdOUdAMVVWApSOnVCYBdzM6kdnWsIjF62OJRmVwB_o8ilPHB-hD7hjSBZYWLfhRT2PsjRpR0WZvMg5jhYtrMVfGFi7uQ3r55unbDxi11Kpuh3l9yWyvGeKB8T9itRpocInFpYG5rFnC5d8puWw4u_pSJUPv-Opa5EP2LeD50p4TKh0H9hzzdLoeGLHnq92h96xIM-MuswJYyuv1skXmELQKh9m_HOQ-l37RYU6k_y4QLVqClKDhuto_8ikotckVt0bU7yWI4PPkDFcted5B1HzVjyqyOLS2KdIokLbl7CKVRSsQ0Wg6jhV1NKwvv4vh45UiaBrtRRiWGJmJUYnJRt4v2R9H3sogG3_SqAjGI5TkMr999ghKKLfCbkHCisGnNbaED_DshGHkvmLy8jgDhnib0KP1DvdX_FHpSMDpX9kRh5fyy2y5N1cCe5a0n0clE3mQGa-Ys%3D',
  'YOUTH_WITHDRAWBODY': 'p=9NwGV8Ov71o%3DgW5NEpb6rjb84bkaCQyOq-myT0C-Ktb_mEtDEGsOrBruuZzIpWlevTEf2n4e6SDtwtHI8jh7tGLFm1iscPtbZwlhO1--2rPMqEVay5SHQZ0Xa5om9y_QnFioIoDSg-ArtrfwznZt1IhRAOspLNm4F1Z4mRILDUTDM9AS-u45jBBExBW41TQ7xz0TOuu78Hl9F5rtXPP6MXbOIPYZVIZovES2HvANdZ9fCtJengCkpHDcPKG--APjrlX2I3beeSSUGvWmzyFQlPZGo7aeQh9ijip1sfpubd49NLoQEXrWFIbZSwOCiY1lVbYjGXmruLpAfa0yM1CUdWTgorBja0Q6rTro8PQzDmqHVBpFXarQGXd3x4hZyHDeRPMAie2U24ndXCKKo6YYS-AHBfwTzfUaf1s1VW9Mik89keIQRR5pZYRfDea5MViUKC3Jtd3N91QtVoGL3H_MalaMFMLGUyWJO1Ozfjj-vgHMt1Z99LyEYt4L9QrSfqrwzJwbHV635A7c9EBzLwMPVkD_-EdOnOFw5L2T9T7NqrW50P039yeQYewD8OHwQdIBYuMeDhnJCfpetjkxnrp7J8AJsv-IZgSjJNa2Nawa7tLGFHw4RUMn-fmhsLRc1oT3iksSHoRf656zTUa-QYquwMoWm3db_YvxT8XAjbxpOMBgWZGqmClVFM9H-JlAa0mmzw82nb6XwFR3-Dk0T_l0YKh3vU4vSU6uDJan1vX635rAOFoZ7Wx6YE9b-iub4STda_aQXmVXJlPfrlEt1TmWlLCVf-w8wDJlBXe2hDr4IYOg90Z0-fXC3JdlKzUhD6b0O7OpxP4H1WbAX0bs7VnV-qSj5MC_zwK2GQ%3D%3D',
  'YOUTH_SHAREBODY': 'access=WIFI&app_version=2.0.2&article_id=37121335&channel=80000000&channel_code=80000000&cid=80000000&client_version=2.0.2&device_brand=iphone&device_id=49312960&device_model=iPhone&device_platform=iphone&device_type=iphone&from=0&is_hot=0&isnew=1&mobile_type=2&net_type=1&openudid=95fe8b77a9ac76516b3a643720ea29e1&os_version=12.1.2&phone_code=95fe8b77a9ac76516b3a643720ea29e1&phone_network=WIFI&platform=3&request_time=1616730967&resolution=828x1472&sign=c23afce2be266210a6d09a8f8b1550c1&sm_device_id=202012292315220d2690c51c82a443249bcbef2ee9b9b1010c62f00e7becd6&stype=WEIXIN&szlm_ddid=D2%2BKF1Sd/bNq6jN2173eD0LPM2wegmk3qut6UZzFTN47wXb1&time=1616730967&uid=52533579&uuid=95fe8b77a9ac76516b3a643720ea29e1',
  'YOUTH_STARTBODY': 'access=WIFI&app_version=2.0.2&channel=80000000&channel_code=80000000&cid=80000000&client_version=2.0.2&device_brand=iphone&device_id=49312960&device_model=iPhone&device_platform=iphone&device_type=iphone&isnew=1&mobile_type=2&net_type=1&openudid=95fe8b77a9ac76516b3a643720ea29e1&os_version=12.1.2&phone_code=95fe8b77a9ac76516b3a643720ea29e1&phone_network=WIFI&platform=3&request_time=1616730946&resolution=828x1472&sm_device_id=202012292315220d2690c51c82a443249bcbef2ee9b9b1010c62f00e7becd6&szlm_ddid=D2%2BKF1Sd/bNq6jN2173eD0LPM2wegmk3qut6UZzFTN47wXb1&time=1616730947&token=ab1cb67b62832db5ffd853203e7aefaa&uid=52533579&uuid=95fe8b77a9ac76516b3a643720ea29e1'
}

COOKIELIST = [os.environ['COOKIES']]  # 多账号准备cookies1,cookies2,cookies3,cookies2,cookies3,cookies4,

# ac读取环境变量
if "YOUTH_HEADER1" in os.environ:
  COOKIELIST = []
  for i in range(5):
    headerVar = f'YOUTH_HEADER{str(i+1)}'
    readBodyVar = f'YOUTH_READBODY{str(i+1)}'
    readTimeBodyVar = f'YOUTH_READTIMEBODY{str(i+1)}'
    withdrawBodyVar = f'YOUTH_WITHDRAWBODY{str(i+1)}'
    shareBodyVar = f'YOUTH_SHAREBODY{str(i+1)}'
    startBodyVar = f'YOUTH_STARTBODY{str(i+1)}'
    if headerVar in os.environ and os.environ[headerVar] and readBodyVar in os.environ and os.environ[readBodyVar] and readTimeBodyVar in os.environ and os.environ[readTimeBodyVar]:
      globals()['cookies'+str(i + 1)]["YOUTH_HEADER"] = json.loads(os.environ[headerVar])
      globals()['cookies'+str(i + 1)]["YOUTH_READBODY"] = os.environ[readBodyVar]
      globals()['cookies' + str(i + 1)]["YOUTH_READTIMEBODY"] = os.environ[readTimeBodyVar]
      globals()['cookies' + str(i + 1)]["YOUTH_WITHDRAWBODY"] = os.environ[withdrawBodyVar]
      globals()['cookies' + str(i + 1)]["YOUTH_SHAREBODY"] = os.environ[shareBodyVar]
      globals()['cookies' + str(i + 1)]["YOUTH_STARTBODY"] = os.environ[startBodyVar]
      COOKIELIST.append(globals()['cookies'+str(i + 1)])
  print(COOKIELIST)

cur_path = os.path.abspath(os.path.dirname(__file__))
root_path = os.path.split(cur_path)[0]
sys.path.append(root_path)
YOUTH_HOST = "https://kd.youth.cn/WebApi/"

def get_standard_time():
  """
  获取utc时间和北京时间
  :return:
  """
  # <class 'datetime.datetime'>
  utc_datetime = datetime.utcnow().replace(tzinfo=timezone.utc)  # utc时间
  beijing_datetime = utc_datetime.astimezone(timezone(timedelta(hours=8)))  # 北京时间
  return beijing_datetime

def pretty_dict(dict):
    """
    格式化输出 json 或者 dict 格式的变量
    :param dict:
    :return:
    """
    return print(json.dumps(dict, indent=4, ensure_ascii=False))

def sign(headers):
  """
  签到
  :param headers:
  :return:
  """
  time.sleep(0.3)
  url = 'https://kd.youth.cn/TaskCenter/sign'
  try:
    response = requests_session().post(url=url, headers=headers, timeout=30).json()
    print('签到')
    print(response)
    if response['status'] == 1:
      return response
    else:
      return
  except:
    print(traceback.format_exc())
    return

def signInfo(headers):
  """
  签到详情
  :param headers:
  :return:
  """
  time.sleep(0.3)
  url = 'https://kd.youth.cn/TaskCenter/getSign'
  try:
    response = requests_session().post(url=url, headers=headers, timeout=30).json()
    print('签到详情')
    print(response)
    if response['status'] == 1:
      return response['data']
    else:
      return
  except:
    print(traceback.format_exc())
    return

def punchCard(headers):
  """
  打卡报名
  :param headers:
  :return:
  """
  time.sleep(0.3)
  url = f'{YOUTH_HOST}PunchCard/signUp'
  try:
    response = requests_session().post(url=url, headers=headers, timeout=30).json()
    print('打卡报名')
    print(response)
    if response['code'] == 1:
      return response
    else:
      return
  except:
    print(traceback.format_exc())
    return

def doCard(headers):
  """
  早起打卡
  :param headers:
  :return:
  """
  time.sleep(0.3)
  url = f'{YOUTH_HOST}PunchCard/doCard'
  try:
    response = requests_session().post(url=url, headers=headers, timeout=30).json()
    print('早起打卡')
    print(response)
    if response['code'] == 1:
      shareCard(headers=headers)
      return response['data']
    else:
      return
  except:
    print(traceback.format_exc())
    return

def shareCard(headers):
  """
  打卡分享
  :param headers:
  :return:
  """
  time.sleep(0.3)
  startUrl = f'{YOUTH_HOST}PunchCard/shareStart'
  endUrl = f'{YOUTH_HOST}PunchCard/shareEnd'
  try:
    response = requests_session().post(url=startUrl, headers=headers, timeout=30).json()
    print('打卡分享')
    print(response)
    if response['code'] == 1:
      time.sleep(0.3)
      responseEnd = requests_session().post(url=endUrl, headers=headers, timeout=30).json()
      if responseEnd['code'] == 1:
        return responseEnd
    else:
      return
  except:
    print(traceback.format_exc())
    return

def luckDraw(headers):
  """
  打卡分享
  :param headers:
  :return:
  """
  time.sleep(0.3)
  url = f'{YOUTH_HOST}PunchCard/luckdraw'
  try:
    response = requests_session().post(url=url, headers=headers, timeout=30).json()
    print('七日签到')
    print(response)
    if response['code'] == 1:
      return response['data']
    else:
      return
  except:
    print(traceback.format_exc())
    return

def timePacket(headers):
  """
  计时红包
  :param headers:
  :return:
  """
  time.sleep(0.3)
  url = f'{YOUTH_HOST}TimePacket/getReward'
  try:
    response = requests_session().post(url=url, data=f'{headers["Referer"].split("?")[1]}', headers=headers, timeout=30).json()
    print('计时红包')
    print(response)
    return
  except:
    print(traceback.format_exc())
    return

def watchWelfareVideo(headers):
  """
  观看福利视频
  :param headers:
  :return:
  """
  time.sleep(0.3)
  url = f'{YOUTH_HOST}NewTaskIos/recordNum?{headers["Referer"].split("?")[1]}'
  try:
    response = requests_session().get(url=url, headers=headers, timeout=30).json()
    print('观看福利视频')
    print(response)
    return
  except:
    print(traceback.format_exc())
    return

def shareArticle(headers, body):
  """
  分享文章
  :param headers:
  :return:
  """
  url = 'https://ios.baertt.com/v2/article/share/put.json'
  headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'
  try:
    response = requests_session().post(url=url, data=body, headers=headers, timeout=30).json()
    print('分享文章')
    print(response)
    return
  except:
    print(traceback.format_exc())
    return

def threeShare(headers, action):
  """
  三餐分享
  :param headers:
  :return:
  """
  time.sleep(0.3)
  url = f'{YOUTH_HOST}ShareNew/execExtractTask'
  headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'
  body = f'{headers["Referer"].split("?")[1]}&action={action}'
  try:
    response = requests_session().post(url=url, data=body, headers=headers, timeout=30).json()
    print('三餐分享')
    print(response)
    return
  except:
    print(traceback.format_exc())
    return

def openBox(headers):
  """
  开启宝箱
  :param headers:
  :return:
  """
  time.sleep(0.3)
  url = f'{YOUTH_HOST}invite/openHourRed'
  try:
    response = requests_session().post(url=url, headers=headers, timeout=30).json()
    print('开启宝箱')
    print(response)
    if response['code'] == 1:
      share_box_res = shareBox(headers=headers)
      return response['data']
    else:
      return
  except:
    print(traceback.format_exc())
    return

def shareBox(headers):
  """
  宝箱分享
  :param headers:
  :return:
  """
  time.sleep(0.3)
  url = f'{YOUTH_HOST}invite/shareEnd'
  try:
    response = requests_session().post(url=url, headers=headers, timeout=30).json()
    print('宝箱分享')
    print(response)
    if response['code'] == 1:
      return response['data']
    else:
      return
  except:
    print(traceback.format_exc())
    return

def friendList(headers):
  """
  好友列表
  :param headers:
  :return:
  """
  time.sleep(0.3)
  url = f'{YOUTH_HOST}ShareSignNew/getFriendActiveList'
  try:
    response = requests_session().get(url=url, headers=headers, timeout=30).json()
    print('好友列表')
    print(response)
    if response['error_code'] == '0':
      if len(response['data']['active_list']) > 0:
        for friend in response['data']['active_list']:
          if friend['button'] == 1:
            time.sleep(1)
            friendSign(headers=headers, uid=friend['uid'])
      return response['data']
    else:
      return
  except:
    print(traceback.format_exc())
    return

def friendSign(headers, uid):
  """
  好友签到
  :param headers:
  :return:
  """
  time.sleep(0.3)
  url = f'{YOUTH_HOST}ShareSignNew/sendScoreV2?friend_uid={uid}'
  try:
    response = requests_session().get(url=url, headers=headers, timeout=30).json()
    print('好友签到')
    print(response)
    if response['error_code'] == '0':
      return response['data']
    else:
      return
  except:
    print(traceback.format_exc())
    return

def sendTwentyScore(headers, action):
  """
  每日任务
  :param headers:
  :return:
  """
  time.sleep(0.3)
  url = f'{YOUTH_HOST}NewTaskIos/sendTwentyScore?{headers["Referer"].split("?")[1]}&action={action}'
  try:
    response = requests_session().get(url=url, headers=headers, timeout=30).json()
    print(f'每日任务 {action}')
    print(response)
    if response['status'] == 1:
      return response
    else:
      return
  except:
    print(traceback.format_exc())
    return

def watchAdVideo(headers):
  """
  看广告视频
  :param headers:
  :return:
  """
  time.sleep(0.3)
  url = 'https://kd.youth.cn/taskCenter/getAdVideoReward'
  headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'
  try:
    response = requests_session().post(url=url, data="type=taskCenter", headers=headers, timeout=30).json()
    print('看广告视频')
    print(response)
    if response['status'] == 1:
      return response
    else:
      return
  except:
    print(traceback.format_exc())
    return

def watchGameVideo(body):
  """
  激励视频
  :param headers:
  :return:
  """
  time.sleep(0.3)
  url = 'https://ios.baertt.com/v5/Game/GameVideoReward.json'
  headers = {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}
  try:
    response = requests_session().post(url=url, headers=headers, data=body, timeout=30).json()
    print('激励视频')
    print(response)
    if response['success'] == True:
      return response['items']
    else:
      return
  except:
    print(traceback.format_exc())
    return

def visitReward(body):
  """
  回访奖励
  :param headers:
  :return:
  """
  time.sleep(0.3)
  url = 'https://ios.baertt.com/v5/mission/msgRed.json'
  headers = {
    'User-Agent': 'KDApp/1.8.0 (iPhone; iOS 14.2; Scale/3.00)',
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  }
  try:
    response = requests_session().post(url=url, data=body, headers=headers, timeout=30).json()
    print('回访奖励')
    print(response)
    if response['success'] == True:
      return response['items']
    else:
      return
  except:
    print(traceback.format_exc())
    return

def articleRed(body):
  """
  惊喜红包
  :param headers:
  :return:
  """
  time.sleep(0.3)
  url = 'https://ios.baertt.com/v5/article/red_packet.json'
  headers = {
    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148',
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  }
  try:
    response = requests_session().post(url=url, data=body, headers=headers, timeout=30).json()
    print('惊喜红包')
    print(response)
    if response['success'] == True:
      return response['items']
    else:
      return
  except:
    print(traceback.format_exc())
    return

def readTime(body):
  """
  阅读时长
  :param headers:
  :return:
  """
  time.sleep(0.3)
  url = 'https://ios.baertt.com/v5/user/stay.json'
  headers = {
    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148',
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  }
  try:
    response = requests_session().post(url=url, data=body, headers=headers, timeout=30).json()
    print('阅读时长')
    print(response)
    if response['error_code'] == '0':
      return response
    else:
      return
  except:
    print(traceback.format_exc())
    return

def rotary(headers, body):
  """
  转盘任务
  :param headers:
  :return:
  """
  time.sleep(0.3)
  currentTime = time.time()
  url = f'{YOUTH_HOST}RotaryTable/turnRotary?_={currentTime}'
  try:
    response = requests_session().post(url=url, data=body, headers=headers, timeout=30).json()
    print('转盘任务')
    print(response)
    return response
  except:
    print(traceback.format_exc())
    return

def rotaryChestReward(headers, body):
  """
  转盘宝箱
  :param headers:
  :return:
  """
  time.sleep(0.3)
  currentTime = time.time()
  url = f'{YOUTH_HOST}RotaryTable/getData?_={currentTime}'
  try:
    response = requests_session().post(url=url, data=body, headers=headers, timeout=30).json()
    print('转盘宝箱')
    print(response)
    if response['status'] == 1:
      i = 0
      while (i <= 3):
        chest = response['data']['chestOpen'][i]
        if response['data']['opened'] >= int(chest['times']) and chest['received'] != 1:
          time.sleep(1)
          runRotary(headers=headers, body=f'{body}&num={i+1}')
        i += 1
      return response['data']
    else:
      return
  except:
    print(traceback.format_exc())
    return

def runRotary(headers, body):
  """
  转盘宝箱
  :param headers:
  :return:
  """
  time.sleep(0.3)
  currentTime = time.time()
  url = f'{YOUTH_HOST}RotaryTable/chestReward?_={currentTime}'
  try:
    response = requests_session().post(url=url, data=body, headers=headers, timeout=30).json()
    print('领取宝箱')
    print(response)
    if response['status'] == 1:
      return response['data']
    else:
      return
  except:
    print(traceback.format_exc())
    return

def doubleRotary(headers, body):
  """
  转盘双倍
  :param headers:
  :return:
  """
  time.sleep(0.3)
  currentTime = time.time()
  url = f'{YOUTH_HOST}RotaryTable/toTurnDouble?_={currentTime}'
  try:
    response = requests_session().post(url=url, data=body, headers=headers, timeout=30).json()
    print('转盘双倍')
    print(response)
    if response['status'] == 1:
      return response['data']
    else:
      return
  except:
    print(traceback.format_exc())
    return

def incomeStat(headers):
  """
  收益统计
  :param headers:
  :return:
  """
  time.sleep(0.3)
  url = f'https://kd.youth.cn/wap/user/balance?{headers["Referer"].split("?")[1]}'
  try:
    response = requests_session().get(url=url, headers=headers, timeout=50).json()
    print('收益统计')
    print(response)
    if response['status'] == 0:
      return response
    else:
      return
  except:
    print(traceback.format_exc())
    return

def withdraw(body):
  """
  自动提现
  :param headers:
  :return:
  """
  time.sleep(0.3)
  url = 'https://ios.baertt.com/v5/wechat/withdraw2.json'
  headers = {
    'User-Agent': 'KDApp/1.8.0 (iPhone; iOS 14.2; Scale/3.00)',
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  }
  try:
    response = requests_session().post(url=url, headers=headers, data=body, timeout=30).json()
    print('自动提现')
    print(response)
    if response['success'] == True:
      return response['items']
    else:
      return
  except:
    print(traceback.format_exc())
    return

def bereadRed(headers):
  """
  时段红包
  :param headers:
  :return:
  """
  time.sleep(0.3)
  url = f'{YOUTH_HOST}Task/receiveBereadRed'
  try:
    response = requests_session().post(url=url, headers=headers, timeout=30).json()
    print('时段红包')
    print(response)
    if response['code'] == 1:
      return response['data']
    else:
      return
  except:
    print(traceback.format_exc())
    return

def startApp(headers, body):
  """
  启动App
  :param headers:
  :return:
  """
  time.sleep(0.3)
  url = 'https://ios.baertt.com/v6/count/start.json'
  headers = {
    'User-Agent': 'KDApp/1.8.0 (iPhone; iOS 14.2; Scale/3.00)',
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  }
  try:
    response = requests_session().post(url=url, headers=headers, data=body, timeout=30).json()
    print('启动App')
    print(response)
    if response['success'] == True:
      return response
    else:
      return
  except:
    print(traceback.format_exc())
    return

def run():
  title = f'??中青看点'
  content = ''
  result = ''
  beijing_datetime = get_standard_time()
  print(f'\n【中青看点】{beijing_datetime.strftime("%Y-%m-%d %H:%M:%S")}')
  hour = beijing_datetime.hour
  for i, account in enumerate(COOKIELIST):
    headers = account.get('YOUTH_HEADER')
    readBody = account.get('YOUTH_READBODY')
    readTimeBody = account.get('YOUTH_READTIMEBODY')
    withdrawBody = account.get('YOUTH_WITHDRAWBODY')
    shareBody = account.get('YOUTH_SHAREBODY')
    startBody = account.get('YOUTH_STARTBODY')
    rotaryBody = f'{headers["Referer"].split("&")[15]}&{headers["Referer"].split("&")[8]}'

    if startBody:
      startApp(headers=headers, body=startBody)
    sign_res = sign(headers=headers)
    if sign_res and sign_res['status'] == 1:
      content += f'【签到结果】：成功 ?? 明日+{sign_res["nextScore"]}青豆'
    elif sign_res and sign_res['status'] == 2:
      send(title=title, content=f'【账户{i+1}】Cookie已过期，请及时重新获取')
      continue

    sign_info = signInfo(headers=headers)
    if sign_info:
      content += f'\n【账号】：{sign_info["user"]["nickname"]}'
      content += f'\n【签到】：+{sign_info["sign_score"]}青豆 已连签{sign_info["total_sign_days"]}天'
      result += f'【账号】: {sign_info["user"]["nickname"]}'
    friendList(headers=headers)
    if hour > 12:
      punch_card_res = punchCard(headers=headers)
      if punch_card_res:
        content += f'\n【打卡报名】：打卡报名{punch_card_res["msg"]} ?'
    if hour >= 5 and hour <= 8:
      do_card_res = doCard(headers=headers)
      if do_card_res:
        content += f'\n【早起打卡】：{do_card_res["card_time"]} ?'
    luck_draw_res = luckDraw(headers=headers)
    if luck_draw_res:
      content += f'\n【七日签到】：+{luck_draw_res["score"]}青豆'
    visit_reward_res = visitReward(body=readBody)
    if visit_reward_res:
      content += f'\n【回访奖励】：+{visit_reward_res["score"]}青豆'
    if shareBody:
      shareArticle(headers=headers, body=shareBody)
      for action in ['beread_extra_reward_one', 'beread_extra_reward_two', 'beread_extra_reward_three']:
        time.sleep(5)
        threeShare(headers=headers, action=action)
    open_box_res = openBox(headers=headers)
    if open_box_res:
      content += f'\n【开启宝箱】：+{open_box_res["score"]}青豆 下次奖励{open_box_res["time"] / 60}分钟'
    watch_ad_video_res = watchAdVideo(headers=headers)
    if watch_ad_video_res:
      content += f'\n【观看视频】：+{watch_ad_video_res["score"]}个青豆'
    watch_game_video_res = watchGameVideo(body=readBody)
    if watch_game_video_res:
      content += f'\n【激励视频】：{watch_game_video_res["score"]}个青豆'
    read_time_res = readTime(body=readTimeBody)
    if read_time_res:
      content += f'\n【阅读时长】：共计{int(read_time_res["time"]) // 60}分钟'
    if (hour >= 6 and hour <= 8) or (hour >= 11 and hour <= 13) or (hour >= 19 and hour <= 21):
      beread_red_res = bereadRed(headers=headers)
      if beread_red_res:
        content += f'\n【时段红包】：+{beread_red_res["score"]}个青豆'
    for i in range(0, 5):
      time.sleep(5)
      rotary_res = rotary(headers=headers, body=rotaryBody)
      if rotary_res:
        if rotary_res['status'] == 0:
          break
        elif rotary_res['status'] == 1:
          content += f'\n【转盘抽奖】：+{rotary_res["data"]["score"]}个青豆 剩余{rotary_res["data"]["remainTurn"]}次'
          if rotary_res['data']['doubleNum'] != 0 and rotary_res['data']['score'] > 0:
            double_rotary_res = doubleRotary(headers=headers, body=rotaryBody)
            if double_rotary_res:
              content += f'\n【转盘双倍】：+{double_rotary_res["score"]}青豆 剩余{double_rotary_res["doubleNum"]}次'

    rotaryChestReward(headers=headers, body=rotaryBody)
    for i in range(5):
      watchWelfareVideo(headers=headers)
    timePacket(headers=headers)
    for action in ['watch_article_reward', 'watch_video_reward', 'read_time_two_minutes', 'read_time_sixty_minutes', 'new_fresh_five_video_reward', 'first_share_article']:
      time.sleep(5)
      sendTwentyScore(headers=headers, action=action)
    stat_res = incomeStat(headers=headers)
    if stat_res['status'] == 0:
      for group in stat_res['history'][0]['group']:
        content += f'\n【{group["name"]}】：+{group["money"]}青豆'
      today_score = int(stat_res["user"]["today_score"])
      score = int(stat_res["user"]["score"])
      total_score = int(stat_res["user"]["total_score"])

      if score >= 300000 and withdrawBody:
        with_draw_res = withdraw(body=withdrawBody)
        if with_draw_res:
          result += f'\n【自动提现】：发起提现30元成功'
          content += f'\n【自动提现】：发起提现30元成功'
          send(title=title, content=f'【账号】: {sign_info["user"]["nickname"]} 发起提现30元成功')

      result += f'\n【今日收益】：+{"{:4.2f}".format(today_score / 10000)}'
      content += f'\n【今日收益】：+{"{:4.2f}".format(today_score / 10000)}'
      result += f'\n【账户剩余】：{"{:4.2f}".format(score / 10000)}'
      content += f'\n【账户剩余】：{"{:4.2f}".format(score / 10000)}'
      result += f'\n【历史收益】：{"{:4.2f}".format(total_score / 10000)}\n\n'
      content += f'\n【历史收益】：{"{:4.2f}".format(total_score / 10000)}\n'

  print(content)

  # 每天 23:00 发送消息推送
  if beijing_datetime.hour == 23 and beijing_datetime.minute >= 0 and beijing_datetime.minute < 30:
    send(title=title, content=result)
  elif not beijing_datetime.hour == 23:
    print('未进行消息推送，原因：没到对应的推送时间点\n')
  else:
    print('未在规定的时间范围内\n')

if __name__ == '__main__':
    run()
