import { useEffect, useRef, useState } from "react";
import "./index.css";
import { ImportOutlined } from "@ant-design/icons";
// import { TabsItems } from "../tabs";
import { Componentcolapset, ComponentcolapsetBody, ComponentcolapsetHeader } from "../../../../components/colacetItem";
import { TabsItems } from "../tabs";
import { ComponentItemSecionActions } from "../../../../components/colaceItemSecion";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4} from 'uuid';
import { importGrou } from "../../../../redux/slice/negocio/urlSend";
// import useLongPress from "../../../../hooks/useLongClick";
import { addGroupImport, addSelectGroup, deleteSelectGroup } from "../../../../redux/slice/internal/selecteGroup";
import { TabsItemsCards } from "../tabs/Card";
import { ItemsArrastred } from "../../../../components/itemArrastred";

export function ItemsTabs(props) {
    const {
        data = {
            nameG: "Links Sueltos",
            colorG: "grey",
            igG: -1,
            tabsItems: []
        }
    } = props;
    const [iscollapset, setiscollapse] = useState(false);
    const [isstadeInsertGroup, setisstadeInsertGroup] = useState(false);
    const [listcontsess, setlistcontsess] = useState([]);
    // const [positionMouse, setpositionMouse] = useState({ x: 0, y: 0 });
    const UrlData = useSelector(state => state.group.posts)
    const stadeInsertGroup = useSelector(state => state.sGroup.status)
    const dispatch = useDispatch();

    useEffect(()=>{
        (async()=>{
            console.log(data)
            setlistcontsess(data.tabsItems)
        })();
    },[])

    useEffect(()=>{
        (async()=>{
            setisstadeInsertGroup(stadeInsertGroup)
        })();
    },[stadeInsertGroup])

    // window.addEventListener('mousemove', (event) => {
    //     const mousePos = { x: event.clientX, y: event.clientY };
    //     setpositionMouse(mousePos)
    // });

    // const importarGrupo = ()=>{
    //     const v4Id = uuidv4();
    //     const dataGroup = {nameG: data.nameG ,colorG: data.colorG ,igG: v4Id,tabsItems: data.tabsItems}
    //     const dataPyload = {listdataGroup: [dataGroup], state: UrlData}
    //     dispatch(importGrou(dataPyload));
    // }

    return (
        <div style={{width: "100%"}} >
            <Componentcolapset>
                <ItemsArrastred 
                    onSelectedItem = {() => {
                        dispatch(addSelectGroup(data));
                    }}
                    onSoltarItem = {() => {
                        if (stadeInsertGroup == 'isDisable'){
                            console.log(isstadeInsertGroup)
                            dispatch(deleteSelectGroup(data.igG));
                            return;
                        }
                        dispatch(addGroupImport(data));
                        dispatch(deleteSelectGroup(data.igG));
                    }}
                    contentArrastred = {<TabsItemsCards 
                        isRecorter={false} 
                        dataac={{
                            favIconUrl: "",
                            id: `${data.igG}`,
                            title: `${data.nameG}`,
                            url: `El grupo presenta ${data.tabsItems.length} links`,
                            width: 0,
                            windowId: 0
                        }} 
                    />} 
                >
                    <ComponentcolapsetHeader colorB="#232138" colorT="white" oncollapset={(stade)=>{
                        setiscollapse(stade);
                    }} label={data.nameG} >
                        {/* <ComponentItemSecionActions onClickActions={importarGrupo} Icont={ImportOutlined} /> */}
                    </ComponentcolapsetHeader>
                </ItemsArrastred>
                <ComponentcolapsetBody stateOcult={iscollapset}>
                    <div style={{height:"10px"}}/>
                    {
                        (listcontsess != null)?
                        listcontsess.map((item)=>{
                            return <TabsItems dataac={item} />;
                        })
                        :<></>
                    }
                    <div style={{height:"10px"}}/>
                </ComponentcolapsetBody>
            </Componentcolapset>
        </div>
    )
}