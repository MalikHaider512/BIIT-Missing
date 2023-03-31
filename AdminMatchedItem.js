import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

export default function MatchedItem() {
  return (
    <SafeAreaView>
      <ImageBackground
        source={require('./Images/Hexagon.png')}
        resizeMode="cover"
        style={{height: '100%', width: 400}}>
        <View style={{marginTop: 40}}>
          <Text style={styles.text}> Total: 1</Text>
          <View style={styles.view}>
            <Text style={styles.text}>Category: Laptop</Text>
            <Text style={styles.text}>Company : Dell</Text>

            <View
              style={{
                width: 400,
                height: 120,
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
                  uri: 'http://192.168.0.104/Missing_Items/Images/rn_image_picker_lib_temp_7299cda0-e9e9-4241-82ea-a7b6dd76c29a.jpg',
                }}
              />
            </View>

            <TouchableOpacity>
              <View style={styles.b2}>
                <Text style={styles.buttontext}>Verify</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  view: {
    height: 230,
    width: 350,
    borderColor: 'black',
    marginTop: 10,
    borderWidth: 2,
    margin: 2,
    marginStart: 20,
    borderRadius: 20,
    // backgroundColor: 'grey',
  },
  text: {
    marginStart: 10,
    fontSize: 20,
    color: 'black',
  },
  b2: {
    marginStart: 20,
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
