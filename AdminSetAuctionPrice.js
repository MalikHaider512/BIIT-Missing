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

export default function SetPrice(props) {
  const [itm, setItm] = useState({});
  const [price, setPrice] = useState('Not Added');
  const [auc, setAuc] = useState();
  const [loading, setLoading] = useState(true);
  const [aprice, setAPrice] = useState();

  async function getItemPrice() {
    let response = await fetch(
      global.apiUrl + 'item/getItemPrice?i=' + props.route.params.id,
    );
    let json = await response.json();
    setAuc(json);
    setLoading(false);
    console.log(JSON.stringify(json));
  }

  async function setAuction(i, p) {
    let response = await fetch(
      global.apiUrl + 'Auction/setAuction?id=' + i + '&p=' + p,
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

  useEffect(() => {
    console.log(props.route.params.id);
    console.log(props.route.params.nam);

    getItemPrice();
  }, []);
  return (
    <SafeAreaView>
      <ImageBackground
        source={require('./Images/Hexagon.png')}
        resizeMode="cover"
        style={{height: '100%', width: 400}}>
        <View style={{marginTop: 30}}>
          <Text style={styles.text1}>Item Name</Text>
          <TextInput
            style={styles.textInput1}
            placeholder={props.route.params.nam}
            editable={false}
          />
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <Text style={styles.text2}> Actual Price</Text>
            <TextInput
              style={styles.textInput2}
              placeholder={price}
              editable={false}
            />
          </View>
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <Text style={styles.text2}> Auction Price</Text>
            <TextInput
              style={styles.textInput2}
              placeholder="20000"
              onChangeText={setAPrice}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              console.log(props.route.params.nam);
              console.log(aprice);
              setAuction(props.route.params.id, aprice);
              props.navigation.navigate('Expired Items');
            }}>
            <View style={styles.b2}>
              <Text style={styles.buttontext}>Submit</Text>
            </View>
          </TouchableOpacity>
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
    marginStart: 150,
    marginTop: 60,
    width: 200,
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
