// import { Componentsearch } from "../../../../components/searchImput";
// import { ItemsTabs } from "../itemtabs";
// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import { useEffect, useState } from "react";
// import { Componentsearch } from "../../../components/searchImput";
import { FileAddOutlined, FolderAddOutlined,CloseOutlined } from "@ant-design/icons";
// import { TabsItemsU } from "../tabs";
import { Forminput, ForminputBotton, ForminputComboBox } from "../../../components/inputsLabels";
import { v4 as uuidv4} from 'uuid';
import { addGroup, deleteGroup, getdata, updateGrou } from "../../../redux/slice/negocio/urlSend";
import { ItemsGroups } from "../itemtabs";
// import { deleteAllSelectGroup, isContainerSelectDisable, isContainerSelectEnable } from "../../../redux/slice/internal/selecteGroup";
// import { DetectedPosition } from "../../../components/detectedposition";
// import { TabsItemsCards } from "../../contenedorTabs/components/tabs/Card";
import { ListImportGroup } from "../listImportGroup";
import { getMemoriA, importMemActAndUrlSend } from "../../../bd/memoriActualize";
// import { TabsItemsU } from "../tabs";

export function ListUrlViews(props) {
    const {onClosetab = (stade)=>{}, onAddUrl=(stade)=>{}} = props;
    const [listcontsess, setlistcontsess] = useState(null);
    const [objElimGroup, setobjElimGroup] = useState(null);
    const [objEditGroup, setobjEditGroup] = useState(null);
    const [textNameGroup, settextNameGroup] = useState("");
    const [isAddGroup, setisAddGroup] = useState(false);
    const [isEditGroup, setisEditGroup] = useState(false);
    const [isElimnGroup, setisElimnGroup] = useState(false);
    const [textColorGroup, settextColorGroup] = useState("");
    const [listColor, setListColor] = useState([
        {id:1,label:"gris"},
        {id:2,label:"red"},
        {id:3,label:"yellow"},
        {id:4,label:"green"},
        {id:5,label:"blue"},
        {id:6,label:"cyan"},
        {id:7,label:"orange"},
    ]);
    const UrlData = useSelector(state => state.group.posts)
    const UrlState = useSelector(state => state.group.status)
    const dispatch = useDispatch();

    useEffect(()=>{
        (async ()=>{
            if((UrlState == 'loadingA')||(UrlState == 'idile')){
                console.log('Actualizando datos')
                dispatch(getdata())
            }
        })();
    // en caso que aya una incercion o eliminacion, se dara una recarga de los datos de manera automatica
    },[UrlState,dispatch])

    useEffect(()=>{
        // console.log(UrlData)
        (async ()=>{
            if(UrlState == 'succeeded'){
                console.log('Ingresando nuevos datos')
                setlistcontsess(null)
                setTimeout(()=>{
                    setlistcontsess(UrlData)
                },500)
            }
        })();
        // en caso que aya una incercion o eliminacion, se dara una recarga de los datos de manera automatica
    },[UrlState,UrlData])

    // se intenta dar una actualizacion de los tabs por primera vez
    useEffect(()=>{
        // console.log(UrlData)
        (async ()=>{
            const listData = await getMemoriA()
            // if (listData.length > 0){
            //     await importMemActAndUrlSend()
            // }
        })();
        // en caso que aya una incercion o eliminacion, se dara una recarga de los datos de manera automatica
    },[UrlState,UrlData])

    const ingresarUnGrupo = ()=>{
        // console.log("Ingresado correctamente")
        const v4Id = uuidv4();
        const objGroup = {nameG: textNameGroup,colorG: textColorGroup,igG: v4Id,tabsItems: []}
        dispatch(addGroup(objGroup));
        dispatch(getdata());
        setisAddGroup(false);
    }

    const actualGrupo = ()=>{
        // console.log("Ingresado correctamente")
        const dataPyload = {idGroup: objEditGroup.igG, dataGroup: {nameG:textNameGroup, colorG:textColorGroup}, state: UrlData}
        dispatch(updateGrou(dataPyload));
        dispatch(getdata());
        setisEditGroup(false);
    }

    const eliminarGrupo = ()=>{
        // console.log("Ingresado correctamente")
        const dataPyload = {idGroup: objElimGroup.igG, state: UrlData}
        dispatch(deleteGroup(dataPyload));
        dispatch(getdata());
        setisElimnGroup(false);
    }


    const strackKeyColor = (color) => {
        if(color == "") return listColor[0].id
        console.log(color)
        return listColor.filter((item)=>{return item.label == color})[0].id
    }


    return  (
    <div class="container_url_tabs">
        <div className="container_url_header">
                <div className="container_url_header_subcontainer" >
                    <div className="url_titleOptions">Lista de links</div>
                    <div className="container_url_actioncenter">
                        <div onClick={()=>{
                            setisAddGroup(!isAddGroup)
                        }} className="botton_url_actions children">
                            <FolderAddOutlined className="component_url_bottons_actions_icon" />
                        </div>
                        <div onClick={onAddUrl} className="container_url_icon children">
                            <FileAddOutlined className="component_url_bottons_actions_icon" />
                        </div>
                    </div>
                </div>
            </div>
        <div className="container_tabs_listItems_url">
            <div className="container_tabs_listItems_subContent">
                {(listcontsess != null)?
                listcontsess.map((item,index)=>{
                    return <ItemsGroups isEditGroupInfo={(stade, idGroupEd) => {
                        // se intenta limpiar las pociciones
                        setobjEditGroup(null);
                        setisEditGroup(false);
                        // se carga la informacion del item o grupo que desea una edicion
                        const dataGroup = UrlData.filter((item)=>{return item.igG == idGroupEd})[0]
                        console.log(dataGroup)
                        setobjEditGroup(dataGroup)
                        // settextNameGroup(dataGroup.nameG);
                        setTimeout(()=>{
                            setisEditGroup(stade);
                        },500)
                    }} isElimGroupInfo={(stade, idGroupEd) => {
                        // se intenta limpiar las pociciones
                        setobjElimGroup(null);
                        setisElimnGroup(false);
                        // se carga la informacion del item o grupo que desea una edicion
                        const dataGroup = UrlData.filter((item)=>{return item.igG == idGroupEd})[0]
                        setobjElimGroup(dataGroup)
                        // // settextNameGroup(dataGroup.nameG);
                        setTimeout(()=>{
                            setisElimnGroup(stade);
                        },500)
                    }} data={item}/>
                }):<></>}
            </div>
        </div>
        {/* agregar un grupo */}
        {(isAddGroup)?<div className="container_tabs_addItem">
            <form className="container_tabs_addItem_form">
                <div className="container_tabssend_back" onClick={()=>{
                    setisAddGroup(false);
                }}>
                    <CloseOutlined className="container_tabssend_back_icons" />
                </div>
                <div style={{height: '24px'}} />
                <Forminput textinput={textNameGroup} settextinput={settextNameGroup} placeHolder={"Nombre del Grupo"} />
                <ForminputComboBox datacombo={listColor} onChangeinput={(json)=>{
                        //console.log(value,"/",label);
                        settextColorGroup(json.label);
                }} ></ForminputComboBox>
                <div style={{height: "5px"}} />
                <ForminputBotton onChange={ingresarUnGrupo} ></ForminputBotton>
            </form>
        </div>:<></>}
        {/* editar un grupo */}
        {(isEditGroup & objEditGroup != null)?<div className="container_tabs_addItem">
            <form className="container_tabs_addItem_form">
                <div className="container_tabssend_back" onClick={()=>{
                    setisEditGroup(false);
                }}>
                    <CloseOutlined className="container_tabssend_back_icons" />
                </div>
                <div style={{height: '24px'}} />
                <Forminput valueInit={objEditGroup.nameG} textinput={textNameGroup} settextinput={settextNameGroup} placeHolder={"Nombre del Grupo"} />
                <ForminputComboBox valueInit={strackKeyColor(objEditGroup.colorG)} datacombo={listColor} onChangeinput={(json)=>{
                        //console.log(value,"/",label);
                        settextColorGroup(json.label);
                }} ></ForminputComboBox>
                <div style={{height: "5px"}} />
                <ForminputBotton onChange={actualGrupo} ></ForminputBotton>
            </form>
        </div>:<></>}
        {/* eliminar la television */}
        {(isElimnGroup & objElimGroup != null)?<div className="container_tabs_addItem">
            <form className="container_tabs_addItem_form">
                <div className="container_tabssend_back" onClick={()=>{
                    setisElimnGroup(false);
                }}>
                    <CloseOutlined className="container_tabssend_back_icons" />
                </div>
                <div style={{height: '24px'}} />
                <div className="container_tanbsend_inform">{`Estas seguro que deseas eliminar el grupo ${objElimGroup.nameG}. Ya que cuenta con ${objElimGroup.tabsItems.length} links agregados.`} </div>
                <div style={{height: "15px"}} />
                <ForminputBotton onChange={eliminarGrupo} ></ForminputBotton>
            </form>
        </div>:<></>}
        <ListImportGroup></ListImportGroup>
    </div>
    )
}