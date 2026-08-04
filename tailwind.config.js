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
          // Monument Valley poster palette
          poster: {
            indigo: "#1A0F3D",
            violet: "#4A0E5F",
            magenta: "#C93A6E",
            coral: "#F04E4E",
            orange: "#F58C4E",
            peach: "#F5B45E",
            gold: "#FFCE3E",
            sun: "#FF7A1A",
            rock: "#C93A1A",
            rockLite: "#E56230",
            cactus: "#2E9B4E",
            cactusLite: "#4EC26B",
            agave: "#1E9BB0",
            agaveLite: "#3EBAD2",
            trail: "#F7B84A",
          },
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
        // Monument Valley poster sky — vivid bands compressed above the horizon
        "poster-sky":
          "linear-gradient(180deg, #1A0F3D 0%, #3A144E 12%, #6B1B62 22%, #A62468 30%, #D63A63 38%, #F04E4E 45%, #F58C4E 52%, #FFCE3E 60%, #FFCE3E 100%)",
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
