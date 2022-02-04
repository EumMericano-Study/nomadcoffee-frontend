import { COLOR } from "constant";
import { createGlobalStyle, DefaultTheme } from "styled-components";
import reset from "styled-reset";

export const lightTheme: DefaultTheme = {
    fontColor: COLOR.BLACK,
    bgColor: COLOR.DARK_YELLOW,
};

export const darkTheme: DefaultTheme = {
    fontColor: COLOR.DARK_YELLOW,
    bgColor: COLOR.BLACK,
};

export const GlobalStyles = createGlobalStyle`
    ${reset}
    body {
        background: ${(props) => props.theme.bgColor};
        color: ${(props) => props.theme.fontColor};
        
        transition: color, background 0.2s ease-in;

        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }
`;
