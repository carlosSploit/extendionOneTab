/*global chrome*/
export const addInsert = async (data=[]) => {
    console.log(data)
    try {
        await chrome.storage.local.set({ urlData: JSON.stringify(data) });
        return true;
    } catch (error) {
        console.log("error: ",error)
    }
}

export const getUrl = async () => {
    const data = await chrome.storage.local.get(['urlData']);
    console.log(data)
    if (data != undefined) return JSON.parse(data.urlData)
    return []
}

export const updateGroup = async (data, payload) => {
    const {idGroup, dataGroup = {nameG:'', colorG:''}} = payload;
    const newData = data.map((item)=>{
        const groupObjet = {...item}
        if (groupObjet.igG == idGroup){
            groupObjet['nameG'] = dataGroup.nameG
            groupObjet['colorG'] = dataGroup.colorG
            return groupObjet
        }
        return groupObjet
    })
    await addInsert(newData)
    return newData
}

export const eliminarGroup = async (data, payload) => {
    const {idGroup} = payload;
    const newData = data.filter((item)=>{  
        console.log(item)
        return item.igG != idGroup })
    await addInsert(newData)
    return newData
}

const formatGroup = (infoGroups = []) => {
    const newinfoGroups = infoGroups.map((item)=>{
        const groupinfo = {...item}
        const listUrl = groupinfo.tabsItems
        const auxListUrl = listUrl.map((item)=>{
            return {
                favIconUrl : item.favIconUrl,
                title: item.title,
                url: item.url,
                historUrl: [item.url],
                id: getRandomIntInclusive(),
                idG: groupinfo.igG
            }
        });
        groupinfo['tabsItems'] = auxListUrl;
        console.log("informacion de grupo ", groupinfo)
        return groupinfo;
    });
    return newinfoGroups;
}

export const importGroup = async (data, payload) => {
    
    let newData = [...data];
    // console.log("lista de datos capturados ",newData)
    const infoGroups = [...payload.listdataGroup]
    // console.log("informacion a ingresar ", infoGroups);
    const newinfoGroups = formatGroup(infoGroups);

    if (newData.length <= 0){
        // console.log("Informacion a insertar :", newinfoGroups)
        await addInsert(newinfoGroups);
        return newinfoGroups
    }
    // console.log("Informacion a insertar :", newinfoGroups)
    newData = newData.concat(newinfoGroups);
    // console.log("nuevo array creado :",newData)
    await addInsert(newData);
    return newData
}

function getRandomIntInclusive(min = 1, max = 999999999) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export const addUrlG = async (data, payload) => {
    console.log(data)
    const newData = data.map((item)=>{
        const groupObjet = {...item}
        if (groupObjet.igG == payload.idGroup){
            // const keyUrlItem = payload.listUrl.map(item => item.id)
            console.log(groupObjet)
            const listUrlItems = item.tabsItems
            console.log(listUrlItems)
            // si la lista no presenta items
            if (listUrlItems.length == 0){
                const listUrl = payload.listUrl.map((item)=>{
                    const auxObj = {...item};
                    auxObj.idG = payload.idGroup
                    auxObj['historUrl'] = [auxObj.url]
                    auxObj['id'] = getRandomIntInclusive()
                    return auxObj
                })
                groupObjet.tabsItems = item.tabsItems.concat(listUrl)
                return groupObjet
            }
            // se detecta que items ya estan ingresados segun el id
            // comprobamos si en realdad se parece uno de los items con otro.
            const simitudDataInfo = listUrlItems.filter((item, index) => {
                const keyObj = Object.keys(item)
                console.log(keyObj)
                console.log(item)
                // se comprueba si la pagina o la url ya se ingreso antes y se comprueba toda la informacion a posterior
                const datosCom = payload.listUrl.filter((objC) => objC.url == item.url)
                // si no hay una url igual, pasa de largo.
                if (datosCom.length == 0) return false
                const datosComA = datosCom[0]
                // se captura las los datos si son iguales por estado: true - si es valido, false - no es igual
                const stateDatosVal = keyObj.map((itemV)=>{
                    if (itemV == 'id') return true
                    if (itemV == 'historUrl') return true
                    if (itemV == 'idG') return true
                    return datosComA[itemV] == item[itemV]
                })
                console.log(stateDatosVal)
                // teniendo encuena la lista de estados, se intenta aser una operacion (AND) para determinar si hay una simulitud en todo.
                const stadeG = stateDatosVal.reduce((accu, current)=>{
                    const curr = current
                    const acumu = accu
                    return curr & acumu
                },true)
                // ya que se iso la operacion AND 
                return stadeG
            });

            console.log(simitudDataInfo)
            // si esque si se parecen, se ovia el dato nuevo y se queda con el existente e con los otros que no se parescan.
            if (simitudDataInfo.length > 0){
                const keySimil = simitudDataInfo.map(item => item.url)
                const datosComS = payload.listUrl.filter((objC) => keySimil.indexOf(objC.url) == -1)
                const listUrl = datosComS.map((item)=>{
                    const auxObj = {...item};
                    auxObj.idG = payload.idGroup
                    auxObj['historUrl'] = [auxObj.url]
                    auxObj['id'] = getRandomIntInclusive()
                    return auxObj
                })
                groupObjet['tabsItems'] = item.tabsItems.concat(listUrl)
                return groupObjet
            }
            // si no se parece, se replica el proceso, con la diferencia que no se obia nada
            const listUrl = payload.listUrl.map((item)=>{
                const auxObj = {...item};
                auxObj.idG = payload.idGroup
                auxObj['historUrl'] = [auxObj.url]
                auxObj['id'] = getRandomIntInclusive()
                return auxObj
            })
            groupObjet['tabsItems'] = item.tabsItems.concat(listUrl)
            return groupObjet
        }
        return groupObjet
    })
    await addInsert(newData)
    return newData
}

export const deleteUrlG = async (data, payload) => {
    const {idGroup, idUrlGroup} = payload;
    console.log(idGroup,' ',idUrlGroup)
    const newData = data.map((item)=>{
        const groupObjet = {...item}
        if (groupObjet.igG == idGroup){
            // const keyUrlItem = payload.listUrl.map(item => item.id)
            console.log(groupObjet)
            const listUrlItems = item.tabsItems
            console.log(listUrlItems)
            // si la lista no presenta items
            if (listUrlItems.length == 0) return groupObjet
            const datosComS = listUrlItems.filter((objC) => objC.id != idUrlGroup)
            groupObjet['tabsItems'] = datosComS
            return groupObjet
        }
        return groupObjet
    })
    await addInsert(newData)
    return newData
}