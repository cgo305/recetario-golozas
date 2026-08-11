/** Generado desde la config que estaba embebida en index.html */
module.exports = {
  content: ['../index.html'],
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/container-queries')],
  ...({
    darkMode: "class",
    theme: {
      extend: {
        "colors": {
                "background": "rgb(var(--c-background) / <alpha-value>)",
                "tertiary-container": "rgb(var(--c-tertiary-container) / <alpha-value>)",
                "primary-fixed-dim": "rgb(var(--c-primary-fixed-dim) / <alpha-value>)",
                "inverse-on-surface": "rgb(var(--c-inverse-on-surface) / <alpha-value>)",
                "surface-variant": "rgb(var(--c-surface-variant) / <alpha-value>)",
                "on-tertiary": "rgb(var(--c-on-tertiary) / <alpha-value>)",
                "on-secondary-fixed-variant": "rgb(var(--c-on-secondary-fixed-variant) / <alpha-value>)",
                "error-container": "rgb(var(--c-error-container) / <alpha-value>)",
                "surface-container-lowest": "rgb(var(--c-surface-container-lowest) / <alpha-value>)",
                "surface-bright": "rgb(var(--c-surface-bright) / <alpha-value>)",
                "ink-charcoal": "rgb(var(--c-ink-charcoal) / <alpha-value>)",
                "washi-green": "rgba(181, 206, 170, 0.5)",
                "washi-pink": "rgba(217, 165, 134, 0.4)",
                "on-error-container": "rgb(var(--c-on-error-container) / <alpha-value>)",
                "surface-dim": "rgb(var(--c-surface-dim) / <alpha-value>)",
                "on-background": "rgb(var(--c-on-background) / <alpha-value>)",
                "error": "rgb(var(--c-error) / <alpha-value>)",
                "on-secondary-fixed": "rgb(var(--c-on-secondary-fixed) / <alpha-value>)",
                "on-secondary": "rgb(var(--c-on-secondary) / <alpha-value>)",
                "on-secondary-container": "rgb(var(--c-on-secondary-container) / <alpha-value>)",
                "on-error": "rgb(var(--c-on-error) / <alpha-value>)",
                "on-primary-fixed": "rgb(var(--c-on-primary-fixed) / <alpha-value>)",
                "on-surface-variant": "rgb(var(--c-on-surface-variant) / <alpha-value>)",
                "primary-fixed": "rgb(var(--c-primary-fixed) / <alpha-value>)",
                "tertiary-fixed-dim": "rgb(var(--c-tertiary-fixed-dim) / <alpha-value>)",
                "surface-container-high": "rgb(var(--c-surface-container-high) / <alpha-value>)",
                "secondary": "rgb(var(--c-secondary) / <alpha-value>)",
                "on-primary": "rgb(var(--c-on-primary) / <alpha-value>)",
                "tertiary-fixed": "rgb(var(--c-tertiary-fixed) / <alpha-value>)",
                "secondary-fixed-dim": "rgb(var(--c-secondary-fixed-dim) / <alpha-value>)",
                "surface-container": "rgb(var(--c-surface-container) / <alpha-value>)",
                "inverse-surface": "rgb(var(--c-inverse-surface) / <alpha-value>)",
                "sage-deep": "rgb(var(--c-sage-deep) / <alpha-value>)",
                "surface-container-highest": "rgb(var(--c-surface-container-highest) / <alpha-value>)",
                "on-primary-fixed-variant": "rgb(var(--c-on-primary-fixed-variant) / <alpha-value>)",
                "outline": "rgb(var(--c-outline) / <alpha-value>)",
                "on-surface": "rgb(var(--c-on-surface) / <alpha-value>)",
                "paper-cream": "rgb(var(--c-paper-cream) / <alpha-value>)",
                "on-tertiary-container": "rgb(var(--c-on-tertiary-container) / <alpha-value>)",
                "on-tertiary-fixed-variant": "rgb(var(--c-on-tertiary-fixed-variant) / <alpha-value>)",
                "outline-variant": "rgb(var(--c-outline-variant) / <alpha-value>)",
                "on-tertiary-fixed": "rgb(var(--c-on-tertiary-fixed) / <alpha-value>)",
                "primary": "rgb(var(--c-primary) / <alpha-value>)",
                "secondary-container": "rgb(var(--c-secondary-container) / <alpha-value>)",
                "tertiary": "rgb(var(--c-tertiary) / <alpha-value>)",
                "surface-tint": "rgb(var(--c-surface-tint) / <alpha-value>)",
                "on-primary-container": "rgb(var(--c-on-primary-container) / <alpha-value>)",
                "secondary-fixed": "rgb(var(--c-secondary-fixed) / <alpha-value>)",
                "surface": "rgb(var(--c-surface) / <alpha-value>)",
                "surface-container-low": "rgb(var(--c-surface-container-low) / <alpha-value>)",
                "primary-container": "rgb(var(--c-primary-container) / <alpha-value>)",
                "dark-parchment": "rgb(var(--c-dark-parchment) / <alpha-value>)",
                "inverse-primary": "rgb(var(--c-inverse-primary) / <alpha-value>)"
        },
        "borderRadius": {
                "DEFAULT": "0.125rem",
                "lg": "0.25rem",
                "xl": "0.5rem",
                "full": "0.75rem"
        },
        "spacing": {
                "card-padding": "24px",
                "margin-desktop": "64px",
                "gutter": "16px",
                "margin-mobile": "20px",
                "base": "8px"
        },
        "fontFamily": {
                "body-lg": [
                        "Glass Antiqua"
                ],
                "title-md": [
                        "Glass Antiqua"
                ],
                "headline-lg": [
                        "Great Vibes"
                ],
                "body-md": [
                        "Glass Antiqua"
                ],
                "display-hero": [
                        "Great Vibes"
                ],
                "label-caps": [
                        "Glass Antiqua"
                ],
                "headline-lg-mobile": [
                        "Great Vibes"
                ],
                "lora": ["Lora", "serif"]
        },
        "fontSize": {
                "body-lg": [
                        "18px",
                        {
                                "lineHeight": "28px",
                                "fontWeight": "400"
                        }
                ],
                "title-md": [
                        "24px",
                        {
                                "lineHeight": "32px",
                                "letterSpacing": "0.02em",
                                "fontWeight": "400"
                        }
                ],
                "headline-lg": [
                        "36px",
                        {
                                "lineHeight": "44px",
                                "fontWeight": "400"
                        }
                ],
                "body-md": [
                        "16px",
                        {
                                "lineHeight": "24px",
                                "fontWeight": "400"
                        }
                ],
                "display-hero": [
                        "48px",
                        {
                                "lineHeight": "56px",
                                "fontWeight": "400"
                        }
                ],
                "label-caps": [
                        "14px",
                        {
                                "lineHeight": "20px",
                                "letterSpacing": "0.1em",
                                "fontWeight": "400"
                        }
                ],
                "headline-lg-mobile": [
                        "32px",
                        {
                                "lineHeight": "38px",
                                "fontWeight": "400"
                        }
                ]
        }
},
    },
  })
}
