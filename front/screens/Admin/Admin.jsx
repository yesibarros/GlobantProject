import * as React from 'react';
import { List } from 'react-native-paper';
import {View, Modal} from "react-native"
import {useSelector} from "react-redux"
import TabBar from "../../routes/Tab/TabBar"
import styles from "./adminStyle"
import AltaModal from "./Alta/Alta"
import ModificacionModal from "./Modificacion/Modificacion"
import BorrarModal from "./Baja/Baja"

const MyComponent = ({navigation}) => {
  const [expanded, setExpanded] = React.useState(true);
  const loginUser= useSelector(state => state.loggedUser.user)
  const handlePress = () => setExpanded(!expanded);
  const [name, setName] = React.useState("")
  const [viewModal, setViewModal] = React.useState(false)
  const [viewModModal, setViewModModal] = React.useState(false)
  const [viewDelModal, setViewDelModal] = React.useState(false)

  return (
    <View style={{flex:1}}>
    <List.Section title="Panel de administración">
      <List.Accordion
        title="Areas"
        left={props => <List.Icon {...props} icon="laptop" />}>
        
        <List.Item title="Alta" onPress={()=>{ 
          setName("area")
          setViewModal(true)}}/>
        <List.Item title="Modificación" onPress={()=> {
          setName("area")
          setViewModModal(true)}}/>
        <List.Item title="Baja" onPress={()=> {
          setName("area")
          setViewDelModal(true)}}/>
      </List.Accordion>

      <List.Accordion
        title="Tecnologías"
        left={props => <List.Icon {...props} icon="wrench-outline" />}>
        <List.Item title="Alta" onPress={()=> {
          setName("tecnologia")
          setViewModal(true)}}/>
        <List.Item title="Modificación" onPress={()=> {
          setName("tecnologia")
          setViewModModal(true)}} />
        <List.Item title="Baja" onPress={()=> {
          setName("tecnologia")
          setViewDelModal(true)}}/>
      </List.Accordion>

      <List.Accordion
        title="Países"
        
        left={props => <List.Icon {...props} icon="flag-variant-outline" />}>
        <List.Item title="Alta" onPress={()=> {
          setName("país")
          setViewModal(true)}}/>
        <List.Item title="Modificación" onPress={()=> {
          setName("país")
          setViewModModal(true)}}/>
        <List.Item title="Baja" onPress={()=> {
          setName("país")
          setViewDelModal(true)}} />
      </List.Accordion>

      <List.Accordion
        title="Locaciones"
     
        left={props => <List.Icon {...props} icon="map-marker" />}>
        <List.Item title="Alta" onPress={()=> {
          setName("locación")
          setViewModal(true)}} />
        <List.Item title="Modificación" onPress={()=> {
          setName("locación")
          setViewModModal(true)}}/>
        <List.Item title="Baja" onPress={()=> {
          setName("locación")
          setViewDelModal(true)}} />
      </List.Accordion>
      
    </List.Section>
    {viewModal ? <AltaModal viewModal={viewModal} nombre={name} setViewModal={setViewModal}/> : null}
    {viewModModal ? <ModificacionModal viewModModal={viewModModal} nombre={name} setViewModModal={setViewModModal}/> : null}
    {viewDelModal ? <BorrarModal viewDelModal={viewDelModal} nombre={name} setViewDelModal={setViewDelModal}/> : null}
    <TabBar navigation={navigation} />
    </View>
  );
};

export default MyComponent;