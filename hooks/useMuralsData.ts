import { muralsData, MuralData } from "@/data/muralsData";

export { muralsData };

export const useMuralsData = () => {
  return {
    murals: muralsData,
    loading: false,
    error: null,
  };
};
