import React from 'react';
import {
  SafeAreaView,
  View,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function AdminBoard(props) {
  return (
    <SafeAreaView style={{backgroundColor: 'white', height: '100%'}}>
      <ImageBackground
        source={require('./Images/Hexagon.png')}
        resizeMode="cover"
        style={{height: '100%', width: 400}}>
        <Image
          source={require('./Images/Adminboard.png')}
          style={{width: 300, height: 250, marginStart: 20, marginTop: 100}}
          resizeMode="cover"
        />

        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('Lost Items');
          }}>
          <View style={styles.b1}>
            <Icon
              name="arrow-right"
              size={20}
              color="white"
              style={styles.icon}
            />
            <Text style={styles.buttontext}>Lost Items</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('Found Items');
          }}>
          <View style={styles.b1}>
            <Icon
              name="arrow-right"
              size={20}
              color="white"
              style={styles.icon}
            />
            <Text style={styles.buttontext}>Found Items</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('Matched Items');
          }}>
          <View style={styles.b1}>
            <Icon
              name="arrow-right"
              size={20}
              color="white"
              style={styles.icon}
            />
            <Text style={styles.buttontext}>Matched Items</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('Expired Items');
          }}>
          <View style={styles.b1}>
            <Icon
              name="arrow-right"
              size={20}
              color="white"
              style={styles.icon}
            />
            <Text style={styles.buttontext}>Expired Items</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('Add Location And Category');
          }}>
          <View style={styles.b1}>
            <Icon
              name="arrow-right"
              size={20}
              color="white"
              style={styles.icon}
            />
            <Text style={styles.buttontext}>Add Location/Category</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('LogIn');
          }}>
          <View style={styles.b2}>
            <Icon name="sign-out" size={20} color="white" style={styles.icon} />
            <Text style={styles.buttontext}>Logout</Text>
          </View>
        </TouchableOpacity>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 300,
    height: 40,
    marginTop: 20,
    marginStart: 30,
  },
  b1: {
    marginStart: 30,
    marginTop: 20,
    width: 300,
    height: 40,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'black',
    flexDirection: 'row',
  },

  b2: {
    marginStart: 30,
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
