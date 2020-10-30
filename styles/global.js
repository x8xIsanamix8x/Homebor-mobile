import {StyleSheet} from 'react-native';

export const globalStyles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20
	},
	titleText: {
		fontFamily: 'nunito-bold',
		fontSize: 18,
		color: '#333'
	},
	paragraph: {
		marginVertical: 8,
		lineHeight: 20,
	},
	contenedor: {
		flex: 1,
	},
	banner: {
		height:200,
		flex: 1,
		marginBottom: 20,
		overflow: 'hidden',
		borderWidth: 1,
	},
	homebor: {
		height:80,
		flex: 1,
		marginTop: 20
	},
	contenido: {
		flexDirection: 'column',
		justifyContent: 'center',
		marginHorizontal: '2.5%',
		flex: 1
	},
	input: {
		backgroundColor: '#FFF',
		marginBottom: 40
	},
	boton: {
		backgroundColor: '#982A72',
		height:30,
		width: 100,
		marginTop: -10,
		flexDirection: 'row',
		alignItems: 'flex-end',
		fontFamily: 'roboto-regular',
		marginLeft: 100,
		justifyContent: 'center'
	},
	botonTexto:{
		textTransform: 'uppercase',
		fontWeight: 'bold',
		color: '#FFF',
		flexDirection: 'row',
		alignItems: 'flex-end',
	},
	createaccount:{
		color: '#232159',
		marginTop: 30,
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: 18,
		textTransform: 'uppercase'
		
		
	},
});