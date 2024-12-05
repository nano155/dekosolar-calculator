/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GOOGLE_MAPS_API_KEY: string;
  // Agrega otras variables de entorno aquí si es necesario
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}