import { createAsyncThunk } from "@reduxjs/toolkit";
import * as SecureStore from "expo-secure-store";

import axios from "axios";

import localHost from "../../localHostIp";

export const getObjectives = createAsyncThunk("GET_OBJECTIVE", (data) => {
  return SecureStore.getItemAsync("token").then((token) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    return axios
      .get(`http://${localHost}/api/objectives`, {
        params: {
          _id: data,
        },
      })
      .then((respuesta) => {
        return respuesta.data});
  });
});

export const sendObjective = createAsyncThunk("SEND_OBJECTIVE", (data) => {
  return SecureStore.getItemAsync("token").then((token) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    return axios
    //NECESITAMOS ENVIAR ID DEL MENTOR Y MENTEE, TITULO DE OBJETIVO Y DESCRIP
      .post(`http://${localHost}/api/objectives`, data)
      .then((respuesta) => respuesta.data);
  });
});

export const updateObjective = createAsyncThunk("UPDATE_OBJECTIVE", (data) => {

  const obj = {
    status: data.status,
    feedback: data.feedback
  }
  
  return SecureStore.getItemAsync("token").then((token) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    return axios
    //NECESITAMOS ENVIAR ID DEL MENTOR Y MENTEE, TITULO DE OBJETIVO Y DESCRIP
      .put(`http://${localHost}/api/objectives/${data.id}`, obj)
      .then((respuesta) => {console.log(respuesta.data) 
        return respuesta.data});
  });
});