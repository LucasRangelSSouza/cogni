import { useLinkProps } from '@react-navigation/native';
import React from 'react';
import {View, StyleSheet,TextInput} from 'react-native'


const ViewRow = (props)=>{
    
    const { children } = props;
    return(
        
        <View style={Estilos.container}>
            { children }
        </View>
    )
};

const Estilos = StyleSheet.create({
    
    container:{
    

    },
    
})

export default ViewRow;