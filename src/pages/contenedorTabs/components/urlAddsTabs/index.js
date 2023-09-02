import { FacebookFilled, FolderAddOutlined, RightOutlined, ScanOutlined } from "@ant-design/icons";
import { Forminput, ForminputBotton, ForminputComboBox } from "../../../../components/inputsLabels";
import { TabsItemsCards } from "../tabs/Card";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import "./style.css";
import { addUrlGroup, getdata } from "../../../../redux/slice/negocio/urlSend";
import { getDataFromWebPag } from "../../../../bd/scrupp";

export function UrlAddsTabs(props) {
    const {onClosetab = (stade)=>{}} = props;
    const [listTabsSelected, setListTabsSelected] = useState([]);
    const tabsState = useSelector(state => state.tabs)
    // deteccion de grupos existentes
    const [idGroup, setidGroup] = useState(27384932);
    const [textUrlLoad, setTextUrlLoad] = useState('');
    const [urlLoad, setUrlLoad] = useState(null);
    const [listGroup, setListGroup] = useState([
        {id:0,label:"Generico"}
    ]);
    const UrlDataS = useSelector(state => state.group)
    const UrlData = useSelector(state => state.group.posts)
    const dispatch = useDispatch();

    useEffect(()=>{
        (async()=>{
            const dataGroupSel = UrlData.map((item)=>{
                return {id:item.igG,label:item.nameG}
            })
            dataGroupSel.unshift({id:0,label:"Default"})
            setListGroup(dataGroupSel)
            setListTabsSelected(tabsState);
        })();
    },[])

    const onAddUrlGroup = () => {
        const dataPyload = {idGroup: idGroup, listUrl: tabsState, state: UrlData}
        dispatch(addUrlGroup(dataPyload));
        onClosetab(false);
    }

    const onAddUrlGroupLoader = () => {
        const dataPyload = {idGroup: idGroup, listUrl: [urlLoad], state: UrlData}
        dispatch(addUrlGroup(dataPyload));
        onClosetab(false);
    }


    const loadDataScrupp = async () => {
        console.log('Ingresando a insertar')
        const result = await getDataFromWebPag(textUrlLoad)
        console.log(result)
        setUrlLoad(result)
        // const dataPyload = {idGroup: idGroup, listUrl: [], state: UrlData}
    }

    return (<div className="container_tabs">
        <div className="container_tabs_header_info">
            <div className="container_tabs_title">Add Pagina</div>
            <div className="container_tabs_back" onClick={()=>{
                onClosetab(false);
            }}>
                <RightOutlined className="container_tabs_back_icons" />
            </div>
        </div>
        <div className="container_tabs_listItems">
            <div className="container_tabs_listItems_subContent">
                <form className="container_tabs_formulari">
                    <ForminputComboBox datacombo={listGroup} onChangeinput={(json)=>{
                        //console.log(value,"/",label);
                        setidGroup(json.value);
                    }} ></ForminputComboBox>
                    {(listTabsSelected.length == 0)?<>
                        <div className="container_tabs_formulari_inputs_urlLoad">
                            <div className="container_tabs_formulari_inputs_urlLoad_inputL">
                                <Forminput
                                    placeHolder = {'Ingresa el url a escanear....'}
                                    isTotalContent = {true}
                                    textinput = {textUrlLoad}
                                    settextinput = {setTextUrlLoad}
                                />
                            </div>
                            <div className="container_tabs_formulari_inputs_urlLoad_BottonL">
                                <div onClick={ async ()=>{
                                    await loadDataScrupp();
                                }} className="container_tabs_formulari_inputs_urlLoad_BottonL_A">
                                    <ScanOutlined className="container_tabs_formulari_inputs_urlLoad_BottonL_icon" />
                                </div>
                            </div>
                        </div>
                        {/* <div style={{height:"5px"}}></div>
                        <ForminputBotton isInvertColor={true} label={'Cargar URL'} onChange={async ()=>{
                            
                        }} ></ForminputBotton> */}
                        <div style={{height:"5px"}}></div>
                        {(urlLoad != null)?
                        <div className="container_tabs_formulari_tabs">
                               <TabsItemsCards dataac={urlLoad} /> 
                        </div>:((textUrlLoad == "")?<div className="container_tabs_load_prev">Presione en escanear</div>:<></>)}
                    </>:<>
                        <div style={{height:"5px"}}></div>
                        {listTabsSelected.map((item)=>{
                            return (<div className="container_tabs_formulari_tabs">
                               <TabsItemsCards dataac={item} /> 
                            </div>)
                        })}
                    </>}
                    <div style={{height:"5px"}}></div>
                    <ForminputBotton onChange={async ()=>{
                        if (listTabsSelected.length == 0){
                            onAddUrlGroupLoader();
                        }else{
                            onAddUrlGroup()
                        }
                    }} ></ForminputBotton>
                </form>
            </div>
        </div>
    </div>);
}