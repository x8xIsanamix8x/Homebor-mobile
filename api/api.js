const END_POINT = 'http://homebor.com/app/' ;
  
import { Alert} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
 
 
class API { 

    //User exits on database
    async userExits(email){
        const query = await fetch(`${END_POINT}validationusersapp.php?email=${email}`) 
        const data = await query.json() 
        return data 
    }


    //Status validation of users
    async valLog(email, password){ 
        const query = await fetch(`${END_POINT}checkLoginApp.php?email=${email}&password=${password}`) 
        const data = await query.json() 
        return data 
    } 

    //Login request to database
    async Login(email, password){ 
        const query = await fetch(`${END_POINT}loginApp.php?email=${email}&password=${password}`) 
        const data = await query.json() 
        return data 
    }
    
    //User reactivatation request to database
    async reactiveUserAccount(email){ 
        const query = await fetch(`${END_POINT}reactiveuserApp.php?email=${email}`) 
        const data = await query.json() 
        return data 
    } 

    //This api gets the information for events.
    async getAgenda2(email){  
        const query = await fetch(`${END_POINT}agenda2.php?email=${email}`) 
        const data = await query.json() 
        return data 
    } 
    
    //This api gets the information for the dots in calendar.
    async getAgenda(email){  
        const query = await fetch(`${END_POINT}agenda.php?email=${email}`) 
        const data = await query.json() 
        return data 
    } 

    //This api brings only active events
    async getAgendaAvalible(email){  
        const query = await fetch(`${END_POINT}agendaAvalibleapp.php?email=${email}`) 
        const data = await query.json() 
        return data 
    } 
    
    //This api brings information about the home, photos, family members and academy of preference
    async getProfile(email){ 
        const query = await fetch(`${END_POINT}profileapp.php?email=${email}`) 
        const data = await query.json() 
        return data   
    }

    //This api brings information about the rooms, photos and reservations
    async getRoominfo(email){ 
        const query = await fetch(`${END_POINT}roomapp.php?email=${email}`) 
        const data = await query.json() 
        return data   
    }

    //This api brings information about notifications for the users
    async getNotifications(email){
        const query = await fetch(`${END_POINT}notiapp.php?email=${email}`) 
        const data = await query.json() 
        return data  
    }

    //This api brings information about the house
    async getBasicdata(email){ 
        const query = await fetch(`${END_POINT}basicdatapp.php?email=${email}`) 
        const data = await query.json() 
        return data   
    }
 
    //This api brings additional information of the house
    async getAdditionaldata(email){ 
        const query = await fetch(`${END_POINT}additionaldatapp.php?email=${email}`) 
        const data = await query.json() 
        return data   
    }

    //This api brings the states for the conditionals in additional information like special diet or health information
    async getAdditionalstate(email){ 
        const query = await fetch(`${END_POINT}additionalstateapp.php?email=${email}`) 
        const data = await query.json() 
        return data   
    }

    //This api brings information for the drawer menu in the app
    async getDrawerdata(email){ 
        const query = await fetch(`${END_POINT}drawerapp.php?email=${email}`) 
        const data = await query.json() 
        return data   
    }

    //This api brings information for the family members
    async getFamilyinfo(email){ 
        const query = await fetch(`${END_POINT}familydatapp.php?email=${email}`) 
        const data = await query.json() 
        return data   
    }

    //This api makes the basic register of user data
    async registerbasicinfo(id,email,hname,num,h_type,m_city,dir,cities,states,p_code,smoke2,y_service,m_service,itemVegetarian,itemHalal,itemKosher,itemLactose,itemGluten,itemPork,itemNone,pet,pet_num,itemDog,itemCat,itemOther,type_pet,idm){ 
         
        fetch(`${END_POINT}basicEditapp.php?id=${id}&email=${email}&hname=${hname}&num=${num}&h_type=${h_type}&m_city=${m_city}&dir=${dir}&cities=${cities}&states=${states}&p_code=${p_code}&smoke2=${smoke2}&y_service=${y_service}&m_service=${m_service}&itemVegetarian=${itemVegetarian}&itemHalal=${itemHalal}&itemKosher=${itemKosher}&itemLactose=${itemLactose}&itemGluten=${itemGluten}&itemPork=${itemPork}&itemNone=${itemNone}&pet=${pet}&pet_num=${pet_num}&itemDog=${itemDog}&itemCat=${itemCat}&itemOther=${itemOther}&type_pet=${type_pet}&idm=${idm}`).then(res => res.json()) 
            .catch(error => console.log('Error:', error)) 
            .then(response => { 
                if(response.status == 1){ 
                    Alert.alert("Basic Information Update")
                }else{ 
                    Alert.alert("Error"); }
        }); 
    } 

    //This api makes the register of required data 
    async registerRequiredfields(id,email,hname,num,room,m_city,pet,pet_num,itemDog,itemCat,itemOther,type_pet,ag_pre,g_pre,idm){ 
         
        fetch(`${END_POINT}requiredfieldsapp.php?id=${id}&email=${email}&hname=${hname}&num=${num}&room=${room}&m_city=${m_city}&pet=${pet}&pet_num=${pet_num}&itemDog=${itemDog}&itemCat=${itemCat}&itemOther=${itemOther}&type_pet=${type_pet}&ag_pre=${ag_pre}&g_pre=${g_pre}&idm=${idm}`).then(res => res.json()) 
            .catch(error => console.log('Error:', error)) 
            .then(response => { 
                if(response.status == 1){ 
                    Alert.alert("Basic Information Update")
                }else{ 
                    Alert.alert("Error"); }
        }); 
    }

    //Register the information of the house
    async houseInformation(id,email,dir,cities,states,p_code,h_type,y_service,m_service,num_mem,backl,itemVegetarian,itemHalal,itemKosher,itemLactose,itemGluten,itemPork,itemNone,idm){ 
         
        fetch(`${END_POINT}houseinformationapp.php?id=${id}&email=${email}&dir=${dir}&cities=${cities}&states=${states}&p_code=${p_code}&h_type=${h_type}&y_service=${y_service}&m_service=${m_service}&num_mem=${num_mem}&backl=${backl}&itemVegetarian=${itemVegetarian}&itemHalal=${itemHalal}&itemKosher=${itemKosher}&itemLactose=${itemLactose}&itemGluten=${itemGluten}&itemPork=${itemPork}&itemNone=${itemNone}&idm=${idm}`).then(res => res.json()) 
            .catch(error => console.log('Error:', error)) 
            .then(response => { 
                if(response.status == 1){ 
                    Alert.alert("House Information Update")
                }else{ 
                    Alert.alert("Error"); }
        }); 
    }

    //Register the additional information of the user
    async additionalinfoRegister(id,email,des,a_pre,backg,religion2,religion,misdemeanor2,misdemeanor,c_background,smoke2,allergies2,allergies,medic_f2,medic_f,condition_m2,condition_m,health_f2,health_f,idm){ 
         
        fetch(`${END_POINT}additionaloptionalregisterapp.php?id=${id}&email=${email}&des=${des}&a_pre=${a_pre}&backg=${backg}&religion2=${religion2}&religion=${religion}&misdemeanor2=${misdemeanor2}&misdemeanor=${misdemeanor}&c_background=${c_background}&smoke2=${smoke2}&allergies2=${allergies2}&allergies=${allergies}&medic_f2=${medic_f2}&medic_f=${medic_f}&condition_m2=${condition_m2}&condition_m=${condition_m}&health_f2=${health_f2}&health_f=${health_f}&idm=${idm}`).then(res => res.json()) 
            .catch(error => console.log('Error:', error)) 
            .then(response => { 
                if(response.status == 1){ 
                    Alert.alert("Additional Information Submitted")
                }else{ 
                    Alert.alert("Error"); }
        }); 
    } 

    //This api registers the information from edit additional information
    async registeradditionalinfo(id, email,des, a_pre, g_pre, ag_pre, allergies2, allergies, medic_f2, medic_f, health_f2, health_f, num_mem, backg, backl, religion2, religion, condition_m2, condition_m, misdemeanor2, misdemeanor, c_background, idm){ 
         
        fetch(`${END_POINT}additionalEditapp.php?id=${id}&email=${email}&des=${des}&a_pre=${a_pre}&g_pre=${g_pre}&ag_pre=${ag_pre}&allergies2=${allergies2}&allergies=${allergies}&medic_f2=${medic_f2}&medic_f=${medic_f}&health_f2=${health_f2}&health_f=${health_f}&num_mem=${num_mem}&backg=${backg}&backl=${backl}&religion2=${religion2}&religion=${religion}&condition_m2=${condition_m2}&condition_m=${condition_m}&misdemeanor2=${misdemeanor2}&misdemeanor=${misdemeanor}&c_background=${c_background}&idm=${idm}`).then(res => res.json()) 
            .catch(error => console.log('Error:', error)) 
            .then(response => { 
                if(response.status == 1){ 
                    Alert.alert("Additional Information Update")
                }else{ 
                    Alert.alert("Error"); }
        }); 
    } 

