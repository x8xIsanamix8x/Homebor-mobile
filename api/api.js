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

    async registeradditionalinfo(id, email,des,num_mem,backg,backl,g_pre,ag_pre, status, cell, smoke, pet, pet_num, type_pet, idm, a_pre, itemDog, itemCat, itemOther, itemVegetarian, itemHalal, itemKosher, itemLactose, itemGluten, itemPork, itemNone){ 
         
        fetch(`${END_POINT}additionaleditapp.php?id=${id}&email=${email}&des=${des}&num_mem=${num_mem}&backg=${backg}&backl=${backl}&g_pre=${g_pre}&ag_pre=${ag_pre}&status=${status}&cell=${cell}&smoke=${smoke}&pet=${pet}&pet_num=${pet_num}&type_pet=${type_pet}&idm=${idm}&a_pre=${a_pre}&itemDog=${itemDog}&itemCat=${itemCat}&itemOther=${itemOther}&itemVegetarian=${itemVegetarian}&itemHalal=${itemHalal}&itemKosher=${itemKosher}&itemLactose=${itemLactose}&itemGluten=${itemGluten}&itemPork=${itemPork}&itemNone=${itemNone}`).then(res => res.json()) 
            .catch(error => console.log('Error:', error)) 
            .then(response => { 
                if(response.status == 1){ 
                    Alert.alert("Additional Information Update")
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