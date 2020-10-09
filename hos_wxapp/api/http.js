// http请求封装
import Promise from '../utils/bluebird.min.js';
import {getId} from './api.js';
// import getlocalStore from '../utils/getlocalStore.js'
const app = getApp();
let userid='';

// 小程序原生支持promise
const $http = {
  post: function (url, params, method) {
    userid = wx.getStorageSync('userid');  
    console.log(this)
    let that = this;
    // let header = {
    //   "userid": 1,
    // }
    let promise = new Promise(function (resolve, reject) {
      wx.request({
        url: url,
        data: { ...params, sessionId:userid},
        // header: header,
        method: 'POST',
        success: function (res) {
          if (res.data.code == '401' || res.data.code == '402') {
            login().then(resp => {
              if (resp) {
                $http.get(url, params).then(resp1 => {
                  resolve(resp1);
                })
              }
            })
          } else {
            resolve(res);
          }
        },
        fail: function (err) {
          resolve({ data: { code: 10000, desc:"信息获取失败"}});
        }
      })
    })
    return promise;
  },
  get: function (url, params, method) {
    userid = wx.getStorageSync('userid');  
    let that = this;
    // let header = {
    //   "userid": userid,
    // }
    let promise = new Promise(function (resolve, reject) {
      wx.request({
        url: url,
        data: { ...params, sessionId: userid },
        method: 'GET',
        success: function (res) {
          if (res.data.code == '401' || res.data.code == '402'){
            login().then(resp=>{
              if(resp) {
                 $http.get(url, params).then(resp1=>{
                   resolve(resp1);
                 })
              }
            })
          } else {
            resolve(res);
          }
        },
        fail: function (err) {
          resolve({ data: { code: 10000, desc: "信息获取失败" } });
        }
      })
    })
    return promise;
  },
  formData: function (url, params, method) {
    userid = wx.getStorageSync('userid');  
    let that = this;
    let header = {
      "Content-Type": "application/x-www-form-urlencoded",
      // "cookie": userid,
    }
    let promise = new Promise(function (resolve, reject) {
      wx.request({
        url: url,
        data: { ...params, sessionId:userid},
        header: header,
        method: 'POST',
        success: function (res) {
          if (res.data.code == '401' || res.data.code == '402') {
            login().then(resp => {
              if (resp) {
                $http.get(url, params).then(resp1 => {
                  resolve(resp1);
                })
              }
            })
          } else {
            resolve(res);
          }
        },
        fail: function (err) {
          resolve({ data: { code: 10000, desc: "信息获取失败" } });
        }
      })
    })
    return promise;
  },
  put: function (url, params, method) {
    userid = wx.getStorageSync('userid');  
    let that = this;
    // let header = {
    //   // "Content-Type": "application/xml",
    //   "cookie": userid,
    // }
    let promise = new Promise(function (resolve, reject) {
      wx.request({
        url: url,
        data: { ...params, sessionId: userid },
        // header: header,
        method: 'PUT',
        success: function (res) {
          if (res.data.code == '401' || res.data.code == '402') {
            login().then(resp => {
              if (resp) {
                $http.get(url, params).then(resp1 => {
                  resolve(resp1);
                })
              }
            })
          } else {
            resolve(res);
          }
        },
        fail: function (err) {
          resolve({ data: { code: 10000, desc: "信息获取失败" } });
        }
      })
    })
    return promise;
  },
  delete: function (url, params, method) {
    userid = wx.getStorageSync('userid');  
    let that = this;
    let header = {
      "Content-Type": "application/xml",
      "userid": userid,
    }
    let promise = new Promise(function (resolve, reject) {
      wx.request({
        url: url,
        data: params,
        header: header,
        method: 'DELETE',
        success: function (res) {
          if (res.data.code == '401' || res.data.code == '402') {
            login().then(resp => {
              if (resp) {
                $http.get(url, params).then(resp1 => {
                  resolve(resp1);
                })
              }
            })
          } else {
            resolve(res);
          }
        },
        fail: function (err) {
          resolve({ data: { code: 10000, desc: "信息获取失败" } });
        }
      })
    })
    return promise;
  }
}
export default $http;

//登陆失效后重新执行重新拉取登陆，返回true时登陆成功，再去获取此前的接口，进行返回开发人员
function login() {
  let promise = new Promise(function (resolve, reject){
    wx.setStorageSync('userid', '');
    wx.showLoading({
      title: '获取用户信息中',
    });
    wx.login({
      success: resp => {
        if (resp.code) {
          getId(resp.code).then((resp) => {
            wx.setStorageSync('userid', resp.data.sessionId);
            wx.hideLoading();
            if(resp.data.isBind == 0){
              wx.redirectTo({
                url: '/pages/login_page/login_page',
              })
            } else{
              resolve(true);
            }
            
          });
        }  else {
          reject(false);
        }
      }
    })
  });

  return promise;

}