import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';

import CalendarStack from './calendarStack';
import NotificationStack from './notificationStack';
import VouchehStack from './vouchehStack';


const RootDrawerNavigator = createDrawerNavigator({
	Calendar: {
		screen: CalendarStack,
		
	},
	Notifications: {
		screen: NotificationStack,
		
	},
	Certifieds: {
		screen: VouchehStack,
		
	},
});

export default createAppContainer(RootDrawerNavigator);