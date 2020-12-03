import React from 'react';
import {View, Text, StyleSheet,TouchableOpacity} from 'react-native'
import InfoSvg from "../../utils/SVG/InfoSvg"
import ProdutosSvg from "../../utils/SVG/ProdutosSvg"
import AtivosSvg from "../../utils/SVG/AtivosSvg"


const CardClientes = (props)=>{
    var cliente = props.cliente.nomeFantasia;
    var razao = props.cliente.razaoSocial;
    var idCliente =  props.cliente.idCliente;
    var perfilUsuario = props.cliente.perfilUsuario;
    var onPress = props.onPress;
    console.log('Id clienteeeeeeeeeeeee: ',idCliente);
    return(
        <View style={estilo.container}>
           <View>
                <View style={estilo.containerDadosCliente} >
                    <Text style={estilo.nomeCliente}>{cliente}</Text> 
                    <Text style={estilo.dadosCliente}>{razao}</Text>
                </View>
            
            </View>         
           <View style={estilo.containerDeBotoes}>

                <View style={estilo.botaoInformacoes}>
                    <TouchableOpacity delayPressIn={0} onPress={() => onPress.navigate('InfoClientesPage', { "nomeFantasia": cliente, "idCliente": idCliente, 'perfilUsuario':perfilUsuario})}>
                        <InfoSvg/>
                    </TouchableOpacity>
                </View>
                <View style={estilo.botaoAtivos}>
                    <TouchableOpacity delayPressIn={0} onPress={() => onPress.navigate('InfoClientesPage', { "nomeFantasia": cliente, "idCliente": idCliente, 'perfilUsuario':perfilUsuario})}>
                        <AtivosSvg/>
                    </TouchableOpacity>
                </View>
                <View style={estilo.botaoProdutos}>
                    <TouchableOpacity delayPressIn={0} onPress={() => onPress.navigate('InfoClientesPage', { "nomeFantasia": cliente, "idCliente": idCliente, 'perfilUsuario':perfilUsuario})}>
                        <ProdutosSvg/>
                    </TouchableOpacity>
                </View>

            </View>
        
        </View>
     );
}

const estilo = StyleSheet.create({
    
    container:{
        marginTop: 5,
        marginLeft: 5,
        marginRight: 5,
        paddingRight: 5,
        paddingLeft: 5, 
        paddingTop: 5,
        paddingBottom: 5, 
        backgroundColor: '#e3e1e1' ,
        color: '#252323',
        borderRadius: 5,
        
      },
    
    subtitulo:{
      fontWeight: "bold"
    },
    dadosCliente:{
        alignSelf: 'center',
    },
    containerDeBotoes:{
        marginTop: 5,
        flexDirection: 'row',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        backgroundColor: '#d6d6d6',
    },
    containerDadosCliente:{
        padding:5,
        flex: 1,
        alignSelf: 'center',
    },
    nomeCliente:{
        fontWeight: 'bold',
        fontSize: 13,
        alignSelf: 'center'
    },
    botaoInformacoes:{
        flex: 1,
        paddingTop: 15,
        paddingBottom: 15,
        borderRightWidth: 1,
        borderRightColor: '#dbdbdb'
 
     },
     botaoProdutos:{
        flex: 1,
        paddingTop: 15,
        paddingBottom: 15,
        borderLeftWidth: 1,
        borderLeftColor: '#dbdbdb'
    },

    botaoAtivos:{
        flex: 1,
        paddingTop: 15,
        paddingBottom: 15,
        borderLeftWidth: 1,
        borderLeftColor: '#dbdbdb'
    }
    
    
})

export default CardClientes;