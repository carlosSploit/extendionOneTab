import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "isDisable",// isEnable isDisable
  selected:[],
  groups:[],
  urls:[]
};

const userSlice = createSlice({
  name: "selecGroup",
  initialState,
  reducers: {
    addSelectGroup: (state, action) => {
      state.selected.push(action.payload);
    },
    addGroupImport: (state, action) => {
      console.log(action.payload)
      state.groups.push(action.payload);
    },
    isContainerSelectEnable: (state,) => {
      state.status = "isEnable";
    },
    isContainerSelectDisable: (state,) => {
      state.status = "isDisable";
    },
    deleteSelectGroupImport: (state, action) => {
      let foundTask = state.groups.filter((task) => task.igG != action.payload);
      if (!Array.isArray(foundTask)) foundTask = {}
      state.groups = foundTask;
    },
    deleteSelectGroup: (state, action) => {
      let foundTask = state.selected.filter((task) => task.igG != action.payload);
      if (!Array.isArray(foundTask)) foundTask = {}
      state.selected = foundTask;
    },
    deleteAllSelectGroup: (state,) => {
      state.groups = [];
      state.selected = [];
    },
  },
});

export const { addSelectGroup, addGroupImport, deleteSelectGroup, deleteSelectGroupImport, isContainerSelectEnable, isContainerSelectDisable, deleteAllSelectGroup } = userSlice.actions;
export default userSlice.reducer;