    //This api registers the family information and also is able to edit it
    async registerFamilyinfo(id, email,idm, nameh, lnameh, db, gender, cell, occupation_m2, dblaw, f_name1, f_lname1, db1, gender1, re1, db_lawf1, f_name2, f_lname2, db2, gender2, re2, db_lawf2, f_name3, f_lname3, db3, gender3, re3, db_lawf3, f_name4, f_lname4, db4, gender4, re4, db_lawf4, f_name5, f_lname5, db5, gender5, re5, db_lawf5, f_name6, f_lname6, db6, gender6, re6, db_lawf6, f_name7, f_lname7, db7, gender7, re7, db_lawf7, f_name8, f_lname8, db8, gender8, re8, db_lawf8, occupation_f1, occupation_f2, occupation_f3, occupation_f4, occupation_f5, occupation_f6, occupation_f7, occupation_f8, hname){ 
         
        fetch(`${END_POINT}familyeditandregisterapp.php?id=${id}&email=${email}&idm=${idm}&name_h=${nameh}&l_name_h=${lnameh}&db=${db}&gender=${gender}&cell=${cell}&occupation_m2=${occupation_m2}&db_law=${dblaw}&f_name1=${f_name1}&f_lname1=${f_lname1}&db1=${db1}&gender1=${gender1}&re1=${re1}&db_lawf1=${db_lawf1}&f_name2=${f_name2}&f_lname2=${f_lname2}&db2=${db2}&gender2=${gender2}&re2=${re2}&db_lawf2=${db_lawf2}&f_name2=${f_name2}&f_lname2=${f_lname2}&db2=${db2}&gender2=${gender2}&re2=${re2}&db_lawf2=${db_lawf2}&f_name3=${f_name3}&f_lname3=${f_lname3}&db3=${db3}&gender3=${gender3}&re3=${re3}&db_lawf3=${db_lawf3}&f_name4=${f_name4}&f_lname4=${f_lname4}&db4=${db4}&gender4=${gender4}&re4=${re4}&db_lawf4=${db_lawf4}&f_name5=${f_name5}&f_lname5=${f_lname5}&db5=${db5}&gender5=${gender5}&re5=${re5}&db_lawf5=${db_lawf5}&f_name6=${f_name6}&f_lname6=${f_lname6}&db6=${db6}&gender6=${gender6}&re6=${re6}&db_lawf6=${db_lawf6}&f_name7=${f_name7}&f_lname7=${f_lname7}&db7=${db7}&gender7=${gender7}&re7=${re7}&db_lawf7=${db_lawf7}&f_name8=${f_name8}&f_lname8=${f_lname8}&db8=${db8}&gender8=${gender8}&re8=${re8}&db_lawf8=${db_lawf8}&occupation_f1=${occupation_f1}&occupation_f2=${occupation_f2}&occupation_f3=${occupation_f3}&occupation_f4=${occupation_f4}&occupation_f5=${occupation_f5}&occupation_f6=${occupation_f6}&occupation_f7=${occupation_f7}&occupation_f8=${occupation_f8}&hname=${hname}`).then(res => res.json()) 
            .catch(error => console.log('Error:', error)) 
            .then(response => { 
                if(response.status == 1){ 
                    Alert.alert("Family Information Update")
                }else{ 
                    Alert.alert("Error"); }
        }); 
    } 
    
    //This api is able to Disable the account of the users
    async disableUser(id,mail_h,id_m,reason){ 
         
        fetch(`${END_POINT}disableApp.php?id=${id}&mail_h=${mail_h}&id_m=${id_m}&reason=${reason}`).then(res => res.json()) 
            .catch(error => console.log('Error:', error)) 
            .then(response => { 
                if(response.status == 1){ 
                    
                }else{ 
                    Alert.alert("Error"); }
        }); 
    }

    //This api is able to edit the information of the rooms of user
    async editRoominfo(id,email,idm,type1,bed1,date1,bed1_2,date1_2,bed1_3,date1_3,food1,aprox1,type2,bed2,date2,bed2_2,date2_2,bed2_3,date2_3,food2,aprox2,type3,bed3,date3,bed3_2,date3_2,bed3_3,date3_3,food3,aprox3,type4,bed4,date4,bed4_2,date4_2,bed4_3,date4_3,food4,aprox4,type5,bed5,date5,bed5_2,date5_2,bed5_3,date5_3,food5,aprox5,type6,bed6,date6,bed6_2,date6_2,bed6_3,date6_3,food6,aprox6,type7,bed7,date7,bed7_2,date7_2,bed7_3,date7_3,food7,aprox7,type8,bed8,date8,bed8_2,date8_2,bed8_3,date8_3,food8,aprox8,photo0){ 
         
        fetch(`${END_POINT}editRoomapp.php?id=${id}&email=${email}&idm=${idm}&type1=${type1}&bed1=${bed1}&date1=${date1}&bed1_2=${bed1_2}&date1_2=${date1_2}&bed1_3=${bed1_3}&date1_3=${date1_3}&food1=${food1}&aprox1=${aprox1}&type2=${type2}&bed2=${bed2}&date2=${date2}&bed2_2=${bed2_2}&date2_2=${date2_2}&bed2_3=${bed2_3}&date2_3=${date2_3}&food2=${food2}&aprox2=${aprox2}&type3=${type3}&bed3=${bed3}&date3=${date3}&bed3_2=${bed3_2}&date3_2=${date3_2}&bed3_3=${bed3_3}&date3_3=${date3_3}&food3=${food3}&aprox3=${aprox3}&type4=${type4}&bed4=${bed4}&date4=${date4}&bed4_2=${bed4_2}&date4_2=${date4_2}&bed4_3=${bed4_3}&date4_3=${date4_3}&food4=${food4}&aprox4=${aprox4}&type5=${type5}&bed5=${bed5}&date5=${date5}&bed5_2=${bed5_2}&date5_2=${date5_2}&bed5_3=${bed5_3}&date5_3=${date5_3}&food5=${food5}&aprox5=${aprox5}&type6=${type6}&bed6=${bed6}&date6=${date6}&bed6_2=${bed6_2}&date6_2=${date6_2}&bed6_3=${bed6_3}&date6_3=${date6_3}&food6=${food6}&aprox6=${aprox6}&type7=${type7}&bed7=${bed7}&date7=${date7}&bed7_2=${bed7_2}&date7_2=${date7_2}&bed7_3=${bed7_3}&date7_3=${date7_3}&food7=${food7}&aprox7=${aprox7}&type8=${type8}&bed8=${bed8}&date8=${date8}&bed8_2=${bed8_2}&date8_2=${date8_2}&bed8_3=${bed8_3}&date8_3=${date8_3}&food8=${food8}&aprox8=${aprox8}&photo0=${photo0}`).then(res => res.json()) 
            .catch(error => console.log('Error:', error)) 
            .then(response => { 
                if(response.status == 1){ 
                    Alert.alert("Rooms Information Update")
                }else{ 
                    Alert.alert("Error"); }
        }); 
    } 

    //This api registers the information from user's rooms
    async registerRoominformation(id,email,idm,type1,food1,bed1,bed1_2,bed1_3,aprox1,type2,food2,bed2,bed2_2,bed2_3,aprox2,type3,food3,bed3,bed3_2,bed3_3,aprox3,type4,food4,bed4,bed4_2,bed4_3,aprox4,type5,food5,bed5,bed5_2,bed5_3,aprox5,type6,food6,bed6,bed6_2,bed6_3,aprox6,type7,food7,bed7,bed7_2,bed7_3,aprox7,type8,food8,bed8,bed8_2,bed8_3,aprox8,photo0){ 
         
        fetch(`${END_POINT}registeRoomapp.php?id=${id}&email=${email}&idm=${idm}&type1=${type1}&food1=${food1}&bed1=${bed1}&bed1_2=${bed1_2}&bed1_3=${bed1_3}&aprox1=${aprox1}&type2=${type2}&food2=${food2}&bed2=${bed2}&bed2_2=${bed2_2}&bed2_3=${bed2_3}&aprox2=${aprox2}&type3=${type3}&food3=${food3}&bed3=${bed3}&bed3_2=${bed3_2}&bed3_3=${bed3_3}&aprox3=${aprox3}&type4=${type4}&food4=${food4}&bed4=${bed4}&bed4_2=${bed4_2}&bed4_3=${bed4_3}&aprox4=${aprox4}&type5=${type5}&food5=${food5}&bed5=${bed5}&bed5_2=${bed5_2}&bed5_3=${bed5_3}&aprox5=${aprox5}&type6=${type6}&food6=${food6}&bed6=${bed6}&bed6_2=${bed6_2}&bed6_3=${bed6_3}&aprox6=${aprox6}&type7=${type7}&food7=${food7}&bed7=${bed7}&bed7_2=${bed7_2}&bed7_3=${bed7_3}&aprox7=${aprox7}&type8=${type8}&food8=${food8}&bed8=${bed8}&bed8_2=${bed8_2}&bed8_3=${bed8_3}&aprox8=${aprox8}&photo0=${photo0}`).then(res => res.json()) 
            .catch(error => console.log('Error:', error)) 
            .then(response => { 
                if(response.status == 1){ 
                    Alert.alert("Rooms Information Update")
                }else{ 
                    Alert.alert("Error"); }
        }); 
    } 

