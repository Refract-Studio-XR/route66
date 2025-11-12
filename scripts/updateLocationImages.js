const fs = require("fs");
const path = require("path");

// Read the existing locationData.ts file
const locationDataPath = path.join(__dirname, "../data/locationData.ts");
const fileContent = fs.readFileSync(locationDataPath, "utf8");

// Extract the locationData array using regex
const arrayMatch = fileContent.match(
  /export const locationData: LocationData\[\] = (\[[\s\S]*\]);/
);

if (!arrayMatch) {
  console.error("Could not find locationData array in file");
  process.exit(1);
}

// Parse the array (safely evaluate it as JSON-like)
let locationData;
try {
  // The array is JavaScript, so we need to evaluate it
  // We'll use eval but only on our own trusted source file
  locationData = eval(arrayMatch[1]);
} catch (error) {
  console.error("Error parsing locationData array:", error);
  process.exit(1);
}

// Image extensions to look for
const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp"];

// Scan directories and update images property
locationData.forEach((location) => {
  const dirPath = path.join(
    __dirname,
    "../public/locations",
    location.locationParam
  );

  // Check if directory exists
  if (!fs.existsSync(dirPath)) {
    console.warn(`Directory not found for ${location.locationParam}`);
    return;
  }

  try {
    // Read all files in the directory
    const files = fs.readdirSync(dirPath);

    // Filter for image files
    const imageFiles = files
      .filter((file) => {
        const ext = path.extname(file).toLowerCase();
        return imageExtensions.includes(ext);
      })
      .sort() // Sort alphabetically for consistency
      .map((file) => `/locations/${location.locationParam}/${file}`);

    // Update the images property
    if (imageFiles.length > 0) {
      location.images = imageFiles;
    } else {
      // Remove images property if no images found
      delete location.images;
    }
  } catch (error) {
    console.warn(`Error reading directory ${location.locationParam}:`, error);
  }
});

// Generate the TypeScript file content
const interfaceContent = `// Auto-generated from CSV
export interface LocationData {
  stop: string;
  id: string;
  artTitle: string;
  location: string;
  coordinates: [number, number];
  locationDescription: string;
  artist: string;
  locationParam: string;
  arURL: string;
  isAR: boolean;
  coverImage?: string;
  images?: string[];
}

export const locationData: LocationData[] = ${JSON.stringify(
  locationData,
  null,
  2
)};
`;

// Write the updated file
fs.writeFileSync(locationDataPath, interfaceContent);

console.log("Updated locationData.ts with image paths");
console.log(
  `Processed ${locationData.length} locations, found images in ${
    locationData.filter((l) => l.images && l.images.length > 0).length
  } locations`
);

