import { useEffect, useState } from "react";


export function useMouse(callback=(e)=>{}) {
    const [positionMouse, setpositionMouse] = useState({ x: 0, y: 0 });

    useEffect(()=>{

        const handler = (event) => {
            callback(event);
            const mousePos = { x: event.clientX, y: event.clientY };
            setpositionMouse(mousePos)
        }

        window.addEventListener('mousemove', handler);

        return () => window.removeEventListener('mousemove', handler);
    },[])

    return positionMouse
}   