export interface TourStop {
  id: number;
  title: string;
  artist: string;
  location: string;
  description: string;
  artistStatement: string;
  artistImage: string;
  arUrl: string;
  duration?: number;
  coverImage?: string;
  arExperienceUrl?: string;
  slug: string;
  audioUrl: string;
}

export const tourStops: TourStop[] = [
  {
    id: 1,
    title: `Fourth and Central`,
    artist: `Artemisio Romero Y Carver`,
    location: `Cowbelles Monument`,
    description: `Artemisio responds to the Cowbelles monument by combining poetry, sculpture, and historic footage to explore themes of Manifest Destiny and colonization in relation to the Santa Fe Plaza.`,
    artistStatement: `In most any United States History textbooks there is an image of a painting titled "American Progress" (1872). In "American Progress" Indigenous men, women, and children flee a flying Caucasian giantess and her entourage of cattle and settlers (it is of note that one of the European families, in their covered wagon, were in fact based on the same invading family, the Egolfs, also depicted in the pictured Cowbelles' plaque). The painting itself was made by artist John Gast, who in 1865, had personally witnessed and met the flying white woman, who introduced herself to him as Columbia, as she began her westward summer vacation. In his autobiography, Ghast is quoted as quipping that when he met the towering Columbia, she had told him how excited she was to dine on all these new Southwestern delicacies; awkwardly, he couldn't parse if she meant the foods or the people. Long after Ghast had died, having been trampled to death by a Buffalo in his New York apartment, nuclear testing in the New Mexican region, combined with a local tradition of matriarchy, would provide Columbia and her cattle with a lethal challenger. Enter: Godzilla Aunt.`,
    artistImage: `/olivia.jpg`,
    arUrl: `https://refractstudio.8thwall.app/route66-4th-central/`,
    duration: 30,
    coverImage: "/olivia.jpg",
    arExperienceUrl: "",
    slug: "artemisio-romero-cowbelles-monument",
    audioUrl: "/audio/artemisio-romero-cowbelles-monument.mp3",
  },
  {
    id: 2,
    title: `Special Collections Library`,
    artist: `Cliff Fragua`,
    location: `St. Francis`,
    description: `Cliff Fragua explores the relationship between himself, Po'Pay, and St. Francis through poetry and sculpture.`,
    artistStatement: `I am an artist who is committed to my community. I believe we are an extension of our communities and my work reflects my devotion to the people. I believe we can give voice to our authentic narratives and create a deeper understanding of who we are as a people through the arts. We must understand our relationship with the environment and our homelands. Our traditional knowledge systems are unique and are an extension of our eco system. I strive to manifest that uniqueness and traditional knowledge systems through design concepts that will incorporate the relationship the people have with the homelands; using concepts as sustainability, resilience, and traditional ecological knowledge. The goal is to translate "who are the original people" to the public so that visitors can gain an appreciation and understanding of the original people through a different lens.`,
    artistImage: `/olivia.jpg`,
    arUrl: `https://refractstudio.8thwall.app/route66-special-collections-library/`,
    duration: 30,
    coverImage: "/olivia.jpg",
    arExperienceUrl: "",
    slug: "cliff-fragua-st-francis",
    audioUrl: "/audio/cliff-fragua-st-francis.mp3",
  },
  {
    id: 3,
    title: `Bio Park`,
    artist: `Ehren Kee Natay`,
    location: `Santa Fe River`,
    description: `This immersive art piece explores the timelines of the Santa Fe Rivers past, present and imagined futures through a narrative about an Indigenous Time Machine. Ehren examines his own personal relationship to those histories while taking you on a comedic futurist journey.`,
    artistStatement: `My piece entitled, "A River Through Time" explores a locational history near the Santa Fe River, downtown, in Santa Fe New Mexico. I initially approached this project with the question, "If I could travel back in time, what stories would the river tell me?" I imagined the distant past, pre-contact, and how the river would have served as a life source for my ancestors. My elders told me that long ago, our people visited the river daily, drawing water up with a gourd and carrying it back home in a clay pottery vessel. I then asked myself, "at what point in history did we become disconnected from our water source?"`,
    artistImage: `/olivia.jpg`,
    arUrl: `https://refractstudio.8thwall.app/route66-biopark/`,
    duration: 30,
    coverImage: "/olivia.jpg",
    arExperienceUrl: "",
    slug: "ehren-kee-natay-santa-fe-river",
    audioUrl: "/audio/ehren-kee-natay-santa-fe-river.mp3",
  },
  {
    id: 4,
    title: `Guild Cinema`,
    artist: `PAZ (Mapitzmitl) and Crystal Xochitl Zamora`,
    location: `Barrio Analco`,
    description: `In this immersive art experience created in collaboration between PAZ and his daughter Crystal, dancers made of energy and light perform an invocation to the 4 directions.`,
    artistStatement: `Within Mexikayotl (Mexika-Chichimeka tradition) an invocation to Nawitlanpa Chanekeh (The guardians of the four cardinal directions) precedes most any ritual ceremony whether private or public. The energetic intent of this invocation is to acknowledge the presence of and the desire to interface with the non ordinary aspects of the world that are present albeit not generally recognized. The dance that is presented is a continuation of the relationship with the world that has been respectfully requested via the invocation. Nawi Olin (Four Movement) represents the manner in which we as humans move within the space/time continuum.`,
    artistImage: `/olivia.jpg`,
    arUrl: `https://refractstudio.8thwall.app/route66-guild-cinema`,
    duration: 30,
    coverImage: "/olivia.jpg",
    arExperienceUrl: "",
    slug: "paz-crystal-xochitl-zamora-barrio-analco",
    audioUrl: "/audio/paz-crystal-xochitl-zamora-barrio-analco.mp3",
  },
  {
    id: 5,
    title: `Guild Cinema`,
    artist: `Virgil Ortiz`,
    location: `What Lies Beneath`,
    description: `During the 1600s, the Spanish colonized parts of the Southwest. In 1680, a Pueblo leader named Po'Pay led a successful revolt against them, pushing them out of the Pueblos they had begun to occupy.`,
    artistStatement: `During the 1600s, the Spanish colonized parts of the Southwest. In 1680, a Pueblo leader named Po'Pay led a successful revolt against them, pushing them out of the Pueblos they had begun to occupy. Over the past two decades, Ortiz has been creating a combination of ceramic pots, busts, masks, and elaborate costumes that depict 19 groups of characters representing the 19 remaining Pueblos in New Mexico.`,
    artistImage: `/olivia.jpg`,
    arUrl: `https://refractstudio.8thwall.app/route66-singing-arrow/`,
    duration: 30,
    coverImage: "/olivia.jpg",
    arExperienceUrl: "",
    slug: "virgil-ortiz-what-lies-beneath",
    audioUrl: "/audio/virgil-ortiz-what-lies-beneath.mp3",
  },
  {
    id: 6,
    title: `Refract Office Test`,
    artist: `Refract Studio`,
    location: `What Lies Beneath`,
    description: `During the 1600s, the Spanish colonized parts of the Southwest. In 1680, a Pueblo leader named Po'Pay led a successful revolt against them, pushing them out of the Pueblos they had begun to occupy.`,
    artistStatement: `During the 1600s, the Spanish colonized parts of the Southwest. In 1680, a Pueblo leader named Po'Pay led a successful revolt against them, pushing them out of the Pueblos they had begun to occupy. Over the past two decades, Ortiz has been creating a combination of ceramic pots, busts, masks, and elaborate costumes that depict 19 groups of characters representing the 19 remaining Pueblos in New Mexico.`,
    artistImage: `/olivia.jpg`,
    arUrl: `https://refractstudio.8thwall.app/vps-office-test/`,
    duration: 30,
    coverImage: "/olivia.jpg",
    arExperienceUrl: "",
    slug: "virgil-ortiz-what-lies-beneath",
    audioUrl: "/audio/virgil-ortiz-what-lies-beneath.mp3",
  },
];
