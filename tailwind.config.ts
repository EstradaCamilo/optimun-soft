import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";
export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        cerulean: {
          "50": "#f1f9fe",
          "100": "#e1f3fd",
          "200": "#bce7fb",
          "300": "#82d4f7",
          "400": "#3fbff1",
          "500": "#16a8e1",
          "600": "#0987c0",
          "700": "#096b9b",
          "800": "#0c5b80",
          "900": "#104c6a",
          "950": "#0a3147",
        },
      },
      fontFamily: {
        sans: [
          "Work Sans",
          "Work Sans fallback",
          ...defaultTheme.fontFamily.sans,
        ],
      },
    },
  },
};
