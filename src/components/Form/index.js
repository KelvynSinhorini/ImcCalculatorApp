import React, { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, Vibration, FlatList } from "react-native"
import ResultImc from "./ResultImc";
import styles from "./style";

export default function Form(){
    const [height, setHeight] = useState(null);
    const [weight, setWeight] = useState(null);
    const [messageImc, setMessageImc] = useState("preencha o peso e altura");
    const [imc, setImc] = useState(null);
    const [textButton, setTextButton] = useState("Calcular IMC");
    const [errorMessage, setErrorMessage] = useState(null);
    const [imcList, setImcList] = useState([]);

    function imcCalculator(){        
        let normalizedHeight = height;
        let normalizedWeight = weight;

        if(height.includes(",")){
            normalizedHeight = height.replace(",", ".");
        }

        if(weight.includes(",")){
            normalizedWeight = weight.replace(",", ".");
        }

        let totalImc = (normalizedWeight/(normalizedHeight * normalizedHeight)).toFixed(2);
        setImcList((arr) => [...arr, {
            id: new Date().getTime(),
            imc: totalImc
        }]);
        setImc(totalImc);
    }

    function verifyImc(){
        if(imc == null){
            Vibration.vibrate();
            setErrorMessage("campo obrigatório*");
        }
    }

    function calculate(){
        if(weight != null && height != null){
            imcCalculator()
            setHeight(null)
            setWeight(null)
            setMessageImc("Seu IMC é igual: ")
            setTextButton("Calcular Novamente")
            setErrorMessage(null)
        }       
        else{
            verifyImc()
            setImc(null)
            setTextButton("Calcular")
            setMessageImc("preencha o peso e altura")
        }
    }

    return (
        <View style={styles.formContext}>            
            {   
                imc == null ? 
                <View style={styles.form}>
                    <Text style={styles.formLabel}>Altura</Text>
                    <Text style={styles.errorMessage}>{errorMessage}</Text>
                    <TextInput 
                        style={styles.input}
                        placeholder="Ex. 1.75"
                        keyboardType="numeric"
                        onChangeText={setHeight} 
                        value={height}
                    />

                    <Text style={styles.formLabel}>Peso</Text>
                    <Text style={styles.errorMessage}>{errorMessage}</Text>
                    <TextInput 
                        style={styles.input}
                        placeholder="Ex. 75.366" 
                        keyboardType="numeric"
                        onChangeText={setWeight} 
                        value={weight} 
                    />
                    <TouchableOpacity style={styles.buttonCalculator} onPress={() => calculate()} >
                        <Text style={styles.textButtonCalculator}>{textButton}</Text>
                    </TouchableOpacity>
                </View>
                : 
                <View style={styles.exibitionResultimc}>
                    <ResultImc messageResultImc={messageImc} resultImc={imc} />
                    <TouchableOpacity style={styles.buttonCalculator} onPress={() => calculate()} >
                        <Text style={styles.textButtonCalculator}>{textButton}</Text>
                    </TouchableOpacity>
                </View>
            }
            <FlatList             
                showsVerticalScrollIndicator
                data={imcList.reverse()} 
                style={styles.listImcs}
                renderItem={({item}) => {
                    return (
                        <Text style={styles.resultImcItem}>
                            <Text style={styles.textResultItemList}>Resultado IMC = </Text>
                            {item.imc}
                        </Text>
                    )
                }}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
}