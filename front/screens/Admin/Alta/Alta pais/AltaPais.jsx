import * as React from "react";
import {
  View,
  Text,
  TextInput,
  Alert
} from "react-native";
import {Button} from "react-native-paper"
import { useDispatch } from "react-redux";
import styles from "../altaStyles"
import {createCountry} from "../../../../state/admin/paises/thunks"

const AltaPais = ({nombre, setViewModal}) =>{
    const [name, setName]= React.useState("")
    const dispatch= useDispatch()
    const handleCreation= ()=>{
        dispatch(createCountry(name)).then(()=>{
            setViewModal(false)
            return Alert.alert("Acción completa", "País creado exitosamente", [
                { text: "OK", onPress: () => console.log("OK Pressed") },
              ])
        })
    }

    return(

        <View style={styles.viewContainer}>
            <View
              style={styles.wrapper}
            >
              <Text style={styles.title}>Creación de {nombre}</Text>
             
              <TextInput
              value={name}
              onChangeText={text => setName(text)}
                style={styles.input}
                multiline
              />
           

            <View
              style={styles.buttonContainer}
            >
            
              <Button
                style={styles.Button}
                onPress={() => {
                    setViewModal(false);
                }}
              >
                <Text
                style={styles.textButton}
                >
                  Cerrar
                </Text>
              </Button>
                
              <Button
                  style={styles.Button}
                  onPress={() =>  handleCreation()}
                >
                  <Text
                    style={styles.textButton}
                  >
                    GUARDAR
                  </Text>
                </Button>
            </View>
        </View>
        </View>








    )
}

export default AltaPais;