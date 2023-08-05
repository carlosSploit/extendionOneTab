import { UpOutlined } from "@ant-design/icons";
import { useState } from "react";
import "./style.css";

// component Item secion
export function ComponentItemSecionActions(props){
    const {colorIon= "white", Icont = UpOutlined, onClickActions = () =>{
        console.log("Teniendo Accion")
    }} = props;

    return(
        <div onClick={()=>{onClickActions()}} className="component_collaps_header_actioncolap">
            <Icont className="component_collapsItemSeccion_header_icon" style={{color: `${colorIon}`}} />
        </div>
    );
}

export function ComponentItemSecion(props){
    const {children, label="Title de chips", oncollapset = (stade) => {}, onClikchange=()=>{}} = props;
    const [stateOcult,setstateOcult] = useState(false);
    return (
        <>
            <div style={{height:"5px"}}/>
            <div className="component_collaps_content">
                <div className="component_collaps_header">
                    <div onClick={onClikchange} className="component_collaps_header_title">{label}</div>
                    {children}
                    {/* <div onClick={()=>{
                        setstateOcult(!stateOcult);
                        oncollapset(!stateOcult);
                    }} className="component_collaps_header_actioncolap">
                        {(!stateOcult)?
                            <DownOutlined className="component_collaps_header_icon" />:
                            <UpOutlined className="component_collaps_header_icon" />
                        }
                    </div> */}
                    <div style={{width:"10px"}} />
                </div>                
            </div>
        </>
    );
}