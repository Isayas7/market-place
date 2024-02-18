/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        hovered: "var(--hovered)",
        active: "var(--active)",

        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },

        active: {
          DEFAULT: "var(--active)",
          hovered: "var(--active-hovered)",
          foreground: "var(--active-foreground)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      gridTemplateColumns: {
        notCollapsed: "17.5rem, 1fr",
        collapsed: "6rem, 1fr",
      },
      gridTemplateRows: {
        custom: "auto, 1fr",
      },
      gridRow: {
        custom: "1 / -1",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1200px",
        "2xl": "1536px",
      },
      width: {
        closed: "93px",
        opened: "310px",
        navopen: "calc(100% - 310px)",
        navclosed: "calc(100% - 93px)",
      },
      backgroundColor: {
        mirage: {
          DEFAULT: "#161C24",
          500: "#161C24",
          200: "#212B36",
        },
        aquasqueeze: {
          DEFAULT: "#e9f7f2",
        },
        swansdown: {
          DEFAULT: "#D4F4E7",
        },
        blackhaze: {
          DEFAULT: "#f6f7f8",
        },

        mystic: {
          DEFAULT: "#e4ecee",
        },
        ebonyclay: {
          DEFAULT: "#21313c",
        },
        papagreen: {
          DEFAULT: "#1e4141",
        },
        papagreend: {
          DEFAULT: "#21373d",
        },
        outerspace: {
          DEFAULT: "#2c3641",
        },
        alabaster: {
          DEFAULT: "#fcfcfc",
        },
        jade: {
          DEFAULT: "#00a76f",
          200: "#007867",
        },
        headercolor: {
          default: "rgb(35, 47, 62)",
        },
      },
      boxShadow: {
        side: "0 0 1200px 1200px rgba(33, 49, 60, 0.7)",
      },
      textColor: {
        jade: {
          DEFAULT: "#00a76f",
        },
        palesky: {
          DEFAULT: "#637381",
        },
        bali: {
          DEFAULT: "#919eab",
        },
      },
      borderColor: {
        jade: {
          DEFAULT: "#00a76f",
        },
        blackhaze: {
          DEFAULT: "#f6f7f8",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
