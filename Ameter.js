// import React, { useState, useEffect } from 'react';
// import { Accelerometer } from 'expo-sensors';

// export default function Meter() {
//   const [data, setData] = useState({});
  
//   useEffect(() => {
//     _subscribe();
//   }, []);

//   const _subscribe = () => {
//     this._subscription = Accelerometer.addListener(accelerometerData => {
//       setData(accelerometerData);
//     });
//   };
  
//   let { x, y, z } = data;
  
//   return (
//     <View>
//       <Text>Accelerometer: (in Gs where 1 G = 9.81 m s^-2)</Text>
//       <Text>
//         x: {round(x)} y: {round(y)} z: {round(z)}
//       </Text>
//     </View>
//   );
// };