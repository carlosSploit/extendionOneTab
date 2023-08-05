import { configureStore } from "@reduxjs/toolkit";

import tabsReducer from "./slice/internal/tabsUrl";
import selectGroupReducer from "./slice/internal/selecteGroup";
import groupReducer from "./slice/negocio/urlSend";

export const store = configureStore({
  reducer: {
    tabs: tabsReducer,
    group: groupReducer,
    sGroup: selectGroupReducer
  }
});