    //This api brings the information of students by their id when they only send de reservation request
    async getStudentnot(idnoti){ 
        const query = await fetch(`${END_POINT}profilestudentnotapp.php?idnoti=${idnoti}`) 
        const data = await query.json() 
        return data   
    }

    //This api brings the information of students by their id when they already are reservated on the house
    async getStudentapprove(idnoti, email){ 
        const query = await fetch(`${END_POINT}profilestudentapp.php?mail=${idnoti}&email=${email}`) 
        const data = await query.json() 
        return data   
    }

    //This api brings the photos of the gallery
    async getGalleryPhotos(email){ 
        const query = await fetch(`${END_POINT}galleryapp.php?email=${email}`) 
        const data = await query.json() 
        return data   
    }

    //This api is able to reject the student's reservation request
    async rejectStudent(email,mail, idnoti, h_name, name_h, l_name_h){  
         
        fetch(`${END_POINT}rejectstudentapp.php?email=${email}&mail=${mail}&idnoti=${idnoti}&h_name=${h_name}&name_h=${name_h}&l_name_h=${l_name_h}`).then(res => res.json()) 
            .catch(error => console.log('Error:', error)) 
            .then(response => { 
                if(response.status == 1){ 
                    Alert.alert("Student Rejected")
                }else{ 
                    Alert.alert("Error"); }
        }); 
    }

    //This api is able to confirm the student's reservation request
    async confirmStudent(email,mail, idnoti, h_name, name_h, l_name_h, start, name_s, l_name_s, bedrooms, end, idm, agency, des){  
         
        fetch(`${END_POINT}confirmstudentapp.php?email=${email}&mail=${mail}&idnoti=${idnoti}&h_name=${h_name}&name_h=${name_h}&l_name_h=${l_name_h}&start=${start}&name_s=${name_s}&l_name_s=${l_name_s}&bedrooms=${bedrooms}&end=${end}&idm=${idm}&agency=${agency}&des=${des}`).then(res => res.json()) 
            .catch(error => console.log('Error:', error)) 
            .then(response => { 
                if(response.status == 1){ 
                    Alert.alert("Student Confirmed")
                }else{ 
                    Alert.alert("Error"); }
        }); 
    }

    //This api creates the information for reports
    async reportStudent(name_h, l_name_h, email, managermail, agency, mail, des, idnoti, report, bedrooms){  
         
        fetch(`${END_POINT}reportstudentapp.php?name_h=${name_h}&l_name_h=${l_name_h}&email=${email}&managermail=${managermail}&agency=${agency}&mail=${mail}&des=${des}&idnoti=${idnoti}&report=${report}&bedrooms=${bedrooms}`).then(res => res.json()) 
            .catch(error => console.log('Error:', error)) 
            .then(response => { 
                if(response.status == 1){ 
                    console.log('Succesfully')
                }else{ 
                    Alert.alert("Error"); }
        }); 
    }
    
    //This api checks if student already has a report active in the house
    async getReportStudentstatus(mail){ 
        const query = await fetch(`${END_POINT}reportstudentstatusapp.php?mail=${mail}`) 
        const data = await query.json() 
        return data   
    }

    //This api marks all notifications as view 
    async markviewNotification(idnoti){  
         
        fetch(`${END_POINT}viewnotificationapp.php?idnoti=${idnoti}`).then(res => res.json()) 
            .catch(error => console.log('Error:', error)) 
            .then(response => { 
                if(response.status == 1){ 
                    console.log('Market')
                }else{ 
                    Alert.alert("Error Marked Notification"); }
        }); 
    }

    //This api brings all the reports that the house have done
    async getReportslist(email){
        const query = await fetch(`${END_POINT}reportslistapp.php?email=${email}`) 
        const data = await query.json() 
        return data  
    }

    async getAllReports(email){
        const query = await fetch(`${END_POINT}allreportsapp.php?email=${email}`) 
        const data = await query.json() 
        return data  
    }

    //This api brings all students that the house can report
    async getStudentoreport(email){
        const query = await fetch(`${END_POINT}reportsliststudentapp.php?email=${email}`) 
        const data = await query.json() 
        return data  
    }

    //This api brings the chat for the report
    async getReportsfeedback(email, idnoti){ 
        const query = await fetch(`${END_POINT}reportfeedbackapp.php?email=${email}&idnoti=${idnoti}`) 
        const data = await query.json() 
        return data  
    }

    //This api is able to answer the reports
    async replyReports(des,email,idnoti , name_h, l_name_h, a_name, a_mail, stu_rep, status, imagereport){  
         
        fetch(`${END_POINT}replyreportapp.php?des=${des}&email=${email}&idnoti=${idnoti}&name_h=${name_h}&l_name_h=${l_name_h}&a_name=${a_name}&a_mail=${a_mail}&stu_rep=${stu_rep}&status=${status}&imagereport=${imagereport}`).then(res => res.json()) 
            .catch(error => console.log('Error:', error)) 
            .then(response => { 
                if(response.status == 1){ 
                    
                }else{ 
                    Alert.alert("Error"); }
        }); 
    }

    //This api brings the chat for the report   
    async getInfoReply(email, idnoti){  
        const query = await fetch(`${END_POINT}replyreportinfoapp.php?email=${email}&idnoti=${idnoti}`) 
        const data = await query.json() 
        return data   
    }

    //This api brings information about how many notifications the users haven't seen yet
    async getnumNotifications(email){
        const query = await fetch(`${END_POINT}notificationsnumapp.php?email=${email}`) 
        const data = await query.json() 
        return data   
    }

    //This api deletes the notifications from user view
    async DeleteNoti(email){  
         
        fetch(`${END_POINT}deletenotiapp.php?email=${email}`).then(res => res.json()) 
            .catch(error => console.log('Error:', error)) 
            .then(response => { 
                if(response.status == 1){ 
                    
                }else{ 
                    Alert.alert("Error"); }
        }); 
    }

    //This api brings the information for room events
    async getRoomevents(email, newE){ 
        const query = await fetch(`${END_POINT}geteventinfoapp.php?email=${email}&newE=${newE}`) 
        const data = await query.json() 
        return data   
    }

    //This api brings the information for room events
    async getRoomevents2(email, newE, idnoti){ 
        const query = await fetch(`${END_POINT}geteventinfoapp.php?email=${email}&newE=${newE}&idnoti=${idnoti}`) 
        const data = await query.json() 
        return data   
    }

    //This api creates new events 
    async addNewevent(title, roome, db1, db2, email, idm, newE){ 
         
        fetch(`${END_POINT}addeventapp.php?title=${title}&roome=${roome}&db1=${db1}&db2=${db2}&email=${email}&idm=${idm}&newE=${newE}`).then(res => res.json()) 
            .catch(error => console.log('Error:', error)) 
            .then(response => { 
                if(response.status == 1){ 
                    Alert.alert("Event added to calendar")
                }else{ 
                    Alert.alert("Error"); }
        }); 
    } 

    //This api edits events 
    async addNeweventEdit(title, roome, db1, db2, email, idm, newE, idnoti, update){ 
         
        fetch(`${END_POINT}addeventapp.php?title=${title}&roome=${roome}&db1=${db1}&db2=${db2}&email=${email}&idm=${idm}&newE=${newE}&idnoti=${idnoti}&update=${update}`).then(res => res.json()) 
            .catch(error => console.log('Error:', error)) 
            .then(response => { 
                if(response.status == 1){ 
                    Alert.alert("Event Edited on calendar");
                }else{ 
                    Alert.alert("Error"); }
        }); 
    } 

    //This api deletes events 
    async addNeweventDelete(idnoti){ 
         
        fetch(`${END_POINT}addeventapp.php?idnoti=${idnoti}`).then(res => res.json()) 
            .catch(error => console.log('Error:', error)) 
            .then(response => { 
                if(response.status == 1){ 
                    Alert.alert("Event deleted on calendar")
                }else{ 
                    Alert.alert("Error"); }
        }); 
    } 

    //This api brings the information of payments
    async getPaymentslist(email){
        const query = await fetch(`${END_POINT}paymentsapp.php?email=${email}`) 
        const data = await query.json() 
        return data  
    }

    //This api filters the information of payments 
    async getPaymentsFilterlist(email, db1, db2){
        const query = await fetch(`${END_POINT}paymentsfilterapp.php?email=${email}&db1=${db1}&db2=${db2}`) 
        const data = await query.json() 
        return data  
    }

    async getVoucherlist(email, filterP){
        const query = await fetch(`${END_POINT}voucheapp.php?email=${email}&filterP=${filterP}`) 
        const data = await query.json() 
        return data  
    }

