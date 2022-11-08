import { StyleSheet, Platform, Dimensions } from 'react-native';



const globalStyles = StyleSheet.create({
   

	//Estilos Corregidos
	//
	//

	//Micelanios
		///Inputs
		input: {
			marginBottom: 30,
		},
		inputedit : {
			fontSize: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 22 : 15 : (Dimensions.get('window').width >= 414) ? 22 : 15,
			marginTop: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '2%' : null : (Dimensions.get('window').width >= 414) ? '2%' : null
		},

		///Contents View
		show : {},
		contenido: {
			flexDirection: 'column',
			justifyContent: 'center',
			marginHorizontal: '2.5%',
			flex: 1
		},
		hideContents : {
			opacity : 0,
			height: 0,
		},
		inlineData: {
			flex: 1, 
			flexDirection: 'row'
		},
		infosubtitle: {
			fontWeight: 'bold',
			fontSize : (Platform.OS === 'ios') ? (Platform.isPad === true) ? 22 : null : (Dimensions.get('window').width >= 414) ? 22 : null 
			
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
		textStyleReply: {
			color: 'white',
			fontWeight: 'bold',
			textAlign: 'center',
		},
		BottomMarginFlatlist : {
			marginBottom : '20%'
		},
		labelSelectEdit : {
			marginLeft : '5%', 
			marginTop : (Platform.OS === 'ios') ? (Platform.isPad === true) ? null : '1%' : (Dimensions.get('window').width >= 414) ? 0 : '1%', 
			fontSize: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 22 : 14 : (Dimensions.get('window').width >= 414) ? 22 : 14
		},
		botonedit: {
			backgroundColor: '#982A72',
			marginTop: 10,
			marginBottom: '10%' 
		},
		botondisableRooms : {
			backgroundColor: '#FB7185'
		},
		botonactiveRooms : {
			backgroundColor: '#34D399'
		},
		botonTexto:{
			flex: 1,
			textTransform: 'uppercase',
			fontWeight: 'bold',
			color: '#FFF',
			textAlign: 'center',
			fontSize: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 20 : 18 : (Dimensions.get('window').width >= 414) ? 20 : 18
		},
		botonTexto2:{
			flex: 1,
			textTransform: 'uppercase',
			fontWeight: 'bold',
			color: '#FFF',
			textAlign: 'center',
			fontSize: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 20 : 13 : (Dimensions.get('window').width >= 414) ? 20 : 13
		},
		botonTextoRoomEdit:{
			flex: 1,
			textTransform: 'uppercase',
			color: '#FFF',
			textAlign: 'center',
			fontSize: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 20 : 18 : (Dimensions.get('window').width >= 414) ? 20 : 18
		},
		titulo: {
			textAlign: 'center',
			marginBottom: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 20 : 10 : 20,
			fontSize: 32,
			fontWeight: 'bold',
			color: '#000000'
		},
		infotitle: {
			fontSize: (Platform.OS === 'ios') ?  (Platform.isPad === true) ? 22 : 16 : (Dimensions.get('window').width >= 414) ? 22 : 16,
			marginBottom: 10,
			marginLeft: 10,
			marginTop: 10,
			fontWeight: 'bold',
			color : '#000000'
		},
		butonfiledit : {
			fontSize: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 22 : 14 : (Dimensions.get('window').width >= 414) ? 22 : 14,
			fontWeight: 'bold',
			textAlign: 'center',
		},
		uploadFile : {
			fontWeight: 'bold', 
			marginTop: '2%', 
			marginLeft: '2%'
		},
		buttonroom : {
			height: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 55 : 45 : (Dimensions.get('window').width >= 414) ? 55 : 45,
		  },
		buttonTextroom : {
			fontSize: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 22 : 16 : (Dimensions.get('window').width >= 414) ? 22 : 16,
			fontWeight: 'bold',
			color: '#000000',
			textAlign: 'center',
			marginTop : (Platform.OS === 'ios') ? (Platform.isPad === true) ? '2%' : '3%' : (Dimensions.get('window').width >= 414) ? '2%' : '3%',
		  },
		arrowLeft : {
			fontSize : (Platform.OS === 'ios') ? (Platform.isPad === true) ? 22 : 16 : (Dimensions.get('window').width >= 414) ? 22 : 16,
			color : 'black',
			fontWeight: 'bold',
		},
		infomaintitleditTabletsNativeBase : {
			fontSize: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 22 : 20 : (Dimensions.get('window').width >= 414) ? 22 : 20,
			fontWeight: 'bold',
			marginBottom:  '5%',
		},
		showsliderProfile : {
			height : (Platform.OS === 'ios') ? (Platform.isPad === true) ? 250 : 150 : (Dimensions.get('window').width >= 414) ? 250 : 150,
			marginBottom : 0,
			
		},
		editSelectsSquareRightSide : {
			flexDirection: "row", 
			marginLeft: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '3%' : '0%' : (Dimensions.get('window').width >= 414) ? '3%' : '0%',
			marginTop : (Platform.OS === 'ios') ? (Platform.isPad === true) ? '0%' : null : (Dimensions.get('window').width >= 414) ? '0%' : null,
			marginBottom: '10%',
		},
		

		//Spinners
		spinner : {
			flexDirection: 'column',
			justifyContent: 'center',
			flex: 1,
		},
		spinnerRefreshInternet : {
			marginTop: '8%'
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

		//Skeletons
		skeletonMarginTop : {
			marginTop: '5%'
		},
		skeletonMarginTopVoucher : {
			marginTop: '-5%'
		},
		skeletonMarginProfileText : {
			marginLeft : '5%', 
			marginRight : '5%', 
			marginTop : '5%'
		},

		///NoInternetConnection
		StacknoInternetConnection : {
			marginTop: '2%',
			marginLeft: '10%', 
			marginRight: '10%'
		},
		imageNotInternet: {
			flexDirection: 'row',
			width: (Platform.OS === 'ios') ? '100%' : '100%',
			height: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '75%' : '100%' : (Dimensions.get('window').width >= 414) ? '80%' : '100%',
			marginTop : (Platform.OS === 'ios') ? (Platform.isPad === true) ? '25%' : '25%' : (Dimensions.get('window').width >= 414) ? '5%' : '15%',
		},

		///Tab Calendar
		TabTextCalendar : {
			fontSize: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 20 : 12 : (Dimensions.get('window').width >= 414) ? 20 : 12, 
			color: '#000', 
		},
		tabiconCalendarNativeBase: {
			height: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 28 : '60%' : (Dimensions.get('window').width >= 414) ? 28 : '60%',
			width: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 28 : '60%' : (Dimensions.get('window').width >= 414) ? 28 : '60%',
		},

		///Tab Edit Property
		TabText : {
			fontSize: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 20 : 12 : (Dimensions.get('window').width >= 414) ? 20 : 12,
			color: '#fff', 
		},
		TabTextGray : {
			fontSize: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 20 : 12 : (Dimensions.get('window').width >= 414) ? 20 : 12,
			color: '#8B8B8B', 
		},
		TabTextTablet : {
			marginLeft: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '15%' : '0%' : (Dimensions.get('window').width >= 414) ? '15%' : '0%',
		},

		tabiconNativeBase: {
			height: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 28 : '100%' : (Dimensions.get('window').width >= 414) ? 28 : '100%',
			width: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 28 : '100%' : (Dimensions.get('window').width >= 414) ? 28 : '100%',
		},

		///Empty
		NotiDont: {
			color: '#232159',
			fontWeight: 'bold',
			textAlign: 'center',
		},

		///Icons 
		editiconsNativeBase: {
			height: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '80%' : '90%' : (Dimensions.get('window').width >= 414) ? '80%' : '90%',
			width: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '80%' : '90%' : (Dimensions.get('window').width >= 414) ? '80%' : '90%', 
		},
		tabicon: {
			height: '80%',
			width: '80%',
		},
		plus : {
			fontSize : 30,
			color : '#232159',
			fontWeight: 'bold',
		  },
		  roomPreviewicon: {
			height: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '80%' : '100%' : (Dimensions.get('window').width >= 414) ? '80%' : '100%',
			width: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '80%' : '100%' : (Dimensions.get('window').width >= 414) ? '80%' : '100%',
		},

		///Labels
		infotitleLabels : {
			fontSize: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 20 : 16 : (Dimensions.get('window').width >= 414) ? 20 : 16,
			marginBottom: 10,
			marginLeft: 10,
			marginTop: 10,
			fontWeight: 'bold',
		},

		///Pickers
		pickerBasicinfoResidence : {
			height: 100, 
			width: (Platform.OS === 'ios') ? (Platform.OS === 'android') ? 190 : 170 : (Dimensions.get('window').width >= 414) ? 190 : 170, 
			marginLeft: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '40%' : '25%' : (Dimensions.get('window').width >= 414) ? '40%' : '25%', 
			marginTop: (Platform.OS === 'ios') ? (Platform.OS === 'ios') ? '5%' : 0 : (Dimensions.get('window').width >= 414) ? '10%' : 0, 
			marginBottom: (Platform.OS === 'ios') ? (Platform.OS === 'ios') ? '3%' : 0 : (Dimensions.get('window').width >= 414) ? '5%' : 0,
		},
		pickerBasicinfo : {
			height: 100, 
			width: 150, 
			marginLeft: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '40%' : '25%' : (Dimensions.get('window').width >= 414) ? '40%' : '25%', 
			marginTop: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '10%' : '5%' : (Dimensions.get('window').width >= 414) ? '10%' : 0, 
			marginBottom: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '5%' : '3%' : (Dimensions.get('window').width >= 414) ? '5%' : 0,
		},
		pickerSmokerEdit : {
			height: 100, 
			width: '80%', 
			marginLeft: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '12%' : '10%' : (Dimensions.get('window').width >= 414) ? '12%' : '10%', 
			marginTop: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '10%' : '5%' : (Dimensions.get('window').width >= 414) ? '10%' : 0, 
			marginBottom: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '5%' : '3%' : (Dimensions.get('window').width >= 414) ? '5%' : 0,
		},
		pickereditAcademyPre : {
			height: 100, 
			width: '95%', 
			marginLeft: '5%', 
			marginTop: (Platform.OS === 'ios') ? '-5%' : 0, 
			marginBottom: (Platform.OS === 'ios') ? 100 : 0
		},

		//Square
		editSelectsSquare : {
			flexDirection: "row", 
			marginBottom: '10%',
		},
		BorderSquare : {
			borderColor: "black", 
			size: "5%"
		},

		///Modal
		titleModalR : {
			marginBottom: 15,
			textAlign: 'center',
			fontWeight: 'bold',
			fontSize : (Platform.OS === 'ios') ? (Platform.isPad === true) ? 22 : 14 : (Dimensions.get('window').width >= 414) ? 22 : 14
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
		  pickerviewModalR : {
			marginTop: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-5%' : '-10%' : (Dimensions.get('window').width >= 414) ? '-5%' : '10%', 
			marginBottom: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '28%' : '60%' : (Dimensions.get('window').width >= 414) ? '10%' : '10%',
			marginLeft : (Platform.OS === 'ios') ? (Platform.isPad === true) ? '5%' : '-5%' : (Dimensions.get('window').width >= 414) ? '5%' : '-5%',
		  },
		cancelModalR : {
			backgroundColor: '#F194FF',
			borderRadius: 20,
			padding: 10,
			elevation: 2,
			marginLeft: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-45%' : '60%' : (Dimensions.get('window').width >= 414) ? '-45%' : '60%',
			backgroundColor: '#232159',
			marginTop : (Platform.OS === 'ios') ? (Platform.isPad === true) ? '2%' : '4%' : (Dimensions.get('window').width >= 414) ? '2%' : (Platform.OS === 'android') ? '8%' : '4%',
			
		},
		notifyModalR : {
			backgroundColor: '#F194FF',
			borderRadius: 20,
			padding: 10,
			elevation: 2,
			marginLeft: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '50%' : '-50%' : (Dimensions.get('window').width >= 414) ? '50%' : (Platform.OS === 'android') ? '-50%' : '-50%',
			marginTop : (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-6%' : '-15%' : (Dimensions.get('window').width >= 414) ? '-5%' : (Platform.OS === 'android') ? '-15%' : '-15%',
			backgroundColor: '#982A72',
			
		},

		textStyleModal: {
			color: 'white',
			fontWeight: 'bold',
			textAlign: 'center',
			fontSize: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 22 : null : (Dimensions.get('window').width >= 414) ? 22 : null
		},
		


	//Disable.js
	disablebold: {
		fontSize: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 22 : 18 : (Dimensions.get('window').width >= 414) ? 22 : 18,
		fontWeight: 'bold',
		textAlign: 'center',
		marginTop : (Platform.isPad === true) ? '10%' : (Dimensions.get('window').width >= 414) ? '10%' : '5%',
		marginBottom : (Platform.OS === 'ios') ? (Platform.isPad === true) ? '5%' : null : (Dimensions.get('window').width >= 414) ? '5%' : null
	},
	disablebold2: {
		fontSize: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 24 : 20 : (Dimensions.get('window').width >= 414) ? 24 :  20,
		fontWeight: 'bold',
		textAlign: 'center',
		marginTop : (Platform.OS === 'ios') ? (Platform.isPad === true) ? '10%' : '5%' : (Dimensions.get('window').width >= 414) ? '10%' : '5%'
	}, 
	disablebold3: {
		color: 'white',
		fontSize: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 17 : 17 : (Dimensions.get('window').width >= 414) ? 20 :  16,
		fontWeight: 'bold',
		textAlign: 'center',
		marginTop : (Platform.OS === 'ios') ? (Platform.isPad === true) ? '10%' : '5%' : (Dimensions.get('window').width >= 414) ? '10%' : '5%'
	},
	botonTextoDisable:{
		flex: 1,
		textTransform: 'uppercase',
		fontWeight: 'bold',
		color: '#FFF',
		textAlign: 'center',
		fontSize: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 17 : 17 : (Dimensions.get('window').width >= 414) ? 17 :  16
	},
	disablewarning: {
		fontSize: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 22 : 18 : (Dimensions.get('window').width >= 414) ? 22 : 18,
		textAlign: 'justify',	
	},
	botonDeleteUser: {
		backgroundColor: '#982A72',
		marginTop: '5%',
		marginBottom: '10%',
		width: '45%',
		
	},

	//Vouchers.js
	Avatarvouchers: {
		borderWidth: 2, 
		backgroundColor : '#fff'
	},
	inlineDataVoucherButton : {
		width: '100%',
	},
	ButtonViewVoucher : {
        fontSize: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 22 : 15 : (Dimensions.get('window').width >= 414) ? 22 : 15,
        backgroundColor: '#982A72'
    },
	VoucherviewIcons : {
        width: '100%',
        color : '#fff',
        marginTop : (Platform.OS === 'ios') ? (Platform.isPad === true) ? '15%' : null : (Dimensions.get('window').width >= 414) ? '5%' : null
    },

	//Payments.js
	PaymentHistoryDates : {
		flexDirection: "row",
        justifyContent: "space-between",
        marginTop: '2%',        
        padding: 10
	},
	stackLeftPayments : {
		width: "100%",
		marginRight: (Platform.OS === 'ios') ? (Platform.isPad === true) ? "-53%" : "-55%"  : (Dimensions.get('window').width >= 414) ? '-53%' :  "-55%", 
		marginLeft : (Platform.OS === 'ios') ? (Platform.isPad === true) ? "2%" : "0.5%" : (Dimensions.get('window').width >= 414) ? "2%" : "0.5%"
	},
	PaymentHistoryRLelements : {
		padding: 4,
		backgroundColor: '#FFF',
		width:50,
       	height:38,
	},
	ReportFeedbackIconsCamera : {
		width: '100%',
		color: '#000',
		marginTop : (Platform.OS === 'ios') ? (Platform.isPad === true) ? '5%' : null : (Dimensions.get('window').width >= 414) ? '5%' : null
	},
	ReportFeedbackInput3 : {
		backgroundColor: '#FFF', 
		borderColor: '#FFF', 
		borderWidth : 3, 
		justifyContent: 'flex-end',
		fontSize: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 24 : null : (Dimensions.get('window').width >= 414) ? 24 : null
	},
	stackRightPayments : {
		width: "100%",
		marginRight: "-55%"
	},
	
	stackSearchPayments : {
		width: "23%"
	},
	PaymentHistorySearchelements : {
		borderWidth:1,
		borderColor:'rgba(0,0,0,0.2)',
		alignItems:'center',
		justifyContent:'center',
		padding: 4,
		backgroundColor: '#982A72',
		width: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 60 : 40 : (Dimensions.get('window').width >= 414) ? 50 : 40,
       	height: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 60 : 40 : (Dimensions.get('window').width >= 414) ? 50 : 40,
        borderRadius: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 60 : 40 : (Dimensions.get('window').width >= 414) ? 60 : 40,
		marginTop: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-2%' : '-2%' : (Dimensions.get('window').width >= 414) ? '1%' : '2%',
		marginBottom: '10%', 
		marginLeft : (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-5%' : null : (Dimensions.get('window').width >= 414) ? '1%' : null,
	},
	PaymentText : {
		fontSize : (Platform.OS === 'ios') ? (Platform.isPad === true) ? 22 : null : (Dimensions.get('window').width >= 414) ? 22 : null
	},
	

	//GalleryEditProfile.js
	marginTopRequiredFields : {
		marginTop: '5%'
	},
	titlegalleryedit : {
		fontWeight : "bold", 
		fontSize : (Platform.OS === 'ios') ? (Platform.isPad === true) ? 22 : 18 : (Dimensions.get('window').width >= 414) ? 22 : 18, 
		textAlign: 'center'
	},
	ImageGalleryedit : {
		width: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 240 : 200 : (Dimensions.get('window').width >= 414) ? 240 : 200, 
		height: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 240 : 200 : (Dimensions.get('window').width >= 414) ? 240 : 200, 
		backgroundColor: "#DDDDDD"
	},

	//FamilyeditProfile.js 
	DatesinputRLelements : {
		padding: 4,
		backgroundColor: '#FFF',
		width:50,
       	height:38,
	},

	//EditRoom.js 
	titleRooms: {
		fontSize: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 22 : 20 : (Dimensions.get('window').width >= 414) ? 22 : 20,
		marginBottom: '1%',
		justifyContent: 'center',
		fontWeight: 'bold',
	},
	scrollviewedit : {
		marginBottom : '10%',
	},
	photoEditRoom : {
		width: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 250 : 205 : (Dimensions.get('window').width >= 414) ? 250 :  200,
		height: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 250 : 205 : (Dimensions.get('window').width >= 414) ? 250 : 200, 
		backgroundColor: "#DDDDDD"
	},
	EditRoomView : {
		marginLeft: (Platform.OS === 'ios') ? (Platform.isPad === true) ? "5%" : "0%" : (Dimensions.get('window').width >= 414) ? "5%" : "0%"
	},
	EditRoomPicker : {
		width: (Platform.OS === 'ios') ? (Platform.isPad === true) ? "100%" : '100%' : (Dimensions.get('window').width >= 414) ? '100%' : '100%',
	},
	EditRoomText : {
		fontSize: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 22 : 18 : (Dimensions.get('window').width >= 414) ? 22 : 18, 
		color: '#982A72',
		fontWeight: 'bold',
	},
	EditRoomInputWeekly : {
		marginLeft: (Platform.OS === 'ios') ? (Platform.isPad === true) ? "25%" : "0%" : (Dimensions.get('window').width >= 414) ? "25%" : "0%"
	},
	EditRoomInputWeeklyBar : {
		fontSize: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 22 : 15 : (Dimensions.get('window').width >= 414) ? 22 : 15,
	},
	wrapperCollapsibleListEdit : {
		marginTop :  '5%',
		marginBottom :  '10%',
	},

	//Report.js 
	AvatarReportList : {
		width: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 90 : 70 : (Dimensions.get('window').width >= 414) ? 90 : 70, 
		height: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 90 : 70 : (Dimensions.get('window').width >= 414) ? 90 : 70, 
		borderWidth: 2, 
		borderRadius: 150 / 2,
	},
	ReportsBoldText : {
		fontWeight: 'bold',
		fontSize: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 22 : 16 : (Dimensions.get('window').width >= 414) ? 22 : 16,
		marginBottom : '-8%'
	},
	ReportsText : {
		fontSize: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 22 : 15 : (Dimensions.get('window').width >= 414) ? 22 : 15,
		marginTop : '10%',
		marginBottom : '-6%'
	},
	ReportsTextDate : {
		fontSize: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 22 : 14 : (Dimensions.get('window').width >= 414) ? 22 : 14,
	},
	backgroundCircleInitReport : {
		backgroundColor: '#982A72'
	},


	//CrearCuenta.js
	createaccount:{
		color: '#232159',
		marginTop: '15%',
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 22 : 18 : (Dimensions.get('window').width >= 414) ? 22 : 18,
		textTransform: 'uppercase'	
	},

	//Welcome.js
	tituloWelcome: {
		textAlign: 'center',
		marginBottom: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 20 : 10 : 20,
		fontSize: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 24 : 22 : (Dimensions.get('window').width >= 414) ? 24 : 22,
		fontWeight: 'bold',
		color: '#000000'
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
	TellusProgress : {
		marginTop: '5%', 
		marginBottom: '-5%'
	},
	botonWelcome: {
		backgroundColor: '#982A72',
		marginTop: (Platform.OS === 'ios') ? '15%' : (Dimensions.get('window').width >= 414) ? '10%' : '15%',
		marginBottom: '10%',
		width: '45%',
		marginLeft : '50%',
	},
	imageWelcome: {
		flexDirection: 'row',
		width: (Platform.OS === 'ios') ? '100%' : '100%',
		height: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '130%' : '95%' : (Dimensions.get('window').width >= 414) ? '130%' : '100%',
		marginTop : (Platform.OS === 'ios') ? (Platform.isPad === true) ? '5%' : '15%' : (Dimensions.get('window').width >= 414) ? '5%' : '15%',
	},
	TellusTextandBoton : {
		marginTop: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '25%' : '20%' : (Dimensions.get('window').width >= 414) ? '30%' : '20%', 
		marginLeft: '5%', 
		marginRight: '5%'
	},
	imageTellus: {
		flexDirection: 'row',
		width: (Platform.OS === 'ios') ? '100%' : '100%',
		height: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '130%' : '95%' : (Dimensions.get('window').width >= 414) ? '130%' : '100%',
		marginTop : (Platform.OS === 'ios') ? (Platform.isPad === true) ? '5%' : '15%' : (Dimensions.get('window').width >= 414) ? '5%' : '15%',
	  },
	  imageYourroom: {
		flexDirection: 'row',
		width: (Platform.OS === 'ios') ? '100%' : '100%',
		height: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '130%' : '95%' : (Dimensions.get('window').width >= 414) ? '130%' : '100%',
		marginTop : (Platform.OS === 'ios') ? (Platform.isPad === true) ? '5%' : '15%' : (Dimensions.get('window').width >= 414) ? '5%' : '15%',
	  },
	  YourroomTextandBoton : {
		marginTop: (Platform.OS === 'ios') ? '25%' : (Dimensions.get('window').width >= 414) ? '30%' : '25%', 
		marginLeft: '5%', 
		marginRight: '5%'
	},
	CongratulationsTextandBoton : {
		marginTop: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '20%' : '-10%' : (Dimensions.get('window').width >= 414) ? '20%' : '3%', 
		marginLeft: '5%', 
		marginRight: '5%'
	},
	imageCongratulations:{
		flexDirection: 'row',
		width: (Platform.OS === 'ios') ? '100%' : '100%',
		height: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '130%' : '95%' : (Dimensions.get('window').width >= 414) ? '125%' : '100%',
	  },
	CongratulationsTextUp : {
		marginTop: '5%', 
		marginLeft: '5%', 
		marginRight: '5%',
		marginBottom : '5%'
	},
	botonCongratulations2: {
		marginTop: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-15%' : '-20.9%' : (Dimensions.get('window').width >= 414) ? '-15%' : '-20.9%', 
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
	imageEndregister: {
		flexDirection: 'row',
		width: (Platform.OS === 'ios') ? '100%' : '100%',
		height: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '130%' : '90%' : (Dimensions.get('window').width >= 414) ? '130%' : '95%',
		marginTop : (Platform.OS === 'ios') ? (Platform.isPad === true) ? '5%' : '20%' : (Dimensions.get('window').width >= 414) ? '5%' : '15%',
	  },
	

	//ReportFeedback.js
	ReportFeedbackMargins : {
		marginLeft: '5%',
		marginRight : '5%',
		marginBottom : '5%',
	},
	ReportFeedbackIcons : {
		width: '100%',
		color : '#000',
		marginTop : (Platform.OS === 'ios') ? (Platform.isPad === true) ? '15%' : null : (Dimensions.get('window').width >= 414) ? '5%' : null
	},
	ReportFeedbackLLelements : {
		backgroundColor: '#F9FAFC',
		width:50,
       	height:43,
	},
	ReportFeedbackIconsCamera : {
		width: '100%',
		color: '#000',
	},
	ReportFeedbackRLelements : {
		padding: 6,
		backgroundColor: '#232159',                                        
		borderWidth:1,
		borderColor:'rgba(0,0,0,0.2)',
		alignItems:'center',
		justifyContent:'center',
		width: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 50 :  50 : (Dimensions.get('window').width >= 414) ? 50 : 50,
		height: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 50 :  50 : (Dimensions.get('window').width >= 414) ? 50 : 50,
		borderRadius:50,
	},
	ReportFeedbackIconsPaperplane : {
		width: '100%',
		color: 'white',
		marginTop : (Platform.OS === 'ios') ? (Platform.isPad === true) ? '5%' : null : (Dimensions.get('window').width >= 414) ? '5%' : null
	},
	TitleReportFeedback : {
		
		fontSize : (Platform.OS === 'ios') ? (Platform.isPad === true) ? 20 : 14 : (Dimensions.get('window').width >= 414) ? 20 : 14, 
		fontWeight : 'bold', 
		color : 'white'
	},
	BackgroundTitle : {
		backgroundColor: '#394893'
	},
	BackgroundSender : {
		backgroundColor: '#392B84',
	},
	BackgroundUser : {
		backgroundColor: '#e581c3',
	},
	Reportcheck: {
		width: 15,
		height: 15,
	},
	Reportcheck2: {
		width: 15,
		height: 15,
	},
	infosubtitlegray: {
		fontSize : (Platform.OS === 'ios') ? (Platform.isPad === true) ? 16 : 11 : (Dimensions.get('window').width >= 414) ? 16 : 11, 
		color : '#FFFFFF'
	},
	ImageLoadReportFeedback : {
		width: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 180 : 100 : (Dimensions.get('window').width >= 414) ? 180 : 100, 
		height: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 180 : 100 : (Dimensions.get('window').width >= 414) ? 180 : 100, 
		backgroundColor: "#DDDDDD", 
		marginLeft : (Platform.OS === 'ios') ? (Platform.isPad === true) ? '40%' : '35%' : (Dimensions.get('window').width >= 414) ? '40%' : '35%',
		marginBottom : (Platform.OS === 'ios') ? (Platform.isPad === true) ? '2%' : null : (Dimensions.get('window').width >= 414) ? '2%' : null
	},
	imageroomReportFeedback: {
		width: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 229 : 129 : (Dimensions.get('window').width >= 414) ? 229 :  129,
		height: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 229 : 129 : (Dimensions.get('window').width >= 414) ? 229 : 129,
	},
	textLineItemReportFeedback: {
        color: "#fff",
		fontSize: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 22 : 15 : (Dimensions.get('window').width >= 414) ? 22 : 15 
    },


	//ReportInit.js 
	ReportInitBoldText : {
		fontWeight: 'bold',
		fontSize: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 22 : 15 : (Dimensions.get('window').width >= 414) ? 22 : 15,
	},
	buttonsreport : {
		marginBottom: '3%',
	},
	ImageReportInit : {
		width: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 250 : 200 : (Dimensions.get('window').width >= 414) ? 250 : 200, 
		height: 200, 
		backgroundColor: "#DDDDDD",
	},
	ReportInitIconsGoBack : {
		width: '100%',
		color: 'white',
		fontSize: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 18 : 15 : (Dimensions.get('window').width >= 414) ? 17 : 15,
		marginRight : (Platform.OS === 'ios') ? (Platform.isPad === true) ? '10%' : '5%' : (Dimensions.get('window').width >= 414) ? '10%' : '15%'
	},
	BackgroundNoti: {
		width: '100%',
		height: '100%',
		backgroundColor : '#FDFDFD'
	},

	//Notifications.js
	ImageBackgroundNoti: {
		width: '100%',
		height: '100%',
	},
	NotificationMarginBottom : {
		marginBottom : (Platform.OS === 'ios') ? (Platform.isPad === true) ? '3%' : null : (Dimensions.get('window').width >= 414) ? '3%' : null,
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
	textreporttitle : {
		fontSize: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 22 : null : (Dimensions.get('window').width >= 414) ? 22 : null
	  },
	imageNoti: {
		width: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 110 : 70 : (Dimensions.get('window').width >= 414) ? 110 : 70,
    	height: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 110 : 70 : (Dimensions.get('window').width >= 414) ? 110 : 70,
		borderWidth: 2,
    	borderRadius: 180 / 2,
		marginTop : (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-15%' : '-25%' : (Dimensions.get('window').width >= 414) ? '-15%' : '-25%',
		backgroundColor : '#fff',
		marginLeft : (Platform.OS === 'ios') ? (Platform.isPad === true) ? '10%' : '0%' : (Dimensions.get('window').width >= 414) ? '10%' : '0%',
	},

	//Studentnot.js
	infomaintitleditStudentnotReservation: {
		fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 20,
		marginBottom: (Platform.isPad === true) ? '5%' : (Dimensions.get('window').width >= 414) ? '5%' : 20,
		marginTop: (Platform.isPad === true) ? '10%' : (Dimensions.get('window').width >= 414) ? '10%' : '3%',
		fontWeight: 'bold',
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
	profileStudentnot: {
		width: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 180 : 125 : (Dimensions.get('window').width >= 414) ? 180 : 125,
		height: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 180 : 125 : (Dimensions.get('window').width >= 414) ? 180 : 125,
		borderColor: 'black',
		borderWidth: 2,
		borderRadius: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 180 / 2 : 125 / 2 : (Dimensions.get('window').width >= 414) ? 180 / 2 : 125 / 2,
	},
	profiledirtitleStudent : {
		textAlign : 'left',
		marginBottom: '5%',
	},
	profiledirtitleStudentLeftSide : {
		textAlign : 'left',
		marginBottom: '5%',
		marginLeft: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '5%' : 0 : (Dimensions.get('window').width >= 414) ? '5%' : 0
	},
	profiledirtitleStudentRightSide : {
		textAlign : 'left',
		marginBottom: '5%',
		marginLeft: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '50%' : 0 : (Dimensions.get('window').width >= 414) ? '50%' : 0,
		marginTop: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-8%' : 0 : (Dimensions.get('window').width >= 414) ? '-8%' : 0,
	},
	varProfile: {
		fontSize: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 22 : 16 : (Dimensions.get('window').width >= 414) ? 22 : 16,
	},
	botonconfirmStuNativeBase: {
		backgroundColor: '#982A72',
		width: '100%',
	},
	botonrejectStuNativeBase: {
		backgroundColor: '#232159',
		width: '100%',
	},
	profileMargins: {
        marginLeft: '5%',
        marginRight : '5%',
    },
	editSelectsSquareRightSideStudentInfo : {
        flexDirection: "row", 
        marginLeft: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '5%' : '0%' : (Dimensions.get('window').width >= 414) ? '5%' : '0%',
        marginTop : (Platform.OS === 'ios') ? (Platform.isPad === true) ? '0%' : null : (Dimensions.get('window').width >= 414) ? '0%' : null,
        marginBottom: '10%',
    },

	//StudentInfo.js 
	profileStudent: {
		width: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 180 : 125 : (Dimensions.get('window').width >= 414) ? 180 : 125,
		height: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 180 : 125 : (Dimensions.get('window').width >= 414) ? 180 : 125,
		borderColor: 'black',
		borderWidth: 2,
		borderRadius: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 180 / 2 : 125 / 2 : (Dimensions.get('window').width >= 414) ? 180 / 2 : 125 / 2,
		marginBottom : '4%',
		backgroundColor : 'white'
	},
	botonStudnentProfile: {
		backgroundColor: '#982A72',
		marginTop: '5%',
		marginBottom: '10%',
		width: '70%',
	},
	infomaintitleditStudentLodging: {
        fontSize: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 22 : 20 : (Dimensions.get('window').width >= 414) ? 22 : 20,
        marginBottom: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '5%' : 20 : (Dimensions.get('window').width >= 414) ? '5%' : 20,
        marginTop: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '1%' : '3%' : (Dimensions.get('window').width >= 414) ? '1%' : '3%',
        fontWeight: 'bold',
    },
	botoneditProfile2: {
        backgroundColor: '#982A72',
        marginTop: 10,
        marginBottom: '10%',
        width: '70%',
        marginLeft: '15%', 
    },


	//Profile.js 
	h_nameNativeBase : {
		fontWeight : "bold", 
		fontSize : (Platform.OS === 'ios') ? (Platform.isPad === true) ? 22 : 18 : (Dimensions.get('window').width >= 414) ? 22 : 18, 
	},
	roomvarNativeBase : {
		fontSize : (Platform.OS === 'ios') ? (Platform.isPad === true) ? 22 : 18 : (Dimensions.get('window').width >= 414) ? 22 : 16, 
		textAlign: 'center',
	},
	numvarNativeBase : {
		fontSize : (Platform.OS === 'ios') ? (Platform.isPad === true) ? 22 : 18 : (Dimensions.get('window').width >= 414) ? 22 : 16, 
		textAlign: 'center',
	},
	roomNativeBase : {
		fontWeight : "bold", 
		fontSize : (Platform.OS === 'ios') ? (Platform.isPad === true) ? 22 : 18 :(Dimensions.get('window').width >= 414) ? 22 : 16, 
	},
	numNativeBase : {
		fontWeight : "bold", 
		fontSize : (Platform.OS === 'ios') ? (Platform.isPad === true) ? 22 : 18 : (Dimensions.get('window').width >= 414) ? 22 : 16, 
	},
	infomaintitleditNativeBase: {
		fontSize: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 22 : 20 : (Dimensions.get('window').width >= 414) ? 22 : 20,
		fontWeight: 'bold',
	},
	editMargintop : {
		marginTop: '-10%',
	},
	infotitleNativeBase: {
		fontSize: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 22 : 16 : (Dimensions.get('window').width >= 414) ? 22 : 16,
		fontWeight: 'bold',
		color : '#000000',
	},
	infotitle2: {
		fontSize: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 22 : 16 : (Dimensions.get('window').width >= 414) ? 22 : 16,
		marginBottom: 10,
		marginLeft: 10,
		marginTop: 10,
		fontWeight: 'bold',
		textAlign: 'center'
	},
	infotitleSpecialDiet : {
		fontSize: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 22 : 16 : (Dimensions.get('window').width >= 414) ? 22 : 16,
		marginBottom: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '5%' : 10 : (Dimensions.get('window').width >= 414) ? '5%' : 10,
		marginLeft: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '40%' : 10 : (Dimensions.get('window').width >= 414) ? '40%' : 10,
		marginTop: 10,
		fontWeight: 'bold',
		fontSize : (Platform.OS === 'ios') ? (Platform.isPad === true) ? 22 : 14 : (Dimensions.get('window').width >= 414) ? 22 : 14,
	},
	infotitleLawNativeBase : {
		fontSize: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 22 : 16 : (Dimensions.get('window').width >= 414) ? 22 : 16,
		marginBottom: '3%',
		fontWeight: 'bold',
		color : 'blue'
	},
	infomaintitleditTablets: {
		textAlign : (Platform.OS === 'ios') ? (Platform.isPad === true) ? 'center' : null : (Dimensions.get('window').width >= 414) ? 'center' : null,
		fontSize: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 22 : 20 : (Dimensions.get('window').width >= 414) ? 22 : 20,
		marginBottom:  20,
		marginTop: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '0%' : '3%' : (Dimensions.get('window').width >= 414) ? '0%' : '3%',
		fontWeight: 'bold',
		marginLeft: (Platform.OS === 'ios') ? (Platform.isPad === true) ? null : null : (Dimensions.get('window').width >= 414) ? '40%' : null, 
	},
	profiledirtitle : {
		textAlign : 'center',
		marginBottom: '5%',
	},
	profiledirtitle2 : {
		textAlign : 'left',
		marginBottom: '5%',
	},
	imageprofile: {
        marginTop: 10,
        marginLeft: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 40 : 10 : (Dimensions.get('window').width >= 414) ? 40 : 10,
        width: '90%',
        height: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 250 : 150 : (Dimensions.get('window').width >= 414) ? 250 : 150
    },
	botoneditProfileNativeBase: {
        backgroundColor: '#982A72',
        marginBottom: '10%',
        width: '50%',
    },
	ProfileBannerView : {
		flex: 1, 
		alignItems: "center", 
		justifyContent: "center" 
	},
	ProfileBannerImages : {
		width: '100%',
		height:'100%'
	},

	//RoomPreview.js 
	titleRoomsNativeBase: {
        fontSize: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 22 : 20 : (Dimensions.get('window').width >= 414) ? 22 : 20,
        fontWeight: 'bold',
    },
	priceRooms1NativeBase : {
        fontSize: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 22 : 20 : (Dimensions.get('window').width >= 414) ? 22 : 20,
        color : 'green',
        fontWeight: 'bold',
    },
	showsliderRoompreviewNativeBase : {
        height : (Platform.OS === 'ios') ? (Platform.isPad === true) ? 229 : 109 : (Dimensions.get('window').width >= 414) ? 229 : 109,
    },
	imageroom2NativeBase: {
        width: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 48 : 27 : (Dimensions.get('window').width >= 414) ? 48 : 27,
        height: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 43 : 19 : (Dimensions.get('window').width >= 414) ? 43 :  19
    },
	TypeAcomodationNativeBase: {
        color: "#121212",
        fontSize: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 22 : 17 : (Dimensions.get('window').width >= 414) ? 20 : 14,
    },
	wrapperCollapsibleList : {
        marginTop: -20,
    },
	buttonroom : {
        height: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 55 : 45 : (Dimensions.get('window').width >= 414) ? 55 : 45,
      },
	collapsibleItem : {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: "#CCC",
        padding: 10,
    },
	roomocuppied : {
        textAlign: 'center',
        color: 'gray',
    },
	roomocuppiedName : {
        textAlign: 'center',
        fontSize: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 22 : 14 : (Dimensions.get('window').width >= 414) ? 22 : 14,
    },
	roomocuppiedArrive : {
        fontWeight : "bold",
        color : "purple",
        textAlign : "left",
        fontSize: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 22 : null : (Dimensions.get('window').width >= 414) ? 22 : null,
    },
    roomocuppiedLeave : {
        fontWeight : "bold",
        color: "purple",
        textAlign: "right",
        marginTop: (Platform.OS === 'ios') ? (Platform.isPad === true) ? -25 : -15 : (Dimensions.get('window').width >= 414) ? -25 : -15,
        fontSize: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 22 : null : (Dimensions.get('window').width >= 414) ? 22 : null,
    },
	roomocuppiedStart : {
        textAlign : "left",
        fontSize: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 22 : null : (Dimensions.get('window').width >= 414) ? 22 : null,
      },
      roomocuppiedEnd: {
        textAlign: "right",
        marginTop: (Platform.OS === 'ios') ? (Platform.isPad === true) ? -25 : -15 : (Dimensions.get('window').width >= 414) ? -25 : -15,
        fontSize: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 22 : null : (Dimensions.get('window').width >= 414) ? 22 : null,
      },
	  imageroom5BedFilter: {
        width: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 48 : 28 : (Dimensions.get('window').width >= 414) ? 48 : 28,
        height: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 41 : 21 : (Dimensions.get('window').width >= 414) ? 41 : 21,
      },
	  roomocuppiedArrive : {
        fontWeight : "bold",
        color : "purple",
        textAlign : "left",
        fontSize: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 22 : null : (Dimensions.get('window').width >= 414) ? 22 : null,
      },
	  roomOcuppiedfilterTitleBed : {
        flexDirection: 'row', 
        justifyContent: 'flex-end', 
        marginTop: (Platform.OS === 'ios') ? (Platform.isPad === true) ? -40 : -23 : (Dimensions.get('window').width >= 414) ? -40 : -23,
      },
	  imageroom5AvalibleFilter: {
        width: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 48 : 28 : (Dimensions.get('window').width >= 414) ? 48 : 28,
        height: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 41 : 21 : (Dimensions.get('window').width >= 414) ? 41 : 21,
      },
	  roomocuppiedLeaveTitleFilter : {
        fontWeight : "bold",
        color: "purple",
        textAlign: "right",
        fontSize: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 22 : null : (Dimensions.get('window').width >= 414) ? 22 : null,
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

	  hide_collapsible : {
        opacity : 0,
        height : 0,
    },

	//AddneweventCalendar.js 
	containerNewEvent : {
        marginTop: '10%', 
        alignItems: 'center', 
        justifyContent: 'center'
    },
	pickerModalR : {
        height:30, 
        width: (Platform.OS === 'android') ? 215 : 200,
        marginLeft : (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-10%' : '0%' : (Dimensions.get('window').width >= 414) ? '-10%' : '-10%',
        
    },
	pickerviewModalRAddEvent8 : {
        marginTop: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-10%' : '-15%' : (Dimensions.get('window').width >= 414) ? '-5%' : '-10%', 
        marginBottom: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '15%' : '20%' : (Dimensions.get('window').width >= 414) ? '3%' : '5%',
        marginLeft: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '18%' : '0%' : (Dimensions.get('window').width >= 414) ? '15%' : '10%',
    },
	notifyModalRAddEvent2NativeBase : {
        backgroundColor: '#F194FF',
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        backgroundColor: '#982A72',
        width: '100%',
        
    },
	notifyModalCAddEvent2NativeBase : {
        backgroundColor: '#232159',
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        width: '100%',
        
    },
	notifyModalRAddEvent2NativeBaseNew : {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        backgroundColor: '#2642A4',
        width: '100%',
        
    },
	notifyModalCAddEvent2NativeBaseNew : {
        backgroundColor: '#FA797A',
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        width: '100%',
    },

	//Calendar.js
	drawerUser: {
        color: 'white', 
        fontWeight: 'bold', 
        fontSize: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 26 : 17 : (Dimensions.get('window').width >= 414) ? 26 : 17, 
        marginLeft: '5%'
    },
	DrawerbackgroundImage : {
        width: '100%'
    },
	drawerImage: {
        marginTop: (Platform.OS === 'ios') ? '20%' : '12%', 
        marginBottom: '5%',
    },
	drawerMail: {
        color: 'white', 
        fontSize: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 24 : 15 : (Dimensions.get('window').width >= 414) ? 24 : 15, 
        marginLeft: '5%', 
        marginTop: '2%', 
        marginBottom: '3%'
    },
	DrawerText : {
        fontSize: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 25 : 14 : (Dimensions.get('window').width >= 414) ? 25 : 14, 
        color: '#fff', 
        fontWeight: 'bold',
    },
	DrawerIcons : {
        height: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 48 : 24 : (Dimensions.get('window').width >= 414) ? 48 : 24, 
        width: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 48 : 24 : (Dimensions.get('window').width >= 414) ? 48 : 24, 
        borderRadius : 50
    },
	DrawerBannerView : {
		flex: 1, 
		alignItems: "center", 
		justifyContent: "center" 
	},
	DrawerBannerImages : {
		width: '100%',
		height:'100%'
	},

	//Eventshistory.js
	imageCalendarNewDesing: {
        width: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 150 : 70 : (Dimensions.get('window').width >= 414) ? 150 : 70,
        height: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 150 : 90 : (Dimensions.get('window').width >= 414) ? 150 : 90,
        marginBottom: 18,
        marginTop: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '3%' : '5%' : (Dimensions.get('window').width >= 414) ? '3%' : '5%',
        marginLeft : (Platform.OS === 'ios') ? (Platform.isPad === true) ? '0%' : '10%' : (Dimensions.get('window').width >= 414) ? '0%' : '10%'
    },
	imageCalendarNewDesing2: {
        width: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 150 : 70 : (Dimensions.get('window').width >= 414) ? 150 : 70,
        height: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 150 : 70 : (Dimensions.get('window').width >= 414) ? 150 : 70,
    },
	infosubtitleCalendarNewDesing: {
        fontWeight: 'bold',
        color : '#fff',
		textAlign: 'center',
        fontSize : (Platform.OS === 'ios') ? (Platform.isPad === true) ? 22 : null : (Dimensions.get('window').width >= 414) ? 22 : null, 
    },
	infosubtitleCalendar: {
        fontWeight: 'bold',
        color : '#232159',
        fontSize : (Platform.OS === 'ios') ? (Platform.isPad === true) ? 22 : null : (Dimensions.get('window').width >= 414) ? 22 : null, 
        textAlign : 'center',
    },
	infosubtitleCalendar2: {
        color : '#232159',
        fontSize : (Platform.OS === 'ios') ? (Platform.isPad === true) ? 22 : null : (Dimensions.get('window').width >= 414) ? 22 : null, 
		textAlign: 'center',
    },
	infosubtitleCalendar3: {
		color : 'white',
        fontSize : (Platform.OS === 'ios') ? (Platform.isPad === true) ? 22 : null : (Dimensions.get('window').width >= 414) ? 22 : null, 
		marginBottom: "3%"
    },
	infosubtitleCalendar4: {
		fontWeight: 'bold',
		color : 'white',
        fontSize : (Platform.OS === 'ios') ? (Platform.isPad === true) ? 22 : null : (Dimensions.get('window').width >= 414) ? 22 : null, 
		marginBottom: "3%"
    },
	cardNewEventDesingColor1: {
        borderRadius: 6,
        elevation: 3,
		backgroundColor: '#232159',
        shadowOffset: { width:1, height:1 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
    },
	cardNewEventDesingColor2: {
        borderRadius: 6,
        elevation: 3,
		backgroundColor: '#982A72',
        shadowOffset: { width:1, height:1 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
   },
	cardNewEventDesingColor3: {
        borderRadius: 6,
        elevation: 3,
		backgroundColor: '#394893',
        shadowOffset: { width:1, height:1 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
    },
	cardNewEventDesingColor4: {
        borderRadius: 6,
        elevation: 3,
		backgroundColor: '#A54483',
        shadowOffset: { width:1, height:1 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
    },
	cardNewEventDesingColor5: {
        borderRadius: 6,
        elevation: 3,
		backgroundColor: '#5D418D',
        shadowOffset: { width:1, height:1 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
    },
	cardNewEventDesingColor6: {
        borderRadius: 6,
        elevation: 3,
		backgroundColor: '#392B84',
        shadowOffset: { width:1, height:1 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
    },
	cardNewEventDesingColor7: {
        borderRadius: 6,
        elevation: 3,
		backgroundColor: '#B15391',
        shadowOffset: { width:1, height:1 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
   },
	cardNewEventDesingColor8: {
        borderRadius: 6,
        elevation: 3,
		backgroundColor: '#B15391',
        shadowOffset: { width:1, height:1 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
	},
	cardNewEventDesingColorA: {
        borderRadius: 6,
        elevation: 3,
		backgroundColor: '#C471CF',
        shadowOffset: { width:1, height:1 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
    },
	cardCalendarEvents : {
		borderRadius: 6,
        elevation: 3,
        backgroundColor: '#fff',
        shadowOffset: { width:1, height:1 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
	},
	cardCalendarEvents2 : {
		borderRadius: 6,
        elevation: 3,
        shadowOffset: { width:1, height:1 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
	},
	cardCalendar: {
        borderRadius: 6,
        elevation: 3,
		backgroundColor: '#F2F2F2',
        shadowOffset: { width:1, height:1 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
    },
    cardContentCalendar: {
        marginHorizontal: 18,
        marginVertical: 10,
    },
	cardContentCalendar2: {
        marginVertical: 10,
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

	//Registers
	botoneditRequiredFields: {
		backgroundColor: '#982A72',
		marginTop: '5%',
		marginBottom: '10%',
		width: '45%',
		marginLeft : '50%',
	},

	//Disablelogin.js 
	tituloCongratulations2: {
		textAlign: 'center',
		marginBottom: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 20 : 10 : 20,
		fontSize: 20,
		fontWeight: 'bold',
		color: '#000000'
	},
	tituloCongratulations: {
		textAlign: 'center',
		marginBottom: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 10 : 10 : 20,
		fontSize: 16,
		fontWeight: 'bold',
		color: '#000000'
	},
	botonCongratulations: {
		marginTop: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '10%' : '15%' : (Dimensions.get('window').width >= 414) ? '8%' : '15%',
		backgroundColor: '#982A72',
		marginBottom: '10%',
		width: '40%',
		marginLeft : '5%',
	},
	botonCongratulations3: {
		marginTop: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-15%' : '-20.9%' : (Dimensions.get('window').width >= 414) ? '-14.5%' : '-20.9%', 
		width: '40%',
		marginLeft : '55%',
		borderColor: '#982A72',
		borderWidth: 2,
	},
	botonTextoIconBlack:{
		flex: 1,
		textTransform: 'uppercase',
		fontWeight: 'bold',
		color: '#000',
		textAlign: 'center',
		fontSize: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 17 : 16 : (Dimensions.get('window').width >= 414) ? 17 :  16
	},

	//RecoverPassword.js           
	formcontrolCrearCuenta: {
		marginTop : '10%'
	},
	contenidoCrearCuenta: {
		flexDirection: 'column',
		justifyContent: 'center',
		marginHorizontal: '10.5%',
		flex: 1
	},
	viewCrearCuenta: {
		marginTop : '10%'
	},
	inputCrearCuenta: {
		backgroundColor: '#FFF',
		fontSize: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 22 : 18 : (Dimensions.get('window').width >= 414) ? 22 : 18
	},
	errormessageEmailLogin : {
		marginTop: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-3%' : '-7%' : (Dimensions.get('window').width >= 414) ? '-3%' : '-7%'
	},
	errormessagePasswordLogin : {
		marginTop: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-3%' : '-7%' : (Dimensions.get('window').width >= 414) ? '-3%' : '-7%', 
		marginBottom: '2%'
	},
	botonCrearCuenta: {
		backgroundColor: '#982A72',
		marginTop: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 100 : 10 :(Dimensions.get('window').width >= 414) ? 100 : 10,
		marginBottom: '10%'
	},
	createaccountButton:{
		color: 'white',
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 22 : 18 : (Dimensions.get('window').width >= 414) ? 22 : 18,
		textTransform: 'uppercase'
		
		
	},

	//CrearCuenta.js 
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
	formcontrolCrearCuenta: {
		marginTop : '10%'
	},
	CardCreateAccount : {
		marginLeft: Platform.OS === 'ios' ? '3%' : '8%',
		marginRight: Platform.OS === 'ios' ? '3%' : '8%',
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
	labelSelectEditTermsConditions : {
		marginLeft : '5%', 
		marginTop : (Platform.OS === 'ios') ? (Platform.isPad === true) ? null : '1%' : (Dimensions.get('window').width >= 414) ? 0 : '1%', 
		fontSize: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 22 : 14 : (Dimensions.get('window').width >= 414) ? 22 : 14,
		color: '#982A72'
	},
	inputpassword: {
		marginBottom: 30,
		backgroundColor: '#fff'
	},

	//Login.js 
	inputLogin : {
		fontSize: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 20 : 18 : (Dimensions.get('window').width >= 414) ? 22 : 18
	},
	createaccountForgotPassword:{
		color: '#232159',
		marginTop: '-2%',
		textAlign: 'right',
		fontSize: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 22 : 14 : (Dimensions.get('window').width >= 414) ? 22 : 14,
		textTransform: 'uppercase'	
	},
	contenidoLogin: {
		flexDirection: 'column',
		justifyContent: 'center',
		marginHorizontal: '2.5%',
		flex: 1,
	},
	boton: {
		backgroundColor: '#982A72',
		marginTop: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '5%' : '10%' : (Dimensions.get('window').width >= 414) ? '5%' : '10%',
		marginLeft : '15%',
		marginRight : '15%',
	},
	banner: {
		width: '100%',
    	height: undefined,
    	aspectRatio: 1,
	},
	
	homebor: {
		width: '100%',
    	height: undefined,
    	aspectRatio: 1,
	},
	viewbannerLogin : {
		marginTop : (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-14%' : '-6%' : (Dimensions.get('window').width >= 414) ? '-14%' : '-6%'
	},
	viewLogoLogin : {
		flexDirection: 'row', 
		marginLeft : '2%', 
		marginRight : '2%', 
		marginBottom : '-30%',
		marginTop : (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-50%' : '-50%' : (Dimensions.get('window').width >= 414) ? '-50%' : '-50%'
	},

	//RoomsPreview.js
	RoomPreviewBannerView : {
		flex: 1, 
		alignItems: "center", 
		justifyContent: "center" 
	},
	RoomPreviewBannerImages : {
		width: '90%',
		height:'100%'
	},

	//RoomsReserves.js  
	titleRoomsReserves : {
		fontWeight: 'bold',
		fontSize : (Platform.OS === 'ios') ? (Platform.isPad === true) ? 22 : 14 : (Dimensions.get('window').width >= 414) ? 22 : 14 
	},
	subtitleRoomsReserves : {
		fontWeight: 'bold',
		fontSize : (Platform.OS === 'ios') ? (Platform.isPad === true) ? 22 : 14 : (Dimensions.get('window').width >= 414) ? 22 : 14 
	},
	textRoomsReserves : {
		fontSize : (Platform.OS === 'ios') ? (Platform.isPad === true) ? 22 : 14 : (Dimensions.get('window').width >= 414) ? 22 : 14 
	},
	CardRoomsReserves : {
		borderRadius: 6,
        elevation: 3,
        backgroundColor: '#D9D9D9',
        shadowOffset: { width:1, height:1 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: 4,
        marginVertical: 6
	},
	containerRoomsReserves : {
		backgroundColor: '#ffffff',
	},
	

});

export default globalStyles;