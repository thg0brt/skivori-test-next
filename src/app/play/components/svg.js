import { useEffect, useState } from "react";

export default function displaySvg({svgName}){

    const [svgContent, setSvgContent] = useState("");

    useEffect(() => {
        fetch(svgName +".svg")
        .then((response) => response.text())
        .then((svg) => setSvgContent(svg));
    }, [svgName]);

    return (
        <div className="svgSize" dangerouslySetInnerHTML={{ __html: svgContent }} />
    );
}