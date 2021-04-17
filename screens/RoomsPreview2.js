import React, { Component, useState} from 'react';
import { StyleSheet, View, ScrollView, Image, Text } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import Card from '../shared/card';

import globalStyles from '../styles/global';




export default function RoomsPreview () {
  
  

	return (
    
		<View style={styles.container}>
      <View style={styles.scrollArea}>
      </View>
      <View style={styles.rect3Stack}>
        <View style={styles.rect3}>
          <View style={styles.image6Row}>
            <Image
              source={require("../assets/120695398.jpg")}
              resizeMode="contain"
              style={styles.image6}
            ></Image>
            <View style={styles.room1Column}>
              <Text style={styles.room1}>Room 1</Text>
              <View style={styles.image4Row}>
                <Image
                  source={require("../assets/acomodacion-16.png")}
                  resizeMode="contain"
                  style={styles.image4}
                ></Image>
                <View style={styles.shareAcomodationStack}>
                  <Text style={styles.shareAcomodation}>Share Acomodation</Text>
                  <Image
                    source={require("../assets/food-16.png")}
                    resizeMode="contain"
                    style={styles.image2}
                  ></Image>
                </View>
                <Text style={styles.yes}>Yes</Text>
              </View>
              <View style={styles.image5Row}>
                <Image
                  source={require("../assets/cama-16.png")}
                  resizeMode="contain"
                  style={styles.image5}
                ></Image>
                <View style={styles.twinStack}>
                  <Text style={styles.twin}>Twin</Text>
                  <Image
                    source={require("../assets/disponibilidad-16.png")}
                    resizeMode="contain"
                    style={styles.image3}
                  ></Image>
                </View>
              </View>
            </View>
          </View>
        </View>
        <Text style={styles.avalible}>Avalible</Text>
      </View>
    </View>

	);
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "rgba(243,248,252,1)"
    },
    scrollArea: {
      flex: 1,
      backgroundColor: "rgba(248, 248, 248,1)",
      alignSelf: "center"
    },
    scrollArea_contentContainerStyle: {
      height: 406,
      padding: 0
    },
    rect2: {
      flex: 1,
      backgroundColor: "rgba(215, 215, 215,1)"
    },
    rect3: {
      top: 0,
      left: 0,
      width: 361,
      height: 111,
      position: "absolute",
      backgroundColor: "rgba(255,255,255,1)",
      borderWidth: 0,
      borderColor: "#000000",
      borderStyle: "solid",
      borderRadius: 20
    },
    image6: {
      width: 129,
      height: 109
    },
    room1: {
      color: "#121212",
      height: 20,
      width: 156,
      textAlign: "center",
      marginLeft: 16
    },
    image4: {
      width: 28,
      height: 23
    },
    shareAcomodation: {
      top: 0,
      left: 0,
      position: "absolute",
      color: "#121212",
      height: 22,
      width: 114,
      fontSize: 12
    },
    image2: {
      top: 0,
      left: 113,
      width: 27,
      height: 19,
      position: "absolute"
    },
    shareAcomodationStack: {
      width: 140,
      height: 22,
      marginTop: 4
    },
    yes: {
      color: "#121212",
      height: 22,
      width: 32,
      fontSize: 12,
      marginLeft: 1,
      marginTop: 3
    },
    image4Row: {
      height: 26,
      flexDirection: "row",
      marginTop: 14
    },
    image5: {
      width: 28,
      height: 21,
      marginTop: 2
    },
    twin: {
      top: 4,
      left: 0,
      position: "absolute",
      color: "#121212",
      height: 25,
      width: 127,
      fontSize: 12
    },
    image3: {
      top: 0,
      left: 112,
      width: 29,
      height: 22,
      position: "absolute"
    },
    twinStack: {
      width: 141,
      height: 29
    },
    image5Row: {
      height: 29,
      flexDirection: "row",
      marginTop: 13,
      marginRight: 33
    },
    room1Column: {
      width: 202,
      marginLeft: 12,
      marginTop: 7
    },
    image6Row: {
      height: 109,
      flexDirection: "row",
      marginLeft: 4,
      marginRight: 14
    },
    avalible: {
      top: 84,
      left: 314,
      position: "absolute",
      color: "#121212",
      height: 25,
      width: 49,
      fontSize: 12
    },
    rect3Stack: {
      top: 55,
      left: 7,
      width: 363,
      height: 111,
      position: "absolute"
    }
});