    //THIS GROUPS OF API WILL DISABLE THE ROOMS
    async disableRoom1(id,email,idm,date1,date1_2,date1_3,disableroom1){ 
        const query = await fetch(`${END_POINT}RoomActiveandDisable.php?id=${id}&email=${email}&idm=${idm}&date1=${date1}&date1_2=${date1_2}&date1_3=${date1_3}&disableroom1=${disableroom1}`) 
        const data = await query.json() 
        return data 
    }
    
    async disableRoom2(id,email,idm,date2,date2_2,date2_3,disableroom2){ 
        const query = await fetch(`${END_POINT}RoomActiveandDisable.php?id=${id}&email=${email}&idm=${idm}&date2=${date2}&date2_2=${date2_2}&date2_3=${date2_3}&disableroom2=${disableroom2}`) 
        const data = await query.json() 
        return data 
    }
    
    async disableRoom3(id,email,idm,date3,date3_2,date3_3,disableroom3){ 
        const query = await fetch(`${END_POINT}RoomActiveandDisable.php?id=${id}&email=${email}&idm=${idm}&date3=${date3}&date3_2=${date3_2}&date3_3=${date3_3}&disableroom3=${disableroom3}`) 
        const data = await query.json() 
        return data 
    }
    
    async disableRoom4(id,email,idm,date4,date4_2,date4_3,disableroom4){ 
        const query = await fetch(`${END_POINT}RoomActiveandDisable.php?id=${id}&email=${email}&idm=${idm}&date4=${date4}&date4_2=${date4_2}&date4_3=${date4_3}&disableroom4=${disableroom4}`) 
        const data = await query.json() 
        return data 
    }
    
    async disableRoom5(id,email,idm,date5,date5_2,date5_3,disableroom5){ 
        const query = await fetch(`${END_POINT}RoomActiveandDisable.php?id=${id}&email=${email}&idm=${idm}&date5=${date5}&date5_2=${date5_2}&date5_3=${date5_3}&disableroom5=${disableroom5}`) 
        const data = await query.json() 
        return data 
    } 
    
    async disableRoom6(id,email,idm,date6,date6_2,date6_3,disableroom6){ 
        const query = await fetch(`${END_POINT}RoomActiveandDisable.php?id=${id}&email=${email}&idm=${idm}&date6=${date6}&date6_2=${date6_2}&date6_3=${date6_3}&disableroom6=${disableroom6}`) 
        const data = await query.json() 
        return data 
    }  

    async disableRoom7(id,email,idm,date7,date7_2,date7_3,disableroom7){ 
        const query = await fetch(`${END_POINT}RoomActiveandDisable.php?id=${id}&email=${email}&idm=${idm}&date7=${date7}&date7_2=${date7_2}&date7_3=${date7_3}&disableroom7=${disableroom7}`) 
        const data = await query.json() 
        return data 
    }  

    async disableRoom8(id,email,idm,date8,date8_2,date8_3,disableroom8){ 
        const query = await fetch(`${END_POINT}RoomActiveandDisable.php?id=${id}&email=${email}&idm=${idm}&date8=${date8}&date8_2=${date8_2}&date8_3=${date8_3}&disableroom8=${disableroom8}`) 
        const data = await query.json() 
        return data 
    }
    
    //THIS GROUPS OF API WILL ACTIVE THE ROOMS
    async activeRoom1(id,email,idm,date1,date1_2,date1_3,activeroom1){ 
        const query = await fetch(`${END_POINT}RoomActiveandDisable.php?id=${id}&email=${email}&idm=${idm}&date1=${date1}&date1_2=${date1_2}&date1_3=${date1_3}&activeroom1=${activeroom1}`) 
        const data = await query.json() 
        return data 
    }
    
    async activeRoom2(id,email,idm,date2,date2_2,date2_3,activeroom2){ 
        const query = await fetch(`${END_POINT}RoomActiveandDisable.php?id=${id}&email=${email}&idm=${idm}&date2=${date2}&date2_2=${date2_2}&date2_3=${date2_3}&activeroom2=${activeroom2}`) 
        const data = await query.json() 
        return data 
    }
    
    async activeRoom3(id,email,idm,date3,date3_2,date3_3,activeroom3){ 
        const query = await fetch(`${END_POINT}RoomActiveandDisable.php?id=${id}&email=${email}&idm=${idm}&date3=${date3}&date3_2=${date3_2}&date3_3=${date3_3}&activeroom3=${activeroom3}`) 
        const data = await query.json() 
        return data 
    }
    
    async activeRoom4(id,email,idm,date4,date4_2,date4_3,activeroom4){ 
        const query = await fetch(`${END_POINT}RoomActiveandDisable.php?id=${id}&email=${email}&idm=${idm}&date4=${date4}&date4_2=${date4_2}&date4_3=${date4_3}&activeroom4=${activeroom4}`) 
        const data = await query.json() 
        return data 
    }
    
    async activeRoom5(id,email,idm,date5,date5_2,date5_3,activeroom5){ 
        const query = await fetch(`${END_POINT}RoomActiveandDisable.php?id=${id}&email=${email}&idm=${idm}&date5=${date5}&date5_2=${date5_2}&date5_3=${date5_3}&activeroom5=${activeroom5}`) 
        const data = await query.json() 
        return data 
    } 
    
    async activeRoom6(id,email,idm,date6,date6_2,date6_3,activeroom6){ 
        const query = await fetch(`${END_POINT}RoomActiveandDisable.php?id=${id}&email=${email}&idm=${idm}&date6=${date6}&date6_2=${date6_2}&date6_3=${date6_3}&activeroom6=${activeroom6}`) 
        const data = await query.json() 
        return data 
    }  

    async activeRoom7(id,email,idm,date7,date7_2,date7_3,activeroom7){ 
        const query = await fetch(`${END_POINT}RoomActiveandDisable.php?id=${id}&email=${email}&idm=${idm}&date7=${date7}&date7_2=${date7_2}&date7_3=${date7_3}&activeroom7=${activeroom7}`) 
        const data = await query.json() 
        return data 
    }  

    async activeRoom8(id,email,idm,date8,date8_2,date8_3,activeroom8){ 
        const query = await fetch(`${END_POINT}RoomActiveandDisable.php?id=${id}&email=${email}&idm=${idm}&date8=${date8}&date8_2=${date8_2}&date8_3=${date8_3}&activeroom8=${activeroom8}`) 
        const data = await query.json() 
        return data 
    }

    //CACHE FUNCTIONS
    //This api is able to edit the information of the rooms of user FROM CACHE
    async editRoominfoSendCache(id,email,idm,type1,bed1,date1,bed1_2,date1_2,bed1_3,date1_3,food1,aprox1,type2,bed2,date2,bed2_2,date2_2,bed2_3,date2_3,food2,aprox2,type3,bed3,date3,bed3_2,date3_2,bed3_3,date3_3,food3,aprox3,type4,bed4,date4,bed4_2,date4_2,bed4_3,date4_3,food4,aprox4,type5,bed5,date5,bed5_2,date5_2,bed5_3,date5_3,food5,aprox5,type6,bed6,date6,bed6_2,date6_2,bed6_3,date6_3,food6,aprox6,type7,bed7,date7,bed7_2,date7_2,bed7_3,date7_3,food7,aprox7,type8,bed8,date8,bed8_2,date8_2,bed8_3,date8_3,food8,aprox8,photo0){ 
         
        fetch(`${END_POINT}editRoomapp.php?id=${id}&email=${email}&idm=${idm}&type1=${type1}&bed1=${bed1}&date1=${date1}&bed1_2=${bed1_2}&date1_2=${date1_2}&bed1_3=${bed1_3}&date1_3=${date1_3}&food1=${food1}&aprox1=${aprox1}&type2=${type2}&bed2=${bed2}&date2=${date2}&bed2_2=${bed2_2}&date2_2=${date2_2}&bed2_3=${bed2_3}&date2_3=${date2_3}&food2=${food2}&aprox2=${aprox2}&type3=${type3}&bed3=${bed3}&date3=${date3}&bed3_2=${bed3_2}&date3_2=${date3_2}&bed3_3=${bed3_3}&date3_3=${date3_3}&food3=${food3}&aprox3=${aprox3}&type4=${type4}&bed4=${bed4}&date4=${date4}&bed4_2=${bed4_2}&date4_2=${date4_2}&bed4_3=${bed4_3}&date4_3=${date4_3}&food4=${food4}&aprox4=${aprox4}&type5=${type5}&bed5=${bed5}&date5=${date5}&bed5_2=${bed5_2}&date5_2=${date5_2}&bed5_3=${bed5_3}&date5_3=${date5_3}&food5=${food5}&aprox5=${aprox5}&type6=${type6}&bed6=${bed6}&date6=${date6}&bed6_2=${bed6_2}&date6_2=${date6_2}&bed6_3=${bed6_3}&date6_3=${date6_3}&food6=${food6}&aprox6=${aprox6}&type7=${type7}&bed7=${bed7}&date7=${date7}&bed7_2=${bed7_2}&date7_2=${date7_2}&bed7_3=${bed7_3}&date7_3=${date7_3}&food7=${food7}&aprox7=${aprox7}&type8=${type8}&bed8=${bed8}&date8=${date8}&bed8_2=${bed8_2}&date8_2=${date8_2}&bed8_3=${bed8_3}&date8_3=${date8_3}&food8=${food8}&aprox8=${aprox8}&photo0=${photo0}`).then(res => res.json()) 
            .catch(error => console.log('Error:', error)) 
            .then(async(response) => { 
                if(response.status == 1){ 
                    await AsyncStorage.removeItem('roomSendCache')
                }
        }); 
    }
    
