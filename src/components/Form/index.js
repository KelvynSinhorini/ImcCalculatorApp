import React, { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, Vibration } from "react-native"
import ResultImc from "./ResultImc";
import styles from "./style";

export default function Form(){

    const [height, setHeight] = useState(null);
    const [weight, setWeight] = useState(null);
    const [messageImc, setMessageImc] = useState("preencha o peso e altura");
    const [imc, setImc] = useState(null);
    const [textButton, setTextButton] = useState("Calcular IMC");
    const [errorMessage, setErrorMessage] = useState(null);

    function imcCalculator(){
        return setImc((weight/(height * height)).toFixed(2));
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
            return
        }       

        verifyImc()
        setImc(null)
        setTextButton("Calcular")
        setMessageImc("preencha o peso e altura")
    }

    return (
        <View style={styles.formContext}>
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
            <ResultImc messageResultImc={messageImc} resultImc={imc} />
        </View>
    );
}