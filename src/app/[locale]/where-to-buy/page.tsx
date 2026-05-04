"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import { Search } from "lucide-react";
import { useTranslations } from "next-intl";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY;

interface Store {
  id: number;
  name: string;
  address: string;
  coordinates: [number, number]; // [lng, lat]
  phone?: string;
}

interface StoreWithDistance extends Store {
  distance: number;
}

export default function StoreLocator() {
  const t = useTranslations("StoreLocator");
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);

  const [mounted, setMounted] = useState(false);
  const [userLocation, setUserLocation] = useState<[number, number]>([
    120.68, 24.15,
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [stores, setStores] = useState<StoreWithDistance[]>([]);
  const [selectedStore, setSelectedStore] = useState<number | null>(null);

  // Sample store data
  const storeData: Store[] = [
    {
      id: 1,
      name: "Downtown Store",
      address: "123 Main St, Taichung City",
      coordinates: [120.6816, 24.1477],
      phone: "+886 4 1234 5678",
    },
    {
      id: 2,
      name: "Northside Branch",
      address: "456 North Ave, Taichung City",
      coordinates: [120.695, 24.162],
      phone: "+886 4 2345 6789",
    },
    {
      id: 3,
      name: "Eastside Shop",
      address: "789 East Rd, Taichung City",
      coordinates: [120.71, 24.155],
      phone: "+886 4 3456 7890",
    },
    {
      id: 4,
      name: "Westside Location",
      address: "321 West Blvd, Taichung City",
      coordinates: [120.66, 24.14],
      phone: "+886 4 4567 8901",
    },
    {
      id: 5,
      name: "Southside Market",
      address: "654 South St, Taichung City",
      coordinates: [120.685, 24.13],
      phone: "+886 4 5678 9012",
    },
  ];

  // Calculate distance between two coordinates
  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ): number => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // Handle client-side only rendering
  useEffect(() => {
    setMounted(true);
  }, []);

  // Update stores with distances
  useEffect(() => {
    if (!mounted) return;

    const storesWithDistance = storeData
      .map((store) => ({
        ...store,
        distance: calculateDistance(
          userLocation[1],
          userLocation[0],
          store.coordinates[1],
          store.coordinates[0],
        ),
      }))
      .sort((a, b) => a.distance - b.distance);

    setStores(storesWithDistance);
  }, [userLocation, mounted]);

  // Initialize map
  useEffect(() => {
    if (!mounted || !mapContainer.current || map.current) return;

    // Add Mapbox CSS dynamically
    const link = document.createElement("link");
    link.href = "https://api.mapbox.com/mapbox-gl-js/v3.0.1/mapbox-gl.css";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: userLocation,
      zoom: 12.5,
      scrollZoom: false,
      accessToken: mapboxgl.accessToken!,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userCoords: [number, number] = [
            position.coords.longitude,
            position.coords.latitude,
          ];
          setUserLocation(userCoords);
          map.current?.setCenter(userCoords);
        },
        (error) => {
          console.log("Geolocation error:", error);
        },
      );
    }

    return () => {
      map.current?.remove();
    };
  }, [mounted]);

  // Update markers
  useEffect(() => {
    if (!map.current || !mounted) return;

    markers.current.forEach((marker) => marker.remove());
    markers.current = [];

    const userMarker = new mapboxgl.Marker({ color: "#3b82f6" })
      .setLngLat(userLocation)
      .setPopup(new mapboxgl.Popup().setHTML("<strong>Your Location</strong>"))
      .addTo(map.current);
    markers.current.push(userMarker);

    stores.forEach((store) => {
      const el = document.createElement("div");
      el.className =
        "w-8 h-8 bg-red-500 rounded-full border-4 border-white shadow-lg cursor-pointer";

      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
        <div class="p-2">
          <strong class="text-sm">${store.name}</strong>
          <p class="text-xs text-gray-600 mt-1">${store.address}</p>
          <p class="text-xs text-blue-600 mt-1">${store.distance.toFixed(2)} km away</p>
        </div>
      `);

      const marker = new mapboxgl.Marker(el)
        .setLngLat(store.coordinates)
        .setPopup(popup)
        .addTo(map.current!);

      el.addEventListener("click", () => {
        setSelectedStore(store.id);
      });

      markers.current.push(marker);
    });
  }, [stores, userLocation, mounted]);

  // Handle search
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(searchQuery)}.json?access_token=${mapboxgl.accessToken}&limit=1`,
      );
      const data = await response.json();

      if (data.features && data.features.length > 0) {
        const [lng, lat] = data.features[0].center;
        const newLocation: [number, number] = [lng, lat];
        setUserLocation(newLocation);
        map.current?.flyTo({ center: newLocation, zoom: 13 });
      } else {
        alert("Location not found. Please try another search.");
      }
    } catch (error) {
      console.error("Search error:", error);
      alert("Error searching location. Please try again.");
    } finally {
      setIsSearching(false);
    }
  };

  // Handle store click
  const handleStoreClick = (store: StoreWithDistance) => {
    setSelectedStore(store.id);
    map.current?.flyTo({ center: store.coordinates, zoom: 15 });
  };

  if (!mounted) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="text-gray-600">Loading map...</div>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full min-h-screen flex-col p-5 pt-12 xl:p-20 ">
      <h1 className="font-semibold text-3xl py-10">{t("title")}</h1>

      <div className="flex flex-col-reverse xl:flex-row gap-5 xl:gap-0 w-full xl:flex-1 min-h-0">
        {/* Sidebar */}
        <div className="w-full xl:w-96 overflow-y-auto bg-white">
          {/* Search Box */}
          <div className="w-full xl:pr-4 pb-5 ">
            <div className="flex gap-2 w-full border-2 border-pink-800">
              <div className="flex flex-1 items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  placeholder={t("locationPlaceholder")}
                  className="flex-1 rounded-md px-3 py-2 text-sm outline-none"
                />
              </div>

              <button
                onClick={handleSearch}
                disabled={isSearching}
                className=" bg-pink-700 px-5 py-2 text-sm font-medium text-white hover:bg-pink-800 hover:cursor-pointer active:bg-pink-900 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSearching ? t("searching"): t("search")}
              </button>
            </div>
          </div>
          {/* Store List */}
          <div className="xl:pr-4">
            <h3 className="mb-4 text-base font-semibold text-gray-600">
              {stores.length} {t("nearYou")}
            </h3>
            <div className="flex flex-col gap-3">
              {stores.map((store) => (
                <div
                  key={store.id}
                  onClick={() => handleStoreClick(store)}
                  className={`cursor-pointer rounded-lg border-2 border-slate-400 p-4 transition-all hover:shadow-md ${
                    selectedStore === store.id
                      ? "bg-slate-50"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <div className="mb-2 flex items-start justify-between">
                    <h4 className="text-base font-semibold">{store.name}</h4>
                    <span className="whitespace-nowrap rounded-full bg-slate-200 px-2 py-1 text-xs font-medium text-blue-800">
                      {store.distance.toFixed(2)} km
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{store.address}</p>
                  {store.phone && (
                    <p className="mt-1 text-sm text-blue-600">{store.phone}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="relative flex-1 min-h-0">
          <div
            ref={mapContainer}
            className="w-full h-92 xl:h-full xl:min-h-screen max-h-[720px]"
          />
        </div>
      </div>
    </div>
  );
}
