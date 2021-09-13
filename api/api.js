const END_POINT = 'http://homebor.com/' 
  
import { Alert} from "react-native";
 
 
class API { 

    
 
    async valLog(email, password){ 
        const query = await fetch(`${END_POINT}loginApp.php?email=${email}&password=${password}`) 
        const data = await query.json() 
        return data 
    } 
 
    registerData(name,lastname,email,password){ 
         
        fetch(`${END_POINT}registerApp.php?name=${name}&lastname=${lastname}&email=${email}&password=${password}`).then(res => res.json()) 
            .catch(error => console.log('Error:', error)) 
            .then(response => { 
                if(response.status == 1){ 
                    Alert.alert("Exitoso registro")
                }else{ 
                    Alert.alert("Error"); }
        }); 
    } 

    async getAgenda2(email){  
        const query = await fetch(`${END_POINT}agenda2.php?email=${email}`) 
        const data = await query.json() 
        return data 
    } 
    
    async getAgenda(email){  
        const query = await fetch(`${END_POINT}agenda.php?email=${email}`) 
        const data = await query.json() 
        return data 
    } 

    
    
    async getProfile(email){ 
        const query = await fetch(`${END_POINT}profileapp.php?email=${email}`) 
        const data = await query.json() 
        return data   
    }

    async getRoominfo(email){ 
        const query = await fetch(`${END_POINT}roomapp.php?email=${email}`) 
        const data = await query.json() 
        return data   
    }

    async getNotifications(email){
        const query = await fetch(`${END_POINT}notiapp.php?email=${email}`) 
        const data = await query.json() 
        return data  
    }

    async getBasicdata(email){ 
        const query = await fetch(`${END_POINT}basicdatapp.php?email=${email}`) 
        const data = await query.json() 
        return data   
    }

    async getAdditionaldata(email){ 
        const query = await fetch(`${END_POINT}additionaldatapp.php?email=${email}`) 
        const data = await query.json() 
        return data   
    }

    async getAdditionalstate(email){ 
        const query = await fetch(`${END_POINT}additionalstateapp.php?email=${email}`) 
        const data = await query.json() 
        return data   
    }

    async getDrawerdata(email){ 
        const query = await fetch(`${END_POINT}drawerapp.php?email=${email}`) 
        const data = await query.json() 
        return data   
    }

    async EditPropertyEdit(email){
        const query = await fetch(`${END_POINT}editPropertyapp.php?email=${email}`) 
        const data = await query.json() 
        return data   
    }

    async getFamilyinfo(email){ 
        const query = await fetch(`${END_POINT}familydatapp.php?email=${email}`) 
        const data = await query.json() 
        return data   
    }

    async registerbasicinfo(id, email,hname,num,dir,cities,states,p_code, idm, nameh, lnameh, db, gender, dblaw){ 
         
        fetch(`${END_POINT}basiceditapp.php?id=${id}&email=${email}&hname=${hname}&num=${num}&dir=${dir}&cities=${cities}&states=${states}&p_code=${p_code}&idm=${idm}&nameh=${nameh}&lnameh=${lnameh}&db=${db}&gender=${gender}&dblaw=${dblaw}`).then(res => res.json()) 
            .catch(error => console.log('Error:', error)) 
            .then(response => { 
                if(response.status == 1){ 
                    Alert.alert("Basic Information Update")
                }else{ 
                    Alert.alert("Error"); }
        }); 
    } 

    async registerbasicinforegister(id, email,hname,num,dir,cities,states,p_code, idm, nameh, lnameh, db, gender, dblaw){ 
         
        fetch(`${END_POINT}basicinforegister.php?id=${id}&email=${email}&hname=${hname}&num=${num}&dir=${dir}&cities=${cities}&states=${states}&p_code=${p_code}&idm=${idm}&nameh=${nameh}&lnameh=${lnameh}&db=${db}&gender=${gender}&dblaw=${dblaw}`).then(res => res.json()) 
            .catch(error => console.log('Error:', error)) 
            .then(response => { 
                if(response.status == 1){ 
                    Alert.alert("Basic Information Update")
                }else{ 
                    Alert.alert("Error"); }
        }); 
    }

