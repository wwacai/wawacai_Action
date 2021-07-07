/*
更新时间: 2021-02-26 11:32
Github Actions使用方法见[@lxk0301](https://raw.githubusercontent.com/lxk0301/scripts/master/githubAction.md) 使用方法大同小异

中青看点浏览赚任务，手动完成任务，获取请求体，支持boxjs及Github Actions，多请求用"&"分开，点击任务，支持自动获取请求

https:\/\/ios\.baertt\.com\/v5\/task\/browse_start\.json url script-request-body youth_gain.js

https:\/\/ios\.baertt\.com\/v5\/Nameless\/adlickstart\.json url script-request-body youth_gain.js


多个请求体时用'&'号或者换行隔开"，本脚本可自动删除失效请求，请须知 ‼️

*/


const $ = new Env("中青看点浏览赚&看看赚")
//const notify = $.isNode() ? require('./sendNotify') : '';
let startArr = [], lookArr=[];
let gainscore = 0, lookscore = 0;
let StartBody = [],LookBody = [];
//let startbodys = $.getdata('youth_start');
//let lookbodys = $.getdata('youth_look')

//娃娃菜2
let startbodys1 = 'p=9NwGV8Ov71o%3DgW5NEpb6rjb84bkaCQyOq-myT0C-Ktb_pYgxM135XoUfaIpfBqAxRGnFAl1k71C_zMPfUdFlHJTcuxYW9LgBCdTzuda7fnA8r2K-D8AqSYWzt-6LIEcC8SPkaeAgjjv1iCeYI_yckjGbVxJEy1xSQc4qp-_g8cJecymP34l6mTd4L1-lHzdxNHmU-wiLnicUOXV-EFUgwJcckeM1Izfe8Ql_eUOZpkHBrDy2Xal31zHxvTg0EPu-bLjzRpj5aygNNTwYOeuU7-PoLMU4eECvh6SxGg8y7gD1e85wAG9baGIp6cHL8M1pk5KqAIjrb7-isRQ2jCX-JucVTFjU2ddP2tz1NT70yg3ibUeKttelFG430buyDBWN3rdmaTWZNTtZTCs22McTsGMgu3DpmQJ24T3cWE1Nm62wfRvjZginS2XVX30FyK3eGzeIKB0G5T6yhrdpvEfX-Z0P6vy4TL7y_-ps5tlssp294zIxhAnPpNIAH8M_tBJhXp-WywtQqHjUTlFAbN5xBdf8sQiLqYVv-7TRD5USFyHZOgo6N50QLclk0AUN7O7kbHX_yWt-HHkIuRQdHMYbLCfbMhk_w7bIApuq6xRbJM7SxWSqok1_0Xp90H6Y3Y1evx7RL2PcrCvkWprnoWna3jjehkGvwlcmTVoJSshqo_FygwhOnYvNKt-cF1Ls4ebrQCBiO7eiPMRGF5j7925NVeb3OOpFbj8jE57OKBp7jChiJYoWEetC6ubILfj3v-WyaaqsTr9llurK7BBdhCIFjSda1HfrE7w9fQQbkDFW03gL6cBH48ISBmb5jcQILP4pZIbMQ7CJdyFFGYPf25jfjd2ZGQSUJGHQd4uqQCQ1HTWm&p=9NwGV8Ov71o%3DgW5NEpb6rjb84bkaCQyOq-myT0C-Ktb_pYgxM135XoUfaIpfBqAxRGnFAl1k71C_zMPfUdFlHJTcuxYW9LgBCdTzuda7fnA8r2K-D8AqSYWzt-6LIEcC8SPkaeAgjjv1iCeYI_yckjGbVxJEy1xSQc4qp-_g8cJecymP34l6mTd4L1-lHzdxNHmU-wiLnicUOXV-EFUgwJcckeM1Izfe8Ql_eUOZpkHBrDy2Xal31zHxvTg0EPu-bLjzRpj5aygNNTwYOeuU7-PoLMU4eECvh6SxGg8y7gD1e85wAG9baGLS1HLGNX-g8ZLBTH90XE2gD4g8FCqHgCfiFRsY7WawsDuacNXsIVTmUqoBrz_X_3JTKb1XWxY-TDUL3IbqY3_KJuDDzx5QKQJDNVjSnI4KRp2LdvsmnPONU6SwJq-Y2_q9UXviVr9KBNTIfTmklNfakkX40CYo7YJZWKhER-eF4K6P_B0KqrwSkSyGjkl_2-LQubW9fU-Zz7s4OMUb8GME_P1d1PwXavOS3nV_9hRnXbji5i9EMiI0eqzIqV0iJZeGpr-WlSZ6VTbqDtbs1HAf5JOY4YBdrP9SQbmr6B7cpf0ErxjeCGZ26ec-7d_NV8JZlhzHmTOzwUTy9e-q0x-u4fcycBFqH01NJe109nUqjN0LNkMp6JL-ePWWhKk6EtK2etPB0dAWhGvhMX5gs0RrbQ4O_x3YD9G6SuFC1STDDLBIUm3WG4iN4vZXFXzFPhQDOtjcTR7CGNYpVx-Ui5PMvgJtng52bcupEw-_wLxQ8_AQ7Bz543Zq_DfLErtsyYpnK9MvqEJguTuKHGDTNDTtyK2iaGO2N7Du5Idgr7urmmWxof-Ibtha&p=9NwGV8Ov71o%3DgW5NEpb6rjb84bkaCQyOq-myT0C-Ktb_pYgxM135XoUfaIpfBqAxRGnFAl1k71C_zMPfUdFlHJTcuxYW9LgBCdTzuda7fnA8r2K-D8AqSYWzt-6LIEcC8SPkaeAgjjv1iCeYI_yckjGbVxJEy1xSQc4qp-_g8cJecymP34l6mTd4L1-lHzdxNHmU-wiLnicUOXV-EFUgwJcckeM1Izfe8Ql_eUOZpkHBrDy2Xal31zHxvTg0EPu-bLjzRpj5aygNNTwYOeuU7-PoLMU4eECvh6SxGg8y7gD1e85wAG9baGJZbw7hal30pS_n-RTqeItQovhlPYnvgDH8UvHKltVDMpjEBT4Ne8gZlbkgU1KkkA3rEsxYGZVdZ_b0zYeD6BdtjlFcwlh10Dy52PVObo7ibaQJ7rffCEFpGYx7UfJ9uev3oZrLZu4gUTCD_nRdyjuDNjZcuA3noGTmqfd1MNUxNqrPFUtZ8TvKILc4ysoQKiuXjMp3DvmimqqRhyj9eD4yEoM-GOMBHssQDZXYl2RGdU3jZeepA55eYn0N5olg1mOh9uEIoNQ4R6hsBvkxfXc30-cvZs3eRW_Z0tnjwNTsY9Rw6qQpJVY2dLl0kkBAhXniAJs8bchWiuQPOzeFnyRyrKHwIO8riljv1AB_EAs7wdTWF2eTlGVB-EPjLnjPrT5CzBY6Utmx4W7_K3DwrKiKcH2_BxL4nRxL4YiK8c28_jtDzVVOEpcrQpGy4NGW2BjLuDZZcN5PXsRZNYEyIah_aHjL90hrDoI03Z_Eb2IGWRehFLP5wAjMzP7Mx6UbWuXOgCfJFuEDYLnyc7KIHIYpVGBl7kg6xll1_NDvs35gk9K3lCruVVoU&p=9NwGV8Ov71o%3DgW5NEpb6rjb84bkaCQyOq-myT0C-Ktb_pYgxM135XoUfaIpfBqAxRGnFAl1k71C_zMPfUdFlHJTcuxYW9LgBCdTzuda7fnA8r2K-D8AqSYWzt-6LIEcC8SPkaeAgjjv1iCeYI_yckjGbVxJEy1xSQc4qp-_g8cJecymP34l6mTd4L1-lHzdxNHmU-wiLnicUOXV-EFUgwJcckeM1Izfe8Ql_eUOZpkHBrDy2Xal31zHxvTg0EPu-bLjzRpj5aygNNTwYOeuU7-PoLMU4eECvh6SxGg8y7gD1e85wAG9baGJ7RV8soy22wxOcX_SrgFUN91NQcpgcOoO4BYWxlnCXAXIgRBeUbI5en56XKci1vp96Kb6XL8AIEO9o78Q_SYlcN9wu9Bmgf8IUHKAAN3AFCiFzaGyAs2No7jFbSv2YqrSl_9TDmvlcuekmp_5b9_n7uuguJUYnAqxUTz410kX-ckX2VnZOcTZd7oSe2jtLvCw4AwvThHHIhwxJMpLBi4RmagwMRM11yQZVtAXn42slx8TasY8Ch4740vYloWetiQdHhoXXPHDKc4-0Gp7d_x7-kx9gobajXylnX7S1KJ8msmf9kCEiPijrYX4ASPGucd82ME0_V4RflIthEoAUp5Rhel5RzP1azQR_g9NHp_y9JF1zUuCsbWBVAtf1cWDYoTg6hVQQY_O9LHyp0xxf8Gbm3si8t_obOfsjf4P6pUKuWRGO9pFKUxUMRScJ-NvVFU0Oy3FqCj9afWrEX-QsY8nVPQ5D6CI5rYTS73cWqzwzHHTcI2FGF4XzRPu2d26CtAp7C4k2HxYgy6PwKPmbC-p0slfvLRhJN5Oa9l4zjt-OYGotZuzOR87Y'
let lookbodys1 = 'p=9NwGV8Ov71o%3DC5Jtxwc6iVuTcJotRQ4YI8A3NCwuYXT0nQ1DX9p97noi7ajLjgz4IFBCVc4B0rVPSv1H0aZFtfEK8qwv4I91r2zqphxGD65fnUUuLCyve7O24WdCX4Rlpk5dEdmNxJopPviZOKjvUVF-KlHTXPfUYoM4vJjMpD0Kh-4mjHRZR8RAeA-m-2zizdGfInsUbs0SFq3OTCeCsEjB_mp9J9BeikDR9O12upuyqX_aNG89XJix_dAFHyeCQOpRyGn6irjL5RGqK9RF4fyCg5tZt1VeZXkB-dhecHskTwGRpXTxa900wc6l-kwZTIgkNxB6uCeiitBxGux5wKIzZxkWR9oGHEaTIPfD5qtE_0XHQ17An8fcZBDcvrZFfz6ngpg6XQpEdUy4Z2qV5kNgDP7rzHBSwi8cW4JTPGF70h8xAzT9VUz_N3098vhabF2rORNJ_DZetC-tpOjghJ61UQxNPpzAtQ%3D%3D&p=9NwGV8Ov71o%3DC5Jtxwc6iVuTcJotRQ4YI8A3NCwuYXT0nQ1DX9p97noi7ajLjgz4IFBCVc4B0rVPSv1H0aZFtfFVSoTKfxTiG0mWvkvmanbBhCMH5JjGckNZd1I0gf77NyDZSEaRkt_jH3M3X6SIRcsOPf-3Ua5JM6ordpZYhS4DT6ucUOlksR_MKuM8ol89tnSWSe3-T6dE75spH_in3-LSC3p2sLZEuehhT7gs6qb4wXSSRcoccvpjAR2eg3SwuS3X2DvDim08lREr8uHGqIX11-XXsU57eUmaoEco2Rb6jfccCsd7M2DUfbYOGBPeM6eTSB3PtXiIMLi3oiud1bpg7ZtoJ3I-sBtZ_eJbqiFyFQ9DvMyb8gx-lXC_otxMTV_odbIQPIuQ5s2_nkWeYxcMiItbmKdNsWeeXxz4eYSmeMJhq2Xsc4yb7RroqBEBCmhJ01wqeQxMiMQI1q-74zhV9Jh-CFRioQ%3D%3D&p=9NwGV8Ov71o%3DC5Jtxwc6iVuTcJotRQ4YI8A3NCwuYXT0nQ1DX9p97noi7ajLjgz4IFBCVc4B0rVPSv1H0aZFtfE4aqilJqb-bjkqF3q3FaVQ8lmc-ehdI9aAvS6Qz_rJtbAMWmm3kEgLvmHlM8l9lhQMPnKxsk9dHGbztu01zWCsuSRzKqKi8zjstflhutzkuK5KU-xfdsUN6thGJBM_76cNnhKEGzkm42ILJsGkuSp5ztlV9WaD-NifA7q3CiymBDDzw2PJ0R7vcl1oqlklfPTyhpk_Wya87r63O-yuW1Ai_ULjyM7PoYloJDjq1LowYBK6oMoSOWzs4uHt7s_rprqESQL_K_WEeY61yEDIOoWFDDmMZx72m08jDaT_kDLoH6U8A8J7DWZgfyZOi9cFlQPd3sLOJ7kLL-VgWkEJNorCPfkFzsMhhpzZyCwKvR7jncc5pWnbSB4L1N5gna4SE3okzfo4cotsMA%3D%3D&p=9NwGV8Ov71o%3DC5Jtxwc6iVuTcJotRQ4YI8A3NCwuYXT0nQ1DX9p97noi7ajLjgz4IFBCVc4B0rVPqo-YYRIZJUkar2fBOjkqNPD6dWK0MUbVnsRSfXIuNns-NrzwNDta3nZWymAvazoXGd_w_kr0ax5oInGSOi--eg2wLqGRM2UzcfyP3TPkL-dIjVc0uW7gjfUQz_4y2Z7-9hvFUZhRxWU_0YlSmWv98RsXL-t4A4qmifl7pUTye1iFB0_m490LsPstkOC0nbqKg2a92rkDBtMYTlqze_QHW1Du7CXYiTONxewbS6eYJBcUf6WwW3Z89qvPfqlTVE-gUDj6d2v4pw724U75z-hoPyjDinzd0AoX7On15_99mETa2sBajDBBSV5fPaoKeSyQZREO65kpGLZV_nKNlHRJDU3qasppoSa5jdyfOUdYQ2mz774f9eYFM27vr0Vs_IU80bpXGb-UlASMxlb7bTFp1w%3D%3D&p=9NwGV8Ov71o%3DC5Jtxwc6iVuTcJotRQ4YI8A3NCwuYXT0nQ1DX9p97noi7ajLjgz4IFBCVc4B0rVPqo-YYRIZJUm_gYQDD-zR5HruNaKHsjOTq1RbKbHLshjldQCJa7LkWhMnqFty0GZKhSjtiKBDZ2Zpcu3bONa_W2QBCYVZFvx6K5obgt7Z5YXsQZ7FUZYh3j85Q2nuBfq9jX2fvwDryKXUN5ixt1-WB8Ybhm7vTvdeTHCoIFMNCTskxwGdg_-52rAVjYIHbW6BlctBOcdbL3_jwhSYsSwayWp6SuYJ5kVKmkSbuXvt_-qs4DzOHd-sqpMFjfE-UnGHTAY41WETnQN3FbjQ0uPFWITg0S0LfSiRNVLQWYwbTDaklUX5nyfSOPIwaLepfCzZ1fUtOYAZqoE2aSLd8H0X7sGjb7mPJuU8CmhdpwLWyUe53KNel_SZoKuRTaoUgfsdmJubCuEJ0dhJKW1RaEo6nA%3D%3D&p=9NwGV8Ov71o%3DC5Jtxwc6iVuTcJotRQ4YI8A3NCwuYXT0nQ1DX9p97noi7ajLjgz4IFBCVc4B0rVPSv1H0aZFtfEqzUy4CgGYeTJ27d16eijhf5_fqTRAY_qzgdi2Mi-VDcxSha9MctV_vT8cy015TxDHZx-0sH6SXYV6cspnsIlOGMdzeto6weXqNgk1C3aGDfE6qel0UbQLBmM_5kv1fJ3V_ZEBcR-4xhLNZnLfiTSRIHXzgnVCJbKEX9QmMLPrcpnIvflw-G7wZ5uG0ldO_f7J7L354yRkBg3MpXw2Pm89KPW2KUXKAOCywQlHk0crdPSaGGdq40IMOehWbM_h7ObPoYz6D02Aqx5zyrHS5mA8Q7vyYAOtmdvanegyMzvzxrzLUzJjDRLFz2no2cWetZvxK7xQoclfS0Rx3CuF328NFxY7Uz3-Wqoxexz888r8GFoXiYtXqse5WaxFNPG6fGRIWePPTfsg6w%3D%3D&p=9NwGV8Ov71o%3DC5Jtxwc6iVuTcJotRQ4YI8A3NCwuYXT0nQ1DX9p97noi7ajLjgz4IFBCVc4B0rVPSv1H0aZFtfGlCHT4PVLzgeLVGdOLN7cKqt3ltQ5hVpUBkDJ9LQDag6YOoN10-72vazUfuLpi4YCka7mRjTGIydQKronxX-AHrVwTqHG6nRKEgPMbcauwWCkQtYBxxhuPFnFIz4mNHPkRm4iL0uUR4PMeROegA3mRR4oh_2XmwZXtWbqGgBU7HjB7RPToQteZOlQx8vbherf97Jvq3Cg4tmhWA-a23oshBRc_Z_-6K7HxF6jgHr2VSwC9FJ2L6OfaRGKp0-CCSckDaun9y7RWew0p1f7yk4bsIBbJPpkRc3ihZzxpVBQamsR4AiXXVOQxXJImhi_Dn77bSpT_UcXgQGVSwwnzi0hTl4BR1CCIUAQLzOl-Yy3gMIDlU4b5AompjBZAkSHXT6D9Hze3YcVj-Q%3D%3D&p=9NwGV8Ov71o%3DC5Jtxwc6iVuTcJotRQ4YI8A3NCwuYXT0nQ1DX9p97noi7ajLjgz4IFBCVc4B0rVPSv1H0aZFtfFWOlZlX317Hy_o_1e5caa23TyFlYRxKsantnlyTRYbwkUTvL540QX9bqFNLAFm6jXI5T4aQxQgm9KS_8eCiYpBECS4sSpJMpF4iJvvAAFLO9NwrI9qVK1RSOWi2a1nm7fz7oI16Ysu34WOSGN6gVYWTwOGkM8PV1yYUL3nGOse3ihMSqS2aHvzDegjSOWpTWN8-SXP9GgpQCSUGX2TZy0AbYKzroOlTrpC4eaR1OsJk0VIxzXxwmANU4uhtaLYuRiegLD6GTypGF8IRLwetvnUMzOV_Z995GKb4TrjrVy-K_xvEmGi6-L8o4IkUZa98U0joSroiSFcv0Sq4r-8U3-9jzTVOTwWL3u0QH0KwYFrcQb7GbbNo-GfIGMj4zsKY142Pe2EOGl1uw%3D%3D&p=9NwGV8Ov71o%3DC5Jtxwc6iVuTcJotRQ4YI8A3NCwuYXT0nQ1DX9p97noi7ajLjgz4IFBCVc4B0rVPqo-YYRIZJUleDMY3N6KRKCjuZvnT-aIVwFP1-qb-jFLN7SEjvmLW_C_8JuTRwwzmZTGrMZ-zu8B5vcsE-mfq7CPYUn4qrph1iE01ulXPWXr5Ya5WdqUqJlo-T9WPxFbjAWzqaXGcOQErGuQsxCkcwKTCRkXP0FVjTLzUpiosvPAVGq6-f-icKqbNkEMWvcP2_CfJI0CsrJlNvmkKkC6tySpwzQtvsimfjtiWn9avWBmfsg2ZghoO-NQmhLdssi7D_W5Gc4Yhxr1qyCXwGIRYFY7Rt9LTNhc-uxn7YjPUb1vAQNrSHWAKQLbmHMR2OG6LYrWo6QuBM_BipkyIKwrHvbIMHMgZNppF0O6p3JJisVDb5PpDAEGhDKE0WPd5Rs-Umn3BQ8SXl67raK5Iv0OKVA%3D%3D&p=9NwGV8Ov71o%3DC5Jtxwc6iVuTcJotRQ4YI8A3NCwuYXT0nQ1DX9p97noi7ajLjgz4IFBCVc4B0rVPguH4tGlr26EDsYM-xgQS0Tj4CXbn2M_xT3YkAtk1B3gWSTXHz5xcMFNuEToIIBkRBtv5-JLJoykwuk5Njwdj_SPA1_S1lwsSvVyq4gf7UEfpcOAFNsAPtuJpNw4d3RdKNBPw7yBnUOeQEuiEwmc38ozvx9nFSjyK1BdL3SqVbRHlLbUQMyzbR0mzpAQWkgjK6uz5V-nIhGHFmKe1rtzK5detiUslytuC437ObOqvs5aPJfuIOenN_aSD7pCQBYQ3KPpH5CqLd4E3DAc1BWogzP1eFrFEFYmc0-USS9vvpiEYI_mtkJt8QM0WaO02eHZCGz4QWXt1MQMk5swgRqnVhzYH5wmK_kVdYveyx3XI5kF9l-qOly4x349M2qfPwunWDiWJXaPopzXfX8GVkBN2IA%3D%3D&p=9NwGV8Ov71o%3DC5Jtxwc6iVuTcJotRQ4YI8A3NCwuYXT0nQ1DX9p97noi7ajLjgz4IFBCVc4B0rVPSv1H0aZFtfEYzdZXCOcJ6NnNPOUgtE9L13WGsRmjXOY0t8eHtiVpo-xivUWT5YYDP5lIoTYd3-LSFS6Z2rV9gaUD0QZCbZHv1ru1vbG6wFx9Kw9S06ErBGNLvwoMoI_DBWOak4HJo0SbKikovf_OvRrmYbIvHk4mGzQi8hIMDLRnzdxVQHpf7SVcwwUGiEJ54uWhuzr2PlWatnLJ2lfSkNT21Nqn485hSYOp9o2po_xk5FxstnKlexkwHcKRXoGH0f5OH3DQbSmXujvZoUtLK3fS-IwZDXSgbk-XcO6ifLtFLWKnTLIj7I11IWDW7H8uZAjSw9XirkhNwM_mNRXMNSO1ADhvLIxgb-3FtVbEjoMATMrpgLljIMBXq6UgxKfGNDb4YnV026Il6kPXXWXt6w%3D%3D&p=9NwGV8Ov71o%3DC5Jtxwc6iVuTcJotRQ4YI8A3NCwuYXT0nQ1DX9p97noi7ajLjgz4IFBCVc4B0rVPmsUJDtADSuX4_c8s969jIMEk4vRuQfE5GoBwJ203bGZ6QhZGWSGuyqNZ8hQJ9hEA7CneUiy0wpw0VYf-JtRi4N-GJuCoLQt9sw8hHGTnMaDghWtJixCle9tRQlemiM3R7LttsFH3MGD15FMiRmiNX114Yk1ZpC_fAmQP3KfextukG8PVvNg5M1KU2o3CGoLBLHqb7776RQMVbeX9uAQk0uJSDLoYqsnmwdoGcNPDHBgzzJzKwE0Pu5hPBWswKVz-6elDnZSY7Fzd5DI2biDcMiqQsNcsbDSzh1wRTXH2vAHOJTnpImTrCDgpkv9RdvpKdI9SESOdaNai1H5ermZYDebuDeRbInAI5O6cRI0MYw4vTrkTzNTKdD5tnLFV77GT2n3ZsiyYA9_u6hdM_-uJ7Q%3D%3D&p=9NwGV8Ov71o%3DC5Jtxwc6iVuTcJotRQ4YI8A3NCwuYXT0nQ1DX9p97noi7ajLjgz4IFBCVc4B0rVPqo-YYRIZJUk2bzO3yf1q6BiopV6UjFkF4kRhmJJ4vTceCgSaoFpn0Clbva8fcIAIpEY08uaaaVIYY1nAzOH8E0BJEi8NXJwwnTPCxmRuDwr94-YeSS4MT6kapP3XqKNNFG0ll6QQVEaOYdXlzHaowW0GvCM4FwvmZN5HqcU2K41Sjv9dDrCDug5_fdcMpd7tx791vBOU1QhoXxsZ612qw2_59s0USTxiNYc-UUbvJT4QPZAIiT6A1hyds0hfnBJB_RfZTDk1_-9AlxsbeO9_H12D_6gJlDo3m0G4yKyHGovmtNjX-bTqpR3DvN02C4PYCArFwY_xnJriF-B_tHZZClTMBgcwPXcv4_yXTbzE1Y41PL5SFXgIw2f1QGWASiAU1AKBv0UqXzLPh88Uv0Fmjw%3D%3D&p=9NwGV8Ov71o%3DC5Jtxwc6iVuTcJotRQ4YI8A3NCwuYXT0nQ1DX9p97noi7ajLjgz4IFBCVc4B0rVPSv1H0aZFtfFqSHWMgcUjVbSThO0yIimYqYabWBfL7VxGxyVCbKCbXyDcmEbIHkcMD_vAT5a2M_ovpuidMVfCC4s6aKojC9l5DokStmthsxgDGor9KjPIwcD8_TVZY9VST11-7kgrzy-oh5Qjn1ihepBsfO_l6DfJ5Y7JwUoMxSsDXzt_Fiu1s0AQ9_tr-z8Envn-wfgKfuFDKGsOtVwdxcrn01gq1on2MjD5jGKteTHS0QK2r-aGE4MpEVjmTZZ3vldbQ5DefREas_9vOQlknu6Jk4yBa2eh7GKdN0K6x74ui5Wb3sirJm8NQk-yd6I-Opj8AX0j5n4WSZnSvXfAoDDrZJHWLkRP_jJv6X_N3zKDXhc6vGzQof2gaEJLYjhFZhvatWpynSGVDuW6Wu6Jzw%3D%3D&p=9NwGV8Ov71o%3DC5Jtxwc6iVuTcJotRQ4YI8A3NCwuYXT0nQ1DX9p97noi7ajLjgz4IFBCVc4B0rVPqo-YYRIZJUncGhijDlASoEBnpoGuuLd28EqMEzbOaQox_S2delTagNqgPE9IfGFbvjLt8-J_I33tHFJc3OtuZQMJ2gwHStiphuJPymcXPh_n6FmQzw_Vbm52kTuna2DgDcCrqsj6dxR3osoEvaVwuGNtpsuvcTpJ_hx-gt9qI_ITXm4OGXrWPKQmjdQmHEhtz-Av3YLaBgY4mWo8zBHwhW9dyyQ52JfWfUkRfrkEdspbof97HpxArUr31ym7nnbDgf2WTj7Hvx7_8YVu-Xkb1gxFhfOP5AL1rwYsC_4sXFBbAJhBc4dwZt1PSXhgEBtK0Hd09frHl4uZkWTWyGLOVj1KQEIDqFUQri8CXnuQcH8B0qCW-f-jG_R8ga4zCGwo_MkO_gCwTmR-BGuCpmyNyg%3D%3D&p=9NwGV8Ov71o%3DC5Jtxwc6iVuTcJotRQ4YI8A3NCwuYXT0nQ1DX9p97noi7ajLjgz4IFBCVc4B0rVPSv1H0aZFtfHf1KVot2ahAHBX2YwF6gZ8sDxXHPaHl5GrcHjwZL1sL2ZWsHLj7mX49pvM5NRobrnIBA13u3Q-EUBQo-1_9i5eV2KIcrOAIt-MlY0jrK_5GZwzo7-BQIHbdRQ2PY7mQLSGOoA2v2T_Ph6JYQ0J5NtaSuWWG5FXvD3wV3P-lD0DVJ6bvR3UgbFtElb0r_s8do2rHXYhiry739_hk2rrt73Nw17LQ0D--KTrX0xsVns8Gm31cxsKzL9Q-UWJiJnxCnY8CcjrUGW7srFaeMFfwwMbbQreWYjydvRB5UNtt8FzjLx_HDphGDDeVohZ3K0e7n0vDO_3J8weAldDAJo5cukfpZ9xQBvOq7blyAPqDMlxOxekx2UudsgquKPOzBqlPecEt9mYMMuxxw%3D%3D'
  
