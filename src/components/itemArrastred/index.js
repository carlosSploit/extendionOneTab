import { useRef, useState } from "react";
import { TabsItemsCards } from "../../pages/contenedorTabs/components/tabs/Card";
import useLongPress from "../../hooks/useLongClick";
import { useMouse } from "../../hooks/useMouse";
// import { ImportOutlined } from "@ant-design/icons";
// import { TabsItems } from "../tabs";
// import { Componentcolapset, ComponentcolapsetBody, ComponentcolapsetHeader } from "../../../../components/colacetItem";
// import { TabsItems } from "../tabs";
// import { ComponentItemSecionActions } from "../../../../components/colaceItemSecion";
// import { useDispatch, useSelector } from "react-redux";
// import { v4 as uuidv4} from 'uuid';
// import { importGrou } from "../../../../redux/slice/negocio/urlSend";
// import useLongPress from "../../../../hooks/useLongClick";
// import { addGroupImport, addSelectGroup, deleteSelectGroup } from "../../../../redux/slice/internal/selecteGroup";
// import { TabsItemsCards } from "../tabs/Card";

export function ItemsArrastred(props) {
    const {
        onSelectedItem = () => {},
        onSoltarItem = () => {},
        contentArrastred = <TabsItemsCards 
            isRecorter={false} 
            dataac={{
                favIconUrl: "",
                id: 'sadsadsadsadasdasdas',
                title: 'asdsadasdasdasdasdasdasad',
                url: `El grupo presenta 0 links`,
                width: 0,
                windowId: 0
            }} 
        /> ,
        children
    } = props;
    const position = useMouse();
    const refGroupSelected = useRef();
    const refGroupSelectedP = useRef();

    const onLongPress = () => {
        // console.log("Ingresado Init")
        onSelectedItem();
        // dar la posicion inicial al container
        moviStart();
        moveAt(position.x,position.y);
    };

    const moviStart = () => {
        refGroupSelected.current.style.position = 'absolute';
        refGroupSelected.current.style.zIndex = 1000;
        refGroupSelected.current.style.display = 'block';
        // document.body.append(refGroupSelected);
    }
    
    const moviFinich = () => {
        refGroupSelected.current.style.position = 'relative';
        refGroupSelected.current.style.zIndex = 1;
        refGroupSelected.current.style.display = 'none';
        onSoltarItem();
        // document.body.append(refGroupSelected.current);
    }

    // centrar la pelota en las coordenadas (pageX, pageY)
    const moveAt = (pageX, pageY) => {
        refGroupSelected.current.style.left = pageX - refGroupSelected.current.offsetWidth / 2 + 'px';
        refGroupSelected.current.style.top = pageY - refGroupSelected.current.offsetHeight / 2 + 'px';
    }

    const onClick = () => {
        console.log('click is triggered')
    }

    const defaultOptions = {
        shouldPreventDefault: true,
        delay: 500,
    };

    const longPressEvent = useLongPress(onLongPress, onClick, defaultOptions);

    return (
        <div style={{width: "100%"}} >
            <div style={{width: "100%"}} onmousedown = 'return false' onselectstart = 'return false' {...longPressEvent} ref={refGroupSelectedP} >
                {children}
            </div>
            <div ref={refGroupSelected} onMouseMoveCapture={()=>{
                moveAt(position.x,position.y);
            }} onMouseUp = {()=>{
                moviFinich();
            }} style={{width: "88%", height: 'auto', display:"none", position: "relative", zIndex: '10px'}}>
                {contentArrastred}
            </div>
        </div>
    )
}