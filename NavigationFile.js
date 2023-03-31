import React from 'react';
import {Alert, SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
//import 'react-native-gesture-handler';
import Login from './LoginScreen';
import Signup from './SignUp';
import UserBoard from './UserDashboard';
import UserLostItems from './UserLostItemScreen';
import AdminBoard from './AdminDashboard';
import AddLoc from './AdminAddLocCate';
import SetPrice from './AdminSetAuctionPrice';
import UserBidding from './UserBidingScreen';
import UserAuction from './UserAuctionsScreen';
import UserHistory from './UserHistory';
import AdminLost from './AdminLostItem';
import AdminFound from './AdminFoundItem';
import AdminAuction from './AdminAuctionList';
import Icon from 'react-native-vector-icons/FontAwesome';
import {TouchableOpacity} from 'react-native-gesture-handler';
import NotificationList from './NotificationsListScreen';
import UserFoundItems from './UserFoundItemScreen';
import NotificationDetail from './NotificationsDetailScreen';
import ExpiredItems from './AdminExpiredItemScreen';
import MatchedItem from './AdminMatchedItem';
import ItemCategories from './ItemCategoriesScreen';
import Complain from './UserComplainScreen';
import AddAttribute from './AddAttributeScreen';

const Stack = createStackNavigator();

export default function MainFile(props) {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="LogIn"
          component={Login}
          options={{headerTransparent: true}}
        />
        <Stack.Screen
          name="SignUp"
          component={Signup}
          options={{headerTransparent: true}}
        />
        <Stack.Screen
          name="User Dashboard"
          component={UserBoard}
          options={({navigation, route}) => ({
            headerTitle: 'User Dashboard',
            headerTransparent: true,
            headerRight: () => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('notioficationList');
                }}>
                <Icon
                  name="bell"
                  size={20}
                  color="black"
                  style={{marginEnd: 10}}
                />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="User Lost Screen"
          component={UserLostItems}
          options={{headerTransparent: true, headerTitle: 'Lost Item Screen'}}
        />
        <Stack.Screen
          name="User Found Screen"
          component={UserFoundItems}
          options={{headerTransparent: true, headerTitle: 'Found Item Screen'}}
        />
        <Stack.Screen
          name="Admin Dashboard"
          component={AdminBoard}
          options={{headerTransparent: true, headerTitle: 'Admin Dashboard'}}
        />
        <Stack.Screen
          name="Add Location And Category"
          component={AddLoc}
          options={{headerTransparent: true}}
        />
        <Stack.Screen
          name="Add Item For Bid"
          component={SetPrice}
          options={{headerTransparent: true}}
        />
        <Stack.Screen
          name="Item Bidding"
          component={UserBidding}
          options={{headerTransparent: true}}
        />
        <Stack.Screen
          name="Items For Bidding"
          component={UserAuction}
          options={{headerTransparent: true}}
        />
        <Stack.Screen
          name="Track Previously Items"
          component={UserHistory}
          options={{headerTransparent: true, headerTitle: 'User History'}}
        />
        <Stack.Screen
          name="Lost Items"
          component={AdminLost}
          options={{headerTransparent: true}}
        />
        <Stack.Screen
          name="Found Items"
          component={AdminFound}
          options={{headerTransparent: true}}
        />
        <Stack.Screen
          name="Items For Auction"
          component={AdminAuction}
          options={{headerTransparent: true}}
        />
        <Stack.Screen
          name="notioficationList"
          component={NotificationList}
          options={{headerTransparent: true, headerTitle: 'Notifications'}}
        />
        {/* <Stack.Screen
          name="notiofication"
          component={NotificationDetail}
          options={{
            headerTransparent: true,
            headerTitle: 'Notification Detail',
          }}
        /> */}
        <Stack.Screen
          name="Expired Items"
          component={ExpiredItems}
          options={{headerTransparent: true}}
        />
        <Stack.Screen
          name="Matched Items"
          component={MatchedItem}
          options={{headerTransparent: true}}
        />
        <Stack.Screen
          name="Set Auction Price"
          component={SetPrice}
          options={{headerTransparent: true}}
        />
        <Stack.Screen
          name="categories"
          component={ItemCategories}
          options={{
            headerTransparent: true,
            headerTitle: 'Categories',
          }}
        />
        <Stack.Screen
          name="Complains"
          component={Complain}
          options={{
            headerTransparent: true,
            headerTitle: 'Report Complain',
          }}
        />
        <Stack.Screen
          name="AddAttribute"
          component={AddAttribute}
          options={{
            headerTransparent: true,
            headerTitle: 'Add Attribute',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
