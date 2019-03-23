import { useDispatch } from "redux-react-hook";

const useTheme = () => {
    const dispatch = useDispatch();

    const toggleTheme = () => {
        dispatch({ type: "THEME_TOGGLE" });
    };

    return {
        toggleTheme
    };
};

export default useTheme;
