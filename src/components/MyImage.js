import React, {useState} from 'react';
import { Image } from 'react-native';


export default function MyImage(props) {
// console.log(props.source)
const [source, setSource] = useState( props.source && props.source.uri ? props.source : require("../assets/img/Loading_icon.gif") );

  return (
  	
        <Image
            {...props}
            style={props.style}  
            source={source}
            defaultSource={ require("../assets/img/Loading_icon.gif") }
            // resizeMode={'contain'}
            // onError={()=> {console.log("Error: ", noImage); setSource(noImage)}} 
        />
    
  );
}





