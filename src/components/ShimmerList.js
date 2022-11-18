import React from 'react';
import {  StyleSheet, View,} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)

 const ShimmerList = (props) => {

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginLeft: 10, marginTop: 30 }}>

        <ShimmerPlaceHolder style={styles.shimmer3} autoRun  height={70} />

        <View style={{ marginLeft: 20 }}>
        <ShimmerPlaceHolder style={styles.shimmer1} autoRun  height={20} />

        <ShimmerPlaceHolder style={styles.shimmer2} autoRun  height={20} />
        <ShimmerPlaceHolder style={styles.shimmer2} autoRun  height={20} />
        </View>
    </View>
  );
  }


  const styles = StyleSheet.create({
    shimmer1: {
        width: '40%',
        marginTop: 8,
        borderRadius: 1
      },
      shimmer2: {
        width: '100%',
        marginTop: 8,
        borderRadius: 1
      },
      shimmer3: {
        width: 70,
        marginTop: 8,
        borderRadius: 5
      },
  });


  export default ShimmerList;

