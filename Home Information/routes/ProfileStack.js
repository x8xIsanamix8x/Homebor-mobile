import { createStackNavigator } from 'react-navigation-stack';
import Profile from '../screens/Profile';

const screens = {
	Profile: {
		screen: Profile,
		navigationOptions: {
			title: 'Your Profile'
		}
	},
}

const ProfileStack = createStackNavigator(screens, {
	defaultNavigationOptions: {
		headerTintColor: 'white',
		headerStyle: {backgroundColor: 'purple', height: 80}
	}
});

export default ProfileStack;