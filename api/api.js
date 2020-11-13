const END_POINT = 'http://homebor.com/registerApp.php'

import { Alert } from "react-native";


class API {

    registerData(name,lastname,email,password){
        fetch(END_POINT, {
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

}

export default new API()