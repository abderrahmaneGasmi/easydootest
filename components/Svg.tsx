import React, { MouseEventHandler } from "react";
interface svgProps {
  id?: string;
  click?: MouseEventHandler;
  classlist?: string;
  view?: string;
  path?: string;
  pathlist?: string[];
  refre?: React.RefObject<SVGSVGElement>;
  style?: React.CSSProperties;
}

export default function Svg(props: svgProps) {
  return (
    <svg
      id={props.id}
      onClick={props.click}
      className={props.classlist}
      viewBox={props.view}
      ref={props.refre}
      style={{
        ...props.style,
      }}
    >
      <g>{props.path && <path d={props.path}></path>}</g>
    </svg>
  );
}
