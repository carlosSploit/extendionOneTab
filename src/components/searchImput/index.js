import { SearchOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import "./style.css";

export function Componentsearch(props){

    const {
        colorBack = "#181429",
        onChangekey = (search) => {
            //console.log(search);
        },
        onChangeseach = (search) =>{
            console.log(search);
        },
        height = "25px"
    } = props;
    const [changseach,setchangseach] = useState("");
    const [changWigth,setchangeWigth] = useState(0);
    const refcontainer = useRef();

    useEffect(()=>{
        setchangeWigth(refcontainer.current.clientWidth);
    });

    return (
        <>
            <div style={{height:"5px"}} />
            <div ref={refcontainer} className="component_content">
                <div className="component_search_containert" style={{height:height, borderColor: `${colorBack}`}}>
                    <input
                        className="component_search_input"
                        style={{width: `${(()=>{
                            // console.log(changWigth);
                            // refcontainer.current.clientWidth
                            return changWigth - 50;
                        })()}px`}}
                        type="text" 
                        value={changseach}
                        onChange={(e)=>{
                            onChangekey(e.target.value);
                            setchangseach(e.target.value);
                        }} 
                    />
                    <div className="component_search_boton_seach" onClick={()=>{
                        onChangeseach(changseach);
                    }}>
                        <SearchOutlined className="component_search_boton_seach_icon" style={{color: colorBack}} />
                    </div>
                </div>
            </div>
        </>
    );
}