/*global chrome*/
import { CODE_MEMORI_ACTUALIZ } from "../Config/varials";
import { getDataFromWebPag } from "./scrupp";
import { addInsert, getUrl } from "./urlsendbd";

export const getMemoriA = async () => {
    const data = await chrome.storage.local.get([CODE_MEMORI_ACTUALIZ]);
    console.log(data)
    console.log(data[CODE_MEMORI_ACTUALIZ])
    if (data[CODE_MEMORI_ACTUALIZ] != undefined) return JSON.parse(data[CODE_MEMORI_ACTUALIZ])
    return []
}

export const addMemoriA = async (data) => {
    const formatData = {}
    formatData[CODE_MEMORI_ACTUALIZ] = JSON.stringify(data)
    try {
        await chrome.storage.local.set(formatData);
        return true;
    } catch (error) {
        console.log("error: ",error)
    }
}

export const addMemoriAUrlCallBack = async (data = {idTab:'', idT:'', idG:'', historUrl:[]}) => {
    const formatData = {...data}
    const ListMemoriA = await getMemoriA()
    // formatData[CODE_MEMORI_ACTUALIZ] = JSON.stringify(data)
    try {
        ListMemoriA.push(formatData)
        console.log(formatData)
        console.log(ListMemoriA)
        await addMemoriA(ListMemoriA)

    } catch (error) {
        console.log("error: ",error)
    }
}


export const addMemoriAUrl = async (data = {idTab:'', Url:''}) => {
    const formatData = {...data}
    const ListMemoriA = await getMemoriA()
    // formatData[CODE_MEMORI_ACTUALIZ] = JSON.stringify(data)
    try {
        // capturar el tab y actualiza el historial ingresando el url
        const newListMemoriA = ListMemoriA.map((item)=>{
            const dataTabInfo = {...item}
            // si el igual al tab y grupo.
            if ((dataTabInfo.idTab == formatData.idTab)){
                const ListHistoryUrl = [...dataTabInfo['historUrl']];
                ListHistoryUrl.push(formatData.Url);
                dataTabInfo['historUrl'] = ListHistoryUrl;
                return dataTabInfo;
            }
            return dataTabInfo;
        })
        await addMemoriA(newListMemoriA)
    } catch (error) {
        console.log("error: ",error)
    }
}

export const isInserTabsUrl = async (data = {idTab: 0, idT: 0}) => {
    const ListMemoriA = await getMemoriA()
    console.log(ListMemoriA.length <= 0)
    if (ListMemoriA.length <= 0) return false
    const boolen = await new Promise(async (resolve, reject)=>{
        let listDataInfoGroup = []
        if (data.idTab != 0) {
            listDataInfoGroup = ListMemoriA.filter((itemF) => {return data.idTab == itemF.idTab})
            console.log(listDataInfoGroup)
        }else{
            listDataInfoGroup = ListMemoriA.filter((itemF) => {return data.idT == itemF.idT})
        }
        if (listDataInfoGroup.length > 0) {
            resolve(true); 
            console.log(false)
            console.log("El tab que desea ingresar ya existe")
            return;
        }
        resolve(false);
        return;
    })
    return boolen
} 

/*

{
    igG: 0,
    nameG: '',
    colorG: '',
    tabsItems: [
        {
            favIconUrl : '',
            title: '',
            url: '',
            historUrl: [],
            id: '',
            idG: ''
        }
    ]
}

*/

const importUrlSendTab = async (listTabsGroups = [], ListUrlSend = []) => {
    const newListDataInfoTab = await new Promise.all(listTabsGroups.map(async (itemM)=>{
        const infotTab = {...itemM}
        const listDataInfoTab = ListUrlSend.filter((itemF)=>{
            return (infotTab.id == itemF.idT) && (infotTab.idG == itemF.idG)
        })
        if(listDataInfoTab.length > 0){
            const historyData = {...listDataInfoTab[0]};
            // si por a o b motivo, tubo que abrir un tab y luego se importa, 
            // el historial queda en 0, lo cual ya no hay un historial como tal
            if (historyData.length <= 0) return infotTab;
            const historyTab = [...infotTab['historUrl']];
            const newHistoryTab = historyTab.concat(historyData)
            infotTab['historUrl'] = newHistoryTab;
            const urlFinal = newHistoryTab[newHistoryTab.length - 1]
            infotTab['url'] = urlFinal
            const objUrlScrip = await getDataFromWebPag(urlFinal)
            infotTab['title'] = objUrlScrip.title
            infotTab['favIconUrl'] = objUrlScrip.favIconUrl
            return infotTab
        }
        return infotTab
    }))
    return newListDataInfoTab
}

const importUrlSendGroup = async (ListMemoriA = [], ListUrlSend = []) => {
    const newListMemoriA = await new Promise.all(ListMemoriA.map(async (item)=>{
        const dataTabInfo = {...item}
        const listDataInfoGroup = ListUrlSend.filter((itemF) => {return dataTabInfo.igG == itemF.idG})
        // si el igual al tab y grupo.
        if (listDataInfoGroup.length >= 0){
            const listTabsGroups = dataTabInfo['tabsItems']
            const newListDataInfoTab = await importUrlSendTab(listTabsGroups,ListUrlSend)
            dataTabInfo['tabsItems'] = newListDataInfoTab
            return dataTabInfo;
        }
        return dataTabInfo;
    }))
    return newListMemoriA
}

const cleanHistoryTab = async () => {
    const ListMemoriA = await getMemoriA()
    try {
        // capturar el tab y actualiza el historial ingresando el url
        const newListMemoriA = ListMemoriA.map((item)=>{
            const dataTabInfo = {...item}
            // si el igual al tab y grupo.
            dataTabInfo['historUrl'] = [];
            return dataTabInfo;
        })
        await addMemoriA(newListMemoriA)
    } catch (error) {
        console.log("error: ",error)
    }
}

export const importMemActAndUrlSend = async () => {
    const ListMemoriA = await getMemoriA()
    const ListUrlSend = await getUrl()
    try {
        // capturar el tab y actualiza el historial ingresando el url
        const newListMemoriA = await importUrlSendGroup(ListMemoriA,ListUrlSend)
        await addInsert(newListMemoriA)
        await cleanHistoryTab()
    } catch (error) {
        console.log("error: ",error)
    }
}