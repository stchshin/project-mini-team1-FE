import axios from "axios";

const REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;

export async function searchLocation(keyword, currentLocation) {
  const response = await axios.get(
    "https://dapi.kakao.com/v2/local/search/keyword.json",
    {
      params: {
        query: keyword,
        x: currentLocation.longitude,
        y: currentLocation.latitude,
    },
      headers: {
        Authorization: `KakaoAK ${REST_API_KEY}`,
      },
    }
  );

  return response.data.documents;
}
