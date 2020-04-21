import React from "react"

function Card(props){
    return(
        <span className = "card"><img src = {require (`./JPEG/${props.card}.jpg`)} alt = "" style = {{height: 200}}></img></span>
    )
}

export default Card