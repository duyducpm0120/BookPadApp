import tinycolor from "tinycolor2";

export type CategoryColors = { [key: string]: string };

export const categoryColors: CategoryColors = {
  "Action and Adventure": "#ffa500",
  Classics: "#0000ff",
  "Comic Book": "#ff0000",
  "Detective and Mystery": "#00ff00",
  "Historical Fiction": "#ffff00",
  Horror: "#00ffff",
  Romance: "#ff00ff",
  "Science Fiction (Sci-Fi)": "#800000",
  "Short Stories": "#808000",
  Thrillers: "#800080",
  "Biographies and Autobiographies": "#008080",
  Cookbooks: "#000080",
  Essays: "#666666",
  History: "#b22222",
  Mathematics: "#2e8b57",
  "Nature and Environment": "#daa520",
  Poetry: "#9400d3",
  Reference: "#483d8b",
  Religion: "#228b22",
  Science: "#4b0082",
  "Self-Help": "#696969",
  "Travel and Geography": "#ffd700",
};

export function getCategoryColor(category: string): string {
  return categoryColors[category] || "#000000";
}

export function getTextColor(color: string): string {
  return tinycolor.mostReadable(color, ["#000000", "#ffffff"]).toHexString();
}
