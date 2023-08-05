import React, { useEffect, useRef } from "react";
import { ComponentCardItemUrl } from "../../../../components/colacetItem";

export function TabsItemsCardsU(props){
    const {dataac={
            favIconUrl: "https://res.cloudinary.com/dhxefh3r2/image/upload/v1689703655/zo3smzqslh5bm3idmrml.ico",
            id: 679377726,
            title: "Instituto Nacional de Estadistica e Informatica",
            url: "https://m.inei.gob.pe/prensa/noticias/poblacion-ocupada-del-pais-alcanzo-los-17-millones-120-mil-personas-en-el-ano-2021-13492/#:~:text=El%20INEI%20inform%C3%B3%20que%20el,activamente%20empleo%20en%20el%20pa%C3%ADs.",
            width: 1920,
            windowId: 679377625
        }, 
        onUpdate={}, 
        onDelect={} } = props;
    const refeditcont = useRef();
    const refviewtarea = useRef();
    

    useEffect(()=>{
        // evitar que las palabras grandes interfieran con el texto
    },[])

    const recorUrl = (url) => {
        let urlAux = url;
        if(urlAux.length > 25){
            urlAux = url.substring(0, 24) + '....'
        }
        return urlAux
    }

    return (
        <>
            {/*  style={{backgroundColor: "blue"}} */}
            <div>
                <ComponentCardItemUrl urlIcon={`${dataac.favIconUrl}`} onChange={(id, stade)=>{

                    // window.open(dataac.urlconte, '_blank');
                    refviewtarea.current.click();
                }} label={dataac.title.replaceAll("_"," ").replaceAll("-"," ")} url={recorUrl(dataac.url)} >
                    {/* <ComponentItemSecionActions onClickActions={()=>{refeditcont.current.click();}} colorIon={"#9686C3"} Icont={EditOutlined} />
                    <ComponentItemSecionActions onClickActions={async ()=>{
                        await onEliminarActiv();
                        await onDelect();
                    }} colorIon={"#9686C3"} Icont={DeleteOutlined} /> */}
                </ComponentCardItemUrl>
                <div style={{marginBottom: '4px'}}/>
            </div>
        </>
    );
}