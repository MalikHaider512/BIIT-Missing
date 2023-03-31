import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  View,
  ImageBackground,
} from 'react-native';

export default function UserBidding(props) {
  const [bprice, setBPrice] = useState();
  const [mbid, setMBid] = useState();
  let b = 0;

  async function saveBid(i, u, p) {
    let response = await fetch(
      global.apiUrl + 'Bidding/saveBid?id=' + i + '&un=' + u + '&amt=' + p,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
    let json = await response.json();
    console.log(JSON.stringify(json));
  }

  async function getHighBid(i) {
    let response = await fetch(global.apiUrl + 'bidding/getHighestBig?id=' + i);
    let json = await response.json();
    setMBid(json);
    console.log(json);
  }

  useEffect(() => {
    console.log('Id' + props.route.params.i);
    console.log(props.route.params.n);
    console.log(props.route.params.p);
    getHighBid(props.route.params.i);
  }, []);
  return (
    <SafeAreaView>
      <ImageBackground
        source={require('./Images/Hexagon.png')}
        resizeMode="cover"
        style={{height: '100%', width: 400}}>
        <View style={{marginTop: 40}}>
          <Text style={styles.text1}>Item Name</Text>
          <TextInput
            style={styles.textInput1}
            placeholder={props.route.params.n}
            editable={false}
          />
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <Text style={styles.text2}> Base Price</Text>
            <TextInput
              style={styles.textInput2}
              placeholder={props.route.params.p}
              editable={false}
            />
          </View>
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <Text style={styles.text2}> Highest Bid</Text>
            <TextInput
              style={styles.textInput2}
              placeholder={mbid}
              editable={false}
              //defaultValue={mbid}
            />
          </View>
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <Text style={styles.text2}> Bid Price</Text>
            <TextInput
              style={styles.textInput2}
              placeholder="12500"
              onChangeText={setBPrice}
            />
          </View>
          <View style={{flexDirection: 'row', marginStart: 100}}>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('Items For Bidding');
              }}>
              <View style={styles.b2}>
                <Text style={styles.buttontext}>Back</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                saveBid(props.route.params.i, global.user, bprice);
                props.navigation.navigate('Items For Bidding');
              }}>
              <View style={styles.b2}>
                <Text style={styles.buttontext}>Bid</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  text1: {
    heigth: 40,
    width: 250,
    marginTop: 30,
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
    marginStart: 20,
  },
  text2: {
    flex: 1,
    marginTop: 10,
    fontWeight: 'bold',
    color: 'black',
    fontSize: 20,
    marginStart: 20,
  },
  textInput1: {
    width: 360,
    height: 45,
    marginStart: 20,
    borderRadius: 20,
    borderColor: 'black',
    borderWidth: 3,
    fontSize: 20,
  },
  textInput2: {
    flex: 1.5,
    height: 45,
    marginEnd: 10,
    borderColor: 'black',
    borderWidth: 3,
    borderRadius: 20,
    fontSize: 20,
  },
  b2: {
    marginStart: 10,
    marginTop: 60,
    width: 120,
    height: 40,
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
    marginTop: 5,
  },
});
