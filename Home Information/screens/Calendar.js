import React, {useState} from 'react'; 
import {View, TouchableOpacity} from 'react-native'; 
import {Agenda} from 'react-native-calendars'; 
import { useNavigation } from '@react-navigation/native' 
import { globalStyles } from '../styles/global'; 
 
const timeToString = (time) => { 
    const date = new Date(time); 
 
    return date.toISOString().split('T')[0]; 
 
    }; 
 
    const Calendar = () => { 
 
    const [items, setItems] = useState({}); 
 
      const loadItems = (day) => { 
 
        setTimeout(() => { 
 
          for (let i = -15; i < 85; i++) { 
              const time = day.timestamp + i * 24 * 60 * 60 * 1000; 
 
                const strTime = timeToString(time); 
                 if (!items[strTime]) { 
                items[strTime] = []; 
 
                  const numItems = Math.floor(Math.random() * 3 + 1); 
                    for (let j = 0; j < numItems; j++) { 
                    items[strTime].push({ 
                    name: 'Item for ' + strTime + ' #' + j, 
                    height: Math.max(50, Math.floor(Math.random() * 150)), 
                    }); 
                  }  
                } 
            } 
                      const newItems = {}; 
                      Object.keys(items).forEach((key) => { 
                      newItems[key] = items[key]; 
                      }); 
                      setItems(newItems); 
 
          }, 1000); 
        }; 
 
        const renderItem = (item) => { 
        return ( 
 
          <TouchableOpacity style={{marginRight: 10, marginTop: 17}}> 
 
 
 
          </TouchableOpacity> 
        ); 
 
    }; 
 
    return ( 
     
        <View style={{flex: 1, borderWidth: 1, 
            borderColor: 'gray', 
            height: 350}}>  
            <Agenda 
                items={items} 
                loadItemsForMonth={loadItems} 
                selected={''} 
                renderItem={renderItem} 
 
                    markedDates={{ 
                    }} 
 
                    // Date marking style [simple]. Default = '' 
                    markingType={'multi-period'} 
 
            /> 
        </View> 
    ); 
}; 
 
 
 
export default Calendar;