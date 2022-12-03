import { GOOGLEMAP_API_KEY } from "../apikey";
import { Loader } from "@googlemaps/js-api-loader";

export const createGoogleMapApiLoader = () =>
  new Loader({
    apiKey: GOOGLEMAP_API_KEY,
    version: "weekly",
    libraries: ["places"],
  });
