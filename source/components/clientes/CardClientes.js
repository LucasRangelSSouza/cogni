import React from 'react';
import {View, Text, StyleSheet} from 'react-native'
import InfoSvg from "../../utils/SVG/InfoSvg"
import ProdutosSvg from "../../utils/SVG/ProdutosSvg"


const CardClientes = (props)=>{
    
    var cliente = props.cliente.NOME_FANTASIA;
    var razao = props.cliente.RAZAO_SOCIAL;
    var responsavel = props.cliente.RESPONSAVEL;
    
    return(
        <View style={estilo.container}>
           <View>
                {/* <Label titulo={cliente}/> */}
                <View style={estilo.containerNomeCliente} >
                    <Text style={estilo.nomeCliente}>{cliente}</Text> 
                </View>
                
                <Text style={estilo.subtitulo}>Razão Social:</Text>
                <Text style={estilo.dados}>{razao}</Text>
            
            </View>         
           <View style={estilo.containerDeBotoes}>

                <View style={estilo.botaoInformacoes}>
                    <InfoSvg/>
                </View>

                <View style={estilo.botaoProdutos}>
                    <ProdutosSvg/>
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
      paddingLeft: 10,
      fontWeight: "bold"
    },
    dados:{
        paddingLeft: 15
    },
    containerDeBotoes:{
        marginTop: 5,
        flexDirection: 'row',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        backgroundColor: '#d6d6d6',
    },
    containerNomeCliente:{
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10
    },
    nomeCliente:{
        fontWeight: 'bold',
        fontSize: 15
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
    }
    
})

export default CardClientes;