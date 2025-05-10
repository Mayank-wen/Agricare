import React, { useState, useEffect, useCallback, memo, useRef } from "react";
import axios from "axios";
import styled from "styled-components";
import Loader from "../Components/Loader";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import XYZ from "ol/source/XYZ";
import { fromLonLat, transform } from "ol/proj";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { Circle, Fill, Stroke, Style } from "ol/style";
import Draw from "ol/interaction/Draw";
import { getArea } from "ol/sphere";

// Add this styled component
const NotificationContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  padding: 15px 20px;
  border-radius: 4px;
  background: ${(props) => (props.$type === "error" ? "#ff4757" : "#2ecc71")};
  color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  gap: 10px;
`;

// Add this styled component for the recommendation display
const RecommendationSection = styled.div`
  margin-top: 20px;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const CropTitle = styled.h3`
  color: #2ecc71;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const CropImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin: 10px 0;
`;

const PageContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  overflow: hidden;
`;

const Sidebar = styled.aside`
  width: 350px;
  min-width: 350px;
  background-color: #f8f9fa;
  padding: 20px;
  overflow-y: auto;
  border-right: 1px solid #e9ecef;
  z-index: 1;
`;

// Update the MapContainer and MapWrapper components
const MapContainerStyled = styled.div`
  flex: 1;
  position: relative;
  height: 100vh;
  overflow: hidden;
`;

const MapWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

  .ol-map {
    width: 100%;
    height: 100%;
  }

  .ol-control {
    background: white;
    padding: 5px;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

const ResultCard = styled.div`
  background: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 20px;

  h2 {
    color: #333;
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 8px;
  }

  p {
    color: #2ecc71;
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 12px;
  }

  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 4px;
    margin-top: 10px;
  }
`;

const SoilDataContainer = styled.div`
  margin: 20px 0;
  background: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 300px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const InputGroup = styled.div`
  margin-bottom: 15px;

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type="number"] {
    -moz-appearance: textfield;
  }
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
`;

const ErrorNotification = styled.div`
  background: #fff3f3;
  color: #d63031;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 15px;
`;

const LoadingText = styled.div`
  margin-top: 10px;
  color: #666;
`;

// Add this with the other styled components
const SoilDataInfo = styled.div`
  margin-top: 15px;
  padding: 12px;
  background: #f8f9fa;
  border-radius: 4px;
  border-left: 4px solid ${(props) => (props.$error ? "#d63031" : "#666")};
  font-size: 14px;
`;

const WarningText = styled.p`
  color: #d63031;
  font-size: 14px;
  margin-top: 10px;
`;

const InfoText = styled.p`
  color: #666;
  font-size: 14px;
  margin-top: 10px;
`;

const SubmitButton = styled.button`
  background: #2ecc71;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background: #27ae60;
  }

  &:disabled {
    background: #95a5a6;
    cursor: not-allowed;
  }
`;

