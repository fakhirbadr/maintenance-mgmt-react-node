import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
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
import { Textarea } from "@/components/ui/textarea";

export function CardWithPreventiveForm() {
  return (
    <Card className="w-[500px]">
      <CardHeader>
        <CardTitle>Nouvelle Maintenance Préventive</CardTitle>
        <CardDescription>
          Renseignez les informations de la tâche planifiée.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          {/* Titre de la tâche */}
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="title">Titre</Label>
            <Input id="title" placeholder="Ex : Vérification climatisation" />
          </div>

          {/* Localisation - sur une seule ligne */}
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="region">Région</Label>
              <Input id="region" placeholder="Région" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="province">Province</Label>
              <Input id="province" placeholder="Province" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="site">Nom du site</Label>
              <Input id="site" placeholder="Nom du site" />
            </div>
          </div>

          {/* Type de maintenance et Date prévue - sur la même ligne */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="type">Type de maintenance</Label>
              <Select>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Choisir un type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mensuelle">Mensuelle</SelectItem>
                  <SelectItem value="trimestrielle">Trimestrielle</SelectItem>
                  <SelectItem value="annuelle">Annuelle</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="date">Date prévue</Label>
              <Input id="date" type="date" />
            </div>
          </div>

          {/* Responsable */}
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="technician">Responsable</Label>
            <Input id="technician" placeholder="Nom du technicien" />
          </div>

          {/* Description */}
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Détaillez les actions à effectuer..."
            />
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        <Button variant="outline">Annuler</Button>
        <Button type="submit">Créer</Button>
      </CardFooter>
    </Card>
  );
}