    //THIS GROUPS OF API WILL DISABLE THE ROOMS
    async disableRoom1SendCache(id,email,idm,date1,date1_2,date1_3,disableroom1){ 
        fetch(`${END_POINT}RoomActiveandDisable.php?id=${id}&email=${email}&idm=${idm}&date1=${date1}&date1_2=${date1_2}&date1_3=${date1_3}&disableroom1=${disableroom1}`).then(res => res.json()) 
            .catch(error => console.log('Error:', error)) 
            .then(async(response) => { 
                if(response.status == 1){ 
                    await AsyncStorage.removeItem('disableRoom1Cache')
                }
        }); 
    }

    async disableRoom2SendCache(id,email,idm,date2,date2_2,date2_3,disableroom2){ 
        fetch(`${END_POINT}RoomActiveandDisable.php?id=${id}&email=${email}&idm=${idm}&date2=${date2}&date2_2=${date2_2}&date2_3=${date2_3}&disableroom2=${disableroom2}`).then(res => res.json()) 
            .catch(error => console.log('Error:', error)) 
            .then(async(response) => { 
                if(response.status == 1){ 
                    await AsyncStorage.removeItem('disableRoom2Cache')
                }
        }); 
    }

    async disableRoom3SendCache(id,email,idm,date3,date3_2,date3_3,disableroom3){ 
        fetch(`${END_POINT}RoomActiveandDisable.php?id=${id}&email=${email}&idm=${idm}&date3=${date3}&date3_2=${date3_2}&date3_3=${date3_3}&disableroom3=${disableroom3}`).then(res => res.json()) 
            .catch(error => console.log('Error:', error)) 
            .then(async(response) => { 
                if(response.status == 1){ 
                    await AsyncStorage.removeItem('disableRoom3Cache')
                }
        }); 
    }

    async disableRoom4SendCache(id,email,idm,date4,date4_2,date4_3,disableroom4){ 
        fetch(`${END_POINT}RoomActiveandDisable.php?id=${id}&email=${email}&idm=${idm}&date4=${date4}&date4_2=${date4_2}&date4_3=${date4_3}&disableroom4=${disableroom4}`).then(res => res.json()) 
            .catch(error => console.log('Error:', error)) 
            .then(async(response) => { 
                if(response.status == 1){ 
                    await AsyncStorage.removeItem('disableRoom4Cache')
                }
        }); 
    }

    async disableRoom5SendCache(id,email,idm,date5,date5_2,date5_3,disableroom5){ 
        fetch(`${END_POINT}RoomActiveandDisable.php?id=${id}&email=${email}&idm=${idm}&date5=${date5}&date5_2=${date5_2}&date5_3=${date5_3}&disableroom5=${disableroom5}`).then(res => res.json()) 
            .catch(error => console.log('Error:', error)) 
            .then(async(response) => { 
                if(response.status == 1){ 
                    await AsyncStorage.removeItem('disableRoom5Cache')
                }
        }); 
    }

    async disableRoom6SendCache(id,email,idm,date6,date6_2,date6_3,disableroom6){ 
        fetch(`${END_POINT}RoomActiveandDisable.php?id=${id}&email=${email}&idm=${idm}&date6=${date6}&date6_2=${date6_2}&date6_3=${date6_3}&disableroom6=${disableroom6}`).then(res => res.json()) 
            .catch(error => console.log('Error:', error)) 
            .then(async(response) => { 
                if(response.status == 1){ 
                    await AsyncStorage.removeItem('disableRoom6Cache')
                }
        }); 
    }

    async disableRoom7SendCache(id,email,idm,date7,date7_2,date7_3,disableroom7){ 
        fetch(`${END_POINT}RoomActiveandDisable.php?id=${id}&email=${email}&idm=${idm}&date7=${date7}&date7_2=${date7_2}&date7_3=${date7_3}&disableroom7=${disableroom7}`).then(res => res.json()) 
            .catch(error => console.log('Error:', error)) 
            .then(async(response) => { 
                if(response.status == 1){ 
                    await AsyncStorage.removeItem('disableRoom7Cache')
                }
        }); 
    }

    async disableRoom8SendCache(id,email,idm,date8,date8_2,date8_3,disableroom8){ 
        fetch(`${END_POINT}RoomActiveandDisable.php?id=${id}&email=${email}&idm=${idm}&date8=${date8}&date8_2=${date8_2}&date8_3=${date8_3}&disableroom8=${disableroom8}`).then(res => res.json()) 
            .catch(error => console.log('Error:', error)) 
            .then(async(response) => { 
                if(response.status == 1){ 
                    await AsyncStorage.removeItem('disableRoom8Cache')
                }
        }); 
    }

    //THIS GROUPS OF API WILL ACTIVE THE ROOMS
    async activeRoom1SendCache(id,email,idm,date1,date1_2,date1_3,activeroom1){ 
        fetch(`${END_POINT}RoomActiveandDisable.php?id=${id}&email=${email}&idm=${idm}&date1=${date1}&date1_2=${date1_2}&date1_3=${date1_3}&activeroom1=${activeroom1}`).then(res => res.json()) 
            .catch(error => console.log('Error:', error)) 
            .then(async(response) => { 
                if(response.status == 1){
                    await AsyncStorage.removeItem('activeRoom1Cache')
                }
        }); 
    }

    async activeRoom2SendCache(id,email,idm,date2,date2_2,date2_3,activeroom2){ 
        fetch(`${END_POINT}RoomActiveandDisable.php?id=${id}&email=${email}&idm=${idm}&date2=${date2}&date2_2=${date2_2}&date2_3=${date2_3}&activeroom2=${activeroom2}`).then(res => res.json()) 
            .catch(error => console.log('Error:', error)) 
            .then(async(response) => { 
                if(response.status == 1){
                    await AsyncStorage.removeItem('activeRoom2Cache')
                }
        }); 
    }

    async activeRoom3SendCache(id,email,idm,date3,date3_2,date3_3,activeroom3){ 
        fetch(`${END_POINT}RoomActiveandDisable.php?id=${id}&email=${email}&idm=${idm}&date3=${date3}&date3_2=${date3_2}&date3_3=${date3_3}&activeroom3=${activeroom3}`).then(res => res.json()) 
            .catch(error => console.log('Error:', error)) 
            .then(async(response) => { 
                if(response.status == 1){
                    await AsyncStorage.removeItem('activeRoom3Cache')
                }
        }); 
    }

    async activeRoom4SendCache(id,email,idm,date4,date4_2,date4_3,activeroom4){ 
        fetch(`${END_POINT}RoomActiveandDisable.php?id=${id}&email=${email}&idm=${idm}&date4=${date4}&date4_2=${date4_2}&date4_3=${date4_3}&activeroom4=${activeroom4}`).then(res => res.json()) 
            .catch(error => console.log('Error:', error)) 
            .then(async(response) => { 
                if(response.status == 1){
                    await AsyncStorage.removeItem('activeRoom4Cache')
                }
        }); 
    }

    async activeRoom5SendCache(id,email,idm,date5,date5_2,date5_3,activeroom5){ 
        fetch(`${END_POINT}RoomActiveandDisable.php?id=${id}&email=${email}&idm=${idm}&date5=${date5}&date5_2=${date5_2}&date5_3=${date5_3}&activeroom5=${activeroom5}`).then(res => res.json()) 
            .catch(error => console.log('Error:', error)) 
            .then(async(response) => { 
                if(response.status == 1){
                    await AsyncStorage.removeItem('activeRoom5Cache')
                }
        }); 
    }

    async activeRoom6SendCache(id,email,idm,date6,date6_2,date6_3,activeroom6){ 
        fetch(`${END_POINT}RoomActiveandDisable.php?id=${id}&email=${email}&idm=${idm}&date6=${date6}&date6_2=${date6_2}&date6_3=${date6_3}&activeroom6=${activeroom6}`).then(res => res.json()) 
            .catch(error => console.log('Error:', error)) 
            .then(async(response) => { 
                if(response.status == 1){
                    await AsyncStorage.removeItem('activeRoom6Cache')
                }
        }); 
    }

    async activeRoom7SendCache(id,email,idm,date7,date7_2,date7_3,activeroom7){ 
        fetch(`${END_POINT}RoomActiveandDisable.php?id=${id}&email=${email}&idm=${idm}&date7=${date7}&date7_2=${date7_2}&date7_3=${date7_3}&activeroom7=${activeroom7}`).then(res => res.json()) 
            .catch(error => console.log('Error:', error)) 
            .then(async(response) => { 
                if(response.status == 1){
                    await AsyncStorage.removeItem('activeRoom7Cache')
                }
        }); 
    }

