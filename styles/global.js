import { Row } from 'native-base';
import { StyleSheet, Platform } from 'react-native';
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
	inputCrearCuenta: {
		backgroundColor: '#FFF'
	},
	boton: {
		backgroundColor: '#982A72',
		marginTop: 10
	},
	botonTexto:{
		flex: 1,
		textTransform: 'uppercase',
		fontWeight: 'bold',
		color: '#FFF',
		textAlign: 'center',
		fontSize: 18
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
		height:300,
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
		fontSize : 18, 
		textAlign: 'center',
		marginBottom: '10%',
	},
	room : {
		fontWeight : "bold", 
		fontSize : 16, 
		textAlign: 'center',
		marginLeft : '10%',
		textAlign: 'left',
	},
	roomvar : {
		fontSize : 16, 
		textAlign: 'center',
		marginLeft : '15%',
		textAlign: 'left',
	},
	num : {
		fontWeight : "bold", 
		fontSize : 16, 
		textAlign: 'right',
		marginRight: '10%', 
		marginTop: '-11%',
	},
	numvar : {
		fontSize : 16, 
		textAlign: 'center',
		marginTop: '-5%',
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
		fontSize: 16,
		marginBottom: 10,
		marginLeft: 10,
		marginTop: 10,
		fontWeight: 'bold',
	},
	infotitle2: {
		fontSize: 16,
		marginBottom: 10,
		marginLeft: 10,
		marginTop: 10,
		fontWeight: 'bold',
		textAlign: 'center'
	},
	varProfile: {
		fontSize: 16,
	},
	infosubtitle: {
		fontWeight: 'bold', 
		
	},
	infocol2left: {
		marginBottom: 10,
		marginLeft: 10,
		marginTop: 10,
	},
	imageprofile: {
		marginTop: 10,
		marginLeft: 10,
		width: '90%',
		height: 150
	},
	imageprofileBanner: {
		marginTop: '8%',
		marginLeft: 10,
		width: '90%',
		height: 150,
		marginBottom: '8%',
	},
	showsliderProfile : {
		height : 150,
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
		fontSize : 18, 
		textAlign: 'center'
	},
	petinfoProfile: {
		marginTop : '5%',
	},
	editiconProProfile: {
		height: '60%',
		width: '60%',
		marginLeft: '15%', 
	},
	editiconProEditProperty: {
		height: '60%',
		width: '60%',
		marginLeft: '20%', 
	},
	editiconPetProfile: {
		height: '60%',
		width: '60%',
		marginLeft: '10%', 
	},
	editiconAddProfile: {
		height: '60%',
		width: '60%',
		marginLeft: '-10%', 
	},
	editiconLocProfile: {
		height: '60%',
		width: '60%',
		marginLeft: '35%', 
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
		fontSize: 20,
		marginBottom: '1%',
		justifyContent: 'center',
		fontWeight: 'bold',
	},
	priceRooms1 : {
		fontSize: 20,
		marginBottom: '1%',
		textAlign : 'right',
		marginTop : '-10%',
		color : 'green',
		fontWeight: 'bold',
	},
	imageroom6: {
		width: 129,
		height: 129,
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
		width: 28,
		height: 23,
		top: -40,
	  },
	  shareAcomodation: {
		top: -50,
		left: 0,
		position: "absolute",
		color: "#121212",
		height: 22,
		width: 114,
		fontSize: 12
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
		width: 32,
		fontSize: 12,
		marginLeft: 1,
		top: -70, 
		left: 110
	  },
	  imageroom5: {
		width: 28,
		height: 21,
		marginTop: -35,
	  },
	  bedStack: {
		width: 141,
		height: 29
	  },
	  bed: {
		top: -20,
		left: 30,
		position: "absolute",
		color: "#121212",
		height: 25,
		width: 127,
		fontSize: 12
	  },
	  imageroom3: {
		width: 28,
		height: 21,
		marginTop: -22,
		left: 85,
	  },
	  disponibility: {
		top: -18,
		left: 110,
		position: "absolute",
		color: "#121212",
		height: 25,
		width: 49,
		fontSize: 11
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
		top: -40,
		left: 85,
		width: 27,
		height: 19,
		position: "absolute"
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
		fontSize: 16,
		fontWeight: 'bold',
		color: '#000000',
		textAlign: 'center',
		marginTop : '3%',
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
		height: 40,
	  },
	  arrowLeft : {
		fontSize : 16,
		color : 'black',
		fontWeight: 'bold',
	  },
	  roomocuppied : {
		textAlign: 'center',
		color: 'gray',
	  },
	  roomocuppiedName : {
		textAlign: 'center',
		fontSize: 14,
	  },
	  roomocuppiedArrive : {
		fontWeight : "bold",
		color : "purple",
		textAlign : "left",
	  },
	  roomocuppiedLeave : {
		fontWeight : "bold",
		color: "purple",
		textAlign: "right",
		marginTop: -15,
	  },
	  roomocuppiedStart : {
		textAlign : "left",
	  },
	  roomocuppiedEnd: {
		textAlign: "right",
		marginTop: -15,
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
	},
	infosubtitleCalendar2: {
		color : '#232159', 
	},
	infosubtitleCalendarN:{
		fontWeight: 'bold',
		color : '#982A72', 
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
		marginLeft: '-8%',
		marginRight : '-7%',
		marginTop : '-4%',
		marginBottom : '-4%',
	  },
	  calendarColor2 : {
		borderColor: '#982A72',
		borderRightWidth: 5,
		borderTopRightRadius : 5,
		borderBottomRightRadius : 5,
		marginLeft: '-8%',
		marginRight : '-7%',
		marginTop : '-4%',
		marginBottom : '-4%',
	  },
	  calendarColor3: {
		borderColor: '#394893',
		borderRightWidth: 5,
		borderTopRightRadius : 5,
		borderBottomRightRadius : 5,
		marginLeft: '-8%',
		marginRight : '-7%',
		marginTop : '-4%',
		marginBottom : '-4%',
	  },
	  calendarColor4: {
		borderColor: '#A54483',
		borderRightWidth: 5,
		borderTopRightRadius : 5,
		borderBottomRightRadius : 5,
		marginLeft: '-8%',
		marginRight : '-7%',
		marginTop : '-4%',
		marginBottom : '-4%',
	  },
	  calendarColor5: {
		borderColor: '#5D418D',
		borderRightWidth: 5,
		borderTopRightRadius : 5,
		borderBottomRightRadius : 5,
		marginLeft: '-8%',
		marginRight : '-7%',
		marginTop : '-4%',
		marginBottom : '-4%',
	  },
	  calendarColor6: {
		borderColor: '#392B84',
		borderRightWidth: 5,
		borderTopRightRadius : 5,
		borderBottomRightRadius : 5,
		marginLeft: '-8%',
		marginRight : '-7%',
		marginTop : '-4%',
		marginBottom : '-4%',
	  },
	  calendarColor7: {
		borderColor: '#B15391',
		borderRightWidth: 5,
		borderTopRightRadius : 5,
		borderBottomRightRadius : 5,
		marginLeft: '-8%',
		marginRight : '-7%',
		marginTop : '-4%',
		marginBottom : '-4%',
	  },
	  calendarColor8: {
		borderColor: '#4F177D',
		borderRightWidth: 5,
		borderTopRightRadius : 5,
		borderBottomRightRadius : 5,
		marginLeft: '-8%',
		marginRight : '-7%',
		marginTop : '-4%',
		marginBottom : '-4%',
	  },
	  calendarColorA: {
		borderColor: '#394893',
		borderRightWidth: 5,
		borderTopRightRadius : 5,
		borderBottomRightRadius : 5,
		marginLeft: '-8%',
		marginRight : '-7%',
		marginTop : '-4%',
		marginBottom : '-4%',
	  },
	  imageCalendar: {
		width: 50,
		height: 50,
		marginLeft: '10%',
		marginBottom: -18,
		marginTop: '2%'

		
	  },

	  //Notifications
	  containerNoti: {
		flex: 1,
		backgroundColor: '#fff',
		paddingTop: '40%',
		paddingHorizontal: '20%'
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
		width: 70,
    	height: 70,
		borderWidth: 2,
    	borderRadius: 150 / 2,
		marginTop : '-25%',
		backgroundColor : '#fff',

	  },
	  imageNoti2: {
		width: 90,
    	height: 90,
		borderWidth: 2,
    	borderRadius: 150 / 2,
		marginTop : '2%',
		marginBottom : '-2%',
		backgroundColor : '#fff',

	  },
	  NotiDont: {
		color: '#232159',
		fontWeight: 'bold',
		marginLeft : '15%',
	  },
	

	//Disable
	disableMargins: {
		marginLeft: '3%',
		marginRight : '3%',
	},
	messageDisable: {
		backgroundColor: '#DFBABA',
		marginLeft : 10,
		marginRight : 10,
		marginTop: 15,	
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
		fontSize: 18,
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
		fontSize: 18,
		fontWeight: 'bold',
		textAlign: 'center',
		marginTop : '5%'
	},
	disablebold2: {
		fontSize: 20,
		fontWeight: 'bold',
		textAlign: 'center',
		marginTop : '5%'
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
		fontSize: 18
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
		height: 120, 
		width: 120, 
		borderRadius: 100, 
		marginLeft: '27%'
	},
	drawerUser: {
		color: 'white', 
		fontWeight: 'bold', 
		fontSize: 17, 
		marginLeft: '5%'
	},
	drawerMail: {
		color: 'white', 
		fontSize: 15, 
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
		height: '60%',
		width: '60%',
		marginLeft: '10%', 
	},
	editiconLoc: {
		height: '60%',
		width: '60%',
		marginLeft: '40%', 
	},
	editiconPro: {
		height: '60%',
		width: '60%',
		marginLeft: '2%', 
	},
	editiconAdd: {
		height: '60%',
		width: '60%',
		marginLeft: '-2%', 
	},
	editiconPet: {
		height: '60%',
		width: '60%',
		marginLeft: '15%', 
	},
	butonfiledit : {
		fontSize: 15,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	editiconFamily: {
		height: '60%',
		width: '60%',
		marginLeft: '12%', 
	},
	infomaintitledit: {
		fontSize: 20,
		marginBottom: 20,
		marginTop: '3%',
		fontWeight: 'bold', 
	},
	
	pickerBasicinfo : {
		height: 100, 
		width: 150, 
		marginLeft: '25%', 
		marginTop: (Platform.OS === 'ios') ? '1%' : 0, 
		marginBottom: (Platform.OS === 'ios') ? 100 : 0,
	},
	uploadFile : {
		fontWeight: 'bold', 
		marginTop: '2%', 
		marginLeft: '2%'
	},

	inputedit : {
		fontSize: 15,
	},

	//Student Not
	studentnotBasic: {
		marginLeft : '50%',
		marginTop: '-35%'
	},
	profiledirtitleStudent : {
		textAlign : 'left',
		marginBottom: '5%',
	},
	profileStudentnot: {
		width: 125,
		height: 125,
		borderColor: 'black',
		borderWidth: 2,
		borderRadius: 125 / 2,
		marginLeft : '5%'
	},
	botoneditStudentnot: {
		backgroundColor: '#982A72',
		marginTop: 10,
		marginBottom: '10%',
		width: '40%',
		marginLeft: '45%', 
	},
	botonconfirmStu: {
		backgroundColor: '#982A72',
		marginTop: 10,
		marginBottom: '10%',
		width: '40%',
		marginLeft: '2%', 
	},
	botonrejectStu: {
		backgroundColor: '#232159',
		marginTop: 10,
		marginTop: '-22%',
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
		marginTop: '-40%',
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
		width: 125,
		height: 125,
		borderColor: 'black',
		borderWidth: 2,
		borderRadius: 125 / 2,
		marginLeft : '5%',
		marginLeft : '32%',
		marginTop : '-25%',
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
	
	//EditRoom
	scrollviewedit : {
		marginBottom : '10%',
	},
	pickerType : {
		marginTop: (Platform.OS === 'ios') ? '-12%' : 0,
		width: (Platform.OS === 'ios') ? '32%' : '32%',
		height: (Platform.OS === 'ios') ? null : '100%',
		marginLeft: (Platform.OS === 'ios') ? '0%' : 0,
	},
	pickerBed : {
		marginTop: (Platform.OS === 'ios') ? '-65%' : 0,
		width: (Platform.OS === 'ios') ? '32%' : '28%',
		height: (Platform.OS === 'ios') ? null : '100%',
		marginLeft: (Platform.OS === 'ios') ? '65%' : 0,
	},
	pickerDate : {
		marginTop: (Platform.OS === 'ios') ? '-12%' : 0,
		width: (Platform.OS === 'ios') ? '32%' : '36%',
		height: (Platform.OS === 'ios') ? null : '100%',
		marginLeft: (Platform.OS === 'ios') ? '0%' : 0,
	},
	pickerFood : {
		marginTop: (Platform.OS === 'ios') ? '-65%' : 0,
		width: (Platform.OS === 'ios') ? '32%' : '28%',
		height: (Platform.OS === 'ios') ? null : '100%',
		marginLeft: (Platform.OS === 'ios') ? '65%' : 0,
	},
	imageroomEditType : {
		height : (Platform.OS === 'ios') ? '15%' : '25%',
		marginLeft : '-4%',
		marginTop : (Platform.OS === 'ios') ? '16%' : '12%',
		marginBottom: (Platform.OS === 'ios') ? null : '20%',
	},
	imageroomEditBed : {
		height : (Platform.OS === 'ios') ? '15%' : '25%',
		marginTop : (Platform.OS === 'ios') ? '16%' : '12%',
		marginBottom: (Platform.OS === 'ios') ? null : '20%',
		
	},
	imageroomEditAvalible : {
		marginLeft : '-4%',
		height : (Platform.OS === 'ios') ? '15%' : '25%',
		marginTop : (Platform.OS === 'ios') ? '16%' : '12%',
		marginBottom: (Platform.OS === 'ios') ? null : '20%',

	},
	imageroomEditFood : {
		height : (Platform.OS === 'ios') ? '15%' : '25%',
		marginTop : (Platform.OS === 'ios') ? '16%' : '12%',
		marginBottom: (Platform.OS === 'ios') ? null : '20%',
		marginLeft : (Platform.OS === 'ios') ? null : '-4%',
		
	},
	inlineTitleEditRoom: {
		flexWrap: 'wrap', 
        alignItems: 'flex-start',
        flexDirection:'row',
		width: '100%',
	},
	infotitleEditRoom: {
		fontSize: 18,
		marginBottom: 10,
		marginLeft: '30%',
		marginTop : (Platform.OS === 'ios') ? -35 : '5%',
		color: '#982A72',
	},
	wrapperCollapsibleListEdit : {
		marginTop : '10%',
		marginBottom : '10%',
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
		width:200,
		
	},
	pickerviewModalR : {
		marginTop: (Platform.OS === 'ios') ? '-10%' : '10%', 
		marginBottom: (Platform.OS === 'ios') ? '60%' : 0,
	},
	cancelModalR : {
		backgroundColor: '#F194FF',
		borderRadius: 20,
		padding: 10,
		elevation: 2,
		marginLeft: '-60%',
		backgroundColor: '#232159',
		
	},
	notifyModalR : {
		backgroundColor: '#F194FF',
		borderRadius: 20,
		padding: 10,
		elevation: 2,
		marginLeft: '50%',
		marginTop : '-14%',
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
        margin: 1	
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
        margin: 1	
	},
	ReportFeedbackMarginsSender : {
		marginLeft: '5%',
		marginRight : '30%',
		marginBottom : '5%',
	},
	ReportFeedbackMarginsUser : {
		marginLeft: '30%',
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
		marginLeft : '35%'
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
		marginLeft : '85%'
	},
	ReportFeedbackInput : {
		backgroundColor: '#FFF', 
		borderColor: '#FFF', 
		borderWidth : 3, 
		marginLeft : -3, 
		marginRight : -3,
	},
	ReportFeedbackInput2 : {
		backgroundColor: '#FFF', 
		borderColor: '#FFF', 
		borderWidth : -3, 
		marginLeft : -3, 
		marginRight : -3
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
		marginTop : '-20%',
		backgroundColor : '#fff',
		marginLeft : '-60%'

	  },
	  ReportInitBoldText : {
		fontWeight: 'bold',
		fontSize: 15,
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
		fontSize: 15,
		marginTop: '8%',
		marginLeft : '80%'
	},

});

export default globalStyles;