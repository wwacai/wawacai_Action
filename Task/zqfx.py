import requests
import json
import random,string
#微信分享阅读
#把https://script.baertt.com/count2/visit?type=1&si=改成https://script.baertt.com/count2/callback?si=


#每次改si#
#════════════════════════════════════════
def si():
  # 随机生成数字个数
  Ofnum=random.randint(1,32)
  Ofletter=32-Ofnum
  # 选中ofnum个数字
  slcNum=[random.choice(string.digits) for i in range(Ofnum)]
  # 选中ofletter个字母
  slcLetter=[random.choice(string.ascii_letters) for i in range(Ofletter)]
  # 打乱组合
  slcChar=slcLetter+slcNum
  random.shuffle(slcChar)
  # 生成随机密码
  getPwd=''.join([i for i in slcChar])
  print(getPwd)
  return getPwd
#════════════════════════════════════════


headers=  {
            'Accept-Encoding' : 'gzip, deflate, br',
            'Accept' : '*/*',
            'Connection' : 'keep-alive',
            'Referer' : 'https://focus.youth.cn/',
            'Host' : 'script.baertt.com',
            'User-Agent' : 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_6_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.1(0x1800012a) NetType/4G Language/zh_CN',
            'Accept-Language' : 'zh-cn'
            }


url1 = 'https://script.baertt.com/count2/callback?si='+si()+'&referer=https%253A%252F%252Ffocus.youth.cn%252Farticle%252Fs%253Fsignature%253DQqvZWbEKpA2yrNR1Mnvn6wSpdb60ULKld6N49VGjJl8gXB5keP%2526uid%253D52463773%2526phone_code%253De55a2ce90c05c30d05d4df7fd4fce4c1%2526scid%253D36392796%2526time%253D1614045344%2526app_version%253D1.8.2%2526sign%253D6d792115d2f6d648ab9f1bfe06546697&_=1621995994949&jsonpcallback=jsonp3'

url2 = 'https://script.baertt.com/count2/callback?si='+si()+'&referer=https%253A%252F%252Ffocus.youth.cn%252Farticle%252Fs%253Fsignature%253DgENjGxJw2L6opAMam0rnevtRQlr9sOqgJRQ7nX3kY58KdmBzRO%2526uid%253D52533579%2526phone_code%253D95fe8b77a9ac76516b3a643720ea29e1%2526scid%253D30154266%2526time%253D1614045372%2526app_version%253D2.0.0%2526sign%253D8c718eba89e1de293496b52c3cd9dd5d&_=1621996214687&jsonpcallback=jsonp3'

url3 = 'https://script.baertt.com/count2/callback?si='+si()+'&referer=https%253A%252F%252Ffocus.youth.cn%252Farticle%252Fs%253Fsignature%253DRpqGjEWYvLyBl2g1lqwe3ehzX9Zgsvd9ODm4D56Pd3OMonkQx9%2526uid%253D52616860%2526phone_code%253De55a2ce90c05c30d05d4df7fd4fce4c1%2526scid%253D36420892%2526time%253D1614045753%2526app_version%253D1.8.2%2526sign%253De68ad195ed89faae9fd82e99ae9cc408&_=1621996243040&jsonpcallback=jsonp3'

url4 = 'https://script.baertt.com/count2/callback?si='+si()+'&referer=https%253A%252F%252Ffocus.youth.cn%252Farticle%252Fs%253Fsignature%253D3YDwkj8dqQbPnoB4jAEyD0hM5oo9c3DvYdN1lgxXL9AJ2zORKM%2526uid%253D55458751%2526phone_code%253De55a2ce90c05c30d05d4df7fd4fce4c1%2526scid%253D38468411%2526time%253D1621850092%2526app_version%253D2.0.2%2526sign%253Db24e76e56701b37c0c726b0a79dc809b&_=1621915244011&jsonpcallback=jsonp3'


resp1 = requests.get(url=url1,headers=headers,timeout=60).text
print(resp1)

resp2 = requests.get(url=url2,headers=headers,timeout=60).text
print(resp2)

resp3 = requests.get(url=url3,headers=headers,timeout=60).text
print(resp3)


resp4 = requests.get(url=url4,headers=headers,timeout=60).text
print(resp4)


