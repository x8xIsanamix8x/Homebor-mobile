import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Home from '../screens/home';
import Register from '../screens/register';
import Index from '../screens/index';

const screens = {
	Home: {
		screen: Home,
		navigationOptions: {
			title: '',
			headerStyle: {backgroundColor: '#ffffff', height: 0}
		}
	},
	Register: {
		screen: Register,
		navigationOptions: {
			title: 'Register'
		}
	},
	Index: {
		screen: Index,
		navigationOptions: {
			title: 'Homebor',
		}
	}
}

const HomeStack = createStackNavigator(screens, {
	defaultNavigationOptions: {
		headerTintColor: 'white',
		headerStyle: {backgroundColor: 'purple', height: 60}
	}
});

export default createAppContainer(HomeStack);