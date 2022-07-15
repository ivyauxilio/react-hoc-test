import React from "react";

const layout = (Component) => ({ ...props }) => {
    const name = <Component />

    let ComponentName = name.type.name;
    const { message } = props
    console.log(message, ComponentName)

    return (
        <div className="container m-5">
            <h2>{ComponentName}</h2>
            <Component {...props} />
        </div>
    )
};

export default layout;
