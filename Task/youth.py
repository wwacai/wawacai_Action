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

cookies1 = {
  'YOUTH_HEADER': {"Accept": "*/*","Accept-Encoding": "gzip, deflate, br","Accept-Language": "zh-cn","Connection": "keep-alive","Content-Type": "","Cookie": "Hm_lvt_268f0a31fc0d047e5253dd69ad3a4775=1616410326,1616410330,1616410341,1616410347; sensorsdata2019jssdkcross=%7B%22distinct_id%22%3A%2249551026%22%2C%22%24device_id%22%3A%22178594d929a9af-07037d27f9a77a-724c1151-370944-178594d929b10e4%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E7%9B%B4%E6%8E%A5%E6%B5%81%E9%87%8F%22%2C%22%24latest_referrer%22%3A%22%22%2C%22%24latest_referrer_host%22%3A%22%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC_%E7%9B%B4%E6%8E%A5%E6%89%93%E5%BC%80%22%7D%2C%22first_id%22%3A%22178594d929a9af-07037d27f9a77a-724c1151-370944-178594d929b10e4%22%7D; sajssdk_2019_cross_new_user=1","Host": "kd.youth.cn","Referer": "https://kd.youth.cn/h5/20190301taskcenter/ios/index.html?uuid=b9c6f64cc2a22570b18ff76b2b49b2c8&sign=f5fcbb1c75ffcee8626358b2b14d514a&channel_code=80000000&uid=49551026&channel=80000000&access=WIfI&app_version=2.0.2&device_platform=iphone&cookie_id=2f3fa98006a9b445333c1a9154438e57&openudid=b9c6f64cc2a22570b18ff76b2b49b2c8&device_type=1&device_brand=iphone&sm_device_id=20201128104856f4dab4b672ff5f451a1ac0dc61f370ad0118dbfb33459f28&device_id=48527064&version_code=202&os_version=13.6&cookie=MDAwMDAwMDAwMJCMpN-w09Wtg5-Bb36eh6CPqHualq2jmrCarWKyt4lqhIx236_OqmqXr6NthJl7mI-shMmXeqDau4StacS3o7GFonqYr6miZIOJiWyEY2Ft&device_model=iPhone_6_Plus&subv=1.5.1&&cookie=MDAwMDAwMDAwMJCMpN-w09Wtg5-Bb36eh6CPqHualq2jmrCarWKyt4lqhIx236_OqmqXr6NthJl7mI-shMmXeqDau4StacS3o7GFonqYr6miZIOJiWyEY2Ft&cookie_id=2f3fa98006a9b445333c1a9154438e57","User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148","X-Requested-With": "XMLHttpRequest"},
  'YOUTH_READBODY': 'p=9NwGV8Ov71o%3DgW5NEpb6rjab0hHSxXenkWHSkCwB26b0x_gtnWSAWxe4W5DsfKJWZCtYjtG-pISRI05IOO_tWwKsjHS2coC8oRXfSq-9lTAagrC-ydpEPghdlY8NOPcQv8F0Lahi7CuB03j1gJr86JaOW7ZzzZzjqLuHW38aqQ37pAuTLrCqwSoWUr1K2_rC65VVW1xGBbhpu2mmF9ZPuXpotQEtDITAzKPOCM3RuMHTCuKe7zzYjjCN59crc88bkK7U-g24fMwohQo0K9jiXH0BKvwU7Z_vV9EKB_WqADnAWtxL_aouUpS613U7bkHdVMOZLszQypKW00w77-tSya9WkjeUimh4s_InK9B2qB8wJrfy-J1Oz0n4kLb86KDpn2HJBZ7PIKBG2vbkaU7V7FJWguDb-g2VHTar8eAudj5hMdAzyejIm-buuWGFQ72xhoPUpYeMzwlrWwI0aEPLrOCXM2ET93k3g9CV-qcD5udeRtXaoxVnOIxJWLavQGNw7TdxzkENTzj9GwXHGIA_7PqnWmRNsb2C2HS8bHF5oVFW8gvKmQJXhsPw4QdnEf3htklW8hxzC_rJs1nU7BlK6ybrZ6R6Rp4BNNzrZVfpMyhEQV6BBeMCRSTknZUeVCWYZy7FRfk5LOD6PfjRdpjBgK8duDD0K3txas8dPetKdmg4K6L-fZvm8Hnk57wievZG4WQfBYKUN_u_mcVbJ2zi3-GAIyPWXFKPEH1HultLSbtdpZoupyqPHSAEvn1V1Sv5YuGpc_famofEBidrOyuIb8SALrIkXkPNWM4JNIab_7wiOtcJJWjMFJgee9MX6XMXoz7Y22P-35ieethsnlWrehr1bONmm9kyNYaa3CkKm_LDAGPzvr1Rqkc%3D',
  'YOUTH_READTIMEBODY': 'p=9NwGV8Ov71o%3DgW5NEpb6rjb84bkaCQyOq-myT0C-Ktb_mEtDEGsOrBruuZzIpWlevTEf2n4e6SDtwtHI8jh7tGLFm1iscPtbZwlhO1--2rPMqEVay5SHQZ0Xa5om9y_QnFioIoDSg-ArtrfwznZt1IhRAOspLNm4F1Z4mRILDUTDM9AS-u45jBAHpRMEOlwzczjbU6gjTSizZFE2TSUamRRME0wnUyUTr0y-jd030OIXuUm1sg1C3Nm_OLIp7vmIodzb74mUjURcDqrs1rj7PXYhbtbWLp-rmZMgxgBGOM0RW0E-R_ph5AeoUBOIMEBkINIei-6Nh9nlrgbr7iujWU6WhxGWPwQTfj0JrQeUzE_q-HFhClO47fwYM3zYLSOvRGQvlpgQv6uLjOow762OPhFzsuiAlbyapxuzEhh-GwTODkalz9nxXkgU9Mh4sQGj4CDXT8HhorLKAH7GGsDqeRkBWZ057tu88Se5b3vi5TBXIC1vhVt6IC6p8y3s4fQW2NHC3qjQEfZum7W1b1lahutEqJZp4aMIz_-HcQu_7vmJSAxX3NsHFF3BM39pxPls8R9YK9ydDxTo1vbzmjESKBBuN-HBY7toFfj3sw29vbBf1jNzf272nzg3ulbbcWkrax6cHEZ4pSlMmtfkwxGAb26SlLtHPd3HtopYNqEPK4hWg6xjeb1oC1oTB4pG7Zy9QuEQ3OSeXcAcx-uh7D2FFjLXLXPGcDXiOB5hLRH4BXMQlUivJIn23d-yzGRzWx9bTTdxwvoOKes6wr5sJQSqxte2jgiT7a5WlMFyA4puMAgwZ69f_cNw3QZEpjkhovdteIlNEmnZ-K7HrtORIsoT5Qk%3D',
  'YOUTH_WITHDRAWBODY': 'p=9NwGV8Ov71o=gW5NEpb6rjb84bkaCQyOq-myT0C-Ktb_mEtDEGsOrBruuZzIpWlevTEf2n4e6SDtwtHI8jh7tGLFm1iscPtbZwlhO1--2rPMqEVay5SHQZ0Xa5om9y_QnFioIoDSg-ArtrfwznZt1IhRAOspLNm4F1Z4mRILDUTDM9AS-u45jBAHpRMEOlwzczjbU6gjTSizZFE2TSUamRRME0wnUyUTr0y -jd030OIXuUm1sg1C3Nm_OLIp7vmIodzb74mUjURcDqrs1rj7PXYhbtbWLp-rmZMgxgBGOM0RW0E-R_ph5AfCgxuliNVOFAdBVUlaxPjpLAlwMj1Rw_85pUmZlraIzF_x5wkV-nx5K7sYWfaEr7NNap2lWit5S60L2xfTSfveDYFurq1lbzkBYCOgDPmUVxJOhVRIBnTPOc0CkFi__rm7unzojsPdaIG4YvDsIE-Xs2Lakf-6R8pv4U4Bu_NTm7cQdZadxlQaRj6NW7RMkZvRHG99oB8Udiizi1stCzJSyEUvd4meP9iqBeLNx9aeNTtNIRIHPqQ7TwpTA1o3w_2XB7RRTJMaj2GUeVLjzl-OsnXbR-JR34vxDee0k3yV7xx-GAgN-QcPdhPyHvqNdaysatUIhnnI7kU9l-bBHRCkikB2bOmlA0CYtM7EIFNTtASPlAi6fLQzcFa7OpUXrwV3M_rmG5W_HxFbcsKiBiIQ9jqEJxL7WwR5ld0oCZrElk-_SzHe48FLp_pcGKn4eOF6YioxZG7EZCU7JfaGWV562Tvi8tfKoyqcSrtNFewXcFxS3CMPp6u-z_YQStOGfCajcBV0WYclZO_yVg0s1X88CPIMvGd2WM4=',
  'YOUTH_SHAREBODY': 'access=WIFI&app_version=2.0.2&article_id=37020581&channel=80000000&channel_code=80000000&cid=80000000&client_version=2.0.2&device_brand=iphone&device_id=48527064&device_model=iPhone&device_platform=iphone&device_type=iphone&from=0&is_hot=0&isnew=1&mobile_type=2&net_type=1&openudid=6e9c0ef3d3ddf694cf36febc0890f240&os_version=13.6&phone_code=6e9c0ef3d3ddf694cf36febc0890f240&phone_network=WIFI&platform=3&request_time=1616389682&resolution=828x1792&sign=2bcf8354ac5206896121dbaea9f61ba1&sm_device_id=20201128104856f4dab4b672ff5f451a1ac0dc61f370ad0118dbfb33459f28&stype=0&szlm_ddid=D2OK2fPp1do5vVBCVUpVWSvdtmlzYRLVvDt6UZzFTN47wX19&time=1616389682&uid=49551026&uuid=6e9c0ef3d3ddf694cf36febc0890f240',
  'YOUTH_STARTBODY': 'access=WIFI&app_version=2.0.2&channel=80000000&channel_code=80000000&cid=80000000&client_version=2.0.2&device_brand=iphone&device_id=48527064&device_model=iPhone&device_platform=iphone&device_type=iphone&isnew=1&mobile_type=2&net_type=1&openudid=6e9c0ef3d3ddf694cf36febc0890f240&os_version=13.6&phone_code=6e9c0ef3d3ddf694cf36febc0890f240&phone_network=WIFI&platform=3&request_time=1616388143&resolution=828x1792&sm_device_id=20201128104856f4dab4b672ff5f451a1ac0dc61f370ad0118dbfb33459f28&szlm_ddid=D2OK2fPp1do5vVBCVUpVWSvdtmlzYRLVvDt6UZzFTN47wX19&time=1616388143&token=430e7f82eae238b625fabd4530d911c6&uid=49551026&uuid=6e9c0ef3d3ddf694cf36febc0890f240'
}
cookies2 = {
  'YOUTH_HEADER': {"Accept": "*/*","Accept-Encoding": "gzip, deflate, br","Accept-Language": "zh-cn","Connection": "keep-alive","Content-Type": "","Cookie": "Hm_lvt_268f0a31fc0d047e5253dd69ad3a4775=1616414350,1616414492,1616415268,1616415625; Hm_lvt_6c30047a5b80400b0fd3f410638b8f0c=1616405920,1616405990,1616415267,1616415625; sajssdk_2019_cross_new_user=1; sensorsdata2019jssdkcross=%7B%22distinct_id%22%3A%2250672650%22%2C%22%24device_id%22%3A%2217859e10582283-012cf72f12a15b8-724c1151-370944-17859e105831028%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E7%9B%B4%E6%8E%A5%E6%B5%81%E9%87%8F%22%2C%22%24latest_referrer%22%3A%22%22%2C%22%24latest_referrer_host%22%3A%22%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC_%E7%9B%B4%E6%8E%A5%E6%89%93%E5%BC%80%22%7D%2C%22first_id%22%3A%2217859e10582283-012cf72f12a15b8-724c1151-370944-17859e105831028%22%7D","Host": "kd.youth.cn","Referer": "https://kd.youth.cn/h5/20190301taskcenter/ios/index.html?uuid=8fc720805dd7f02ea638b42c31cee2bf&sign=53bb7a12de4964e6f2546740a9dd8b0d&channel_code=80000000&uid=50672650&channel=80000000&access=WIfI&app_version=2.0.2&device_platform=iphone&cookie_id=e311a8e3c4209e62edd7b459f2bf3189&openudid=8fc720805dd7f02ea638b42c31cee2bf&device_type=1&device_brand=iphone&sm_device_id=20201128104856f4dab4b672ff5f451a1ac0dc61f370ad0118dbfb33459f28&device_id=49529997&version_code=202&os_version=13.6&cookie=MDAwMDAwMDAwMJCMpN-w09Wtg5-Bb36eh6CPqHualq2jmrCarWOwp41shKKOl66oqmqXr6NthJl7mI-shMmXeqDau4StacS3o7GFonqYr6miZYF5fWqEY2Ft&device_model=iPhone_6_Plus&subv=1.5.1&&cookie=MDAwMDAwMDAwMJCMpN-w09Wtg5-Bb36eh6CPqHualq2jmrCarWOwp41shKKOl66oqmqXr6NthJl7mI-shMmXeqDau4StacS3o7GFonqYr6miZYF5fWqEY2Ft&cookie_id=e311a8e3c4209e62edd7b459f2bf3189","User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148","X-Requested-With": "XMLHttpRequest"},
  'YOUTH_READBODY': 'p=9NwGV8Ov71o%3DgW5NEpb6rjab0hHSxXenkWHSkCwB26b0x_gtnWSAWxe4W5DsfKJWZCtYjtG-pISRI05IOO_tWwKsjHS2coC8oRXfSq-9lTAagrC-ydpEPghdlY8NOPcQv8F0Lahi7CuB03j1gJr86JaOW7ZzzZzjqLuHW38aqQ37pAuTLrCqwSoWUr1K2_rC65VVW1xGBbhpL4IXsuQRhzNl-UO1QbDyn8WJJiQVma993ComWaOQNKeCiPBmYNX6jACKYMGMtmZgWrJ1crQmbFz-tR-l44MiJ23TdBNT0q3GSwafMVCMFpVyW9naaF6Dd-I1XIt7De8d47GNsOiV2zNvE9r4klbZuyQo1H-5RnHBmHSuOLz42NScXlp7ouvlqf3Yx42V7dX2SzImujk5KyCG_oNhfA-vowY8DFg8r6tNJIPpfrMVVwcfrvcVcY8BfO35aLn00QIflBMOmIvFB0Uz1lj0oM8DMKYz13OII4nbNXPZ2biIMtM6emugz0Vncpa4Tcgfgn7F0Nur4GHsqOgWxx-2GuCyuxjxbXaUVgi2-tWb8vEN7dKDgCguFr_Cq1pB1f5kRZjysnPB9zidmSkglLadSSgFd5Ubv8VjPOIhACcf3qWWQA-9InTC3wH7Xucd6XAsGofoEw0pBkZXk8H7ScWhSQ_3FbBCaDJ0djeKw12NxpglkVuZYeJSrrodY4LvCUYyttXbYzshgbYutXssCTDqBqPfUkO8gXMPfkfGg3AsggYh8pmevUSdDOAtUTbPV3oc-yzssD-XhYGe7puHAgO0irK4aVBAZRAfHwiE1gmpsYgpkkCmB3BE9bC2Qpo9WhFJvYOT5nu1EIOetarrBNfkFsKaof_CTILYeZbb0eOvsRRfU3Y%3D',
  'YOUTH_READTIMEBODY': 'p=9NwGV8Ov71o%3DgW5NEpb6rjb84bkaCQyOq-myT0C-Ktb_mEtDEGsOrBruuZzIpWlevTEf2n4e6SDtwtHI8jh7tGLFm1iscPtbZwlhO1--2rPMqEVay5SHQZ0Xa5om9y_QnFioIoDSg-ArtrfwznZt1IhRAOspLNm4F1Z4mRILDUTDM9AS-u45jBDA-0KEhOYijSsJjfZCSyNFN8GmIV_nwxaRvXsh5A05xUFH8ir7aLQdfJ-jr9Pbk-URN8sILeQY-BJvPcmktoIgPiGzoLyZ1PWyBIxTZKZwmNa0wnHAhckfOageW9BwD5Rx28loKp2eAku51yNEdm4BodzMj2u3t2HmZ9DoMossP2Du795dTiVryls5G5QBaw_z9HmkoE0wE7esRfkoz0nc2LEoKyV8Qa2hBUu6YiPX2iNJPt0e35nNWbr5PU2UjJMk41fV3IhGbS-PLa_AnCwgrLUEgqHwZB7rw1VMxavFAAjtHgubfNZAbH66nEKeib5ySq5Skwe7jT0KnOAg7k6g2O1bRQjQCtmWlXZ5yFpPq5uzu4HKwT18ebMpkqCYgwzZahqfQBttwPYnVZZrOAn71NiautoO_nyhDqAE1msreiWhH7mjRu4AhSmXwciaIPqXwZdIq34Ufsav1AwRyXmQwGUqRKiGLAtWCMEnw_82amxWQX1mG8KvUgF7dp4xB52AKnWaJEgcZTC3R4gpqAUZ626XPMuOu_oAmp3JdpBUqAi3ABCjYLZJscnP2LfQJ21Xkhz5nYB2aw4HC7qYu3pLciM8HYaEWFSuGD5doyjr1wF2MjOkX7v9fEKpVrNLTgyFUZ6JWXDsiL50pzxUG72aXW4D5qdxXbs%3D',
  'YOUTH_WITHDRAWBODY': 'p=9NwGV8Ov71o=gW5NEpb6rjb84bkaCQyOq-myT0C-Ktb_mEtDEGsOrBruuZzIpWlevTEf2n4e6SDtwtHI8jh7tGLFm1iscPtbZwlhO1--2rPMqEVay5SHQZ0Xa5om9y_QnFioIoDSg-ArtrfwznZt1IhRAOspLNm4F1Z4mRILDUTDM9AS-u45jBDA-0KEhOYijSsJjfZCSyNFN8GmIV_nwxaRvXsh5A05xUFH8ir7aLQdfJ-jr9Pbk-URN8sILeQY-BJvPcmktoIgPiGzoLyZ1PWyBIxTZKZwmNa0wnHAhckfOageW9BwD5T_Q_-92WDwy6H_QArtwyRBv2Ap0k91d6tTDYV0GuFPJ-O4zvLiMRgzpi8u0vyFei6nuRWq_onVnhXl49e0eoPezTt31dJoDZ-oYujZ6RAtD-x4SnLiCyEc0wSMBob5ln9S4lWWp0R1e2uBrFuRLnqBxwqis2S6CHZtdLCLVPns6zsr0Xvzlpc-QRd5xYTYtS0QT29I4rHHYghhSsGF9qKFtis28zZsNsjkBY1CFSxGYd5xoNNQqLngek02ybQyy-QrUbSIQGBVAX73lAF8TxPadx2GJLTd11VlYgnTdw18b1ZJJD-N3CI1wHuwbuOBYytUOJzyX2EoGOA7JOTV_APap81Lfvmu_uzOqnhP5MOgRTzoS-seHJwjwJJHOW1g6P7XSPIaG1ewW1Kdex-saTd_cTkVjuTJKI9GWTbRr5ygLa5AdI9RjNctnOv80E_HaHqlMIijzpORKZ95l7q3U-NXHY2b_xTiWEZYwrmldaFpP5aHzZTowtjIUW25hR9kgEunPdgitnZSoiAvhNSD61kggHUZJN2h-ig=',
  'YOUTH_SHAREBODY': 'access=WIFI&app_version=2.0.2&article_id=37024809&channel=80000000&channel_code=80000000&cid=80000000&client_version=2.0.2&device_brand=iphone&device_id=49529997&device_model=iPhone&device_platform=iphone&device_type=iphone&from=0&is_hot=0&isnew=1&mobile_type=2&net_type=1&openudid=8fc720805dd7f02ea638b42c31cee2bf&os_version=13.6&phone_code=8fc720805dd7f02ea638b42c31cee2bf&phone_network=WIFI&platform=3&request_time=1616389772&resolution=828x1792&sign=9e718bbaa0e7563e66c47d4196659371&sm_device_id=20201128104856f4dab4b672ff5f451a1ac0dc61f370ad0118dbfb33459f28&stype=0&szlm_ddid=D2OK2fPp1do5vVBCVUpVWSvdtmlzYRLVvDt6UZzFTN47wX19&time=1616389772&uid=50672650&uuid=8fc720805dd7f02ea638b42c31cee2bf',
  'YOUTH_STARTBODY': 'access=WIFI&app_version=2.0.2&channel=80000000&channel_code=80000000&cid=80000000&client_version=2.0.2&device_brand=iphone&device_id=49529997&device_model=iPhone&device_platform=iphone&device_type=iphone&isnew=1&mobile_type=2&net_type=1&openudid=8fc720805dd7f02ea638b42c31cee2bf&os_version=13.6&phone_code=8fc720805dd7f02ea638b42c31cee2bf&phone_network=WIFI&platform=3&request_time=1616389775&resolution=828x1792&sm_device_id=20201128104856f4dab4b672ff5f451a1ac0dc61f370ad0118dbfb33459f28&szlm_ddid=D2OK2fPp1do5vVBCVUpVWSvdtmlzYRLVvDt6UZzFTN47wX19&time=1616389776&token=8f2be45c7f8f8673d622da0f0cedfb84&uid=50672650&uuid=8fc720805dd7f02ea638b42c31cee2bf'
}
cookies3 = {
  'YOUTH_HEADER': {"Accept": "*/*","Accept-Encoding": "gzip, deflate, br","Accept-Language": "zh-cn","Connection": "keep-alive","Content-Type": "","Cookie": "Hm_lvt_268f0a31fc0d047e5253dd69ad3a4775=1616414371,1616414379,1616414514,1616415756; Hm_lvt_6c30047a5b80400b0fd3f410638b8f0c=1616406055,1616414514,1616415756; sajssdk_2019_cross_new_user=1; sensorsdata2019jssdkcross=%7B%22distinct_id%22%3A%2251149684%22%2C%22%24device_id%22%3A%2217859e303fe95f-016e8a040744b-724c1151-370944-17859e303ff1231%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E7%9B%B4%E6%8E%A5%E6%B5%81%E9%87%8F%22%2C%22%24latest_referrer%22%3A%22%22%2C%22%24latest_referrer_host%22%3A%22%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC_%E7%9B%B4%E6%8E%A5%E6%89%93%E5%BC%80%22%7D%2C%22first_id%22%3A%2217859e303fe95f-016e8a040744b-724c1151-370944-17859e303ff1231%22%7D","Host": "kd.youth.cn","Referer": "https://kd.youth.cn/h5/20190301taskcenter/ios/index.html?uuid=ee6c635311c40f3a68652c4fb215e986&sign=625421f8e6d55271eb5bf267d8c8546a&channel_code=80000000&uid=51149684&channel=80000000&access=WIfI&app_version=2.0.2&device_platform=iphone&cookie_id=a5eefee9df5fa34521fc4d5fa484412a&openudid=ee6c635311c40f3a68652c4fb215e986&device_type=1&device_brand=iphone&sm_device_id=20201128104856f4dab4b672ff5f451a1ac0dc61f370ad0118dbfb33459f28&device_id=50687104&version_code=202&os_version=13.6&cookie=MDAwMDAwMDAwMJCMpN-w09Wtg5-Bb36eh6CPqHualq2jmrCarWOwt3lphoyOmq-oqmqXr6NthJl7mI-shMmXeqDau4StacS3o7GFonqYr6miZYF5ibGEY2Ft&device_model=iPhone_6_Plus&subv=1.5.1&&cookie=MDAwMDAwMDAwMJCMpN-w09Wtg5-Bb36eh6CPqHualq2jmrCarWOwt3lphoyOmq-oqmqXr6NthJl7mI-shMmXeqDau4StacS3o7GFonqYr6miZYF5ibGEY2Ft&cookie_id=a5eefee9df5fa34521fc4d5fa484412a","User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148","X-Requested-With": "XMLHttpRequest"},
  'YOUTH_READBODY': 'p=9NwGV8Ov71o%3DgW5NEpb6rjab0hHSxXenkWHSkCwB26b0x_gtnWSAWxe4W5DsfKJWZOK4d3d9DebnNJ52mQ0JuGj6qG7hueJSQIBUQvQa0xLo9ZEWwFIj9BPTBwPAa4orjIc9ImkeL3KzN_69w8ULk2yLYDtxicp_sYfFgOx4i5fwsyBhsA0XMjXiTi6Vit6xXvtSO_VUBHalJ6D9fbDw-M4uEoZIprI2db7FaKXichZ-fKyr3rWtbgEK-aJhlOi2Jd45DfD58NJXrbtPLKQHTeWIeTfLeFm1mG_T2RhXiedxTGSAvasJQGR1JgMAr9rUCtH0N6nxsbjl1h4KpkQJSJASeNsUj0iNpuf2h2tjDIpco7JnvTDRxRn4Bl92GiYIMzqbsfofqAeAHcfjooUK6fDxo8JVjAUpU6MimoVoSpxVnEaXTL4XAZ12q0msd35nWh_B1vFfPIzSvxlkrzWyFhHXW0whWBjNdwltyuuCKDnOJsEu6hSrpXFifBOO1F4Wuptn6j-7-IEb1iMlihzINWucdPUNOVIYtRFZ7xcjrxsNievjNDjSHV9dz_UZh2nIJ8xXnP0cS9hiaKt46BOyQQQXNePbiF_JphZzy3p3YCB1azqpm-PnnF0Q4QZ3UnvRYjGRqKKmPoDKlu4cG4isAViiCpVasC7OAhKne3tXMq00-nrgO1MR7pN08uyCTqKpVnPchXURwhI3tm9iKutOG1cJn7_9VJpHOhXmEhvdIPFMv6I4-Gepm2IPasZjJSuE2WR67Z02uc_BM-Jj-9bQYXFcbryke5H9rSp5l31VB7EDHJtvxdE2ysGYHt0ju3cLjgfqQ1rT7k_0n6Hj5soj2jWvQOph4AtSAwWa9oxaKNaDjd10Wp6xs5HxOUfZxvbGmlRFtV24yUxo',
  'YOUTH_READTIMEBODY': 'p=9NwGV8Ov71o%3DgW5NEpb6rjb84bkaCQyOq-myT0C-Ktb_mEtDEGsOrBruuZzIpWlevTEf2n4e6SDtwtHI8jh7tGLFm1iscPtbZwlhO1--2rPMqEVay5SHQZ0Xa5om9y_QnFioIoDSg-ArtrfwznZt1IhRAOspLNm4F1Z4mRILDUTDM9AS-u45jBBzBlKP5bL0aLRE1xv1oeofsbPumhZpNvmp0UMKoukDGfXnfuKIsrPKzi7hm90jrGtQVEu8eMKBsdunXnmTgmdZE-1BcNrAeYm_BBSREG9pwulAj0C-XWQ7GoKjQCCjHjf-L3KrYAvLKksyZSJf01hNgk1QX86ijPZoRFPAXFh_dJohV0ygJxQm3y7mUpaz7RDabgkjAk-yCrnAv9riDquqfZY0iLTaVnojYqmLGQwMHVciiKtX0JckR_2blNaEH5awIQPbl20wD0Y7dAnh7EpqjWNGHZ1ogj9RJG60zsaAKdLBBYHXkfYIhvCeqR0V9JWvs7sbXV4pPdhKt399OKtNet_EI0jhzYK4XiHRXda_axR84ioJQWxPIEjaOh2enLMoV7Eb73xN4PT2khQ0PXI0oLdcfVhxa0PA8ZqAV7q9oNo3FV27JPlHVktM0XYGMdn0MVT662nBmdhz-ABhjh0MWKscZSfNmhyc4FCox5RM8QA8awkPxWpbMy0dstzy854RAW-HBLnrJ_8WSiYmO783d7EWqqJAckw0GWp_YZ4yuo7PTPvdTmA99cTbEdwG1U_ClcLWC84NC8ud4YIrFNZOjqOQDUclrbkQk_r3_kgfsX5uzMFPNf1K2jai47_YgZVr0eG2Kk1L-yaDv5PtpMcHPuqlF4119Qk%3D',
  'YOUTH_WITHDRAWBODY': 'p=9NwGV8Ov71o=gW5NEpb6rjb84bkaCQyOq-myT0C-Ktb_mEtDEGsOrBruuZzIpWlevTEf2n4e6SDtwtHI8jh7tGLFm1iscPtbZwlhO1--2rPMqEVay5SHQZ0Xa5om9y_QnFioIoDSg-ArtrfwznZt1IhRAOspLNm4F1Z4mRILDUTDM9AS-u45jBBzBlKP5bL0aLRE1xv1oeofsbPumhZpNvmp0UMKoukDGfXnfuKIsrPKzi7hm90jrGtQVEu8eMKBsdunXnmTgmdZE-1BcNrAeYm_BBSREG9pwulAj0C-XWQ7GoKjQCCjHjddjJTqPa0mnvlgG9BfBcOV0bgLM2oCUAvUkEjaWXMeXZmTnLb-eWKC9q1a4nUfjnBLRLkyDfdYkjAAVQ03CxZGy0QJ5upGEscUqTCQDlyHcJ17DR7Rilg9xBLMhI3UPQx8hHZ1zTWMaXlc8k7ZTQHLRxoopPvxjBagzyb-_VccUkaVps65OWKGdrwdc6BSf1T1CmKGRd1JLw1PiVakm0PMHE5Ejb1p-wl8UAXIOPPVork_UlcCsHrfU4xbySOYfnVixa-LnyQv0MmVD-Wvr0bypG28a5LWIlhGQnBzLGybDQjg074C-rGXzugi2iXiCOT9JAuLkaaSkKgLXebkO4CT8etTgJ_Uy-IxdBxqPlC3kEyaK_h775zQyUEpMkJ-JwH98osaagMtZhQpe3q690IrHu0w2aF3LHw22sJ6dJNZoqck44tFmdfNfQuSFBx9lY-J9TuLk7-j8rtquv8HRVbrhaqJCBOc7RB3BfKsm5hKBGQrKjD3bBQxMKtRaPC3PgnsuC5TYiFjoaYDXKX3CQtURnlCMCmglN4=',
  'YOUTH_SHAREBODY': 'access=WIFI&app_version=2.0.2&article_id=37015220&channel=80000000&channel_code=80000000&cid=80000000&client_version=2.0.2&device_brand=iphone&device_id=50687104&device_model=iPhone&device_platform=iphone&device_type=iphone&from=0&is_hot=0&isnew=1&mobile_type=2&net_type=1&openudid=ee6c635311c40f3a68652c4fb215e986&os_version=13.6&phone_code=ee6c635311c40f3a68652c4fb215e986&phone_network=WIFI&platform=3&request_time=1616389903&resolution=828x1792&sign=222d3864e9fb1e037264b85b03ef7883&sm_device_id=20201128104856f4dab4b672ff5f451a1ac0dc61f370ad0118dbfb33459f28&stype=0&szlm_ddid=D2p4B%2BYlhGhTuhCztyRSIxBZwiQfa/aBBlt6UZzFTN47wX1c&time=1616389903&uid=51149684&uuid=ee6c635311c40f3a68652c4fb215e986',
  'YOUTH_STARTBODY': 'access=WIFI&app_version=2.0.2&channel=80000000&channel_code=80000000&cid=80000000&client_version=2.0.2&device_brand=iphone&device_id=50687104&device_model=iPhone&device_platform=iphone&device_type=iphone&isnew=1&mobile_type=2&net_type=1&openudid=ee6c635311c40f3a68652c4fb215e986&os_version=13.6&phone_code=ee6c635311c40f3a68652c4fb215e986&phone_network=WIFI&platform=3&request_time=1616389872&resolution=828x1792&sm_device_id=20201128104856f4dab4b672ff5f451a1ac0dc61f370ad0118dbfb33459f28&szlm_ddid=D2p4B%2BYlhGhTuhCztyRSIxBZwiQfa/aBBlt6UZzFTN47wX1c&time=1616389873&token=70b80397a5650c971634f85b80a9fe3e&uid=51149684&uuid=ee6c635311c40f3a68652c4fb215e986'
}
cookies4 = {
  'YOUTH_HEADER': {"Accept": "*/*","Accept-Encoding": "gzip, deflate, br","Accept-Language": "zh-cn","Connection": "keep-alive","Content-Type": "","Cookie": "sajssdk_2019_cross_new_user=1; sensorsdata2019jssdkcross=%7B%22distinct_id%22%3A%2253470502%22%2C%22%24device_id%22%3A%2217859f9ea6a69a-0d592eb6c0838e8-724c1151-370944-17859f9ea6b10e6%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E7%9B%B4%E6%8E%A5%E6%B5%81%E9%87%8F%22%2C%22%24latest_referrer%22%3A%22%22%2C%22%24latest_referrer_host%22%3A%22%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC_%E7%9B%B4%E6%8E%A5%E6%89%93%E5%BC%80%22%7D%2C%22first_id%22%3A%2217859f9ea6a69a-0d592eb6c0838e8-724c1151-370944-17859f9ea6b10e6%22%7D","Host": "kd.youth.cn","Referer": "https://kd.youth.cn/h5/20190301taskcenter/ios/index.html?uuid=ab4246bab983396ccf50994c779c9b52&sign=068d60959aa79d20aa6427a18cbed24e&channel_code=80000000&uid=53470502&channel=80000000&access=WIfI&app_version=2.0.2&device_platform=iphone&cookie_id=e3d8dbe3c8b7a966ae81b8423d29e168&openudid=ab4246bab983396ccf50994c779c9b52&device_type=1&device_brand=iphone&sm_device_id=20201128104856f4dab4b672ff5f451a1ac0dc61f370ad0118dbfb33459f28&device_id=50788190&version_code=202&os_version=13.6&cookie=MDAwMDAwMDAwMJCMpN-w09Wtg5-Bb36eh6CPqHualq2jmrCarWOw3YVshHyK3a7OqmqXr6NthJl7mI-shMmXeqDau4StacS3o7GFonqYr6miZYF5l2mEY2Ft&device_model=iPhone_6_Plus&subv=1.5.1&&cookie=MDAwMDAwMDAwMJCMpN-w09Wtg5-Bb36eh6CPqHualq2jmrCarWOw3YVshHyK3a7OqmqXr6NthJl7mI-shMmXeqDau4StacS3o7GFonqYr6miZYF5l2mEY2Ft&cookie_id=e3d8dbe3c8b7a966ae81b8423d29e168","User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148","X-Requested-With": "XMLHttpRequest"},
  'YOUTH_READBODY': 'p=9NwGV8Ov71o%3DgW5NEpb6rjab0hHSxXenkWHSkCwB26b0x_gtnWSAWxe4W5DsfKJWZCtYjtG-pISRI05IOO_tWwKsjHS2coC8oRXfSq-9lTAagrC-ydpEPghdlY8NOPcQv8F0Lahi7CuB03j1gJr86JaOW7ZzzZzjqLuHW38aqQ37pAuTLrCqwSoWUr1K2_rC65VVW1xGBbhpOiMTW6zyOL8AHUIw6wDLtqI_ljHT0lT8x1zAKPW7Cm1gTDBM2lnop-xNzTJvAqa8LaiZ_jkS-DPe8jLL69L1kejXjP87wiI61FfkH6xcKNGbSS9nCW9tb7w6p-XX7SnD6Bzi4wi7yzh4se-Le9qAWHtow-Lp8kdsfgrX9QenyHadn-S_r_rOFjF5CnNqkMFCrwYGaKLCx17BAVHhOacZ-cDiXFX2YAve9Fa7N9fStR3TBKUEkdHxsLADQ-wLG-8FSvBTzzGXjTQCOHcsoOXFl8X0XNH6BVWeaU1H2BEuEdfk_tUuF287DQDXfD6K5d1s44iBV3SrQbnE4_6N_M1pr_H_O8rYJtGmmoa_ps5tdC9SAIh_3YB5FZApWfC8pnjadgIJziG1RJ0FDbo9AEa0zjSlv60HtNeqAQwPM6H9O2aB2LKGrH8BuPNktxnqLnjUcnphtgSq_R_kqvgs9JV4cD1yR_LL3FyI53ITp3XXrGg_UoGTMjimFMAR-h60I9coqYKtvrY5R5cWE9Z4CFvEOnQ5wDdM6m-TMu5uYOuUwiu6Lmnu7VWUjtu_bJ883BICfefKom5m3IlrISrSJBea__dbsHCfMTeBjOoPx-sdnRl9YuhOnKuPxDLJqckx_-o99l2Z8t7VtvQXdUv38H8POjdCxGrUW-IAARoSafVX9Pw%3D',
  'YOUTH_READTIMEBODY': 'p=9NwGV8Ov71o%3DgW5NEpb6rjb84bkaCQyOq-myT0C-Ktb_mEtDEGsOrBruuZzIpWlevTEf2n4e6SDtwtHI8jh7tGLFm1iscPtbZwlhO1--2rPMqEVay5SHQZ0Xa5om9y_QnFioIoDSg-ArtrfwznZt1IhRAOspLNm4F1Z4mRILDUTDM9AS-u45jBAQ0mfHVDOqjccMu4XHLug1HkEUw1GrsPfFC2WPW464LCraQi0C0gLUcHNqdO2NNvTQiaOVxw8ju805R3EqyohB0DCOsAeLPr7KmNOw0H4rYzvg-FwbqxqiPA3IHpocQmC_xlq23ijvheXGKh0E1806CFt2uyU2_V5pPfwGv7C_kEqzLPknd9rUXZSy_vHGw0ZowFukECCXoQc8KarVYXb1gQzRZaHACovfzylPrkKMHiDKTnONYJeWUoxVFDWYAkDa76m7cVhc8Df1Cy1V7zHGTJqoLzUZPGVOhrB6ItM0XF43FsHkFDQf4Q26Mg26VkHhXhGgol_5i1WGuqI_QYVx_Xann_EaWiPd0noFaZl1gp5FNwTCh-boO4zqmzXaaH6dp25xY_l-XqLUj8ATj3nyF4uj1LFl6p6CFsNm43DJ6QUMC3CnSCItZvRrS0XghTpDtXSy-NZK3DMNu5U-oHkcVDpzZPj59ChgCzHNsygpYQ1YTugVWu6V_xrAHMRPoSFvGKoN1Rl5dXNPYfkPKJK5uKGpveRmtCN7DdKR8RAchsvsTluATxOUkSBjFMvFwmdBTxuGSClope_sVEYLX83OLYJesZJjpM6J9khKvfCEsR5bMg6cuz2TlFXL9w1hgj5hxv4yb4ch9YW5NwSPlIcXrI2nYbonHds%3D',
  'YOUTH_WITHDRAWBODY': 'p=9NwGV8Ov71o=gW5NEpb6rjb84bkaCQyOq-myT0C-Ktb_mEtDEGsOrBruuZzIpWlevTEf2n4e6SDtwtHI8jh7tGLFm1iscPtbZwlhO1--2rPMqEVay5SHQZ0Xa5om9y_QnFioIoDSg-ArtrfwznZt1IhRAOspLNm4F1Z4mRILDUTDM9AS-u45jBAQ0mfHVDOqjccMu4XHLug1HkEUw1GrsPfFC2WPW464LCraQi0C0gLUcHNqdO2NNvTQiaOVxw8ju805R3EqyohB0DCOsAeLPr7KmNOw0H4rYzvg-FwbqxqiPA3IHpocQmD0HcY_FFzWgnyo30EV6SbOXQUi6UdZAPcrdKmWOSUn8DdbENYc05mZ_KyTyfwhM_XpOgCIhgROyaGHOdpG7eV8Jy7NwgUocxcOj-GOWbSrFuH4pNRDKpkd2nXeKLoCpOQ0Ujl50eYhGonoA0jc38FiwVRmWvzuurt9jGhWBokx2rJBKEGyKFExs_W0V7cDqOqKT5CoAINteXXGDQtdW4lwQywX-nKibxKjp6kcrd8hsIk3q0WUI15UYj3sBW0pchCz4Qvy0pqXzNk5F--DoCA23Ab39yx3clHSkO29Jn3fBnBdYxhtN7ioP7-pEttIlog31CIoeOpbXrwDaqSKs0NrkKqBgOJscbOA7dzpYMTRayzRsVQUwar3J_PbUmakL1uI-gsiz170K8CfbKedkRBOFIWPQbicc43rz5sMves1DwagZsS8YLhOunMHUcPMLSr1Zt3UGcK1xcRaA9s0QL5-bA3jKH2F4L3xzueWhHJM4RK8W0KylDKPdi7atbFmSztYcun5bTWqnvVtKLdsSRlBIu9h_jRNiQM= ',
  'YOUTH_SHAREBODY': 'access=WIFI&app_version=2.0.2&article_id=36990343&channel=80000000&channel_code=80000000&cid=80000000&client_version=2.0.2&device_brand=iphone&device_id=50788190&device_model=iPhone&device_platform=iphone&device_type=iphone&from=0&is_hot=0&isnew=1&mobile_type=2&net_type=1&openudid=ab4246bab983396ccf50994c779c9b52&os_version=13.6&phone_code=ab4246bab983396ccf50994c779c9b52&phone_network=WIFI&platform=3&request_time=1616390052&resolution=828x1792&sign=788cd9d7af823bd59fe8feb167e4299b&sm_device_id=20201128104856f4dab4b672ff5f451a1ac0dc61f370ad0118dbfb33459f28&stype=0&szlm_ddid=D2OK2fPp1do5vVBCVUpVWSvdtmlzYRLVvDt6UZzFTN47wX19&time=1616390052&uid=53470502&uuid=ab4246bab983396ccf50994c779c9b52',
  'YOUTH_STARTBODY': 'access=WIFI&app_version=2.0.2&channel=80000000&channel_code=80000000&cid=80000000&client_version=2.0.2&device_brand=iphone&device_id=50788190&device_model=iPhone&device_platform=iphone&device_type=iphone&isnew=1&mobile_type=2&net_type=1&openudid=ab4246bab983396ccf50994c779c9b52&os_version=13.6&phone_code=ab4246bab983396ccf50994c779c9b52&phone_network=WIFI&platform=3&request_time=1616390020&resolution=828x1792&sm_device_id=20201128104856f4dab4b672ff5f451a1ac0dc61f370ad0118dbfb33459f28&szlm_ddid=D2OK2fPp1do5vVBCVUpVWSvdtmlzYRLVvDt6UZzFTN47wX19&time=1616390020&token=1a9a811a09d4fff07b419e298aec3fbc&uid=53470502&uuid=ab4246bab983396ccf50994c779c9b52'
}

COOKIELIST = [cookies1,cookies2,cookies3,cookies4,]  # 多账号准备

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