const ControlsContainer = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ControlGroup = styled.div`
  background: white;
  padding: 10px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const MapToggle = styled.button`
  background: white;
  border: 1px solid #ccc;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.2s;

  &:hover {
    background: #f8f9fa;
    transform: translateY(-1px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  &.active {
    background: #2ecc71;
    color: white;
    border-color: #27ae60;
  }
`;

const Legend = styled.div`
  background: white;
  padding: 12px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  min-width: 200px;
`;

const LegendTitle = styled.div`
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 8px;
  color: #333;
`;

// Update the LegendGradient styled component
const LegendGradient = styled.div`
  height: 12px;
  width: 100%;
  border-radius: 2px;
  background: ${(props) =>
    props.$isHeatmap
      ? "linear-gradient(to right, #ff0000, #ffff00, #00ff00)"
      : "linear-gradient(to right, #d73027, #fdae61, #1a9850)"};
  margin: 8px 0;
`;

const LegendLabels = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #666;

  span {
    position: relative;

    &:before {
      content: "";
      position: absolute;
      top: -14px;
      left: 50%;
      width: 1px;
      height: 6px;
      background: #666;
      transform: translateX(-50%);
    }
  }
`;

// Add near the other styled components
const Label = styled.label`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #333;
  margin-bottom: 4px;
`;

const InfoIcon = styled.span`
  margin-left: 5px;
  color: #666;
  cursor: help;
`;

const ErrorContainer = styled.div`
  text-align: center;
  padding: 2rem;
  margin: 2rem auto;
  max-width: 600px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ErrorIcon = styled.div`
  font-size: 48px;
  margin-bottom: 1rem;
`;

const ErrorTitle = styled.h2`
  color: #d63031;
  margin-bottom: 1rem;
`;

const ErrorMessage = styled.p`
  color: #666;
  margin-bottom: 2rem;
`;

const RetryButton = styled.button`
  background: #2ecc71;
  color: white;
  border: none;
  padding: 0.5rem 2rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background: #27ae60;
  }
`;

const DebugInfo = styled.div`
  font-size: 12px;
  color: #666;
  margin-top: 8px;
  padding: 8px;
  background: #f8f9fa;
  border-radius: 4px;
`;

// Add LocationInfo component
const LocationInfo = styled.div`
  background: white;
  padding: 12px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 15px;
  font-size: 14px;
  color: #333;
  border-left: 4px solid #2ecc71;
`;

const AreaInfo = styled.div`
  background: white;
  padding: 12px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 10px;
  font-size: 14px;
  color: #333;
  border-left: 4px solid #2ecc71;
`;

const cropImages = {
  rice: "https://images.pexels.com/photos/7421204/pexels-photo-7421204.jpeg?auto=compress&cs=tinysrgb&w=600",
  maize:
    "https://images.pexels.com/photos/547264/pexels-photo-547264.jpeg?auto=compress&cs=tinysrgb&w=600",
  chickpea:
    "https://images.pexels.com/photos/3735181/pexels-photo-3735181.jpeg?auto=compress&cs=tinysrgb&w=600",
  kidneybeans:
    "https://media.istockphoto.com/id/1310281043/photo/macro-close-up-of-organic-rajma-or-red-kidney-beans-dal-cleaned-on-a-white-background.jpg?b=1&s=612x612&w=0&k=20&c=L_t1daZiY-CJMcxX0jCm9e7cu5fLIR7HNoYa2WaSQFE=",
  pigeonpeas:
    "https://images.unsplash.com/photo-1604663363827-01e974a26791?q=80&w=500",
  mothbeans:
    "https://images.unsplash.com/photo-1604663363699-63a1e47ab56c?q=80&w=500",
  mungbean:
    "https://images.unsplash.com/photo-1604663363722-d1f698dd15be?q=80&w=500",
  blackgram:
    "https://images.unsplash.com/photo-1604663363734-f566b6f1c6c6?q=80&w=500",
  lentil:
    "https://images.unsplash.com/photo-1604663363745-d1f698dd15bf?q=80&w=500",
  pomegranate:
    "https://images.unsplash.com/photo-1541344999736-83eca272f6fc?q=80&w=500",
  banana:
    "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?q=80&w=500",
  mango: "https://images.unsplash.com/photo-1553279768-865429fa0078?q=80&w=500",
  grapes:
    "https://images.unsplash.com/photo-1596363505729-4190a9506133?q=80&w=500",
  watermelon:
    "https://images.unsplash.com/photo-1563114773-84221bd62daa?q=80&w=500",
  muskmelon:
    "https://images.unsplash.com/photo-1571575173700-afb9492e6a50?q=80&w=500",
  apple: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?q=80&w=500",
  orange:
    "https://images.unsplash.com/photo-1547514701-42782101795e?q=80&w=500",
  papaya:
    "https://images.unsplash.com/photo-1541343672885-9be56236302a?q=80&w=500",
  coconut:
    "https://images.unsplash.com/photo-1581375321224-79da6fd32f6e?q=80&w=500",
  cotton:
    "https://images.unsplash.com/photo-1594016120018-060c8ebab52e?q=80&w=500",
  jute: "https://images.unsplash.com/photo-1580397581145-cdb6a35b7d3f?q=80&w=500",
  coffee:
    "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=500",
}; // Update the ndviLayer configuration
const ndviLayer = {
  baseUrl: "https://earthengine.googleapis.com/map",
  opacity: 0.9,
  params: {
    layers: "NDVI",
    maxcc: 20,
    minZoom: 6,
    maxZoom: 16,
    evalscript: `
      // Earth Engine NDVI calculation
      var getNDVI = function(image) {
        var nir = image.select('B8');
        var red = image.select('B4');
        var ndvi = nir.subtract(red).divide(nir.add(red)).rename('NDVI');
        return ndvi.updateMask(ndvi.gt(-1));
      };

      // Get Sentinel-2 imagery
      var sentinel2 = ee.ImageCollection('COPERNICUS/S2')
        .filterBounds(geometry)
        .filterDate(ee.Date(Date.now()).advance(-30, 'day'), ee.Date(Date.now()))
        .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
        .select(['B4', 'B8'])
        .map(getNDVI)
        .mean();

      // Apply color visualization
      var ndviParams = {
        min: -0.2,
        max: 0.8,
        palette: [
          '000000', // Black for no vegetation
          '000033', // Very dark blue
          '000066', // Dark blue  
          '000099', // Medium blue
          '0000CC', // Light blue
          '0000FF'  // Bright blue
        ]
      };

      return sentinel2.visualize(ndviParams);
    `,
  },
};

// Update the SatelliteOverlay component
const SatelliteOverlay = memo(({ visible, opacity, bounds }) => {
  const map = useMap();

  useEffect(() => {
    if (!visible || !bounds) return;

    let heatLayer;
    const loadHeatmap = async () => {
      try {
        const ndviData = await calculateNDVI(bounds);

        // Create heatmap with optimized canvas settings
        heatLayer = L.heatLayer(
          ndviData.points.map((p) => [p.lat, p.lng, p.value]),
          {
            radius: 25,
            blur: 15,
            maxZoom: 10,
            max: 1.0,
            gradient: {
              0.0: "#d73027",
              0.4: "#fdae61",
              0.7: "#a6d96a",
              1.0: "#1a9850",
            },
            opacity: opacity || 0.7,
            // Add canvas options for better performance
            options: {
              canvas: {
                willReadFrequently: true,
              },
            },
          }
        );

        // Create and configure the canvas context
        const canvas = heatLayer._canvas;
        if (canvas) {
          const ctx = canvas.getContext("2d", { willReadFrequently: true });
          heatLayer._ctx = ctx;
        }

        heatLayer.addTo(map);
      } catch (error) {
        console.error("Error loading vegetation index:", error);
      }
    };

    loadHeatmap();

    return () => {
      if (heatLayer) {
        map.removeLayer(heatLayer);
      }
    };
  }, [map, visible, opacity, bounds]);

  return null;
});

// Update the MapComponent to properly handle map initialization and view updates
const MapComponent = ({ onLocationSelect, center }) => {
  const mapRef = useRef();
  const [map, setMap] = useState(null);
  const [drawLayer, setDrawLayer] = useState(null);
  const [mapView, setMapView] = useState(null);

  useEffect(() => {
    // Initialize map
    const view = new View({
      center: fromLonLat([center.lng, center.lat]),
      zoom: 13,
    });

    const vectorSource = new VectorSource();
    const vectorLayer = new VectorLayer({
      source: vectorSource,
      style: new Style({
        fill: new Fill({
          color: "rgba(46, 204, 113, 0.2)",
        }),
        stroke: new Stroke({
          color: "#27ae60",
          width: 2,
        }),
      }),
    });

    const initialMap = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        vectorLayer,
      ],
      view: view,
    });

    setMap(initialMap);
    setMapView(view);
    setDrawLayer(vectorLayer);

    return () => initialMap.setTarget(undefined);
  }, []);

  // Handle drawing
  useEffect(() => {
    if (!map || !drawLayer) return;

    const draw = new Draw({
      source: drawLayer.getSource(),
      type: "Polygon",
    });

    draw.on("drawend", (event) => {
      const feature = event.feature;
      const polygon = feature.getGeometry();
      const area = getArea(polygon) / 10000; // Convert to hectares
      const extent = polygon.getExtent();
      const center = [(extent[0] + extent[2]) / 2, (extent[1] + extent[3]) / 2];
      const lonLat = transform(center, "EPSG:3857", "EPSG:4326");

      onLocationSelect({
        lat: lonLat[1],
        lon: lonLat[0],
        area: area.toFixed(2),
      });
    });

    map.addInteraction(draw);

    return () => map.removeInteraction(draw);
  }, [map, drawLayer]);

  return <div ref={mapRef} style={{ width: "100%", height: "100%" }} />;
};

const calculateFallbackpH = (lat, lon) => {
  // Basic pH estimation based on general soil patterns
  const isArid = Math.abs(lat) < 30; // Tropical/subtropical regions
  const isCoastal = Math.abs(lon) < 100; // Rough estimate for coastal areas

  if (isArid) {
    return isCoastal ? 7.8 : 8.2; // Arid soils tend to be more alkaline
  } else {
    return isCoastal ? 6.5 : 6.2; // Non-arid soils tend to be slightly acidic
  }
};

// Add near the top of the CropRecommendation component
const CropRecommendation = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState({ lat: 20.5937, lon: 78.9629 });
  const [soilData, setSoilData] = useState({
    N: 50,
    P: 20,
    K: 30,
    pH: 6.5,
  });
  const [weatherData, setWeatherData] = useState(null);
  const [recommendation, setRecommendation] = useState(null);
  const [soilLoading, setSoilLoading] = useState(true);
  const [mapCenter, setMapCenter] = useState({
    lat: 20.5937,
    lng: 78.9629,
  });
  const [notification, setNotification] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Alternative approach using WMS service
  const fetchSoilGridspH = async (lat, lon) => {
    try {
      console.log("🔍 Fetching pH data using WMS for:", { lat, lon });

      const response = await axios.get("https://maps.isric.org/mapserv", {
        params: {
          map: "/map/phh2o.map",
          SERVICE: "WMS",
          VERSION: "1.1.1",
          REQUEST: "GetFeatureInfo",
          LAYERS: "phh2o_0-5cm_mean",
          QUERY_LAYERS: "phh2o_0-5cm_mean",
          STYLES: "",
          SRS: "EPSG:4326",
          BBOX: `${lon - 0.1},${lat - 0.1},${lon + 0.1},${lat + 0.1}`,
          WIDTH: 101,
          HEIGHT: 101,
          X: 50,
          Y: 50,
          INFO_FORMAT: "application/json",
        },
        timeout: 15000,
      });

      if (response.data?.features?.[0]?.properties?.GRAY_INDEX) {
        const pHValue = response.data.features[0].properties.GRAY_INDEX / 10;
        console.log("✅ pH value from WMS:", pHValue);
        return Math.min(14, Math.max(0, pHValue));
      }

      throw new Error("No pH data in WMS response");
    } catch (error) {
      console.warn("⚠️ Failed to fetch pH from WMS:", error.message);
      return calculateFallbackpH(lat, lon);
    }
  };

  // Update the getSoilData function
  const getSoilData = async (lat, lon) => {
    try {
      console.log("🌱 Fetching soil data for coordinates:", { lat, lon });

      // Calculate base values using latitude-based estimation
      const baseValues = {
        N: Math.max(30, Math.min(70, 50 + (Math.abs(lat) - 20))),
        P: Math.max(15, Math.min(25, 20 + (Math.abs(lat) - 20) / 2)),
        K: Math.max(20, Math.min(40, 30 + (Math.abs(lat) - 20) / 3)),
        pH: 6.5,
      };

      // Try to get pH from SoilGrids API
      try {
        const pHValue = await fetchSoilGridspH(lat, lon);
        baseValues.pH = pHValue;
      } catch (pHError) {
        console.warn("pH fetch failed, using fallback value:", pHError);
        baseValues.pH = calculateFallbackpH(lat, lon);
      }

      // Adjust values based on location characteristics
      const isCoastal = Math.abs(lon) < 100;
      const isTropical = Math.abs(lat) < 23.5;

      if (isCoastal) {
        baseValues.K = Math.min(205, baseValues.K * 1.2); // Higher K near coast
      }

      if (isTropical) {
        baseValues.N = Math.min(140, baseValues.N * 1.3); // Higher N in tropical regions
        baseValues.P = Math.min(145, baseValues.P * 1.1); // Slightly higher P
      }

      console.log("Final soil data:", baseValues);
      return baseValues;
    } catch (error) {
      console.error("❌ Soil data fetch error:", error);
      // Return reasonable defaults
      return {
        N: 50,
        P: 20,
        K: 30,
        pH: 6.5,
      };
    }
  };

  const getAgroMonitoringSoilData = async (lat, lon) => {
    const API_KEY = "ecef4528ec977ec8d7ae479bd69182b3";
    const response = await axios.get(
      `https://api.agromonitoring.com/agro/1.0/soil?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );
    return response.data;
  };

  // Update the getRainfallData function
  const getRainfallData = async (lat, lon) => {
    try {
      const endDate = new Date().toISOString().split("T")[0];
      const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0];

      // Add retries for rainfall data
      const retryAxios = async (retries = 3) => {
        for (let i = 0; i < retries; i++) {
          try {
            const response = await axios.get(
              "https://archive-api.open-meteo.com/v1/archive",
              {
                params: {
                  latitude: lat,
                  longitude: lon,
                  start_date: startDate,
                  end_date: endDate,
                  daily: "precipitation_sum",
                  timezone: "auto",
                },
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                timeout: 20000, // Increased timeout to 20 seconds
              }
            );

            if (response.data?.daily?.precipitation_sum) {
              const rainfallValues = response.data.daily.precipitation_sum;
              const validValues = rainfallValues.filter((val) => val !== null);

              if (validValues.length === 0) return 0;

              const avgRainfall =
                validValues.reduce((sum, val) => sum + val, 0) /
                validValues.length;
              return Number(avgRainfall.toFixed(2));
            }
            return 0;
          } catch (err) {
            console.log(`Retry ${i + 1} failed:`, err.message);
            if (i === retries - 1) throw err;
            await new Promise((resolve) => setTimeout(resolve, 2000 * (i + 1))); // Exponential backoff
          }
        }
      };

      return await retryAxios();
    } catch (err) {
      console.error("Error fetching rainfall data:", err);
      // Return estimated rainfall based on season
      const month = new Date().getMonth();
      const isRainySeason = month >= 5 && month <= 8; // June to September
      const defaultRainfall = isRainySeason ? 45 : 20;
      console.log(`Using default rainfall value: ${defaultRainfall}mm`);
      return defaultRainfall;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const controller = new AbortController();

      try {
        // Fetch data with retries
        const retryRequest = async (fn, retries = 3) => {
          for (let i = 0; i < retries; i++) {
            try {
              return await fn();
            } catch (err) {
              if (i === retries - 1) throw err;
              await new Promise((resolve) =>
                setTimeout(resolve, 2000 * (i + 1))
              ); // Exponential backoff
            }
          }
        };

        const [weatherResponse, soilResponse, rainfallData] = await Promise.all(
          [
            retryRequest(() =>
              axios.get(
                `https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=auto`,
                { signal: controller.signal }
              )
            ),
            getSoilData(location.lat, location.lon),
            getRainfallData(location.lat, location.lon),
          ]
        );

        if (controller.signal.aborted) return;

        const cropData = {
          N: soilResponse.N,
          P: soilResponse.P,
          K: soilResponse.K,
          pH: soilResponse.pH,
          temperature: weatherResponse.data.current.temperature_2m,
          humidity: weatherResponse.data.current.relative_humidity_2m,
          rainfall: rainfallData,
        };

        setWeatherData(weatherResponse.data);
        setSoilData(soilResponse);
        setError(null);
      } catch (err) {
        if (err.name === "AbortError") {
          return;
        }
        console.error("Error in fetchData:", err);
        setError(
          err.code === "ECONNABORTED"
            ? "Request timed out. Please try again."
            : "Failed to load data. Please try again later."
        );
      } finally {
        setLoading(false);
        setSoilLoading(false);
      }

      return () => controller.abort();
    };

    fetchData();
  }, [location]);

  useEffect(() => {
    if (soilData && !error) {
      setNotification({
        type: "info",
        message:
          "Using estimated soil data based on your location. For more accurate results, consider soil testing.",
      });
      setTimeout(() => setNotification(null), 5000);
    }
  }, [soilData]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      const [weatherResponse, rainfallData] = await Promise.all([
        axios.get(
          `https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=auto`,
          { timeout: 10000 }
        ),
        getRainfallData(location.lat, location.lon),
      ]);
      const cropData = {
        N: parseFloat(soilData.N),
        P: parseFloat(soilData.P),
        K: parseFloat(soilData.K),
        pH: parseFloat(soilData.pH),
        temperature: parseFloat(weatherResponse.data.current.temperature_2m),
        humidity: parseFloat(weatherResponse.data.current.relative_humidity_2m),
        rainfall: parseFloat(rainfallData),
      };
      const validationRules = {
        N: { min: 0, max: 140 },
        P: { min: 0, max: 145 },
        K: { min: 0, max: 205 },
        pH: { min: 0, max: 14 },
      };

      for (const [key, value] of Object.entries(cropData)) {
        if (
          validationRules[key] &&
          (value < validationRules[key].min || value > validationRules[key].max)
        ) {
          throw new Error(
            `${key} value must be between ${validationRules[key].min} and ${validationRules[key].max}`
          );
        }
      }

      const recommendationResponse = await axios.post(
        "https://croprecommendation-zblr.onrender.com/predict",
        cropData,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          timeout: 45000,
        }
      );

      if (recommendationResponse?.data) {
        setRecommendation(recommendationResponse.data);
        setWeatherData(weatherResponse.data);
      }
    } catch (err) {
      console.error("❌ Error:", err);
      setError(err.message || "Failed to fetch crop recommendation");
      setNotification({
        type: "error",
        message: err.message || "Failed to fetch crop recommendation",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Add a new handler for location selection
  const handleLocationSelect = useCallback(({ lat, lon, area }) => {
    setLocation({ lat, lon, area });
    setSoilLoading(true);
    setError(null);
  }, []);

  // Update the renderSoilInputs function
  const renderSoilInputs = () => {
    if (soilLoading) {
      return (
        <LoaderContainer>
          <Loader />
          <LoadingText>Fetching soil data...</LoadingText>
        </LoaderContainer>
      );
    }

    const handleInputChange = (field, value, min, max) => {
      if (value === "") {
        setSoilData((prev) => ({ ...prev, [field]: "" }));
        return;
      }
      const numValue = parseFloat(value);
      if (!isNaN(numValue)) {
        setSoilData((prev) => ({ ...prev, [field]: numValue }));
      }
    };

    return (
      <SoilDataContainer>
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Label>
              Nitrogen (N) g/kg
              <InfoIcon title="Typical range: 0-140 g/kg">ⓘ</InfoIcon>
            </Label>
            <Input
              type="number"
              step="0.01"
              value={soilData.N}
              onChange={(e) => handleInputChange("N", e.target.value, 0, 140)}
              required
            />
          </InputGroup>

          <InputGroup>
            <Label>
              Phosphorus (P) mg/kg
              <InfoIcon title="Typical range: 0-145 mg/kg">ⓘ</InfoIcon>
            </Label>
            <Input
              type="number"
              step="0.01"
              value={soilData.P}
              onChange={(e) => handleInputChange("P", e.target.value, 0, 145)}
              required
            />
          </InputGroup>

          <InputGroup>
            <Label>
              Potassium (K) cmol/kg
              <InfoIcon title="Typical range: 0-205 cmol/kg">ⓘ</InfoIcon>
            </Label>
            <Input
              type="number"
              step="0.01"
              value={soilData.K}
              onChange={(e) => handleInputChange("K", e.target.value, 0, 205)}
              required
            />
          </InputGroup>

          <InputGroup>
            <Label>
              pH Level
              <InfoIcon title="Typical range: 0-14">ⓘ</InfoIcon>
            </Label>
            <Input
              type="number"
              step="0.1"
              value={soilData.pH}
              onChange={(e) => handleInputChange("pH", e.target.value, 0, 14)}
              required
            />
          </InputGroup>

          <SubmitButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <LoaderContainer>
                <Loader />
                <span>Getting Recommendation...</span>
              </LoaderContainer>
            ) : (
              "Get Crop Recommendation"
            )}
          </SubmitButton>
        </Form>
      </SoilDataContainer>
    );
  };
  return (
    <PageContainer>
      <Sidebar>
        <h2 className="text-xl font-bold mb-4">Crop Recommendation</h2>
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Location</h3>
          {location && (
            <LocationInfo>
              Selected: {location.lat.toFixed(4)}°N, {location.lon.toFixed(4)}°E
            </LocationInfo>
          )}
        </div>
        {renderSoilInputs()}
        {recommendation && (
          <RecommendationSection>
            <CropTitle>Recommended Crop</CropTitle>
            <CropImage
              src={
                cropImages[recommendation.recommended_crop.toLowerCase()] ||
                "https://via.placeholder.com/500x300?text=Crop+Image"
              }
              alt={recommendation.recommended_crop}
              loading="lazy"
            />
            <p>
              Based on your soil and weather conditions, we recommend growing:
            </p>
            <CropTitle>{recommendation.recommended_crop}</CropTitle>
            {recommendation.success && (
              <div style={{ color: "#27ae60", marginTop: "10px" }}>
                ✅ This recommendation is based on analysis of your location's
                conditions
              </div>
            )}
          </RecommendationSection>
        )}
      </Sidebar>
      <MapWrapper>
        <MapComponent
          onLocationSelect={handleLocationSelect}
          center={mapCenter}
        />
      </MapWrapper>
      {notification && (
        <NotificationContainer $type={notification.type}>
          {notification.type === "error" ? "❌" : "✅"} {notification.message}
        </NotificationContainer>
      )}
    </PageContainer>
  );
};
const MapControls = ({ map, showNDVI, setShowNDVI }) => {
  const handleBaseMapChange = (type) => {
    const layers = map.getLayers();
    const baseLayer = layers.item(0);

    if (type === "satellite") {
      baseLayer.setSource(
        new XYZ({
          url: "https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
        })
      );
    } else {
      baseLayer.setSource(new OSM());
    }
  };

  return (
    <ControlsContainer>
      <ControlGroup>
        <MapToggle onClick={() => handleBaseMapChange("streets")}>
          Street Map
        </MapToggle>
        <MapToggle onClick={() => handleBaseMapChange("satellite")}>
          Satellite
        </MapToggle>
      </ControlGroup>

      <ControlGroup>
        <MapToggle onClick={() => setShowNDVI(!showNDVI)}>
          {showNDVI ? "Hide Vegetation Index" : "Show Vegetation Index"}
        </MapToggle>
      </ControlGroup>
    </ControlsContainer>
  );
};

