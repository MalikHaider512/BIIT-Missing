import React from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Button,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import {TouchableOpacity, ScrollView} from 'react-native';
import {RadioButton, TextInput} from 'react-native-paper';
import {useState} from 'react';
import RadioButtonRN from 'radio-buttons-react-native';

export default function Signup(props) {
  const [password, setPassword] = useState(true);
  const [conpassword, setConPassword] = useState(true);
  const [fname, setFname] = useState();
  const [lname, setLname] = useState();
  const [usname, setUsname] = useState();
  const [pnum, setPnum] = useState();
  const [pass, setPass] = useState();
  const [conpass, setConpass] = useState();
  const [gender, setGender] = useState();
  const [passLength, setPassLength] = useState(0);

  async function saveUser() {
    let response = await fetch(global.apiUrl + 'User/saveUsers', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Usr_id: null,
        First_Name: fname,
        Last_Name: lname,
        Phone_No: pnum,
        Usr_Name: usname,
        Password: pass,
        Gender: gender,
        Category: 'User',
      }),
    });
    let json = await response.json();
    alert(JSON.stringify(json));
    props.navigation.navigate('LogIn');
  }

  return (
    <SafeAreaView style={{backgroundColor: 'white'}}>
      <ImageBackground
        source={require('./Images/Hexagon.png')}
        //resizeMode="cover"
        style={{height: '100%', width: 400}}>
        <View style={{marginTop: 40}}>
          <ScrollView>
            <Text style={styles.text}> First Name</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={setFname}
              autoCapitalize="words"
            />

            <Text style={styles.text}> Last Name</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={setLname}
              autoCapitalize="words"
            />

            <Text style={styles.text}>Username</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={text => {
                text.toString();
                setUsname(text);
              }}
            />

            <Text style={styles.text}> Phone Number</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={setPnum}
              keyboardType="phone-pad"
            />

            <Text style={styles.text}> Password</Text>
            <TextInput
              style={styles.textInput}
              secureTextEntry={password}
              right={
                <TextInput.Icon
                  name={password ? 'eye' : 'eye-off'}
                  onPress={() => setPassword(!password)}
                />
              }
              onChangeText={text => {
                setPass(text);
                setPassLength(text.length);
              }}
            />

            <View style={styles.passLengthView}>
              <Text style={{fontWeight: 'bold', color: 'black'}}>
                {' '}
                Length:{passLength}
              </Text>
              {passLength === 0 ? (
                <Text></Text>
              ) : passLength < 6 ? (
                <Text style={{marginTop: 10, color: 'red', fontWeight: 'bold'}}>
                  {' '}
                  Weak
                </Text>
              ) : passLength < 12 ? (
                <Text
                  style={{marginTop: 10, color: 'orange', fontWeight: 'bold'}}>
                  Good
                </Text>
              ) : (
                <Text
                  style={{marginTop: 10, color: 'green', fontWeight: 'bold'}}>
                  Strong
                </Text>
              )}
            </View>

            <Text style={styles.text}> Confirm Password</Text>
            <TextInput
              style={styles.textInput}
              secureTextEntry={conpassword}
              right={
                <TextInput.Icon
                  name={conpassword ? 'eye' : 'eye-off'}
                  onPress={() => setConPassword(!conpassword)}
                />
              }
              onChangeText={setConpass}
            />
            <View style={styles.passLengthView}>
              {pass === conpass ? (
                <Text></Text>
              ) : (
                <Text style={{marginTop: 10, color: 'red', fontWeight: 'bold'}}>
                  Password Not Match
                </Text>
              )}
            </View>

            <View style={{flexDirection: 'row'}}>
              <Text style={styles.text}>Gender</Text>
              <View
                style={{
                  //spadding: 20,
                  flex: 2,
                  //flexDirection: 'row',
                  //justifyContent: 'space-between',
                }}>
                <RadioButton.Group
                  // style={{
                  //   flexDirection: 'row',
                  //   justifyContent: 'space-between',
                  // }}
                  onValueChange={newValue => setGender(newValue)}
                  value={gender}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <RadioButton value="Male" style={{flex: 1}} />

                    <Text style={styles.text}>Male</Text>
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <RadioButton value="Female" />
                    <Text style={styles.text}>Female</Text>
                  </View>
                </RadioButton.Group>
              </View>
            </View>

            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity onPress={saveUser}>
                <View style={styles.b1}>
                  <Text style={styles.buttontext}>Sign Up</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate('LogIn');
                }}>
                <View style={styles.b2}>
                  <Text style={styles.buttontext}>Already have an Account</Text>
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  textInput: {
    height: 45,
    margin: 10,
    borderColor: 'black',
    borderWidth: 3,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingLeft: 5,
    color: 'black',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 15,
    color: 'black',
    flex: 1,
  },
  textt: {
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 15,
    marginTop: 40,
  },
  b1: {
    marginStart: 10,
    // marginTop:30,
    width: 100,
    height: 40,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'black',
    flex: 1,
  },
  b2: {
    marginStart: 10,
    // marginTop:30,
    width: 250,
    height: 40,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'black',
    flex: 1,
  },
  buttontext: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 5,
  },
  passLengthView: {
    marginStart: 20,
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
