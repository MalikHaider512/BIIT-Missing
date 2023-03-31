import React, {useState, useEffect} from 'react';
import {
  ImageBackground,
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Button,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';

export default function AddAttribute(props) {
  const [loadingc, setLoadingc] = useState(true);
  const [catlst, setCatlst] = useState();
  const [cat, setCat] = useState('Laptop');
  const [att, setAtt] = useState();

  async function getCategories() {
    let response = await fetch(global.apiUrl + 'Category/getCategory');
    let json = await response.json();

    console.log(global.admin);
    console.log(JSON.stringify(json));
    setCatlst(json);
    console.log(catlst);
    setLoadingc(false);
  }

  async function saveAttribute() {
    let response = await fetch(
      global.apiUrl + 'Attribute/saveAttribute?a=' + att + '&c=' + cat,
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
    getCategories();
  }, []);
  return (
    <SafeAreaView>
      <ImageBackground
        source={require('./Images/Hexagon.png')}
        resizeMode="cover"
        style={{height: '100%', width: 400}}>
        {loadingc ? (
          <View style={styles.indicator}>
            <ImageBackground
              source={require('./Images/Hexagon.png')}
              //resizeMode="cover"
              style={{height: '100%', width: 400}}>
              <ActivityIndicator
                size="large"
                color="#2ed573"
                style={{marginTop: 350}}
              />
            </ImageBackground>
          </View>
        ) : (
          <View style={{marginTop: 45}}>
            <Text style={styles.text}> Category</Text>
            <View style={styles.picker}>
              <Picker
                style={{}}
                selectedValue={cat}
                onValueChange={(itemvalue, itemindex) => {
                  setCat(itemvalue);
                }}>
                {catlst.map(c => (
                  <Picker.Item label={c.Cat_Name} value={c.Cat_Name} />
                ))}
              </Picker>
            </View>
            <TextInput
              style={styles.textInput}
              placeholder="Color"
              onChangeText={setAtt}
            />
            <TouchableOpacity
              onPress={() => {
                console.log(catlst);
                console.log(cat);
                console.log(att);
                saveAttribute();
                props.navigation.navigate('Add Location And Category');
              }}>
              <View style={styles.b2}>
                <Text style={styles.buttontext}>Add Attribute</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  textInput: {
    height: 45,
    width: 350,
    margin: 10,
    fontSize: 18,
    borderColor: 'black',
    borderWidth: 3,
    marginStart: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingLeft: 5,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 20,
    color: 'black',
  },
  textVal: {
    //fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 20,
    color: 'black',
    height: 45,
    width: 350,
    margin: 10,
    //fontSize: 18,
    borderColor: 'black',
    borderWidth: 3,
    marginStart: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    padding: 5,
  },
  picker: {
    height: 50,
    width: '80%',
    // color: '#344953',
    // justifyContent: 'center',
    // backgroundColor:"Black",
    placeholderTextColor: '#fff',
  },
  button: {
    width: 200,
    height: 40,
    marginTop: 20,
    marginStart: 80,
  },
  buttond: {
    width: 150,
    height: 40,
    marginStart: 10,
    flex: 2,
  },
  b1: {
    marginEnd: 10,
    width: 200,
    height: 40,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'black',
    flexDirection: 'row',
  },
  b2: {
    marginStart: 45,
    marginTop: 10,
    width: 300,
    height: 40,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'black',
  },
  b3: {
    marginStart: 20,
    marginTop: 30,
    width: 90,
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
  indicator: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  picker: {
    height: 45,
    width: 350,
    margin: 10,
    fontSize: 18,
    borderColor: 'black',
    borderWidth: 3,
    marginStart: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingLeft: 5,
    justifyContent: 'center',
  },
  description: {
    height: 70,
    width: 350,
    margin: 10,
    fontSize: 18,
    borderColor: 'black',
    borderWidth: 3,
    marginStart: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingLeft: 5,
  },
  descpLengthView: {
    marginStart: 20,
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  radioView: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4,
    marginTop: 2,
  },
  radioViewText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