//娃娃菜2
let startbodys2 = 'p=9NwGV8Ov71o%3DgW5NEpb6rjb84bkaCQyOq-myT0C-Ktb_pYgxM135XoUfaIpfBqAxRGnFAl1k71C_zMPfUdFlHJTcuxYW9LgBCdTzuda7fnA8r2K-D8AqSYWzt-6LIEcC8SPkaeAgjjv1iCeYI_yckjGbVxJEy1xSQc4qp-_g8cJecymP34l6mTd4L1-lHzdxNHmU-wiLnicUOXV-EFUgwJcckeM1Izfe8Ql_eUOZpkHBrDy2Xal31zHxvTg0EPu-bLjzRpj5aygNNTwYOeuU7-PoLMU4eECvh6SxGg8y7gD1e85wAG9baGIp6cHL8M1pk5KqAIjrb7-isRQ2jCX-JucVTFjU2ddP2tz1NT70yg3ibUeKttelFG430buyDBWN3rdmaTWZNTtZTCs22McTsGMgu3DpmQJ24T3cWE1Nm62wfRvjZginS2XVX30FyK3eGzeIKB0G5T6yhrdpvEfX-Z0P6vy4TL7y_-ps5tlssp294zIxhAnPpNIAH8M_tBJhXp-WywtQqHjUTlFAbN5xBdf8sQiLqYVv-7TRD5USFyHZOgo6N50QLclk0AUN7O7kbHX_yWt-HHkIuRQdHMYbLCfbMhk_w7bIApuq6xRbJM7SxWSqok1_0Xp90H6Y3Y1evx7RL2PcrCvkWprnoWna3jjehkGvwlcmTVoJSshqo_FygwhOnYvNKt-cF1Ls4ebrQCBiO7eiPMRGF5j7925NVeb3OOpFbj8jE57OKBp7jChiJYoWEetC6ubILfj3v-WyaaqsTr9llurK7BBdhCIFjSda1HfrE7w9fQQbkDFW03gL6cBH48ISBmb5jcQILP4pZIbMQ7CJdyFFGYPf25jfjd2ZGQSUJGHQd4uqQCQ1HTWm&p=9NwGV8Ov71o%3DgW5NEpb6rjb84bkaCQyOq-myT0C-Ktb_pYgxM135XoUfaIpfBqAxRGnFAl1k71C_zMPfUdFlHJTcuxYW9LgBCdTzuda7fnA8r2K-D8AqSYWzt-6LIEcC8SPkaeAgjjv1iCeYI_yckjGbVxJEy1xSQc4qp-_g8cJecymP34l6mTd4L1-lHzdxNHmU-wiLnicUOXV-EFUgwJcckeM1Izfe8Ql_eUOZpkHBrDy2Xal31zHxvTg0EPu-bLjzRpj5aygNNTwYOeuU7-PoLMU4eECvh6SxGg8y7gD1e85wAG9baGLS1HLGNX-g8ZLBTH90XE2gD4g8FCqHgCfiFRsY7WawsDuacNXsIVTmUqoBrz_X_3JTKb1XWxY-TDUL3IbqY3_KJuDDzx5QKQJDNVjSnI4KRp2LdvsmnPONU6SwJq-Y2_q9UXviVr9KBNTIfTmklNfakkX40CYo7YJZWKhER-eF4K6P_B0KqrwSkSyGjkl_2-LQubW9fU-Zz7s4OMUb8GME_P1d1PwXavOS3nV_9hRnXbji5i9EMiI0eqzIqV0iJZeGpr-WlSZ6VTbqDtbs1HAf5JOY4YBdrP9SQbmr6B7cpf0ErxjeCGZ26ec-7d_NV8JZlhzHmTOzwUTy9e-q0x-u4fcycBFqH01NJe109nUqjN0LNkMp6JL-ePWWhKk6EtK2etPB0dAWhGvhMX5gs0RrbQ4O_x3YD9G6SuFC1STDDLBIUm3WG4iN4vZXFXzFPhQDOtjcTR7CGNYpVx-Ui5PMvgJtng52bcupEw-_wLxQ8_AQ7Bz543Zq_DfLErtsyYpnK9MvqEJguTuKHGDTNDTtyK2iaGO2N7Du5Idgr7urmmWxof-Ibtha&p=9NwGV8Ov71o%3DgW5NEpb6rjb84bkaCQyOq-myT0C-Ktb_pYgxM135XoUfaIpfBqAxRGnFAl1k71C_zMPfUdFlHJTcuxYW9LgBCdTzuda7fnA8r2K-D8AqSYWzt-6LIEcC8SPkaeAgjjv1iCeYI_yckjGbVxJEy1xSQc4qp-_g8cJecymP34l6mTd4L1-lHzdxNHmU-wiLnicUOXV-EFUgwJcckeM1Izfe8Ql_eUOZpkHBrDy2Xal31zHxvTg0EPu-bLjzRpj5aygNNTwYOeuU7-PoLMU4eECvh6SxGg8y7gD1e85wAG9baGJZbw7hal30pS_n-RTqeItQovhlPYnvgDH8UvHKltVDMpjEBT4Ne8gZlbkgU1KkkA3rEsxYGZVdZ_b0zYeD6BdtjlFcwlh10Dy52PVObo7ibaQJ7rffCEFpGYx7UfJ9uev3oZrLZu4gUTCD_nRdyjuDNjZcuA3noGTmqfd1MNUxNqrPFUtZ8TvKILc4ysoQKiuXjMp3DvmimqqRhyj9eD4yEoM-GOMBHssQDZXYl2RGdU3jZeepA55eYn0N5olg1mOh9uEIoNQ4R6hsBvkxfXc30-cvZs3eRW_Z0tnjwNTsY9Rw6qQpJVY2dLl0kkBAhXniAJs8bchWiuQPOzeFnyRyrKHwIO8riljv1AB_EAs7wdTWF2eTlGVB-EPjLnjPrT5CzBY6Utmx4W7_K3DwrKiKcH2_BxL4nRxL4YiK8c28_jtDzVVOEpcrQpGy4NGW2BjLuDZZcN5PXsRZNYEyIah_aHjL90hrDoI03Z_Eb2IGWRehFLP5wAjMzP7Mx6UbWuXOgCfJFuEDYLnyc7KIHIYpVGBl7kg6xll1_NDvs35gk9K3lCruVVoU&p=9NwGV8Ov71o%3DgW5NEpb6rjb84bkaCQyOq-myT0C-Ktb_pYgxM135XoUfaIpfBqAxRGnFAl1k71C_zMPfUdFlHJTcuxYW9LgBCdTzuda7fnA8r2K-D8AqSYWzt-6LIEcC8SPkaeAgjjv1iCeYI_yckjGbVxJEy1xSQc4qp-_g8cJecymP34l6mTd4L1-lHzdxNHmU-wiLnicUOXV-EFUgwJcckeM1Izfe8Ql_eUOZpkHBrDy2Xal31zHxvTg0EPu-bLjzRpj5aygNNTwYOeuU7-PoLMU4eECvh6SxGg8y7gD1e85wAG9baGJ7RV8soy22wxOcX_SrgFUN91NQcpgcOoO4BYWxlnCXAXIgRBeUbI5en56XKci1vp96Kb6XL8AIEO9o78Q_SYlcN9wu9Bmgf8IUHKAAN3AFCiFzaGyAs2No7jFbSv2YqrSl_9TDmvlcuekmp_5b9_n7uuguJUYnAqxUTz410kX-ckX2VnZOcTZd7oSe2jtLvCw4AwvThHHIhwxJMpLBi4RmagwMRM11yQZVtAXn42slx8TasY8Ch4740vYloWetiQdHhoXXPHDKc4-0Gp7d_x7-kx9gobajXylnX7S1KJ8msmf9kCEiPijrYX4ASPGucd82ME0_V4RflIthEoAUp5Rhel5RzP1azQR_g9NHp_y9JF1zUuCsbWBVAtf1cWDYoTg6hVQQY_O9LHyp0xxf8Gbm3si8t_obOfsjf4P6pUKuWRGO9pFKUxUMRScJ-NvVFU0Oy3FqCj9afWrEX-QsY8nVPQ5D6CI5rYTS73cWqzwzHHTcI2FGF4XzRPu2d26CtAp7C4k2HxYgy6PwKPmbC-p0slfvLRhJN5Oa9l4zjt-OYGotZuzOR87Y'
let lookbodys2 = 'p=9NwGV8Ov71o%3DC5Jtxwc6iVuTcJotRQ4YI8A3NCwuYXT0nQ1DX9p97noi7ajLjgz4IFBCVc4B0rVPSv1H0aZFtfEK8qwv4I91r2zqphxGD65fnUUuLCyve7O24WdCX4Rlpk5dEdmNxJopPviZOKjvUVF-KlHTXPfUYoM4vJjMpD0Kh-4mjHRZR8RAeA-m-2zizdGfInsUbs0SFq3OTCeCsEjB_mp9J9BeikDR9O12upuyqX_aNG89XJix_dAFHyeCQOpRyGn6irjL5RGqK9RF4fyCg5tZt1VeZXkB-dhecHskTwGRpXTxa900wc6l-kwZTIgkNxB6uCeiitBxGux5wKIzZxkWR9oGHEaTIPfD5qtE_0XHQ17An8fcZBDcvrZFfz6ngpg6XQpEdUy4Z2qV5kNgDP7rzHBSwi8cW4JTPGF70h8xAzT9VUz_N3098vhabF2rORNJ_DZetC-tpOjghJ61UQxNPpzAtQ%3D%3D&p=9NwGV8Ov71o%3DC5Jtxwc6iVuTcJotRQ4YI8A3NCwuYXT0nQ1DX9p97noi7ajLjgz4IFBCVc4B0rVPSv1H0aZFtfFVSoTKfxTiG0mWvkvmanbBhCMH5JjGckNZd1I0gf77NyDZSEaRkt_jH3M3X6SIRcsOPf-3Ua5JM6ordpZYhS4DT6ucUOlksR_MKuM8ol89tnSWSe3-T6dE75spH_in3-LSC3p2sLZEuehhT7gs6qb4wXSSRcoccvpjAR2eg3SwuS3X2DvDim08lREr8uHGqIX11-XXsU57eUmaoEco2Rb6jfccCsd7M2DUfbYOGBPeM6eTSB3PtXiIMLi3oiud1bpg7ZtoJ3I-sBtZ_eJbqiFyFQ9DvMyb8gx-lXC_otxMTV_odbIQPIuQ5s2_nkWeYxcMiItbmKdNsWeeXxz4eYSmeMJhq2Xsc4yb7RroqBEBCmhJ01wqeQxMiMQI1q-74zhV9Jh-CFRioQ%3D%3D&p=9NwGV8Ov71o%3DC5Jtxwc6iVuTcJotRQ4YI8A3NCwuYXT0nQ1DX9p97noi7ajLjgz4IFBCVc4B0rVPSv1H0aZFtfE4aqilJqb-bjkqF3q3FaVQ8lmc-ehdI9aAvS6Qz_rJtbAMWmm3kEgLvmHlM8l9lhQMPnKxsk9dHGbztu01zWCsuSRzKqKi8zjstflhutzkuK5KU-xfdsUN6thGJBM_76cNnhKEGzkm42ILJsGkuSp5ztlV9WaD-NifA7q3CiymBDDzw2PJ0R7vcl1oqlklfPTyhpk_Wya87r63O-yuW1Ai_ULjyM7PoYloJDjq1LowYBK6oMoSOWzs4uHt7s_rprqESQL_K_WEeY61yEDIOoWFDDmMZx72m08jDaT_kDLoH6U8A8J7DWZgfyZOi9cFlQPd3sLOJ7kLL-VgWkEJNorCPfkFzsMhhpzZyCwKvR7jncc5pWnbSB4L1N5gna4SE3okzfo4cotsMA%3D%3D&p=9NwGV8Ov71o%3DC5Jtxwc6iVuTcJotRQ4YI8A3NCwuYXT0nQ1DX9p97noi7ajLjgz4IFBCVc4B0rVPqo-YYRIZJUkar2fBOjkqNPD6dWK0MUbVnsRSfXIuNns-NrzwNDta3nZWymAvazoXGd_w_kr0ax5oInGSOi--eg2wLqGRM2UzcfyP3TPkL-dIjVc0uW7gjfUQz_4y2Z7-9hvFUZhRxWU_0YlSmWv98RsXL-t4A4qmifl7pUTye1iFB0_m490LsPstkOC0nbqKg2a92rkDBtMYTlqze_QHW1Du7CXYiTONxewbS6eYJBcUf6WwW3Z89qvPfqlTVE-gUDj6d2v4pw724U75z-hoPyjDinzd0AoX7On15_99mETa2sBajDBBSV5fPaoKeSyQZREO65kpGLZV_nKNlHRJDU3qasppoSa5jdyfOUdYQ2mz774f9eYFM27vr0Vs_IU80bpXGb-UlASMxlb7bTFp1w%3D%3D&p=9NwGV8Ov71o%3DC5Jtxwc6iVuTcJotRQ4YI8A3NCwuYXT0nQ1DX9p97noi7ajLjgz4IFBCVc4B0rVPqo-YYRIZJUm_gYQDD-zR5HruNaKHsjOTq1RbKbHLshjldQCJa7LkWhMnqFty0GZKhSjtiKBDZ2Zpcu3bONa_W2QBCYVZFvx6K5obgt7Z5YXsQZ7FUZYh3j85Q2nuBfq9jX2fvwDryKXUN5ixt1-WB8Ybhm7vTvdeTHCoIFMNCTskxwGdg_-52rAVjYIHbW6BlctBOcdbL3_jwhSYsSwayWp6SuYJ5kVKmkSbuXvt_-qs4DzOHd-sqpMFjfE-UnGHTAY41WETnQN3FbjQ0uPFWITg0S0LfSiRNVLQWYwbTDaklUX5nyfSOPIwaLepfCzZ1fUtOYAZqoE2aSLd8H0X7sGjb7mPJuU8CmhdpwLWyUe53KNel_SZoKuRTaoUgfsdmJubCuEJ0dhJKW1RaEo6nA%3D%3D&p=9NwGV8Ov71o%3DC5Jtxwc6iVuTcJotRQ4YI8A3NCwuYXT0nQ1DX9p97noi7ajLjgz4IFBCVc4B0rVPSv1H0aZFtfEqzUy4CgGYeTJ27d16eijhf5_fqTRAY_qzgdi2Mi-VDcxSha9MctV_vT8cy015TxDHZx-0sH6SXYV6cspnsIlOGMdzeto6weXqNgk1C3aGDfE6qel0UbQLBmM_5kv1fJ3V_ZEBcR-4xhLNZnLfiTSRIHXzgnVCJbKEX9QmMLPrcpnIvflw-G7wZ5uG0ldO_f7J7L354yRkBg3MpXw2Pm89KPW2KUXKAOCywQlHk0crdPSaGGdq40IMOehWbM_h7ObPoYz6D02Aqx5zyrHS5mA8Q7vyYAOtmdvanegyMzvzxrzLUzJjDRLFz2no2cWetZvxK7xQoclfS0Rx3CuF328NFxY7Uz3-Wqoxexz888r8GFoXiYtXqse5WaxFNPG6fGRIWePPTfsg6w%3D%3D&p=9NwGV8Ov71o%3DC5Jtxwc6iVuTcJotRQ4YI8A3NCwuYXT0nQ1DX9p97noi7ajLjgz4IFBCVc4B0rVPSv1H0aZFtfGlCHT4PVLzgeLVGdOLN7cKqt3ltQ5hVpUBkDJ9LQDag6YOoN10-72vazUfuLpi4YCka7mRjTGIydQKronxX-AHrVwTqHG6nRKEgPMbcauwWCkQtYBxxhuPFnFIz4mNHPkRm4iL0uUR4PMeROegA3mRR4oh_2XmwZXtWbqGgBU7HjB7RPToQteZOlQx8vbherf97Jvq3Cg4tmhWA-a23oshBRc_Z_-6K7HxF6jgHr2VSwC9FJ2L6OfaRGKp0-CCSckDaun9y7RWew0p1f7yk4bsIBbJPpkRc3ihZzxpVBQamsR4AiXXVOQxXJImhi_Dn77bSpT_UcXgQGVSwwnzi0hTl4BR1CCIUAQLzOl-Yy3gMIDlU4b5AompjBZAkSHXT6D9Hze3YcVj-Q%3D%3D&p=9NwGV8Ov71o%3DC5Jtxwc6iVuTcJotRQ4YI8A3NCwuYXT0nQ1DX9p97noi7ajLjgz4IFBCVc4B0rVPSv1H0aZFtfFWOlZlX317Hy_o_1e5caa23TyFlYRxKsantnlyTRYbwkUTvL540QX9bqFNLAFm6jXI5T4aQxQgm9KS_8eCiYpBECS4sSpJMpF4iJvvAAFLO9NwrI9qVK1RSOWi2a1nm7fz7oI16Ysu34WOSGN6gVYWTwOGkM8PV1yYUL3nGOse3ihMSqS2aHvzDegjSOWpTWN8-SXP9GgpQCSUGX2TZy0AbYKzroOlTrpC4eaR1OsJk0VIxzXxwmANU4uhtaLYuRiegLD6GTypGF8IRLwetvnUMzOV_Z995GKb4TrjrVy-K_xvEmGi6-L8o4IkUZa98U0joSroiSFcv0Sq4r-8U3-9jzTVOTwWL3u0QH0KwYFrcQb7GbbNo-GfIGMj4zsKY142Pe2EOGl1uw%3D%3D&p=9NwGV8Ov71o%3DC5Jtxwc6iVuTcJotRQ4YI8A3NCwuYXT0nQ1DX9p97noi7ajLjgz4IFBCVc4B0rVPqo-YYRIZJUleDMY3N6KRKCjuZvnT-aIVwFP1-qb-jFLN7SEjvmLW_C_8JuTRwwzmZTGrMZ-zu8B5vcsE-mfq7CPYUn4qrph1iE01ulXPWXr5Ya5WdqUqJlo-T9WPxFbjAWzqaXGcOQErGuQsxCkcwKTCRkXP0FVjTLzUpiosvPAVGq6-f-icKqbNkEMWvcP2_CfJI0CsrJlNvmkKkC6tySpwzQtvsimfjtiWn9avWBmfsg2ZghoO-NQmhLdssi7D_W5Gc4Yhxr1qyCXwGIRYFY7Rt9LTNhc-uxn7YjPUb1vAQNrSHWAKQLbmHMR2OG6LYrWo6QuBM_BipkyIKwrHvbIMHMgZNppF0O6p3JJisVDb5PpDAEGhDKE0WPd5Rs-Umn3BQ8SXl67raK5Iv0OKVA%3D%3D&p=9NwGV8Ov71o%3DC5Jtxwc6iVuTcJotRQ4YI8A3NCwuYXT0nQ1DX9p97noi7ajLjgz4IFBCVc4B0rVPguH4tGlr26EDsYM-xgQS0Tj4CXbn2M_xT3YkAtk1B3gWSTXHz5xcMFNuEToIIBkRBtv5-JLJoykwuk5Njwdj_SPA1_S1lwsSvVyq4gf7UEfpcOAFNsAPtuJpNw4d3RdKNBPw7yBnUOeQEuiEwmc38ozvx9nFSjyK1BdL3SqVbRHlLbUQMyzbR0mzpAQWkgjK6uz5V-nIhGHFmKe1rtzK5detiUslytuC437ObOqvs5aPJfuIOenN_aSD7pCQBYQ3KPpH5CqLd4E3DAc1BWogzP1eFrFEFYmc0-USS9vvpiEYI_mtkJt8QM0WaO02eHZCGz4QWXt1MQMk5swgRqnVhzYH5wmK_kVdYveyx3XI5kF9l-qOly4x349M2qfPwunWDiWJXaPopzXfX8GVkBN2IA%3D%3D&p=9NwGV8Ov71o%3DC5Jtxwc6iVuTcJotRQ4YI8A3NCwuYXT0nQ1DX9p97noi7ajLjgz4IFBCVc4B0rVPSv1H0aZFtfEYzdZXCOcJ6NnNPOUgtE9L13WGsRmjXOY0t8eHtiVpo-xivUWT5YYDP5lIoTYd3-LSFS6Z2rV9gaUD0QZCbZHv1ru1vbG6wFx9Kw9S06ErBGNLvwoMoI_DBWOak4HJo0SbKikovf_OvRrmYbIvHk4mGzQi8hIMDLRnzdxVQHpf7SVcwwUGiEJ54uWhuzr2PlWatnLJ2lfSkNT21Nqn485hSYOp9o2po_xk5FxstnKlexkwHcKRXoGH0f5OH3DQbSmXujvZoUtLK3fS-IwZDXSgbk-XcO6ifLtFLWKnTLIj7I11IWDW7H8uZAjSw9XirkhNwM_mNRXMNSO1ADhvLIxgb-3FtVbEjoMATMrpgLljIMBXq6UgxKfGNDb4YnV026Il6kPXXWXt6w%3D%3D&p=9NwGV8Ov71o%3DC5Jtxwc6iVuTcJotRQ4YI8A3NCwuYXT0nQ1DX9p97noi7ajLjgz4IFBCVc4B0rVPmsUJDtADSuX4_c8s969jIMEk4vRuQfE5GoBwJ203bGZ6QhZGWSGuyqNZ8hQJ9hEA7CneUiy0wpw0VYf-JtRi4N-GJuCoLQt9sw8hHGTnMaDghWtJixCle9tRQlemiM3R7LttsFH3MGD15FMiRmiNX114Yk1ZpC_fAmQP3KfextukG8PVvNg5M1KU2o3CGoLBLHqb7776RQMVbeX9uAQk0uJSDLoYqsnmwdoGcNPDHBgzzJzKwE0Pu5hPBWswKVz-6elDnZSY7Fzd5DI2biDcMiqQsNcsbDSzh1wRTXH2vAHOJTnpImTrCDgpkv9RdvpKdI9SESOdaNai1H5ermZYDebuDeRbInAI5O6cRI0MYw4vTrkTzNTKdD5tnLFV77GT2n3ZsiyYA9_u6hdM_-uJ7Q%3D%3D&p=9NwGV8Ov71o%3DC5Jtxwc6iVuTcJotRQ4YI8A3NCwuYXT0nQ1DX9p97noi7ajLjgz4IFBCVc4B0rVPqo-YYRIZJUk2bzO3yf1q6BiopV6UjFkF4kRhmJJ4vTceCgSaoFpn0Clbva8fcIAIpEY08uaaaVIYY1nAzOH8E0BJEi8NXJwwnTPCxmRuDwr94-YeSS4MT6kapP3XqKNNFG0ll6QQVEaOYdXlzHaowW0GvCM4FwvmZN5HqcU2K41Sjv9dDrCDug5_fdcMpd7tx791vBOU1QhoXxsZ612qw2_59s0USTxiNYc-UUbvJT4QPZAIiT6A1hyds0hfnBJB_RfZTDk1_-9AlxsbeO9_H12D_6gJlDo3m0G4yKyHGovmtNjX-bTqpR3DvN02C4PYCArFwY_xnJriF-B_tHZZClTMBgcwPXcv4_yXTbzE1Y41PL5SFXgIw2f1QGWASiAU1AKBv0UqXzLPh88Uv0Fmjw%3D%3D&p=9NwGV8Ov71o%3DC5Jtxwc6iVuTcJotRQ4YI8A3NCwuYXT0nQ1DX9p97noi7ajLjgz4IFBCVc4B0rVPSv1H0aZFtfFqSHWMgcUjVbSThO0yIimYqYabWBfL7VxGxyVCbKCbXyDcmEbIHkcMD_vAT5a2M_ovpuidMVfCC4s6aKojC9l5DokStmthsxgDGor9KjPIwcD8_TVZY9VST11-7kgrzy-oh5Qjn1ihepBsfO_l6DfJ5Y7JwUoMxSsDXzt_Fiu1s0AQ9_tr-z8Envn-wfgKfuFDKGsOtVwdxcrn01gq1on2MjD5jGKteTHS0QK2r-aGE4MpEVjmTZZ3vldbQ5DefREas_9vOQlknu6Jk4yBa2eh7GKdN0K6x74ui5Wb3sirJm8NQk-yd6I-Opj8AX0j5n4WSZnSvXfAoDDrZJHWLkRP_jJv6X_N3zKDXhc6vGzQof2gaEJLYjhFZhvatWpynSGVDuW6Wu6Jzw%3D%3D&p=9NwGV8Ov71o%3DC5Jtxwc6iVuTcJotRQ4YI8A3NCwuYXT0nQ1DX9p97noi7ajLjgz4IFBCVc4B0rVPqo-YYRIZJUncGhijDlASoEBnpoGuuLd28EqMEzbOaQox_S2delTagNqgPE9IfGFbvjLt8-J_I33tHFJc3OtuZQMJ2gwHStiphuJPymcXPh_n6FmQzw_Vbm52kTuna2DgDcCrqsj6dxR3osoEvaVwuGNtpsuvcTpJ_hx-gt9qI_ITXm4OGXrWPKQmjdQmHEhtz-Av3YLaBgY4mWo8zBHwhW9dyyQ52JfWfUkRfrkEdspbof97HpxArUr31ym7nnbDgf2WTj7Hvx7_8YVu-Xkb1gxFhfOP5AL1rwYsC_4sXFBbAJhBc4dwZt1PSXhgEBtK0Hd09frHl4uZkWTWyGLOVj1KQEIDqFUQri8CXnuQcH8B0qCW-f-jG_R8ga4zCGwo_MkO_gCwTmR-BGuCpmyNyg%3D%3D&p=9NwGV8Ov71o%3DC5Jtxwc6iVuTcJotRQ4YI8A3NCwuYXT0nQ1DX9p97noi7ajLjgz4IFBCVc4B0rVPSv1H0aZFtfHf1KVot2ahAHBX2YwF6gZ8sDxXHPaHl5GrcHjwZL1sL2ZWsHLj7mX49pvM5NRobrnIBA13u3Q-EUBQo-1_9i5eV2KIcrOAIt-MlY0jrK_5GZwzo7-BQIHbdRQ2PY7mQLSGOoA2v2T_Ph6JYQ0J5NtaSuWWG5FXvD3wV3P-lD0DVJ6bvR3UgbFtElb0r_s8do2rHXYhiry739_hk2rrt73Nw17LQ0D--KTrX0xsVns8Gm31cxsKzL9Q-UWJiJnxCnY8CcjrUGW7srFaeMFfwwMbbQreWYjydvRB5UNtt8FzjLx_HDphGDDeVohZ3K0e7n0vDO_3J8weAldDAJo5cukfpZ9xQBvOq7blyAPqDMlxOxekx2UudsgquKPOzBqlPecEt9mYMMuxxw%3D%3D'