    async activeRoom8SendCache(id,email,idm,date8,date8_2,date8_3,activeroom8){ 
        fetch(`${END_POINT}RoomActiveandDisable.php?id=${id}&email=${email}&idm=${idm}&date8=${date8}&date8_2=${date8_2}&date8_3=${date8_3}&activeroom8=${activeroom8}`).then(res => res.json()) 
            .catch(error => console.log('Error:', error)) 
            .then(async(response) => { 
                if(response.status == 1){
                    await AsyncStorage.removeItem('activeRoom8Cache')
                }
        }); 
    }

    //Photos room cache
    async photoRoom1cache(idUser, email, imageroom1) {
        let localUri = imageroom1;
          //Files
          let filename = localUri.split('/').pop();
          let match = /\.(\w+)$/.exec(filename);
          let type = match ? `image/${match[1]}` : `image`;

        

          let formData = new FormData();
          formData.append('photo1', { uri: localUri, name: filename, type: type });

          //Variables
          let eMail = email;
          let id = idUser;
          let photo1 = 'Yes';

          return await fetch(`https://homebor.com/app/editRoomapp.php?email=${eMail}&id=${id}&photo1=${photo1}`, {
            method: 'POST',
            body: formData,
            header: {
                'Content-Type': 'multipart/form-data'
            },
          }).then(res => res.json())
            .catch(error => console.error('Error', error))
            .then(response => {
              if (response.status == 1) {
                AsyncStorage.removeItem('imageRoom1Cache')
              }
              else {
                Alert.alert('Error with room 1 first photo update')
              }
            });
        
    }

    async photoRoom1_2cache(idUser, email, imageroom1_2) {
        let localUri1_2 = imageroom1_2;

          //Files
          let filename1_2 = localUri1_2.split('/').pop();
          let match1_2 = /\.(\w+)$/.exec(filename1_2);
          let type1_2 = match1_2 ? `image/${match1_2[1]}` : `image`;

        

          let formData = new FormData();
          formData.append('photo1_2', { uri: localUri1_2, name: filename1_2, type : type1_2 });


          //Variables
          let eMail = email;
          let id = idUser;
          let photo1_2 = 'Yes';

          return await fetch(`https://homebor.com/app/editRoomapp.php?email=${eMail}&id=${id}&photo1_2=${photo1_2}`, {
            method: 'POST',
            body: formData,
            header: {
                'Content-Type': 'multipart/form-data'
            },
          }).then(res => res.json())
            .catch(error => console.error('Error', error))
            .then(response => {
                if (response.status == 1) {
                  AsyncStorage.removeItem('imageRoom1_2Cache')
                }
              else {
                Alert.alert('Error with room 1 second photo update')
              }
            });
        
    }

    async photoRoom1_3cache(idUser, email, imageroom1_3) {
        let localUri1_3 = imageroom1_3;
    
          //Files
          let filename1_3 = localUri1_3.split('/').pop();
          let match1_3 = /\.(\w+)$/.exec(filename1_3);
          let type1_3 = match1_3 ? `image/${match1_3[1]}` : `image`;
    
        
    
          let formData = new FormData();
          formData.append('photo1_3', { uri: localUri1_3, name: filename1_3, type : type1_3 });
    
    
          //Variables
          let eMail = email;
          let id = idUser;
          let photo1_3 = 'Yes';
    
          return await fetch(`https://homebor.com/app/editRoomapp.php?email=${eMail}&id=${id}&photo1_3=${photo1_3}`, {
            method: 'POST',
            body: formData,
            header: {
                'Content-Type': 'multipart/form-data'
            },
          }).then(res => res.json())
            .catch(error => console.error('Error', error))
            .then(response => {
                if (response.status == 1) {
                   AsyncStorage.removeItem('imageRoom1_3Cache')
                }
              else {
                Alert.alert('Error with room 1 third photo update')
              }
            });
        
    }

    async photoRoom2cache(idUser, email, imageroom2) {
        let localUri2 = imageroom2;

          //Files
          let filename2 = localUri2.split('/').pop();
          let match2 = /\.(\w+)$/.exec(filename2);
          let type2 = match2 ? `image/${match2[1]}` : `image`;

        

          let formData = new FormData();
          formData.append('photo2', { uri: localUri2, name: filename2, type : type2 });


          //Variables
          let eMail = email;
          let id = idUser;
          let photo2 = 'Yes';

          return await fetch(`https://homebor.com/app/editRoomapp.php?email=${eMail}&id=${id}&photo2=${photo2}`, {
            method: 'POST',
            body: formData,
            header: {
                'Content-Type': 'multipart/form-data'
            },
          }).then(res => res.json())
            .catch(error => console.error('Error', error))
            .then(response => {
              if (response.status == 1) {
                AsyncStorage.removeItem('imageRoom2Cache')
              }
              else {
                Alert.alert('Error with room 2 first photo update')
              }
            });
        
    }

    async photoRoom2_2cache(idUser, email, imageroom2_2) {
        let localUri2_2 = imageroom2_2;

          //Files
          let filename2_2 = localUri2_2.split('/').pop();
          let match2_2 = /\.(\w+)$/.exec(filename2_2);
          let type2_2 = match2_2 ? `image/${match2_2[1]}` : `image`;

        

          let formData = new FormData();
          formData.append('photo2_2', { uri: localUri2_2, name: filename2_2, type : type2_2 });


          //Variables
          let eMail = email;
          let id = idUser;
          let photo2_2 = 'Yes';

          return await fetch(`https://homebor.com/app/editRoomapp.php?email=${eMail}&id=${id}&photo2_2=${photo2_2}`, {
            method: 'POST',
            body: formData,
            header: {
                'Content-Type': 'multipart/form-data'
            },
          }).then(res => res.json())
            .catch(error => console.error('Error', error))
            .then(response => {
                if (response.status == 1) {
                  AsyncStorage.removeItem('imageRoom2_2Cache')
                }
              else {
                Alert.alert('Error with room 2 second photo update')
              }
            });
        
    }

    async photoRoom2_3cache(idUser, email, imageroom2_3) {
        let localUri2_3 = imageroom2_3;
    
          //Files
          let filename2_3 = localUri2_3.split('/').pop();
          let match2_3 = /\.(\w+)$/.exec(filename2_3);
          let type2_3 = match2_3 ? `image/${match2_3[1]}` : `image`;
    
        
    
          let formData = new FormData();
          formData.append('photo2_3', { uri: localUri2_3, name: filename2_3, type : type2_3 });
    
    
          //Variables
          let eMail = email;
          let id = idUser;
          let photo2_3 = 'Yes';
    
          return await fetch(`https://homebor.com/app/editRoomapp.php?email=${eMail}&id=${id}&photo2_3=${photo2_3}`, {
            method: 'POST',
            body: formData,
            header: {
                'Content-Type': 'multipart/form-data'
            },
          }).then(res => res.json())
            .catch(error => console.error('Error', error))
            .then(response => {
                if (response.status == 1) {
                   AsyncStorage.removeItem('imageRoom2_3Cache')
                }
              else {
                Alert.alert('Error with room 2 third photo update')
              }
            });
        
    }

    async photoRoom3cache(idUser, email, imageroom3) {
        let localUri3 = imageroom3;

          //Files
          let filename3 = localUri3.split('/').pop();
          let match3 = /\.(\w+)$/.exec(filename3);
          let type3 = match3 ? `image/${match3[1]}` : `image`;

        

          let formData = new FormData();
          formData.append('photo3', { uri: localUri3, name: filename3, type : type3 });


          //Variables
          let eMail = email;
          let id = idUser;
          let photo3 = 'Yes';

          return await fetch(`https://homebor.com/app/editRoomapp.php?email=${eMail}&id=${id}&photo3=${photo3}`, {
            method: 'POST',
            body: formData,
            header: {
                'Content-Type': 'multipart/form-data'
            },
          }).then(res => res.json())
            .catch(error => console.error('Error', error))
            .then(response => {
              if (response.status == 1) {
                AsyncStorage.removeItem('imageRoom3Cache')
              }
              else {
                Alert.alert('Error with room 3 first photo update')
              }
            });
        
    }

    async photoRoom3_2cache(idUser, email, imageroom3_2) {
        let localUri3_2 = imageroom3_2;

          //Files
          let filename3_2 = localUri3_2.split('/').pop();
          let match3_2 = /\.(\w+)$/.exec(filename3_2);
          let type3_2 = match3_2 ? `image/${match3_2[1]}` : `image`;

        

          let formData = new FormData();
          formData.append('photo3_2', { uri: localUri3_2, name: filename3_2, type : type3_2 });


          //Variables
          let eMail = email;
          let id = idUser;
          let photo3_2 = 'Yes';

          return await fetch(`https://homebor.com/app/editRoomapp.php?email=${eMail}&id=${id}&photo3_2=${photo3_2}`, {
            method: 'POST',
            body: formData,
            header: {
                'Content-Type': 'multipart/form-data'
            },
          }).then(res => res.json())
            .catch(error => console.error('Error', error))
            .then(response => {
                if (response.status == 1) {
                  AsyncStorage.removeItem('imageRoom3_2Cache')
                }
              else {
                Alert.alert('Error with room 3 second photo update')
              }
            });
        
    }

