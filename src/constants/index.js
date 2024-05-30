export const options = {
  method: "GET",
  url: "https://flight-radar1.p.rapidapi.com/flights/list-in-boundary",
  params: {
    bl_lat: "34.738971",
    bl_lng: "24.831489",
    tr_lat: "42.832739",
    tr_lng: "46.50349",
    limit: "300",
  },
  headers: {
    "X-RapidAPI-Key": "3a018899a3msh42c01566c4542b3p13caa0jsnbc374e087ca6",
    "X-RapidAPI-Host": "flight-radar1.p.rapidapi.com",
  },
};

export const DetailOptions = {
  headers: {
    "X-RapidAPI-Key": "3a018899a3msh42c01566c4542b3p13caa0jsnbc374e087ca6",
    "X-RapidAPI-Host": "flight-radar1.p.rapidapi.com",
  },
};