const calculateNDVI = async (bounds) => {
  try {
    console.log("🌿 Fetching NDVI data...", {
      north: bounds.getNorth(),
      south: bounds.getSouth(),
      east: bounds.getEast(),
      west: bounds.getWest(),
    });

    const boundData = {
      north: bounds.getNorth(),
      south: bounds.getSouth(),
      east: bounds.getEast(),
      west: bounds.getWest(),
      zoom: 13, // Add zoom level
    };

    const response = await axios.post(
      "http://localhost:4000/api/ndvi",
      { bounds: boundData },
      {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 30000, // Increase timeout to 30 seconds
      }
    );

    if (!response.data.success) {
      throw new Error(response.data.error || "Failed to fetch NDVI data");
    }

    return {
      points: response.data.data.points,
      bounds: bounds,
    };
  } catch (error) {
    console.error("❌ Error fetching NDVI data:", error);

    // Generate fallback data
    const points = [];
    const center = bounds.getCenter();
    const latSpread = bounds.getNorth() - bounds.getSouth();
    const lngSpread = bounds.getEast() - bounds.getWest();

    // Generate more realistic NDVI values
    for (let i = 0; i < 200; i++) {
      const lat = center.lat + (Math.random() - 0.5) * latSpread;
      const lng = center.lng + (Math.random() - 0.5) * lngSpread;

      // Distance from center affects NDVI value
      const distFromCenter = Math.sqrt(
        Math.pow((lat - center.lat) / (latSpread / 2), 2) +
          Math.pow((lng - center.lng) / (lngSpread / 2), 2)
      );

      const value = Math.max(
        0,
        Math.min(1, 0.7 - distFromCenter * 0.3 + Math.random() * 0.2)
      );

      points.push({ lat, lng, value });
    }

    return {
      points,
      bounds,
    };
  }
};

