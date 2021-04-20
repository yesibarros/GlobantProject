import * as React from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  ActivityIndicator,
  Alert,
  ScrollView
} from "react-native";
import {Button} from "react-native-paper"
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useTheme } from "@react-navigation/native";
import styles from "../bajaStyles"
import {getLocations, deleteLocation} from "../../../../state/admin/locaciones/thunks"
import PillButton from "../../../../shared/components/PillButton";


const BajaLocacion = ({viewDelModal, nombre, setViewDelModal, setIsLoading}) =>{
    const { colors } = useTheme();
    const dispatch = useDispatch()
    const locations= useSelector(state=> state.admin.locaciones)
    const [selectedLocations, setSelectedLocations] = React.useState([])

    React.useEffect(()=>{
        dispatch(getLocations()).then(()=> setIsLoading(false))
    }, [])
    console.log(locations)
    
    const handleSelect = (id) => {
        const location = selectedLocations.filter((t) => t._id == id);
        if (location.length) {
          setSelectedLocations((prevState) => prevState.filter((t) => t._id !== id));
        } else {
          setSelectedLocations((prevState) => [...prevState, { _id: id }]);
        }
      };
    const handleDelete= ()=>{
      selectedLocations.forEach(location => {
            dispatch(deleteLocation({_id: location._id}))
          });
    
        
          setViewDelModal(false)
          return Alert.alert("Acción completa", "Locacion/es borrada/s exitosamente", [
            { text: "OK", onPress: () => console.log("OK Pressed") },
          ])
        }

    return (
        
        <View style={styles.viewContainer}>
             
             
             <Text style={styles.title}>Baja de {nombre}</Text>
             <View
             style={styles.mapContainer}
           >
             <ScrollView>
             {locations && locations.length > 0  &&  locations.map(locacion=>{
                  const selected = selectedLocations.filter(
                    (singleLocation) => singleLocation._id == locacion._id
                  ).length
                    ? true
                    : false;
                  return (
                    
                    <PillButton
                      title={locacion.locationName}
                      key={locacion._id}
                      id={locacion._id}
                      selected={selected}
                      onSelect={handleSelect}
                    />
         
             )})}
              
         <View
             style={styles.buttonContainer, {flexDirection: "row", marginTop:20,justifyContent:"space-evenly", marginBottom: 150}}
           >
            
           
             <Button
               style={styles.Button}
               onPress={() => {
                   setViewDelModal(false);
               }}
             >
               <Text
                 style={{ fontSize: 22, color: "white", textAlign: "center" }}
               >
                 Cerrar
               </Text>
             </Button>
               
             <Button
                 style={styles.Button}
                 onPress={() =>  handleDelete()}
               >
                 <Text
                   style={{
                     fontSize: 22,
                     color: "white",
                     textAlign: "center",
                   }}
                 >
                   GUARDAR
                 </Text>
               </Button>
            
           </View>
           
            </ScrollView>
         
            </View>
          
       </View>
            
       
    )
}
export default BajaLocacion