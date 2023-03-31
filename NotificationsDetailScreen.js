import React, {useState} from 'react';
import {
  SafeAreaView,
  FlatList,
  View,
  ImageBackground,
  Image,
} from 'react-native';
import {TouchableOpacity, Button, Text, StyleSheet} from 'react-native';

export default function NotificationDetail() {
  let [arr, setArr] = useState([
    'Dear user your Laptop is found, visit Admin',
    'Dear user your Mobile is found, visit Admin',
  ]);
  return (
    <SafeAreaView>
      <ImageBackground
        source={require('./Images/Hexagon.png')}
        resizeMode="cover"
        style={{height: '100%', width: 400}}>
        <View style={{marginTop: 30}}>
          <Text style={styles.texth}> Notification</Text>
          <View style={styles.view}>
            <Text style={styles.text}>Category: Laptop</Text>
            <Text style={styles.text}>Company : Dell</Text>
            <Text style={styles.text}>Location : Lab 07</Text>
            <Text style={styles.text}>Color : black</Text>
            <Text style={styles.text}>Price : 50000</Text>
            <Text style={styles.text}>Date : 20/11/2022</Text>
            <Text style={styles.text}>Discription :Core i5 6 Generetion </Text>
            <View
              style={{
                width: 400,
                height: 150,
                flexDirection: 'row',
              }}>
              <Text style={styles.text}>Image:</Text>
              <Image
                style={{
                  height: 100,
                  width: 100,
                  marginStart: 70,
                }}
                source={{
                  uri: `http://192.168.0.108/ProjectSec/Images/Laptop.jpg`,
                }}
              />
            </View>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  view: {
    height: 300,
    width: 350,
    borderColor: 'black',
    marginTop: 10,
    borderWidth: 2,
    margin: 2,
    marginStart: 20,
    borderRadius: 20,
    borderWidth: 2,
    margin: 0.4,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingLeft: 5,
  },
  text: {
    marginStart: 10,
    fontSize: 20,
    color: 'black',
  },
  texth: {
    marginStart: 10,
    fontSize: 20,
    color: 'black',
    marginTop: 20,
    fontWeight: 'bold',
    fontSize: 20,
  },
  b1: {
    marginStart: 45,
    marginTop: 580,
    width: 300,
    height: 40,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'black',
  },
  b2: {
    marginStart: 200,
    width: 120,
    height: 30,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'black',
  },

  buttontext: {
    flex: 3,
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
});
