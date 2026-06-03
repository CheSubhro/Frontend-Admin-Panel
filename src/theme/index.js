

// src/theme/index.js
import { colors } from "./colors.js";
import { typography } from "./typography.js";

export const theme = {
    // Injecting the colors object
    colors: colors,
    
    // Injecting the complete typography object from typography.js
    typography: typography,
    
    // Border radius (Controls how rounded the corners of cards or buttons are)
    borderRadius: {
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        round: "50%",
    },
    
    // Shadows (Drop shadows for cards, modals, or popups)
    shadows: {
        sm: "0 1px 3px rgba(0,0,0,0.12)",
        md: "0 4px 6px rgba(0,0,0,0.1)",
        lg: "0 10px 15px rgba(0,0,0,0.1)",
    }
};