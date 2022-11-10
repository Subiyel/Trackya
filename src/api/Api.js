import axios from "axios";



const Api = async (url, param, type) => {
    

  try {
      let request = {
        method: type,
        url: url,
        data: param,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }
      console.log(type + " " + url, " - ", param)
      const response = await axios(request);
      console.log(response)
      return response.data;
    } catch (error) {
      console.log("Error: ",error);
    } 
  }


export default Api;