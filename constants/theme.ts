export const theme = {
    colors: {
        paper: '#FDF6EC',         // Lighter cream paper background
        paperDark: '#F5E6D3',     // Darker cream for cards/elements
        ink: '#2C1810',          // Dark brown text
        accent: '#8B4513',       // Saddle brown for primary actions
        secondary: '#A67B5B',    // Warm brown for secondary elements
        subtle: '#E6CCB2',       // Light paper color for subtle elements
        success: '#606C38',      // Olive green for success states
        error: '#9B2226',        // Muted red for errors
        border: '#D4A373',       // Warm brown for borders
        highlight: '#DDA15E',    // Golden highlight color
    },
    fonts: {
        script: 'Satisfy',       // For titles and special text
        regular: 'Lora',         // For body text
    },
    spacing: {
        xs: 4,
        sm: 8,
        md: 16,
        lg: 24,
        xl: 32,
    },
    borderRadius: {
        sm: 4,
        md: 8,
        lg: 16,
        full: 22,  // Half of the width/height for perfect circle
    },
    shadows: {
        small: {
            shadowColor: '#2C1810',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.15,
            shadowRadius: 3,
            elevation: 2,
        },
        medium: {
            shadowColor: '#2C1810',
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 4,
        }
    }
}; 