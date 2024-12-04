import { useContext } from 'react';
import { ThemeContext, themes } from "../../contexts/theme-context";
import { Button } from '../button/button';

export const ThemeTogglerButton = () => {
    const { theme, handleThemeChange } = useContext(ThemeContext)

    return (
        <div>
            <Button onClick={() => handleThemeChange(theme === themes.light ? themes.dark : themes.light)}>Mudar tema</Button>
        </div>
    )
}