    async registeradditionalinfo(id, email,des, num_mem, backg, backl, g_pre, ag_pre, status, cell, smoke, pet, pet_num, type_pet, id_m, a_pre, itemDog, itemCat, itemOther, itemVegetarian, itemHalal, itemKosher, itemLactose, itemGluten, itemPork, itemNone){ 
         
        fetch(`${END_POINT}additionaleditapp.php?id=${id}&email=${email}&des=${des}&num_mem=${num_mem}&backg=${backg}&backl=${backl}&g_pre=${g_pre}&ag_pre=${ag_pre}&status=${status}&cell=${cell}&smoke=${smoke}&pet=${pet}&pet_num=${pet_num}&type_pet=${type_pet}&idm=${id_m}&a_pre=${a_pre}&itemDog=${itemDog}&itemCat=${itemCat}&itemOther=${itemOther}&itemVegetarian=${itemVegetarian}&itemHalal=${itemHalal}&itemKosher=${itemKosher}&itemLactose=${itemLactose}&itemGluten=${itemGluten}&itemPork=${itemPork}&itemNone=${itemNone}`).then(res => res.json()) 
            .catch(error => console.log('Error:', error)) 
            .then(response => { 
                if(response.status == 1){ 
                    Alert.alert("Additional Information Update")
                }else{ 
                    Alert.alert("Error"); }
        }); 
    } 

    async additionalinforegister(id, email,des, num_mem, backg, backl, g_pre, ag_pre, status, cell, smoke, pet, pet_num, type_pet, id_m, a_pre, itemDog, itemCat, itemOther, itemVegetarian, itemHalal, itemKosher, itemLactose, itemGluten, itemPork, itemNone){ 
         
        fetch(`${END_POINT}additionalregisterapp.php?id=${id}&email=${email}&des=${des}&num_mem=${num_mem}&backg=${backg}&backl=${backl}&g_pre=${g_pre}&ag_pre=${ag_pre}&status=${status}&cell=${cell}&smoke=${smoke}&pet=${pet}&pet_num=${pet_num}&type_pet=${type_pet}&idm=${id_m}&a_pre=${a_pre}&itemDog=${itemDog}&itemCat=${itemCat}&itemOther=${itemOther}&itemVegetarian=${itemVegetarian}&itemHalal=${itemHalal}&itemKosher=${itemKosher}&itemLactose=${itemLactose}&itemGluten=${itemGluten}&itemPork=${itemPork}&itemNone=${itemNone}`).then(res => res.json()) 
            .catch(error => console.log('Error:', error)) 
            .then(response => { 
                if(response.status == 1){ 
                    Alert.alert("Additional Information Submitted")
                }else{ 
                    Alert.alert("Error"); }
        }); 
    } 

    async registerfamilyinfo(id, email,idm, f_name1, f_lname1, db1, gender1, re1, db_lawf1, f_name2, f_lname2, db2, gender2, re2, db_lawf2, f_name3, f_lname3, db3, gender3, re3, db_lawf3, f_name4, f_lname4, db4, gender4, re4, db_lawf4, f_name5, f_lname5, db5, gender5, re5, db_lawf5, f_name6, f_lname6, db6, gender6, re6, db_lawf6, f_name7, f_lname7, db7, gender7, re7, db_lawf7, f_name8, f_lname8, db8, gender8, re8, db_lawf8){ 
         
        fetch(`${END_POINT}familyeditapp.php?id=${id}&email=${email}&idm=${idm}&f_name1=${f_name1}&f_lname1=${f_lname1}&db1=${db1}&gender1=${gender1}&re1=${re1}&db_lawf1=${db_lawf1}&f_name2=${f_name2}&f_lname2=${f_lname2}&db2=${db2}&gender2=${gender2}&re2=${re2}&db_lawf2=${db_lawf2}&f_name2=${f_name2}&f_lname2=${f_lname2}&db2=${db2}&gender2=${gender2}&re2=${re2}&db_lawf2=${db_lawf2}&f_name3=${f_name3}&f_lname3=${f_lname3}&db3=${db3}&gender3=${gender3}&re3=${re3}&db_lawf3=${db_lawf3}&f_name4=${f_name4}&f_lname4=${f_lname4}&db4=${db4}&gender4=${gender4}&re4=${re4}&db_lawf4=${db_lawf4}&f_name5=${f_name5}&f_lname5=${f_lname5}&db5=${db5}&gender5=${gender5}&re5=${re5}&db_lawf5=${db_lawf5}&f_name6=${f_name6}&f_lname6=${f_lname6}&db6=${db6}&gender6=${gender6}&re6=${re6}&db_lawf6=${db_lawf6}&f_name7=${f_name7}&f_lname7=${f_lname7}&db7=${db7}&gender7=${gender7}&re7=${re7}&db_lawf7=${db_lawf7}&f_name8=${f_name8}&f_lname8=${f_lname8}&db8=${db8}&gender8=${gender8}&re8=${re8}&db_lawf8=${db_lawf8}`).then(res => res.json()) 
            .catch(error => console.log('Error:', error)) 
            .then(response => { 
                if(response.status == 1){ 
                    Alert.alert("Family Information Update")
                }else{ 
                    Alert.alert("Error"); }
        }); 
    } 
    
