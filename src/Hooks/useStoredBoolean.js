import { useEffect, useState } from "react";

const useStoredBoolean = (booleanKey, defaultValue = false) => {
    const storedValue = JSON.parse(localStorage.getItem(booleanKey));

    const [boolean, setBoolean] = useState(storedValue || defaultValue);

    useEffect(() => {
        localStorage.setItem(booleanKey, JSON.stringify(boolean));
    }, [boolean]);

    const toggleBoolean = () => {
        setBoolean(!boolean);
    };

    return [boolean, toggleBoolean];
};

export default useStoredBoolean;
