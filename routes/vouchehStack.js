import { createStackNavigator } from 'react-navigation-stack';
import Voucheh from '../screens/voucherHome';


const screens = {
	Voucheh: {
		screen: Voucheh,
		navigationOptions: {
			title: 'Vouche Homestay'
		}
	},
}

const VouchehStack = createStackNavigator(screens, {
	defaultNavigationOptions: {
		headerTintColor: 'white',
		headerStyle: {backgroundColor: 'purple', height: 60}
	}
});

export default VouchehStack;