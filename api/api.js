const END_POINT = 'http://homebor.com/' 
 
import { Alert } from "react-native"; 
 
 
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

    async EditPropertyEdit(email){
        const query = await fetch(`${END_POINT}editPropertyapp.php?email=${email}`) 
        const data = await query.json() 
        return data   
    }
    
    disableUser(id,mail_h,id_m,reason){ 
         
        fetch(`${END_POINT}disableApp.php?id=${id}&mail_h=${mail_h}&id_m=${id_m}&reason=${reason}`).then(res => res.json()) 
            .catch(error => console.log('Error:', error)) 
            .then(response => { 
                if(response.status == 1){ 
                    Alert.alert("Exitoso registro") 
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