import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Trash2, Pencil, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "../../../../hooks/use-mobile"; // assure-toi que ce chemin est correct

const Index = () => {
  const isMobile = useIsMobile();
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([
    {
      id: 1,
      equipement: "Générateur A",
      description: "Générateur 5000kW",
      dateCreation: "2024-04-01",
      dateCloture: "",
      priorite: "Haute",
      technicien: "Jean Dupont",
      statut: "En cours",
    },
    {
      id: 2,
      equipement: "Climatisation B",
      description: "Unité de climatisation centrale",
      dateCreation: "2024-04-02",
      dateCloture: "2024-04-05",
      priorite: "Moyenne",
      technicien: "Marie Curie",
      statut: "Clôturée",
    },
    {
      id: 3,
      equipement: "Compresseur C",
      description: "Compresseur d'air industriel",
      dateCreation: "2024-04-03",
      dateCloture: "",
      priorite: "Basse",
      technicien: "Pierre Durand",
      statut: "En attente",
    },
  ]);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const handleCloturer = (id) => {
    setData(
      data.map((item) =>
        item.id === id
          ? {
              ...item,
              statut: "Clôturée",
              dateCloture: new Date().toISOString().split("T")[0],
            }
          : item,
      ),
    );
  };

  const filteredData = data.filter((item) =>
    item.equipement.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="p-6">
      <div className="mb-6 text-2xl font-semibold">
        Création de maintenance corrective
      </div>

      <div className="mb-4 w-full md:w-1/3">
        <Input
          placeholder="Filtrer par équipement..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {isMobile ? (
        <div className="space-y-4">
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <div
                key={item.id}
                className="rounded-lg border p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800"
              >
                <div className="mb-2 text-lg font-bold">{item.equipement}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  {item.description}
                </div>
                <div className="mt-2 text-sm">
                  <strong>Date création:</strong> {item.dateCreation}
                </div>
                <div className="text-sm">
                  <strong>Technicien:</strong> {item.technicien}
                </div>
                <div className="text-sm">
                  <strong>Priorité:</strong>{" "}
                  <span
                    className={`rounded-full px-2 py-1 text-xs ${
                      item.priorite === "Haute"
                        ? "bg-red-100 text-red-800"
                        : item.priorite === "Moyenne"
                          ? "bg-orange-100 text-orange-800"
                          : "bg-green-100 text-green-800"
                    }`}
                  >
                    {item.priorite}
                  </span>
                </div>
                <div className="text-sm">
                  <strong>Statut:</strong>{" "}
                  <span
                    className={`rounded-full px-2 py-1 text-xs ${
                      item.statut === "Clôturée"
                        ? "bg-green-100 text-green-800"
                        : item.statut === "En cours"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {item.statut}
                  </span>
                </div>
                <div className="text-sm">
                  <strong>Date clôture:</strong> {item.dateCloture || "-"}
                </div>
                <div className="mt-2 flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCloturer(item.id)}
                    disabled={item.statut === "Clôturée"}
                  >
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Pencil className="h-4 w-4 text-blue-600" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(item.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-muted-foreground py-4 text-center">
              Aucun résultat trouvé
            </div>
          )}
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200">
              <tr>
                <th className="px-4 py-3 text-left">ID</th>
                <th className="px-4 py-3 text-left">Équipement</th>
                <th className="px-4 py-3 text-left">Description</th>
                <th className="px-4 py-3 text-left">Date création</th>
                <th className="px-4 py-3 text-left">Priorité</th>
                <th className="px-4 py-3 text-left">Technicien</th>
                <th className="px-4 py-3 text-left">Statut</th>
                <th className="px-4 py-3 text-left">Date clôture</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-900 dark:text-gray-100">
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <tr
                    key={item.id}
                    className="border-t hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="px-4 py-2">{item.id}</td>
                    <td className="px-4 py-2 font-medium">{item.equipement}</td>
                    <td className="px-4 py-2 text-gray-600 dark:text-gray-400">
                      {item.description}
                    </td>
                    <td className="px-4 py-2">{item.dateCreation}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`rounded-full px-2 py-1 text-xs ${
                          item.priorite === "Haute"
                            ? "bg-red-100 text-red-800"
                            : item.priorite === "Moyenne"
                              ? "bg-orange-100 text-orange-800"
                              : "bg-green-100 text-green-800"
                        }`}
                      >
                        {item.priorite}
                      </span>
                    </td>
                    <td className="px-4 py-2">{item.technicien}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`rounded-full px-2 py-1 text-xs ${
                          item.statut === "Clôturée"
                            ? "bg-green-100 text-green-800"
                            : item.statut === "En cours"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {item.statut}
                      </span>
                    </td>
                    <td className="px-4 py-2">{item.dateCloture || "-"}</td>
                    <td className="px-4 py-2">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCloturer(item.id)}
                          disabled={item.statut === "Clôturée"}
                        >
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Pencil className="h-4 w-4 text-blue-600" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(item.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="9"
                    className="text-muted-foreground py-4 text-center"
                  >
                    Aucun résultat trouvé
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Index;
