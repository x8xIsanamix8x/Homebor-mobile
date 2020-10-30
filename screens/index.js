import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import { globalStyles } from '../styles/global';
import Navigator from '../routes/drawer';

export default function Index({ navigation }) {

	const pressHandler = () => {
		navigation.goBack();
	}

	return(
		<Navigator />
		)
}

