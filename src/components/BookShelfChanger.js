import { useState, useEffect } from "react";

function BookShelfChanger({ value, optionObj = {}, onSelectionChanged }) {
    const [options, setOptions] = useState({
        'currentlyReading': "Currently Reading",
        'wantToRead': 'Want to Read',
        'read': 'Read',
        'none': 'None',
    });

    useEffect(() => {
        if (!Object.keys(optionObj).length) {
            return;
        }
        setOptions({ ...optionObj });
    }, [optionObj]);

    return (
        <select onChange={onSelectionChanged} value={value}>
            <option value="none" disabled>
                Move to...
            </option>
            {Object.keys(options).map(item => {
                return <option key={item} value={item}>
                    {options[item]}
                </option>
            })}
        </select>

    )
}


export default BookShelfChanger;
