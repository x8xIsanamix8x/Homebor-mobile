import { createStackNavigator } from 'react-navigation-stack';
import Notifications from '../screens/notifications';


const screens = {
	Notifications: {
		screen: Notifications,
		navigationOptions: {
			title: 'Notification'
		}
	},
}

const NotificationStack = createStackNavigator(screens, {
	defaultNavigationOptions: {
		headerTintColor: 'white',
		headerStyle: {backgroundColor: 'purple', height: 60}
	}
});

export default NotificationStack;