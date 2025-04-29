import { useEffect, useState } from "react";

interface displaySvgProps {
    svgName: string
}

export default function DisplaySvg({svgName}: displaySvgProps){

    //UseState for the svgContent
    const [svgContent, setSvgContent] = useState("");

    //When svgName changes, fetch the .svg icon file and inject the SVG into the HTML.
    useEffect(() => {
        fetch(svgName +".svg")
        .then((response) => response.text())
        .then((svg) => setSvgContent(svg.replace('<svg', '<svg class="fruits"')));
    }, [svgName]);

    return (
        <div className="svgSize" dangerouslySetInnerHTML={{ __html: svgContent }} />
    );
}