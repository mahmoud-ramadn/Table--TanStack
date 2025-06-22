import {useQuery} from "@tanstack/react-query";
import {getCountries} from "@/apis/country";

export const COUNTRIES_QUERY_KEY = "countries";

export const useGetCountries = () => {
  return useQuery({
    queryKey: [COUNTRIES_QUERY_KEY],
    queryFn: async () => {
      const response = await getCountries();
      return response;
    },
  });
};
