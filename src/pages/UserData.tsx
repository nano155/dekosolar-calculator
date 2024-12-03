import React, { useState } from "react";

interface FormData {
  firstName: string;
  lastName: string;
  installationType: string;
  address: string;
}

export const UserData: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    installationType: "",
    address: "",
  });

  const [step, setStep] = useState<number>(1);

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
    setStep((prev) => prev + 1);
  };

  const handlePrevStep = () => {
    setStep((prev) => prev - 1);
  };

  return (
    <div className="flex items-center flex-col justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-1/3">
        <h3 className="text-xl font-bold mb-2 text-center">
          ¡Queremos conocerte!
        </h3>
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
                {formData.installationType === "" && (
                  <option value="" disabled hidden>
                    Selecciona el tipo de instalación
                  </option>
                )}
                <option value="residencial">Residencial</option>
                <option value="comercial">Comercial</option>
              </select>
              <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                ▼
              </span>
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
            {step < 4 ? (
              <button
                type="button"
                onClick={handleNextStep}
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
      </div>
    </div>
  );
};

