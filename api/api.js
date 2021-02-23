const END_POINT = 'http://homebor.com/'

import { Alert } from "react-native";


class API {

    async valLog(email, password){
        const query = await fetch(`${END_POINT}loginApp.php?email=${email}&password=${password}`)
        const data = await query.json()
        return data
    }


    registerData(name,lastname,email,password){
        
        fetch(`${END_POINT}registerApp.php`, {
            method: 'POST',
            body: JSON.stringify({
                pName : name,
                pLastname : lastname,
                pEmail : email,
                pPassword : password
            }),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            if(response.status == 1){
                Alert.alert("Exitoso registro")
            }else{
                Alert.alert("Error");
            }
        });
    }

    async getAgenda(){
        const query = await fetch(`${END_POINT}agenda.php`)
        const data = await query.json()
        return data
    }


}

export default new API()