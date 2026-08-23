# Lulu Base WordPress Theme

This neutral theme is the optional presentation layer for websites created from the Lulu Standard content template. Company-specific text, colors and images belong in WordPress content and settings, not in the theme source.

1. Package the `wordpress-theme` directory as `lulu-base.zip` and upload it in **Appearance → Themes → Add New → Upload Theme**.
2. Activate the theme.
3. Set the Lulu-generated `Home` page as the static homepage. Lulu attempts this automatically through the connected WordPress/Jetpack settings API.
4. Create a menu in **Appearance → Menus** and assign it to **Primary Menu**.
5. Add a custom logo and site description in WordPress settings if available.
6. Add products under **Products** and organize them using **Product Categories** when the website needs a catalog.

The standard WordPress REST API can read installed themes but cannot install or activate a custom theme. Lulu therefore renders the generated pages with portable inline presentation as well, so they remain usable under an existing WordPress theme.
