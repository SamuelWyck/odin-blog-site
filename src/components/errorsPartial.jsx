function ErrorsPartial({errors}) {
    if (!errors) {
        return null;
    }

    const errorElements = [];
    for (let error of errors) {
        const element = <li className="error">{error.msg}</li>
        errorElements.push(element);
    }

    return (
        <ul className="errors">
            {errorElements}
        </ul>
    );
};



export default ErrorsPartial;