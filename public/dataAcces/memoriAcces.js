/*global chrome*/

const CODE_MEMORI_ACTUALIZ = 'urlDataAct'

export const getMemoriA = async () => {
    const data = await chrome.storage.local.get([CODE_MEMORI_ACTUALIZ]);
    if (data[CODE_MEMORI_ACTUALIZ] != undefined) return JSON.parse(data[CODE_MEMORI_ACTUALIZ])
    return []
}

export const getMemoriAUrl = async (idTab) => {
    const listMemoriA = await getMemoriA()
    const meroriA = listMemoriA.filter((item)=>{ return item.idTab == idTab})
    if (meroriA.length <= 0) return  {idTab : 0}
    return meroriA[0]
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

export const addMemoriAUrl = async (data = {idTab:'', Url:''}) => {
    const formatData = {...data}
    const ListMemoriA = await getMemoriA()
    if (ListMemoriA.length <= 0) return
    // formatData[CODE_MEMORI_ACTUALIZ] = JSON.stringify(data)
    try {
        // capturar el tab y actualiza el historial ingresando el url
        const newListMemoriA = ListMemoriA.map((item)=>{
            const dataTabInfo = {...item}
            // si el igual al tab y grupo.
            if ((dataTabInfo.idTab == formatData.idTab)){
                const ListHistoryUrl = [...dataTabInfo['historUrl']];
                if (ListHistoryUrl[ListHistoryUrl.length - 1] != formatData.Url){
                    ListHistoryUrl.push(formatData.Url);
                    dataTabInfo['historUrl'] = ListHistoryUrl;
                }
                return dataTabInfo;
            }
            return dataTabInfo;
        })
        await addMemoriA(newListMemoriA)
    } catch (error) {
        console.log("error: ",error)
    }
}

export const deleteMemoriAUrl = async (data = {idTab:'', Url:''}) => {
    const formatData = {...data}
    const ListMemoriA = await getMemoriA()
    if (ListMemoriA.length <= 0) return
    try {
        // capturar el tab y actualiza el historial ingresando el url
        const newListMemoriACompr = ListMemoriA.filter((item)=>{
            return item.idTab != formatData.idTab
        })
        if (newListMemoriACompr.length > 0){
            const InfoMemoriACompr = {...newListMemoriACompr[0]}
            const listHistoryTab = [...InfoMemoriACompr['historUrl']]
            if (listHistoryTab.length > 0){
                // hacer la eliminacion del tab abierto
                const newListMemoriA = ListMemoriA.filter((item)=>{
                    return item.idTab != formatData.idTab
                })
                await addMemoriA(newListMemoriA)
                return;
            }
            const newListMemoriA = ListMemoriA.filter((item)=>{
                return item.idTab != formatData.idTab
            })
            await addMemoriA(newListMemoriA)
        }
    } catch (error) {
        console.log("error: ",error)
    }
}

export const cleanHistoryTab = async (idT = 0) => {
    const ListMemoriA = await getMemoriA()
    try {
        // capturar el tab y actualiza el historial ingresando el url
        if (idT == 0){
            const newListMemoriA = ListMemoriA.map((item)=>{
                const dataTabInfo = {...item}
                // si el igual al tab y grupo.
                dataTabInfo['historUrl'] = [];
                return dataTabInfo;
            })
            await addMemoriA(newListMemoriA) 
            return;
        }

        const newListMemoriA = ListMemoriA.map((item)=>{
            const dataTabInfo = {...item}
            if(idT == item.idT) {
                // si el igual al tab y grupo.
                dataTabInfo['historUrl'] = [];
            }
            return dataTabInfo;
        })
        await addMemoriA(newListMemoriA)  
        
    } catch (error) {
        console.log("error: ",error)
    }
}

// module.exports = {
//     //configmysql: mysqlconnet(mysql, dbopccion, config.bd.mysql.tipeOption),
//     getMemoriA : getMemoriA, // para que las respuestas se den en json
//     addMemoriA : addMemoriA, // ayuda a ver las peticiones en log de lo que se envia al servidor
//     addMemoriAUrl: addMemoriAUrl
// }