let startbodys = startbodys1+'&'+startbodys2
let lookbodys = lookbodys1+'&'+lookbodys2



if (isGetCookie = typeof $request !==`undefined`) {
   GetCookie();
   $.done()
} 
if (!$.isNode() && !lookbodys) {
    $.msg($.name, "您未获取看看赚请求，请先获取");
} else if (!$.isNode() && !startbodys) {
    $.msg($.name, "您未获取浏览赚请求，请先获取");
}
if (!$.isNode() && !startbodys.indexOf("&") == -1) {
    startArr.push(startbodys)
} else if (!$.isNode() && !lookbodys.indexOf("&") == -1) {
    lookArr.push(lookbodys)
} else {
    if (!$.isNode() && !startbodys.indexOf("&") > -1) {
        StartBody = startbodys.split('&');
    }
    if (!$.isNode() && !lookbodys.indexOf("&") > -1) {
        LookBody = lookbodys.split('&');
    }
    if ($.isNode() && process.env.YOUTH_START ) {
        if (process.env.YOUTH_START && process.env.YOUTH_START.indexOf('&') > -1) {
            StartBody = process.env.YOUTH_START.split('&');
        } else {
            StartBody = [process.env.YOUTH_START]
        };
        if (process.env.YOUTH_LOOK && process.env.YOUTH_LOOK.indexOf('&') > -1) {
            LookBody = process.env.YOUTH_LOOK.split('&');
        } else {
            LookBody = [process.env.YOUTH_LOOK]
        }
    }
    if ($.isNode() && startbodys ) {
        if (startbodys && startbodys.indexOf('&') > -1) {
            StartBody = startbodys.split('&');
        } else {
            StartBody = startbodys
        };
        if (lookbodys && lookbodys.indexOf('&') > -1) {
            LookBody = lookbodys.split('&');
        } else {
            LookBody = lookbodys
        }
    }
    Object.keys(StartBody).forEach((item) => {
        if (StartBody[item]) {
            startArr.push(StartBody[item])
        }
    });
    Object.keys(LookBody).forEach((item) => {
        if (LookBody[item]) {
            lookArr.push(LookBody[item])
        }
    })
}
timeZone = new Date().getTimezoneOffset() / 60;
timestamp = Date.now() + (8 + timeZone) * 60 * 60 * 1000;
bjTime = new Date(timestamp).toLocaleString('zh', {
    hour12: false,
    timeZoneName: 'long'
});
console.log(`\n === 脚本执行 ${bjTime} ===\n`);
!(async() => {
    $.log(`您共提供${startArr.length}次浏览赚任务`)
    if (startArr.length !== 0) {
        for (let i = 0; i < startArr.length; i++) {
            if (startArr[i]) {
                gainbody = startArr[i];
                $.index = i + 1;
                $.log(`-------------------------\n\n开始中青看点浏览赚第${$.index}次任务`)
            }
            await GainStart();
        }
        console.log(`-------------------------\n\n中青看点共完成${$.index}次任务，共计获得${gainscore}个青豆，浏览赚任务全部结束`);
        //$.msg("中青看点浏览赚", `共完成${$.index}次任务`+`  共计获得${gainscore}个青豆`);
    }
    $.log(`\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n\n您共提供${lookArr.length}次看看赚任务\n`)
    if (lookArr.length !== 0) {
        for (let k = 0; k < lookArr.length; k++) {
            if (lookArr[k]) {
                lookbody = lookArr[k];
                $.index = k + 1;
                $.log(`-------------------------\n\n开始中青看点看看赚第${$.index}次任务`)
            }
            await lookStart();
        }
        console.log(`-------------------------\n\n中青看点共完成${$.index}次任务，共计获得${lookscore}个青豆，看看赚任务全部结束`);
        $.msg("中青看点看看赚", '共完成' + (lookArr.length + startArr.length) + '次任务，共计获得' + parseInt(lookscore + gainscore) + '个青豆');
    }
    if ($.isNode()) {
        //await notify.sendNotify($.name，`共完成${$.index}次任务，\n共计获得${gainscore}个青豆`
    }
})()
    .catch((e) => $.logErr(e))
    .finally(() => $.done())

