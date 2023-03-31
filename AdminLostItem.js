import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  FlatList,
  View,
  ActivityIndicator,
  ImageBackground,
  Image,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import {TouchableOpacity, Button, Text, StyleSheet} from 'react-native';

export default function AdminLost() {
  let [arr, setArr] = useState([
    {name: 'Ali', regno: 1},
    {name: 'Ali', regno: 2},
    {name: 'Ali', regno: 3},
  ]);

  let [data, setData] = useState([]);
  let [loc, setLoc] = useState('');
  const [loading, setLoading] = useState(true);
  const [flat, setFlat] = useState(true);
  const [search, setSearch] = useState('');

  async function getItems() {
    let response = await fetch(
      global.apiUrl + 'item/getitemsbystatus?satus=Lost',
    );
    let json = await response.json();
    setData(json);
    console.log(global.admin);
    console.log(JSON.stringify(json));
    console.log(data);
    if (json !== 'No Item') {
      setFlat(false);
    }
    setLoading(false);
  }

  useEffect(() => {
    getItems();
    console.log('Admin Lost Item Screen');
  }, []);

  return (
    <SafeAreaView>
      <ImageBackground
        source={require('./Images/Hexagon.png')}
        resizeMode="cover"
        style={{height: '100%'}}>
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
          <View style={{marginTop: 40}}>
            {flat ? (
              <View>
                <Text> No Lost Item Added</Text>
              </View>
            ) : (
              <View>
                <Text style={styles.text}> Total:{data.length}</Text>
                <TextInput
                  style={styles.textInput}
                  onChangeText={text => setSearch(text)}
                  value={search}
                  placeholder="Search"
                  right={<Icon name="user" size={20} />}
                />
                <FlatList
                  data={data.filter(item => item.Itm_Name.includes(search))}
                  renderItem={({item, index}) => {
                    return (
                      <View style={styles.view}>
                        <Text style={styles.text}>
                          Category: {item.Itm_Name}
                        </Text>
                        {/* <Text style={styles.text}>
                          Company : {item.Company}
                        </Text> */}
                        <Text style={styles.text}>
                          Location : {item.Loc_Name}
                        </Text>
                        <Text style={styles.text}>Reward : {item.Reward}</Text>
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
    height: 230,
    width: 350,
    borderColor: 'black',
    marginTop: 20,
    borderWidth: 2,
    margin: 5,
    marginStart: 20,
    borderRadius: 20,
    //backgroundColor: 'grey',
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
  textInput: {
    height: 45,
    width: 350,
    margin: 10,
    fontSize: 18,
    borderColor: 'black',
    borderWidth: 2,
    marginStart: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingLeft: 5,
  },
});
