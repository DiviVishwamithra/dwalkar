class PromptBuilder {
  build(plan, file) {
    return `
You are a Senior React Developer.

Generate ONLY the file: ${file.path}

Do NOT generate any markdown.
Do NOT wrap the response inside \`\`\`.
Do NOT explain anything.
Return ONLY valid JavaScript/JSX/CSS code.

=========================
PROJECT
=========================

Project Name:
${plan.projectName}

Framework:
${plan.framework}

Language:
${plan.language}

Styling:
${plan.styling}

=========================
DESIGN SYSTEM
=========================

Style:
${plan.theme?.style || "Modern"}

Primary Color:
${plan.theme?.primaryColor || "#2563eb"}

Secondary Color:
${plan.theme?.secondaryColor || "#1e293b"}

Accent Color:
${plan.theme?.accentColor || "#ffffff"}

Background Color:
${plan.theme?.backgroundColor || "#f8fafc"}

Font:
${plan.theme?.fontFamily || "Inter"}

Animation Style:
${plan.theme?.animationStyle || "subtle"}

=========================
INSTALLED PACKAGES
=========================

${
  plan.installedPackages?.length
    ? plan.installedPackages.join("\n")
    : "react\nreact-dom\nreact-router-dom\ntailwindcss\n@tailwindcss/vite"
}

IMPORTANT

Only use the packages listed above.

Never import any package that is not listed.

Never use:

- prop-types
- framer-motion
- react-icons
- lucide-react
- swiper
- gsap
- animejs

=========================
PAGES
=========================

${plan.pages.join("\n")}

=========================
COMPONENT API
=========================

${
  plan.componentApis?.length
    ? plan.componentApis
        .map(
          (component) => `
${component.name}

Props:
${component.props.join(", ")}

Example:
<${component.name}
  ${component.props.map((p) => `${p}={...}`).join("\n  ")}
/>
`,
        )
        .join("\n")
    : plan.components.join("\n")
}

=========================
ASSETS
=========================

${
  plan.assets && plan.assets.length
    ? plan.assets
        .map((asset) => `${asset.name} -> src/assets/${asset.file}`)
        .join("\n")
    : "No assets available."
}

Use the images from src/assets whenever appropriate.

Do NOT use external image URLs.

=========================
AVAILABLE FILES
=========================

${plan.files.map((file) => file.path).join("\n")}

Only import files from this list.

Never import files that are not listed.

=========================
FILE TO GENERATE
=========================

${file.path}

Generate ONLY this file.
`;
  }
}

module.exports = new PromptBuilder();
