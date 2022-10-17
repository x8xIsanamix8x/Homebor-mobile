const END_POINT = 'http://homebor.com/app/' ;
  
import { Alert} from "react-native";
 
 
class API { 

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

} 
 
export default new API()