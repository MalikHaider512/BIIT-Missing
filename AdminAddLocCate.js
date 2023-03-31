import React, {useState} from 'react';
import {ImageBackground, SafeAreaView, Text, View} from 'react-native';
import {TextInput, StyleSheet, TouchableOpacity, Modal} from 'react-native';
import {Picker} from '@react-native-picker/picker';

export default function AddLoc(props) {
  let [loc, setLoc] = useState();
  let [cate, setCate] = useState();

  async function saveCategory() {
    let response = await fetch(global.apiUrl + 'Category/saveCategory', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Cat_Id: null,
        Cat_Name: cate,
      }),
    });
    let json = await response.json();
    alert(JSON.stringify(json));
  }

  async function saveLocation() {
    let response = await fetch(global.apiUrl + 'Location/saveLocation', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Loc_d: null,
        Loc_Name: loc,
      }),
    });
    let json = await response.json();
    alert(JSON.stringify(json));
  }

  return (
    <SafeAreaView>
      <ImageBackground
        source={require('./Images/Hexagon.png')}
        resizeMode="cover"
        style={{height: '100%', width: 400}}>
        <Text style={styles.text}>Category</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Example Mobile"
          onChangeText={setCate}
        />

        <TouchableOpacity
          onPress={() => {
            console.log(cate);
            saveCategory();
          }}>
          <View style={styles.b2}>
            <Text style={styles.buttontext}>Add Category</Text>
          </View>
        </TouchableOpacity>

        <Text style={styles.text}>Location</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Example Library"
          onChangeText={setLoc}
        />

        <TouchableOpacity
          onPress={() => {
            console.log(loc);
            saveLocation();
          }}>
          <View style={styles.b2}>
            <Text style={styles.buttontext}>Add Location</Text>
          </View>
        </TouchableOpacity>

        <Text style={styles.text}>Attribute</Text>
        <TextInput
          style={styles.textInput}
          placeholder="To Add Attribute Press Button"
          editable={false}
        />

        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('AddAttribute');
          }}>
          <View style={styles.b2}>
            <Text style={styles.buttontext}>Add Attribute</Text>
          </View>
        </TouchableOpacity>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
    marginStart: 20,
    marginTop: 60,
  },
  textInput: {
    width: 360,
    height: 45,
    marginStart: 20,
    marginTop: 10,
    borderRadius: 20,
    borderColor: 'black',
    borderWidth: 3,
    fontSize: 20,
  },
  b2: {
    marginStart: 150,
    marginTop: 20,
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
