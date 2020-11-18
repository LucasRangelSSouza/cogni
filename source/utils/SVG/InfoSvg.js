import React from 'react';
import {View, StyleSheet,Text} from 'react-native'
import Svg, { G,Path } from "react-native-svg"


const InfoSvg = (props)=>{
    
    return(
        
        <View style={Estilos.container}>
                <View>
                    <Svg width={30} height={30} viewBox="0 0 426.667 426.667" {...props}>
                        <G fill="black">
                            <Path d="M192 192h42.667v128H192z" />
                            <Path d="M213.333 0C95.467 0 0 95.467 0 213.333s95.467 213.333 213.333 213.333S426.667 331.2 426.667 213.333 331.2 0 213.333 0zm0 384c-94.08 0-170.667-76.587-170.667-170.667S119.253 42.667 213.333 42.667 384 119.253 384 213.333 307.413 384 213.333 384z" />
                            <Path d="M192 106.667h42.667v42.667H192z" />
                        </G>
                    </Svg>
                </View>
                <Text>Informações</Text>
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

export default InfoSvg;