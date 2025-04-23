"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  ChevronDown,
  MoreHorizontal,
  Trash2,
  Filter,
  Pencil,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export type Maintenance = {
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
};

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

export function DataTableDemo() {
  const [data, setData] = React.useState<Maintenance[]>(initialData);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [editDialogOpen, setEditDialogOpen] = React.useState(false);
  const [itemToDelete, setItemToDelete] = React.useState<string | null>(null);
  const [itemToEdit, setItemToEdit] = React.useState<Maintenance | null>(null);
  const [editedItem, setEditedItem] = React.useState<Partial<Maintenance>>({});

  // Obtenir les valeurs uniques pour les filtres
  const uniqueRegions = React.useMemo(
    () => [...new Set(data.map((item) => item.region))],
    [data],
  );
  const uniqueTypes = React.useMemo(
    () => [...new Set(data.map((item) => item.type))],
    [data],
  );
  const uniqueSites = React.useMemo(
    () => [...new Set(data.map((item) => item.site))],
    [data],
  );

  // Fonction de suppression
  const handleDelete = (id: string) => {
    setItemToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      setData(data.filter((item) => item.id !== itemToDelete));
      setDeleteDialogOpen(false);
      setItemToDelete(null);
    }
  };

  // Fonction de modification
  const handleEdit = (item: Maintenance) => {
    setItemToEdit(item);
    setEditedItem({ ...item });
    setEditDialogOpen(true);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedItem((prev) => ({ ...prev, [name]: value }));
  };

  const confirmEdit = () => {
    if (itemToEdit) {
      setData(
        data.map((item) =>
          item.id === itemToEdit.id ? { ...item, ...editedItem } : item,
        ),
      );
      setEditDialogOpen(false);
      setItemToEdit(null);
      setEditedItem({});
    }
  };

  // Définition des colonnes
  const columns: ColumnDef<Maintenance>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "date",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "site",
      header: "Nom de site",
      cell: ({ row }) => <div>{row.getValue("site")}</div>,
    },
    {
      accessorKey: "titre",
      header: "Titre",
      cell: ({ row }) => <div>{row.getValue("titre")}</div>,
    },
    {
      accessorKey: "region",
      header: "Région",
      cell: ({ row }) => <div>{row.getValue("region")}</div>,
    },
    {
      accessorKey: "province",
      header: "Province",
      cell: ({ row }) => <div>{row.getValue("province")}</div>,
    },
    {
      accessorKey: "type",
      header: "Type de maintenance",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("type")}</div>
      ),
    },
    {
      accessorKey: "datePrevu",
      header: "Date prévue",
    },
    {
      accessorKey: "responsable",
      header: "Responsable",
    },
    {
      accessorKey: "description",
      header: "Description",
    },
    {
      id: "actions",
      enableHiding: false,
      header: "Actions",
      cell: ({ row }) => {
        const maintenance = row.original;
        return (
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleEdit(maintenance)}
              className="h-8"
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDelete(maintenance.id)}
              className="h-8 text-red-500 hover:text-red-600"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="mb-4">
        <h2 className="mb-2 text-xl font-bold">Filtres avancés</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <label className="text-sm font-medium">Région</label>
            <Select
              onValueChange={(value) =>
                table
                  .getColumn("region")
                  ?.setFilterValue(value === "all" ? "" : value)
              }
              defaultValue="all"
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Sélectionner une région" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les régions</SelectItem>
                {uniqueRegions.map((region) => (
                  <SelectItem key={region} value={region}>
                    {region}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium">Type de maintenance</label>
            <Select
              onValueChange={(value) =>
                table
                  .getColumn("type")
                  ?.setFilterValue(value === "all" ? "" : value)
              }
              defaultValue="all"
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Sélectionner un type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les types</SelectItem>
                {uniqueTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium">Site</label>
            <Select
              onValueChange={(value) =>
                table
                  .getColumn("site")
                  ?.setFilterValue(value === "all" ? "" : value)
              }
              defaultValue="all"
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Sélectionner un site" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les sites</SelectItem>
                {uniqueSites.map((site) => (
                  <SelectItem key={site} value={site}>
                    {site}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium">Recherche par titre</label>
            <div className="relative">
              <Input
                placeholder="Filtrer par titre..."
                value={
                  (table.getColumn("titre")?.getFilterValue() as string) ?? ""
                }
                onChange={(event) =>
                  table.getColumn("titre")?.setFilterValue(event.target.value)
                }
                className="pl-8"
              />
              <Filter className="absolute top-2.5 left-2 h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>

        <div className="mt-2 flex justify-end">
          <Button
            variant="outline"
            onClick={() => {
              table.resetColumnFilters();
            }}
          >
            Réinitialiser les filtres
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Aucun résultat.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="text-muted-foreground text-sm">
          {table.getFilteredSelectedRowModel().rows.length} sur{" "}
          {table.getFilteredRowModel().rows.length} ligne(s) sélectionnée(s).
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Précédent
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Suivant
          </Button>
        </div>
      </div>

      {/* Dialog de confirmation de suppression */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmer la suppression</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer cette maintenance ? Cette
              action ne peut pas être annulée.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Annuler
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog de modification */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Modifier la maintenance</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="titre" className="text-right">
                Titre
              </Label>
              <Input
                id="titre"
                name="titre"
                value={editedItem.titre || ""}
                onChange={handleEditChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">
                Date
              </Label>
              <Input
                id="date"
                name="date"
                type="date"
                value={editedItem.date || ""}
                onChange={handleEditChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="region" className="text-right">
                Région
              </Label>
              <Input
                id="region"
                name="region"
                value={editedItem.region || ""}
                onChange={handleEditChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="province" className="text-right">
                Province
              </Label>
              <Input
                id="province"
                name="province"
                value={editedItem.province || ""}
                onChange={handleEditChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="site" className="text-right">
                Site
              </Label>
              <Input
                id="site"
                name="site"
                value={editedItem.site || ""}
                onChange={handleEditChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">
                Type
              </Label>
              <Input
                id="type"
                name="type"
                value={editedItem.type || ""}
                onChange={handleEditChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="datePrevu" className="text-right">
                Date prévue
              </Label>
              <Input
                id="datePrevu"
                name="datePrevu"
                type="date"
                value={editedItem.datePrevu || ""}
                onChange={handleEditChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="responsable" className="text-right">
                Responsable
              </Label>
              <Input
                id="responsable"
                name="responsable"
                value={editedItem.responsable || ""}
                onChange={handleEditChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                name="description"
                value={editedItem.description || ""}
                onChange={handleEditChange}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={confirmEdit}>Enregistrer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
