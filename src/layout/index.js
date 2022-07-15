import React from "react";

const layout = (Component) => ({ ...props }) => {
    const name = <Component />

    let ComponentName = name.type.name;
    const { message } = props
    console.log(message, ComponentName)

    return (
        <div className="col-lg-8 offset-lg-2 col-md-12">
            <div className="jumbotron m-lg-5 m-3">
                <h2>{ComponentName}</h2>
                <hr class="my-4"></hr>
                <Component {...props} />
            </div>
        </div>
    )
};

export default layout;
