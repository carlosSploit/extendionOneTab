/*global chrome*/
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addInsert, addUrlG, getUrl,deleteUrlG, updateGroup, importGroup, eliminarGroup } from "../../../bd/urlsendbd";

const initialState = {
  posts: [],
  status: 'idile',
  error: null
};

export const getdata = createAsyncThunk('group/getdata', async () => {
  const data = await getUrl();
  // console.log(getdata)
  return data
});

export const addUrlGroup = createAsyncThunk('group/addUrlGroup', async (action) => {
  const payload = action;
  const data = action.state;
  const listUrlData = await addUrlG(data, payload)
  return listUrlData
});

export const importGrou = createAsyncThunk('group/importGroup', async (action) => {
  const payload = action;
  const data = action.state;
  const listUrlData = await importGroup(data, payload)
  return listUrlData
});

export const updateGrou = createAsyncThunk('group/updateGroup', async (action) => {
  const payload = action;
  const data = action.state;
  const listUrlData = await updateGroup(data, payload)
  return listUrlData
});

export const deleteGroup = createAsyncThunk('group/deleteGroup', async (action) => {
  const payload = action;
  const data = action.state;
  const listUrlData = await eliminarGroup(data, payload)
  return listUrlData
});


export const deleteUrlGroup = createAsyncThunk('group/deleteUrlGroup', async (action) => {
  const payload = action;
  const data = action.state;
  const listUrlData = await deleteUrlG(data, payload)
  return listUrlData
});

const userSlice = createSlice({
  name: "urlSend",
  initialState,
  reducers: {
    addGroup(state, action){
      state.posts.push(action.payload);
      addInsert(state.posts)
    }
  },
  extraReducers(builder){
    // console.log(getdata.pending)
    builder
      .addCase(getdata.pending,(state,action)=>{state.status= 'loading'})
      .addCase(getdata.fulfilled,(state,action)=>{
        state.status= 'succeeded';
        // console.log(action.payload)
        // console.log(state) 
        state.posts = action.payload 
      })
      .addCase(getdata.rejected,(state,action)=>{state.status= 'failed'; state.error = action.error.message})
    
    builder
      .addCase(addUrlGroup.pending,(state,action)=>{state.status= 'loadingA'}) // se coloca de esta manera para forzar la recarga de una accion que no sea la de listar
      .addCase(addUrlGroup.fulfilled,(state,action)=>{
        state.status= 'succeeded';
        console.log('###################################################################### Ingresado Grupo')
        console.log(action.payload)
        // console.log(state) 
        state.posts = action.payload 
      })
      .addCase(addUrlGroup.rejected,(state,action)=>{state.status= 'failed'; state.error = action.error.message})
    
    builder
      .addCase(updateGrou.pending,(state,action)=>{state.status= 'loadingA'}) // se coloca de esta manera para forzar la recarga de una accion que no sea la de listar
      .addCase(updateGrou.fulfilled,(state,action)=>{
        state.status= 'succeeded';
        console.log('###################################################################### Actualizar Grupo')
        console.log(action.payload)
        // console.log(state) 
        state.posts = action.payload 
      })
      .addCase(updateGrou.rejected,(state,action)=>{state.status= 'failed'; state.error = action.error.message})

    builder
      .addCase(deleteUrlGroup.pending,(state,action)=>{state.status= 'loadingA'}) // se coloca de esta manera para forzar la recarga de una accion que no sea la de listar
      .addCase(deleteUrlGroup.fulfilled,(state,action)=>{
        state.status= 'succeeded';
        console.log('##################################################################### Eliminar Grupo')
        console.log(action.payload)
        // console.log(state) 
        state.posts = action.payload 
      })
      .addCase(deleteUrlGroup.rejected,(state,action)=>{state.status= 'failed'; state.error = action.error.message})
    
    builder
      .addCase(importGrou.pending,(state,action)=>{state.status= 'loadingA'}) // se coloca de esta manera para forzar la recarga de una accion que no sea la de listar
      .addCase(importGrou.fulfilled,(state,action)=>{
        state.status= 'succeeded';
        console.log('###################################################################### importar Grupo')
        console.log(action.payload)
        // console.log(state) 
        state.posts = action.payload 
      })
      .addCase(importGrou.rejected,(state,action)=>{state.status= 'failed'; state.error = action.error.message})

    builder
      .addCase(deleteGroup.pending,(state,action)=>{state.status= 'loadingA'}) // se coloca de esta manera para forzar la recarga de una accion que no sea la de listar
      .addCase(deleteGroup.fulfilled,(state,action)=>{
        state.status= 'succeeded';
        console.log('###################################################################### Eliminar Grupo')
        console.log(action.payload)
        // console.log(state) 
        state.posts = action.payload 
      })
      .addCase(deleteGroup.rejected,(state,action)=>{state.status= 'failed'; state.error = action.error.message})
  }
});

export const { addGroup } = userSlice.actions;
export default userSlice.reducer;
export const selectPostById = (state, postId) =>
  state.posts.posts.find(post => post.id === postId)