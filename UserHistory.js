import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  FlatList,
  View,
  ImageBackground,
  Image,
} from 'react-native';
import {Text, StyleSheet, ActivityIndicator} from 'react-native';
import {Searchbar} from 'react-native-paper';

export default function UserHistory() {
  const [data, setData] = useState([]);
  const [loc, setLoc] = useState('');
  const [loading, setLoading] = useState(true);
  const [flat, setFlat] = useState(true);

  async function getItems() {
    let response = await fetch(
      global.apiUrl + 'item/getitemsbyuser?un=' + global.user,
    );
    let json = await response.json();
    console.log(json);
    setData(json);
    //pause for 5 secinds
    //console.log(global.user);
    //console.log(JSON.stringify(json));
    if (json !== 'No Item') {
      setFlat(false);
    }
    setLoading(false);
    console.log(data);
  }

  useEffect(() => {
    getItems();
    console.log('History');
  }, []);

  return (
    <SafeAreaView
      style={{
        backgroundColor: 'white',
        height: '100%',
        width: '100%',
      }}>
      <ImageBackground
        source={require('./Images/Hexagon.png')}
        resizeMode="cover"
        style={{height: '100%', width: 400}}>
        {loading ? (
          <View style={styles.indicator}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <View style={{marginTop: 60}}>
            {flat ? (
              <View>
                <Text> User Not Report Any Item </Text>
              </View>
            ) : (
              <View>
                <Text
                  style={{
                    fontSize: 20,
                    marginStart: 20,
                    color: 'black',
                  }}>
                  Total:{data.length}
                </Text>
                <FlatList
                  data={data}
                  renderItem={({item, index}) => {
                    return (
                      <View style={styles.view}>
                        <Text style={styles.text}>
                          Category: {item.Itm_Name}
                        </Text>

                        <Text style={styles.text}>
                          Location : {item.Loc_Name}
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
            )}
          </View>
        )}
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  view: {
    height: 200,
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
  indicator: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
});
