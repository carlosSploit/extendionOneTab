import { InfoOutlined, CloseOutlined } from "@ant-design/icons";
import React, { useEffect, useRef } from "react";
// import { ComponentcolapsetItem } from "../../../../components/colacetItem";
import { useDispatch, useSelector } from "react-redux";
// import { addTask, deleteTask } from "../../../../redux/tabsUrl";
import { ComponentcolapsetItem } from "../../../components/colacetItem";
import "./style.css";
import { deleteUrlGroup } from "../../../redux/slice/negocio/urlSend";
// import {  } from "../../../redux/urlSend";
// import { ComponentcolapsetItem } from "../../../components/colacetItem";
// import { ComponentItemSecionActions } from "../../../../components/colaceItemSecion";
// import { ComponentcolapsetItem, ComponentItemSecionActions } from "../../../../../../../../../../../../service/morvius-service/component/components";
// import { handleNewNotification, useNotification } from "../../../../../../../../../../../../service/Notifications/useNotificacion";
// import { deleteContentActiv } from "../../../../../../../../../../../../service/repository/Contenactiv";
// import { deleteContentSession } from "../../../../../../../../../../../../service/repository/Contensesion";
// import { EditContSession } from "../EditContSession/EditContSession";
export function TabsItemsU(props){
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
    // const refviewtarea = useRef();
    const UrlData = useSelector(state => state.group.posts)
    const dispatch = useDispatch() 
    // const tabsState = useSelector(state => state.tabs)
    // se encarga de ejecutar los eventos del redux


    useEffect(()=>{
        console.log()
        // evitar que las palabras grandes interfieran con el texto
    },[])

    const recorUrl = (url) => {
        let urlAux = url;
        if(urlAux.length > 25){
            urlAux = url.substring(0, 24) + '....'
        }
        return urlAux
    }

    // const isSelectetItem = () => {
    //     // return tabsState.filter((item) => item.id == dataac.id).length > 0
    //     return false
    // }

    return (
        <>
            <div>
                <ComponentcolapsetItem id={dataac.id} isSelector={false} urlIcon={`${dataac.favIconUrl}`} onChange={(id, stade)=>{
                    // refviewtarea.current.click();
                    const win = window.open(dataac.url, '_blank');
                    // Cambiar el foco al nuevo tab (punto opcional)
                    win.focus();
                }} label={dataac.title.replaceAll("_"," ").replaceAll("-"," ")} url={recorUrl(dataac.url)} >
                    <div className="Contenedor_actions_url_tabs">
                        <div className="url_tabs" style={{backgroundColor: '#9C5EF2'}}>
                            <InfoOutlined style={{color: "white", fontSize: "8px"}} />
                        </div>
                        <div onClick={()=>{
                            const dataPyload = {idGroup: dataac.idG, idUrlGroup: dataac.id, state: UrlData}
                            dispatch(deleteUrlGroup(dataPyload));
                        }} className="url_tabs" style={{backgroundColor: 'white', borderColor: '#9C5EF2', borderStyle: 'solid', borderWidth: '1px'}}>
                            <CloseOutlined style={{color: "#9C5EF2", fontSize: "8px"}} />
                        </div>
                    </div>
                </ComponentcolapsetItem>
                <div style={{marginBottom: '4px'}}/>
            </div>
        </>
    );
}