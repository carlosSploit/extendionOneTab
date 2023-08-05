import { createSlice } from "@reduxjs/toolkit";

const initialState = [
//   {
//     id: 679377726,
//     favIconUrl: "https://res.cloudinary.com/dhxefh3r2/image/upload/v1689703655/zo3smzqslh5bm3idmrml.ico",
//     url: "https://m.inei.gob.pe/prensa/noticias/poblacion-ocupada-del-pais-alcanzo-los-17-millones-120-mil-personas-en-el-ano-2021-13492/#:~:text=El%20INEI%20inform%C3%B3%20que%20el,activamente%20empleo%20en%20el%20pa%C3%ADs.",
//     title: "Instituto Nacional de Estadistica e Informatica"
//   }
];

const userSlice = createSlice({
  name: "tabs",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.push(action.payload);
    },
    deleteTask: (state, action) => {
      const foundTask = state.find((task) => task.id === action.payload);
      if (foundTask) {
        state.splice(state.indexOf(foundTask), 1);
      }
    },
  },
});

export const { addTask, deleteTask } = userSlice.actions;
export default userSlice.reducer;