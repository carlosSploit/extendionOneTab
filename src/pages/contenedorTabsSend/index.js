/*global chrome*/
import { useState } from "react"
import "./style.css"
// import { FileAddOutlined, FolderAddOutlined } from "@ant-design/icons";
import { ListUrlViews } from "./listTabsViews";

export function ContenedorTabsSend(props) {
    const {onAddTabsView = (stadeActionA)=>{}} = props;
    const [stadeActionA, setstadeActionA ] = useState(false)
    
    const stadeAction = async ()=>{
        setstadeActionA(!stadeActionA)
        onAddTabsView(stadeActionA);
    }
    
    
    return (
        // <div className="container_information">
        //     <div className="container_header">
        //         <div className="container_header_subcontainer" >
        //             <div className="titleOptions">Lista de links</div>
        //             <div className="container_actioncenter">
        //                 <div className="botton_actions children">
        //                     <FolderAddOutlined className="component_bottons_actions_icon" />
        //                 </div>
        //                 <div onClick={stadeAction} className="container_icon children">
        //                     <FileAddOutlined className="component_bottons_actions_icon" />
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>
        <ListUrlViews onAddUrl={stadeAction}></ListUrlViews>
    );
}