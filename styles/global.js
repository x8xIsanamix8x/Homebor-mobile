import { Row } from 'native-base';
import { StyleSheet, Platform, Dimensions } from 'react-native';
import { marginBottom } from 'styled-system';
import Background from '../assets/img/backgroundNotification.png';


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
		marginBottom: 20,
		fontSize: 32,
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
		backgroundColor: '#FFF'
	},

	botonCrearCuenta: {
		backgroundColor: '#982A72',
		marginTop: (Dimensions.get('window').width >= 414) ? 100 : 10,
		marginBottom: '10%'
	},
	boton: {
		backgroundColor: '#982A72',
		marginTop: (Dimensions.get('window').width >= 414) ? '5%' : 10,
		
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
		fontSize: (Dimensions.get('window').width >= 414) ? 24 : 18
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
	createaccountButton:{
		color: 'white',
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: 18,
		textTransform: 'uppercase'
		
		
	},
	banner: {
		height: (Platform.isPad === true) ? 470 : (Dimensions.get('window').width >= 414) ? 400 : 300,
		flex: 1,
		marginBottom: 20,
		overflow: 'hidden',
		borderWidth: 1,
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
	h_name : {
		fontWeight : "bold", 
		fontSize : (Dimensions.get('window').width >= 414) ? 28 : 18, 
		textAlign: 'center',
		marginBottom: '10%',
	},
	room : {
		fontWeight : "bold", 
		fontSize : (Dimensions.get('window').width >= 414) ? 24 : 16, 
		textAlign: 'center',
		marginLeft : '10%',
		textAlign: 'left',
	},
	roomvar : {
		fontSize : (Dimensions.get('window').width >= 414) ? 22 : 16, 
		textAlign: 'center',
		marginLeft : '15%',
		textAlign: 'left',
	},
	num : {
		fontWeight : "bold", 
		fontSize : (Dimensions.get('window').width >= 414) ? 24 : 16, 
		textAlign: 'right',
		marginRight: '10%', 
		marginTop: (Platform.isPad === true) ? '-5%' : (Dimensions.get('window').width >= 414) ? '-5%' : '-11%',
	},
	numvar : {
		fontSize : (Dimensions.get('window').width >= 414) ? 22 : 16, 
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
	infomaintitle: {
		fontSize: 30,
		marginBottom: 20
	},
	infotitle: {
		fontSize: (Dimensions.get('window').width >= 414) ? 22 : 16,
		marginBottom: 10,
		marginLeft: 10,
		marginTop: 10,
		fontWeight: 'bold',
	},
	infotitle2: {
		fontSize: (Dimensions.get('window').width >= 414) ? 22 : 16,
		marginBottom: 10,
		marginLeft: 10,
		marginTop: 10,
		fontWeight: 'bold',
		textAlign: 'center'
	},
	varProfile: {
		fontSize: (Dimensions.get('window').width >= 414) ? 22 : 16,
	},
	infosubtitle: {
		fontWeight: 'bold',
		fontSize : (Dimensions.get('window').width >= 414) ? 22 : null 
		
	},
	infocol2left: {
		marginBottom: 10,
		marginLeft: 10,
		marginTop: 10,
	},
	imageprofile: {
		marginTop: 10,
		marginLeft: (Dimensions.get('window').width >= 414) ? 40 : 10,
		width: '90%',
		height: (Dimensions.get('window').width >= 414) ? 250 : 150
	},
	imageprofileBanner: {
		marginTop: '8%',
		marginLeft: (Dimensions.get('window').width >= 414) ? 40 : 10,
		width: '90%',
		height: (Dimensions.get('window').width >= 414) ? 250 : 150,
		marginBottom: '8%',
	},
	showsliderProfile : {
		height : (Dimensions.get('window').width >= 414) ? 250 : 150,
		marginBottom : 0,
		
	  },
	infoadditional: {
		marginLeft: 10,
		marginTop: 10,
		width: '92%',
		marginBottom: 2,
	},
	infoadditionalChecked: {
		marginTop: 10,
		width: '92%',
		marginBottom: '5%',
	},
	CircleShape: {
		width: 10,
		height: 10,
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
	titlegalleryedit : {
		fontWeight : "bold", 
		fontSize : (Dimensions.get('window').width >= 414) ? 22 : 18, 
		textAlign: 'center'
	},
	ImageGalleryedit : {
		width: (Dimensions.get('window').width >= 414) ? 250 : 200, 
		height: (Dimensions.get('window').width >= 414) ? 250 : 200, 
		backgroundColor: "#DDDDDD"
	},
	petinfoProfile: {
		marginTop : '5%',
	},
	editiconProProfile: {
		height: (Platform.isPad === true) ? '80%' : (Dimensions.get('window').width >= 414) ? '80%' : '60%',
		width: (Platform.isPad === true) ? '80%' : (Dimensions.get('window').width >= 414) ? '80%' : '60%',
		marginLeft: (Platform.isPad === true) ? '37%' : (Dimensions.get('window').width >= 414) ? '34%' : '15%', 
	},
	editiconProEditProperty: {
		height: (Platform.isPad === true) ? '80%' : (Dimensions.get('window').width >= 414) ? '80%' : '60%',
		width: (Platform.isPad === true) ? '80%' : (Dimensions.get('window').width >= 414) ? '80%' : '60%',
		marginLeft: (Platform.isPad === true) ? '39%' : (Dimensions.get('window').width >= 414) ? '37%' : '20%', 
	},
	editiconPetProfile: {
		height: (Platform.isPad === true) ? '80%' : (Dimensions.get('window').width >= 414) ? '80%' : '60%',
		width: (Platform.isPad === true) ? '80%' : (Dimensions.get('window').width >= 414) ? '80%' : '60%',
		marginLeft: (Platform.isPad === true) ? '35%' : (Dimensions.get('window').width >= 414) ? '32%' : '10%', 
	},
	editiconAddProfile: {
		height: (Platform.isPad === true) ? '80%' : (Dimensions.get('window').width >= 414) ? '80%' : '60%',
		width: (Platform.isPad === true) ? '80%' : (Dimensions.get('window').width >= 414) ? '80%' : '60%',
		marginLeft: (Platform.isPad === true) ? '27%' : (Dimensions.get('window').width >= 414) ? '23%' : '-10%', 
	},
	editiconLocProfile: {
		height: (Platform.isPad === true) ? '80%' : (Dimensions.get('window').width >= 414) ? '80%' : '60%',
		width: (Platform.isPad === true) ? '80%' : (Dimensions.get('window').width >= 414) ? '80%' : '60%',
		marginLeft: (Platform.isPad === true) ? '45%' : (Dimensions.get('window').width >= 414) ? '43%' : '35%', 
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
		fontSize: (Dimensions.get('window').width >= 414) ? 24 : 20,
		marginBottom: '1%',
		justifyContent: 'center',
		fontWeight: 'bold',
	},
	priceRooms1 : {
		fontSize: (Dimensions.get('window').width >= 414) ? 24 : 20,
		marginBottom: '1%',
		textAlign : 'right',
		marginTop : (Platform.isPad === true) ? '-7%' : (Dimensions.get('window').width >= 414) ? '-6%' : '-10%',
		color : 'green',
		fontWeight: 'bold',
	},
	imageroom6: {
		width: (Dimensions.get('window').width >= 414) ? 229 :  129,
		height: (Dimensions.get('window').width >= 414) ? 229 : 129,
		marginTop : -10
	  },
	  showsliderRoompreview : {
		height : 109,
		marginTop : 30
	  },
	infocol2right: {
		marginBottom: 10,
		marginLeft: '40%',
		marginTop: -65,
	},
	imageroom4: {
		width: (Dimensions.get('window').width >= 414) ? 48 :  28,
		height: (Dimensions.get('window').width >= 414) ? 43 : 23,
		top: (Dimensions.get('window').width >= 414) ? -120 : -40,
		marginLeft : (Dimensions.get('window').width >= 414) ? '-10%' : null
	  },
	  shareAcomodation: {
		top: (Dimensions.get('window').width >= 414) ? -145 : -50,
		marginLeft : (Dimensions.get('window').width >= 414) ? '-10%' : null,
		position: "absolute",
		color: "#121212",
		height: 22,
		width: 114,
		fontSize: (Dimensions.get('window').width >= 414) ? 22 : 12
	  },
	  shareAcomodationStack: {
		width: 140,
		height: 22,
		marginTop: -10,
		left: 30,
	  },
	  food: {
		color: "#121212",
		height: 22,
		width: (Dimensions.get('window').width >= 414) ? 62 : 32,
		fontSize: (Dimensions.get('window').width >= 414) ? 22 : 12,
		marginLeft: 1,
		top: (Dimensions.get('window').width >= 414) ? -167 : -70, 
		left: (Platform.isPad === true) ? 210 : (Dimensions.get('window').width >= 414) ? 300 : 110
	  },
	  imageroom5: {
		width: (Dimensions.get('window').width >= 414) ? 48 : 28,
		height: (Dimensions.get('window').width >= 414) ? 41 : 21,
		marginTop: (Dimensions.get('window').width >= 414) ? -90 : -35,
		marginLeft : (Dimensions.get('window').width >= 414) ? '-10%' : null
	  },
	  bedStack: {
		width: 141,
		height: 29
	  },
	  bed: {
		top: (Dimensions.get('window').width >= 414) ? -40 : -20,
		left: (Dimensions.get('window').width >= 414) ? 20 :  30,
		position: "absolute",
		color: "#121212",
		height: 25,
		width: 127,
		fontSize: (Dimensions.get('window').width >= 414) ? 22 : 12
	  },
	  imageroom3: {
		width: (Dimensions.get('window').width >= 414) ? 48 : 28,
		height: (Dimensions.get('window').width >= 414) ? 41 : 21,
		marginTop: (Dimensions.get('window').width >= 414) ? -40 : -22,
		left: (Platform.isPad === true) ? 180 : (Dimensions.get('window').width >= 414) ? 220 : 85,
	  },
	  disponibility: {
		top: (Dimensions.get('window').width >= 414) ? -38 : -18,
		left: (Platform.isPad === true) ? 210 : (Dimensions.get('window').width >= 414) ? 300 : 110,
		position: "absolute",
		color: "#121212",
		height: 25,
		width: (Dimensions.get('window').width >= 414) ? 110 : 49,
		fontSize: (Dimensions.get('window').width >= 414) ? 22 : 11
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
		top: (Dimensions.get('window').width >= 414) ? -120 : -40,
		left: (Platform.isPad === true) ? 180 : 85,
		width: (Dimensions.get('window').width >= 414) ? 48 : 27,
		height: (Dimensions.get('window').width >= 414) ? 43 :  19,
		position: "absolute",
		marginLeft : (Dimensions.get('window').width >= 414) ? '20%' : null
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
		fontSize: (Dimensions.get('window').width >= 414) ? 22 : 16,
		fontWeight: 'bold',
		color: '#000000',
		textAlign: 'center',
		marginTop : (Dimensions.get('window').width >= 414) ? '2%' : '3%',
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
		height: (Platform.isPad === true) ? 55 :45,
	  },
	  arrowLeft : {
		fontSize : (Dimensions.get('window').width >= 414) ? 22 : 16,
		color : 'black',
		fontWeight: 'bold',
	  },
	  roomocuppied : {
		textAlign: 'center',
		color: 'gray',
	  },
	  roomocuppiedName : {
		textAlign: 'center',
		fontSize: (Dimensions.get('window').width >= 414) ? 24 : 14,
	  },
	  roomocuppiedArrive : {
		fontWeight : "bold",
		color : "purple",
		textAlign : "left",
		fontSize: (Dimensions.get('window').width >= 414) ? 22 : null,
	  },
	  roomocuppiedLeave : {
		fontWeight : "bold",
		color: "purple",
		textAlign: "right",
		marginTop: (Dimensions.get('window').width >= 414) ? -25 : -15,
		fontSize: (Dimensions.get('window').width >= 414) ? 22 : null,
	  },
	  roomocuppiedStart : {
		textAlign : "left",
		fontSize: (Dimensions.get('window').width >= 414) ? 22 : null,
	  },
	  roomocuppiedEnd: {
		textAlign: "right",
		marginTop: (Dimensions.get('window').width >= 414) ? -25 : -15,
		fontSize: (Dimensions.get('window').width >= 414) ? 22 : null,
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
	infosubtitleCalendar: {
		fontWeight: 'bold',
		color : '#232159',
		fontSize : (Dimensions.get('window').width >= 414) ? 22 : null, 
	},
	infosubtitleCalendar2: {
		color : '#232159',
		fontSize : (Dimensions.get('window').width >= 414) ? 22 : null, 
	},
	infosubtitleCalendarN:{
		fontWeight: 'bold',
		color : '#982A72',
		fontSize : (Dimensions.get('window').width >= 414) ? 22 : null, 
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
	calendarColor1 : {
		borderColor: '#232159',
		borderRightWidth: 5,
		borderTopRightRadius : 5,
		borderBottomRightRadius : 5,
		marginLeft: (Platform.isPad === true) ? '0%' : '-8%',
		marginRight : (Platform.isPad === true) ? '-2.5%' : '-7%',
		marginTop :  (Platform.isPad === true) ? '-1.5%' : '-4%',
		marginBottom : (Platform.isPad === true) ? '-1.5%' : '-4%',
	  },
	  calendarColor2 : {
		borderColor: '#982A72',
		borderRightWidth: 5,
		borderTopRightRadius : 5,
		borderBottomRightRadius : 5,
		marginLeft: (Platform.isPad === true) ? '0%' : '-8%',
		marginRight : (Platform.isPad === true) ? '-2.5%' : '-7%',
		marginTop :  (Platform.isPad === true) ? '-1.5%' : '-4%',
		marginBottom : (Platform.isPad === true) ? '-1.5%' : '-4%',
	  },
	  calendarColor3: {
		borderColor: '#394893',
		borderRightWidth: 5,
		borderTopRightRadius : 5,
		borderBottomRightRadius : 5,
		marginLeft: (Platform.isPad === true) ? '0%' : '-8%',
		marginRight : (Platform.isPad === true) ? '-2.5%' : '-7%',
		marginTop :  (Platform.isPad === true) ? '-1.5%' : '-4%',
		marginBottom : (Platform.isPad === true) ? '-1.5%' : '-4%',
	  },
	  calendarColor4: {
		borderColor: '#A54483',
		borderRightWidth: 5,
		borderTopRightRadius : 5,
		borderBottomRightRadius : 5,
		marginLeft: (Platform.isPad === true) ? '0%' : '-8%',
		marginRight : (Platform.isPad === true) ? '-2.5%' : '-7%',
		marginTop :  (Platform.isPad === true) ? '-1.5%' : '-4%',
		marginBottom : (Platform.isPad === true) ? '-1.5%' : '-4%',
	  },
	  calendarColor5: {
		borderColor: '#5D418D',
		borderRightWidth: 5,
		borderTopRightRadius : 5,
		borderBottomRightRadius : 5,
		marginLeft: (Platform.isPad === true) ? '0%' : '-8%',
		marginRight : (Platform.isPad === true) ? '-2.5%' : '-7%',
		marginTop :  (Platform.isPad === true) ? '-1.5%' : '-4%',
		marginBottom : (Platform.isPad === true) ? '-1.5%' : '-4%',
	  },
	  calendarColor6: {
		borderColor: '#392B84',
		borderRightWidth: 5,
		borderTopRightRadius : 5,
		borderBottomRightRadius : 5,
		marginLeft: (Platform.isPad === true) ? '0%' : '-8%',
		marginRight : (Platform.isPad === true) ? '-2.5%' : '-7%',
		marginTop :  (Platform.isPad === true) ? '-1.5%' : '-4%',
		marginBottom : (Platform.isPad === true) ? '-1.5%' : '-4%',
	  },
	  calendarColor7: {
		borderColor: '#B15391',
		borderRightWidth: 5,
		borderTopRightRadius : 5,
		borderBottomRightRadius : 5,
		marginLeft: (Platform.isPad === true) ? '0%' : '-8%',
		marginRight : (Platform.isPad === true) ? '-2.5%' : '-7%',
		marginTop :  (Platform.isPad === true) ? '-1.5%' : '-4%',
		marginBottom : (Platform.isPad === true) ? '-1.5%' : '-4%',
	  },
	  calendarColor8: {
		borderColor: '#4F177D',
		borderRightWidth: 5,
		borderTopRightRadius : 5,
		borderBottomRightRadius : 5,
		marginLeft: (Platform.isPad === true) ? '0%' : '-8%',
		marginRight : (Platform.isPad === true) ? '-2.5%' : '-7%',
		marginTop :  (Platform.isPad === true) ? '-1.5%' : '-4%',
		marginBottom : (Platform.isPad === true) ? '-1.5%' : '-4%',
	  },
	  calendarColorA: {
		borderColor: '#C471CF',
		borderRightWidth: 5,
		borderTopRightRadius : 5,
		borderBottomRightRadius : 5,
		marginLeft: (Platform.isPad === true) ? '0%' : '-8%',
		marginRight : (Platform.isPad === true) ? '-2.5%' : '-7%',
		marginTop :  (Platform.isPad === true) ? '-1.5%' : '-4%',
		marginBottom : (Platform.isPad === true) ? '-1.5%' : '-4%',
	  },
	  imageCalendar: {
		width: (Dimensions.get('window').width >= 414) ? 100 : 50,
		height: (Dimensions.get('window').width >= 414) ? 100 : 50,
		marginLeft: '10%',
		marginBottom: -18,
		marginTop: (Platform.isPad === true) ? '3%' : (Dimensions.get('window').width >= 414) ? '3%' : '2%'

		
	  },

	  //Notifications
	  containerNoti: {
		flex: 1,
		backgroundColor: '#fff',
		paddingTop: '40%',
		paddingHorizontal: '20%'
		},
	  textreporttitle : {
		fontSize: (Dimensions.get('window').width >= 414) ? 18 : null
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
	   itemTextNoti: {
		marginLeft: '10%',
		flexDirection: 'row'
			},
	  ImageBackgroundNoti: {
		width: '100%',
		height: '100%'
			},
	  notiDate: {
		  marginLeft : '35%',
		  marginTop : '0%',
	  },
	  imageNoti: {
		width: (Platform.isPad === true) ? 90 : 70,
    	height: (Platform.isPad === true) ? 90 : 70,
		borderWidth: 2,
    	borderRadius: 180 / 2,
		marginTop : (Platform.isPad === true) ? '-12%' : '-25%',
		backgroundColor : '#fff',
		marginLeft : (Platform.isPad === true) ? '10%' : '0%'

	  },
	  imageNoti2: {
		width: (Dimensions.get('window').width >= 414) ? 150 : 90,
    	height: (Dimensions.get('window').width >= 414) ? 150 : 90,
		borderWidth: 2,
    	borderRadius: (Dimensions.get('window').width >= 414) ? 150 / 2 : 150 / 2,
		marginTop : '2%',
		marginBottom : '-2%',
		backgroundColor : '#fff',
		marginLeft : (Platform.isPad === true) ? '10%' : (Dimensions.get('window').width >= 414) ? '5%' : '0%'

	  },
	  NotiDont: {
		color: '#232159',
		fontWeight: 'bold',
		marginLeft : '15%',
	  },
	

	//Disable
	disableMargins: {
		marginLeft: (Dimensions.get('window').width >= 414) ? '6%' :'3%',
		marginRight : (Dimensions.get('window').width >= 414) ? '6%' : '3%',
	},
	messageDisable: {
		backgroundColor: '#DFBABA',
		marginLeft : (Dimensions.get('window').width >= 414) ? '6%' : 10,
		marginRight : (Dimensions.get('window').width >= 414) ? '6%' : 10,
		marginTop: (Dimensions.get('window').width >= 414) ? '5%' : 15,	
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
		fontSize: (Dimensions.get('window').width >= 414) ? 22 : 18,
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
		fontSize: (Dimensions.get('window').width >= 414) ? 24 : 18,
		fontWeight: 'bold',
		textAlign: 'center',
		marginTop : (Dimensions.get('window').width >= 414) ? '10%' : '5%',
		marginBottom : (Dimensions.get('window').width >= 414) ? '5%' : null
	},
	disablebold2: {
		fontSize: (Dimensions.get('window').width >= 414) ? 24 :  20,
		fontWeight: 'bold',
		textAlign: 'center',
		marginTop : (Dimensions.get('window').width >= 414) ? '10%' : '5%'
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
		fontSize: (Dimensions.get('window').width >= 414) ? 24 :  18
	},

	//tabIcon
	tabicon: {
		height: '80%',
		width: '80%',
		
	},

	//Drawerimage
	drawerImage: {
		marginTop: '20%', 
		marginBottom: '5%', 
		height: (Dimensions.get('window').width >= 414) ? 240 : 120, 
		width: (Dimensions.get('window').width >= 414) ? 240 : 120, 
		borderRadius: (Dimensions.get('window').width >= 414) ? 200 : 100, 
		marginLeft: '27%'
	},
	drawerUser: {
		color: 'white', 
		fontWeight: 'bold', 
		fontSize: (Dimensions.get('window').width >= 414) ? 26 : 17, 
		marginLeft: '5%'
	},
	drawerMail: {
		color: 'white', 
		fontSize: (Dimensions.get('window').width >= 414) ? 24 : 15, 
		marginLeft: '5%', 
		marginTop: '2%', 
		marginBottom: '3%'
	},

	//Edit
	botonedit: {
		backgroundColor: '#982A72',
		marginTop: 10,
		marginBottom: '10%' 
	},
	editicon: {
		height: (Platform.isPad === true) ? '80%' : (Dimensions.get('window').width >= 414) ? "80%" : '60%',
		width: (Platform.isPad === true) ? '80%' : (Dimensions.get('window').width >= 414) ? "80%" : '60%',
		marginLeft: (Platform.isPad === true) ? '35%' : (Dimensions.get('window').width >= 414) ? "32%" : '10%', 
	},
	editiconLoc: {
		height: (Platform.isPad === true) ? '80%' : (Dimensions.get('window').width >= 414) ? '80%' : '60%',
		width: (Platform.isPad === true) ? '80%' : (Dimensions.get('window').width >= 414) ? '80%' : '60%',
		marginLeft: (Platform.isPad === true) ? '47%' : (Dimensions.get('window').width >= 414) ? '45%' : '40%', 
	},
	editiconPro: {
		height: (Platform.isPad === true) ? '80%' : (Dimensions.get('window').width >= 414) ? '80%' : '60%',
		width: (Platform.isPad === true) ? '80%' : (Dimensions.get('window').width >= 414) ? '80%' : '60%',
		marginLeft: (Platform.isPad === true) ? '32%' : (Dimensions.get('window').width >= 414) ? '28%' : '2%', 
	},
	editiconAdd: {
		height: (Platform.isPad === true) ? '80%' : (Dimensions.get('window').width >= 414) ? '80%' : '60%',
		width: (Platform.isPad === true) ? '80%' : (Dimensions.get('window').width >= 414) ? '80%' : '60%',
		marginLeft: (Platform.isPad === true) ? '29%' : (Dimensions.get('window').width >= 414) ? '27%' : '-2%', 
	},
	editiconPet: {
		height: (Platform.isPad === true) ? '80%' : '60%',
		width: (Platform.isPad === true) ? '80%' : '60%',
		marginLeft: (Platform.isPad === true) ? '37%' : '15%', 
	},
	editiconFamilyPreference: {
		height: (Platform.isPad === true) ? '80%' : '60%',
		width: (Platform.isPad === true) ? '80%' : '60%',
		marginLeft: (Platform.isPad === true) ? '37%' : '9%', 
	},
	editiconAnyMemeber: {
		height: (Platform.isPad === true) ? '80%' : '60%',
		width: (Platform.isPad === true) ? '80%' : '60%',
		marginLeft: (Platform.isPad === true) ? '37%' : '-19%', 
	},
	butonfiledit : {
		fontSize: 15,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	editiconFamily: {
		height: (Platform.isPad === true) ? '80%' : '60%',
		width: (Platform.isPad === true) ? '80%' : '60%',
		marginLeft: (Platform.isPad === true) ? '36%' : '12%', 
	},
	infomaintitledit: {
		fontSize: (Dimensions.get('window').width >= 414) ? 24 : 20,
		marginBottom: 20,
		marginTop: (Platform.isPad === true) ? '0%' : '3%',
		fontWeight: 'bold', 
	},
	
	pickerBasicinfo : {
		height: 100, 
		width: 150, 
		marginLeft: (Platform.isPad === true) ? '40%' :'25%', 
		marginTop: (Platform.OS === 'ios') ? '1%' : 0, 
		marginBottom: (Platform.OS === 'ios') ? 100 : 0,
	},
	pickerBasicinfoResidence : {
		height: 100, 
		width: (Platform.OS === 'android') ? 170 : 150, 
		marginLeft: (Platform.isPad === true) ? '40%' :'25%', 
		marginTop: (Platform.OS === 'ios') ? '1%' : 0, 
		marginBottom: (Platform.OS === 'ios') ? 100 : 0,
	},
	uploadFile : {
		fontWeight: 'bold', 
		marginTop: '2%', 
		marginLeft: '2%'
	},

	inputedit : {
	  fontSize: (Dimensions.get('window').width >= 414) ? 24 : 15,
	},
	inputeditroom : {
		marginLeft: (Platform.isPad === true) ? '25%'  : null
	},
	

	//Student Not
	studentnotBasic: {
		marginLeft : '50%',
		marginTop: (Platform.isPad === true) ? '-15%'  : '-35%'
	},
	profiledirtitleStudent : {
		textAlign : 'left',
		marginBottom: '5%',
	},
	profileStudentnot: {
		width: (Platform.isPad === true) ? 180 : 125,
		height: (Platform.isPad === true) ? 180 : 125,
		borderColor: 'black',
		borderWidth: 2,
		borderRadius: (Platform.isPad === true) ? 180 / 2 : 125 / 2,
		marginLeft : (Platform.isPad === true) ? '10%' : '5%',
		marginTop : (Platform.isPad === true) ? '5%' : '0%',
		marginBottom : (Platform.isPad === true) ? '-3%' : '0%'
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
		marginTop: (Platform.isPad === true) ? '-15.5%' : '-22%',
		marginBottom: '10%',
		width: '40%',
		marginLeft: '55%', 
	},
	profileBannerStudent: {
		marginTop: '8%',
		marginLeft: 10,
		width: '90%',
		height: 100,
		marginBottom: '8%',
	},
	specialDietrow : {
		marginTop: (Platform.isPad === true) ? '-28%'  : '-40%',
		marginLeft: '50%',
		marginBottom: '15%'
	},

	//Student
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
		width: (Platform.isPad === true) ? 180 : 125,
		height: (Platform.isPad === true) ? 180 : 125,
		borderColor: 'black',
		borderWidth: 2,
		borderRadius: (Platform.isPad === true) ? 180 / 2 : 125 / 2,
		marginLeft : (Platform.isPad === true) ? '40%' : '32%',
		marginTop : (Platform.isPad === true) ? '-18%' : '-25%',
		marginBottom : '10%',
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
	
	//EditRoom
	scrollviewedit : {
		marginBottom : '10%',
	},
	pickerType : {
		marginTop: (Platform.OS === 'ios') ? '-12%' :  0,
		width: (Platform.OS === 'ios') ? '32%' : (Dimensions.get('window').width >= 414) ? '32%' : '42%',
		height: (Platform.OS === 'ios') ? null : '100%',
		marginLeft: (Platform.OS === 'ios') ? '-4%' : (Dimensions.get('window').width >= 414) ? '2%' : '-5%',
	},
	pickerBed : {
		marginTop: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-34%' : '-70%' : '-40%',
		width: (Platform.OS === 'ios') ? '32%' : '38%',
		height: (Platform.OS === 'ios') ? null : '100%',
		marginLeft: (Platform.OS === 'ios') ? '60%' : (Platform.OS === 'ios') ? 0 : '60%',
	},
	pickerDate : {
		marginTop: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-10%' : '-12%' : 0,
		width: (Platform.OS === 'ios') ? '32%' : (Dimensions.get('window').width >= 414) ? '32%' :  '40%',
		height: (Platform.OS === 'ios') ? null : '100%',
		marginLeft: (Platform.OS === 'ios') ? '-4%' : (Dimensions.get('window').width >= 414) ? '2%' : '-5%',
	},
	pickerFood : {
		marginTop: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-28%' : '-70%' : '-40%',
		width: (Platform.OS === 'ios') ? '32%' : '38%',
		height: (Platform.OS === 'ios') ? null : '100%',
		marginLeft: (Platform.OS === 'ios') ? '60%' : '60%',
	},
	imageroomEditType : {
		height : (Platform.OS === 'ios') ? (Platform.isPad === true) ? '35%' : '15%' : '25%',
		marginLeft : (Platform.OS === 'ios') ? (Platform.isPad === true) ? '1%' : '-5%' : (Dimensions.get('window').width >= 414) ? '1%' : '-7%',
		marginTop : (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-1%' : '16%' : '12%',
		marginBottom: (Platform.OS === 'ios') ? null : '20%',
	},
	imageroomEditBed : {
		height : (Platform.OS === 'ios') ? (Platform.isPad === true) ? '35%' : '15%' : '25%',
		marginTop : (Platform.OS === 'ios') ? (Platform.isPad === true) ? '0%' : '16%' : '12%',
		marginBottom: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '16%' : null : '20%',
		marginLeft : (Platform.OS === 'ios') ? (Platform.isPad === true) ? '16%' : '-2%' : (Dimensions.get('window').width >= 414) ? '1%' : '-6%',
		
	},
	imageroomEditAvalible : {
		marginLeft : '-4%',
		height : (Platform.OS === 'ios') ? (Platform.isPad === true) ? '30%' : '15%' : '25%',
		marginTop : (Platform.OS === 'ios') ? (Platform.isPad === true) ? '2%' : '16%' : '12%',
		marginBottom: (Platform.OS === 'ios') ? null : '20%',
		marginLeft : (Platform.OS === 'ios') ? (Platform.isPad === true) ? '1%' : '-5%' : (Dimensions.get('window').width >= 414) ? '1%' : '-7%',

	},
	imageroomEditFood : {
		height : (Platform.OS === 'ios') ? (Platform.isPad === true) ? '30%' : '15%' : '25%',
		marginTop : (Platform.OS === 'ios') ? (Platform.isPad === true) ? '2%' : '16%' : '12%',
		marginBottom: (Platform.OS === 'ios') ? null : '20%',
		marginLeft : (Platform.OS === 'ios') ? (Platform.isPad === true) ? '16%' : '-2%' : (Dimensions.get('window').width >= 414) ? '1%' : '-4%',
		
	},
	inlineTitleEditRoom: {
		flexWrap: 'wrap', 
        alignItems: 'flex-start',
        flexDirection:'row',
		width: '100%',
	},
	infotitleEditRoom: {
		fontSize: (Dimensions.get('window').width >= 414) ? 24 : 18,
		marginBottom: 15,
		marginLeft: (Platform.isPad === true) ? '40%' : (Dimensions.get('window').width >= 414) ? '40%' : '30%',
		marginTop : (Platform.OS === 'ios') ? -35 : '5%',
		color: '#982A72',
	},
	wrapperCollapsibleListEdit : {
		marginTop :  '10%',
		marginBottom :  '10%',
	  },
	  plus : {
		fontSize : 30,
		color : '#232159',
		fontWeight: 'bold',
	  },

	//Modal Report
	titleModalR : {
		marginBottom: 15,
	    textAlign: 'center',
		fontWeight: 'bold',
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
		
	},
	pickerviewModalR : {
		marginTop: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-5%' : '-10%' : '10%', 
		marginBottom: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '28%' : '60%' : '10%',
		marginLeft : (Platform.isPad === true) ? '5%' : '0%',
	},
	cancelModalR : {
		backgroundColor: '#F194FF',
		borderRadius: 20,
		padding: 10,
		elevation: 2,
		marginLeft: (Platform.isPad === true) ? '-45%' : '-60%',
		backgroundColor: '#232159',
		
	},
	notifyModalR : {
		backgroundColor: '#F194FF',
		borderRadius: 20,
		padding: 10,
		elevation: 2,
		marginLeft: '50%',
		marginTop : (Platform.isPad === true) ? '-6%' :'-14%',
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
		fontSize: (Dimensions.get('window').width >= 414) ? 24 : null
	  },
	  //Report
	  ReportIcons : {
		width: '100%',
		marginLeft : '40%'
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
        margin: 1
     },
	 tableRowReport: {
        flex: 5,
        flexDirection: "row",
        maxHeight: 30
     },
	 tableRowImagesReport: {
        flex: 5,
        flexDirection: "row",
        maxHeight: 1000
     },
	 textLineItemReport: {
        color: "#000"
      },
	  textLineItemReportFeedback: {
        color: "#000",
		fontSize: 15 
      },
	  textLineItemReportClose: {
        color: "#DA133D"
      },
	  textLineItemReportActive: {
        color: "#17C41F"
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
			backgroundColor: '#e3dcdd',
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
	tableColumnTotalsReportsF : {
		alignItems: "center",
        backgroundColor: "#e3dcdd",
        flex: 2,
        justifyContent: "center",
        margin: 1,
	},
	tableColumnTotalsReportsFtitle : {
		alignItems: "flex-start",
        backgroundColor: "#e3dcdd",
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
	},
	ReportFeedbackMarginsSender : {
		marginLeft: '5%',
		marginRight : (Platform.isPad === true) ? '50%' : '30%',
		marginBottom : '5%',
	},
	ReportFeedbackMarginsUser : {
		marginLeft: (Platform.isPad === true) ? '50%' : '30%',
		marginRight : '5%',
		marginBottom : '5%',
	},
	ReportFeedbackMargins : {
		marginLeft: '5%',
		marginRight : '5%',
		marginBottom : '5%',
	},
	ImageLoadReportFeedback : {
		width: 100, 
		height: 100, 
		backgroundColor: "#DDDDDD", 
		marginLeft : (Platform.isPad === true) ? '45%' : '35%'
	},
	ReportFeedbackRLelements : {
		padding: 6,
		backgroundColor: '#FFF',
		width:60,
       	height:43,
	},
	ReportFeedbackLLelements : {
		padding: 6,
		backgroundColor: '#FFF',
		width:50,
       	height:43,
	},
	ReportFeedbackIcons : {
		width: '100%'
	},
	ReportFeedbackCloseIcon : {
		marginLeft : (Platform.isPad === true) ? '95%' :'85%'
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
		marginLeft : -3, 
		marginRight : -3,
		justifyContent: 'flex-end',
		fontSize: (Dimensions.get('window').width >= 414) ? 24 : null
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
		width: 70,
    	height: 70,
		borderWidth: 2,
    	borderRadius: 150 / 2,
		marginTop : (Platform.isPad === true) ? '-8%' : '-20%',
		backgroundColor : '#fff',
		marginLeft : (Platform.isPad === true) ? '-50%' : '-60%'

	  },
	  ReportInitBoldText : {
		fontWeight: 'bold',
		fontSize: (Dimensions.get('window').width >= 414) ? 22 : 15,
	  },
	  inlineDataReportInit: {
		flexWrap: 'wrap', 
        alignItems: 'flex-start',
        flexDirection:'row',
		marginLeft : '-15%'
	},
	ReportInitIcons : {
		width: '100%',
		color: 'white',
		fontSize: (Dimensions.get('window').width >= 414) ? 22 : 15,
		marginTop: '8%',
		marginRight : (Dimensions.get('window').width >= 414) ? '10%' : '15%'
	},

	Reportcheck: {
		width: 15,
		height: 15,
		marginLeft : '95%',
		marginTop : (Platform.isPad === true) ? '-4%' :'-8%'
	  },
	
	//PaymentHistory
	PaymentText : {
		fontSize : (Dimensions.get('window').width >= 414) ? 22 : null
	},
	PaymentHistoryRLelements : {
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
		width: (Dimensions.get('window').width >= 414) ? 60 : 40,
       	height: (Dimensions.get('window').width >= 414) ? 60 : 40,
        borderRadius: (Dimensions.get('window').width >= 414) ? 60 : 40,
		marginTop: (Dimensions.get('window').width >= 414) ? '-2%' : '2%',
		marginBottom: '10%'
	},
	PaymentHistoryIcons : {
		width: '100%',
		color: 'white'
	},
	PaymentHistoryPrice : {
		marginLeft: "10%",
	  },
	PaymentHistoryPrice2 : {
		marginLeft: (Dimensions.get('window').width >= 414) ? '17%' : "28%",
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
		marginTop : (Platform.isPad === true) ? '-5.5%' : (Dimensions.get('window').width >= 414) ? '-7%' : '-13%',
		backgroundColor: '#982A72',
		
	},
	pickerviewModalRAddEvent1 : {
		marginTop: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-15%' : '-35%' : (Dimensions.get('window').width >= 414) ? '-5%' : '-10%', 
		marginBottom: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '30%' : '50%' : 0,
		marginLeft: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '35%' : '15%' : '10%', 
	},
	pickerviewModalRAddEvent2 : {
		marginTop: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-15%' : '-30%' : (Dimensions.get('window').width >= 414) ? '-5%' : '-10%', 
		marginBottom: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '30%' : '50%' : 0,
		marginLeft: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '35%' : '15%' : '10%', 
	},
	pickerviewModalRAddEvent3 : {
		marginTop: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-15%' : '-25%' : (Dimensions.get('window').width >= 414) ? '-5%' : '-10%', 
		marginBottom: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '30%' : '50%' : 0,
		marginLeft: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '35%' : '15%' : '10%', 
	},
	pickerviewModalRAddEvent4 : {
		marginTop: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-10%' : '-20%' : (Dimensions.get('window').width >= 414) ? '-5%' : '-10%', 
		marginBottom: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '30%' : '50%' : 0,
		marginLeft: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '35%' : '15%' : '10%', 
	},
	pickerviewModalRAddEvent5 : {
		marginTop: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-10%' : '-15%' : (Dimensions.get('window').width >= 414) ? '-5%' : '-10%', 
		marginBottom: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '30%' : '50%' : 0,
		marginLeft: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '35%' : '15%' : '10%', 
	},
	pickerviewModalRAddEvent6 : {
		marginTop: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-10%' : '-15%' : (Dimensions.get('window').width >= 414) ? '-5%' : '-10%', 
		marginBottom: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '30%' : '50%' : 0,
		marginLeft: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '35%' : '15%' : '10%', 
	},
	pickerviewModalRAddEvent7 : {
		marginTop: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-10%' : '-15%' : (Dimensions.get('window').width >= 414) ? '-5%' : '-10%', 
		marginBottom: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '30%' : '50%' : 0,
		marginLeft: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '35%' : '15%' : '10%', 
	},
	pickerviewModalRAddEvent8 : {
		marginTop: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-10%' : '-15%' : (Dimensions.get('window').width >= 414) ? '-5%' : '-10%', 
		marginBottom: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '30%' : '50%' : 0,
		marginLeft: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '35%' : '15%' : '10%', 
	},
	notifyModalCAddEvent2 : {
		backgroundColor: '#232159',
		borderRadius: 20,
		padding: 10,
		elevation: 2,
		marginRight: '52%',
		marginTop : (Platform.isPad === true) ? '-5%' : (Dimensions.get('window').width >= 414) ? '-5%' : '-14%',
		
	},
	

});

export default globalStyles;