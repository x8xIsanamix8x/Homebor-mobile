import { Row } from 'native-base';
import { StyleSheet, Platform, Dimensions } from 'react-native';
import { marginBottom } from 'styled-system';
import Background from '../assets/img/backgrounds/backgroundNotification.png';


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
	contenidoLogin: {
		flexDirection: 'column',
		justifyContent: 'center',
		marginHorizontal: '2.5%',
		flex: 1,
		marginLeft : '8%',
		marginRight : '8%',
	},
	viewCrearCuenta: {
		marginTop : '10%'
	},
	formcontrolCrearCuenta: {
		marginTop : '10%'
	},
	pickerviewCrearCuenta: {
		marginTop : '-10%'
	},
	pickerCrearCuenta: {
		height: 100, 
		width: (Platform.OS === 'android') ? '70%' : '60%', 
		marginLeft: (Platform.OS === 'android') ? '25%' : '20%', 
		marginTop: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '5%' : '-10%' : (Dimensions.get('window').width >= 414) ? '5%' : 0, 
		marginBottom: (Platform.OS === 'ios') ? 100 : 0
	},
	contenidoCrearCuenta: {
		flexDirection: 'column',
		justifyContent: 'center',
		marginHorizontal: '10.5%',
		flex: 1
	},
	contentcontainer : {
		paddingVertical: 0,
		paddingBottom: 0
	},
	titulo: {
		textAlign: 'center',
		marginBottom: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 20 : 10 : 20,
		fontSize: 32,
		fontWeight: 'bold',
		color: '#000000'
	},
	tituloCrearCuenta: {
		fontSize: 24,
		fontWeight: 'bold',
		color: '#000000'
	},
	tituloCrearCuenta2: {
		marginBottom: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 20 : 10 : 20,
		marginTop: '-2%',
		fontSize: 24,
		fontWeight: 'bold',
		color: '#000000'
	},
	titulobasic: {
		textAlign: 'center',
		marginBottom: 20,
		fontSize: 32,
		fontWeight: 'bold',
		color: '#000000',
		marginTop: 20
	},
	input: {
		marginBottom: 30,
	},
	inputpassword: {
		marginBottom: 30,
		backgroundColor: '#fff'
	},
	inputCrearCuenta: {
		backgroundColor: '#FFF',
		fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 18
	},

	botonCrearCuenta: {
		backgroundColor: '#982A72',
		marginTop: (Platform.isPad === true) ? 100 :(Dimensions.get('window').width >= 414) ? 100 : 10,
		marginBottom: '10%'
	},
	boton: {
		backgroundColor: '#982A72',
		marginTop: (Platform.isPad === true) ? '5%' : (Dimensions.get('window').width >= 414) ? '5%' : '10%',
		marginLeft : '15%',
		marginRight : '15%',
	},
	CardCreateAccount : {
		marginLeft: Platform.OS === 'ios' ? '3%' : '8%',
		marginRight: Platform.OS === 'ios' ? '3%' : '8%',
	},
	botonTexto:{
		flex: 1,
		textTransform: 'uppercase',
		fontWeight: 'bold',
		color: '#FFF',
		textAlign: 'center',
		fontSize: (Platform.isPad === true) ? 20 : (Dimensions.get('window').width >= 414) ? 20 : 18
	},
	//TextOnPressInLogin
	errormessageEmailLogin : {
		marginTop: '-7%'
	},
	errormessagePasswordLogin : {
		marginTop: '-7%', marginBottom: '2%'
	},
	viewbannerLogin : {
		flexDirection: 'row',
		marginTop : (Platform.isPad === true) ? '0%' : (Dimensions.get('window').width >= 414) ? '0%' : '8%'
	},
	viewLogoLogin : {
		flexDirection: 'row', 
		marginLeft : '2%', 
		marginRight : '2%', 
		marginBottom : '20%'
	},
	inputLogin : {
		fontSize: (Platform.isPad === true) ? 20 : (Dimensions.get('window').width >= 414) ? 22 : 18
	},
	createaccount:{
		color: '#232159',
		marginTop: '20%',
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 18,
		textTransform: 'uppercase'	
	},
	createaccountForgotPassword:{
		color: '#232159',
		marginTop: '-2%',
		textAlign: 'right',
		fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 14,
		textTransform: 'uppercase'	
	},
	createaccountButton:{
		color: 'white',
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 18,
		textTransform: 'uppercase'
		
		
	},
	banner: {
		height: (Platform.isPad === true) ? 470 : (Dimensions.get('window').width >= 414) ? 470 : 300,
		flex: 1,
		marginBottom: 20,
		overflow: 'hidden',
	},
	
	homebor: {
	
		height:'250%',
		flex: 1,
		marginBottom: '10%',
		
		
	},
	cardrooms:{
		
		width: 314,
		marginTop: 1,
		marginLeft: 4,
		marginBottom: 1,
	},

	//PROFILE HOMESTAY:
	profiledirtitleMainCity : {
		textAlign : (Platform.isPad === true) ? 'left' : (Dimensions.get('window').width >= 414) ? 'left' : 'center',
		marginBottom: (Platform.isPad === true) ? null : (Dimensions.get('window').width >= 414) ? 0 : '5%',
		marginLeft: (Platform.isPad === true) ? '15%' : (Dimensions.get('window').width >= 414) ? '15%' : null,
	},
	profiledirtitleDirection : {
		textAlign : (Platform.isPad === true) ? 'left' : (Dimensions.get('window').width >= 414) ? 'left' : 'center',
		marginBottom: (Platform.isPad === true) ? null : (Dimensions.get('window').width >= 414) ? 0 : '5%',
		marginLeft: (Platform.isPad === true) ? '52%' : (Dimensions.get('window').width >= 414) ? '52%' : null,
		marginTop: (Platform.isPad === true) ? '-3%' : (Dimensions.get('window').width >= 414) ? '-3%' : null,
	},
	profiledirtitleCity : {
		textAlign : (Platform.isPad === true) ? 'left' : (Dimensions.get('window').width >= 414) ? 'left' : 'center',
		marginBottom: (Platform.isPad === true) ? null : (Dimensions.get('window').width >= 414) ? 0 : '5%',
		marginLeft: (Platform.isPad === true) ? '15%' : (Dimensions.get('window').width >= 414) ? '15%' : null,
		marginTop: (Platform.isPad === true) ? '3%' : (Dimensions.get('window').width >= 414) ? '3%' : null,
		
	},
	profiledirtitleState : {
		textAlign : (Platform.isPad === true) ? 'left' : (Dimensions.get('window').width >= 414) ? 'left' : 'center',
		marginBottom: (Platform.isPad === true) ? null : (Dimensions.get('window').width >= 414) ? 0 : '5%',
		marginLeft: (Platform.isPad === true) ? '52%' : (Dimensions.get('window').width >= 414) ? '52%' : null,
		marginTop: (Platform.isPad === true) ? '-3%' : (Dimensions.get('window').width >= 414) ? '-3%' : null,
	},
	profiledirtitleP_code : {
		textAlign : 'center',
		marginBottom: '5%',
		marginTop: (Platform.isPad === true) ? '5%' : (Dimensions.get('window').width >= 414) ? '5%' : null,

	},
	Viewprofiletitles : {
		flexDirection: 'row',
		marginBottom: (Platform.isPad === true) ? '5%' : (Dimensions.get('window').width >= 414) ? '5%' : null,
	},
	titleiconLocProfile: {
		height: (Platform.isPad === true) ? '80%' : (Dimensions.get('window').width >= 414) ? '80%' : '60%',
		width: (Platform.isPad === true) ? '80%' : (Dimensions.get('window').width >= 414) ? '80%' : '60%',
		marginLeft: (Platform.isPad === true) ? '-35%' : (Dimensions.get('window').width >= 414) ? '-35%' : '35%', 
	},
	profileMargins: {
		marginLeft: '5%',
		marginRight : '5%',
	},
	profileadditionalMargins: {
		marginHorizontal: 18,
        marginVertical: 10,
	},
	profileBanner : {
		width: '100%',
		marginBottom: '5%'
	
	},
	h_nameNativeBase : {
		fontWeight : "bold", 
		fontSize : (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 18, 
	},
	roomvarNativeBase : {
		fontSize : (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 16, 
		textAlign: 'center',
	},
	numvarNativeBase : {
		fontSize : (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 16, 
		textAlign: 'center',
	},
	roomNativeBase : {
		fontWeight : "bold", 
		fontSize : (Platform.isPad === true) ? 22 :(Dimensions.get('window').width >= 414) ? 22 : 16, 
	},
	numNativeBase : {
		fontWeight : "bold", 
		fontSize : (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 16, 
	},
	h_name : {
		fontWeight : "bold", 
		fontSize : (Platform.isPad === true) ? 23 : (Dimensions.get('window').width >= 414) ? 23 : 18, 
		textAlign: 'center',
		marginBottom: '10%',
	},
	room : {
		fontWeight : "bold", 
		fontSize : (Platform.isPad === true) ? 22 :(Dimensions.get('window').width >= 414) ? 22 : 16, 
		textAlign: 'center',
		marginLeft : '10%',
		textAlign: 'left',
	},
	roomvar : {
		fontSize : (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 16, 
		textAlign: 'center',
		marginLeft : '15%',
		textAlign: 'left',
	},
	num : {
		fontWeight : "bold", 
		fontSize : (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 16, 
		textAlign: 'right',
		marginRight: '10%', 
		marginTop: (Platform.isPad === true) ? '-5%' : (Dimensions.get('window').width >= 414) ? '-5%' : '-11%',
	},
	numvar : {
		fontSize : (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 16, 
		textAlign: 'center',
		marginTop: (Platform.isPad === true) ? '-2%' : (Dimensions.get('window').width >= 414) ? '-2%' : '-5%',
		textAlign: 'right',
		marginRight: '15%',
		marginBottom: '5%', 
	},
	profiledirtitle : {
		textAlign : 'center',
		marginBottom: '5%',
	},
	profiledirtitle2 : {
		textAlign : 'left',
		marginBottom: '5%',
	},
	hr: {
		borderBottomColor: 'black',
		borderBottomWidth: 1,
		marginRight: 10,
		marginLeft: 10
	},

	hrVoucher: {
		borderBottomColor: 'black',
		borderBottomWidth: 1,
		marginLeft: '-15%',
		marginTop : '3%',
		marginBottom : '3%',
	},
	infomaintitle: {
		fontSize: 30,
		marginBottom: 20
	},
	infotitleNativeBase: {
		fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 16,
		fontWeight: 'bold',
		color : '#000000',
	},
	infotitle: {
		fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 16,
		marginBottom: 10,
		marginLeft: 10,
		marginTop: 10,
		fontWeight: 'bold',
		color : '#000000'
	},
	infotitleLawNativeBase : {
		fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 16,
		marginBottom: '3%',
		fontWeight: 'bold',
		color : 'blue'
	},
	infotitleLaw: {
		fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 16,
		marginBottom: 10,
		marginLeft: 10,
		marginTop: 10,
		fontWeight: 'bold',
		color : 'blue'
	},
	infotitlePetchecked: {
		fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 16,
		marginBottom:(Platform.isPad === true) ? '5%' : (Dimensions.get('window').width >= 414) ? '5%' : 10,
		marginLeft: 10,
		marginTop: 10,
		fontWeight: 'bold',
	},
	infotitleSpecialDiet : {
		fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 16,
		marginBottom: (Platform.isPad === true) ? '5%' : (Dimensions.get('window').width >= 414) ? '5%' : 10,
		marginLeft: (Platform.isPad === true) ? '40%' : (Dimensions.get('window').width >= 414) ? '40%' : 10,
		marginTop: 10,
		fontWeight: 'bold',
		fontSize : (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 14,
	},
	infotitleLabels : {
		fontSize: (Platform.isPad === true) ? 20 : (Dimensions.get('window').width >= 414) ? 20 : 16,
		marginBottom: 10,
		marginLeft: 10,
		marginTop: 10,
		fontWeight: 'bold',
	},
	infotitle2: {
		fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 16,
		marginBottom: 10,
		marginLeft: 10,
		marginTop: 10,
		fontWeight: 'bold',
		textAlign: 'center'
	},
	varProfile: {
		fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 16,
	},
	infosubtitle: {
		fontWeight: 'bold',
		fontSize : (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : null 
		
	},
	infosubtitlewhite: {
		fontWeight: 'bold',
		fontSize : (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : null, 
		color : '#fff'
	},
	infosubtitlewhite2: {
		fontSize : (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : null, 
		color : '#fff'
	},
	infosubtitlegray: {
		fontSize : (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 11, 
		color : '#FFFFFF'
	},
	infocol2left: {
		marginBottom: 10,
		marginLeft: 10,
		marginTop: 10,
	},
	imageprofile: {
		marginTop: 10,
		marginLeft: (Platform.isPad === true) ? 40 : (Dimensions.get('window').width >= 414) ? 40 : 10,
		width: '90%',
		height: (Platform.isPad === true) ? 250 : (Dimensions.get('window').width >= 414) ? 250 : 150
	},
	imageprofileBanner: {
		marginTop: '8%',
		marginLeft: (Platform.isPad === true) ? 40 : (Dimensions.get('window').width >= 414) ? 40 : 10,
		width: '90%',
		height: (Platform.isPad === true) ? 250 : (Dimensions.get('window').width >= 414) ? 250 : 150,
		marginBottom: '8%',
	},
	showsliderProfile : {
		height : (Platform.isPad === true) ? 250 : (Dimensions.get('window').width >= 414) ? 250 : 150,
		marginBottom : 0,
		
	  },
	infoadditional: {
		marginLeft: 10,
		marginTop: 10,
		width: '92%',
		marginBottom: 2,
	},
	infoadditionalAgepre: {
		marginLeft: (Platform.isPad === true) ? '50%' : (Dimensions.get('window').width >= 414) ? '50%' : 10,
		marginTop: (Platform.isPad === true) ? '-8%' : (Dimensions.get('window').width >= 414) ? '-8%' : 10,
		width: '92%',
	},
	
	infoadditionalMealsS: {
		marginLeft: (Platform.isPad === true) ? '50%' : (Dimensions.get('window').width >= 414) ? '50%' : 10,
		marginTop: (Platform.isPad === true) ? '-17%' : (Dimensions.get('window').width >= 414) ? '-17%' : 10,
		marginBottom: (Platform.isPad === true) ? '9%' : (Dimensions.get('window').width >= 414) ? '9%' : null,
		width: '92%',
	},
	infoadditionalNumpets: {
		marginLeft: (Platform.isPad === true) ? '50%' : (Dimensions.get('window').width >= 414) ? '50%' : 10,
		marginTop: (Platform.isPad === true) ? '-8%' : (Dimensions.get('window').width >= 414) ? '-8%' : 10,
		width: '92%',
	},
	infoadditionalLastNameMain : {
		marginLeft: (Platform.isPad === true) ? '50%' : (Dimensions.get('window').width >= 414) ? '50%' : 10,
		marginTop: (Platform.isPad === true) ? '-8%' : (Dimensions.get('window').width >= 414) ? '-8%' : 10,
		width: '92%',
	},
	infoadditionalGenderFamily : {
		marginLeft: (Platform.isPad === true) ? '50%' : (Dimensions.get('window').width >= 414) ? '50%' : 10,
		marginTop: (Platform.isPad === true) ? '-8%' : (Dimensions.get('window').width >= 414) ? '-8%' : 10,
		width: '92%',
	},
	infoadditionalOccupationFamily : {
		marginLeft: (Platform.isPad === true) ? '50%' : (Dimensions.get('window').width >= 414) ? '50%' : 10,
		marginTop: (Platform.isPad === true) ? '-8%' : (Dimensions.get('window').width >= 414) ? '-8%' : 10,
		width: '92%',
	},
	infoadditionalGenderMainInfo : {
		marginLeft: (Platform.isPad === true) ? '50%' : (Dimensions.get('window').width >= 414) ? '50%' : 10,
		marginTop: (Platform.isPad === true) ? '-8%' : (Dimensions.get('window').width >= 414) ? '-8%' : 10,
		width: '92%',
	},
	infoadditionalOccupationMainInfo : {
		marginLeft: (Platform.isPad === true) ? '50%' : (Dimensions.get('window').width >= 414) ? '50%' : 10,
		marginTop: (Platform.isPad === true) ? '-8%' : (Dimensions.get('window').width >= 414) ? '-8%' : 10,
		width: '92%',
	},
	infoadditionalLastnamefamilyprofile : {
		marginLeft: (Platform.isPad === true) ? '50%' : (Dimensions.get('window').width >= 414) ? '50%' : 10,
		marginTop: (Platform.isPad === true) ? '-8%' : (Dimensions.get('window').width >= 414) ? '-8%' : 10,
		width: '92%',
	},
	infoadditionalChecked: {
		marginTop: 10,
		width: '92%',
		marginBottom: '5%',
	},
	CircleShape: {
		width: (Platform.isPad === true) ? 20 : (Dimensions.get('window').width >= 414) ? 20 : 10,
		height: (Platform.isPad === true) ? 20 : (Dimensions.get('window').width >= 414) ? 20 : 10,
		borderRadius: 150 / 2,
		backgroundColor: '#982A72',
		marginTop: 10,
		marginLeft: 10,
		borderColor: "black", 
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
	shadowbox : {
		shadowColor: "#232159",
		shadowOffset: {
			width: 0,
			height: 12,
		},
		shadowOpacity: 0.58,
		shadowRadius: 16.00,

		elevation: 24,
		},
	
	infosubtitle2 : {
		fontSize : 17,
	},

	underlinig : {
		borderBottomColor: '#232159',
        borderBottomWidth: 2,
	},

	show : {},

	showphoto : {
		marginBottom: '2%'
	},

	hideContents : {
		opacity : 0,
		height: 0,
	},
	botoneditProfile: {
		backgroundColor: '#982A72',
		marginTop: 10,
		marginBottom: '10%',
		width: '50%',
		marginLeft: '25%', 
	},
	botoneditProfileNativeBase: {
		backgroundColor: '#982A72',
		marginBottom: '10%',
		width: '50%',
	},
	titlegalleryedit : {
		fontWeight : "bold", 
		fontSize : (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 18, 
		textAlign: 'center'
	},
	ImageGalleryedit : {
		width: (Platform.isPad === true) ? 240 : (Dimensions.get('window').width >= 414) ? 240 : 200, 
		height: (Platform.isPad === true) ? 240 : (Dimensions.get('window').width >= 414) ? 240 : 200, 
		backgroundColor: "#DDDDDD"
	},
	petinfoProfile: {
		marginTop : '5%',
	},
	editiconProProfile: {
		height: (Platform.isPad === true) ? '80%' : (Dimensions.get('window').width >= 414) ? '80%' : '60%',
		width: (Platform.isPad === true) ? '80%' : (Dimensions.get('window').width >= 414) ? '80%' : '60%',
		marginLeft: (Platform.isPad === true) ? '37%' : (Dimensions.get('window').width >= 414) ? '37%' : '15%', 
	},
	editiconProEditProperty: {
		height: (Platform.isPad === true) ? '80%' : (Dimensions.get('window').width >= 414) ? '80%' : '60%',
		width: (Platform.isPad === true) ? '80%' : (Dimensions.get('window').width >= 414) ? '80%' : '60%',
		marginLeft: (Platform.isPad === true) ? '-37%' : (Dimensions.get('window').width >= 414) ? '-37%' : '20%', 
	},
	editiconPetProfile: {
		height: (Platform.isPad === true) ? '80%' : (Dimensions.get('window').width >= 414) ? '80%' : '60%',
		width: (Platform.isPad === true) ? '80%' : (Dimensions.get('window').width >= 414) ? '80%' : '60%',
		marginLeft: (Platform.isPad === true) ? '35%' : (Dimensions.get('window').width >= 414) ? '35%' : '10%', 
	},
	editiconAddProfile: {
		height: (Platform.isPad === true) ? '80%' : (Dimensions.get('window').width >= 414) ? '80%' : '60%',
		width: (Platform.isPad === true) ? '80%' : (Dimensions.get('window').width >= 414) ? '80%' : '60%',
		marginLeft: (Platform.isPad === true) ? '27%' : (Dimensions.get('window').width >= 414) ? '27%' : '-10%', 
	},
	editiconLocProfile: {
		height: (Platform.isPad === true) ? '80%' : (Dimensions.get('window').width >= 414) ? '80%' : '60%',
		width: (Platform.isPad === true) ? '80%' : (Dimensions.get('window').width >= 414) ? '80%' : '60%',
		marginLeft: (Platform.isPad === true) ? '45%' : (Dimensions.get('window').width >= 414) ? '45%' : '35%', 
	},
	editiconLocGallery: {
		height: (Platform.isPad === true) ? '80%' : (Dimensions.get('window').width >= 414) ? '80%' : '60%',
		width: (Platform.isPad === true) ? '80%' : (Dimensions.get('window').width >= 414) ? '80%' : '60%',
		marginLeft: (Platform.isPad === true) ? '-36%' : (Dimensions.get('window').width >= 414) ? '-36%' : '40%', 
	},
	editiconLocAdditional: {
		height: (Platform.isPad === true) ? '80%' : (Dimensions.get('window').width >= 414) ? '80%' : '60%',
		width: (Platform.isPad === true) ? '80%' : (Dimensions.get('window').width >= 414) ? '80%' : '60%',
		marginLeft: (Platform.isPad === true) ? '-35%' : (Dimensions.get('window').width >= 414) ? '-35%' : '-5%', 
	},
	editiconLocPet: {
		height: (Platform.isPad === true) ? '80%' : (Dimensions.get('window').width >= 414) ? '80%' : '60%',
		width: (Platform.isPad === true) ? '80%' : (Dimensions.get('window').width >= 414) ? '80%' : '60%',
		marginLeft: (Platform.isPad === true) ? '-35%' : (Dimensions.get('window').width >= 414) ? '-35%' : '10%', 
	},
	editiconLocMyInfo: {
		height: (Platform.isPad === true) ? '80%' : (Dimensions.get('window').width >= 414) ? '80%' : '60%',
		width: (Platform.isPad === true) ? '80%' : (Dimensions.get('window').width >= 414) ? '80%' : '60%',
		marginLeft: (Platform.isPad === true) ? '-35%' : (Dimensions.get('window').width >= 414) ? '-35%' : '15%', 
	},
	editiconLocFamilyInfo: {
		height: (Platform.isPad === true) ? '80%' : (Dimensions.get('window').width >= 414) ? '80%' : '60%',
		width: (Platform.isPad === true) ? '80%' : (Dimensions.get('window').width >= 414) ? '80%' : '60%',
		marginLeft: (Platform.isPad === true) ? '-35%' : (Dimensions.get('window').width >= 414) ? '-35%' : '2%', 
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
	},

	// Rooms Style:
	titleRooms: {
		fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 20,
		marginBottom: '1%',
		justifyContent: 'center',
		fontWeight: 'bold',
	},
	titleRoomsNativeBase: {
		fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 20,
		fontWeight: 'bold',
	},
	priceRooms1NativeBase : {
		fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 20,
		color : 'green',
		fontWeight: 'bold',
	},
	priceRooms1 : {
		fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 20,
		marginBottom: '1%',
		textAlign : 'right',
		marginTop : (Platform.isPad === true) ? '-7%' : (Dimensions.get('window').width >= 414) ? '-7%' : '-10%',
		color : 'green',
		fontWeight: 'bold',
	},
	imageroom6: {
		width: (Platform.isPad === true) ? 229 : (Dimensions.get('window').width >= 414) ? 229 :  129,
		height: (Platform.isPad === true) ? 229 : (Dimensions.get('window').width >= 414) ? 229 : 129,
		marginTop : -10
	  },
	  imageroom6NativeBase: {
		width : "100%",
		height : "100%",
	  },
	  imageroom6empty: {
		width: (Platform.isPad === true) ? 229 : (Dimensions.get('window').width >= 414) ? 229 :  129,
		height: (Platform.isPad === true) ? 229 : (Dimensions.get('window').width >= 414) ? 229 : 109,
	  },
	  showsliderRoompreview : {
		height : 109,
		marginTop : 20
	  },
	showsliderRoompreviewNativeBase : {
		height :(Dimensions.get('window').width >= 414) ? 229 : 109,
	},
	infocol2right: {
		marginBottom: '3%',
		marginLeft: (Platform.isPad === true) ? '15%' : '20%',
		marginTop: (Platform.isPad === true) ? '-5%' : (Dimensions.get('window').width >= 414) ? '-5%' : '-10%',
	},
	imageroom4: {
		width: (Platform.isPad === true) ? 48 : (Dimensions.get('window').width >= 414) ? 48 :  28,
		height: (Platform.isPad === true) ? 43 : (Dimensions.get('window').width >= 414) ? 43 : 23,
		top: (Platform.isPad === true) ? -120 : (Dimensions.get('window').width >= 414) ? -120 : -40,
		marginLeft : (Platform.isPad === true) ? '-10%' : (Dimensions.get('window').width >= 414) ? '-10%' : null
	  },
	  shareAcomodation: {
		top: (Platform.isPad === true) ? -145 : (Dimensions.get('window').width >= 414) ? -145 : -50,
		marginLeft : (Platform.isPad === true) ? '-10%' : (Dimensions.get('window').width >= 414) ? '-10%' : null,
		position: "absolute",
		color: "#121212",
		height: 22,
		width: 114,
		fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 20 : 12
	  },
	  shareAcomodationStack: {
		width: 140,
		height: 22,
		marginTop: -10,
		left: 30,
	  },
	  TypeAcomodation: {
		color: "#121212",
		fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 20 : 14,
		marginLeft: 1,
		top: (Platform.isPad === true) ? -117 : (Dimensions.get('window').width >= 414) ? -117 : -38, 
		left: (Platform.isPad === true) ? 210 : (Dimensions.get('window').width >= 414) ? 210 : 110
	  },
	  TypeAcomodationNativeBase: {
		color: "#121212",
		fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 20 : 14,
	  },
	  imageroom5: {
		width: (Platform.isPad === true) ? 48 : (Dimensions.get('window').width >= 414) ? 48 : 28,
		height: (Platform.isPad === true) ? 41 : (Dimensions.get('window').width >= 414) ? 41 : 21,
		marginTop: (Platform.isPad === true) ? -90 : (Dimensions.get('window').width >= 414) ? -90 : -35,
		marginLeft : (Platform.isPad === true) ? '-10%' : (Dimensions.get('window').width >= 414) ? '-10%' : null
	  },
	  imageroom5BedFilter: {
		width: (Platform.isPad === true) ? 48 : (Dimensions.get('window').width >= 414) ? 48 : 28,
		height: (Platform.isPad === true) ? 41 : (Dimensions.get('window').width >= 414) ? 41 : 21,
	  },
	  imageroom5AvalibleFilter: {
		width: (Platform.isPad === true) ? 48 : (Dimensions.get('window').width >= 414) ? 48 : 28,
		height: (Platform.isPad === true) ? 41 : (Dimensions.get('window').width >= 414) ? 41 : 21,
	  },
	  bedStack: {
		marginLeft: '40%',
		marginTop: (Platform.isPad === true) ? '-16%' : (Dimensions.get('window').width >= 414) ? '-16%' : '-14%',
		marginBottom : '20%',
	  },
	  bed: {
		top: (Platform.isPad === true) ? -40 : (Dimensions.get('window').width >= 414) ? -40 : -20,
		left: (Platform.isPad === true) ? 20 : (Dimensions.get('window').width >= 414) ? 20 :  30,
		position: "absolute",
		color: "#121212",
		height: 25,
		width: 127,
		fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 20 : 12
	  },
	  imageroom3: {
		width: (Platform.isPad === true) ? 48 : (Dimensions.get('window').width >= 414) ? 48 : 28,
		height: (Platform.isPad === true) ? 41 : (Dimensions.get('window').width >= 414) ? 41 : 21,
		marginTop: (Platform.isPad === true) ? -40 : (Dimensions.get('window').width >= 414) ? -40 : -22,
		left: (Platform.isPad === true) ? 160 : (Dimensions.get('window').width >= 414) ? 160 : 85,
	  },
	  disponibility: {
		top: (Platform.isPad === true) ? -38 : (Dimensions.get('window').width >= 414) ? -38 : -18,
		left: (Platform.isPad === true) ? 210 : (Dimensions.get('window').width >= 414) ? 210 : 110,
		position: "absolute",
		color: "#121212",
		height: 25,
		width: (Platform.isPad === true) ? 110 : (Dimensions.get('window').width >= 414) ? 110 : 49,
		fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 20 : 11
	  },
	  mealservice: {
		top: (Platform.isPad === true) ? -38 : (Dimensions.get('window').width >= 414) ? -38 : -18,
		left: (Platform.isPad === true) ? 210 : (Dimensions.get('window').width >= 414) ? 210 : 110,
		position: "absolute",
		color: "#121212",
		fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 20 : 14
	  },

	containerRoom: {
		flex: 1,
		backgroundColor: "rgba(243,248,252,1)"
	  },
	  scrollArearoom: {
		flex: 1,
		backgroundColor: "rgba(248, 248, 248,1)",
		alignSelf: "center"
	  },
	  rect3Stackroom: {
		top: 55,
		left: 7,
		width: 363,
		height: 111,
		position: "absolute"
	  },
	  image6Row: {
		height: 109,
		flexDirection: "row",
		marginLeft: 4,
		marginRight: 14
	  },
	  rect3Stack: {
		top: 55,
		left: 7,
		width: 363,
		height: 111,
		position: "absolute"
	  },
	  rooms1: {
		color: "#121212",
		height: 20,
		width: 156,
		textAlign: "center",
		marginLeft: 16
	  },
	  rooms1Column: {
		width: 202,
		marginLeft: 12,
		marginTop: 7
	  },
	  imagesroom4Row: {
		height: 26,
		flexDirection: "row",
		marginTop: 14
	  },
	  
	  rectroom3Stack: {
		top: 55,
		left: 7,
		width: 363,
		height: 111,
		position: "absolute"
	  },
	  
	  imageroom2: {
		top: (Platform.isPad === true) ? -120 : (Dimensions.get('window').width >= 414) ? -120 : -40,
		left: (Platform.isPad === true) ? 160 : (Dimensions.get('window').width >= 414) ? 160 : 85,
		width: (Platform.isPad === true) ? 48 : (Dimensions.get('window').width >= 414) ? 48 : 27,
		height: (Platform.isPad === true) ? 43 : (Dimensions.get('window').width >= 414) ? 43 :  19,
		position: "absolute",
		
	  },
	  imageroom2NativeBase: {
		width: (Platform.isPad === true) ? 48 : (Dimensions.get('window').width >= 414) ? 48 : 27,
		height: (Platform.isPad === true) ? 43 : (Dimensions.get('window').width >= 414) ? 43 :  19
	  },

	  bordercolorAvalible : {
		borderBottomColor: 'green',
		borderBottomWidth: 4,
		marginBottom: -10,
		marginLeft: -18,
		marginRight: -18,
		borderRadius: 2,
	  },

	  bordercolorOccupied : {
		borderBottomColor: 'red',
		borderBottomWidth: 4,
		marginBottom: -10,
		marginLeft: -18,
		marginRight: -18,
		borderRadius: 2,
	  },

	  buttonTextroom : {
		fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 16,
		fontWeight: 'bold',
		color: '#000000',
		textAlign: 'center',
		marginTop : (Platform.isPad === true) ? '2%' : (Dimensions.get('window').width >= 414) ? '2%' : '3%',
	  },
	  buttonTextroom2 : {
		fontSize: 16,
		fontWeight: 'bold',
		color: '#000000',
		textAlign: 'center',
	  },

	  wrapperCollapsibleList : {
		marginTop: -20,
	  },
	  buttonroom : {
		height: (Platform.isPad === true) ? 55 : (Dimensions.get('window').width >= 414) ? 55 : 45,
	  },
	  arrowLeft : {
		fontSize : (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 16,
		color : 'black',
		fontWeight: 'bold',
	  },
	  roomocuppied : {
		textAlign: 'center',
		color: 'gray',
	  },
	  roomocuppiedName : {
		textAlign: 'center',
		fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 14,
	  },
	  roomocuppiedArrive : {
		fontWeight : "bold",
		color : "purple",
		textAlign : "left",
		fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : null,
	  },
	  roomocuppiedLeave : {
		fontWeight : "bold",
		color: "purple",
		textAlign: "right",
		marginTop: (Platform.isPad === true) ? -25 : (Dimensions.get('window').width >= 414) ? -25 : -15,
		fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : null,
	  },
	  roomocuppiedLeaveTitleFilter : {
		fontWeight : "bold",
		color: "purple",
		textAlign: "right",
		fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : null,
	  },
	  roomOcuppiedfilterTitleBed : {
		flexDirection: 'row', 
		justifyContent: 'flex-end', 
		marginTop: (Platform.isPad === true) ? -40 : (Dimensions.get('window').width >= 414) ? -40 : -23,
	  },
	  roomocuppiedStart : {
		textAlign : "left",
		fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : null,
	  },
	  roomocuppiedEnd: {
		textAlign: "right",
		marginTop: (Platform.isPad === true) ? -25 : (Dimensions.get('window').width >= 414) ? -25 : -15,
		fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : null,
	  },
	  marginBottonroom : {
		marginBottom : 30,
	  },
	  collapsibleItem : {
		borderBottomWidth: StyleSheet.hairlineWidth,
      	borderColor: "#CCC",
      	padding: 10,
	  },


	  //Spinner

	spinner : {
		flexDirection: 'column',
		justifyContent: 'center',
		flex: 1,
	},
	spinner2 : {
		marginTop : '60%',
	},
	spinner3 : {
		marginTop : '20%',
		marginRight : '30%',
	},
	slideroomPreview: {
		justifyContent: 'center',
	  },

	//hide content

	hide: {
		opacity : 0,
	},

	hide_collapsible : {
		opacity : 0,
		height : 0,
	},

	//Calendar
	calendarStudentArriveview : {
		marginLeft: (Platform.isPad === true) ? '-5%' : (Dimensions.get('window').width >= 414) ? '-5%' : 0,
	},
	calendarStudentArriveview2 : {
		marginLeft: (Platform.isPad === true) ? '-5%' : (Dimensions.get('window').width >= 414) ? '-5%' : 0,
		marginTop: (Platform.isPad === true) ? '-2%' : (Dimensions.get('window').width >= 414) ? '-2%' : '-3%'
	},
	calendarStudentLeaveview2 : {
		marginRight: (Platform.isPad === true) ? '10%' : (Dimensions.get('window').width >= 414) ? '10%' : 0,
		marginTop: (Platform.isPad === true) ? '-2%' : (Dimensions.get('window').width >= 414) ? '-2%' : '-3%'
	},
	calendarStudentLeaveview : {
		marginRight: (Platform.isPad === true) ? '10%' : (Dimensions.get('window').width >= 414) ? '10%' : 0
	},
	calendarAcademyAgencyview : {
		marginLeft : (Platform.OS === 'ios') ? (Platform.isPad === true) ? '23%' : '45%' : (Dimensions.get('window').width >= 414) ? '23%' : '45%', 
		marginTop : (Platform.OS === 'ios') ? (Platform.isPad === true) ? '0%' : '-2%' : (Dimensions.get('window').width >= 414) ? '0%' : '-2%', 
		marginBottom : '4%'
	},
	calendarAcademyAgencyview2 : {
		marginLeft : (Platform.OS === 'ios') ? (Platform.isPad === true) ? '23%' : '40%' : (Dimensions.get('window').width >= 414) ? '23%' : '40%', 
		marginTop : (Platform.OS === 'ios') ? (Platform.isPad === true) ? '0%' : '-2%' : (Dimensions.get('window').width >= 414) ? '0%' : '-2%', 
		marginBottom : '4%'
	},
	infosubtitleCalendar: {
		fontWeight: 'bold',
		color : '#232159',
		fontSize : (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : null, 
		textAlign : 'center',
	},
	infosubtitleCalendarNewDesing: {
		fontWeight: 'bold',
		color : '#fff',
		fontSize : (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : null, 
	},
	infosubtitleCalendar2: {
		color : '#232159',
		fontSize : (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : null, 
	},
	infosubtitleCalendarN:{
		fontWeight: 'bold',
		color : '#982A72',
		fontSize : (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : null, 
	},
	infosubtitleCalendarNNewDesing:{
		fontWeight: 'bold',
		color : '#fff',
		fontSize : (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : null, 
	},
	tableColumnTotalsCalendar : {
		alignItems: "center",
        flex: 2,
        justifyContent: "center",
        margin: 1	
	},
	eventTitle: {
		color : '#232159',
		textAlign: "center",
		fontWeight: 'bold',
		fontSize: 14,
	},
	calendarRoom: {
		color : '#232159',
		flexDirection: 'column',
		flex: 1,
		textAlign: "center",
		fontWeight: 'bold',
		fontSize: 14,
	},
	eventArrive1: {
		color : '#232159',
		marginLeft: 20,
		marginRight: 140,
		textAlign: "left",
		fontWeight: 'bold',
		fontSize: 14,
	},
	eventLeave1: {
		color : '#232159',
		marginRight: '-15%',
		textAlign: "right",
		fontWeight: 'bold',
		fontSize: 14,
	},
	eventStart1: {
		color : '#232159',
		textAlign: "left",
		fontWeight: 'bold',
		fontSize: 14,
		marginRight: '35%',
	},
	eventEnd1: {
		color : '#232159',
		textAlign: "right",
		fontWeight: 'bold',
		fontSize: 14,
		marginRight: '-35%',
	},
	eventAgencyname: {
		color : '#232159',
		textAlign: "left",
		fontWeight: 'bold',
		fontSize: 14,
		marginRight: '45%',
		marginLeft: '5%'
	},
	eventAcronym: {
		color : '#232159',
		textAlign: "left",
		fontWeight: 'bold',
		fontSize: 12,
	},
	eventAcademy: {
		color : '#232159',
		textAlign: "left",
		fontWeight: 'bold',
		fontSize: 14,
		marginRight: '-55%',
	},
	eventLeave2: {
		color : '#232159',
		textAlign: "right",
		fontWeight: 'bold',
		fontSize: 14,
	},
	eventAgency: {
		color : '#232159',
		textAlign: "left",
		fontWeight: 'bold',
		fontSize: 14,
		marginLeft: 15,
		marginRight: 120,
	},
	eventArrive2: {
		color : '#232159',
		marginRight: '5%',
		textAlign: "right",
		fontWeight: 'bold',
		fontSize: 14,
	},
	inlineTitle: {
		flexWrap: 'wrap', 
        alignItems: 'flex-start',
        flexDirection:'row',
	},
	inlineData: {
		flex: 1, 
		flexDirection: 'row'
	},
	inlineNotification: {
		flex: 1, 
		flexDirection: 'row'
	},
	inlineTitle2: {
		flexWrap: 'wrap', 
        alignItems: 'flex-start',
        flexDirection:'row',
		marginTop: '5%',
	},
	inlineData2: {
		flexWrap: 'wrap', 
        alignItems: 'flex-start',
        flexDirection:'row',
		marginTop: '5%',
	},
	calendarColor1NewDesing : {
		
		borderColor: (Platform.isPad === true) ? '#F9F9F9' : (Dimensions.get('window').width >= 414) ? '#F9F9F9' : '#F9F9F9',
		borderLeftWidth: 5,
		borderTopLeftRadius : 5,
		borderBottomLeftRadius : 5,
		marginLeft: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '0%' : '-6%' : (Dimensions.get('window').width >= 414) ? '0%' : '-8%' ,
		marginRight : (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-2.5%' : '-7%' : (Dimensions.get('window').width >= 414) ? '-2.5%' : '-7%',
		marginTop :  (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-1.5%' : '-3%' : (Dimensions.get('window').width >= 414) ? '-1.5%' : '-3%',
		marginBottom : (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-1.5%' : '-3.3%' : (Dimensions.get('window').width >= 414) ? '-1.5%' : '-4.3%',
	  },
	  calendarColor2NewDesing : {
		
		borderColor: (Platform.isPad === true) ? '#F9F9F9' : (Dimensions.get('window').width >= 414) ? '#F9F9F9' : '#F9F9F9',
		borderLeftWidth: 5,
		borderTopLeftRadius : 5,
		borderBottomLeftRadius : 5,
		marginLeft: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '0%' : '-6%' : (Dimensions.get('window').width >= 414) ? '0%' : '-8%' ,
		marginRight : (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-2.5%' : '-7%' : (Dimensions.get('window').width >= 414) ? '-2.5%' : '-7%',
		marginTop :  (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-1.5%' : '-3%' : (Dimensions.get('window').width >= 414) ? '-1.5%' : '-3%',
		marginBottom : (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-1.5%' : '-3.3%' : (Dimensions.get('window').width >= 414) ? '-1.5%' : '-4.3%',
	  },
	  calendarColor3NewDesing : {
		
		borderColor: (Platform.isPad === true) ? '#F9F9F9' : (Dimensions.get('window').width >= 414) ? '#F9F9F9' : '#F9F9F9',
		borderLeftWidth: 5,
		borderTopLeftRadius : 5,
		borderBottomLeftRadius : 5,
		marginLeft: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '0%' : '-6%' : (Dimensions.get('window').width >= 414) ? '0%' : '-8%' ,
		marginRight : (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-2.5%' : '-7%' : (Dimensions.get('window').width >= 414) ? '-2.5%' : '-7%',
		marginTop :  (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-1.5%' : '-3%' : (Dimensions.get('window').width >= 414) ? '-1.5%' : '-3%',
		marginBottom : (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-1.5%' : '-3.3%' : (Dimensions.get('window').width >= 414) ? '-1.5%' : '-4.3%',
	  },
	  calendarColor4NewDesing : {
		
		borderColor: (Platform.isPad === true) ? '#F9F9F9' : (Dimensions.get('window').width >= 414) ? '#F9F9F9' : '#F9F9F9',
		borderLeftWidth: 5,
		borderTopLeftRadius : 5,
		borderBottomLeftRadius : 5,
		marginLeft: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '0%' : '-6%' : (Dimensions.get('window').width >= 414) ? '0%' : '-8%' ,
		marginRight : (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-2.5%' : '-7%' : (Dimensions.get('window').width >= 414) ? '-2.5%' : '-7%',
		marginTop :  (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-1.5%' : '-3%' : (Dimensions.get('window').width >= 414) ? '-1.5%' : '-3%',
		marginBottom : (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-1.5%' : '-3.3%' : (Dimensions.get('window').width >= 414) ? '-1.5%' : '-4.3%',
	  },
	  calendarColor5NewDesing : {
		
		borderColor: (Platform.isPad === true) ? '#F9F9F9' : (Dimensions.get('window').width >= 414) ? '#F9F9F9' : '#F9F9F9',
		borderLeftWidth: 5,
		borderTopLeftRadius : 5,
		borderBottomLeftRadius : 5,
		marginLeft: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '0%' : '-6%' : (Dimensions.get('window').width >= 414) ? '0%' : '-8%' ,
		marginRight : (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-2.5%' : '-7%' : (Dimensions.get('window').width >= 414) ? '-2.5%' : '-7%',
		marginTop :  (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-1.5%' : '-3%' : (Dimensions.get('window').width >= 414) ? '-1.5%' : '-3%',
		marginBottom : (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-1.5%' : '-3.3%' : (Dimensions.get('window').width >= 414) ? '-1.5%' : '-4.3%',
	  },
	  calendarColor6NewDesing : {
		
		borderColor: (Platform.isPad === true) ? '#F9F9F9' : (Dimensions.get('window').width >= 414) ? '#F9F9F9' : '#F9F9F9',
		borderLeftWidth: 5,
		borderTopLeftRadius : 5,
		borderBottomLeftRadius : 5,
		marginLeft: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '0%' : '-6%' : (Dimensions.get('window').width >= 414) ? '0%' : '-8%' ,
		marginRight : (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-2.5%' : '-7%' : (Dimensions.get('window').width >= 414) ? '-2.5%' : '-7%',
		marginTop :  (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-1.5%' : '-3%' : (Dimensions.get('window').width >= 414) ? '-1.5%' : '-3%',
		marginBottom : (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-1.5%' : '-3.3%' : (Dimensions.get('window').width >= 414) ? '-1.5%' : '-4.3%',
	  },
	  calendarColor7NewDesing : {
		
		borderColor: (Platform.isPad === true) ? '#F9F9F9' : (Dimensions.get('window').width >= 414) ? '#F9F9F9' : '#F9F9F9',
		borderLeftWidth: 5,
		borderTopLeftRadius : 5,
		borderBottomLeftRadius : 5,
		marginLeft: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '0%' : '-6%' : (Dimensions.get('window').width >= 414) ? '0%' : '-8%' ,
		marginRight : (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-2.5%' : '-7%' : (Dimensions.get('window').width >= 414) ? '-2.5%' : '-7%',
		marginTop :  (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-1.5%' : '-3%' : (Dimensions.get('window').width >= 414) ? '-1.5%' : '-3%',
		marginBottom : (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-1.5%' : '-3.3%' : (Dimensions.get('window').width >= 414) ? '-1.5%' : '-4.3%',
	  },
	  calendarColor8NewDesing : {
		
		borderColor: (Platform.isPad === true) ? '#F9F9F9' : (Dimensions.get('window').width >= 414) ? '#F9F9F9' : '#F9F9F9',
		borderLeftWidth: 5,
		borderTopLeftRadius : 5,
		borderBottomLeftRadius : 5,
		marginLeft: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '0%' : '-6%' : (Dimensions.get('window').width >= 414) ? '0%' : '-8%' ,
		marginRight : (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-2.5%' : '-7%' : (Dimensions.get('window').width >= 414) ? '-2.5%' : '-7%',
		marginTop :  (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-1.5%' : '-3%' : (Dimensions.get('window').width >= 414) ? '-1.5%' : '-3%',
		marginBottom : (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-1.5%' : '-3.3%' : (Dimensions.get('window').width >= 414) ? '-1.5%' : '-4.3%',
	  },
	  calendarColorANewDesing : {
		
		borderColor: (Platform.isPad === true) ? '#F9F9F9' : (Dimensions.get('window').width >= 414) ? '#F9F9F9' : '#F9F9F9',
		borderLeftWidth: 5,
		borderTopLeftRadius : 5,
		borderBottomLeftRadius : 5,
		marginLeft: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '0%' : '-6%' : (Dimensions.get('window').width >= 414) ? '0%' : '-8%' ,
		marginRight : (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-2.5%' : '-7%' : (Dimensions.get('window').width >= 414) ? '-2.5%' : '-7%',
		marginTop :  (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-1.5%' : '-3%' : (Dimensions.get('window').width >= 414) ? '-1.5%' : '-3%',
		marginBottom : (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-1.5%' : '-3.3%' : (Dimensions.get('window').width >= 414) ? '-1.5%' : '-4.3%',
	  },
	calendarColor1 : {
		borderColor: '#232159',
		borderRightWidth: 5,
		borderTopRightRadius : 5,
		borderBottomRightRadius : 5,
		marginLeft: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '0%' : '-8%' : (Dimensions.get('window').width >= 414) ? '0%' : '-8%' ,
		marginRight : (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-2.5%' : '-7%' : (Dimensions.get('window').width >= 414) ? '-2.5%' : '-7%',
		marginTop :  (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-1.5%' : '-4%' : (Dimensions.get('window').width >= 414) ? '-1.5%' : '-4%',
		marginBottom : (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-1.5%' : '-4%' : (Dimensions.get('window').width >= 414) ? '-1.5%' : '-4%',
	  },
	  calendarColor2 : {
		borderColor: '#982A72',
		borderRightWidth: 5,
		borderTopRightRadius : 5,
		borderBottomRightRadius : 5,
		marginLeft: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '0%' : '-8%' : (Dimensions.get('window').width >= 414) ? '0%' : '-8%' ,
		marginRight : (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-2.5%' : '-7%' : (Dimensions.get('window').width >= 414) ? '-2.5%' : '-7%',
		marginTop :  (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-1.5%' : '-4%' : (Dimensions.get('window').width >= 414) ? '-1.5%' : '-4%',
		marginBottom : (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-1.5%' : '-4%' : (Dimensions.get('window').width >= 414) ? '-1.5%' : '-4%',
	  },
	  calendarColor3: {
		borderColor: '#394893',
		borderRightWidth: 5,
		borderTopRightRadius : 5,
		borderBottomRightRadius : 5,
		marginLeft: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '0%' : '-8%' : (Dimensions.get('window').width >= 414) ? '0%' : '-8%' ,
		marginRight : (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-2.5%' : '-7%' : (Dimensions.get('window').width >= 414) ? '-2.5%' : '-7%',
		marginTop :  (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-1.5%' : '-4%' : (Dimensions.get('window').width >= 414) ? '-1.5%' : '-4%',
		marginBottom : (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-1.5%' : '-4%' : (Dimensions.get('window').width >= 414) ? '-1.5%' : '-4%',
	  },
	  calendarColor4: {
		borderColor: '#A54483',
		borderRightWidth: 5,
		borderTopRightRadius : 5,
		borderBottomRightRadius : 5,
		marginLeft: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '0%' : '-8%' : (Dimensions.get('window').width >= 414) ? '0%' : '-8%' ,
		marginRight : (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-2.5%' : '-7%' : (Dimensions.get('window').width >= 414) ? '-2.5%' : '-7%',
		marginTop :  (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-1.5%' : '-4%' : (Dimensions.get('window').width >= 414) ? '-1.5%' : '-4%',
		marginBottom : (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-1.5%' : '-4%' : (Dimensions.get('window').width >= 414) ? '-1.5%' : '-4%',
	  },
	  calendarColor5: {
		borderColor: '#5D418D',
		borderRightWidth: 5,
		borderTopRightRadius : 5,
		borderBottomRightRadius : 5,
		marginLeft: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '0%' : '-8%' : (Dimensions.get('window').width >= 414) ? '0%' : '-8%' ,
		marginRight : (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-2.5%' : '-7%' : (Dimensions.get('window').width >= 414) ? '-2.5%' : '-7%',
		marginTop :  (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-1.5%' : '-4%' : (Dimensions.get('window').width >= 414) ? '-1.5%' : '-4%',
		marginBottom : (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-1.5%' : '-4%' : (Dimensions.get('window').width >= 414) ? '-1.5%' : '-4%',
	  },
	  calendarColor6: {
		borderColor: '#392B84',
		borderRightWidth: 5,
		borderTopRightRadius : 5,
		borderBottomRightRadius : 5,
		marginLeft: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '0%' : '-8%' : (Dimensions.get('window').width >= 414) ? '0%' : '-8%' ,
		marginRight : (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-2.5%' : '-7%' : (Dimensions.get('window').width >= 414) ? '-2.5%' : '-7%',
		marginTop :  (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-1.5%' : '-4%' : (Dimensions.get('window').width >= 414) ? '-1.5%' : '-4%',
		marginBottom : (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-1.5%' : '-4%' : (Dimensions.get('window').width >= 414) ? '-1.5%' : '-4%',
	  },
	  calendarColor7: {
		borderColor: '#B15391',
		borderRightWidth: 5,
		borderTopRightRadius : 5,
		borderBottomRightRadius : 5,
		marginLeft: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '0%' : '-8%' : (Dimensions.get('window').width >= 414) ? '0%' : '-8%' ,
		marginRight : (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-2.5%' : '-7%' : (Dimensions.get('window').width >= 414) ? '-2.5%' : '-7%',
		marginTop :  (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-1.5%' : '-4%' : (Dimensions.get('window').width >= 414) ? '-1.5%' : '-4%',
		marginBottom : (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-1.5%' : '-4%' : (Dimensions.get('window').width >= 414) ? '-1.5%' : '-4%',
	  },
	  calendarColor8: {
		borderColor: '#4F177D',
		borderRightWidth: 5,
		borderTopRightRadius : 5,
		borderBottomRightRadius : 5,
		marginLeft: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '0%' : '-8%' : (Dimensions.get('window').width >= 414) ? '0%' : '-8%' ,
		marginRight : (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-2.5%' : '-7%' : (Dimensions.get('window').width >= 414) ? '-2.5%' : '-7%',
		marginTop :  (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-1.5%' : '-4%' : (Dimensions.get('window').width >= 414) ? '-1.5%' : '-4%',
		marginBottom : (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-1.5%' : '-4%' : (Dimensions.get('window').width >= 414) ? '-1.5%' : '-4%',
	  },
	  calendarColorA: {
		borderColor: '#C471CF',
		borderRightWidth: 5,
		borderTopRightRadius : 5,
		borderBottomRightRadius : 5,
		marginLeft: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '0%' : '-8%' : (Dimensions.get('window').width >= 414) ? '0%' : '-8%' ,
		marginRight : (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-2.5%' : '-7%' : (Dimensions.get('window').width >= 414) ? '-2.5%' : '-7%',
		marginTop :  (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-1.5%' : '-4%' : (Dimensions.get('window').width >= 414) ? '-1.5%' : '-4%',
		marginBottom : (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-1.5%' : '-4%' : (Dimensions.get('window').width >= 414) ? '-1.5%' : '-4%',
	  },
	  imageCalendar: {
		width: (Platform.isPad === true) ? 100 : (Dimensions.get('window').width >= 414) ? 100 : 50,
		height: (Platform.isPad === true) ? 100 : (Dimensions.get('window').width >= 414) ? 100 : 50,
		marginLeft: '10%',
		marginBottom: -18,
		marginTop: (Platform.isPad === true) ? '3%' : (Dimensions.get('window').width >= 414) ? '3%' : '2%'

		
	  },
	  imageCalendarNewDesing: {
		width: (Platform.isPad === true) ? 150 : (Dimensions.get('window').width >= 414) ? 150 : 70,
		height: (Platform.isPad === true) ? 150 : (Dimensions.get('window').width >= 414) ? 150 : 90,
		marginBottom: 18,
		marginTop: (Platform.isPad === true) ? '3%' : (Dimensions.get('window').width >= 414) ? '3%' : '5%',
		marginLeft : (Platform.isPad === true) ? '0%' : (Dimensions.get('window').width >= 414) ? '0%' : '10%'
	  },
	  imageCalendarNewDesing2: {
		width: (Platform.isPad === true) ? 150 : (Dimensions.get('window').width >= 414) ? 150 : 70,
		height: (Platform.isPad === true) ? 150 : (Dimensions.get('window').width >= 414) ? 150 : 70,
		marginBottom: 18,
		marginTop: (Platform.isPad === true) ? '3%' : (Dimensions.get('window').width >= 414) ? '3%' : '5%',
		marginLeft : (Platform.isPad === true) ? '0%' : (Dimensions.get('window').width >= 414) ? '0%' : '10%'
	  },
	  MargintopCalendar : {
		marginTop :  (Platform.OS === 'ios') ? (Platform.isPad === true) ? '5%' : '0%' : (Dimensions.get('window').width >= 414) ? '5%' : '0%',
		marginLeft :  (Platform.OS === 'ios') ? (Platform.isPad === true) ? '0%' : '1%' : (Dimensions.get('window').width >= 414) ? '0%' : '2%',
		marginRight :  (Platform.OS === 'ios') ? (Platform.isPad === true) ? '0%' : '1%' : (Dimensions.get('window').width >= 414) ? '0%' : '1%',
		
	  },
	  CalendarEventsMarginBottoms : {
		marginBottom : '5%'
	  },

	  //Notifications
	  containerNoti: {
		flex: 1,
		backgroundColor: '#fff',
		paddingTop: '40%',
		paddingHorizontal: '20%'
		},
	  textreporttitle : {
		fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : null
	  },
	  itemNoti: {
		padding: '5%',
		marginTop: '5%',
		borderRadius: 10,
		backgroundColor: '#eeeeee',
		fontSize: 24,
		flexDirection: 'column',

		},
		itemNotiactive: {
			padding: '5%',
			marginTop: '5%',
			borderRadius: 10,
			backgroundColor: '#ccf7f6',
			fontSize: 24,
			flexDirection: 'column'
				},
		itemReportList: {
			padding: '5%',
			backgroundColor: '#FDFDFD',
			fontSize: 24,
			flexDirection: 'column'
				},
		backgroundCircleInitReport : {
			backgroundColor: '#982A72'
		},
	   itemTextNoti: {
		marginLeft: '10%',
		flexDirection: 'row'
			},
	  	ImageBackgroundNoti: {
			width: '100%',
			height: '100%',
			},
		BackgroundNoti: {
			width: '100%',
			height: '100%',
			backgroundColor : '#FDFDFD'
	
				},
	  notiDate: {
		  marginLeft : '35%',
		  marginTop : (Platform.isPad === true) ? '5%' : (Dimensions.get('window').width >= 414) ? '5%' : '0%',
	  },
	  VouchernotiDate: {
		marginLeft : '35%',
		marginTop : (Platform.isPad === true) ? '5%' : (Dimensions.get('window').width >= 414) ? '5%' : '5%',
	},
	  NotificationMarginBottom : {
		marginBottom : (Platform.isPad === true) ? '3%' : (Dimensions.get('window').width >= 414) ? '3%' : null,
	  },
	  imageNoti: {
		width: (Platform.isPad === true) ? 110 : (Dimensions.get('window').width >= 414) ? 110 : 70,
    	height: (Platform.isPad === true) ? 110 : (Dimensions.get('window').width >= 414) ? 110 : 70,
		borderWidth: 2,
    	borderRadius: 180 / 2,
		marginTop : (Platform.isPad === true) ? '-15%' : (Dimensions.get('window').width >= 414) ? '-15%' : '-25%',
		backgroundColor : '#fff',
		marginLeft : (Platform.isPad === true) ? '10%' : (Dimensions.get('window').width >= 414) ? '10%' : '0%',
	  },
	  imageNoti2: {
		width: (Platform.isPad === true) ? 150 : (Dimensions.get('window').width >= 414) ? 150 : 90,
    	height: (Platform.isPad === true) ? 150 : (Dimensions.get('window').width >= 414) ? 150 : 90,
		borderWidth: 2,
    	borderRadius: (Platform.isPad === true) ? 150 / 2 : (Dimensions.get('window').width >= 414) ? 150 / 2 : 150 / 2,
		marginTop : '2%',
		marginBottom : '-2%',
		backgroundColor : '#fff',
		marginLeft : (Platform.isPad === true) ? '5%' : (Dimensions.get('window').width >= 414) ? '5%' : '0%'

	  },
	  NotiDont: {
		color: '#232159',
		fontWeight: 'bold',
		textAlign: 'center',
	  },
	

	//Disable
	disableMargins: {
		marginLeft: (Platform.isPad === true) ? '6%' : (Dimensions.get('window').width >= 414) ? '6%' :'3%',
		marginRight : (Platform.isPad === true) ? '6%' : (Dimensions.get('window').width >= 414) ? '6%' : '3%',
	},
	messageDisable: {
		backgroundColor: '#DFBABA',
		marginLeft : (Platform.isPad === true) ? '6%' : (Dimensions.get('window').width >= 414) ? '6%' : 10,
		marginRight : (Platform.isPad === true) ? '6%' : (Dimensions.get('window').width >= 414) ? '6%' : 10,
		marginTop: (Platform.isPad === true) ? '5%' : (Dimensions.get('window').width >= 414) ? '5%' : 15,	
	},
	messageDisable2: {
		marginLeft : 10,
		marginRight : 10,
		marginTop: 15,	
	},
	disabletitle: {
		color : 'red',
		fontSize: 30,
		marginBottom: 10,
	},
	disablewarning: {
		fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 18,
		textAlign: 'justify',	
	},
	disablewarnin2: {
		fontSize: 2,
		textAlign: 'justify',	
	},
	disablewarningView: {
		marginTop: 10,
		marginRight: 15,
		marginLeft: 15,
	},
	disablebold: {
		fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 18,
		fontWeight: 'bold',
		textAlign: 'center',
		marginTop : (Platform.isPad === true) ? '10%' : (Dimensions.get('window').width >= 414) ? '10%' : '5%',
		marginBottom : (Platform.isPad === true) ? '5%' : (Dimensions.get('window').width >= 414) ? '5%' : null
	},
	disablebold2: {
		fontSize: (Platform.isPad === true) ? 24 : (Dimensions.get('window').width >= 414) ? 24 :  20,
		fontWeight: 'bold',
		textAlign: 'center',
		marginTop : (Platform.isPad === true) ? '10%' : (Dimensions.get('window').width >= 414) ? '10%' : '5%'
	},
	disablebold3: {
		color: 'white',
		fontSize: (Platform.isPad === true) ? 17 : (Dimensions.get('window').width >= 414) ? 20 :  16,
		fontWeight: 'bold',
		textAlign: 'center',
		marginTop : (Platform.isPad === true) ? '10%' : (Dimensions.get('window').width >= 414) ? '10%' : '5%'
	},
	disableboldR: {
		fontSize: 18,
	},
	botonTextoDisable:{
		flex: 1,
		textTransform: 'uppercase',
		fontWeight: 'bold',
		color: '#FFF',
		textAlign: 'center',
		fontSize: (Platform.isPad === true) ? 17 : (Dimensions.get('window').width >= 414) ? 17 :  16
	},
	
	//tabIcon
	tabiconNativeBase: {
		height: (Dimensions.get('window').width >= 414) ? 48 : '80%',
		width: (Dimensions.get('window').width >= 414) ? 48 : '80%',
	},
	tabicon: {
		height: '80%',
		width: '80%',
	},
	//Drawerimage
	drawerImage: {
		marginTop: (Platform.OS === 'ios') ? '20%' : '12%', 
		marginBottom: '5%',
	},
	drawerUser: {
		color: 'white', 
		fontWeight: 'bold', 
		fontSize: (Platform.isPad === true) ? 26 : (Dimensions.get('window').width >= 414) ? 26 : 17, 
		marginLeft: '5%'
	},
	drawerMail: {
		color: 'white', 
		fontSize: (Platform.isPad === true) ? 24 : (Dimensions.get('window').width >= 414) ? 24 : 15, 
		marginLeft: '5%', 
		marginTop: '2%', 
		marginBottom: '3%'
	},

	//Edit
	editView : {
		flexDirection: 'row',
	},
	editMargintop : {
		marginTop: '-10%',
	},
	pickereditAgeStatus : {
		height: 100, 
		width: '50%', 
		marginLeft: '25%', 
		marginTop: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '5%' : '-10%' : (Dimensions.get('window').width >= 414) ? '5%' : 0, 
		marginBottom: (Platform.OS === 'ios') ? 100 : 0
	},
	pickerSimilarEdit : {
		height: 100,
		width: '80%', 
		marginLeft: '10%', 
		marginTop: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '5%' : '-3%' : (Dimensions.get('window').width >= 414) ? '5%' :  0, 
		marginBottom: (Platform.OS === 'ios') ? 100 : 0
	},
	pickerSmokerEdit : {
		height: 100, 
		width: '80%', 
		marginLeft: (Platform.isPad === true) ? '12%' : (Dimensions.get('window').width >= 414) ? '12%' : '10%', 
		marginTop: (Platform.OS === 'ios') ? '5%' : (Dimensions.get('window').width >= 414) ? '10%' : 0, 
		marginBottom: (Platform.OS === 'ios') ? '3%' : (Dimensions.get('window').width >= 414) ? '5%' : 0,
	},
	editSelectsSquare : {
		flexDirection: "row", 
		marginBottom: '10%',
	},
	editSelectsSquareLeftSide : {
		flexDirection: "row", 
		marginBottom: '10%',
		marginLeft: (Platform.isPad === true) ? '15%' : (Dimensions.get('window').width >= 414) ? '15%' : '0%',
	},
	editSelectsSquareLeftSide2 : {
		flexDirection: "row", 
		marginBottom: '10%',
		marginLeft: (Platform.isPad === true) ? '17%' : (Dimensions.get('window').width >= 414) ? '17%' : '0%',
	},
	editSelectsSquareRightSide : {
		flexDirection: "row", 
		marginLeft: (Platform.isPad === true) ? '3%' : (Dimensions.get('window').width >= 414) ? '3%' : '0%',
		marginTop : (Platform.isPad === true) ? '0%' : (Dimensions.get('window').width >= 414) ? '0%' : null,
		marginBottom: '10%',
	},
	editSelectsSquareRightSideStudentInfo : {
		flexDirection: "row", 
		marginLeft: (Platform.isPad === true) ? '5%' : (Dimensions.get('window').width >= 414) ? '5%' : '0%',
		marginTop : (Platform.isPad === true) ? '0%' : (Dimensions.get('window').width >= 414) ? '0%' : null,
		marginBottom: '10%',
	},
	editPetpicker : {
		height: 100, 
		width: '70%', 
		marginLeft: '15%', 
		marginTop: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-10%' : '-20%' : (Dimensions.get('window').width >= 414) ? '5%' : 0, 
		marginBottom: (Platform.OS === 'ios') ? 100 : 0
	},
	pickereditAcademyPre : {
		height: 100, 
		width: '95%', 
		marginLeft: '5%', 
		marginTop: (Platform.OS === 'ios') ? '-5%' : 0, 
		marginBottom: (Platform.OS === 'ios') ? 100 : 0
	},
	pickereditGenderpre : {
		height: 100, 
		width: '50%', 
		marginLeft: '25%', 
		marginTop: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '5%' : '-3%' : (Dimensions.get('window').width >= 414) ? '5%' : 0, 
		marginBottom: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '10%' : 100 : (Dimensions.get('window').width >= 414) ? '10%' : 0
	},
	labelSelectEdit : {
		marginLeft : '5%', 
		marginTop : (Platform.isPad === true) ? null : (Dimensions.get('window').width >= 414) ? 0 : '1%', 
		fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 14
	},
	labelSelectEditTermsConditions : {
		marginLeft : '5%', 
		marginTop : (Platform.isPad === true) ? null : (Dimensions.get('window').width >= 414) ? 0 : '1%', 
		fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 14,
		color: '#982A72'
	},
	botonedit: {
		backgroundColor: '#982A72',
		marginTop: 10,
		marginBottom: '10%' 
	},
	botonedit2: {
		backgroundColor: '#982A72',
		marginTop: 30,
		marginBottom: '10%' 
	},
	botoneditRequiredFields: {
		backgroundColor: '#982A72',
		marginTop: '5%',
		marginBottom: '10%',
		width: '45%',
		marginLeft : '50%',
	},
	editiconNativeBaseDesing: {
		height: (Platform.isPad === true) ? '80%' : (Dimensions.get('window').width >= 414) ? "60%" : '60%',
		width: (Platform.isPad === true) ? '80%' : (Dimensions.get('window').width >= 414) ? "60%" : '60%',
	},
	editicon: {
		height: (Platform.isPad === true) ? '80%' : (Dimensions.get('window').width >= 414) ? "80%" : '60%',
		width: (Platform.isPad === true) ? '80%' : (Dimensions.get('window').width >= 414) ? "80%" : '60%',
		marginLeft: (Platform.isPad === true) ? '-35%' : (Dimensions.get('window').width >= 414) ? "-35%" : '10%', 
	},
	editiconsNativeBase: {
		height: (Platform.isPad === true) ? '80%' : (Dimensions.get('window').width >= 414) ? '80%' : '90%',
		width: (Platform.isPad === true) ? '80%' : (Dimensions.get('window').width >= 414) ? '80%' : '90%', 
	},
	editiconLoc: {
		height: (Platform.isPad === true) ? '80%' : (Dimensions.get('window').width >= 414) ? '80%' : '60%',
		width: (Platform.isPad === true) ? '80%' : (Dimensions.get('window').width >= 414) ? '80%' : '60%',
		marginLeft: (Platform.isPad === true) ? '-35%' : (Dimensions.get('window').width >= 414) ? '-35%' : '40%', 
	},
	editiconPro: {
		height: (Platform.isPad === true) ? '80%' : (Dimensions.get('window').width >= 414) ? '80%' : '60%',
		width: (Platform.isPad === true) ? '80%' : (Dimensions.get('window').width >= 414) ? '80%' : '60%',
		marginLeft: (Platform.isPad === true) ? '32%' : (Dimensions.get('window').width >= 414) ? '32%' : '2%', 
	},
	editiconProFamilyInfo: {
		height: (Platform.isPad === true) ? '80%' : (Dimensions.get('window').width >= 414) ? '80%' : '60%',
		width: (Platform.isPad === true) ? '80%' : (Dimensions.get('window').width >= 414) ? '80%' : '60%',
		marginLeft: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-32%' : '20%' : (Dimensions.get('window').width >= 414) ? '32%' : '2%', 
	},
	editiconAdd: {
		height: (Platform.isPad === true) ? '80%' : (Dimensions.get('window').width >= 414) ? '80%' : '60%',
		width: (Platform.isPad === true) ? '80%' : (Dimensions.get('window').width >= 414) ? '80%' : '60%',
		marginLeft: (Platform.isPad === true) ? '-35%' : (Dimensions.get('window').width >= 414) ? '-35%' : '-2%', 
	},
	editiconPet: {
		height: (Platform.isPad === true) ? '80%' : (Dimensions.get('window').width >= 414) ? '80%' : '60%',
		width: (Platform.isPad === true) ? '80%' : (Dimensions.get('window').width >= 414) ? '80%' : '60%',
		marginLeft: (Platform.isPad === true) ? '-35%' : (Dimensions.get('window').width >= 414) ? '-35%' : '15%', 
	},
	editiconFamilyPreference: {
		height: (Platform.isPad === true) ? '80%' : (Dimensions.get('window').width >= 414) ? '80%' : '60%',
		width: (Platform.isPad === true) ? '80%' : (Dimensions.get('window').width >= 414) ? '80%' : '60%',
		marginLeft: (Platform.isPad === true) ? '-35%' : (Dimensions.get('window').width >= 414) ? '-35%' : '9%', 
	},
	editiconAnyMemeber: {
		height: (Platform.isPad === true) ? '80%' : (Dimensions.get('window').width >= 414) ? '80%' : '60%',
		width: (Platform.isPad === true) ? '80%' : (Dimensions.get('window').width >= 414) ? '80%' : '60%',
		marginLeft: (Platform.isPad === true) ? '-35%' : (Dimensions.get('window').width >= 414) ? '-35%' : '-18%', 
	},
	butonfiledit : {
		fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 14,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	editiconFamily: {
		height: (Platform.isPad === true) ? '80%' : (Dimensions.get('window').width >= 414) ? '80%' : '60%',
		width: (Platform.isPad === true) ? '80%' : (Dimensions.get('window').width >= 414) ? '80%' : '60%',
		textAlign: (Platform.isPad === true) ? 'center' : 'left',
	},
	infomaintitledit: {
		fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 20,
		marginBottom: 20,
		marginTop: (Platform.isPad === true) ? '0%' : (Dimensions.get('window').width >= 414) ? '0%' : '3%',
		fontWeight: 'bold',
		marginLeft: (Platform.isPad === true) ? '35%' : (Dimensions.get('window').width >= 414) ? '40%' : null, 
	},
	infomaintitleditTabletsNativeBase : {
		fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 20,
		fontWeight: 'bold',
		marginBottom:  '5%',
	},
	infomaintitleditTablets: {
		textAlign : (Platform.isPad === true) ? 'center' : (Dimensions.get('window').width >= 414) ? 'center' : null,
		fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 20,
		marginBottom:  20,
		marginTop: (Platform.isPad === true) ? '0%' : (Dimensions.get('window').width >= 414) ? '0%' : '3%',
		fontWeight: 'bold',
		marginLeft: (Platform.isPad === true) ? '40%' : (Dimensions.get('window').width >= 414) ? '40%' : null, 
	},
	infomaintitleditNativeBase: {
		fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 20,
		fontWeight: 'bold',
	},
	infomaintitleditTablets2: {
		textAlign : (Platform.isPad === true) ? 'center' : (Dimensions.get('window').width >= 414) ? 'center' : null,
		fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 20,
		marginBottom:  20,
		marginTop: (Platform.isPad === true) ? '0%' : (Dimensions.get('window').width >= 414) ? '0%' : '3%',
		fontWeight: 'bold',
		marginLeft: (Platform.isPad === true) ? '28%' : (Dimensions.get('window').width >= 414) ? '28%' : null, 
	},
	infomaintitleditTablets3: {
		textAlign : (Platform.isPad === true) ? 'center' : (Dimensions.get('window').width >= 414) ? 'center' : null,
		fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 20,
		marginBottom:  20,
		marginTop: (Platform.isPad === true) ? '0%' : (Dimensions.get('window').width >= 414) ? '0%' : '3%',
		fontWeight: 'bold',
		marginLeft: (Platform.isPad === true) ? '32%' : (Dimensions.get('window').width >= 414) ? '32%' : null, 
	},
	infomaintitleditTablets4: {
		textAlign : (Platform.isPad === true) ? 'center' : (Dimensions.get('window').width >= 414) ? 'center' : null,
		fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 20,
		marginBottom:  20,
		marginTop: (Platform.isPad === true) ? '0%' : (Dimensions.get('window').width >= 414) ? '0%' : '3%',
		fontWeight: 'bold',
		marginLeft: (Platform.isPad === true) ? '1%' : (Dimensions.get('window').width >= 414) ? '1%' : null, 
	},
	infomaintitleditBackground : {
		fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 20,
		marginBottom: 20,
		marginTop: (Platform.isPad === true) ? '0%' : (Dimensions.get('window').width >= 414) ? '0%' : '3%',
		fontWeight: 'bold',
		marginLeft: (Platform.isPad === true) ? '35%' : (Dimensions.get('window').width >= 414) ? '35%' : null
	},
	pickerBasicinfo : {
		height: 100, 
		width: 150, 
		marginLeft: (Platform.isPad === true) ? '40%' : (Dimensions.get('window').width >= 414) ? '40%' : '25%', 
		marginTop: (Platform.OS === 'ios') ? '5%' : (Dimensions.get('window').width >= 414) ? '10%' : 0, 
		marginBottom: (Platform.OS === 'ios') ? '3%' : (Dimensions.get('window').width >= 414) ? '5%' : 0,
	},
	pickerBasicinfoResidence : {
		height: 100, 
		width: (Platform.OS === 'android') ? 190 : (Dimensions.get('window').width >= 414) ? 190 : 170, 
		marginLeft: (Platform.isPad === true) ? '40%' : (Dimensions.get('window').width >= 414) ? '40%' : '25%', 
		marginTop: (Platform.OS === 'ios') ? '5%' : (Dimensions.get('window').width >= 414) ? '10%' : 0, 
		marginBottom: (Platform.OS === 'ios') ? '3%' : (Dimensions.get('window').width >= 414) ? '5%' : 0,
	},
	uploadFile : {
		fontWeight: 'bold', 
		marginTop: '2%', 
		marginLeft: '2%'
	},

	inputedit : {
	  fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 15,
	  marginTop: (Platform.isPad === true) ? '2%' : (Dimensions.get('window').width >= 414) ? '2%' : null
	},
	inputeditroom : {
		marginLeft: (Platform.isPad === true) ? '25%'  : (Dimensions.get('window').width >= 414) ? '25%' : null
	},
	textreporttitleEditRoom : {
		fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : null,
		fontWeight: 'bold', 
		marginLeft: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '25%' : '12%'  : (Dimensions.get('window').width >= 414) ? '25%' : null
	  },
	  textreporttitleEditRoomBed : {
		fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : null,
		fontWeight: 'bold', 
	  },
	

	//Student Not
	infomaintitleditStudentnotReservation: {
		fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 20,
		marginBottom: (Platform.isPad === true) ? '5%' : (Dimensions.get('window').width >= 414) ? '5%' : 20,
		marginTop: (Platform.isPad === true) ? '10%' : (Dimensions.get('window').width >= 414) ? '10%' : '3%',
		fontWeight: 'bold',
	},
	studentnotBasic: {
		marginLeft : '50%',
		marginTop: (Platform.isPad === true) ? '-15%'  : (Dimensions.get('window').width >= 414) ? '-15%' : '-35%'
	},
	profiledirtitleStudent : {
		textAlign : 'left',
		marginBottom: '5%',
	},
	profiledirtitleStudentLeftSide : {
		textAlign : 'left',
		marginBottom: '5%',
		marginLeft: (Platform.isPad === true) ? '5%' : (Dimensions.get('window').width >= 414) ? '5%' : 0
	},
	profiledirtitleStudentRightSide : {
		textAlign : 'left',
		marginBottom: '5%',
		marginLeft: (Platform.isPad === true) ? '50%' : (Dimensions.get('window').width >= 414) ? '50%' : 0,
		marginTop: (Platform.isPad === true) ? '-8%' : (Dimensions.get('window').width >= 414) ? '-8%' : 0,
	},
	profileStudentnot: {
		width: (Platform.isPad === true) ? 180 : (Dimensions.get('window').width >= 414) ? 180 : 125,
		height: (Platform.isPad === true) ? 180 : (Dimensions.get('window').width >= 414) ? 180 : 125,
		borderColor: 'black',
		borderWidth: 2,
		borderRadius: (Platform.isPad === true) ? 180 / 2 : (Dimensions.get('window').width >= 414) ? 180 / 2 : 125 / 2,
	},
	botoneditStudentnot: {
		backgroundColor: '#982A72',
		marginTop:  10,
		marginBottom: '10%',
		width: '40%',
		marginLeft: '45%', 
	},
	botonconfirmStu: {
		backgroundColor: '#982A72',
		marginTop:  10,
		marginBottom: '10%',
		width: '40%',
		marginLeft: '2%', 
	},
	botonrejectStu: {
		backgroundColor: '#232159',
		marginTop: (Platform.isPad === true) ? '-16%' : (Dimensions.get('window').width >= 414) ? '-15.5%' : '-23.5%',
		marginBottom: '10%',
		width: '40%',
		marginLeft: '55%', 
	},
	botonconfirmStuNativeBase: {
		backgroundColor: '#982A72',
		width: '100%',
	},
	botonrejectStuNativeBase: {
		backgroundColor: '#232159',
		width: '100%',
	},
	profileBannerStudent: {
		marginTop: '8%',
		marginLeft: 10,
		width: '90%',
		height: (Dimensions.get('window').width >= 414) ? 150 : 100,
		marginBottom: '8%',
	},
	specialDietrow : {
		marginTop: (Platform.isPad === true) ? '-28%'  : (Dimensions.get('window').width >= 414) ? '-28%' : '-40%',
		marginLeft: '50%',
		marginBottom: '15%'
	},

	//Student
	TopFirstInfoStudent : {
		marginTop : '5%'
	},
	infomaintitleditStudentLodging: {
		fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 20,
		marginBottom: (Platform.isPad === true) ? '5%' : (Dimensions.get('window').width >= 414) ? '5%' : 20,
		marginTop: (Platform.isPad === true) ? '1%' : (Dimensions.get('window').width >= 414) ? '1%' : '3%',
		fontWeight: 'bold',
	},
	StudentCardMarginTop : {
		marginTop: '-7%',
	},
	ReservationStudentMarginTop : {
		marginTop: '10%',
	},
	StudentopenButtonReply: {
		backgroundColor: '#982A72',
		borderRadius: 20,
		padding: 10,
		elevation: 2,
		marginTop : '5%',
		marginBottom : '5%',
		marginLeft : '5%',
		marginRight : '5%',
	  },
	profileStudent: {
		width: (Platform.isPad === true) ? 180 : (Dimensions.get('window').width >= 414) ? 180 : 125,
		height: (Platform.isPad === true) ? 180 : (Dimensions.get('window').width >= 414) ? 180 : 125,
		borderColor: 'black',
		borderWidth: 2,
		borderRadius: (Platform.isPad === true) ? 180 / 2 : (Dimensions.get('window').width >= 414) ? 180 / 2 : 125 / 2,
		marginBottom : '4%',
		backgroundColor : 'white'
	},
	botonbackStu: {
		backgroundColor: '#982A72',
		marginTop: 10,
		marginBottom: '10%',
		width: '40%',
		marginLeft: '55%', 
	},
	botoneditProfile2: {
		backgroundColor: '#982A72',
		marginTop: 10,
		marginBottom: '10%',
		width: '70%',
		marginLeft: '15%', 
	},
	botonStudnentProfile: {
		backgroundColor: '#982A72',
		marginTop: '5%',
		marginBottom: '10%',
		width: '70%',
	},
	
	//EditRoom
	photoEditRoom : {
		width: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 250 : 205 : (Dimensions.get('window').width >= 414) ? 250 :  200,
		height: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 250 : 205 : (Dimensions.get('window').width >= 414) ? 250 : 200, 
		backgroundColor: "#DDDDDD"
	},
	scrollviewedit : {
		marginBottom : '10%',
	},
	pickerType : {
		marginTop: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-8%' : '5%' :  0,
		width: (Platform.OS === 'ios') ? '53%' : (Dimensions.get('window').width >= 414) ? '32%' : '48%',
		height: (Platform.OS === 'ios') ? null : '100%',
		marginLeft: (Platform.OS === 'ios') ? (Platform.isPad === true) ?  '-2%' : '-10%' : (Dimensions.get('window').width >= 414) ? '1%' : '-8%',
	},
	pickerBed : {
		marginTop: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-20%' : '-40%' : '-40%',
		width: (Platform.OS === 'ios') ? '38%' : '38%',
		height: (Platform.OS === 'ios') ? null : '100%',
		marginLeft: (Platform.OS === 'ios') ? '65%' : '60%',
	},
	pickerBed2 : {
		marginTop: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-21%' : '-20%' : (Dimensions.get('window').width >= 414) ? '-40%' : '-40%',
		width: (Platform.OS === 'ios') ? '38%' : '38%',
		height: (Platform.OS === 'ios') ? null : '100%',
		marginLeft: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '64%' : '65%' : '60%',
	},
	pickerBed3 : {
		marginTop: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-20%' : '-42%' : (Dimensions.get('window').width >= 414) ? '-40%' : '-40%',
		width: (Platform.OS === 'ios') ? '38%' : '38%',
		height: (Platform.OS === 'ios') ? null : '100%',
		marginLeft: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '64%' : '63%' : '60%',
	},
	pickerDate : {
		marginTop: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-5%' : '4%' : 0,
		marginBottom: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 0 : '10%' : 0,
		width: (Platform.OS === 'ios') ? '50%' : (Dimensions.get('window').width >= 414) ? '32%' :  '40%',
		height: (Platform.OS === 'ios') ? null : '100%',
		marginLeft: (Platform.OS === 'ios') ? (Platform.isPad === true) ?  '-2%' : '-10%' : (Dimensions.get('window').width >= 414) ? '2%' : '-5%',
	},
	pickerFood : {
		marginTop: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-28%' : '-30%' : '-40%',
		width: (Platform.OS === 'ios') ? '38%' : '38%',
		height: (Platform.OS === 'ios') ? null : '100%',
		marginLeft: (Platform.OS === 'ios') ? '66%' : '60%',
	},
	imageroomEditType : {
		height : (Platform.OS === 'ios') ? (Platform.isPad === true) ? '35%' : '25%' : '25%',
		marginLeft : (Platform.OS === 'ios') ? (Platform.isPad === true) ? '1%' : '-5%' : (Dimensions.get('window').width >= 414) ? '1%' : '-7%',
		marginTop : (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-1%' : '16%' : '12%',
		marginBottom: (Platform.OS === 'ios') ? null : '20%',
	},
	imageroomEditBed : {
		height : (Platform.OS === 'ios') ? (Platform.isPad === true) ? '35%' : '20%' : '25%',
		marginTop : (Platform.OS === 'ios') ? (Platform.isPad === true) ? '2%' : '16%' : '12%',
		marginBottom: (Platform.OS === 'ios') ? null : '20%',
		marginLeft : (Platform.OS === 'ios') ? (Platform.isPad === true) ? '2%' : '-3%' : (Dimensions.get('window').width >= 414) ? '1%' : '-4%',
	},
	imageroomEditBed2 : {
		height : (Platform.OS === 'ios') ? (Platform.isPad === true) ? null : '85%' : '25%',
		marginTop : (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-2%' : '-7%' : (Dimensions.get('window').width >= 414) ? '14%' : '12%',
		marginBottom: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '6%' : null : '20%',
		marginLeft : (Platform.OS === 'ios') ? (Platform.isPad === true) ? '55%' : '50%' : (Dimensions.get('window').width >= 414) ? '44%' : '47%',
	},
	imageroomEditBed3 : {
		height : (Platform.OS === 'ios') ? (Platform.isPad === true) ? '35%' : '20%' : '25%',
		marginTop : (Platform.OS === 'ios') ? (Platform.isPad === true) ? '1%' : '14%' : '12%',
		marginBottom: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '5%' : null : '20%',
		marginLeft : (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-1%' : '-4%' : (Dimensions.get('window').width >= 414) ? '2%' : '-9%',
	},
	imageroomEditAvalible : {
		marginLeft : '-4%',
		height : (Platform.OS === 'ios') ? (Platform.isPad === true) ? '35%' : '20%' : '25%',
		marginTop : (Platform.OS === 'ios') ? (Platform.isPad === true) ? '1%' : '16%' : '12%',
		marginBottom: (Platform.OS === 'ios') ? null : '20%',
		marginLeft : (Platform.OS === 'ios') ? (Platform.isPad === true) ? '1%' : '-5%' : (Dimensions.get('window').width >= 414) ? '1%' : '-7%',

	},
	imageroomEditFood : {
		height : (Platform.OS === 'ios') ? (Platform.isPad === true) ? '35%' : '25%' : '25%',
		marginTop : (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-1%' : '16%' : '12%',
		marginBottom: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '16%' : null : '20%',
		marginLeft : (Platform.OS === 'ios') ? (Platform.isPad === true) ? '2%' : '-4%' : (Dimensions.get('window').width >= 414) ? '2%' : '-9%',
	},
	imageroomEditFoodEdit : {
		height : (Platform.OS === 'ios') ? (Platform.isPad === true) ? '35%' : '25%' : '25%',
		marginTop : (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-1%' : '16%' : '12%',
		marginBottom: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '16%' : null : '20%',
		marginLeft : (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-2%' : '-4%' : (Dimensions.get('window').width >= 414) ? '2%' : '-9%',
	},
	inlineTitleEditRoom: {
		flexWrap: 'wrap', 
        alignItems: 'flex-start',
        flexDirection:'row',
		width: '100%',
		marginTop : (Platform.OS === 'ios') ? (Platform.isPad === true) ? '0%' : '-5%' : '-5%',
		marginLeft : (Platform.isPad === true) ? '-2%' : null
	},
	inlineTitleEditRoom2: {
		flexWrap: 'wrap', 
        alignItems: 'flex-start',
        flexDirection:'row',
		width: '100%',
		marginTop : (Platform.OS === 'ios') ? (Platform.isPad === true) ? '3%' : '-5%' : '-23%',
		marginBottom: '15%'
	},
	infotitleEditRoom: {
		fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 18,
		marginBottom: 15,
		marginLeft: (Platform.isPad === true) ? '40%' : (Dimensions.get('window').width >= 414) ? '40%' : '35%',
		marginTop : (Platform.OS === 'ios') ? (Platform.isPad === true) ? -5 : -35 : (Dimensions.get('window').width >= 414) ? '5%' :  '5%',
		color: '#982A72',
	},
	wrapperCollapsibleListEdit : {
		marginTop :  '5%',
		marginBottom :  '10%',
	  },

	wrapperCollapsibleListEditBed : {
		marginTop :  '10%',
		marginBottom :  '10%',
	  },
	  plus : {
		fontSize : 30,
		color : '#232159',
		fontWeight: 'bold',
	  },
	  weeklypriceMargin : {
		marginBottom: (Platform.OS === 'ios') ? '10%' : '3%',
	  },
	  BedRegisterTitle : {
		marginTop : (Platform.OS === 'ios') ? (Platform.isPad === true) ? '10%' : '18%' : (Dimensions.get('window').width >= 414) ? '10%' : '18%', 
		marginLeft : (Platform.OS === 'ios') ? '-25%' : '-25%',
	  },
	  BedviewRegister2 : {
		marginTop: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-20%' : '-12%' : (Dimensions.get('window').width >= 414) ? '-35%' : '-40%',
	  },
	  BedviewEdit2: {
		marginTop: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-10%' : '-12%' : (Dimensions.get('window').width >= 414) ? '-20%' : '-20%',
	  },
	  CollapseBed3 : {
		marginTop : (Platform.OS === 'ios') ? (Platform.isPad === true) ?  '-25%' : '-20%' : (Dimensions.get('window').width >= 414) ? '-35%' : '-30%',
	  },
	  CollapseBed3Edit : {
		marginTop : (Platform.OS === 'ios') ? (Platform.isPad === true) ?  '-10%' : '-20%' : (Dimensions.get('window').width >= 414) ? '-20%' : '-20%',
	  },
	  BedviewRegister3 : {
		marginTop : (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-10%' : null : (Dimensions.get('window').width >= 414) ? '-10%' : '-20%',
		marginBottom: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-15%' : '-15%' : (Dimensions.get('window').width >= 414) ? '-30%' :  '-15%',
	  },
	  BedviewEdit3 : {
		marginTop : (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-10%' : null : (Dimensions.get('window').width >= 414) ? '-10%' : '-10%',
		marginBottom: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '5%' : '-15%' : (Dimensions.get('window').width >= 414) ? '-15%' :  '-15%',
	  },
	  BedviewRegister4 : {
		marginTop : (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-10%' : '5%' : (Dimensions.get('window').width >= 414) ? '-10%' : '-20%',
		marginBottom: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-15%' : '-5%' : (Dimensions.get('window').width >= 414) ? '-30%' :  '-15%',
	  },
	  BedviewEdit4 : {
		marginTop : (Platform.OS === 'ios') ? (Platform.isPad === true) ? '5%' : '5%' : (Dimensions.get('window').width >= 414) ? '5%' : '10%',
		marginBottom: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '5%' : '-5%' : (Dimensions.get('window').width >= 414) ? '3%' :  '3%',
	  },
	  BedviewRegister1 : {
		marginTop: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-5%' : null : '-20%',
		marginBottom: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-15%' : null : '-10%'
	  },
	  BedviewEdit1 : {
		marginTop: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-10%' : null : '-20%',
		marginBottom: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-10%' : null : '-10%'
	  },
	  BedTitleEdit : {
		marginTop: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '10%' : '10%' : '10%', 
		marginBottom: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '3%' : '10%' : '-5%', 
		marginLeft: '15%'
	  },
	  BedTitleEdit2 : {
		marginTop: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '10%' : '5%' : '5%',
		marginBottom: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '3%' : '-5%' : '-5%',
		marginLeft: '15%'
	  },

	//Modal Report
	titleModalR : {
		marginBottom: 15,
	    textAlign: 'center',
		fontWeight: 'bold',
		fontSize : (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 14
	},
	textstudentModalR : {
		marginLeft : '-10%',
	    textAlign: 'left',
	},
	subtstudentModalR : {
		marginLeft : '-10%',
		fontWeight: 'bold',
	    textAlign: 'left',
	},
	textroomModalR : {
		marginLeft : '50%',
	    textAlign: 'left',
	},
	subtroomModalR : {
		marginLeft : '50%',
		marginTop : '-13%',
		fontWeight: 'bold',
	    textAlign: 'left',
	},
	pickerModalR : {
		height:30, 
		width: (Platform.OS === 'android') ? 215 : 200,
		marginLeft : (Platform.isPad === true) ? '22%' : (Dimensions.get('window').width >= 414) ? '22%' : '12%',
		
	},
	pickerviewModalR : {
		marginTop: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-5%' : '-10%' : (Dimensions.get('window').width >= 414) ? '-5%' : '10%', 
		marginBottom: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '28%' : '60%' : (Dimensions.get('window').width >= 414) ? '10%' : '10%',
		marginLeft : (Platform.isPad === true) ? '5%' : (Dimensions.get('window').width >= 414) ? '5%' : '-5%',
	},
	cancelModalR : {
		backgroundColor: '#F194FF',
		borderRadius: 20,
		padding: 10,
		elevation: 2,
		marginLeft: (Platform.isPad === true) ? '-45%' : (Dimensions.get('window').width >= 414) ? '-45%' : '60%',
		backgroundColor: '#232159',
		marginTop : (Platform.isPad === true) ? '2%' : (Dimensions.get('window').width >= 414) ? '2%' : (Platform.OS === 'android') ? '8%' : '4%',
		
	},
	notifyModalR : {
		backgroundColor: '#F194FF',
		borderRadius: 20,
		padding: 10,
		elevation: 2,
		marginLeft: (Platform.isPad === true) ? '50%' : (Dimensions.get('window').width >= 414) ? '50%' : (Platform.OS === 'android') ? '-50%' : '-50%',
		marginTop : (Platform.isPad === true) ? '-6%' : (Dimensions.get('window').width >= 414) ? '-5%' : (Platform.OS === 'android') ? '-15%' : '-15%',
		backgroundColor: '#982A72',
		
	},

	formReport : {
		fontSize : 18,
		color : '#232159',
		fontWeight: 'bold',
		width : 10,
		height : 10,
		marginLeft: '2%',
		color: 'white'
		
	  },

	  infotitlereport : {
		fontSize: 18,
		marginLeft: 10,
		marginTop: 10,
		marginBottom: '-10%',

	  },
	  centeredViewModal: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 22,
	  },
	  modalView: {
		margin: 20,
		backgroundColor: 'white',
		borderRadius: 20,
		padding: 35,
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: {
		  width: 0,
		  height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	  },
	  modalView2: {
		margin: 20,
		backgroundColor: 'white',
		borderRadius: 20,
		padding: 35,
		shadowOffset: {
		  width: 0,
		  height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	  },
	  textStyleModal: {
		color: 'white',
		fontWeight: 'bold',
		textAlign: 'center',
		fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : null
	  },
	  //Report
	  ReportsBoldText : {
		fontWeight: 'bold',
		fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 16,
		marginBottom : '-8%'
	  },
	  ReportsText : {
		fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 15,
		marginTop : '10%',
		marginBottom : '-6%'
	  },
	  ReportsTextDate : {
		fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 14,
	  },
	  ReportimageBox: {
		width: (Platform.isPad === true) ? 90 : (Dimensions.get('window').width >= 414) ? 90 : 70,
    	height: (Platform.isPad === true) ? 90 : (Dimensions.get('window').width >= 414) ? 90 : 70,
		borderWidth: 2,
    	borderRadius: 150 / 2,
		marginTop : (Platform.isPad === true) ? '-13%' : (Dimensions.get('window').width >= 414) ? '-13%' : '-20%',
		marginLeft : (Platform.isPad === true) ? '-50%' : (Dimensions.get('window').width >= 414) ? '-50%' : '-55%'
	  },
	  IconCreateReport : {                                                
		position: 'absolute',                                          
		bottom: 25,                                                    
		right: 25, 
		borderWidth:1,
		borderColor:'rgba(0,0,0,0.2)',
		alignItems:'center',
		justifyContent:'center',
		width: (Platform.isPad === true) ? 70 : (Dimensions.get('window').width >= 414) ? 70 : 50,
		height: (Platform.isPad === true) ? 70 : (Dimensions.get('window').width >= 414) ? 70 : 50,
		backgroundColor:'#fff',
		borderRadius:50,
	  },
	  textReports : {
		fontSize: (Platform.isPad === true) ? 20 : (Dimensions.get('window').width >= 414) ? 20 : 14
		},
	  ReportIcons : {
		marginLeft : (Platform.isPad === true) ? '10%' : (Dimensions.get('window').width >= 414) ? '10%' : '10%',
		marginTop : (Platform.isPad === true) ? '5%' : (Dimensions.get('window').width >= 414) ? '5%' : null,
		color : '#000'
		},
	  imageReport: {
		width: 90,
    	height: 90,
		borderWidth: 2,
    	borderRadius: 150 / 2,
		marginTop : '10%',
		backgroundColor : '#fff',
	  },
	  tableColumnTotalsReports: {
        alignItems: "center",
        backgroundColor: "#eeeeee",
        flex: 2,
        justifyContent: "center",
        margin: (Platform.isPad === true) ? 5 : (Dimensions.get('window').width >= 414) ? 5 :  1
     },
	 tableRowReport: {
        flex: 5,
        flexDirection: "row",
        maxHeight: 30,
		marginTop : (Platform.isPad === true) ? '2%' : (Dimensions.get('window').width >= 414) ? '2%' : null
     },
	 tableRowImagesReport: {
        flex: 5,
        flexDirection: "row",
        maxHeight: 1000
     },
	 textLineItemReport: {
        color: "#000",
		fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : null
      },
	  textLineItemReportFeedback: {
        color: "#000",
		fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 15 
      },
	  textLineItemReportFeedback2: {
        color: "#fff",
		fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 15 
      },
	  textLineItemReportClose: {
        color: "#DA133D",
		fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 15
      },
	  textLineItemReportActive: {
        color: "#17C41F",
		fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 15
      },
	  
	  //Reply Reports
	  inputReply: {
		backgroundColor: '#FFF',
		marginBottom: 30,
		width:200,	
	},
	openButtonReply: {
		backgroundColor: '#392B84',
		borderRadius: 20,
		padding: 10,
		elevation: 2,
	  },
	  reportedButtonReply: {
		backgroundColor: '#B32828',
		borderRadius: 20,
		padding: 10,
		elevation: 2,
		marginTop : '5%',
		marginBottom : '5%',
		marginLeft : '5%',
		marginRight : '5%',
	  },
	  textStyleReply: {
		color: 'white',
		fontWeight: 'bold',
		textAlign: 'center',
	  },
	//Report Feedback
	imageFeedback: {
		marginTop : '8%',
	},
	buttonsreport : {
		marginBottom: '3%',
	},
	itemReportRecive : {
		    padding: '5%',
			marginTop: '5%',
			borderBottomRightRadius: 15,
            borderBottomLeftRadius: 15,
            borderTopRightRadius: 15,
            borderTopLeftRadius: 0,
			backgroundColor: '#392B84',
			fontSize: 24,
			flexDirection: 'column'
	},
	itemReportRecive2 : {
		    padding: '5%',
			marginTop: '5%',
			borderBottomRightRadius: 0,
            borderBottomLeftRadius: 15,
            borderTopRightRadius: 15,
            borderTopLeftRadius: 15,
			backgroundColor: '#e581c3',
			fontSize: 24,
			flexDirection: 'column'
	},
	itemReportRecive2Date : {
		padding: '5%',
		marginTop: '5%',
		borderBottomRightRadius: 15,
		borderBottomLeftRadius: 15,
		borderTopRightRadius: 15,
		borderTopLeftRadius: 15,
		backgroundColor: '#394893',
		fontSize: 24,
		flexDirection: 'column'
},
	tableColumnTotalsReportsF : {
		alignItems: "center",
        backgroundColor: "#392B84",
        flex: 2,
        justifyContent: "center",
        margin: 1,
	},
	tableColumnTotalsReportsFHour : {
		alignItems: "center",
        flex: 2,
        justifyContent: "center",
        margin: 1,
		marginTop : (Platform.isPad === true) ? '-1%' : (Dimensions.get('window').width >= 414) ? '-1%' : '5%',
		marginRight : '-60%'
	},
	tableColumnTotalsReportsFHour1char : {
		alignItems: "center",
        flex: 2,
        justifyContent: "center",
        margin: 1,
		marginRight : '-50%'
	},
	tableColumnTotalsReportsFtitle : {
		alignItems: "flex-start",
        backgroundColor: "#392B84",
        flex: 2,
        justifyContent: "flex-start",
        margin: 1	
	},
	tableColumnTotalsReportsF2 : {
		alignItems: "center",
        backgroundColor: "#e581c3",
        flex: 2,
        justifyContent: "center",
        margin: 1,	
		marginBottom : (Platform.isPad === true) ? '5%' : (Dimensions.get('window').width >= 414) ? '5%' : '-4%',
	},
	tableColumnTotalsReportsF2photo : {
		alignItems: "center",
        backgroundColor: "#e581c3",
        flex: 2,
        justifyContent: "center",
        margin: 1,
		marginTop : (Platform.isPad === true) ? '-2%' : (Dimensions.get('window').width >= 414) ? '-2%' : '5%',	
		marginBottom : (Platform.isPad === true) ? '2%' : (Dimensions.get('window').width >= 414) ? '2%' : '-14%',
	},
	tableColumnTotalsReportsF21char : {
		alignItems: "center",
        backgroundColor: "#e581c3",
        flex: 2,
        justifyContent: "center",
        margin: 1,
		marginBottom : (Platform.isPad === true) ? '-5%' : (Dimensions.get('window').width >= 414) ? '-5%' : '-12%',
		marginRight : '35%'
	},
	tableColumnTotalsReportsF210char : {
		alignItems: "center",
        backgroundColor: "#e581c3",
        flex: 2,
        justifyContent: "center",
        margin: 1,
		marginBottom : (Platform.isPad === true) ? '-5%' : (Dimensions.get('window').width >= 414) ? '-5%' : '-12%',
		marginRight : '40%'
	},
	tableColumnTotalsReportsF220char : {
		alignItems: "center",
        backgroundColor: "#e581c3",
        flex: 2,
        justifyContent: "center",
        margin: 1,
		marginBottom : (Platform.isPad === true) ? '-5%' : (Dimensions.get('window').width >= 414) ? '-5%' : '-12%',
		marginRight : '40%'
	},
	tableColumnTotalsReportsF2Hour : {
		alignItems: "center",
        flex: 2,
        justifyContent: "center",
        margin: 1,
		marginBottom : '-20%',
		marginRight : '-45%'
	},
	tableColumnTotalsReportsFHour21char : {
		alignItems: "center",
        flex: 2,
        justifyContent: "center",
        margin: 1,
		marginBottom : (Platform.isPad === true) ? '-4%' : (Dimensions.get('window').width >= 414) ? '-4%' : '-28%',
		marginRight : (Platform.isPad === true) ? '-5%' : (Dimensions.get('window').width >= 414) ? '-5%' : '-3%'
	},
	tableColumnTotalsReportsFHour210char : {
		alignItems: "center",
        flex: 2,
        justifyContent: "center",
        margin: 1,
		marginBottom : (Platform.isPad === true) ? '-4%' : (Dimensions.get('window').width >= 414) ? '-4%' : '-28%',
		marginRight : (Platform.isPad === true) ? '-35%' : (Dimensions.get('window').width >= 414) ? '-35%' : '-40%'
	},
	tableColumnTotalsReportsFHour220char : {
		alignItems: "center",
        flex: 2,
        justifyContent: "center",
        margin: 1,
		marginBottom : (Platform.isPad === true) ? '-4%' : (Dimensions.get('window').width >= 414) ? '-4%' : '-30%',
		marginRight : (Platform.isPad === true) ? '-50%' : '-50%'
	},
	ReportFeedbackMarginsSender : {
		marginLeft: '5%',
		marginRight : (Platform.isPad === true) ? '50%' : (Dimensions.get('window').width >= 414) ? '50%' : '30%',
		marginBottom : '5%',
	},
	ReportFeedbackMarginsSender1char : {
		marginLeft: '5%',
		marginRight : (Platform.isPad === true) ? '50%' : (Dimensions.get('window').width >= 414) ? '50%' : '55%',
		marginBottom : '5%',
	},
	ReportFeedbackMarginsUser1char : {
		marginLeft: (Platform.isPad === true) ? '65%' : (Dimensions.get('window').width >= 414) ? '50%' : '55%',
		marginRight : '5%',
		marginBottom : '5%',
	},
	ReportFeedbackMarginsUser10char : {
		marginLeft: (Platform.isPad === true) ? '63%' : (Dimensions.get('window').width >= 414) ? '50%' : '45%',
		marginRight : '5%',
		marginBottom : '5%',
	},
	ReportFeedbackMarginsUser20char : {
		marginLeft: (Platform.isPad === true) ? '50%' : (Dimensions.get('window').width >= 414) ? '50%' : '34%',
		marginRight : '5%',
		marginBottom : '5%',
	},
	ReportFeedbackMarginsUser : {
		marginLeft: (Platform.isPad === true) ? '50%' : (Dimensions.get('window').width >= 414) ? '50%' : '30%',
		marginRight : '5%',
		marginBottom : '5%',
	},
	ReportFeedbackMarginsUserDate : {
		marginLeft: (Platform.isPad === true) ? '40%' : (Dimensions.get('window').width >= 414) ? '40%' : '30%',
		marginRight : (Platform.isPad === true) ? '35%' : (Dimensions.get('window').width >= 414) ? '35%' : '25%',
		marginBottom : '5%',
	},
	MarginDateReport : {
		marginLeft : '-5%',
	},
	MarginReportsDes : {
		marginBottom : '-4%',
	},
	ReportFeedbackMargins : {
		marginLeft: '5%',
		marginRight : '5%',
		marginBottom : '5%',
	},
	ImageLoadReportFeedback : {
		width: (Platform.isPad === true) ? 180 : (Dimensions.get('window').width >= 414) ? 180 : 100, 
		height: (Platform.isPad === true) ? 180 : (Dimensions.get('window').width >= 414) ? 180 : 100, 
		backgroundColor: "#DDDDDD", 
		marginLeft : (Platform.isPad === true) ? '40%' : (Dimensions.get('window').width >= 414) ? '40%' : '35%',
		marginBottom : (Platform.isPad === true) ? '2%' : (Dimensions.get('window').width >= 414) ? '2%' : null
	},
	ReportFeedbackRLelements : {
		padding: 6,
		backgroundColor: '#232159',
		position: 'absolute',                                          
		borderWidth:1,
		borderColor:'rgba(0,0,0,0.2)',
		alignItems:'center',
		justifyContent:'center',
		width: (Platform.isPad === true) ? 50 : (Dimensions.get('window').width >= 414) ? 50 : 50,
		height: (Platform.isPad === true) ? 50 : (Dimensions.get('window').width >= 414) ? 50 : 50,
		borderRadius:50,
	},
	ReportFeedbackLLelements : {
		padding: 6,
		backgroundColor: '#F9FAFC',
		width:50,
       	height:43,
	},
	ReportFeedbackIcons : {
		width: '100%',
		color : '#000',
		marginTop : (Platform.isPad === true) ? '15%' : (Dimensions.get('window').width >= 414) ? '5%' : null
	},
	VoucherviewIcons : {
		width: '100%',
		color : '#fff',
		marginTop : (Platform.isPad === true) ? '15%' : (Dimensions.get('window').width >= 414) ? '5%' : null
	},
	ReportFeedbackIconsPaperplane : {
		width: '100%',
		color: 'white',
		marginTop : (Platform.isPad === true) ? '5%' : (Dimensions.get('window').width >= 414) ? '5%' : null
	},
	ReportFeedbackIconsCamera : {
		width: '100%',
		color: '#000',
		marginTop : (Platform.isPad === true) ? '5%' : (Dimensions.get('window').width >= 414) ? '5%' : null
	},
	ReportFeedbackCloseIcon : {
		marginLeft : (Platform.isPad === true) ? '95%' : (Dimensions.get('window').width >= 414) ? '95%' : '85%'
	},
	ReportFeedbackInput : {
		backgroundColor: '#FFF', 
		borderColor: '#FFF', 
		borderWidth : 3, 
		marginLeft : -3, 
		marginRight : -3,
		justifyContent: 'flex-end'
	},
	ReportFeedbackInput3 : {
		backgroundColor: '#FFF', 
		borderColor: '#FFF', 
		borderWidth : 3, 
		justifyContent: 'flex-end',
		fontSize: (Platform.isPad === true) ? 24 : (Dimensions.get('window').width >= 414) ? 24 : null
	},
	ReportFeedbackInput2 : {
		backgroundColor: '#FFF', 
		borderColor: '#FFF', 
		borderWidth : -3, 
		marginLeft : -3, 
		marginRight : -3,
		justifyContent: 'flex-end'
	},
	//ReportInit
	ImageReportInit : {
		width: (Platform.isPad === true) ? 250 : (Dimensions.get('window').width >= 414) ? 250 : 200, 
		height: 200, 
		backgroundColor: "#DDDDDD",
	},
	ReportInitBanner : {
		backgroundColor: '#232159', 
		padding: '5%', 
		height: '11%',
	},
	ReportInitBannerText : {
		textAlign: 'center',
		color: 'white', 
		fontWeight: 'bold', 
		fontSize: 18,
		marginTop: '-8%'
	},
	ReportInitMarginTop : {
		marginTop: '3%'
	},
	ReportInitimageNoti: {
		width: (Platform.isPad === true) ? 90 : (Dimensions.get('window').width >= 414) ? 90 : 70,
    	height: (Platform.isPad === true) ? 90 : (Dimensions.get('window').width >= 414) ? 90 : 70,
		borderWidth: 2,
    	borderRadius: 150 / 2,
		marginTop : (Platform.isPad === true) ? '-13%' : (Dimensions.get('window').width >= 414) ? '-13%' : '-20%',
		backgroundColor : '#fff',
		marginLeft : (Platform.isPad === true) ? '-50%' : (Dimensions.get('window').width >= 414) ? '-50%' : '-60%'

	  },
	  ReportInitBoldText : {
		fontWeight: 'bold',
		fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 15,
	  },
	  inlineDataReportInit: {
		flexWrap: 'wrap', 
        alignItems: 'flex-start',
        flexDirection:'row',
		marginLeft : '-15%',
		
	},
	inlineDataReportInitVoucherTitle: {
		flexWrap: 'wrap', 
        alignItems: 'flex-start',
        flexDirection:'row',
		marginLeft : (Platform.isPad === true) ? '-15%' : (Dimensions.get('window').width >= 414) ? '-15%' : '-20%',
		marginTop : (Platform.isPad === true) ? '-15%' : (Dimensions.get('window').width >= 414) ? '-15%' : '-25%',
		
	},
	inlineDataReportInitVoucherButton : {
		marginLeft : '-15%',
	},
	inlineDataVoucherButton : {
		width: '100%',
	},
	ButtonViewVoucher : {
		fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 15,
		backgroundColor: '#982A72'
	},
	ReportInitIcons : {
		width: '100%',
		color: 'white',
		padding: 10,
		fontSize: (Platform.isPad === true) ? 18 : (Dimensions.get('window').width >= 414) ? 22 : 15,
		marginTop: (Platform.isPad === true) ? '15%' : (Dimensions.get('window').width >= 414) ? '15%' : '15%',
		marginRight : (Platform.isPad === true) ? '10%' : (Dimensions.get('window').width >= 414) ? '10%' : '15%'
	},
	ReportInitIconsGoBack : {
		width: '100%',
		color: 'white',
		fontSize: (Platform.isPad === true) ? 18 : (Dimensions.get('window').width >= 414) ? 17 : 15,
		marginTop: (Platform.isPad === true) ? '15%' : (Dimensions.get('window').width >= 414) ? '15%' : '25%',
		marginRight : (Platform.isPad === true) ? '10%' : (Dimensions.get('window').width >= 414) ? '10%' : '15%'
	},

	Reportcheck: {
		width: 15,
		height: 15,
		marginLeft : '85%',
		marginTop : (Platform.isPad === true) ? '-4%' : (Dimensions.get('window').width >= 414) ? '-4%' : '8%'
	  },
	  Reportcheck2: {
		width: 15,
		height: 15,
		marginLeft : '95%',
		marginTop : (Platform.isPad === true) ? '-4%' : (Dimensions.get('window').width >= 414) ? '-4%' : '11%'
	  },
	  ReportInputText : {
		width: "100%",
		marginLeft : (Platform.isPad === true) ? '-50%' : (Dimensions.get('window').width >= 414) ? '-50%' : '-40%',
		marginRight: "-40%"
	},
	ReportInputTextLeft : {
		width: "23%",
		marginRight: "-10%"
	},
	ReportChatbox : {
		flexDirection: "row",
        justifyContent: "space-between",
        marginTop: '2%', 
        padding: 15
	},
	
	//PaymentHistory
	stackLeftPayments : {
		width: "100%",
		marginRight: (Platform.isPad === true) ? "-53%" : (Dimensions.get('window').width >= 414) ? '-53%' :  "-55%", 
		marginLeft : (Platform.isPad === true) ? "2%" : (Dimensions.get('window').width >= 414) ? "2%" : "0.5%"
	},
	stackRightPayments : {
		width: "100%",
		marginRight: "-55%"
	},
	stackSearchPayments : {
		width: "23%"
	},
	PaymentText : {
		fontSize : (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : null
	},
	PaymentHistoryRLelements : {
		padding: 4,
		backgroundColor: '#FFF',
		width:50,
       	height:38,
	},
	DatesinputRLelements : {
		padding: 4,
		backgroundColor: '#FFF',
		width:50,
       	height:38,
	},
	PaymentHistoryDates : {
		flexDirection: "row",
        justifyContent: "space-between",
        marginTop: '2%',        
        padding: 10
	},
	PaymentHistoryRLelements : {
		padding: 4,
		backgroundColor: '#FFF',
		width:50,
       	height:38,
	},
	PaymentHistorySearchelements : {
		borderWidth:1,
		borderColor:'rgba(0,0,0,0.2)',
		alignItems:'center',
		justifyContent:'center',
		padding: 4,
		backgroundColor: '#982A72',
		width: (Platform.isPad === true) ? 60 : (Dimensions.get('window').width >= 414) ? 50 : 40,
       	height: (Platform.isPad === true) ? 60 : (Dimensions.get('window').width >= 414) ? 50 : 40,
        borderRadius: (Platform.isPad === true) ? 60 : (Dimensions.get('window').width >= 414) ? 60 : 40,
		marginTop: (Platform.isPad === true) ? '-2%' : (Dimensions.get('window').width >= 414) ? '1%' : '2%',
		marginBottom: '10%', 
		marginLeft : (Platform.isPad === true) ? '-5%' : (Dimensions.get('window').width >= 414) ? '1%' : null,
	},
	PaymentHistoryIcons : {
		width: '100%',
		color: 'white'
	},
	PaymentHistoryPrice : {
		marginLeft: "10%",
	  },
	PaymentHistoryPrice2 : {
		marginLeft: (Platform.isPad === true) ? '17%' : (Dimensions.get('window').width >= 414) ? '17%' : "28%",
	  },
	PaymentHistoryimageNoti: {
		width: (Platform.isPad === true) ? 95 : (Dimensions.get('window').width >= 414) ? 95 : 70,
    	height: (Platform.isPad === true) ? 95 : (Dimensions.get('window').width >= 414) ? 95 :  70,
		borderWidth: 2,
    	borderRadius: (Platform.isPad === true) ? 95 / 2 : (Dimensions.get('window').width >= 414) ? 95 /2 : 150 / 2,
		marginTop : (Platform.isPad === true) ? '-15%' : (Dimensions.get('window').width >= 414) ? "-15%" : '-35%',
		backgroundColor : '#fff',
		marginLeft : (Platform.isPad === true) ? '-55%' : (Dimensions.get('window').width >= 414) ? '-55%' : '-60%'

	  },
	  Voucherimage: {
		width: (Platform.isPad === true) ? 95 : (Dimensions.get('window').width >= 414) ? 95 : 70,
    	height: (Platform.isPad === true) ? 95 : (Dimensions.get('window').width >= 414) ? 95 :  70,
		borderWidth: 2,
    	borderRadius: (Platform.isPad === true) ? 95 / 2 : (Dimensions.get('window').width >= 414) ? 95 /2 : 150 / 2,
		marginTop : (Platform.isPad === true) ? '-5%' : (Dimensions.get('window').width >= 414) ? "-5%" : '-10%',
		backgroundColor : '#fff',
		marginLeft : (Platform.isPad === true) ? '-50%' : (Dimensions.get('window').width >= 414) ? '-50%' : '-60%',

	  },
	notifyModalCAddEvent : {
		backgroundColor: '#F194FF',
		borderRadius: 20,
		padding: 10,
		elevation: 2,
		marginRight: '52%',
		marginTop : '-14%',
		backgroundColor: '#982A72',
		
	},

	notifyModalRAddEvent : {
		backgroundColor: '#F194FF',
		borderRadius: 20,
		padding: 10,
		elevation: 2,
		marginLeft: '50%',
		marginTop : (Platform.isPad === true) ? '-6%' : (Dimensions.get('window').width >= 414) ? '-7%' : '-13%',
		backgroundColor: '#982A72',
		
	},
	notifyModalRAddEvent2 : {
		backgroundColor: '#F194FF',
		borderRadius: 20,
		padding: 10,
		elevation: 2,
		marginLeft: '50%',
		marginTop : (Platform.isPad === true) ? '-6.5%' : (Dimensions.get('window').width >= 414) ? '-6.5%' : '-13%',
		backgroundColor: '#982A72',
		
	},
	notifyModalRAddEvent2NativeBase : {
		backgroundColor: '#F194FF',
		borderRadius: 20,
		padding: 10,
		elevation: 2,
		backgroundColor: '#982A72',
		width: '100%',
		
	},
	pickerviewModalRAddEvent1 : {
		marginTop: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-15%' : '-35%' : (Dimensions.get('window').width >= 414) ? '-5%' : '-10%', 
		marginBottom: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '30%' : '50%' : (Dimensions.get('window').width >= 414) ? '3%' : 0,
		marginLeft: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '18%' : '5%' : (Dimensions.get('window').width >= 414) ? '18%' : '10%', 
	},
	pickerviewModalRAddEvent2 : {
		marginTop: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-15%' : '-35%' : (Dimensions.get('window').width >= 414) ? '-5%' : '-10%', 
		marginBottom: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '30%' : '50%' : (Dimensions.get('window').width >= 414) ? '3%' : 0,
		marginLeft: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '18%' : '5%' : (Dimensions.get('window').width >= 414) ? '18%' : '10%',
	},
	pickerviewModalRAddEvent3 : {
		marginTop: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-15%' : '-35%' : (Dimensions.get('window').width >= 414) ? '-5%' : '-10%', 
		marginBottom: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '30%' : '50%' : (Dimensions.get('window').width >= 414) ? '3%' : 0,
		marginLeft: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '18%' : '5%' : (Dimensions.get('window').width >= 414) ? '18%' : '10%', 
	},
	pickerviewModalRAddEvent4 : {
		marginTop: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-15%' : '-35%' : (Dimensions.get('window').width >= 414) ? '-5%' : '-10%', 
		marginBottom: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '30%' : '50%' : (Dimensions.get('window').width >= 414) ? '3%' : 0,
		marginLeft: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '18%' : '5%' : (Dimensions.get('window').width >= 414) ? '18%' : '10%',
	},
	pickerviewModalRAddEvent5 : {
		marginTop: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-15%' : '-35%' : (Dimensions.get('window').width >= 414) ? '-5%' : '-10%', 
		marginBottom: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '30%' : '50%' : (Dimensions.get('window').width >= 414) ? '3%' : 0,
		marginLeft: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '18%' : '5%' : (Dimensions.get('window').width >= 414) ? '18%' : '10%',
	},
	pickerviewModalRAddEvent6 : {
		marginTop: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-15%' : '-35%' : (Dimensions.get('window').width >= 414) ? '-5%' : '-10%', 
		marginBottom: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '30%' : '50%' : (Dimensions.get('window').width >= 414) ? '3%' : 0,
		marginLeft: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '18%' : '5%' : (Dimensions.get('window').width >= 414) ? '18%' : '10%', 
	},
	pickerviewModalRAddEvent7 : {
		marginTop: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-15%' : '-35%' : (Dimensions.get('window').width >= 414) ? '-5%' : '-10%', 
		marginBottom: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '30%' : '50%' : (Dimensions.get('window').width >= 414) ? '3%' : 0,
		marginLeft: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '18%' : '5%' : (Dimensions.get('window').width >= 414) ? '18%' : '10%',
	},
	pickerviewModalRAddEvent8 : {
		marginTop: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-15%' : '-35%' : (Dimensions.get('window').width >= 414) ? '-5%' : '-10%', 
		marginBottom: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '30%' : '50%' : (Dimensions.get('window').width >= 414) ? '3%' : 0,
		marginLeft: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '18%' : '5%' : (Dimensions.get('window').width >= 414) ? '18%' : '10%',
	},
	notifyModalCAddEvent2 : {
		backgroundColor: '#232159',
		borderRadius: 20,
		padding: 10,
		elevation: 2,
		marginRight: '52%',
		marginTop : (Platform.isPad === true) ? '-5%' : (Dimensions.get('window').width >= 414) ? '-5%' : '-14%',
		
	},
	notifyModalCAddEvent2NativeBase : {
		backgroundColor: '#232159',
		borderRadius: 20,
		padding: 10,
		elevation: 2,
		width: '100%',
		
	},
	containerNewEvent : {
		marginTop: '10%', 
		alignItems: 'center', 
		justifyContent: 'center'
	},
	viewCalendarAddNewEvent : {
		width: '100%', 
		marginBottom: '20%'
	},
	hideWidthAddnewevet : {
		width: "100%", 
		marginRight: "-55%", 
		marginLeft : "-2%"
	},
	hideWidthAddnewevet2 : {
		width: "100%",  
		marginRight: "-55%"
	},
	pickerModalRAddnewEvent : {
		height:30, 
		width: (Platform.OS === 'android') ? 215 : 200,
		marginLeft : (Platform.isPad === true) ? '-15%' : (Dimensions.get('window').width >= 414) ? '-15%' : '12%',
		
	},

	//Card Calendar
	cardNewEventDesingColor1: {
        borderRadius: 6,
        elevation: 3,
		backgroundColor: '#232159',
        shadowOffset: { width:1, height:1 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: 2,
        marginVertical: 6, 
		marginLeft: '-4%',
		marginTop: (Platform.isPad === true) ? '-3%' : (Dimensions.get('window').width >= 414) ? '-3%' : '-5%',
		marginBottom : (Platform.isPad === true) ? '-16%' :  (Dimensions.get('window').width >= 414) ? '-16.5%' : '-27%',
    },
	cardNewEventDesingColor2: {
        borderRadius: 6,
        elevation: 3,
		backgroundColor: '#982A72',
        shadowOffset: { width:1, height:1 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: 2,
        marginVertical: 6, 
		marginLeft: '-4%',
		marginTop: (Platform.isPad === true) ? '-3%' : (Dimensions.get('window').width >= 414) ? '-3%' : '-5%',
		marginBottom : (Platform.isPad === true) ? '-16%' :  (Dimensions.get('window').width >= 414) ? '-16.5%' : '-27%',
    },
	cardNewEventDesingColor3: {
        borderRadius: 6,
        elevation: 3,
		backgroundColor: '#394893',
        shadowOffset: { width:1, height:1 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: 2,
        marginVertical: 6, 
		marginLeft: '-4%',
		marginTop: (Platform.isPad === true) ? '-3%' : (Dimensions.get('window').width >= 414) ? '-3%' : '-5%',
		marginBottom : (Platform.isPad === true) ? '-16%' :  (Dimensions.get('window').width >= 414) ? '-16.5%' : '-27%',
    },
	cardNewEventDesingColor4: {
        borderRadius: 6,
        elevation: 3,
		backgroundColor: '#A54483',
        shadowOffset: { width:1, height:1 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: 2,
        marginVertical: 6, 
		marginLeft: '-4%',
		marginTop: (Platform.isPad === true) ? '-3%' : (Dimensions.get('window').width >= 414) ? '-3%' : '-5%',
		marginBottom : (Platform.isPad === true) ? '-16%' :  (Dimensions.get('window').width >= 414) ? '-16.5%' : '-27%',
    },
	cardNewEventDesingColor5: {
        borderRadius: 6,
        elevation: 3,
		backgroundColor: '#5D418D',
        shadowOffset: { width:1, height:1 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: 2,
        marginVertical: 6, 
		marginLeft: '-4%',
		marginTop: (Platform.isPad === true) ? '-3%' : (Dimensions.get('window').width >= 414) ? '-3%' : '-5%',
		marginBottom : (Platform.isPad === true) ? '-16%' :  (Dimensions.get('window').width >= 414) ? '-16.5%' : '-27%',
    },
	cardNewEventDesingColor6: {
        borderRadius: 6,
        elevation: 3,
		backgroundColor: '#392B84',
        shadowOffset: { width:1, height:1 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: 2,
        marginVertical: 6, 
		marginLeft: '-4%',
		marginTop: (Platform.isPad === true) ? '-3%' : (Dimensions.get('window').width >= 414) ? '-3%' : '-5%',
		marginBottom : (Platform.isPad === true) ? '-16%' :  (Dimensions.get('window').width >= 414) ? '-16.5%' : '-27%',
    },
	cardNewEventDesingColor7: {
        borderRadius: 6,
        elevation: 3,
		backgroundColor: '#232159',
        shadowOffset: { width:1, height:1 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: 2,
        marginVertical: 6, 
		marginLeft: '-4%',
		marginTop: (Platform.isPad === true) ? '-3%' : (Dimensions.get('window').width >= 414) ? '-3%' : '-5%',
		marginBottom : (Platform.isPad === true) ? '-16%' :  (Dimensions.get('window').width >= 414) ? '-16.5%' : '-27%',
    },
	cardNewEventDesingColor8: {
        borderRadius: 6,
        elevation: 3,
		backgroundColor: '#B15391',
        shadowOffset: { width:1, height:1 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: 2,
        marginVertical: 6, 
		marginLeft: '-4%',
		marginTop: (Platform.isPad === true) ? '-3%' : (Dimensions.get('window').width >= 414) ? '-3%' : '-5%',
		marginBottom : (Platform.isPad === true) ? '-16%' :  (Dimensions.get('window').width >= 414) ? '-16.5%' : '-27%',
    },
	cardNewEventDesingColorA: {
        borderRadius: 6,
        elevation: 3,
		backgroundColor: '#C471CF',
        shadowOffset: { width:1, height:1 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: 2,
        marginVertical: 6, 
		marginLeft: '-4%',
		marginTop: (Platform.isPad === true) ? '-3%' : (Dimensions.get('window').width >= 414) ? '-3%' : '-5%',
		marginBottom : (Platform.isPad === true) ? '-16%' :  (Dimensions.get('window').width >= 414) ? '-16.5%' : '-27%',
    },
	cardNewEventDesingColor1createevent: {
        borderRadius: 6,
        elevation: 3,
		backgroundColor: '#232159',
        shadowOffset: { width:1, height:1 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: 2,
        marginVertical: 6, 
		marginLeft: '-4%',
		marginTop: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-3%' : '-5%' : (Dimensions.get('window').width >= 414) ? '-3%' : '-4.8%',
		marginBottom : (Platform.isPad === true) ? '-16%' :  (Dimensions.get('window').width >= 414) ? '-16.5%' : '-16%',
		width: (Platform.isPad === true) ? '24%' : (Dimensions.get('window').width >= 414) ? '24%' : null,
    },
	cardNewEventDesingColor2createevent: {
        borderRadius: 6,
        elevation: 3,
		backgroundColor: '#982A72',
        shadowOffset: { width:1, height:1 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: 2,
        marginVertical: 6, 
		marginLeft: '-4%',
		marginTop: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-3%' : '-5%' : (Dimensions.get('window').width >= 414) ? '-3%' : '-4.8%',
		marginBottom : (Platform.isPad === true) ? '-16%' :  (Dimensions.get('window').width >= 414) ? '-16.5%' : '-16%',
		width: (Platform.isPad === true) ? '24%' : (Dimensions.get('window').width >= 414) ? '24%' : null,
    },
	cardNewEventDesingColor3createevent: {
        borderRadius: 6,
        elevation: 3,
		backgroundColor: '#394893',
        shadowOffset: { width:1, height:1 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: 2,
        marginVertical: 6, 
		marginLeft: '-4%',
		marginTop: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-3%' : '-5%' : (Dimensions.get('window').width >= 414) ? '-3%' : '-4.8%',
		marginBottom : (Platform.isPad === true) ? '-16%' :  (Dimensions.get('window').width >= 414) ? '-16.5%' : '-16%',
		width: (Platform.isPad === true) ? '24%' : (Dimensions.get('window').width >= 414) ? '24%' : null,
    },
	cardNewEventDesingColor4createevent: {
        borderRadius: 6,
        elevation: 3,
		backgroundColor: '#A54483',
        shadowOffset: { width:1, height:1 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: 2,
        marginVertical: 6, 
		marginLeft: '-4%',
		marginTop: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-3%' : '-5%' : (Dimensions.get('window').width >= 414) ? '-3%' : '-4.8%',
		marginBottom : (Platform.isPad === true) ? '-16%' :  (Dimensions.get('window').width >= 414) ? '-16.5%' : '-16%',
		width: (Platform.isPad === true) ? '24%' : (Dimensions.get('window').width >= 414) ? '24%' : null,
    },
	cardNewEventDesingColor5createevent: {
        borderRadius: 6,
        elevation: 3,
		backgroundColor: '#5D418D',
        shadowOffset: { width:1, height:1 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: 2,
        marginVertical: 6, 
		marginLeft: '-4%',
		marginTop: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-3%' : '-5%' : (Dimensions.get('window').width >= 414) ? '-3%' : '-4.8%',
		marginBottom : (Platform.isPad === true) ? '-16%' :  (Dimensions.get('window').width >= 414) ? '-16.5%' : '-16%',
		width: (Platform.isPad === true) ? '24%' : (Dimensions.get('window').width >= 414) ? '24%' : null,
    },
	cardNewEventDesingColor6createevent: {
        borderRadius: 6,
        elevation: 3,
		backgroundColor: '#392B84',
        shadowOffset: { width:1, height:1 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: 2,
        marginVertical: 6, 
		marginLeft: '-4%',
		marginTop: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-3%' : '-5%' : (Dimensions.get('window').width >= 414) ? '-3%' : '-4.8%',
		marginBottom : (Platform.isPad === true) ? '-16%' :  (Dimensions.get('window').width >= 414) ? '-16.5%' : '-16%',
		width: (Platform.isPad === true) ? '24%' : (Dimensions.get('window').width >= 414) ? '24%' : null,
    },
	cardNewEventDesingColor7createevent: {
        borderRadius: 6,
        elevation: 3,
		backgroundColor: '#232159',
        shadowOffset: { width:1, height:1 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: 2,
        marginVertical: 6, 
		marginLeft: '-4%',
		marginTop: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-3%' : '-5%' : (Dimensions.get('window').width >= 414) ? '-3%' : '-4.8%',
		marginBottom : (Platform.isPad === true) ? '-16%' :  (Dimensions.get('window').width >= 414) ? '-16.5%' : '-16%',
		width: (Platform.isPad === true) ? '24%' : (Dimensions.get('window').width >= 414) ? '24%' : null,
    },
	cardNewEventDesingColor8createevent: {
        borderRadius: 6,
        elevation: 3,
		backgroundColor: '#B15391',
        shadowOffset: { width:1, height:1 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: 2,
        marginVertical: 6, 
		marginLeft: '-4%',
		marginTop: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-3%' : '-5%' : (Dimensions.get('window').width >= 414) ? '-3%' : '-4.8%',
		marginBottom : (Platform.isPad === true) ? '-16%' :  (Dimensions.get('window').width >= 414) ? '-16.5%' : '-16%',
		width: (Platform.isPad === true) ? '24%' : (Dimensions.get('window').width >= 414) ? '24%' : null,
    },
	cardNewEventDesingColorAcreateevent: {
        borderRadius: 6,
        elevation: 3,
		backgroundColor: '#C471CF',
        shadowOffset: { width:1, height:1 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: 2,
        marginVertical: 6, 
		marginLeft: '-4%',
		marginTop: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-3%' : '-5%' : (Dimensions.get('window').width >= 414) ? '-3%' : '-4.8%',
		marginBottom : (Platform.isPad === true) ? '-16%' :  (Dimensions.get('window').width >= 414) ? '-16.5%' : '-16%',
		width: (Platform.isPad === true) ? '24%' : (Dimensions.get('window').width >= 414) ? '24%' : null,
		
    },
	YoureventsButtom : {
		marginBottom : '5%'
	},
	YoureventsHeight : {
		height: Platform.OS === 'ios' ? (Platform.isPad === true) ? '60%' : '45%' : (Dimensions.get('window').width >= 414) ? '60%' : '45%',
		
	},
	YoureventsHeight2 : {
		height: Platform.OS === 'ios' ? (Platform.isPad === true) ? '100%' : '100%' : (Dimensions.get('window').width >= 414) ? '100%' : '100%',
		
	},
	calendarStyle : {
		height: Platform.OS === 'ios' ? (Platform.isPad === true) ? 400 : 350 : (Dimensions.get('window').width >= 414) ? 400 : 360
	},
	cardCalendar2: {
		marginTop: Platform.OS === 'ios' ? (Platform.isPad === true) ? '1%' : '-3%' : (Dimensions.get('window').width >= 414) ? '1%' : '1%',
        borderRadius: 6,
        elevation: 3,
		backgroundColor: '#F4FBFE',
        shadowOffset: { width:1, height:1 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: 4,
        marginVertical: 6
    },
	cardCalendar: {
		marginTop: Platform.OS === 'ios' ? (Platform.isPad === true) ? '2%' : '-3%' : (Dimensions.get('window').width >= 414) ? '2%' : '1%',
        borderRadius: 6,
        elevation: 3,
		backgroundColor: '#F4FBFE',
        shadowOffset: { width:1, height:1 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: 4,
        marginVertical: 6
    },
    cardContentCalendar: {
        marginHorizontal: 18,
        marginVertical: 10,
    },
	card2: {
        borderRadius: 6,
        elevation: 3,
		backgroundColor: '#4D77FF',
        shadowOffset: { width:1, height:1 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: 4,
        marginVertical: 6
    },
    cardContent2: {
        marginHorizontal: 18,
        marginVertical: 10,
    },
	card3: {
        borderRadius: 6,
        elevation: 3,
		backgroundColor: '#B4AEE8',
        shadowOffset: { width:1, height:1 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: 4,
        marginVertical: 6
    },
    cardContent3: {
        marginHorizontal: 18,
        marginVertical: 10,
    },
	card4: {
        borderRadius: 6,
        elevation: 3,
		backgroundColor: '#ED5EDD',
        shadowOffset: { width:1, height:1 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: 4,
        marginVertical: 6
    },
    cardContent4: {
        marginHorizontal: 18,
        marginVertical: 10,
    },
	cardRoomNew : {
		borderRadius: 6,
        elevation: 3,
        backgroundColor: '#fff',
        shadowOffset: { width:1, height:1 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: 4,
        marginVertical: 6
	},
	marginTopRequiredFields : {
		marginTop: '5%'
	},
	//Welcome page
	tituloWelcome: {
		textAlign: 'center',
		marginBottom: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 20 : 10 : 20,
		fontSize: (Platform.OS === 'ios') ? 22 : (Dimensions.get('window').width >= 414) ? 36 : 22,
		fontWeight: 'bold',
		color: '#000000'
	},
	imageWelcome: {
		flexDirection: 'row',
		width: (Platform.OS === 'ios') ? '100%' : '100%',
		height: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '120%' : '95%' : (Dimensions.get('window').width >= 414) ? '130%' : '100%',
		marginTop : (Platform.OS === 'ios') ? '15%' : (Dimensions.get('window').width >= 414) ? '5%' : '15%',
	  },
	  botonWelcome: {
		backgroundColor: '#982A72',
		marginTop: (Platform.OS === 'ios') ? '15%' : (Dimensions.get('window').width >= 414) ? '10%' : '15%',
		marginBottom: '10%',
		width: '45%',
		marginLeft : '50%',
	},
	WelcomeTextandBoton : {
		marginTop: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '30%' : '20%' : (Dimensions.get('window').width >= 414) ? '30%' : '20%', 
		marginLeft: '5%', 
		marginRight: '5%'
	},
	WelcomeImageMargin : {
		marginTop: '-2%', 
		marginLeft: '5%', 
		marginRight : '5%',
		height : Dimensions.get('window').height / 2
	},
	//Tell us about your Location
	TellusTextandBoton : {
		marginTop: (Platform.OS === 'ios') ? '20%' : (Dimensions.get('window').width >= 414) ? '30%' : '20%', 
		marginLeft: '5%', 
		marginRight: '5%'
	},
	imageTellus: {
		flexDirection: 'row',
		width: (Platform.OS === 'ios') ? '100%' : '100%',
		height: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '120%' : '95%' : (Dimensions.get('window').width >= 414) ? '130%' : '100%',
		marginTop : (Platform.OS === 'ios') ? (Platform.isPad === true) ? '5%' : '15%' : (Dimensions.get('window').width >= 414) ? '5%' : '15%',
	  },
	TellusProgress : {
		marginTop: '5%', 
		marginBottom: '-5%'
	},
	//Your Room Welcome
	imageYourroom: {
		flexDirection: 'row',
		width: (Platform.OS === 'ios') ? '100%' : '100%',
		height: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '120%' : '95%' : (Dimensions.get('window').width >= 414) ? '130%' : '100%',
		marginTop : (Platform.OS === 'ios') ? (Platform.isPad === true) ? '5%' : '15%' : (Dimensions.get('window').width >= 414) ? '5%' : '15%',
	  },
	  YourroomTextandBoton : {
		marginTop: (Platform.OS === 'ios') ? '25%' : (Dimensions.get('window').width >= 414) ? '30%' : '25%', 
		marginLeft: '5%', 
		marginRight: '5%'
	},
	//Congratulations
	CongratulationsTextandBoton : {
		marginTop: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '20%' : '-10%' : (Dimensions.get('window').width >= 414) ? '20%' : '3%', 
		marginLeft: '5%', 
		marginRight: '5%'
	},
	imageCongratulations:{
		flexDirection: 'row',
		width: (Platform.OS === 'ios') ? '100%' : '100%',
		height: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '120%' : '95%' : (Dimensions.get('window').width >= 414) ? '125%' : '100%',
	  },
	tituloCongratulations: {
		textAlign: 'center',
		marginBottom: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 10 : 10 : 20,
		fontSize: 16,
		fontWeight: 'bold',
		color: '#000000'
	},
	tituloCongratulations2: {
		textAlign: 'center',
		marginBottom: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 20 : 10 : 20,
		fontSize: 20,
		fontWeight: 'bold',
		color: '#000000'
	},
	CongratulationsTextUp : {
		marginTop: '5%', 
		marginLeft: '5%', 
		marginRight: '5%',
		marginBottom : '5%'
	},
	botonCongratulations: {
		marginTop: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '10%' : '15%' : (Dimensions.get('window').width >= 414) ? '8%' : '15%',
		backgroundColor: '#982A72',
		marginBottom: '10%',
		width: '40%',
		marginLeft : '5%',
	},
	botonCongratulations2: {
		marginTop: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-15%' : '-20.9%' : (Dimensions.get('window').width >= 414) ? '-15%' : '-20.9%', 
		width: '40%',
		marginLeft : '55%',
		borderColor: '#982A72',
		borderWidth: 2,
	},
	botonCongratulations3: {
		marginTop: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-15%' : '-20.9%' : (Dimensions.get('window').width >= 414) ? '-14.5%' : '-20.9%', 
		width: '40%',
		marginLeft : '55%',
		borderColor: '#982A72',
		borderWidth: 2,
	},
	botonTextoBlack:{
		flex: 1,
		textTransform: 'uppercase',
		fontWeight: 'bold',
		color: '#000',
		textAlign: 'center',
		fontSize: (Platform.isPad === true) ? 20 : (Dimensions.get('window').width >= 414) ? 20 : 18
	},
	botonTextoIconBlack:{
		flex: 1,
		textTransform: 'uppercase',
		fontWeight: 'bold',
		color: '#000',
		textAlign: 'center',
		fontSize: (Platform.isPad === true) ? 17 : (Dimensions.get('window').width >= 414) ? 17 :  16
	},
	
	//End Register
	imageEndregister: {
		flexDirection: 'row',
		width: (Platform.OS === 'ios') ? '100%' : '100%',
		height: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '120%' : '90%' : (Dimensions.get('window').width >= 414) ? '130%' : '95%',
		marginTop : (Platform.OS === 'ios') ? (Platform.isPad === true) ? '5%' : '20%' : (Dimensions.get('window').width >= 414) ? '5%' : '15%',
	  },
	//NoInternetConnection
	StacknoInternetConnection : {
		marginTop: '2%',
		marginLeft: '10%', 
		marginRight: '10%'
	},
	//Emptys 
	NoEventsCalendar : {
		marginTop: '-2%', 
		marginLeft: '5%', 
		marginRight : '5%',
		marginBottom : '5%',
		height : Dimensions.get('window').height / 4
	},
	imageNoEventsCalendar: {
		flexDirection: 'row',
		width: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '45%' : '70%' : (Dimensions.get('window').width >= 414) ? '45%' : '70%',
		height: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '90%' : '100%' : (Dimensions.get('window').width >= 414) ? '90%' : '100%',
		marginTop : (Platform.OS === 'ios') ? '5%' : (Dimensions.get('window').width >= 414) ? '5%' : '5%',
		marginLeft : (Platform.OS === 'ios') ? (Platform.isPad === true) ? '30%' : '15%' : (Dimensions.get('window').width >= 414) ? '30%' : '15%',	
	  },
	  imageNotInternet: {
		flexDirection: 'row',
		width: (Platform.OS === 'ios') ? '100%' : '100%',
		height: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '120%' : '80%' : (Dimensions.get('window').width >= 414) ? '130%' : '100%',
		marginTop : (Platform.OS === 'ios') ? '25%' : (Dimensions.get('window').width >= 414) ? '5%' : '15%',
	  },
	  NoInternetCalendar: {
		textAlign: 'center',
		fontSize: (Platform.OS === 'ios') ? 18 : (Dimensions.get('window').width >= 414) ? 36 : 18,
		fontWeight: 'bold',
		color: '#000000'
	},
	imageNoInternetCalendar: {
		flexDirection: 'row',
		width: (Platform.OS === 'ios') ? '70%' : '100%',
		height: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '90%' : '100%' : (Dimensions.get('window').width >= 414) ? '130%' : '100%',
		marginTop : (Platform.OS === 'ios') ? '3%' : (Dimensions.get('window').width >= 414) ? '5%' : '15%',
		marginLeft : (Platform.OS === 'ios') ? '15%' : 0,	
	  },
	  TryAgainCalendarnoInternet:{
		color: '#232159',
		marginTop: '3%',
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: (Platform.isPad === true) ? 16 : (Dimensions.get('window').width >= 414) ? 22 : 16,
		textTransform: 'uppercase'	
	},
	TryAgainCalendarYearnoInternet:{
		color: '#232159',
		marginTop: '10%',
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 18,
		textTransform: 'uppercase'	
	},
	//Skeleton
	skeletonMarginTop : {
		marginTop: '5%'
	},
	skeletonMarginTopVoucher : {
		marginTop: '-5%'
	},
	skeletonMarginBottomStudentNot : {
		marginBottom : '5%'
	},
	skeletonMarginProfileText : {
		marginLeft : '5%', 
		marginRight : '5%', 
		marginTop : '5%'
	},

	//Spinner Internet
	spinnerRefreshInternet : {
		marginTop: '8%'
	},
	//Room Register
	RoomregisterViewErrorMessager : {
		marginTop: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-5%' : '2%' : '-10%', 
		marginBottom: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '10%' : '2%' : null, 
		alignItems : 'center',
		marginLeft: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '25%' : null : (Dimensions.get('window').width >= 414) ? '20%' : '5%', 
	},
	RoomregisterTextErrorMessager : {
		fontSize : (Dimensions.get('window').width >= 414) ? 20 : 14
	},

	//Flalist
	BottomMarginFlatlist : {
		marginBottom : '20%'
	},

	//BasiceditProfile
	iconBasiceditProfile : {
		height: (Platform.isPad === true) ? '80%' : (Dimensions.get('window').width >= 414) ? "80%" : '60%',
		width: (Platform.isPad === true) ? '80%' : (Dimensions.get('window').width >= 414) ? "80%" : '60%',
	},

	//Delete
	botonDeleteUser: {
		backgroundColor: '#982A72',
		marginTop: '5%',
		marginBottom: '10%',
		width: '45%',
		
	},

	//RoomEditNativeBaseVersion
	EditRoomPicker : {
		width: (Platform.OS === 'ios') ? '100%' : (Dimensions.get('window').width >= 414) ? '100%' : '100%',
	},
	EditRoomText : {
		fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 18, 
		color: '#982A72',
	},
	EditRoomInputWeekly : {
		marginLeft: (Dimensions.get('window').width >= 414) ? "25%" : "0%"
	},
	EditRoomInputWeeklyBar : {
		fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 15,
	},
	EditRoomView : {
		marginLeft: (Dimensions.get('window').width >= 414) ? "5%" : "0%"
	},

	//ReportNativeBase
	AvatarReportList : {
		width: (Platform.isPad === true) ? 90 : (Dimensions.get('window').width >= 414) ? 90 : 70, 
		height: (Platform.isPad === true) ? 90 : (Dimensions.get('window').width >= 414) ? 90 : 70, 
		borderWidth: 2, 
		borderRadius: 150 / 2,
	},

	//ProfileNativeBase
	ProfileNativeBaseMarginBottom : {
		marginBottom: '5%'
	},

	//Drawer
	DrawerText : {
		fontSize: (Dimensions.get('window').width >= 414) ? 25 : 14, 
		color: '#fff', 
		fontWeight: 'bold',
	},
	DrawerIcons : {
		height: (Dimensions.get('window').width >= 414) ? 48 : 24, 
		width: (Dimensions.get('window').width >= 414) ? 48 : 24, 
		borderRadius : 50
	},
	DrawerTextNotification : {
		fontSize: (Dimensions.get('window').width >= 414) ? 15 : 10, 
	},
	DrawerbackgroundImage : {
		width: '100%'
	},

	//Tabs
	TabText : {
		fontSize: (Dimensions.get('window').width >= 414) ? 20 : 12, 
		color: '#fff', 
	},
	TabTextGray : {
		fontSize: (Dimensions.get('window').width >= 414) ? 20 : 12, 
		color: '#8B8B8B', 
	},
	TabTextTablet : {
		marginLeft: "15%",
	},

	//Tab Calendar
	TabTextCalendar : {
		fontSize: (Dimensions.get('window').width >= 414) ? 20 : 12, 
		color: '#000', 
	},
	tabiconCalendarNativeBase: {
		height: (Dimensions.get('window').width >= 414) ? 28 : '100%',
		width: (Dimensions.get('window').width >= 414) ? 28 : '100%',
	},

	//EventsHistory
	BackgroundCardsEventsHistory : {
		backgroundColor: '#232159', 
		marginLeft: '-50%'
	}


});

export default globalStyles;