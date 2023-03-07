/**
 * Import andt components, dependencies & configuration
 */
import { screenSizes } from "../../../_config";
import { theme } from "antd";


// Generates padding for child elements based on parent gutterValue
export const generateRowStyles = (styles, clientId) => {

	if (typeof styles === "undefined") {
		return;
	}
	const { useToken } = theme;
	const { token } = useToken();
	
  let inlineStyles = "";
  

  Object.entries(screenSizes).forEach(([key]) => {
    const paddingValue = styles[key];

    if(paddingValue) {
      const minWidth = token[screenSizes[key].antdToken]
      const padding = paddingValue/2;
     inlineStyles += `
      @media only screen and (min-width: ${minWidth}px) {
       .gutenberg-ant-design--${clientId} > div {
          padding-left: ${padding}px;
          padding-right: ${padding}px;
        }
      }
    `;
    }
  });

  return inlineStyles;
}
