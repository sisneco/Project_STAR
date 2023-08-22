/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        notojp: ["Noto Sans JP"],
        oswald: ["Oswald"],
      },
      keyframes: {
        "slide-top": {
          "0%": {
            transform: "translateY(0)",
          },
          to: {
            transform: "translateY(-20px)",
          },
        },
        "slide-bottom": {
          "0%": {
            transform: "translateY(-20px)",
          },
          to: {
            transform: "translateY(0px)",
          },
        },
        // vibrate
        "vibrate-1": {
          "0%,to": {
            transform: "translate(0)",
          },
          "20%": {
            transform: "translate(-2px, 2px)",
          },
          "40%": {
            transform: "translate(-2px, -2px)",
          },
          "60%": {
            transform: "translate(2px, 2px)",
          },
          "80%": {
            transform: "translate(2px, -2px)",
          },
        },
        // slide
        "slide-in-right": {
          "0%": {
            transform: "translateX(1000px)",
            opacity: "0",
          },
          to: {
            transform: "translateX(0)",
            opacity: "1",
          },
        },
        // slide-out
        "slide-out-left": {
          "0%": {
            transform: "translateX(0)",
            opacity: "1",
          },
          to: {
            transform: "translateX(-1000px)",
            opacity: "0",
          },
        },
        "text-focus-in": {
          "0%": {
            filter: "blur(12px)",
            opacity: "0",
          },
          to: {
            filter: "blur(0)",
            opacity: "1",
          },
        },
      },
      animation: {
        "vibrate-1": "vibrate-1 0.3s linear   both",
        "slide-in-right":
          "slide-in-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940)   forwards",
        "slide-out-left":
          "slide-out-left 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530)   both",
        "text-focus-in":
          "text-focus-in 1s cubic-bezier(0.550, 0.085, 0.680, 0.530)   both",
        "slide-top":
          "slide-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940)   both",
        "slide-bottom":
          "slide-bottom 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940)   both",
      },
    },
  },
};
