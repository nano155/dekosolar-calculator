import React, { useState } from "react";
import { MapComponent } from "./MapComponent"; // Asegúrate de que la ruta esté correcta

interface FormData {
  firstName: string;
  lastName: string;
  installationType: string;
  address: string;
}

export interface AreaData {
  area: string;
  latitude: number;
  longitude: number;
}

export const UserData: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    installationType: "",
    address: "",
  });

  const [areaData, setAreaData] = useState<AreaData>({
    area: "",
    latitude: 0,
    longitude: 0,
  });

  const [step, setStep] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isMapLoaded, setIsMapLoaded] = useState<boolean>(false);  // Estado para verificar si el mapa ha cargado

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNextStep = () => {
    if (step === 1 && formData.firstName.trim() === "") {
      alert("Por favor, ingresa tu nombre.");
      return;
    }
    if (step === 2 && formData.lastName.trim() === "") {
      alert("Por favor, ingresa tu apellido.");
      return;
    }
    if (step === 3 && formData.installationType.trim() === "") {
      alert("Por favor, selecciona el tipo de instalación.");
      return;
    }
    if (step === 4 && formData.address.trim() === "") {
      alert("Por favor, ingresa tu dirección.");
      return;
    }

    // Aseguramos que la carga se maneje cuando llegamos al paso 5
    if (step === 4) {
      setIsLoading(true);
      setIsMapLoaded(false); // Al empezar la carga, aseguramos que el mapa no esté cargado aún
      setTimeout(() => {
        setIsLoading(false);
        setStep((prev) => prev + 1);  // Solo pasa al paso siguiente después de la "carga"
      }, 2000); // Simula un pequeño retraso (2 segundos) para el loading
      return;
    }

    setStep((prev) => prev + 1);
  };

  const handlePrevStep = () => {
    setStep((prev) => prev - 1);
  };

  const handleMapLoad = () => {
    setIsMapLoaded(true);  // Esto se llama cuando el mapa está cargado
  };

  return (
    <div className="flex items-center flex-col justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-1/3">
        <h3 className="text-xl font-bold mb-2 text-center">¡Queremos conocerte!</h3>
        <p className="mb-6 text-center text-gray-600">Ingresa tus datos</p>
        <form className="flex flex-col gap-6">
          {step === 1 && (
            <input
              type="text"
              name="firstName"
              placeholder="Nombre"
              value={formData.firstName}
              onChange={handleInputChange}
              className="px-4 py-2 border border-gray-300 rounded-full w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          )}
          {step === 2 && (
            <input
              type="text"
              name="lastName"
              placeholder="Apellido"
              value={formData.lastName}
              onChange={handleInputChange}
              className="px-4 py-2 border border-gray-300 rounded-full w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          )}
          {step === 3 && (
            <div className="relative">
              <select
                name="installationType"
                value={formData.installationType}
                onChange={handleInputChange}
                className="px-4 py-2 pr-8 border border-gray-300 rounded-full w-full focus:ring-2 focus:ring-blue-400 focus:outline-none appearance-none"
              >
                <option value="" disabled hidden>
                  Selecciona el tipo de instalación
                </option>
                <option value="residencial">Residencial</option>
                <option value="comercial">Comercial</option>
              </select>
              <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none">▼</span>
            </div>
          )}
          {step === 4 && (
            <input
              type="text"
              name="address"
              placeholder="Dirección"
              value={formData.address}
              onChange={handleInputChange}
              className="px-4 py-2 border border-gray-300 rounded-full w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          )}
          {step === 5 && !isLoading && (
            <div>
              <MapComponent setAreaData={setAreaData} onMapLoad={handleMapLoad} />  {/* Asegúrate de que MapComponent pueda recibir esta función */}
            </div>
          )}

          {isLoading && step === 5 && (
            <div className="text-center">
              <p className="text-gray-600">Cargando mapa...</p>
            </div>
          )}

          <div className="flex justify-between items-center">
            {step > 1 && (
              <button
                type="button"
                onClick={handlePrevStep}
                className="bg-gray-500 text-white py-2 px-4 rounded-full hover:bg-gray-600 transition"
              >
                Anterior
              </button>
            )}
            {step < 5 ? (
              <button
                type="button"
                onClick={handleNextStep}
                disabled={isLoading || (step === 5 && !isMapLoaded)}  // Deshabilitar si el mapa no está cargado o está en carga
                className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition ml-auto"
              >
                Continuar
              </button>
            ) : (
              <button
                type="submit"
                className="bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600 transition ml-auto"
                onClick={() => alert("¡Formulario enviado!")}
              >
                Finalizar
              </button>
            )}
          </div>
        </form>

        {/* Mostrar los datos del área solo si están disponibles */}
        {areaData && areaData.area && (
          <div className="mt-6">
            <h4 className="font-semibold">Datos del área seleccionada:</h4>
            <p>{areaData.area}</p>
            <p>Latitud: {areaData.latitude}</p>
            <p>Longitud: {areaData.longitude}</p>
          </div>
        )}
      </div>
    </div>
  );
};




// import React, { useState } from "react";
// import { MapComponent } from "./MapComponent"; // Asegúrate de que la ruta esté correcta

// interface FormData {
//   firstName: string;
//   lastName: string;
//   installationType: string;
//   address: string;
// }

// export interface AreaData {
//   area: string;
//   latitude: number;
//   longitude: number;
// }

// interface UserDataProps {
//   areaData: AreaData;
//   setAreaData: React.Dispatch<React.SetStateAction<AreaData>>; // Para actualizar el área desde el mapa
// }

// export const UserData: React.FC<UserDataProps> = ({ areaData, setAreaData }) => {
//   const [formData, setFormData] = useState<FormData>({
//     firstName: "",
//     lastName: "",
//     installationType: "",
//     address: "",
//   });

//   const [step, setStep] = useState<number>(1);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleNextStep = () => {
//     if (step === 1 && formData.firstName.trim() === "") {
//       alert("Por favor, ingresa tu nombre.");
//       return;
//     }
//     if (step === 2 && formData.lastName.trim() === "") {
//       alert("Por favor, ingresa tu apellido.");
//       return;
//     }
//     if (step === 3 && formData.installationType.trim() === "") {
//       alert("Por favor, selecciona el tipo de instalación.");
//       return;
//     }
//     if (step === 4 && formData.address.trim() === "") {
//       alert("Por favor, ingresa tu dirección.");
//       return;
//     }

//     setStep((prev) => prev + 1);
//   };

//   const handlePrevStep = () => {
//     setStep((prev) => prev - 1);
//   };

//   return (
//     <div className="flex items-center flex-col justify-center h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-md w-1/3">
//         <h3 className="text-xl font-bold mb-2 text-center">¡Queremos conocerte!</h3>
//         <p className="mb-6 text-center text-gray-600">Ingresa tus datos</p>
//         <form className="flex flex-col gap-6">
//           {step === 1 && (
//             <input
//               type="text"
//               name="firstName"
//               placeholder="Nombre"
//               value={formData.firstName}
//               onChange={handleInputChange}
//               className="px-4 py-2 border border-gray-300 rounded-full w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
//             />
//           )}
//           {step === 2 && (
//             <input
//               type="text"
//               name="lastName"
//               placeholder="Apellido"
//               value={formData.lastName}
//               onChange={handleInputChange}
//               className="px-4 py-2 border border-gray-300 rounded-full w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
//             />
//           )}
//           {step === 3 && (
//             <div className="relative">
//               <select
//                 name="installationType"
//                 value={formData.installationType}
//                 onChange={handleInputChange}
//                 className="px-4 py-2 pr-8 border border-gray-300 rounded-full w-full focus:ring-2 focus:ring-blue-400 focus:outline-none appearance-none"
//               >
//                 <option value="" disabled hidden>
//                   Selecciona el tipo de instalación
//                 </option>
//                 <option value="residencial">Residencial</option>
//                 <option value="comercial">Comercial</option>
//               </select>
//               <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none">▼</span>
//             </div>
//           )}
//           {step === 4 && (
//             <input
//               type="text"
//               name="address"
//               placeholder="Dirección"
//               value={formData.address}
//               onChange={handleInputChange}
//               className="px-4 py-2 border border-gray-300 rounded-full w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
//             />
//           )}
//           {step === 5 && (
//             <div>
//               {/* Aquí renderizamos el mapa solo en el último paso */}
//               <MapComponent setAreaData={setAreaData} />
//             </div>
//           )}

//           <div className="flex justify-between items-center">
//             {step > 1 && (
//               <button
//                 type="button"
//                 onClick={handlePrevStep}
//                 className="bg-gray-500 text-white py-2 px-4 rounded-full hover:bg-gray-600 transition"
//               >
//                 Anterior
//               </button>
//             )}
//             {step < 5 ? (
//               <button
//                 type="button"
//                 onClick={handleNextStep}
//                 className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition ml-auto"
//               >
//                 Continuar
//               </button>
//             ) : (
//               <button
//                 type="submit"
//                 className="bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600 transition ml-auto"
//                 onClick={() => alert("¡Formulario enviado!")}
//               >
//                 Finalizar
//               </button>
//             )}
//           </div>
//         </form>

//         {/* Mostrar los datos del área solo si están disponibles */}
//         {areaData && areaData.area && (
//           <div className="mt-6">
//             <h4 className="font-semibold">Datos del área seleccionada:</h4>
//             <p>{areaData.area}</p>
//             <p>Latitud: {areaData.latitude}</p>
//             <p>Longitud: {areaData.longitude}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };
