import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import {launchImageLibrary} from 'react-native-image-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {RadioButton} from 'react-native-paper';

export default function Complain(props) {
  const [att, setAtt] = useState([]);
  const [comp, setComp] = useState([]);
  const [dloc, setDLoc] = useState([]);

  const [satt, setSAtt] = useState('Select Attribute');
  const [val, setVal] = useState();
  const [adata, setAData] = useState([]);
  const [pic, setPic] = useState();
  const [filePath, setFilePath] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [descp, setDescp] = useState();
  const [scope, setScope] = useState('Private');
  const [reward, setReward] = useState('0');
  const [rew, setRew] = useState('No');
  const [loc, setLoc] = useState('Lab-01');

  const [color, setColor] = useState(['Red', 'Blue', 'Black', 'Grey']);

  async function getAttributes() {
    let response = await fetch(
      global.apiUrl +
        'Category/getCategoryAttribute?cat=' +
        props.route.params.n,
    );
    let json = await response.json();
    setAtt(json);
    console.log(JSON.stringify(json));
  }

  const getLocations = async () => {
    let response = await fetch(global.apiUrl + 'location/getlocations');
    let json = await response.json();
    json.map((item, index) => {
      dloc.push(item.Loc_Name);
    });
    //console.log(json);
    console.log(dloc);
  };

  async function getCompany() {
    let response = await fetch(
      global.apiUrl +
        'Company/getCompaniesByCategory?cat=' +
        props.route.params.n,
    );
    let json = await response.json();
    setComp(json);
    console.log(JSON.stringify(json));
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
      setVal(response.assets[0].type);

      setFilePath(response.assets[0]);
    });
  };

  async function uploadFile(obj) {
    let data = new FormData();
    data.append('file', obj);
    data.append('name', props.route.params.n);
    data.append('cid', props.route.params.n);
    data.append('lid', loc);
    //data.append('color', color);
    //data.append('comp', comp);
    //data.append('model', model);
    //data.append('price', price);
    data.append('uname', global.user);
    data.append('date', selectedDate.toLocaleDateString());
    //data.append('descp', descp);
    data.append('status', props.route.params.s);
    data.append('reward', reward);
    data.append('scope', scope);

    let response = await fetch(global.apiUrl + 'Item/uploadFile', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: data,
    });

    //console.log(response);
    let json = await response.json();
    console.log(JSON.stringify(json));

    adata.map(d => {
      if (
        !(
          d.attribute === 'Scope' ||
          d.attribute === 'Picture' ||
          d.attribute === 'Date' ||
          d.attribute === 'Reward'
        )
      ) {
        saveAttribute(json, d.attribute, d.value);
      }
    });

    if (scope == 'Public') {
      saveItemVisibilty(json, global.user);
    }
  }

  async function saveAttribute(id, at, vl) {
    let response = await fetch(
      global.apiUrl + 'item/saveAttribute?i=' + id + '&a=' + at + '&v=' + vl,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
    let json = await response.json();
  }

  async function saveItemVisibilty(id, un) {
    let response = await fetch(
      global.apiUrl + 'item/saveItemVisiblity?i=' + id + '&usrn=' + un,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
    let json = await response.json();
    console.log(json);
  }

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirm = date => {
    setSelectedDate(date);
    setVal(date.toLocaleDateString());
    hideDatePicker();
    console.log(selectedDate);
  };

  useEffect(() => {
    getAttributes();
    getLocations();

    getCompany();
  }, []);

  return (
    <SafeAreaView>
      <ImageBackground
        source={require('./Images/Hexagon.png')}
        resizeMode="cover"
        style={{height: '100%'}}>
        <View style={{marginTop: 40}}>
          <ScrollView>
            <Text style={styles.text}> Attributes</Text>
            <View style={styles.picker}>
              <Picker
                style={{}}
                selectedValue={satt}
                onValueChange={(itemvalue, itemindex) => {
                  setSAtt(itemvalue);
                }}>
                {att.map(l => (
                  <Picker.Item label={l.Att_Name} value={l.Att_Name} />
                ))}
              </Picker>
            </View>

            {(() => {
              if (satt === '') {
                return <View></View>;
              } else if (satt === 'Company') {
                return (
                  <View>
                    <Text style={styles.text}> Company</Text>
                    <View style={styles.picker}>
                      <Picker
                        style={{}}
                        selectedValue={val}
                        onValueChange={(itemvalue, itemindex) => {
                          setVal(itemvalue);
                        }}>
                        <Picker.Item label="Select Company" value="" />
                        {comp.map(c => (
                          <Picker.Item
                            label={c.Comp_Name}
                            value={c.Comp_Name}
                          />
                        ))}
                        <Picker.Item label="Others" value="Others" />
                      </Picker>
                    </View>
                  </View>
                );
              } else if (satt === 'Color') {
                return (
                  <View>
                    <Text style={styles.text}> Color</Text>
                    <View style={styles.picker}>
                      <Picker
                        style={{}}
                        selectedValue={val}
                        onValueChange={(itemvalue, itemindex) => {
                          setVal(itemvalue);
                        }}>
                        <Picker.Item label="Select Color" value="" />
                        {color.map(c => (
                          <Picker.Item label={c} value={c} />
                        ))}
                      </Picker>
                    </View>
                  </View>
                );
              } else if (satt === 'Picture') {
                return (
                  <View style={{flexDirection: 'row'}}>
                    <Text
                      style={{
                        fontSize: 24,
                        fontWeight: 'bold',
                        marginBottom: 20,
                        flex: 1,
                        marginStart: 20,
                        color: 'black',
                      }}>
                      {filePath.type}
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        chooseFile('photo');
                        setVal(filePath.type);
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
                );
              } else if (satt === 'Date') {
                return (
                  <View>
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
                          marginStart: 20,
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
                  </View>
                );
              } else if (satt === 'Description') {
                return (
                  <View>
                    <Text style={styles.text}> Description</Text>
                    <TextInput
                      style={styles.description}
                      onChangeText={text => {
                        setDescp(text);
                        setVal(text);
                      }}
                      multiline={true}
                      maxLength={200}
                    />
                  </View>
                );
              } else if (satt === 'Scope') {
                return (
                  <View style={{flexDirection: 'row', marginStart: 20}}>
                    <View style={{flex: 1}}>
                      <Text style={styles.text}>Scope</Text>

                      <View style={{flexDirection: 'row'}}>
                        <View
                          style={{
                            flex: 2,
                          }}>
                          <RadioButton.Group
                            onValueChange={newValue => {
                              setScope(newValue);
                              setVal(newValue);
                            }}
                            value={scope}>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}>
                              <RadioButton value="Public" style={{flex: 1}} />

                              <Text style={styles.text}>Public</Text>
                            </View>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}>
                              <RadioButton value="Private" />
                              <Text style={styles.text}>Private</Text>
                            </View>
                          </RadioButton.Group>
                        </View>
                      </View>
                    </View>
                  </View>
                );
              } else if (satt === 'Reward') {
                return (
                  <View style={{flexDirection: 'row', marginStart: 20}}>
                    <View style={{flex: 1}}>
                      <Text style={styles.text}>Reward</Text>

                      <View style={{flexDirection: 'row'}}>
                        <View
                          style={{
                            flex: 2,
                          }}>
                          <RadioButton.Group
                            onValueChange={newValue => setRew(newValue)}
                            value={rew}>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}>
                              <RadioButton value="Yes" style={{flex: 1}} />

                              <Text style={styles.text}>Yes</Text>
                            </View>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}>
                              <RadioButton value="No" />
                              <Text style={styles.text}>No</Text>
                            </View>
                          </RadioButton.Group>
                        </View>
                      </View>
                    </View>
                  </View>
                );
              } else if (satt === 'Location') {
                return (
                  <View>
                    <Text style={styles.text}> Location</Text>
                    <View style={styles.picker}>
                      <Picker
                        style={{}}
                        selectedValue={loc}
                        onValueChange={(itemvalue, itemindex) => {
                          setLoc(itemvalue);
                          setVal(itemvalue);
                        }}>
                        {dloc.map(l => (
                          <Picker.Item label={l} value={l} />
                        ))}
                      </Picker>
                    </View>
                  </View>
                );
              } else {
                return (
                  <View>
                    <Text style={styles.text}> {satt}</Text>
                    <TextInput style={styles.textInput} onChangeText={setVal} />
                  </View>
                );
              }
            })()}

            {rew === 'Yes' && satt === 'Reward' ? (
              <View>
                <Text style={styles.text}> Reward</Text>
                <TextInput
                  style={styles.textInput}
                  onChangeText={text => {
                    setReward(text);
                    setVal(text);
                  }}
                />
              </View>
            ) : (
              <View>
                <Text></Text>
              </View>
            )}

            <TouchableOpacity
              onPress={() => {
                console.log('Attribute ' + satt);
                console.log('Value ' + val);
                let obj = {
                  attribute: satt,
                  value: val,
                };
                adata.push(obj);
                setVal('');
                Alert.alert('', 'Field Added');
              }}>
              <View style={styles.b2}>
                <Text style={styles.buttontext}>Add Field</Text>
              </View>
            </TouchableOpacity>

            {adata !== null ? (
              <View style={{height: 400, marginTop: 10}}>
                <ScrollView>
                  {adata.map((item, index) => {
                    return (
                      <View>
                        <Text style={styles.text}>{item.attribute}</Text>
                        <Text style={styles.textVal}>{item.value}</Text>
                      </View>
                    );
                  })}
                </ScrollView>
              </View>
            ) : (
              <View>
                <Text> No Data</Text>
              </View>
            )}

            <TouchableOpacity
              onPress={() => {
                uploadFile(pic);
                console.log(adata);
              }}>
              <View style={styles.b2}>
                <Text style={styles.buttontext}>Add Item</Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>
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
    marginLeft: 20,
    color: 'black',
  },
  textVal: {
    //fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 20,
    color: 'black',
    height: 45,
    width: 350,
    margin: 10,
    //fontSize: 18,
    borderColor: 'black',
    borderWidth: 3,
    marginStart: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    padding: 5,
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
    marginTop: 10,
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
  radioView: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4,
    marginTop: 2,
  },
  radioViewText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
