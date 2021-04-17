import React from 'react'
import {View} from 'react-native'
import { H3 } from 'native-base'
import styles from './global'

function Header(props) {
    return(
        <View styles={styles.containerheader}>
            <View styles={styles.contentheader}>
                <H3 styles={styles.textheader}>{props.text}</H3>
            </View>
        </View>
    )
}

export default Header;