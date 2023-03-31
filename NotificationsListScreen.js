import React, {useState} from 'react';
import {SafeAreaView, FlatList, View, ImageBackground} from 'react-native';
import {TouchableOpacity, Button, Text, StyleSheet} from 'react-native';

export default function NotificationList(props) {
  let [arr, setArr] = useState([
    'Found an item similar to your item.Please visit Admin to verify ',
    'Found an item similar to your item.Please visit Admin to verify ',
  ]);
  return (
    <SafeAreaView>
      <ImageBackground
        source={require('./Images/Hexagon.png')}
        resizeMode="cover"
        style={{height: '100%', width: 400}}>
        <View style={{marginTop: 30}}>
          <Text style={styles.texth}> Notifications</Text>
          <FlatList
            data={arr}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity>
                  <View style={styles.view}>
                    <Text style={styles.text}>{item}</Text>
                  </View>
                </TouchableOpacity>
              );
            }}
            keyExtractor={(d, index) => index.toString()}
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  view: {
    height: 60,
    width: '98%',
    borderColor: 'black',
    marginTop: 5,
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
