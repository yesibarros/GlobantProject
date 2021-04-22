import React, {useState, useEffect} from 'react'
import {View, Text, TouchableOpacity, FlatList, ActivityIndicator} from 'react-native'
import {IconButton} from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
//COLORS
import {primaryGreen} from "../../utils/Colors"

//STYLE
import styles from "./requestsStyle";
import { useTheme } from "@react-navigation/native";


//COMPONENTS
import TabBar from "../../routes/Tab/TabBar";
import RequestCard from "./RequestCard"
import Header from "../header/Header"
//REDUX
import {useDispatch, useSelector} from 'react-redux';
import {getRequests} from '../../state/requests/Thunks'; 

//UTILS


const Requests = ({navigation}) => {
  
    const [showReceived, setShowReceived] = useState(true)
    const [isLoading, setIsLoading] = useState(true)

    const { colors } = useTheme();
    const dispatch = useDispatch()
    const solicitudes = useSelector(state => state.requests)
    const user = useSelector(state => state.loggedUser.user)
    


    useEffect(() => {
      dispatch(getRequests()).then(() => {
        setIsLoading(false)
      })

    },[])

    const filteredRequests = showReceived ? solicitudes.filter(r => r?.to?._id === user._id) : solicitudes.filter(r => r?.to?._id !== user._id)

    if(isLoading){
      return(
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <ActivityIndicator
            size='large'
            color='blue'
          />
        </View>
      )
    }

    return (
      <View style={{backgroundColor: "#009387"}}>
        <Header navigation={navigation}/> 
      <View style={[styles.container, { backgroundColor: colors.background }]}>
     
        <View style={styles.titleContainer}>
          <Text style={[styles.title, {color: colors.text}]}>SOLICITUDES</Text>
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            onPress={() => {
              setShowReceived(true);
            }}
          >
            <Text style={[styles.buttons, showReceived && styles.underline, {color: colors.text}]}>
              RECIBIDAS
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setShowReceived(false);
            }}
          >
            <Text style={[styles.buttons, !showReceived && styles.underline, {color: colors.text}]}>
              ENVIADAS
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.cardsContainer}>
          {(filteredRequests.length != 0)
          ?
            <FlatList
              data={filteredRequests}
              keyExtractor={(request) => request._id}
              renderItem={request => (
                  <RequestCard request={request.item} received={showReceived} navigation={navigation}/>
              )}
            />
          :
            <View style={styles.n}>
              <Text style={styles.nText}>
                No tenes solicitudes {showReceived ? 'recibidas' : 'enviadas'}

              </Text>
            </View>
          }
        </View>
        
      </View>
        <TabBar  navigation={navigation} />
    
      </View>
    );
}

export default Requests
