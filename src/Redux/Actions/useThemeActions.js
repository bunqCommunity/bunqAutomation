import { useDispatch } from "redux-react-hook";

const useThemeActions = () => {
    const dispatch = useDispatch();

    const toggleTheme = () => {
        dispatch({ type: "THEME_TOGGLE" });
    };
    const toggleParticles = () => {
        dispatch({ type: "PARTICLES_TOGGLE" });
    };

    return {
        toggleTheme,
        toggleParticles
    };
};

export default useThemeActions;
