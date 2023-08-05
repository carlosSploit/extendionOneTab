import { useEffect, useState } from "react";
import "./index.css";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
// import { TabsItemsU } from "../tabs";
import { Componentcolapset, ComponentcolapsetBody, ComponentcolapsetHeader } from "../../../components/colacetItem";
import { TabsItemsU } from "../tabs";
import { ComponentItemSecionActions } from "../../../components/colaceItemSecion";
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
                {/* 
                <ComponentItemSecionActions onClickActions={async () => {
                    await eliminaritem();
                    setTimeout(() => {
                        (async ()=>{
                            await onClickActions();
                        })();
                    }, 500);
                }} Icont={DeleteOutlined}/>
                <div style={{width:"5px"}} /> */}
            </ComponentcolapsetHeader>
            <ComponentcolapsetBody stateOcult={iscollapset}>
                <div style={{height:"10px"}}/>
                {
                    (listcontsess != null)?
                    listcontsess.map((item)=>{
                        return <TabsItemsU dataac={item} />;
                    })
                    :<></>
                }
                <div style={{height:"10px"}}/>
                {/* <div className="componet-colapse-footer">
                    <div className="componet-colapse-footer-bott"
                        onClick={()=>{
                        }}
                    >
                        Agregar un Contenido
                    </div>
                </div> */}
            </ComponentcolapsetBody>
        </Componentcolapset>
    )
}