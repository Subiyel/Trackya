import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics'


const Log = (e) => {
    console.log(e)
}

const LogSuccess = (e) => {
    console.log(`%c`+ e, '🐦;color: #14c20e;');
}

const LogErr = (e) => {
    console.log(`%c`+ e, '🐦;color: #f66; ');
    // console.log(`%c`+ e, '🐦;background: #f66; color: #000; padding: 3px; border-radius: 5px;');
}


const isNullorEmpty = (value) => {
    if (value == null || value == ""){
        return true
    } else {
        return false
    }
 }

 export const validateEmail = (text) => {
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  console.log(text, " - ", reg.test(text))
  return reg.test(text)
}


 const checkDeviceBiometrics = () => {
    const myPromise = new Promise((resolve, reject) => {
      const rnBiometrics = new ReactNativeBiometrics()
      let isSupported = false
      let type = ""
      rnBiometrics.isSensorAvailable()
        .then((resultObject) => {
          const { available, biometryType } = resultObject

          if (available && biometryType === BiometryTypes.TouchID) {
            console.log('TouchID is supported')
            isSupported = true
            type = "Biometric"
          } else if (available && biometryType === BiometryTypes.FaceID) {
            console.log('FaceID is supported')
            isSupported = true
            type = "FaceID"
          } else if (available && biometryType === BiometryTypes.Biometrics) {
            console.log('Biometrics is supported')
            isSupported = true
            type = "Biometric"
          } else {
            console.log('Biometrics not supported')
          }
          resolve({ isSupported, type })
        })
    })
      return myPromise
 }


 const getDevicePublicKey = () => {
  const myPromise = new Promise((resolve, reject) => {
    const rnBiometrics = new ReactNativeBiometrics()
    rnBiometrics.createKeys()
      .then((resultObject) => {
        const { publicKey } = resultObject
        console.log(publicKey)
        resolve( publicKey )
      })
    })
    return myPromise
 }


 const triggerBiometric = async () => {
    const myPromise = new Promise((resolve, reject) => {
      
      const rnBiometrics = new ReactNativeBiometrics()
      rnBiometrics.simplePrompt({promptMessage: 'Biometric Login'})
      .then((resultObject) => {
        const { success } = resultObject
        console.log("res: ", resultObject)
        if (success) {
          console.log('successful biometrics provided')
          resolve('success')
        } else {
          console.log('user cancelled biometric prompt')
          reject('failed')
        }
      })
      .catch(() => {
        reject('failed')
      })


  });
  return myPromise
 }


export const u = {
    Log,
    LogSuccess,
    LogErr,
    isNullorEmpty,
    checkDeviceBiometrics,
    getDevicePublicKey,
    triggerBiometric,
    validateEmail
}