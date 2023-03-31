import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  Image,
  View,
  FlatList,
  ImageBackground,
  Button,
  TouchableOpacity,
} from 'react-native';

export default function ItemCategories(props) {
  const [cat, setCat] = useState();

  async function getCategory() {
    let response = await fetch(global.apiUrl + 'Category/getCategory');
    let json = await response.json();
    setCat(json);
    console.log(global.admin);
    console.log(JSON.stringify(json));
    console.log(cat);
  }

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <SafeAreaView>
      <ImageBackground
        source={require('./Images/Hexagon.png')}
        resizeMode="cover"
        style={{height: '100%'}}>
        <View style={{marginTop: 40}}>
          <FlatList
            data={cat}
            numColumns={2}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  style={{
                    width: '45%',
                    height: 100,
                    borderWidth: 3,
                    borderColor: 'black',
                    flexDirection: 'column',
                    marginStart: 10,
                    marginTop: 10,
                    borderRadius: 300,
                    padding: 30,
                  }}
                  onPress={() => {
                    let i = item.Cat_Id;
                    let n = item.Cat_Name;
                    console.log('Id:' + i);
                    console.log('Name:' + n);
                    let s = props.route.params.status;
                    console.log('Status' + s);
                    props.navigation.navigate('Complains', {i, n, s});
                  }}>
                  <View>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: '800',
                        fontStyle: 'italic',
                        color: 'black',
                      }}>
                      {item.Cat_Name}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }}
            //keyExtractor={item => item.id}
            keyExtractor={(d, index) => index.toString()}
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
