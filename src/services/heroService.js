import api from "@/lib/api";

export const getHero = async () => {
  const { data } = await api.get("/hero");
  return data;
};

export const updateHero = async (heroData) => {
  const { data } = await api.put("/hero", heroData);
  return data;
};

export const uploadHeroImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  const { data } = await api.post("/hero/upload-image", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};