    async disableUser(id,mail_h,id_m,reason){ 
         
        fetch(`${END_POINT}disableApp.php?id=${id}&mail_h=${mail_h}&id_m=${id_m}&reason=${reason}`).then(res => res.json()) 
            .catch(error => console.log('Error:', error)) 
            .then(response => { 
                if(response.status == 1){ 
                    Alert.alert("Succesfully Disable")
                }else{ 
                    Alert.alert("Error"); }
        }); 
    }

    async editRoominfo(id, email,idm, type1, bed1, date1, food1, aprox1, type2, bed2, date2, food2, aprox2, type3, bed3, date3, food3, aprox3, type4, bed4, date4, food4, aprox4, type5, bed5, date5, food5, aprox5, type6, bed6, date6, food6, aprox6, type7, bed7, date7, food7, aprox7, type8, bed8, date8, food8, aprox8, photo0){ 
         
        fetch(`${END_POINT}editroomapp.php?id=${id}&email=${email}&idm=${idm}&type1=${type1}&bed1=${bed1}&date1=${date1}&food1=${food1}&aprox1=${aprox1}&type2=${type2}&bed2=${bed2}&date2=${date2}&food2=${food2}&aprox2=${aprox2}&type3=${type3}&bed3=${bed3}&date3=${date3}&food3=${food3}&aprox3=${aprox3}&type4=${type4}&bed4=${bed4}&date4=${date4}&food4=${food4}&aprox4=${aprox4}&type5=${type5}&bed5=${bed5}&date5=${date5}&food5=${food5}&aprox5=${aprox5}&type6=${type6}&bed6=${bed6}&date6=${date6}&food6=${food6}&aprox6=${aprox6}&type7=${type7}&bed7=${bed7}&date7=${date7}&food7=${food7}&aprox7=${aprox7}&type8=${type8}&bed8=${bed8}&date8=${date8}&food8=${food8}&aprox8=${aprox8}&photo0=${photo0}`).then(res => res.json()) 
            .catch(error => console.log('Error:', error)) 
            .then(response => { 
                if(response.status == 1){ 
                    Alert.alert("Rooms Information Update")
                }else{ 
                    Alert.alert("Error"); }
        }); 
    } 

    async getStudentnot(idnoti){ 
        const query = await fetch(`${END_POINT}profilestudentnotapp.php?idnoti=${idnoti}`) 
        const data = await query.json() 
        return data   
    }

    async getGalleryPhotos(email){ 
        const query = await fetch(`${END_POINT}galleryapp.php?email=${email}`) 
        const data = await query.json() 
        return data   
    }

    async rejectStudent(email,mail, idnoti){  
         
        fetch(`${END_POINT}rejectstudentapp.php?email=${email}&mail=${mail}&idnoti=${idnoti}`).then(res => res.json()) 
            .catch(error => console.log('Error:', error)) 
            .then(response => { 
                if(response.status == 1){ 
                    Alert.alert("Student Rejected")
                }else{ 
                    Alert.alert("Error"); }
        }); 
    }

    async confirmStudent(email,mail, idnoti, h_name, name_h, l_name_h, start, name_s, l_name_s, bedrooms, end, idm){  
         
        fetch(`${END_POINT}confirmstudentapp.php?email=${email}&mail=${mail}&idnoti=${idnoti}&h_name=${h_name}&name_h=${name_h}&l_name_h=${l_name_h}&start=${start}&name_s=${name_s}&l_name_s=${l_name_s}&bedrooms=${bedrooms}&end=${end}&idm=${idm}`).then(res => res.json()) 
            .catch(error => console.log('Error:', error)) 
            .then(response => { 
                if(response.status == 1){ 
                    Alert.alert("Student Confirmed")
                }else{ 
                    Alert.alert("Error"); }
        }); 
    }
    
    registergalleybasic(email){

        fetch(`${END_POINT}galleryone.php?email${email}`, { 
            body: JSON.stringify({  
                iMage : image,  
                lRoomphoto : lroomphoto, 
            }),    
            headers:{  
                'Content-Type': 'multipart/form-data',  
            }  
            }).then(res => res.json()) 
            .catch(error => console.log('Error:', error)) 
            .then(response => { 
                if(response.status == 1){ 
                    Alert.alert("Succesfully Disable")
                }else{ 
                    Alert.alert("Error"); }
        });  
        
    }

   

    registerbasicinformation(hname,num,email){  
          
        fetch(`${END_POINT}registerp1.php`, {  
            method: 'POST',  
            body: JSON.stringify({  
                hName : hname,  
                nUm : num,
                eMail : email, 
            }),  
            headers:{  
                'Content-Type': 'application/json'  
            }  
        }).then(res => res.json())  
        .catch(error => console.error('Error:', error))  
        .then(response => {  
            if(response.status == 1){  
                Alert.alert("Basic Information clear")  
            }else{  
                Alert.alert("Error");  
            }  
        });  
    }  
    

} 
 
export default new API()