import {apiClient} from "@/lib/api-client";

export const getCountries = async () => {
  const response = await apiClient({
    method: "GET",
    url: "https://restcountries.com/v3.1/all?fields=name,capital,currencies",
  });

  return response;
};
