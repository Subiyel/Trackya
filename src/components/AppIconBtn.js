import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { variable } from "../util/Variables";

export default function AppIconBtn({ icon, text, onPress, type }) {
  return (
    <TouchableOpacity style={styles.wrapper} onPress={onPress}>
      <View style={styles.flexColumn}>
        <View style={styles.iconContainer}>
          {type != "feather" ? (
            <MaterialCommunityIcons name={icon} style={styles.icon} />
          ) : (
            <Icon name={icon} style={styles.icon} />
          )}
        </View>
        <View style={styles.txtContainer}>
          <Text style={styles.txt}>{text}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    margin: 10,
  },
  flexColumn: {
    flexDirection: "column",
  },
  iconContainer: {
    backgroundColor: variable.primary,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: variable.secondary,
    shadowColor: variable.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  icon: {
    fontSize: 35,
    color: variable.white,
  },
  txtContainer: {
    backgroundColor: variable.secondary,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: variable.secondary,
    shadowColor: variable.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  txt: {
    fontWeight: "500",
    fontSize: Platform.OS === "ios" ? 11 : 12,
    color: variable.white,
  },
});