function GainStart() {
    return new Promise((resolve, reject) => {
        $.post(gainHost('task/browse_start.json', gainbody), async(error, resp, data) => {
            let startres = JSON.parse(data);
            if (startres.success == false) {
                smbody = $.getdata('youth_start').replace(gainbody + "&", "");
                $.setdata(smbody, 'youth_start');
                $.log(startres.message + "已自动删除")
            } else {
                comstate = startres.items.comtele_state;
                if (comstate == 0) {
                    $.log("任务开始，" + startres.items.banner_id + startres.message);
                    await $.wait(10000);
                    await GainEnd()
                } else if (comstate == 1) {
                    $.log("任务:" + startres.items.banner_id + "已完成，本次跳过");
                }
            }
            resolve()
        })
    })
}

function lookStart() {
    return new Promise((resolve, reject) => {
        $.post(gainHost('Nameless/adlickstart.json', lookbody), async(error, resp, data) => {
            startlk = JSON.parse(data);
            if (startlk.success == false) {
                smbody = $.getdata('youth_look').replace(lookbody + "&", "");
                $.setdata(smbody, 'youth_look');
                $.log(startlk.message + "已自动删除")
            } else {
                comstate = startlk.items.comtele_state;
                if (comstate == 0) {
                    $.log("任务开始，" + startlk.items.banner_id + startlk.message);
                    for (let j = 0; j < startlk.items.see_num - startlk.items.read_num; j++) {
                        $.log("任务执行第" + parseInt(j + 1) + "次")
                        await $.wait(8000);
                        await lookstatus()
                    }
                    await $.wait(10000);
                    await lookEnd()
                } else if (comstate == 1) {
                    $.log("任务:" + startlk.items.banner_id + "已完成，本次跳过");
                }
            }
            resolve()
        })
    })
}

