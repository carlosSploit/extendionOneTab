import { DetectedPosition } from "../../../components/detectedposition";
import { useDispatch, useSelector } from "react-redux";
import { deleteAllSelectGroup, isContainerSelectDisable, isContainerSelectEnable } from "../../../redux/slice/internal/selecteGroup";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
// import { TabsItemsCards } from "../../contenedorTabs/components/tabs/Card";
import { ForminputBotton } from "../../../components/inputsLabels";
import { importGrou } from "../../../redux/slice/negocio/urlSend";
// import { Componentsearch } from "../../../components/searchImput";
import { RightOutlined } from "@ant-design/icons";
import "./style.css";
import { ItemGroupSelected } from "./components/Card";

export function ListImportGroup(props){
    
    const [isCloseImport, setisCloseImport] = useState(false);
    const [listGroupSel, setlistGroupSel] = useState(null);
    const UrlData = useSelector(state => state.group.posts)
    const SelectGroup = useSelector(state => state.sGroup);
    const listGroupSelected = useSelector(state => state.sGroup.groups)
    const dispatch = useDispatch();
    const useRefContainer = useRef();

    useEffect(()=>{
        // console.log(UrlData)
        (async ()=>{
            console.log('Ingresando nuevos datos')
            setlistGroupSel(null)
            setTimeout(()=>{
                setlistGroupSel(listGroupSelected)
            },500)
        })();
        // en caso que aya una incercion o eliminacion, se dara una recarga de los datos de manera automatica
    },[listGroupSelected])

    // si la importacion lo presenta grupos seleccionados, no ejecuta
    // pero si presenta, carga todos los prupos ingresados

    const importarGrupo = ()=>{
        const listData = [...listGroupSelected]
        if (listGroupSelected.length <= 0) return
        const dataPyload = {listdataGroup: listData, state: UrlData}
        dispatch(importGrou(dataPyload));
        dispatch(deleteAllSelectGroup());
    }

    const ItemsGroupSelected = () =>{
        return (<div className="component_listImporG_body_item">
            <div className="component_listImporG_itemS_cont"></div>
        </div>)
    }

    return (((isCloseImport || SelectGroup.selected.length > 0 || SelectGroup.groups.length > 0))?
    <DetectedPosition onMouseMoveCapture={()=>{
            // console.log("Abilitando el estado...")
            dispatch(isContainerSelectEnable())
            // console.log(stadeInsertGroup)
        }} onMouseLeave={()=>{
            // console.log("Desabilitando el estado...")
            dispatch(isContainerSelectDisable())
            // console.log(stadeInsertGroup)
        }} >
        <div ref={useRefContainer} class="contain_selec_group_insert">
            <div className="container_url_header">
                <div className="container_url_header_subcontainer" >
                    <div className="container_tabs_back" onClick={()=>{
                        setisCloseImport(false);
                        dispatch(deleteAllSelectGroup());
                    }}>
                        <RightOutlined className="container_listImporG_back_icons" />
                    </div>
                    <div className="url_titleOptions">Importar Grupo</div>
                </div>
            </div>
            {(SelectGroup.groups.length <= 0)?
            <div className="container_tabs_listGroupS_url_contV">
                <div className="container_tabs_listGroupS_url_vacio">
                    <div>Arrastra el grupo aqui</div>
                </div>
            </div>:
            <div className="container_tabs_listGroupS_url">
                <div className="container_tabs_listGroupS_subContent">
                    {(listGroupSel != null)?
                    listGroupSel.map((item,index)=>{
                        return <ItemGroupSelected 
                            isRecorter={false} dataac={{
                            favIconUrl: "",
                            id: item.igG,
                            title: item.nameG,
                            url: `El grupo presenta ${item.tabsItems.length} links`,
                            width: 0,
                            windowId: 0
                        }} /> 
                    }):<></>}
                    {(SelectGroup.selected != null)?
                    SelectGroup.selected.map((item,index)=>{
                        return <ItemsGroupSelected /> 
                    }):<></>}
                    {/* <ItemsGroupSelected />  */}
                </div>
            </div>}
            <div className="container_tabs_listGroupS_foot">
                <ForminputBotton label={"Importar"} onChange={importarGrupo} ></ForminputBotton>    
            </div>
        </div>
        {/* <div ref={useRefContainer} className="contain_selec_group_insert">
        </div> */}
    </DetectedPosition>:<></>) ;
}