    async photoRoom3_3cache(idUser, email, imageroom3_3) {
        let localUri3_3 = imageroom3_3;
    
          //Files
          let filename3_3 = localUri3_3.split('/').pop();
          let match3_3 = /\.(\w+)$/.exec(filename3_3);
          let type3_3 = match3_3 ? `image/${match3_3[1]}` : `image`;
    
        
    
          let formData = new FormData();
          formData.append('photo3_3', { uri: localUri3_3, name: filename3_3, type : type3_3 });
    
    
          //Variables
          let eMail = email;
          let id = idUser;
          let photo3_3 = 'Yes';
    
          return await fetch(`https://homebor.com/app/editRoomapp.php?email=${eMail}&id=${id}&photo3_3=${photo3_3}`, {
            method: 'POST',
            body: formData,
            header: {
                'Content-Type': 'multipart/form-data'
            },
          }).then(res => res.json())
            .catch(error => console.error('Error', error))
            .then(response => {
                if (response.status == 1) {
                   AsyncStorage.removeItem('imageRoom3_3Cache')
                }
              else {
                Alert.alert('Error with room 3 third photo update')
              }
            });
        
    }


    async photoRoom4cache(idUser, email, imageroom4) {
        let localUri4 = imageroom4;

          //Files
          let filename4 = localUri4.split('/').pop();
          let match4 = /\.(\w+)$/.exec(filename4);
          let type4 = match4 ? `image/${match4[1]}` : `image`;

        

          let formData = new FormData();
          formData.append('photo4', { uri: localUri4, name: filename4, type : type4 });


          //Variables
          let eMail = email;
          let id = idUser;
          let photo4 = 'Yes';

          return await fetch(`https://homebor.com/app/editRoomapp.php?email=${eMail}&id=${id}&photo4=${photo4}`, {
            method: 'POST',
            body: formData,
            header: {
                'Content-Type': 'multipart/form-data'
            },
          }).then(res => res.json())
            .catch(error => console.error('Error', error))
            .then(response => {
              if (response.status == 1) {
                AsyncStorage.removeItem('imageRoom4Cache')
              }
              else {
                Alert.alert('Error with room 4 first photo update')
              }
            });
        
    }

    async photoRoom4_2cache(idUser, email, imageroom4_2) {
        let localUri4_2 = imageroom4_2;

          //Files
          let filename4_2 = localUri4_2.split('/').pop();
          let match4_2 = /\.(\w+)$/.exec(filename4_2);
          let type4_2 = match4_2 ? `image/${match4_2[1]}` : `image`;

        

          let formData = new FormData();
          formData.append('photo4_2', { uri: localUri4_2, name: filename4_2, type : type4_2 });


          //Variables
          let eMail = email;
          let id = idUser;
          let photo4_2 = 'Yes';

          return await fetch(`https://homebor.com/app/editRoomapp.php?email=${eMail}&id=${id}&photo4_2=${photo4_2}`, {
            method: 'POST',
            body: formData,
            header: {
                'Content-Type': 'multipart/form-data'
            },
          }).then(res => res.json())
            .catch(error => console.error('Error', error))
            .then(response => {
                if (response.status == 1) {
                  AsyncStorage.removeItem('imageRoom4_2Cache')
                }
              else {
                Alert.alert('Error with room 4 second photo update')
              }
            });
        
    }

    async photoRoom4_3cache(idUser, email, imageroom4_3) {
        let localUri4_3 = imageroom4_3;
    
          //Files
          let filename4_3 = localUri4_3.split('/').pop();
          let match4_3 = /\.(\w+)$/.exec(filename4_3);
          let type4_3 = match4_3 ? `image/${match4_3[1]}` : `image`;
    
        
    
          let formData = new FormData();
          formData.append('photo4_3', { uri: localUri4_3, name: filename4_3, type : type4_3 });
    
    
          //Variables
          let eMail = email;
          let id = idUser;
          let photo4_3 = 'Yes';
    
          return await fetch(`https://homebor.com/app/editRoomapp.php?email=${eMail}&id=${id}&photo4_3=${photo4_3}`, {
            method: 'POST',
            body: formData,
            header: {
                'Content-Type': 'multipart/form-data'
            },
          }).then(res => res.json())
            .catch(error => console.error('Error', error))
            .then(response => {
                if (response.status == 1) {
                   AsyncStorage.removeItem('imageRoom4_3Cache')
                }
              else {
                Alert.alert('Error with room 4 third photo update')
              }
            });
        
    }

    async photoRoom5cache(idUser, email, imageroom5) {
        let localUri5 = imageroom5;
    
          //Files
          let filename5 = localUri5.split('/').pop();
          let match5 = /\.(\w+)$/.exec(filename5);
          let type5 = match5 ? `image/${match5[1]}` : `image`;
    
        
    
          let formData = new FormData();
          formData.append('photo5', { uri: localUri5, name: filename5, type : type5 });
    
    
          //Variables
          let eMail = email;
          let id = idUser;
          let photo5 = 'Yes';
    
          return await fetch(`https://homebor.com/app/editRoomapp.php?email=${eMail}&id=${id}&photo5=${photo5}`, {
            method: 'POST',
            body: formData,
            header: {
                'Content-Type': 'multipart/form-data'
            },
          }).then(res => res.json())
            .catch(error => console.error('Error', error))
            .then(response => {
              if (response.status == 1) {
                AsyncStorage.removeItem('imageRoom5Cache')
              }
              else {
                Alert.alert('Error with room 5 first photo update')
              }
            });
        
    }
    
    async photoRoom5_2cache(idUser, email, imageroom5_2) {
        let localUri5_2 = imageroom5_2;
    
          //Files
          let filename5_2 = localUri5_2.split('/').pop();
          let match5_2 = /\.(\w+)$/.exec(filename5_2);
          let type5_2 = match5_2 ? `image/${match5_2[1]}` : `image`;
    
        
    
          let formData = new FormData();
          formData.append('photo5_2', { uri: localUri5_2, name: filename5_2, type : type5_2 });
    
    
          //Variables
          let eMail = email;
          let id = idUser;
          let photo5_2 = 'Yes';
    
          return await fetch(`https://homebor.com/app/editRoomapp.php?email=${eMail}&id=${id}&photo5_2=${photo5_2}`, {
            method: 'POST',
            body: formData,
            header: {
                'Content-Type': 'multipart/form-data'
            },
          }).then(res => res.json())
            .catch(error => console.error('Error', error))
            .then(response => {
                if (response.status == 1) {
                  AsyncStorage.removeItem('imageRoom5_2Cache')
                }
              else {
                Alert.alert('Error with room 5 second photo update')
              }
            });
        
    }
    
    async photoRoom5_3cache(idUser, email, imageroom5_3) {
        let localUri5_3 = imageroom5_3;
    
          //Files
          let filename5_3 = localUri5_3.split('/').pop();
          let match5_3 = /\.(\w+)$/.exec(filename5_3);
          let type5_3 = match5_3 ? `image/${match5_3[1]}` : `image`;
    
        
    
          let formData = new FormData();
          formData.append('photo5_3', { uri: localUri5_3, name: filename5_3, type : type5_3 });
    
    
          //Variables
          let eMail = email;
          let id = idUser;
          let photo5_3 = 'Yes';
    
          return await fetch(`https://homebor.com/app/editRoomapp.php?email=${eMail}&id=${id}&photo5_3=${photo5_3}`, {
            method: 'POST',
            body: formData,
            header: {
                'Content-Type': 'multipart/form-data'
            },
          }).then(res => res.json())
            .catch(error => console.error('Error', error))
            .then(response => {
                if (response.status == 1) {
                   AsyncStorage.removeItem('imageRoom5_3Cache')
                }
              else {
                Alert.alert('Error with room 5 third photo update')
              }
            });
        
    }

    async photoRoom6cache(idUser, email, imageroom6) {
        let localUri6 = imageroom6;
    
          //Files
          let filename6 = localUri6.split('/').pop();
          let match6 = /\.(\w+)$/.exec(filename6);
          let type6 = match6 ? `image/${match6[1]}` : `image`;
    
        
    
          let formData = new FormData();
          formData.append('photo6', { uri: localUri6, name: filename6, type : type6 });
    
    
          //Variables
          let eMail = email;
          let id = idUser;
          let photo6 = 'Yes';
    
          return await fetch(`https://homebor.com/app/editRoomapp.php?email=${eMail}&id=${id}&photo6=${photo6}`, {
            method: 'POST',
            body: formData,
            header: {
                'Content-Type': 'multipart/form-data'
            },
          }).then(res => res.json())
            .catch(error => console.error('Error', error))
            .then(response => {
              if (response.status == 1) {
                AsyncStorage.removeItem('imageRoom6Cache')
              }
              else {
                Alert.alert('Error with room 6 first photo update')
              }
            });
        
    }
    
