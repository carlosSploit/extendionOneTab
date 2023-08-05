import { RightOutlined } from "@ant-design/icons";
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

    const loadDataScrupp = async () => {
       const result = await getDataFromWebPag()
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
                        <Forminput></Forminput>
                        <div style={{height:"5px"}}></div>
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
                            await loadDataScrupp();
                        }else{
                            onAddUrlGroup()
                        }
                    }} ></ForminputBotton>
                </form>
            </div>
        </div>
    </div>);
}