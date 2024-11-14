// Define the structure for the university's location and radius
interface Location {
  latitude: number;
  longitude: number;
  radius: number; // Radius in meters
}

const universityLocation: Location = {
  latitude: 9.777191, // Replace with the university's actual latitude
  longitude: 118.733172, // Replace with the university's actual longitude
  radius: 370.28, // Radius in meters (adjust as needed)
};

// Function to calculate the distance between two points (Haversine formula)
function getDistanceFromLatLonInMeters(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Radius of the Earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c * 1000; // Distance in meters
  return distance;
}

// Helper function to convert degrees to radians
function deg2rad(deg: number): number {
  return deg * (Math.PI / 180);
}

// Check if the user is within the university's location and radius
export function isWithinUniversity(lat: number, lon: number): boolean {
  const distance = getDistanceFromLatLonInMeters(
    lat,
    lon,
    universityLocation.latitude,
    universityLocation.longitude
  );
  return distance <= universityLocation.radius;
}

// Use Geolocation API to get the current position
export function checkLocation(): void {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        if (isWithinUniversity(latitude, longitude)) {
          console.log("You are inside the university. Enabling the option.");
          // Enable the option or feature
        } else {
          console.log("You are outside the university. Disabling the option.");
          // Disable the option or feature
        }
      },
      (error) => {
        console.error("Error getting location:", error);
      }
    );
  } else {
    console.error("Geolocation is not supported by this browser.");
  }
}
