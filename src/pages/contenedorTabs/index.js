/*global chrome*/
import { useState} from "react";
// import { Componentsearch } from "../../components/searchImput";
// import { ItemsTabs } from "./components/itemtabs";
import "./style.css"
// import { RightOutlined } from "@ant-design/icons";
// import { Forminput, ForminputBotton, ForminputComboBox } from "../../components/inputsLabels";
// import { TabsItemsCards } from "./components/tabs/Card";
// import { useSelector } from "react-redux";
// import { UrlAddsTabs } from "./components/urlAddsTabs";
import { ListTabsViews } from "./components/listTabsViews";
import { UrlAddsTabs } from "./components/urlAddsTabs";

export function ContenedorTabs(props) {
    const {onClosetab = (stade)=>{}} = props
    const [viewInterface, setviewInterface] = useState(false)
    // const [listcontsess, setlistcontsess] = useState(null);

    // useEffect(()=>{
    //     (async ()=>{
    //         await getCurrentTab()
    //     })();
    // },[])

    // const getGroupByTab = async(tabs = [])=>{
    //     return tabs.reduce((group, tabs) => {
    //         const { groupId } = tabs;
    //         group[groupId] = group[groupId] ?? [];
    //         delete tabs.groupId
    //         // comprobar si tiene un faviicon
    //         const listKeysTab = Object.keys(tabs)
    //         if (listKeysTab.indexOf('favIconUrl') == -1){
    //             tabs['favIconUrl'] = "https://res.cloudinary.com/dhxefh3r2/image/upload/v1689703655/zo3smzqslh5bm3idmrml.ico";
    //         }
    //         group[groupId].push(tabs);
    //         return group;
    //     }, {});
    // }

    // const extracInformationGroup = async (listKeysGroup, listgroupInfo)=>{
    //     return await Promise.all(listKeysGroup.map(async(keyGroup,idex)=>{
    //         console.log(keyGroup)
    //         if (keyGroup != '-1'){
    //             const tabIn = await chrome.tabGroups.get(parseInt(keyGroup));
    //             const objAux = {
    //                 nameG: tabIn.title,
    //                 colorG: tabIn.color,
    //                 igG: tabIn.id,
    //                 tabsItems: listgroupInfo[keyGroup]
    //             }
    //             return objAux
    //         }
    //         return {
    //             nameG: "Links Sueltos",
    //             colorG: "grey",
    //             igG: -1,
    //             tabsItems: listgroupInfo[keyGroup]
    //         }
    //     }))
    // }

    // const getCurrentTab = async()=>{
    //     // Caprutar la informacion de los grupos
    //     const tabs = await chrome.tabs.query({currentWindow: true })

    //     const groupsTabs = await getGroupByTab(tabs)
    //     const listKeysGroup = Object.keys(groupsTabs)

    //     const listInfoGroup = await extracInformationGroup(listKeysGroup, groupsTabs)
    //     console.log(listInfoGroup)
    //     setlistcontsess(listInfoGroup)
    // }

    return (
        (!viewInterface)?<ListTabsViews onAddUrl={(stade)=>{
                setviewInterface(stade);
            }} onClosetab={(stade)=>{
                onClosetab(stade);
            }} />
        :
        <UrlAddsTabs onClosetab={(stade)=>{
            setviewInterface(false);
        }} />
    );
}