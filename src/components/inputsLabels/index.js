import { useEffect, useState } from "react";
import "./style.css";
/**
 * <input para form de tipo text>
 * @param   {<string>} key <Id del input>
 * @param   {<string>} valueInit <Palabra de inicio de cada input>
 * @param   {<string>} placeHolder <Mensaje de gia de cada input>
 * @param   {<string>} Limitchar <Limite de caracteres de un textinput>
 * @param   {<string>} onValitador <Metodo que te permite validar el texto de entrada, si retorna true, sale un error>
 * @param   {<string>} messValidator <Mensaje de error cuando se ejecute el onValitado>
 * @param   {<string>} onChangeinput <Metodo que tiene como parametro el texto escrito en el input>
 * @param   {<string>} onValidFilter <Metodo que te permite hacer filtros a el texto que entra de parametro>
 * @return  {<type>}        <description>
 */

export function Forminput(props){
    // encabezados
    const [statetextinput, changesettextinput] = useState("");
    let {
    refMant,
    textinput = statetextinput,
    settextinput = changesettextinput,
    keyname="keyinputgeneric",
    onError=()=>{},
    valueInit= "",
    placeHolder = "name",
    isTotalContent = false,
    Limitchar = 999,
    onValitador=(textinput)=>{
        if(textinput === "") onError();
        return (textinput === "");
    }, 
    messValidator="Error. La casilla esta vacia.", 
    onChangeinput=(text)=>{
        //console.log(text);
    },
    onValidFilter=(text)=>{
        return text;
    }} = props;
    // estados del componentes
    //const [textinput, settextinput] = useState(valueInit);
    const [valuestade,setvaluestade] = useState(false);
    // const refInput = useRef();

    useEffect(()=>{
        settextinput(valueInit);
    },[]);

    return (
        <>
            {/* <div style={{height: "5px"}}/> */}
            <div className="form_conteiner" style={(isTotalContent)?{width: `100%`, marginLeft: '0px', marginRight: '0px'}:{width: `95%`, marginLeft: '20px', marginRight: '20px'}} > 
                <div className="form_input_conteiner"
                    style={{
                        borderColor:`${(!valuestade)?"#181426":"#f44336"}`
                    }}
                >
                    <input
                        className="form_input_text"
                        type="text"
                        ref={refMant}
                        id={`${keyname}`} 
                        name={`${keyname}`} 
                        key={`${keyname}`}
                        value={`${textinput}`}
                        // ref={refInput}
                        placeholder={placeHolder}
                        onBlur={()=>{
                            setvaluestade(onValitador(textinput));
                        }}
                        onChange={(e)=>{
                            let listchar = onValidFilter(e.target.value);
                            listchar = (listchar.length >= (Limitchar + 1))? listchar.substring(0,(Limitchar + 1)-1):listchar;
                            //settextinput(listchar);
                            settextinput(listchar);
                            //refInput.current.value = listchar;
                            onChangeinput(e.target.value);
                        }}
                    />
                </div>
            </div>
        </>
    );
}

/**
 * <input para form de tipo text>
 * @param   {<string>} key <Id del input>
 * @param   {<string>} valueInit <Palabra de inicio de cada input>
 * @param   {<string>} placeHolder <Mensaje de gia de cada input>
 * @param   {<string>} Limitchar <Limite de caracteres de un textinput>
 * @param   {<string>} onValitador <Metodo que te permite validar el texto de entrada, si retorna true, sale un error>
 * @param   {<string>} messValidator <Mensaje de error cuando se ejecute el onValitado>
 * @param   {<string>} onChangeinput <Metodo que tiene como parametro el texto escrito en el input>
 * @param   {<string>} onValidFilter <Metodo que te permite hacer filtros a el texto que entra de parametro>
 * @return  {<type>}        <description>
 */

export function ForminputComboBox(props){
    // encabezados
    const [statecheckbox, changesetcheckbox] = useState("");

    let {
    keyname="KeyComboBox",
    checkbox = statecheckbox,
    setcheckbox = changesetcheckbox,
    isdefault= false,
    iscompletautowith = false,
    valueInit= "",
    keyvalue= "id",
    keylabel= "label",
    datacombo=[{id:1,label:"tecnologia"},{id:2,label:"computer"},{id:3,label:"cultura"}],
    onChangeinput=(json)=>{
        //console.log(value,"/",label);
    }} = props;

    useEffect(()=>{
        if(isdefault){
            setcheckbox(0);
        }else{
            // setcheckbox(0);
            if(valueInit === ""){
                setcheckbox((datacombo[0])[keyvalue]);
            }else{
                setcheckbox(valueInit);
            }
        }
    },[]);
    // estados del componentes
    //const [checkbox, setcheckbox] = useState((isdefault)?"0":(valueInit === "")? (datacombo[0])[keyvalue] : valueInit);

    return (
        <>
            <div style={{height: "5px"}}/>
            <div className={`${(iscompletautowith)?"form_conteiner_max":"form_conteiner"}`}>
                <div className="form_input_ComboBox_conteiner">
                    <select className="form_input_ComboBox" name={`${keyname}`} id={`${keyname}`} value={checkbox} onChange={(e)=>{
                        setcheckbox(e.target.value);
                        // si la opccion de default esta activada
                        if(isdefault && e.target.value == "0"){
                            let json = {value:"0",label:"Default"};
                            onChangeinput(json);
                            return;
                        }else{  
                            let nameitem = datacombo.filter((item)=>{
                                return item[keyvalue] == e.target.value;
                            });
                            let json = {value:(nameitem[0])[keyvalue],label:(nameitem[0])[keylabel]};
                            onChangeinput(json);
                        }
                        //---------------------------------------
                    }} >
                        {(isdefault)?<option value={"0"}>Default</option>:<></>}
                        {datacombo.map((item)=>{
                            return <option value={`${item[keyvalue]}`}>{item[keylabel]}</option>;
                        })}
                    </select>
                </div>
            </div>
        </>
    );
}

/**
 * <input para form de tipo text>
 * @param   {<string>} key <Id del input>
 * @param   {<string>} valueInit <Palabra de inicio de cada input>
 * @param   {<string>} placeHolder <Mensaje de gia de cada input>
 * @param   {<string>} Limitchar <Limite de caracteres de un textinput>
 * @param   {<string>} onValitador <Metodo que te permite validar el texto de entrada, si retorna true, sale un error>
 * @param   {<string>} messValidator <Mensaje de error cuando se ejecute el onValitado>
 * @param   {<string>} onChangeinput <Metodo que tiene como parametro el texto escrito en el input>
 * @param   {<string>} onValidFilter <Metodo que te permite hacer filtros a el texto que entra de parametro>
 * @return  {<type>}        <description>
 */


export function ForminputBotton(props){
    const {label="Submit", onChange=()=>{}, isInvertColor = false} = props;

    return (
    <>
        <div className="form_conteiner" >
            <div onClick={()=>{
                onChange();
            }} className="form_submit_botton_container">
                <div className={(isInvertColor)?"form_submit_botton_invert":"form_submit_botton"}>
                    {label}
                </div>
            </div>
        </div>
    </>
    );
}