import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
* {
    box-sizing: border-box;
}
body {
    font-family: Lato;
    background-color: #333333;
    color: #FFFFFF;
}
button,
input,
textarea
{
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
}

button {
    cursor: pointer;
}
`;

export default GlobalStyle;
