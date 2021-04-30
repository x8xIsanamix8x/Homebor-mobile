import { StyleSheet } from 'react-native';
import { withOrientation } from 'react-navigation';

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
	titulobasic: {
		textAlign: 'center',
		marginBottom: 20,
		fontSize: 32,
		fontWeight: 'bold',
		color: '#000000',
		marginTop: 20
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
		color: '#FFF',
		textAlign: 'center',
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
	cardrooms:{
		
		width: 314,
		marginTop: 1,
		marginLeft: 4,
		marginBottom: 1,
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
		fontSize: 18,
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
	imageprofile: {
		marginTop: 10,
		marginLeft: 10,
		width: '90%',
		height: 150
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

	hideContents : {
		opacity : 0,
		height: 0,
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
		marginBottom: 10,
		justifyContent: 'center',
	},
	priceRooms1 : {
		fontSize: 20,
		marginBottom: 10,
		textAlign : 'right',
		marginTop : -40,
		color : 'green',
	},
	imageroom6: {
		width: 129,
		height: 109
	  },
	  showsliderRoompreview : {
		height : 109,
		
	  },
	infocol2right: {
		marginBottom: 10,
		marginLeft: '40%',
		marginTop: -45,
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
		left: 130
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
		left: 100,
	  },
	  disponibility: {
		top: -20,
		left: 130,
		position: "absolute",
		color: "#121212",
		height: 25,
		width: 49,
		fontSize: 12
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
		left: 100,
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
	  },

	  wrapperCollapsibleList : {
		marginTop: -20,
	  },
	  buttonroom : {
		height: 30,
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
	  

});

export default globalStyles;