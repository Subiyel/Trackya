import axios from "axios";



const ApiFormData = async (url, param, type, token) => {
    

  try {
      let request = {
        method: type,
        url: url,
        headers: {
          Accept: 'application/json',
        //   'Content-Type': 'multipart/form-data'
        }
      }
      if (type != "GET"){
        request.data = param
      }
      console.log( request )
      const response = await axios(request);
      console.log(response)
      return response.data;

    

    } catch (error) {
      console.log("Error: ",error);
    } 
  }


export default ApiFormData;