export const getSetting = ()=>{
return new Promise((resolve,reject)=>{
    wx.getSetting({
      success: (result) => {
          resolve(result)
      },
      fail: (err) => {
        reject(err)
      },
      complete: (res) => {},
    })
})
}
// promise 形式 chooseAddress 
export const chooseAddress = ()=>{
    return new Promise((resolve,reject)=>{
        wx.chooseAddress({
          success: (result) => {
              resolve(result)
          },
          fail: (err) => {
            reject(err)
          },
          complete: (res) => {},
        })
    })
    
    }
    // promise 形式 openSetting 
export const openSetting = ()=>{
    return new Promise((resolve,reject)=>{
        wx.openSetting({
          success: (result) => {
              resolve(result)
          },
          fail: (err) => {
            reject(err)
          },
          complete: (res) => {},
        })
    })
    
    }

        // promise 形式 showModal 
        // @param {object} param0参数
export const showModal = ({content})=>{
  return new Promise((resolve,reject)=>{
    wx.showModal({
      content: content,
      title: '提示',
      success: (result) => {
        resolve(result);
      },
      fail:(err)=>{
        reject(err)
      }
    })
  })
  
  }
  

          // promise 形式 showToast 
        // @param {object} param0参数
export const showToast = ({title})=>{
  return new Promise((resolve,reject)=>{
    wx.showToast({
      icon: "node",
      title: title,
      success: (result) => {
        resolve(result);
      },
      fail:(err)=>{
        reject(err)
      }
    })
  })
  
  }