function GainEnd() {
    return new Promise((resolve, reject) => {
        $.post(gainHost('task/browse_end.json', gainbody), (error, resp, data) => {
            let endres = JSON.parse(data);
            if (endres.success == true) {
                $.log("任务" + endres.items.banner_id + endres.message + "，恭喜获得" + endres.items.score + "个青豆");
                gainscore += parseInt(endres.items.score)
            } else {
                $.log(endres.message)
            }
            resolve()
        })
    })
}

function lookstatus() {
    return new Promise((resolve, reject) => {
        $.post(gainHost('Nameless/bannerstatus.json', lookbody), (error, resp, data) => {
            let endres = JSON.parse(data);
            if (endres.success == true) {
                $.log("任务" + endres.items.banner_id + endres.message);
            } else {
                $.log(endres.message)
            }
            resolve()
        })
    })
}

function lookEnd() {
    return new Promise((resolve, reject) => {
        $.post(gainHost('Nameless/adlickend.json', lookbody), (error, resp, data) => {
            let endres = JSON.parse(data);
            if (endres.success == true) {
                $.log("任务" + endres.items.banner_id + endres.message + "，" + endres.items.desc)
                lookscore += parseInt(endres.items.score)
            } else {
                $.log(endres.message)
            }
            resolve()
        })
    })
}

