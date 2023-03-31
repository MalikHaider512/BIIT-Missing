import React, {useEffect} from 'react';
import Login from './LoginScreen';
import Signup from './SignUp';
import UserBoard from './UserDashboard';
import UserItems from './UserLostItemScreen';
import MainFile from './NavigationFile';
import AdminBoard from './AdminDashboard';
import AddLoc from './AdminAddLocCate';
import SetPrice from './AdminSetAuctionPrice';
import UserBidding from './UserBidingScreen';
import UserAuction from './UserAuctionsScreen';
import UserHistory from './UserHistory';
import AdminLost from './AdminLostItem';
import AdminFound from './AdminFoundItem';
import AdminAuction from './AdminAuctionList';
import ExpiredItems from './AdminExpiredItemScreen';
import NotificationList from './NotificationsListScreen';
import MatchedItem from './AdminMatchedItem';
import UserLostItems from './UserLostItemScreen';

global.apiUrl = 'http://192.168.1.10/Missing_Items/api/';
global.imgUrl = 'http://192.168.1.10/Missing_Items/';

export default function App() {
  return <MainFile />;
}
