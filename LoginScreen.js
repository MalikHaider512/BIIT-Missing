import React, {useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Image,
  Alert,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {Button} from 'react-native';
import {TextInput} from 'react-native-paper';
import {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Picker} from '@react-native-picker/picker';
import UserBoard from './UserDashboard';
import Signup from './SignUp';

export default function Login(props) {
  const [password, setPassword] = useState(true);
  const [uname, setUname] = useState();
  const [pass, setPass] = useState();
  const [login, setLogin] = useState();

  async function LoginUsers() {
    let response = await fetch(
      global.apiUrl + 'User/loginUser?un=' + uname + '&p=' + pass,
    );
    let json = await response.json();
    console.log(JSON.stringify(json));
    setLogin(json);
    if (json == 'User') {
      global.user = uname;
      props.navigation.navigate('User Dashboard', {uname, pass});
    } else if (json == 'Admin') {
      global.admin = uname;
      props.navigation.navigate('Admin Dashboard');
    } else {
      Alert.alert('User Authentication', 'User does not exist');
    }
  }

  return (
    <SafeAreaView
      style={{backgroundColor: 'white', height: '100%', width: '100%'}}>
      <ImageBackground
        source={require('./Images/Hexagon.png')}
        resizeMode="cover"
        style={{height: '100%', width: 400}}>
        <Image
          source={require('./Images/Login.png')}
          style={{width: 300, height: 300, marginStart: 30, marginTop: 30}}
        />
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.text}>
            <Icon name="user" size={20} />
            UserName
          </Text>
          <TextInput style={styles.textInput} onChangeText={setUname} />
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.text}>
            <Icon name="lock" size={20} />
            Password
          </Text>
          <TextInput
            style={styles.textInput}
            secureTextEntry={password}
            right={
              <TextInput.Icon
                name={password ? 'eye' : 'eye-off'}
                onPress={() => setPassword(!password)}
              />
            }
            onChangeText={setPass}
          />
        </View>
        <Text style={{marginStart: 250, fontWeight: 'bold'}}>
          !ForgetPassword
        </Text>

        <TouchableOpacity onPress={LoginUsers}>
          <View style={styles.b1}>
            <Icon name="sign-in" size={20} color="white" style={styles.icon} />
            <Text style={styles.buttontext}>Login</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('SignUp');
          }}>
          <View style={styles.b2}>
            <Icon
              name="user-plus"
              size={20}
              color="white"
              style={styles.icon}
            />
            <Text style={styles.buttontext}>Sign Up</Text>
          </View>
        </TouchableOpacity>
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
    flex: 2,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingLeft: 5,
    color: 'black',
    //borderColor: '#48BBEC',
    backgroundColor: 'rgba(0,0,0,0)',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 15,
    flex: 1,
    paddingTop: 15,
    color: 'black',
  },
  textt: {
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 15,
    marginTop: 40,
  },
  b1: {
    marginStart: 45,
    marginTop: 30,
    width: 300,
    height: 40,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'black',
    flexDirection: 'row',
  },

  b2: {
    marginStart: 45,
    marginTop: 30,
    width: 300,
    height: 40,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'red',
    backgroundColor: 'red',
    flexDirection: 'row',
  },

  buttontext: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 5,
    marginEnd: 40,
    flex: 4,
  },
  icon: {
    flex: 1,
    marginTop: 10,
    marginStart: 20,
  },
});