function gainHost(api, body) {
    return {
        url: 'https://ios.baertt.com/v5/' + api,
        headers: {
            'User-Agent': 'KDApp/1.7.8 (iPhone; iOS 14.0; Scale/3.00)',
            'Host': 'ios.baertt.com',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: body
    }
}


function GetCookie() {
    if ($request && $request.method != 'OPTIONS' && $request.url.match(/\/browse_start\.json/)) {
        startbodyVal = $request.body;
        if (startbodys) {
            if (startbodys.indexOf(startbodyVal) > -1) {
                $.msg($.name, '阅读请求重复，本次跳过');
                return
            } else if (startbodys.indexOf(startbodyVal) == -1) {
                startbodys += "&" + startbodyVal
            }
        } else {
            startbodys = $request.body
        }
        $.setdata(startbodys, 'youth_start');
        $.log("获取浏览赚请求: " + startbodyVal);
        $.msg($.name, '获取浏览赚请求成功')
    } else if ($request && $request.method != 'OPTIONS' && $request.url.match(/\/adlickstart\.json/)) {
        seeVal = $request.body;
        if (lookbodys) {
            if (lookbodys.indexOf(seeVal) > -1) {
                $.msg($.name, '阅读请求重复，本次跳过');
                return
            } else if (lookbodys.indexOf(seeVal) == -1) {
                lookbodys += "&" + seeVal
                $.msg($.name, '获取看看赚请求' + lookbodys.split("&").length + '成功')
            }
        } else {
            lookbodys = $request.body
            $.msg($.name, '获取看看赚请求成功')
        }
        $.setdata(lookbodys, 'youth_look');
        $.log("获取浏览赚请求: " + seeVal)
    }
}

function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r)));let h=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];h.push(e),s&&h.push(s),i&&h.push(i),console.log(h.join("\n")),this.logs=this.logs.concat(h)}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
