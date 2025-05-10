import { useRef, useEffect, useState } from "react";
import { Plus, Minus, Droplets, Thermometer, Wind } from "lucide-react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { Style, Fill, Stroke, Circle as CircleStyle } from "ol/style";

const WeatherMap = ({
  lat = 0,
  lon = 0,
  city = "Unknown",
  country = "Unknown",
  pressure = 0,
  temperature = 0,
  precipitation = 0,
  windSpeed = 0,
}) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [activeLayer, setActiveLayer] = useState("precipitation");

  useEffect(() => {
    try {
      const latitude = Number(lat);
      const longitude = Number(lon);

      if (isNaN(latitude) || isNaN(longitude)) {
        throw new Error("Invalid coordinates");
      }

      const position = fromLonLat([longitude, latitude]);

      const marker = new Feature({
        geometry: new Point(position),
      });

      const markerStyle = new Style({
        image: new CircleStyle({
          radius: 8,
          fill: new Fill({ color: "#ff4d8f" }),
          stroke: new Stroke({ color: "white", width: 2 }),
        }),
      });

      marker.setStyle(markerStyle);

      const vectorSource = new VectorSource({
        features: [marker],
      });

      const vectorLayer = new VectorLayer({
        source: vectorSource,
      });

      if (!mapInstanceRef.current) {
        mapInstanceRef.current = new Map({
          target: mapRef.current,
          layers: [
            new TileLayer({
              source: new OSM(),
            }),
            vectorLayer,
          ],
          view: new View({
            center: position,
            zoom: 10,
          }),
          controls: [],
        });
        setMapLoaded(true);
      } else {
        mapInstanceRef.current.getView().setCenter(position);
        const features = vectorSource.getFeatures();
        if (features.length > 0) {
          features[0].getGeometry().setCoordinates(position);
        }
      }
    } catch (err) {
      setError(err.message);
      console.error("Map initialization error:", err);
    }
  }, [lat, lon]);

  const handleZoomIn = () => {
    if (mapInstanceRef.current) {
      const view = mapInstanceRef.current.getView();
      const zoom = view.getZoom();
      view.setZoom(zoom + 1);
    }
  };

  const handleZoomOut = () => {
    if (mapInstanceRef.current) {
      const view = mapInstanceRef.current.getView();
      const zoom = view.getZoom();
      view.setZoom(zoom - 1);
    }
  };

  const getLayerStyle = () => {
    switch (activeLayer) {
      case "precipitation":
        return {
          background: `radial-gradient(circle at center,
            rgba(0, 255, 200, ${precipitation * 0.1}) 0%,
            rgba(0, 150, 255, ${precipitation * 0.08}) 50%,
            rgba(0, 100, 200, ${precipitation * 0.05}) 100%)`,
        };
      case "temperature":
        return {
          background: `radial-gradient(circle at center,
            rgba(255, ${Math.max(0, 255 - temperature * 8)}, 0, 0.6) 0%,
            rgba(255, ${Math.max(0, 255 - temperature * 6)}, 0, 0.4) 50%,
            rgba(255, ${Math.max(0, 255 - temperature * 4)}, 0, 0.2) 100%)`,
        };
      case "wind":
        return {
          background: `radial-gradient(circle at center,
            rgba(200, 200, 255, ${windSpeed * 0.1}) 0%,
            rgba(150, 150, 255, ${windSpeed * 0.08}) 50%,
            rgba(100, 100, 255, ${windSpeed * 0.05}) 100%)`,
        };
      default:
        return {};
    }
  };

  if (error) {
    return (
      <div className="bg-[#2a2a2a] p-4 rounded-3xl">
        <div className="text-red-400">Error loading map: {error}</div>
      </div>
    );
  }

  return (
    <div className="bg-[#2a2a2a] p-4 rounded-3xl">
      <div className="relative h-80 w-full rounded-xl overflow-hidden">
        <div ref={mapRef} className="absolute inset-0" />
        <div className="absolute inset-0" style={getLayerStyle()} />

        {/* Pressure Display */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-[#222]/80 flex items-center justify-center z-10">
          <div className="text-center">
            <p className="text-xl font-medium">
              {pressure ? Math.round(pressure) : "N/A"}
            </p>
            <p className="text-xs text-gray-400">hPa</p>
          </div>
        </div>

        {/* Controls */}
        <div className="absolute right-2 bottom-20 flex flex-col space-y-2 z-10">
          <button
            onClick={handleZoomIn}
            className="w-8 h-8 bg-white rounded-md flex items-center justify-center text-black"
          >
            <Plus size={16} />
          </button>
          <button
            onClick={handleZoomOut}
            className="w-8 h-8 bg-white rounded-md flex items-center justify-center text-black"
          >
            <Minus size={16} />
          </button>
        </div>

        {/* Layer Controls */}
        <div className="absolute bottom-4 right-4 flex space-x-2 z-10">
          <button
            className={`p-2 rounded-full ${
              activeLayer === "precipitation" ? "bg-[#ff4d8f]" : "bg-[#333]"
            }`}
            onClick={() => setActiveLayer("precipitation")}
          >
            <Droplets size={16} />
          </button>
          <button
            className={`p-2 rounded-full ${
              activeLayer === "temperature" ? "bg-[#ff4d8f]" : "bg-[#333]"
            }`}
            onClick={() => setActiveLayer("temperature")}
          >
            <Thermometer size={16} />
          </button>
          <button
            className={`p-2 rounded-full ${
              activeLayer === "wind" ? "bg-[#ff4d8f]" : "bg-[#333]"
            }`}
            onClick={() => setActiveLayer("wind")}
          >
            <Wind size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WeatherMap;
