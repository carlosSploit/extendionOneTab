/*global chrome*/
import { RightOutlined,PlusOutlined } from "@ant-design/icons";
import { Componentsearch } from "../../../../components/searchImput";
import { ItemsTabs } from "../itemtabs";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./style.css";

export function ListTabsViews(props) {
    const {onClosetab = (stade)=>{}, onAddUrl=(stade)=>{}} = props;
    const [listcontsess, setlistcontsess] = useState(null);
    const [listTabsSelected, setListTabsSelected] = useState([]);
    const tabsState = useSelector(state => state.tabs)

    useEffect(()=>{
        (async()=>{
            setListTabsSelected(tabsState);
        })();
    // en caso que aya una incercion o eliminacion, se dara una recarga de los datos de manera automatica
    },[tabsState])

    useEffect(()=>{
        (async ()=>{
            await getCurrentTab()
        })();
    },[])

    const getGroupByTab = async(tabs = [])=>{
        return tabs.reduce((group, tabs) => {
            const { groupId } = tabs;
            group[groupId] = group[groupId] ?? [];
            delete tabs.groupId
            // comprobar si tiene un faviicon
            const listKeysTab = Object.keys(tabs)
            if (listKeysTab.indexOf('favIconUrl') == -1){
                tabs['favIconUrl'] = "https://res.cloudinary.com/dhxefh3r2/image/upload/v1689703655/zo3smzqslh5bm3idmrml.ico";
            }
            group[groupId].push(tabs);
            return group;
        }, {});
    }

    const extracInformationGroup = async (listKeysGroup, listgroupInfo)=>{
        return await Promise.all(listKeysGroup.map(async(keyGroup,idex)=>{
            // console.log(keyGroup)
            if (keyGroup != '-1'){
                const tabIn = await chrome.tabGroups.get(parseInt(keyGroup));
                const objAux = {
                    nameG: tabIn.title,
                    colorG: tabIn.color,
                    igG: tabIn.id,
                    tabsItems: listgroupInfo[keyGroup]
                }
                return objAux
            }
            return {
                nameG: "Links Sueltos",
                colorG: "grey",
                igG: -1,
                tabsItems: listgroupInfo[keyGroup]
            }
        }))
    }

    const getCurrentTab = async()=>{
        // Caprutar la informacion de los grupos
        const tabs = await chrome.tabs.query({currentWindow: true })
        const groupsTabs = await getGroupByTab(tabs)
        const listKeysGroup = Object.keys(groupsTabs)
        const listInfoGroup = await extracInformationGroup(listKeysGroup, groupsTabs)
        console.log(listInfoGroup)
        setlistcontsess(listInfoGroup)
    }

    return  (
    <div class="container_tabs">
        <div className="container_tabs_header">
            <div className="container_tabs_title">Tabs abiertos</div>
            <div style={{height: "10px"}}></div>
            <div className="container_tabs_search">
                <Componentsearch colorBack={"#181429"} />
            </div>
            <div className="container_tabs_back" onClick={()=>{
                onClosetab(false);
            }}>
                <RightOutlined className="container_tabs_back_icons" />
            </div>
        </div>
        <div className="container_tabs_listItems">
            <div className="container_tabs_listItems_subContent">
                {(listcontsess != null)?
                listcontsess.map((item,index)=>{
                    return <ItemsTabs data={item}/>
                }):<></>}
            </div>
        </div>
        <div onClick={()=>{
            onAddUrl(true)
        }} className="container_tabs_bottons" style={{backgroundColor: `${(listTabsSelected.length > 0)?"#F29A2E":"#9C5EF2"}`}} >
            <PlusOutlined className="container_tabs_add_icons" />
        </div>
    </div>
    )
}