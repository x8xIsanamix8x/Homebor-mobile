import { createStackNavigator } from 'react-navigation-stack';
import Calendar from '../screens/Calendar';

const screens = {
	Calendar: {
		screen: Calendar,
		navigationOptions: {
			title: 'Calendar Homebor'
		}
	},
}

const CalendarStack = createStackNavigator(screens, {
	defaultNavigationOptions: {
		headerTintColor: 'white',
		headerStyle: {backgroundColor: 'purple', height: 60}
	}
});

export default CalendarStack;