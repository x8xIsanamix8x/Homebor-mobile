import { StyleSheet } from 'react-native';

const globalStyles = StyleSheet.create({
    contenedor: {
		flex: 1,
	},
	contenido: {
		flexDirection: 'column',
		justifyContent: 'center',
		marginHorizontal: '2.5%',
		flex: 1
	},
	contentcontainer : {
		paddingVertical: 0,
		paddingBottom: 0
	},
	titulo: {
		textAlign: 'center',
		marginBottom: 20,
		fontSize: 32,
		fontWeight: 'bold',
		color: '#000000'
	},
	input: {
		backgroundColor: '#FFF',
		marginBottom: 30
	},
	boton: {
		backgroundColor: '#982A72',
		marginTop: 10
	},
	botonTexto:{
		flex: 1,
		textTransform: 'uppercase',
		fontWeight: 'bold',
		color: '#FFF'
	},
	//TextOnPressInLogin
	createaccount:{
		color: '#232159',
		marginTop: 30,
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: 18,
		textTransform: 'uppercase'
		
		
	},
	banner: {
		height:300,
		flex: 1,
		marginBottom: 20,
		overflow: 'hidden',
		borderWidth: 1,
	},
	homebor: {
		height:90,
		flex: 1,
		marginTop: 20
	},

	//PROFILE HOMESTAY:

	hr: {
		borderBottomColor: 'black',
		borderBottomWidth: 1,
		marginRight: 10,
		marginLeft: 10
	},
	infomaintitle: {
		fontSize: 30,
		marginBottom: 20
	},
	infotitle: {
		fontSize: 20,
		marginBottom: 10,
		marginLeft: 10,
		marginTop: 10,
	},
	infosubtitle: {
		fontWeight: 'bold', 
		
	},
	infocol2left: {
		marginBottom: 10,
		marginLeft: 10,
		marginTop: 10,
	},
	infocol2right: {
		marginBottom: 10,
		marginLeft: '60%',
		marginTop: -55,
	},
	image: {
		marginTop: 10,
		marginLeft: 10,
		width: '90%',
		height: 150
	},
	infoadditional: {
		marginLeft: 10,
		marginTop: 10,
		width: '92%',
		marginBottom: 2,
	},
	CircleShape: {
		width: 10,
		height: 10,
		borderRadius: 150 / 2,
		backgroundColor: 'blue',
		marginTop: 10,
		marginLeft: 10,
	},
	checked: {
		marginTop: -16,
		marginLeft: 22 
	},
	botoninfo: {
		backgroundColor: '#982A72',
		height:30,
		marginTop: 20,
		flexDirection: 'row',
		alignItems: 'flex-end',
		marginBottom: 20,
		marginLeft: '50%',
	},
	botonTextoinfo:{
		textTransform: 'uppercase',
		fontWeight: 'bold',
		color: '#FFF',
		flexDirection: 'row',
		alignItems: 'flex-end',
	},

	// Header global:

	containerheader: {
		backgroundColor: 'red',
		paddingTop: 60,
		paddingVertical: 50,
		flexDirection: 'row',
	},
	contentheader : {
		flex : 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignContent: 'center',
	},
	textheader : {
		color: 'white',
		textAlign: 'center'
	}

});

export default globalStyles;