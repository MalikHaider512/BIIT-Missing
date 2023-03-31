import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Platform,
  PermissionsAndroid,
  ImageBackground,
  Alert,
  Modal,
} from 'react-native';
import {TouchableOpacity, Image, ActivityIndicator} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {useState, useEffect} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function UserFoundItems(props) {
  //let pic;

  const [loadingc, setLoadingc] = useState(true);
  const [loadingl, setLoadingl] = useState(true);

  const [dcate, setDCate] = useState([]);
  const [dloc, setDLoc] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [adata, setAData] = useState([]);
  const [att, setAtt] = useState();
  const [val, setVal] = useState();

  const [pic, setPic] = useState();
  const [comp, setComp] = useState();
  const [color, setColor] = useState();
  const [price, SetPrice] = useState();
  const [model, SetModel] = useState();
  const [descp, setDescp] = useState();

  const [cate, setCate] = useState('Laptop');
  const [loc, setLoc] = useState('Lab 1');
  const [filePath, setFilePath] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [descpLength, setDescpLength] = useState(0);
  const [data, setData] = useState();

  const getCategories = async () => {
    let response = await fetch(global.apiUrl + 'category/getcategory');
    let json = await response.json();
    //console.log(JSON.stringify(json))
    json.map((item, index) => {
      dcate.push(item.Cat_Name);
    });
    console.log(dcate);
    setLoadingc(false);
  };

  const getLocations = async () => {
    let response = await fetch(global.apiUrl + 'location/getlocations');
    let json = await response.json();
    json.map((item, index) => {
      dloc.push(item.Loc_Name);
    });
    console.log(dloc);
    setLoadingl(false);
  };

  async function getItems() {
    let response = await fetch(
      global.apiUrl + 'item/getitemsbystatus?satus=Lost',
    );
    let json = await response.json();
    setData(json);
    console.log(global.admin);
    console.log(JSON.stringify(json));
    console.log(data);
  }

  useEffect(() => {
    getCategories();
    getLocations();
    getItems();
    console.log('Lost Item Screen');
    // setCount(count+1)
  }, []);

  async function uploadFile(obj) {
    let data = new FormData();
    data.append('file', obj);
    data.append('name', cate);
    data.append('cid', cate);
    data.append('lid', loc);
    data.append('color', color);
    data.append('comp', comp);
    data.append('price', price);
    data.append('uname', global.user);
    data.append('date', Date.parse(selectedDate));
    data.append('descp', descp);
    data.append('status', 'Lost');
    let response = await fetch(global.apiUrl + 'Items/uploadFile', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: data,
    });
    let json = await response.json();
    alert(JSON.stringify(json));
  }

  const chooseFile = type => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    launchImageLibrary(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        alert('User cancelled camera picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        alert(response.errorMessage);
        return;
      }

      console.log('uri -> ', response.assets[0].uri);
      console.log('width -> ', response.assets[0].width);
      console.log('height -> ', response.assets[0].height);
      console.log('fileSize -> ', response.assets[0].fileSize);
      console.log('type -> ', response.assets[0].type);
      console.log('fileName -> ', response.assets[0].fileName);
      setPic({
        uri: response.assets[0].uri,
        type: response.assets[0].type,
        name: response.assets[0].fileName,
      });
      console.log(pic);

      setFilePath(response.assets[0]);
    });
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert('Write permission err', err);
      }
      return false;
    } else return true;
  };

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirm = date => {
    setSelectedDate(date);
    hideDatePicker();
    console.log(selectedDate);
  };

  function AutoMatching() {
    data.map(d => {
      if (cate === 'Laptop' || cate === 'Mobile') {
        if (d.Company === comp) {
          if (d.Model === model) {
            if (d.Color === color) {
              Alert.alert('Notifocation', 'Your Laptop is Found');
            }
          }
        }
      } else if (cate === 'Bag' || cate === 'Wallet') {
        if (d.Company === comp) {
          if (d.Color === color) {
          }
        }
      } else if (cate === 'Book') {
      }
    });
  }

  return (
    <SafeAreaView
      style={{backgroundColor: 'white', height: '100%', width: '100%'}}>
      <ImageBackground
        source={require('./Images/Hexagon.png')}
        resizeMode="cover"
        style={{height: '100%', width: 400}}>
        {loadingc && loadingl ? (
          <View style={styles.indicator}>
            <ImageBackground
              source={require('./Images/Hexagon.png')}
              //resizeMode="cover"
              style={{height: '100%', width: 400}}>
              <ActivityIndicator
                size="large"
                color="#2ed573"
                style={{marginTop: 350}}
              />
            </ImageBackground>
          </View>
        ) : (
          <View style={{marginTop: 40}}>
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
                  height: '40%',
                  backgroundColor: 'grey',
                  marginLeft: 40,
                  marginTop: 200,
                  padding: 20,
                  borderRadius: 40,
                  //elevation: 20,
                }}>
                <TextInput
                  style={{
                    width: 200,
                    height: 40,
                    fontSize: 20,
                    color: 'dark ',
                    borderWidth: 2,
                    borderRadius: 20,
                    padding: 10,
                  }}
                  placeholder="Enter Attribute"
                  onChangeText={setAtt}
                />
                <TextInput
                  style={{
                    width: 200,
                    height: 40,
                    fontSize: 20,
                    color: 'dark ',
                    borderWidth: 2,
                    borderRadius: 20,
                    marginTop: 5,
                    //paddingTop: 10,
                    padding: 10,
                  }}
                  placeholder="Enter Value"
                  onChangeText={setVal}
                />

                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity
                    style={styles.b3}
                    onPress={() => {
                      setModalVisible(!modalVisible);
                    }}>
                    <Text style={styles.buttontext}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.b3}>
                    <Text
                      style={styles.buttontext}
                      onPress={() => {
                        obj = {
                          attribute: att,
                          value: val,
                        };
                        adata.push(obj);
                        setModalVisible(!modalVisible);
                      }}>
                      Save
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
            <ScrollView>
              <Text style={styles.text}> Category</Text>
              <View style={styles.picker}>
                <Picker
                  selectedValue={cate}
                  onValueChange={(itemvalue, itemindex) => {
                    setCate(itemvalue);
                  }}>
                  {dcate.map(c => (
                    <Picker.Item label={c} value={c} />
                  ))}
                </Picker>
              </View>

              <Text style={styles.text}> Location</Text>
              <View style={styles.picker}>
                <Picker
                  style={{}}
                  selectedValue={loc}
                  onValueChange={(itemvalue, itemindex) => {
                    setLoc(itemvalue);
                  }}>
                  {dloc.map(l => (
                    <Picker.Item label={l} value={l} />
                  ))}
                </Picker>
              </View>

              <Text style={styles.text}> Company</Text>
              <TextInput style={styles.textInput} onChangeText={setComp} />

              <Text style={styles.text}> Model</Text>
              <TextInput style={styles.textInput} onChangeText={SetModel} />

              <Text style={styles.text}> Color</Text>
              <TextInput style={styles.textInput} onChangeText={setColor} />

              <Text style={styles.text}> Price </Text>
              <TextInput style={styles.textInput} onChangeText={SetPrice} />
              {adata !== null ? (
                <View>
                  {adata.map((item, index) => {
                    return (
                      <View>
                        <View style={{flexDirection: 'row', marginTop: 2}}>
                          <Text
                            style={{
                              flex: 1,
                              width: '30%',
                              height: 40,
                              borderWidth: 2,
                              borderRadius: 20,
                              padding: 5,
                              fontSize: 20,
                            }}>
                            Attribute:{item.attribute}
                          </Text>
                          <Text
                            style={{
                              flex: 1,
                              width: '30%',
                              height: 40,
                              borderWidth: 2,
                              borderRadius: 20,
                              padding: 5,
                              fontSize: 20,
                            }}>
                            Value:{item.value}
                          </Text>
                        </View>
                      </View>
                    );
                  })}
                </View>
              ) : (
                <View>
                  <Text> No Data</Text>
                </View>
              )}

              <Text style={styles.text}> Date</Text>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    fontSize: 24,
                    fontWeight: 'bold',
                    marginBottom: 20,
                    flex: 1,
                    marginStart: 15,
                    color: 'black',
                  }}>
                  {selectedDate
                    ? selectedDate.toLocaleDateString()
                    : 'No date selected'}
                </Text>

                <TouchableOpacity onPress={showDatePicker}>
                  <View style={styles.b1}>
                    <Icon
                      name="calendar"
                      size={20}
                      color="white"
                      style={{flex: 1, marginTop: 10, marginStart: 20}}
                    />
                    <Text style={styles.buttontext}>Select Date</Text>
                  </View>
                </TouchableOpacity>
                <DateTimePickerModal
                  date={selectedDate}
                  isVisible={datePickerVisible}
                  mode="date"
                  onConfirm={handleConfirm}
                  onCancel={hideDatePicker}
                />
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    fontSize: 24,
                    fontWeight: 'bold',
                    marginBottom: 20,
                    flex: 1,
                    marginStart: 15,
                    color: 'black',
                  }}>
                  {filePath.type}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    chooseFile('photo');
                  }}>
                  <View style={styles.b1}>
                    <Icon
                      name="image"
                      size={20}
                      color="white"
                      style={{flex: 1, marginTop: 10, marginStart: 20}}
                    />
                    <Text style={styles.buttontext}>Choose Image</Text>
                  </View>
                </TouchableOpacity>
              </View>

              <Text style={styles.text}> Description</Text>
              <TextInput
                style={styles.description}
                onChangeText={text => {
                  setDescp(text);
                  setDescpLength(text.length);
                }}
                multiline={true}
                maxLength={200}
              />
              <View style={{marginStart: 30}}>
                {descpLength === 200 ? (
                  <Text style={{color: 'red', fontWeight: 'bold'}}>
                    Maximum Lenght is 200
                  </Text>
                ) : (
                  <Text></Text>
                )}
              </View>

              <TouchableOpacity
                onPress={() => {
                  uploadFile(pic);
                  console.log(selectedDate);
                  console.log(pic);
                  console.log(cate);
                  console.log(loc);
                  AutoMatching();
                }}>
                <View style={styles.b2}>
                  <Text style={styles.buttontext}>Add Item</Text>
                </View>
              </TouchableOpacity>
            </ScrollView>
          </View>
        )}
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  textInput: {
    height: 45,
    width: 350,
    margin: 10,
    fontSize: 18,
    borderColor: 'black',
    borderWidth: 3,
    marginStart: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingLeft: 5,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 15,
    color: 'black',
  },
  picker: {
    height: 50,
    width: '80%',
    // color: '#344953',
    // justifyContent: 'center',
    // backgroundColor:"Black",
    placeholderTextColor: '#fff',
  },
  button: {
    width: 200,
    height: 40,
    marginTop: 20,
    marginStart: 80,
  },
  buttond: {
    width: 150,
    height: 40,
    marginStart: 10,
    flex: 2,
  },
  b1: {
    marginEnd: 10,
    width: 200,
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
    borderColor: 'black',
    backgroundColor: 'black',
  },
  b3: {
    marginStart: 20,
    marginTop: 30,
    width: 90,
    height: 40,
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
    marginTop: 5,
  },
  indicator: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  picker: {
    height: 45,
    width: 350,
    margin: 10,
    fontSize: 18,
    borderColor: 'black',
    borderWidth: 3,
    marginStart: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingLeft: 5,
    justifyContent: 'center',
  },
  description: {
    height: 70,
    width: 350,
    margin: 10,
    fontSize: 18,
    borderColor: 'black',
    borderWidth: 3,
    marginStart: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingLeft: 5,
  },
  descpLengthView: {
    marginStart: 20,
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
