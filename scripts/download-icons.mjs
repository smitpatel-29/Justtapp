import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import * as Icons from "lucide-react";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputDir = path.join(__dirname, "../public/assets/icons");

// Create directory if it doesn't exist (already did via shell but safe to recheck)
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Full list of icons used in the app
const requiredIcons = [
  // Contact
  "Mail",
  "Phone",
  "Globe",
  "MapPin",
  "ExternalLink",
  "Download",
  "Share2",
  "QrCode",
  "CheckCircle",
  "Languages",
  "X",
  // Socials
  "Linkedin",
  "Github",
  "Instagram",
  "Twitter",
  "Facebook",
  "Youtube",
  "MessageCircle",
  "Send",
  "Video",
  "Map",
  // Other
  "Smartphone",
  "Zap",
  "ShieldCheck",
  "TreePine",
  "CreditCard",
  "ChevronRight",
  "Plus",
  "Edit2",
  "Trash2",
  "Grid",
];

console.log(`Generating ${requiredIcons.length} icons...`);

requiredIcons.forEach((iconName) => {
  const IconComponent = Icons[iconName];

  if (IconComponent) {
    // Render the React component to an SVG string
    // We create a React Element using createElement
    const svgString = renderToStaticMarkup(
      React.createElement(IconComponent, {
        size: 48,
        color: "#000000",
        strokeWidth: 1.5,
      }),
    );

    // Write directly to file
    fs.writeFileSync(path.join(outputDir, `${iconName}.svg`), svgString);
    console.log(`Saved ${iconName}.svg`);
  } else {
    console.warn(`Icon ${iconName} not found in lucide-react`);
  }
});

console.log("Icon generation complete!");
