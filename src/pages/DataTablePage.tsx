import { useState, useMemo } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { allObjects, objectTypes, projects, lagosAreas } from "@/lib/mockData";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, ChevronLeft, ChevronRight, Database, ArrowUpDown } from "lucide-react";

const PAGE_SIZE = 25;

export default function DataTablePage() {
  const [selectedProject, setSelectedProject] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [areaFilter, setAreaFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [sortField, setSortField] = useState<"id" | "type" | "area">("id");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const filteredObjects = useMemo(() => {
    return allObjects.filter((obj) => {
      if (selectedProject !== "all" && obj.projectId !== selectedProject) return false;
      if (typeFilter !== "all" && obj.type !== typeFilter) return false;
      if (areaFilter !== "all" && obj.area !== areaFilter) return false;
      if (search && !obj.id.toLowerCase().includes(search.toLowerCase()) && !obj.type.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [selectedProject, typeFilter, areaFilter, search]);

  const sortedObjects = useMemo(() => {
    return [...filteredObjects].sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      const cmp = String(aVal).localeCompare(String(bVal));
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [filteredObjects, sortField, sortDir]);

  const totalPages = Math.ceil(sortedObjects.length / PAGE_SIZE);
  const paged = sortedObjects.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const toggleSort = (field: "id" | "type" | "area") => {
    if (sortField === field) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else { setSortField(field); setSortDir("asc"); }
    setPage(1);
  };

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex flex-wrap gap-3">
          <Select value={areaFilter} onValueChange={(v) => { setAreaFilter(v); setPage(1); }}>
            <SelectTrigger className="w-48"><SelectValue placeholder="All Areas" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Areas (Lagos)</SelectItem>
              {lagosAreas.map((a) => <SelectItem key={a} value={a}>{a}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={selectedProject} onValueChange={(v) => { setSelectedProject(v); setPage(1); }}>
            <SelectTrigger className="w-48"><SelectValue placeholder="All Projects" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Projects</SelectItem>
              {projects.map((p) => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={typeFilter} onValueChange={(v) => { setTypeFilter(v); setPage(1); }}>
            <SelectTrigger className="w-44"><SelectValue placeholder="All Types" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {objectTypes.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
            </SelectContent>
          </Select>
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search objects..." className="pl-9" value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} />
          </div>
        </div>

        {/* Summary */}
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Database className="h-4 w-4" />
            <span>{filteredObjects.length} records</span>
          </div>
          <span className="text-muted-foreground">•</span>
          <span className="text-muted-foreground text-xs">
            Page {page} of {totalPages || 1}
          </span>
        </div>

        <div className="rounded-lg border border-border bg-card overflow-hidden">
          <div className="overflow-auto max-h-[calc(100vh-320px)]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs cursor-pointer" onClick={() => toggleSort("id")}>
                    <span className="flex items-center gap-1">ID <ArrowUpDown className="h-3 w-3" /></span>
                  </TableHead>
                  <TableHead className="text-xs cursor-pointer" onClick={() => toggleSort("type")}>
                    <span className="flex items-center gap-1">Type <ArrowUpDown className="h-3 w-3" /></span>
                  </TableHead>
                  <TableHead className="text-xs cursor-pointer" onClick={() => toggleSort("area")}>
                    <span className="flex items-center gap-1">Area <ArrowUpDown className="h-3 w-3" /></span>
                  </TableHead>
                  <TableHead className="text-xs">Latitude</TableHead>
                  <TableHead className="text-xs">Longitude</TableHead>
                  <TableHead className="text-xs">Frame Ref</TableHead>
                  <TableHead className="text-xs">Project</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paged.map((obj) => (
                  <TableRow key={obj.id}>
                    <TableCell className="font-mono text-xs">{obj.id}</TableCell>
                    <TableCell><Badge variant="secondary" className="text-xs">{obj.type}</Badge></TableCell>
                    <TableCell className="text-xs">{obj.area}</TableCell>
                    <TableCell className="font-mono text-xs">{obj.latitude}</TableCell>
                    <TableCell className="font-mono text-xs">{obj.longitude}</TableCell>
                    <TableCell className="font-mono text-xs">{obj.frameRef}</TableCell>
                    <TableCell className="text-xs">{projects.find((p) => p.id === obj.projectId)?.name || obj.projectId}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {/* Pagination */}
          <div className="border-t border-border px-4 py-2 flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              Showing {((page - 1) * PAGE_SIZE) + 1}–{Math.min(page * PAGE_SIZE, sortedObjects.length)} of {sortedObjects.length}
            </span>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm" disabled={page <= 1} onClick={() => setPage(page - 1)}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map((p) => (
                <Button key={p} variant={p === page ? "default" : "ghost"} size="sm" className="w-8 h-8" onClick={() => setPage(p)}>
                  {p}
                </Button>
              ))}
              <Button variant="ghost" size="sm" disabled={page >= totalPages} onClick={() => setPage(page + 1)}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
