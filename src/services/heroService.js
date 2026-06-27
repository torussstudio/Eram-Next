
import api from "@/lib/api";

export const getHero = async () => {
  const { data } = await api.get("/hero");
  return data;
};

export const updateHero = async (heroData) => {
  const { data } = await api.put("/hero", heroData);
  return data;
};