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
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export type PreventiveMaintenance = {
  id: string;
  creationDate: string;
  realizationDate: string;
  region: string;
  province: string;
  site: string;
  equipment: string;
  technician: string;
  status: "Planifiée" | "Réalisée" | "Reportée" | "Annulée" | "En retard";
  type:
    | "Lubrification"
    | "Inspection"
    | "Contrôle"
    | "Essai"
    | "Remplacement"
    | "Autre";
  comment: string;
  duration: number;
};

const data: PreventiveMaintenance[] = [
  {
    id: "PM-2023-001",
    creationDate: "2023-01-05",
    realizationDate: "2023-01-10",
    region: "Casablanca-Settat",
    province: "Casablanca",
    site: "Site Industriel Aïn Sebaa",
    equipment: "Compresseur d'air Atlas Copco",
    technician: "Mohamed El Amrani",
    status: "Réalisée",
    type: "Lubrification",
    comment: "Lubrification complète sans anomalies détectées",
    duration: 90,
  },
  {
    id: "PM-2023-002",
    creationDate: "2023-01-10",
    realizationDate: "2023-01-15",
    region: "Rabat-Salé-Kénitra",
    province: "Salé",
    site: "Usine Textile Salé",
    equipment: "Chaudière 500kW",
    technician: "Karim Bennani",
    status: "Réalisée",
    type: "Inspection",
    comment: "Remplacement du joint d'étanchéité de la porte",
    duration: 120,
  },
  {
    id: "PM-2023-003",
    creationDate: "2023-02-01",
    realizationDate: "",
    region: "Tanger-Tétouan-Al Hoceïma",
    province: "Tanger",
    site: "Zone Franche Tanger Auto",
    equipment: "Système ventilation",
    technician: "Ahmed Toufiq",
    status: "En retard",
    type: "Contrôle",
    comment: "Reporté en attente de pièces détachées",
    duration: 0,
  },
  {
    id: "PM-2023-004",
    creationDate: "2023-02-15",
    realizationDate: "2023-02-20",
    region: "Marrakech-Safi",
    province: "Marrakech",
    site: "Hôtel Palmeraie",
    equipment: "Groupe électrogène",
    technician: "Fatima Zahra",
    status: "Réalisée",
    type: "Essai",
    comment: "Test de bon fonctionnement OK - 2h en charge",
    duration: 180,
  },
  {
    id: "PM-2023-005",
    creationDate: "2023-03-01",
    realizationDate: "",
    region: "Fès-Meknès",
    province: "Fès",
    site: "Complexe Artisanal",
    equipment: "Ascenseur principal",
    technician: "Youssef Khouribga",
    status: "Planifiée",
    type: "Contrôle",
    comment: "À programmer avec le service technique",
    duration: 0,
  },
];

const columns: ColumnDef<PreventiveMaintenance>[] = [
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
    accessorKey: "id",
    header: "ID Maintenance",
    cell: ({ row }) => <div className="font-medium">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "creationDate",
    header: "Date création",
    cell: ({ row }) => <div>{row.getValue("creationDate")}</div>,
  },
  {
    accessorKey: "realizationDate",
    header: "Date réalisation",
    cell: ({ row }) => (
      <div className={!row.getValue("realizationDate") ? "text-red-500" : ""}>
        {row.getValue("realizationDate") || "Non réalisée"}
      </div>
    ),
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
    accessorKey: "site",
    header: "Site",
    cell: ({ row }) => <div>{row.getValue("site")}</div>,
  },
  {
    accessorKey: "equipment",
    header: "Équipement",
    cell: ({ row }) => <div>{row.getValue("equipment")}</div>,
  },
  {
    accessorKey: "technician",
    header: "Technicien",
    cell: ({ row }) => <div>{row.getValue("technician")}</div>,
  },
  {
    accessorKey: "status",
    header: "Statut",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const statusColors = {
        Réalisée: "bg-green-100 text-green-800",
        Planifiée: "bg-blue-100 text-blue-800",
        Reportée: "bg-orange-100 text-orange-800",
        Annulée: "bg-red-100 text-red-800",
        "En retard": "bg-purple-100 text-purple-800",
      };

      return (
        <span
          className={`rounded-full px-2 py-1 text-xs ${statusColors[status]}`}
        >
          {status}
        </span>
      );
    },
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => <div>{row.getValue("type")}</div>,
  },
  {
    accessorKey: "comment",
    header: "Commentaire",
    cell: ({ row }) => (
      <div className="max-w-xs truncate" title={row.getValue("comment")}>
        {row.getValue("comment")}
      </div>
    ),
  },
  {
    accessorKey: "duration",
    header: "Durée (min)",
    cell: ({ row }) => <div>{row.getValue("duration") || "-"}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const maintenance = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(maintenance.id)}
            >
              Copier ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Voir les détails</DropdownMenuItem>
            <DropdownMenuItem>Générer un rapport</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

const Index = () => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

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
    <div className="p-4">
      <h2 className="mb-4 text-2xl font-bold dark:text-white">
        Historique des maintenances préventives
      </h2>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filtrer par équipement ou site..."
          value={
            (table.getColumn("equipment")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) => {
            table.getColumn("equipment")?.setFilterValue(event.target.value);
            table.getColumn("site")?.setFilterValue(event.target.value);
          }}
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Colonnes <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
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
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
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
    </div>
  );
};

export default Index;
