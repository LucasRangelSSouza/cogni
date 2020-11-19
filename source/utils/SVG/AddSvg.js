import React from 'react';
import {View, StyleSheet,Text} from 'react-native'
import Svg, { G,Path } from "react-native-svg"


const AddSvg = (props)=>{
    
    return(
        
        <View >
                <View>
                    <Svg width={40} height={40} viewBox="0 0 512 512" >
                        <G fill="#3F19C9">
                        <Path d="M256 0C114.836 0 0 114.836 0 256s114.836 256 256 256 256-114.836 256-256S397.164 0 256 0zm0 0" fill="#3F19C9"/>
                        <Path d="M368 277.332h-90.668V368c0 11.777-9.555 21.332-21.332 21.332s-21.332-9.555-21.332-21.332v-90.668H144c-11.777 0-21.332-9.555-21.332-21.332s9.555-21.332 21.332-21.332h90.668V144c0-11.777 9.555-21.332 21.332-21.332s21.332 9.555 21.332 21.332v90.668H368c11.777 0 21.332 9.555 21.332 21.332s-9.555 21.332-21.332 21.332zm0 0" fill="#fafafa"/>
                        </G>
                    </Svg>
                </View>
        </View>
    )
};

const Estilos = StyleSheet.create({
    
    container:{
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'column',
    },
})

export default AddSvg;