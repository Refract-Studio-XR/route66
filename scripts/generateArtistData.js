const fs = require("fs");
const path = require("path");
const Papa = require("papaparse");

// Read the CSV file
const csvPath = path.join(__dirname, "./data/artist_data.csv");
const csvContent = fs.readFileSync(csvPath, "utf8");

// Parse CSV
const result = Papa.parse(csvContent, {
  header: true,
  skipEmptyLines: true,
  transformHeader: (header) => header.toLowerCase().trim(),
});

// Transform data
const artists = result.data.map((row) => {
  const stop = row["location id"] || "";
  const fullname = row["full name"] || "";
  const pronouns = row["pronouns"] || "";
  const credittitle = row["credit title"] || "";
  const artiststatement = (row["artist statement"] || "").trim();
  const artistbio = (row["artist bio"] || "").trim();
  const additionalcredits =
    row["aditional credits"] || row["additional credits"] || "";
  const linksRaw = row["links"] || "";
  const links = linksRaw
    .split(/[,;\n]/)
    .map((link) => link.trim())
    .filter((link) => link.length > 0);

  return {
    stop,
    fullname,
    pronouns,
    credittitle,
    artiststatement,
    artistbio,
    additionalcredits,
    links,
  };
});

// Generate TypeScript file
const tsContent = `// Auto-generated from CSV
export interface ArtistData {
  stop: string
  fullname: string
  pronouns: string
  credittitle: string
  artiststatement: string
  artistbio: string
  additionalcredits: string
  links: string[]
}

export const artistsData: ArtistData[] = ${JSON.stringify(artists, null, 2)}
`;

// Write TypeScript file
const outputPath = path.join(__dirname, "../data/artistsData.ts");
fs.writeFileSync(outputPath, tsContent);

console.log("Generated artistsData.ts from CSV");
