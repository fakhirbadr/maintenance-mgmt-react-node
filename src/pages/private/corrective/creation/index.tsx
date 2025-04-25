import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Index = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    region: "",
    province: "",
    site: "",
    type: "",
    nature: "",
    technicien: "",
    responsable: "",
    createdBy: "",
    categorie: "",
    equipement: "",
    besoinCategorie: "",
    besoinEquipement: "",
  });

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e?.target?.value || e, // e can be a string for Select
    }));
  };

  const handleNext = () => setStep(2);
  const handlePrevious = () => setStep(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulaire soumis:", formData);
    // Ajoute ici ta logique d'envoi ou de traitement
  };

  return (
    <div className="w-full p-8">
      <div className="mb-8 text-xl font-semibold">
        Création de maintenance corrective
      </div>

      <div className="flex w-full items-center justify-center">
        <Card className="w-full max-w-4xl">
          <CardHeader>
            <CardTitle>
              {step === 1
                ? "Étape 1 : Informations générales"
                : "Étape 2 : Besoin en pièce de rechange"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-6" onSubmit={handleSubmit}>
              {step === 1 && (
                <>
                  {/* Ligne 1 : Region - Province - Site */}
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div>
                      <Label htmlFor="region">Région</Label>
                      <Input
                        id="region"
                        placeholder="Région"
                        value={formData.region}
                        onChange={handleChange("region")}
                      />
                    </div>
                    <div>
                      <Label htmlFor="province">Province</Label>
                      <Input
                        id="province"
                        placeholder="Province"
                        value={formData.province}
                        onChange={handleChange("province")}
                      />
                    </div>
                    <div>
                      <Label htmlFor="site">Site</Label>
                      <Input
                        id="site"
                        placeholder="Site"
                        value={formData.site}
                        onChange={handleChange("site")}
                      />
                    </div>
                  </div>

                  {/* Ligne 2 : Type - Nature */}
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="type">Type</Label>
                      <Input
                        id="type"
                        placeholder="Type de maintenance"
                        value={formData.type}
                        onChange={handleChange("type")}
                      />
                    </div>
                    <div>
                      <Label htmlFor="nature">Nature</Label>
                      <Select onValueChange={handleChange("nature")}>
                        <SelectTrigger id="nature">
                          <SelectValue placeholder="Sélectionner" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="corrective">Corrective</SelectItem>
                          <SelectItem value="curative">Curative</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Ligne 3 : Technicien - Responsable - Créé par */}
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div>
                      <Label htmlFor="technicien">Technicien</Label>
                      <Input
                        id="technicien"
                        placeholder="Nom du technicien"
                        value={formData.technicien}
                        onChange={handleChange("technicien")}
                      />
                    </div>
                    <div>
                      <Label htmlFor="responsable">Responsable</Label>
                      <Input
                        id="responsable"
                        placeholder="Responsable"
                        value={formData.responsable}
                        onChange={handleChange("responsable")}
                      />
                    </div>
                    <div>
                      <Label htmlFor="createdBy">Créé par</Label>
                      <Input
                        id="createdBy"
                        placeholder="Créé par"
                        value={formData.createdBy}
                        onChange={handleChange("createdBy")}
                      />
                    </div>
                  </div>

                  {/* Ligne 4 : Catégorie de panne - Équipement */}
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="categorie">Catégorie de panne</Label>
                      <Input
                        id="categorie"
                        placeholder="Catégorie"
                        value={formData.categorie}
                        onChange={handleChange("categorie")}
                      />
                    </div>
                    <div>
                      <Label htmlFor="equipement">Équipement</Label>
                      <Input
                        id="equipement"
                        placeholder="Équipement concerné"
                        value={formData.equipement}
                        onChange={handleChange("equipement")}
                      />
                    </div>
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <div className="mb-2 text-lg font-medium">
                    Est-ce que votre réparation a besoin d'une pièce de rechange
                    ?
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="besoinCategorie">
                        Catégorie de besoin
                      </Label>
                      <Input
                        id="besoinCategorie"
                        placeholder="Catégorie"
                        value={formData.besoinCategorie}
                        onChange={handleChange("besoinCategorie")}
                      />
                    </div>
                    <div>
                      <Label htmlFor="besoinEquipement">Équipement</Label>
                      <Input
                        id="besoinEquipement"
                        placeholder="Équipement"
                        value={formData.besoinEquipement}
                        onChange={handleChange("besoinEquipement")}
                      />
                    </div>
                  </div>
                </>
              )}
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            {step === 2 ? (
              <>
                <Button variant="outline" onClick={handlePrevious}>
                  Retour
                </Button>
                <Button onClick={handleSubmit}>Soumettre</Button>
              </>
            ) : (
              <Button onClick={handleNext}>Suivant</Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Index;
