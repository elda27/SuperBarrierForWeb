import { GOOGLEMAP_API_KEY } from "../apikey";
import { Loader } from "@googlemaps/js-api-loader";

type PlacesService = google.maps.places.PlacesService;

let placeService: PlacesService | null = null;

const createGoogleMapApiLoader = () =>
  new Loader({
    apiKey: GOOGLEMAP_API_KEY,
    version: "weekly",
    libraries: ["places"],
  });

/**
 * Get api provider or create new api provider if not existing.
 * @returns Google Map Place API provider
 */
export function getPlaceService(): Promise<PlacesService> {
  return new Promise<PlacesService>((resolve) => {
    if (placeService === null) {
      createGoogleMapApiLoader()
        .load()
        .then((google) => {
          const map = new google.maps.Map(
            // document.getElementById("map") as HTMLElement
            document.createElement("div")
          );
          placeService = new google.maps.places.PlacesService(map);
          resolve(placeService);
        });
    } else {
      resolve(placeService);
    }
  });
}

/**
 * Check whether near by sacret place or not.
 * @param latitude latitude at center of the search area
 * @param longitude longitude at center of the search area
 * @param radius radius at center of the search area
 * @returns is there any place in the near by sacret
 */
export async function isNearBySacret(
  latitude: number,
  longitude: number,
  radius: number
): Promise<boolean> {
  const api = await getPlaceService();
  return new Promise<boolean>((resolve) =>
    api.nearbySearch(
      {
        location: new google.maps.LatLng(latitude, longitude),
        radius: radius,
        type: "place_of_worship",
      },
      (results) => {
        // Finished to search sacred locations.
        resolve(!!results && results.length > 0);
      }
    )
  );
}
