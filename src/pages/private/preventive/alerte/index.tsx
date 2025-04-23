"use client";

import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  ExclamationTriangleIcon,
  CalendarIcon,
  InfoCircledIcon,
  ClockIcon,
} from "@radix-ui/react-icons";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type MaintenanceAlert = {
  id: string;
  titre: string;
  date: string;
  datePrevue: string;
  priorite: "haute" | "moyenne" | "basse";
  description: string;
  site: string;
};

const Index = () => {
  const alertes: MaintenanceAlert[] = [
    {
      id: "1",
      titre: "Maintenance des climatiseurs",
      date: "2024-05-10",
      datePrevue: "2024-05-15",
      priorite: "haute",
      description:
        "Les climatiseurs du bâtiment A nécessitent une maintenance urgente",
      site: "Bâtiment A",
    },
    {
      id: "2",
      titre: "Vérification des extincteurs",
      date: "2024-05-12",
      datePrevue: "2024-05-18",
      priorite: "moyenne",
      description: "Contrôle périodique des extincteurs selon le planning",
      site: "Bâtiment B",
    },
    {
      id: "3",
      titre: "Maintenance ascenseur",
      date: "2024-05-05",
      datePrevue: "2024-05-08",
      priorite: "haute",
      description: "L'ascenseur du hall principal est hors service",
      site: "Hall principal",
    },
    {
      id: "4",
      titre: "Nettoyage réservoir d'eau",
      date: "2024-05-20",
      datePrevue: "2024-05-22",
      priorite: "basse",
      description: "Nettoyage semestriel du réservoir d'eau potable",
      site: "Zone technique",
    },
  ];

  const calculateRetard = (datePrevue: string) => {
    const datePrevueObj = new Date(datePrevue);
    const maintenant = new Date();
    const diffHeures =
      (maintenant.getTime() - datePrevueObj.getTime()) / (1000 * 60 * 60);
    return Math.max(0, diffHeures);
  };

  const alertesEnRetard = alertes
    .filter((alerte) => calculateRetard(alerte.datePrevue) > 24)
    .sort(
      (a, b) => calculateRetard(b.datePrevue) - calculateRetard(a.datePrevue),
    );

  const getPriorityBadge = (priorite: string) => {
    switch (priorite) {
      case "haute":
        return <Badge className="bg-red-500 hover:bg-red-600">Haute</Badge>;
      case "moyenne":
        return (
          <Badge className="bg-yellow-500 hover:bg-yellow-600">Moyenne</Badge>
        );
      case "basse":
        return <Badge className="bg-green-500 hover:bg-green-600">Basse</Badge>;
      default:
        return (
          <Badge className="bg-gray-500 hover:bg-gray-600">Inconnue</Badge>
        );
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatRetard = (heures: number) => {
    const jours = Math.floor(heures / 24);
    const heuresRestantes = Math.floor(heures % 24);
    return `${jours}j ${heuresRestantes}h`;
  };

  return (
    <div className="space-y-6 p-6">
      <h2 className="text-2xl font-bold dark:text-white">Alertes en retard</h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card className="overflow-hidden rounded-lg border-0 p-1 shadow-md transition-all duration-300 hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 px-5 pt-5 pb-2">
            <CardTitle className="font-serif text-sm font-medium">
              Total en retard
            </CardTitle>
            <ExclamationTriangleIcon className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent className="px-5 pb-5">
            <div className="text-2xl font-bold text-slate-700">
              {alertesEnRetard.length}
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden rounded-lg border-0 p-1 shadow-md transition-all duration-300 hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 px-5 pt-5 pb-2">
            <CardTitle className="font-serif text-sm font-medium">
              Plus gros retard
            </CardTitle>
            <ClockIcon className="h-5 w-5 text-teal-600" />
          </CardHeader>
          <CardContent className="px-5 pb-5">
            <div className="text-2xl font-bold text-slate-700">
              {alertesEnRetard.length > 0
                ? formatRetard(calculateRetard(alertesEnRetard[0].datePrevue))
                : "0h"}
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden rounded-lg border-0 p-1 shadow-md transition-all duration-300 hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 px-5 pt-5 pb-2">
            <CardTitle className="font-serif text-sm font-medium">
              Moyenne de retard
            </CardTitle>
            <InfoCircledIcon className="h-5 w-5 text-indigo-600" />
          </CardHeader>
          <CardContent className="px-5 pb-5">
            <div className="text-2xl font-bold text-slate-700">
              {alertesEnRetard.length > 0
                ? formatRetard(
                    alertesEnRetard.reduce(
                      (sum, alerte) => sum + calculateRetard(alerte.datePrevue),
                      0,
                    ) / alertesEnRetard.length,
                  )
                : "0h"}
            </div>
          </CardContent>
        </Card>
      </div>

      {alertesEnRetard.length > 0 ? (
        <>
          <Alert variant="destructive">
            <ExclamationTriangleIcon className="h-5 w-5 text-red-600" />
            <AlertTitle>Alertes critiques</AlertTitle>
            <AlertDescription>
              {alertesEnRetard.length} maintenance(s) en retard de plus de 24h
              nécessitent votre attention
            </AlertDescription>
          </Alert>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Titre</TableHead>
                  <TableHead>Site</TableHead>
                  <TableHead>Date prévue</TableHead>
                  <TableHead>Retard</TableHead>
                  <TableHead>Priorité</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {alertesEnRetard.map((alerte) => {
                  const retard = calculateRetard(alerte.datePrevue);
                  return (
                    <TableRow key={alerte.id} className="hover:bg-slate-50">
                      <TableCell className="font-medium">
                        {alerte.titre}
                      </TableCell>
                      <TableCell>{alerte.site}</TableCell>
                      <TableCell>{formatDate(alerte.datePrevue)}</TableCell>
                      <TableCell className="font-bold text-slate-700">
                        {formatRetard(retard)}
                      </TableCell>
                      <TableCell>{getPriorityBadge(alerte.priorite)}</TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-blue-200 text-blue-700 hover:bg-blue-50"
                        >
                          Détails
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </>
      ) : (
        <Alert>
          <InfoCircledIcon className="h-5 w-5 text-blue-600" />
          <AlertTitle>Aucune alerte en retard</AlertTitle>
          <AlertDescription>
            Aucune maintenance n'est en retard de plus de 24h.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default Index;
