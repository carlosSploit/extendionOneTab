/*global chrome*/
import {addMemoriAUrl,getMemoriA, getMemoriAUrl} from './dataAcces/memoriAcces.js'
import { importMemActAndUrlSend } from './dataAcces/urlSend.js'

// Metodos de edicion del local storage en segundo plano https://www.youtube.com/watch?v=vc_4QgNVsac
// const script = document.createElement('script');
// script.setAttribute("type", "module");
// script.setAttribute("src", chrome.runtime.getURL('dataAcces/memoriAcces.js'));
// console.log(src)
// chrome.scripting
// .executeScript({
//   target : {tabId : },
//   func : changeBackgroundColor,
//   args : [ getUserColor() ],
// })
// .then(() => console.log("injected a function"));
// const contentMaint = await import(src)

// Metodos de escucha del segundo plano

const callback = async (tabId, changeInfo, tab) => {
    await addMemoriAUrl({idTab:tabId, Url: tab.url})
    const datosActu = await getMemoriAUrl(tabId)
    const listData = await getMemoriA()
    const data = await importMemActAndUrlSend(listData,tabId)
    chrome.scripting.executeScript({
        target : {tabId : tabId},
        func : (addMemoriA)=>{
            console.log(addMemoriA.datosActu)
            console.log(addMemoriA.dataS)
            console.log(addMemoriA.listData)
            // console.log('list: ',listData)
        },
        args : [ {datosActu: datosActu, dataS: data, listData: listData} ]
    })
}

const callbackR = async (tabId, removeInfo) => {
    // await deleteMemoriAUrl({idTab:tabId})
}

chrome.tabs.onUpdated.addListener(callback)
chrome.tabs.onRemoved.addListener(callbackR)