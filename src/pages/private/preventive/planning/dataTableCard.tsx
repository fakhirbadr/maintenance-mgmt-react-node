import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, CheckCircle2, XCircle } from "lucide-react";
import { motion } from "framer-motion";

interface Maintenance {
  id: string;
  titre: string;
  date: string;
  region: string;
  province: string;
  site: string;
  type: string;
  datePrevu: string;
  responsable: string;
  description: string;
}

const DataTableCard = () => {
  const initialData: Maintenance[] = [
    {
      id: "1",
      titre: "Maintenance Génératrice",
      date: "2024-04-20",
      region: "Casablanca-Settat",
      province: "Casablanca",
      site: "Site A",
      type: "Préventive",
      datePrevu: "2024-04-25",
      responsable: "Ahmed B.",
      description: "Vérification du système électrique.",
    },
    {
      id: "2",
      titre: "Inspection climatisation",
      date: "2024-04-21",
      region: "Rabat-Salé-Kénitra",
      province: "Salé",
      site: "Site B",
      type: "Corrective",
      datePrevu: "2024-04-27",
      responsable: "Fatima Z.",
      description: "Problème de condensation.",
    },
    {
      id: "3",
      titre: "Remplacement des filtres",
      date: "2024-04-22",
      region: "Marrakech-Safi",
      province: "Marrakech",
      site: "Site C",
      type: "Préventive",
      datePrevu: "2024-04-30",
      responsable: "Karim L.",
      description: "Changement des filtres à air.",
    },
  ];

  const handleEdit = (maintenance: Maintenance) => {
    console.log("Éditer :", maintenance);
  };

  const handleDelete = (id: string) => {
    console.log("Supprimer ID :", id);
  };

  // const handleValidate = (id: string) => {
  //   console.log("Validation de la maintenance :", id);
  // };

  const handleClose = (id: string) => {
    console.log("Clôture de la maintenance :", id);
  };

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {initialData.map((item) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Card className="rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl">
            <CardHeader>
              <CardTitle className="text-primary text-xl font-semibold">
                {item.titre}
              </CardTitle>
              <p className="text-muted-foreground text-sm italic">
                {item.date}
              </p>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex flex-wrap gap-4 text-sm">
                <p>
                  <strong className="text-gray-600">Région:</strong>{" "}
                  {item.region}
                </p>
                <p>
                  <strong className="text-gray-600">Province:</strong>{" "}
                  {item.province}
                </p>
                <p>
                  <strong className="text-gray-600">Site:</strong> {item.site}
                </p>
              </div>
              <p>
                <strong className="text-gray-600">Type:</strong> {item.type}
              </p>
              <p>
                <strong className="text-gray-600">Date prévue:</strong>{" "}
                {item.datePrevu}
              </p>
              <p>
                <strong className="text-gray-600">Responsable:</strong>{" "}
                {item.responsable}
              </p>
              <p className="text-muted-foreground">{item.description}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => handleEdit(item)}
                >
                  <Pencil className="mr-1 h-4 w-4" /> Modifier
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDelete(item.id)}
                  className="text-red-500 hover:text-red-600"
                >
                  <Trash2 className="mr-1 h-4 w-4" /> Supprimer
                </Button>
                {/* <Button
                  size="sm"
                  className="bg-green-600 text-white hover:bg-green-700"
                  onClick={() => handleValidate(item.id)}
                >
                  <CheckCircle2 className="mr-1 h-4 w-4" /> Valider
                </Button> */}
                <Button
                  size="sm"
                  className="bg-green-600 text-white hover:bg-green-300"
                  onClick={() => handleClose(item.id)}
                >
                  <XCircle className="mr-1 h-4 w-4" /> Clôturer
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default DataTableCard;
