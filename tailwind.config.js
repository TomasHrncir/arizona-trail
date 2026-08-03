/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        az: {
          red: "#CE1126",
          copper: "#B87333",
          gold: "#FFB612",
          blue: "#003F87",
          sand: "#E4C39A",
          rust: "#8B3A1F",
          sky: "#F4C77B",
          dune: "#D9A55C",
          cactus: "#5B7A3A",
          night: "#1B1230",
          plum: "#6B2A5A",
        },
      },
      fontFamily: {
        display: ['"Rye"', "Georgia", "serif"],
        body: ['"Fraunces"', "Georgia", "serif"],
        stamp: ['"Special Elite"', "Courier", "monospace"],
      },
      backgroundImage: {
        sunset:
          "linear-gradient(180deg, #1B1230 0%, #6B2A5A 30%, #CE1126 60%, #FFB612 85%, #E4C39A 100%)",
        "dune-glow":
          "radial-gradient(ellipse at 50% 100%, #FFB612 0%, transparent 60%)",
        "flag-rays":
          "conic-gradient(from 180deg at 50% 100%, #CE1126 0deg, #FFB612 30deg, #CE1126 60deg, #FFB612 90deg, #CE1126 120deg, #FFB612 150deg, #CE1126 180deg)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        shimmer: {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
