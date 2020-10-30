import React from 'react';
import {View, Text, StyleSheet} from 'react-native'


const Label = (props)=>(
    
    <View style={Estilos.container}>
        <Text style={Estilos.label}>{props.titulo}</Text>
    </View>
    )

const Estilos = StyleSheet.create({
    
    label:{
        fontWeight: 'bold',
        paddingLeft: 15,
        flex: 1,
        fontSize: 15
    },
    container:{
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 15,
        marginRight: 15,
        

    },
})

export default Label;