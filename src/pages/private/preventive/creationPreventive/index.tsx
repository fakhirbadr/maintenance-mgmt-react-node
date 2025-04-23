import React from "react";
import { CardWithPreventiveForm } from "./CardWithPreventiveForm";

const Index = () => {
  return (
    <div className="relative min-h-screen">
      {/* Titre en haut */}
      <h2 className="pt-4 pl-6 text-xl font-bold dark:text-white">
        Création d'une maintenance planifiée
      </h2>

      {/* Conteneur principal centré avec pourcentages */}
      <div
        className="absolute top-1/2 left-1/2 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 transform px-4"
        style={{ width: "90%" }} // Ajustement en pourcentage si nécessaire
      >
        <CardWithPreventiveForm />
      </div>
    </div>
  );
};

export default Index;
