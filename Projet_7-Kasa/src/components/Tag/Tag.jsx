import React from "react";
import './Tag.css'

function Tag(props) {
   return <span className="tag">{props.tagText}</span>;
}

export default Tag;