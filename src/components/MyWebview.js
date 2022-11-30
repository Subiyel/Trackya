import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';


export default function  MyWebview(props) {
    return <WebView source={ props.content } />;
  
}