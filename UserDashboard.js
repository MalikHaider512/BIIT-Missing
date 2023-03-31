import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  ImageBackground,
  Modal,
  ActivityIndicator,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function UserBoard(props) {
  const [data, setData] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  async function getItems() {
    let response = await fetch(
      global.apiUrl + 'item/getPublicItems?usr=' + props.route.params.uname,
    );
    let json = await response.json();
    setData(json);
    setLoading(false);
    console.log(JSON.stringify(json));
    if (json !== 'No Alert') {
      setModalVisible(true);
    }
  }

  async function changeVisibility(id, un) {
    let response = await fetch(
      global.apiUrl +
        'item/changeVisibilityStatus?i=' +
        id +
        '&usrn=' +
        props.route.params.uname,
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
    getItems();
  }, []);

  return (
    <SafeAreaView
      style={{backgroundColor: 'white', height: '100%', width: '100%'}}>
      <ImageBackground
        source={require('./Images/Hexagon.png')}
        resizeMode="cover"
        style={{height: '100%', width: 400}}>
        {loading ? (
          <View style={styles.indicator}>
            <ImageBackground
              style={styles.indicator}
              source={require('./Images/Hexagon.png')}
              resizeMode="cover">
              <ActivityIndicator size="large" />
            </ImageBackground>
          </View>
        ) : (
          <View>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}>
              <View
                style={{
                  //flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '80%',
                  height: '50%',
                  backgroundColor: 'grey',
                  marginLeft: 40,
                  marginTop: 150,
                  padding: 20,
                  borderRadius: 40,
                  //elevation: 20,
                }}>
                <View style={{height: '90%'}}>
                  <FlatList
                    data={data}
                    renderItem={({item, index}) => {
                      return (
                        <View style={styles.view}>
                          <Text style={styles.text}>
                            Category: {item.Itm_Name}
                          </Text>

                          <Text style={styles.text}>
                            Reward : {item.Reward}
                          </Text>
                          <Text style={styles.text}>Date : {item.Date}</Text>
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
                                uri: `${global.imgUrl}Images/${item.Picture}`,
                              }}
                            />
                          </View>
                        </View>
                      );
                    }}
                    keyExtractor={(d, index) => index.toString()}
                  />
                </View>

                <TouchableOpacity style={styles.b3}>
                  <Text
                    style={styles.buttontext}
                    onPress={() => {
                      setModalVisible(!modalVisible);
                      data.map(d => {
                        changeVisibility(d.Itm_Id, props.route.params.uname);
                      });
                    }}>
                    Ok
                  </Text>
                </TouchableOpacity>
              </View>
            </Modal>

            <Image
              source={require('./Images/Userboard.png')}
              style={{width: 300, height: 250, marginStart: 20, marginTop: 100}}
              resizeMode="contain"
            />

            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('categories', {status: 'Lost'});
              }}>
              <View style={styles.b1}>
                <Icon
                  name="arrow-right"
                  size={20}
                  color="white"
                  style={styles.icon}
                />
                <Text style={styles.buttontext}>Lost Something</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('categories', {status: 'Found'});
              }}>
              <View style={styles.b1}>
                <Icon
                  name="arrow-right"
                  size={20}
                  color="white"
                  style={styles.icon}
                />
                <Text style={styles.buttontext}>Found Something</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('Track Previously Items');
              }}>
              <View style={styles.b1}>
                <Icon
                  name="arrow-right"
                  size={20}
                  color="white"
                  style={styles.icon}
                />
                <Text style={styles.buttontext}>Track Added Items</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('Items For Bidding');
              }}>
              <View style={styles.b1}>
                <Icon
                  name="arrow-right"
                  size={20}
                  color="white"
                  style={styles.icon}
                />
                <Text style={styles.buttontext}>Auction Items</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('LogIn');
              }}>
              <View style={styles.b2}>
                <Icon
                  name="sign-out"
                  size={20}
                  color="white"
                  style={styles.icon}
                />
                <Text style={styles.buttontext}>Logout</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
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

  b3: {
    marginStart: 10,
    marginTop: 5,
    width: 90,
    height: 40,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'black',
  },

  buttontext: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 5,
    flex: 5,
  },
  icon: {
    flex: 1,
    marginTop: 10,
    marginStart: 20,
  },
});
