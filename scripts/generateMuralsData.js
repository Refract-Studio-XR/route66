const fs = require("fs");
const path = require("path");
const Papa = require("papaparse");

// Read the CSV file
const csvPath = path.join(
  __dirname,
  "../public/data/murals-sculptures-signs.csv"
);
const csvContent = fs.readFileSync(csvPath, "utf8");

// Parse CSV
const result = Papa.parse(csvContent, {
  header: true,
  skipEmptyLines: true,
  transformHeader: (header) => {
    // Map CSV headers to our desired property names
    const headerMap = {
      X: "x",
      Y: "y",
      Name: "name",
    };
    return headerMap[header] || header.toLowerCase();
  },
  transform: (value, field) => {
    if (field === "x" || field === "y") {
      return parseFloat(value);
    }
    return value;
  },
});

// Generate TypeScript file
const tsContent = `// Auto-generated from CSV
export interface MuralData {
  x: number;
  y: number;
  name: string;
}

export const muralsData: MuralData[] = ${JSON.stringify(result.data, null, 2)};
`;

// Write the TypeScript file
const outputPath = path.join(__dirname, "../data/muralsData.ts");
fs.writeFileSync(outputPath, tsContent);

console.log("Generated muralsData.ts from CSV");
