const fs = require("fs");
const path = require("path");
const Papa = require("papaparse");

// Read the CSV file
const csvPath = path.join(__dirname, "./data/location_data.csv");
const csvContent = fs.readFileSync(csvPath, "utf8");

// Parse CSV
const result = Papa.parse(csvContent, {
  header: true,
  skipEmptyLines: true,
  transformHeader: (header) => header.toLowerCase().trim(),
});

// Transform data
const locations = result.data.map((row) => {
  const stop = row["stop #"] || row.stop || "";
  const id = row["stop #"] || row.stop || "";
  const artTitle = row["art piece titles"] || "";
  const location = row["location"] || "";
  const x = parseFloat(row["x"] || 0);
  const y = parseFloat(row["y"] || 0);
  const locationDescription = row["location description"] || "";
  const artist = row["artist"] || "";
  const isAR = (row["ar"] || "").toString().trim().toUpperCase() === "TRUE";
  const arURL = "";
  const locationParam = artTitle
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // remove non-alphanumeric except space and hyphen
    .replace(/\s+/g, "-");

  return {
    id,
    stop,
    artTitle,
    location,
    coordinates: [x, y],
    locationDescription,
    artist,
    locationParam,
    arURL,
    isAR,
  };
});

// Generate TypeScript file
const tsContent = `// Auto-generated from CSV
export interface LocationData {
  stop: string
  id: string
  artTitle: string
  location: string
  coordinates: [number, number]
  locationDescription: string
  artist: string
  locationParam: string
  arURL: string
  isAR: boolean
}

export const locationData: LocationData[] = ${JSON.stringify(
  locations,
  null,
  2
)}
`;

// Write the TypeScript file
const outputPath = path.join(__dirname, "../data/locationData.ts");
fs.writeFileSync(outputPath, tsContent);

console.log("Generated locationData.ts from CSV");
