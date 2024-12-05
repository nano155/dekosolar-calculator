import React, { useCallback} from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

interface MapComponentProps {
  setAreaData: React.Dispatch<React.SetStateAction<{
    area: string;
    latitude: number;
    longitude: number;
  }>>;
  onMapLoad?: (map: google.maps.Map) => void;  // Añadir la propiedad onMapLoad
}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const libraries = ["drawing", "geometry"] as any[]; // Manteniendo el tipo según lo usado

export const MapComponent: React.FC<MapComponentProps> = ({ setAreaData }) => {
 

  const showArea = useCallback((shape: google.maps.Polygon) => {
    const area = google.maps.geometry.spherical.computeArea(shape.getPath());
    const path = shape.getPath();
    const bounds = new google.maps.LatLngBounds();
    path.forEach((latLng) => bounds.extend(latLng));
    const polygonCenter = bounds.getCenter();

    const areaInSquareMeters = area.toFixed(2);

    setAreaData({
      area: `Área: ${areaInSquareMeters} m²`,
      latitude: polygonCenter.lat(),
      longitude: polygonCenter.lng(),
    });
  }, [setAreaData]);

  const handleMapLoad = (map: google.maps.Map) => {
    const manager = new google.maps.drawing.DrawingManager({
      drawingMode: google.maps.drawing.OverlayType.POLYGON,
      drawingControl: true,
      polygonOptions: {
        editable: true,
        draggable: true,
      },
    });

    manager.setMap(map);

    google.maps.event.addListener(manager, "overlaycomplete", function (event: google.maps.drawing.OverlayCompleteEvent) {
      if (event.type === google.maps.drawing.OverlayType.POLYGON && event.overlay instanceof google.maps.Polygon) {
        const shape = event.overlay;
        showArea(shape);
      }
    });
  };

  return (
    <div>
      <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ""} libraries={libraries}>
        <GoogleMap
          mapContainerStyle={{ height: "400px", width: "100%" }}
          center={{ lat: 40.7128, lng: -74.006 }}
          zoom={12}
          onLoad={handleMapLoad}
        />
      </LoadScript>
    </div>
  );
};


// import { useCallback, useState } from "react";
// import { GoogleMap, LoadScript } from "@react-google-maps/api";

// // Define las bibliotecas como un array de cadenas (string[])
// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// const libraries = ['drawing', 'geometry'] as any[];

// export const MapComponent = () => {
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   const [drawingManager, setDrawingManager] = useState<google.maps.drawing.DrawingManager | null>(null);
//   const [areaData, setAreaData] = useState<{ area: string; latitude: number; longitude: number }>({
//     area: "",
//     latitude: 0,
//     longitude: 0,
//   });

//   const showArea = useCallback((shape: google.maps.Polygon) => {
//     const area = google.maps.geometry.spherical.computeArea(shape.getPath());
//     const path = shape.getPath();
//     const bounds = new google.maps.LatLngBounds();
//     path.forEach((latLng) => bounds.extend(latLng));
//     const polygonCenter = bounds.getCenter();

//     const areaInSquareMeters = area.toFixed(2);

//     setAreaData({
//       area: `Área: ${areaInSquareMeters} m²`,
//       latitude: polygonCenter.lat(),
//       longitude: polygonCenter.lng(),
//     });
//   }, []);

//   const handleMapLoad = (map: google.maps.Map) => {
//     const manager = new google.maps.drawing.DrawingManager({
//       drawingMode: google.maps.drawing.OverlayType.POLYGON,
//       drawingControl: true,
//       polygonOptions: {
//         editable: true,
//         draggable: true,
//       },
//     });
//     manager.setMap(map);
//     setDrawingManager(manager);

//     google.maps.event.addListener(manager, "overlaycomplete", function (event: google.maps.drawing.OverlayCompleteEvent) {
//       if (event.type === google.maps.drawing.OverlayType.POLYGON && event.overlay instanceof google.maps.Polygon) {
//         const shape = event.overlay;
//         showArea(shape);
//       }
//     });
//   };

//   return (
//     <div>
//       <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ""} libraries={libraries}>
//         <GoogleMap
//           mapContainerStyle={{ height: "400px", width: "100%" }}
//           center={{ lat: 40.7128, lng: -74.0060 }}
//           zoom={12}
//           onLoad={handleMapLoad}
//         />
//       </LoadScript>
//       <div>
//         <p>{areaData.area}</p>
//         <p>Latitud: {areaData.latitude}</p>
//         <p>Longitud: {areaData.longitude}</p>
//       </div>
//     </div>
//   );
// };
