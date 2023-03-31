import React from 'react';
import {SafeAreaView, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';

export default function CustomPicker({lst}) {
  return (
    <SafeAreaView>
      <Text style={styles.text}> Company</Text>
      <View style={styles.picker}>
        <Picker
          style={{}}
          selectedValue={val}
          onValueChange={(itemvalue, itemindex) => {
            setVal(itemvalue);
          }}>
          {lst.map(c => (
            <Picker.Item label={c.Name} value={c.Name} />
          ))}
        </Picker>
      </View>
    </SafeAreaView>
  );
}
