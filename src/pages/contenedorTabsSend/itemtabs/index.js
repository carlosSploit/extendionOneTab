import { useEffect, useState } from "react";
import "./index.css";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
// import { TabsItemsU } from "../tabs";
import { Componentcolapset, ComponentcolapsetBody, ComponentcolapsetHeader } from "../../../components/colacetItem";
import { TabsItemsU } from "../tabs";
import { ComponentItemSecionActions } from "../../../components/colaceItemSecion";
import { addMemoriAUrlCallBack, getMemoriA, isInserTabsUrl } from "../../../bd/memoriActualize";
// import { Componentcolapset, ComponentcolapsetBody, ComponentcolapsetHeader } from "../../../../components/colacetItem";

export function ItemsGroups(props) {
    const {
        isEditGroupInfo = (stade, idGrop) => {} ,
        isElimGroupInfo = (stade, idGrop) => {} ,
        data = {
            nameG: "Links Sueltos",
            colorG: "grey",
            igG: -1,
            tabsItems: []
        }
    } = props;
    const [iscollapset, setiscollapse] = useState(false);
    const [listcontsess, setlistcontsess] = useState([]);

    useEffect(()=>{
        (async()=>{
            // console.log(data)
            setlistcontsess(data.tabsItems)
        })();
    },[])

    return (
        <Componentcolapset>
            <ComponentcolapsetHeader colorB="#232138" colorT="white" oncollapset={(stade)=>{
                setiscollapse(stade);
            }} label={data.nameG} >
                <ComponentItemSecionActions onClickActions={() => {
                    isEditGroupInfo(true,data.igG)
                }} Icont={EditOutlined} />
                <ComponentItemSecionActions onClickActions={()=>{
                    isElimGroupInfo(true,data.igG)
                }} Icont={DeleteOutlined} />
            </ComponentcolapsetHeader>
            <ComponentcolapsetBody stateOcult={iscollapset}>
                <div style={{height:"10px"}}/>
                {
                    (listcontsess != null)?
                    listcontsess.map((item)=>{
                        return <TabsItemsU 
                            dataac={item} 
                            onClickActionTabs = { async (tab)=>{
                                console.log(tab)
                                const isInsert = await isInserTabsUrl({idT: tab.idT, idTab: 0})
                                if (!isInsert) {
                                    await addMemoriAUrlCallBack(tab)
                                }
                                const listData = await getMemoriA()
                                console.log(listData)
                            }}
                        />;
                    })
                    :<></>
                }
                <div style={{height:"10px"}}/>
            </ComponentcolapsetBody>
        </Componentcolapset>
    )
}