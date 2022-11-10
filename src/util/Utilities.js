


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


export const u = {
    Log,
    LogSuccess,
    LogErr,
    isNullorEmpty,
}