import React, {useState, useEffect} from 'react';
import {SafeAreaView, FlatList, View, ImageBackground} from 'react-native';
import {TouchableOpacity, Button, Text, StyleSheet, Image} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

export default function AdminAuction() {
  let [arr, setArr] = useState([
    {name: 'Laptop', company: 'Dell', color: 'Black', price: 40000},
  ]);
  const [data, setData] = useState([]);

  async function getItems() {
    let response = await fetch(global.apiUrl + 'item/getAuctionItem');
    let json = await response.json();
    setData(json);
    console.log(global.admin);
    console.log(JSON.stringify(json));
    console.log(data);
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
        <View style={{marginTop: 40}}>
          <Text style={styles.text}> Total:{data.length}</Text>
          <FlatList
            data={data}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity>
                  <View style={styles.view}>
                    <Text style={styles.text}>Category: {item.Itm_Name}</Text>

                    <Text style={styles.text}>
                      Auction Price : {item.Start_Bid}
                    </Text>
                    <View
                      style={{width: 400, height: 120, flexDirection: 'row'}}>
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
                </TouchableOpacity>
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
    height: 180,
    width: 350,
    borderColor: 'black',
    marginTop: 20,
    borderWidth: 2,
    margin: 5,
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
});
