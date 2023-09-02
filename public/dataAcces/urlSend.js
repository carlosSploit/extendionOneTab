/*global chrome*/
// import {cleanHistoryTab} from './dataAcces/memoriAcces.js'


const CODE_MEMORI = 'urlData'

export const addInsert = async (data=[]) => {
    console.log(data)
    const formatData = {}
    formatData[CODE_MEMORI] = JSON.stringify(data)
    try {
        await chrome.storage.local.set(formatData);
        return true;
    } catch (error) {
        console.log("error: ",error)
    }
}


export const getUrl = async () => {
    const data = await chrome.storage.local.get([CODE_MEMORI]);
    if (data != undefined){
        const dataList = JSON.parse(data.urlData)
        console.log(dataList)
        return dataList
    }
    return []
}

/* se tentra que pasar por cada uno de los tabs, y comprobar si el tab corresponde al tab abierto.
   si corresponde se concatenara el historial, se actualizara la url actual, y se actualizara la
   informacion de la tab segun la nueva url.
   si no corresponde solo se deja pasar al siguiente
*/

const importUrlSendTab = async (listTabsGroups = [], infoMemoriA = {}) => {
    const auxListTabsGroup = [...listTabsGroups]
    const auxInfoMemoriA = {...infoMemoriA}
    const newListDataInfoTab = await Promise.all(auxListTabsGroup.map(async (itemM)=>{
        const infotTab = {...itemM}
        if (infotTab.id == auxInfoMemoriA.idT){
            const historyTabInt = auxInfoMemoriA['historUrl']
            const historyData = [...infotTab['historUrl']];
            if (historyTabInt.length <= 0) return infotTab;
            // en caso que el primera posicion sea igual que la ultima, se intentara hacer una eliminacion para evitar una duplicidad
            if (historyData[historyData.length - 1] == historyTabInt[0]){
                historyTabInt.shift()
            }
            const newHistoryTab = historyData.concat(historyTabInt)
            infotTab['historUrl'] = newHistoryTab;
            // cargar la nueva informacion segun el nuevo historial
            const urlFinal = newHistoryTab[newHistoryTab.length - 1]
            infotTab['url'] = urlFinal
            return infotTab
            // await cleanHistoryTab(infotTab);
        }
        return infotTab
    }))
    return newListDataInfoTab
}

const importUrlSendGroup = async (infoMemoriA = [], ListUrlSend = []) => {
    const dataTabInfo = {...infoMemoriA}
    const listDataInfoGroup = [...ListUrlSend]
    const newListMemoriA = await Promise.all(listDataInfoGroup.map(async (item) => {
        const infoGroup = {...item}
        if (infoGroup.igG == dataTabInfo.idG){
            const listTabsGroups = infoGroup['tabsItems']
            const newListDataInfoTab = await importUrlSendTab(listTabsGroups, infoMemoriA)
            infoGroup['tabsItems'] = newListDataInfoTab
            return infoGroup;
        }
        return infoGroup
    }))
    return newListMemoriA
}

export const importMemActAndUrlSend = async (dataMemoriA, idTab) => {
    const ListMemoriA = [...dataMemoriA]
    const infoMemoriA = ListMemoriA.filter((item)=>item.idTab == idTab)[0]
    const ListUrlSend = await getUrl()
    try {
        // capturar el tab y actualiza el historial ingresando el url
        const newListMemoriA = await importUrlSendGroup(infoMemoriA,ListUrlSend)
        return newListMemoriA
        // await addInsert(newListMemoriA)
        // await cleanHistoryTab()
    } catch (error) {
        console.log("error: ",error)
    }
}