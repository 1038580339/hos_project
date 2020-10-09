import { host } from './config.js';
import $http from './http.js'


export const getId = (code) => $http.get(`${host}/wx/wechatminiprogram/getId`, {
  code: code,
  userType:2,
  appCode: "match"  
});


export const login = (username, password) => $http.formData(`${host}/a/login`, {
  username: username,
  password: password,
  token: 'clav',
  userType: 2,
  mobileLogin: true
});
export const getActivityList = (data) => $http.get(`${host}/wx/match/activity/findActivityPage`, data);//查询活动
export const getActivityDetails = (data) => $http.get(`${host}/wx/match/activity/getActivity`, data);//查看活动
export const jionActivity = (data) => $http.get(`${host}/wx/match/activity/jionActivity`, data);//加入活动
export const getOfficeRecordInfo = (data) => $http.get(`${host}/wx/match/activity/getOfficeRecordInfo`, data);//组织详情
export const unBind = data => $http.get(`${host}/wx/wechatminiprogram/unbind`, {
  token: 'clav',
  userType: 2,
  mobileLogin: true
})
export const findVolunteerMatchRecord = (data) => $http.get(`${host}/wx/match/record/findMatchRecord`, data);//获取参与结对子活动记录列表

export const getInfo = (data) => $http.get(`${host}/wx/minipgpersonal/getInfo`, data);//个人信息面板获取
export const updateInfo = (data) => $http.formData(`${host}/wx/minipgpersonal/updateInfo`, data);//个人信息面板上传
export const findWaitMatch = (data) => $http.get(`${host}/wx/match/activity/findWaitMatch`, data);//提交组织信息
export const chooseOffice = (data) => $http.get(`${host}/wx/match/record/chooseOffice`, data);//志愿者选择组织
export const getMatchResult = (data) => $http.get(`${host}/wx/match/record/getMatchResult`, data);//查询匹配活动结果
export const getVolunteer = (data) => $http.get(`${host}/wx/match/activity/getVolunteer`, data);//查询志愿者信息
export const getRecordCount = (data) => $http.get(`${host}/wx/match/record/getRecordCount`, data);//获取我的页面记录数量
export const getOfficeRecordInfoByResultId = (data) => $http.get(`${host}/wx/match/activity/getOfficeRecordInfoByResultId`, data);//获取我的页面记录数量

export const forgetPassword = (data) => $http.formData(`${host}/wx/post/forget/password`, data);//忘记密码
export const smsMessageSend = (data) => $http.get(`${host}/forgetPassword/smsMessage/send`, data);//忘记密码发送验证码
export const postsigin = (data) => $http.formData(`${host}/wx/postsigin`, data);//注册
export const regSmsMessageSend = (data) => $http.get(`${host}/register/smsMessage/send`, data);//注册
export const checkCertificatesNumber = (data) => $http.get(`${host}/wx/wechatminiprogram/checkCertificatesNumber`, data);//检查身份证
export const checkTelephone = (data) => $http.get(`${host}/wx/wechatminiprogram/checkTelephone`, data);//检查手机号