    async photoRoom6_2cache(idUser, email, imageroom6_2) {
        let localUri6_2 = imageroom6_2;
    
          //Files
          let filename6_2 = localUri6_2.split('/').pop();
          let match6_2 = /\.(\w+)$/.exec(filename6_2);
          let type6_2 = match6_2 ? `image/${match6_2[1]}` : `image`;
    
        
    
          let formData = new FormData();
          formData.append('photo6_2', { uri: localUri6_2, name: filename6_2, type : type6_2 });
    
    
          //Variables
          let eMail = email;
          let id = idUser;
          let photo6_2 = 'Yes';
    
          return await fetch(`https://homebor.com/app/editRoomapp.php?email=${eMail}&id=${id}&photo6_2=${photo6_2}`, {
            method: 'POST',
            body: formData,
            header: {
                'Content-Type': 'multipart/form-data'
            },
          }).then(res => res.json())
            .catch(error => console.error('Error', error))
            .then(response => {
                if (response.status == 1) {
                  AsyncStorage.removeItem('imageRoom6_2Cache')
                }
              else {
                Alert.alert('Error with room 6 second photo update')
              }
            });
        
    }
    
    async photoRoom6_3cache(idUser, email, imageroom6_3) {
        let localUri6_3 = imageroom6_3;
    
          //Files
          let filename6_3 = localUri6_3.split('/').pop();
          let match6_3 = /\.(\w+)$/.exec(filename6_3);
          let type6_3 = match6_3 ? `image/${match6_3[1]}` : `image`;
    
        
    
          let formData = new FormData();
          formData.append('photo6_3', { uri: localUri6_3, name: filename6_3, type : type6_3 });
    
    
          //Variables
          let eMail = email;
          let id = idUser;
          let photo6_3 = 'Yes';
    
          return await fetch(`https://homebor.com/app/editRoomapp.php?email=${eMail}&id=${id}&photo6_3=${photo6_3}`, {
            method: 'POST',
            body: formData,
            header: {
                'Content-Type': 'multipart/form-data'
            },
          }).then(res => res.json())
            .catch(error => console.error('Error', error))
            .then(response => {
                if (response.status == 1) {
                   AsyncStorage.removeItem('imageRoom6_3Cache')
                }
              else {
                Alert.alert('Error with room 6 third photo update')
              }
            });
        
    }

    async photoRoom7cache(idUser, email, imageroom7) {
        let localUri7 = imageroom7;

          //Files
          let filename7 = localUri7.split('/').pop();
          let match7 = /\.(\w+)$/.exec(filename7);
          let type7 = match7 ? `image/${match7[1]}` : `image`;

        

          let formData = new FormData();
          formData.append('photo7', { uri: localUri7, name: filename7, type : type7 });


          //Variables
          let eMail = email;
          let id = idUser;
          let photo7 = 'Yes';

          return await fetch(`https://homebor.com/app/editRoomapp.php?email=${eMail}&id=${id}&photo7=${photo7}`, {
            method: 'POST',
            body: formData,
            header: {
                'Content-Type': 'multipart/form-data'
            },
          }).then(res => res.json())
            .catch(error => console.error('Error', error))
            .then(response => {
              if (response.status == 1) {
                AsyncStorage.removeItem('imageRoom7Cache')
              }
              else {
                Alert.alert('Error with room 7 first photo update')
              }
            });
        
    }

    async photoRoom7_2cache(idUser, email, imageroom7_2) {
        let localUri7_2 = imageroom7_2;

          //Files
          let filename7_2 = localUri7_2.split('/').pop();
          let match7_2 = /\.(\w+)$/.exec(filename7_2);
          let type7_2 = match7_2 ? `image/${match7_2[1]}` : `image`;

        

          let formData = new FormData();
          formData.append('photo7_2', { uri: localUri7_2, name: filename7_2, type : type7_2 });


          //Variables
          let eMail = email;
          let id = idUser;
          let photo7_2 = 'Yes';

          return await fetch(`https://homebor.com/app/editRoomapp.php?email=${eMail}&id=${id}&photo7_2=${photo7_2}`, {
            method: 'POST',
            body: formData,
            header: {
                'Content-Type': 'multipart/form-data'
            },
          }).then(res => res.json())
            .catch(error => console.error('Error', error))
            .then(response => {
                if (response.status == 1) {
                  AsyncStorage.removeItem('imageRoom7_2Cache')
                }
              else {
                Alert.alert('Error with room 7 second photo update')
              }
            });
        
    }

    async photoRoom7_3cache(idUser, email, imageroom7_3) {
        let localUri7_3 = imageroom7_3;
    
          //Files
          let filename7_3 = localUri7_3.split('/').pop();
          let match7_3 = /\.(\w+)$/.exec(filename7_3);
          let type7_3 = match7_3 ? `image/${match7_3[1]}` : `image`;
    
        
    
          let formData = new FormData();
          formData.append('photo7_3', { uri: localUri7_3, name: filename7_3, type : type7_3 });
    
    
          //Variables
          let eMail = email;
          let id = idUser;
          let photo7_3 = 'Yes';
    
          return await fetch(`https://homebor.com/app/editRoomapp.php?email=${eMail}&id=${id}&photo7_3=${photo7_3}`, {
            method: 'POST',
            body: formData,
            header: {
                'Content-Type': 'multipart/form-data'
            },
          }).then(res => res.json())
            .catch(error => console.error('Error', error))
            .then(response => {
                if (response.status == 1) {
                   AsyncStorage.removeItem('imageRoom7_3Cache')
                }
              else {
                Alert.alert('Error with room 7 third photo update')
              }
            });
        
    }

    async photoRoom8cache(idUser, email, imageroom8) {
        let localUri8 = imageroom8;

          //Files
          let filename8 = localUri8.split('/').pop();
          let match8 = /\.(\w+)$/.exec(filename8);
          let type8 = match8 ? `image/${match8[1]}` : `image`;

        

          let formData = new FormData();
          formData.append('photo8', { uri: localUri8, name: filename8, type : type8 });


          //Variables
          let eMail = email;
          let id = idUser;
          let photo8 = 'Yes';

          return await fetch(`https://homebor.com/app/editRoomapp.php?email=${eMail}&id=${id}&photo8=${photo8}`, {
            method: 'POST',
            body: formData,
            header: {
                'Content-Type': 'multipart/form-data'
            },
          }).then(res => res.json())
            .catch(error => console.error('Error', error))
            .then(response => {
              if (response.status == 1) {
                AsyncStorage.removeItem('imageRoom8Cache')
              }
              else {
                Alert.alert('Error with room 8 first photo update')
              }
            });
        
    }

    async photoRoom8_2cache(idUser, email, imageroom8_2) {
        let localUri8_2 = imageroom8_2;

          //Files
          let filename8_2 = localUri8_2.split('/').pop();
          let match8_2 = /\.(\w+)$/.exec(filename8_2);
          let type8_2 = match8_2 ? `image/${match8_2[1]}` : `image`;

        

          let formData = new FormData();
          formData.append('photo8_2', { uri: localUri8_2, name: filename8_2, type : type8_2 });


          //Variables
          let eMail = email;
          let id = idUser;
          let photo8_2 = 'Yes';

          return await fetch(`https://homebor.com/app/editRoomapp.php?email=${eMail}&id=${id}&photo8_2=${photo8_2}`, {
            method: 'POST',
            body: formData,
            header: {
                'Content-Type': 'multipart/form-data'
            },
          }).then(res => res.json())
            .catch(error => console.error('Error', error))
            .then(response => {
                if (response.status == 1) {
                  AsyncStorage.removeItem('imageRoom8_2Cache')
                }
              else {
                Alert.alert('Error with room 8 second photo update')
              }
            });
        
    }

    async photoRoom8_3cache(idUser, email, imageroom8_3) {
        let localUri8_3 = imageroom8_3;

    
          //Files
          let filename8_3 = localUri8_3.split('/').pop();
          let match8_3 = /\.(\w+)$/.exec(filename8_3);
          let type8_3 = match8_3 ? `image/${match8_3[1]}` : `image`;
    
        
    
          let formData = new FormData();
          formData.append('photo8_3', { uri: localUri8_3, name: filename8_3, type : type8_3 });
    
    
          //Variables
          let eMail = email;
          let id = idUser;
          let photo8_3 = 'Yes';
    
          return await fetch(`https://homebor.com/app/editRoomapp.php?email=${eMail}&id=${id}&photo8_3=${photo8_3}`, {
            method: 'POST',
            body: formData,
            header: {
                'Content-Type': 'multipart/form-data'
            },
          }).then(res => res.json())
            .catch(error => console.error('Error', error))
            .then(response => {
                if (response.status == 1) {
                   AsyncStorage.removeItem('imageRoom8_3Cache')
                }
              else {
                Alert.alert('Error with room 8 third photo update')
              }
            });
        
    }
    
    


} 
 
export default new API()