const fetchSoilGridspH = async (lat, lon) => {
  try {
    console.log("🔍 Fetching pH data from SoilGrids for:", { lat, lon });

    const response = await axios.get(
      "https://rest.isric.org/soilgrids/v2.0/properties/query",
      {
        params: {
          lat: lat,
          lon: lon,
          property: ["phh2o"],
          depth: ["0-5cm"],
          value_type: "mean",
        },
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        timeout: 20000,
      }
    );

    if (response.data?.properties?.phh2o?.values?.[0]) {
      const pHValue = response.data.properties.phh2o.values[0] / 10;
      console.log("✅ pH value from SoilGrids:", pHValue);
      return Math.min(14, Math.max(0, pHValue));
    }

    throw new Error("No pH data in response");
  } catch (error) {
    console.warn("⚠️ Failed to fetch pH from SoilGrids:", error.message);
    return calculateFallbackpH(lat, lon);
  }
};

// Move ErrorBoundary component outside of CropRecommendation
const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const handleError = (event) => {
      event.preventDefault();
      console.error("Error caught by boundary:", event.error || event.message);
      setErrorMessage(event.error?.message || "An unexpected error occurred");
      setHasError(true);
    };

    window.addEventListener("error", handleError);
    window.addEventListener("unhandledrejection", handleError);

    return () => {
      window.removeEventListener("error", handleError);
      window.removeEventListener("unhandledrejection", handleError);
    };
  }, []);

  if (hasError) {
    return (
      <ErrorContainer>
        <ErrorIcon>⚠️</ErrorIcon>
        <ErrorTitle>Oops! Something went wrong</ErrorTitle>
        <ErrorMessage>{errorMessage}</ErrorMessage>
        <RetryButton onClick={() => window.location.reload()}>
          Try Again
        </RetryButton>
      </ErrorContainer>
    );
  }

  return children;
};

export default CropRecommendation;
