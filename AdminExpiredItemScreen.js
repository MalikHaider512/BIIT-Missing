import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  FlatList,
  View,
  Image,
  ImageBackground,
} from 'react-native';
import {TouchableOpacity, Button, Text, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

export default function ExpiredItems(props) {
  let [arr, setArr] = useState(['Category:Laptop....']);
  const [data, setData] = useState();

  async function getItems() {
    let response = await fetch(
      global.apiUrl + 'item/getitemsbystatus?satus=Expired',
    );
    let json = await response.json();
    setData(json);
    console.log(global.admin);
    console.log(JSON.stringify(json));
    console.log(data);
  }

  async function changeStatus(id, st) {
    let response = await fetch(
      global.apiUrl + 'item/changeItemStatus?i=' + id + '&s=' + st,
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
    <SafeAreaView>
      <ImageBackground
        source={require('./Images/Hexagon.png')}
        resizeMode="cover"
        style={{height: '100%', width: 400}}>
        <View style={{marginTop: 30}}>
          <TouchableOpacity
            style={{marginTop: 10}}
            onPress={() => {
              props.navigation.navigate('Items For Auction');
            }}>
            <View style={styles.b1}>
              <Text style={styles.buttontext}>Auction Items</Text>
            </View>
          </TouchableOpacity>
          <Text style={styles.text}> Expired Items</Text>

          <FlatList
            data={data}
            renderItem={({item, index}) => {
              return (
                <View style={styles.view}>
                  <Text style={styles.text}>Category: {item.Itm_Name}</Text>

                  <Text style={styles.text}>Date : {item.Date}</Text>

                  <View style={{width: 400, height: 120, flexDirection: 'row'}}>
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
                  <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity
                      onPress={() => {
                        changeStatus(item.Itm_Id, 'Replace');
                      }}>
                      <View style={styles.b2}>
                        <Text style={styles.buttontext}>Replace</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        props.navigation.navigate('Set Auction Price', {
                          id: item.Itm_Id,
                          nam: item.Itm_Name,
                        });
                        changeStatus(item.Itm_Id, 'Auction');
                      }}>
                      <View style={styles.b2}>
                        <Text style={styles.buttontext}>Auction</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }}
            keyExtractor={(d, index) => index.toString()}
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  view: {
    height: 230,
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
  texth: {
    marginStart: 10,
    fontSize: 20,
    color: 'black',
    marginTop: 20,
    fontWeight: 'bold',
    fontSize: 20,
  },
  b1: {
    marginStart: 45,
    marginTop: 20,
    width: 300,
    height: 40,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'black',
  },
  b2: {
    marginTop: 10,
    marginStart: 20,
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
});
