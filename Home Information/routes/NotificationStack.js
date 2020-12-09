import { createStackNavigator } from 'react-navigation-stack';
import Notification from '../screens/Notifications';

const screens = {
	Notification: {
		screen: Notification,
		navigationOptions: {
			title: 'Your Notification'
		}
	},
}

const NotificationStack = createStackNavigator(screens, {
	defaultNavigationOptions: {
		headerTintColor: 'white',
		headerStyle: {backgroundColor: 'purple', height: 80}
	}
});

export default NotificationStack;