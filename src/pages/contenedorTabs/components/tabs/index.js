// import { ReadOutlined } from "@ant-design/icons";
import React, { useEffect, useRef } from "react";
import { ComponentcolapsetItem } from "../../../../components/colacetItem";
import { useDispatch, useSelector } from "react-redux";
import { addTask, deleteTask } from "../../../../redux/slice/internal/tabsUrl";
// import { ComponentItemSecionActions } from "../../../../components/colaceItemSecion";
// import { ComponentcolapsetItem, ComponentItemSecionActions } from "../../../../../../../../../../../../service/morvius-service/component/components";
// import { handleNewNotification, useNotification } from "../../../../../../../../../../../../service/Notifications/useNotificacion";
// import { deleteContentActiv } from "../../../../../../../../../../../../service/repository/Contenactiv";
// import { deleteContentSession } from "../../../../../../../../../../../../service/repository/Contensesion";
// import { EditContSession } from "../EditContSession/EditContSession";
export function TabsItems(props){
    const {dataac={
            active: false,
            audible: false,
            favIconUrl: "https://res.cloudinary.com/dhxefh3r2/image/upload/v1689703655/zo3smzqslh5bm3idmrml.ico",
            autoDiscardable: true,
            discarded: false,
            height: 971,
            highlighted: false,
            id: 679377726,
            incognito: false,
            index: 101,
            mutedInfo: {muted: false},
            pinned: false,
            selected: false,
            status: "unloaded",
            title: "Instituto Nacional de Estadistica e Informatica",
            url: "https://m.inei.gob.pe/prensa/noticias/poblacion-ocupada-del-pais-alcanzo-los-17-millones-120-mil-personas-en-el-ano-2021-13492/#:~:text=El%20INEI%20inform%C3%B3%20que%20el,activamente%20empleo%20en%20el%20pa%C3%ADs.",
            width: 1920,
            windowId: 679377625
        }} = props;
    // const refeditcont = useRef();
    const refviewtarea = useRef();
    const dispatch = useDispatch() 
    const tabsState = useSelector(state => state.tabs)
    // se encarga de ejecutar los eventos del redux


    useEffect(()=>{
        // evitar que las palabras grandes interfieran con el texto
    },[])

    const recorUrl = (url) => {
        let urlAux = url;
        if(urlAux.length > 25){
            urlAux = url.substring(0, 24) + '....'
        }
        return urlAux
    }

    const isSelectetItem = () => {
        return tabsState.filter((item) => item.id == dataac.id).length > 0
    }

    return (
        <>
            <div>
                <ComponentcolapsetItem id={dataac.id} urlIcon={`${dataac.favIconUrl}`} stadeInit={isSelectetItem()} onChange={(id, stade)=>{
                    // window.open(dataac.urlconte, '_blank');
                    if(stade){
                        dispatch(addTask({
                            id: dataac.id,
                            favIconUrl: dataac.favIconUrl,
                            url: dataac.url,
                            title: dataac.title                 
                        }))
                    }else{
                        dispatch(deleteTask(dataac.id))
                    }
                    // refviewtarea.current.click();
                }} label={dataac.title.replaceAll("_"," ").replaceAll("-"," ")} url={recorUrl(dataac.url)} >
                </ComponentcolapsetItem>
                <div style={{marginBottom: '4px'}}/>
            </div>
        </>
    );
}