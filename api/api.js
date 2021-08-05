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

    async getStudentnot(idnoti){ 
        const query = await fetch(`${END_POINT}profilestudentnotapp.php?idnoti=${idnoti}`) 
        const data = await query.json() 
        return data   
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