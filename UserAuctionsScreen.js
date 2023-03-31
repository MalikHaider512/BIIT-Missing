import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  FlatList,
  View,
  ImageBackground,
  Image,
} from 'react-native';
import {TouchableOpacity, Button, Text, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

export default function UserAuction(props) {
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

  async function getMyItem(id) {
    let response = await fetch(global.apiUrl + 'item/myItem?id=' + id);
    //let json = await response.json();
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
                      Base Price : {item.Start_Bid}
                    </Text>
                    <View
                      style={{width: 400, height: 110, flexDirection: 'row'}}>
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
                          console.log(item.Auc_Id);
                          getMyItem(item.Auc_Id);
                          props.navigation.navigate('User Dashboard');
                        }}>
                        <View style={styles.b2}>
                          <Text style={styles.buttontext}>My Item</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          props.navigation.navigate('Item Bidding', {
                            p: item.Start_Bid + '',
                            n: item.Itm_Name,
                            i: item.Auc_Id,
                          });
                        }}>
                        <View style={styles.b2}>
                          <Text style={styles.buttontext}>Bid</Text>
                        </View>
                      </TouchableOpacity>
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
    height: 200,
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
    marginStart: 30,
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
