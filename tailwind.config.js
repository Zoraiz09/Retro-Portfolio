/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#F4F1E8",
        paper: "#FBF9F3",
        ink: "#16140F",
        coral: "#FF5C46",
        rust: "#E23E22",
        mustard: "#F5C24B",
        sky: "#A4C7E8",
        bubble: "#F4B7C7",
        mint: "#B2D8A6",
        navy: "#15323F",
        steel: "#24424F",
      },
      fontFamily: {
        display: ['"Archivo"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      boxShadow: {
        brutal: "5px 5px 0 0 #16140F",
        "brutal-sm": "3px 3px 0 0 #16140F",
        "brutal-lg": "8px 8px 0 0 #16140F",
        "brutal-coral": "5px 5px 0 0 #FF5C46",
        "brutal-mustard": "5px 5px 0 0 #F5C24B",
      },
      keyframes: {
        blink: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "scan-line": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
      animation: {
        blink: "blink 1.1s step-end infinite",
        marquee: "marquee 22s linear infinite",
        "marquee-slow": "marquee 40s linear infinite",
        "scan-line": "scan-line 3.5s linear infinite",
        float: "float 5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
