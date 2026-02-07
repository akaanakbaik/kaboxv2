export const fallbackLng = "en";
export const languages = [fallbackLng, "id"];
export const cookieName = "i18next";

export function getOptions(lng = fallbackLng, ns = "translation") {
  return {
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: "translation",
    defaultNS: "translation",
    ns,
  };
}
