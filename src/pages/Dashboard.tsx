import { useState, useMemo } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { allObjects, objectTypes, projects, lagosAreas, type GeoObject } from "@/lib/mockData";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Search, X, TrendingUp, Activity, MapPin, FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import LeafletMap from "@/components/LeafletMap";

export default function Dashboard() {
  const [selectedProject, setSelectedProject] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [areaFilter, setAreaFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedObject, setSelectedObject] = useState<GeoObject | null>(null);

  const filteredObjects = useMemo(() => {
    return allObjects.filter((obj) => {
      if (selectedProject !== "all" && obj.projectId !== selectedProject) return false;
      if (typeFilter !== "all" && obj.type !== typeFilter) return false;
      if (areaFilter !== "all" && obj.area !== areaFilter) return false;
      if (search && !obj.id.toLowerCase().includes(search.toLowerCase()) && !obj.type.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [selectedProject, typeFilter, areaFilter, search]);

  const typeCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    filteredObjects.forEach((o) => {
      counts[o.type] = (counts[o.type] || 0) + 1;
    });
    return counts;
  }, [filteredObjects]);

  const areaCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    filteredObjects.forEach((o) => {
      counts[o.area] = (counts[o.area] || 0) + 1;
    });
    return counts;
  }, [filteredObjects]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          <Select value={areaFilter} onValueChange={setAreaFilter}>
            <SelectTrigger className="w-48"><SelectValue placeholder="All Areas" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Areas (Lagos)</SelectItem>
              {lagosAreas.map((a) => (
                <SelectItem key={a} value={a}>{a}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedProject} onValueChange={setSelectedProject}>
            <SelectTrigger className="w-48"><SelectValue placeholder="All Projects" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Projects</SelectItem>
              {projects.map((p) => (
                <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-44"><SelectValue placeholder="All Types" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {objectTypes.map((t) => (
                <SelectItem key={t} value={t}>{t}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search objects..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="rounded-lg border border-border bg-card p-4">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="h-4 w-4 text-accent" />
              <p className="text-xs text-muted-foreground">Total Objects</p>
            </div>
            <p className="text-2xl font-semibold text-foreground">{filteredObjects.length}</p>
            <p className="text-xs text-muted-foreground mt-1">of {allObjects.length} total</p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-accent" />
              <p className="text-xs text-muted-foreground">Object Types</p>
            </div>
            <p className="text-2xl font-semibold text-foreground">{Object.keys(typeCounts).length}</p>
            <p className="text-xs text-muted-foreground mt-1">categories detected</p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <div className="flex items-center gap-2 mb-2">
              <FolderOpen className="h-4 w-4 text-accent" />
              <p className="text-xs text-muted-foreground">Active Projects</p>
            </div>
            <p className="text-2xl font-semibold text-foreground">{projects.length}</p>
            <p className="text-xs text-muted-foreground mt-1">across Lagos</p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="h-4 w-4 text-accent" />
              <p className="text-xs text-muted-foreground">Areas Covered</p>
            </div>
            <p className="text-2xl font-semibold text-foreground">{Object.keys(areaCounts).length}</p>
            <p className="text-xs text-muted-foreground mt-1">Lagos districts</p>
          </div>
        </div>

        {/* Map */}
        <div className="rounded-lg border border-border bg-card overflow-hidden">
          <div className="h-10 border-b border-border flex items-center px-4 gap-4">
            <span className="text-xs font-medium text-foreground">Map View — {areaFilter === "all" ? "All Lagos" : areaFilter}</span>
            <div className="flex gap-2 ml-auto flex-wrap">
              {Object.entries(typeCounts).slice(0, 5).map(([type, count]) => (
                <Badge key={type} variant="secondary" className="text-xs">
                  {type} ({count})
                </Badge>
              ))}
            </div>
          </div>
          <div className="h-72 md:h-96">
            <LeafletMap objects={filteredObjects} onSelectObject={setSelectedObject} />
          </div>
        </div>

        {/* Type breakdown */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {Object.entries(typeCounts).sort((a, b) => b[1] - a[1]).map(([type, count]) => (
            <div key={type} className="rounded-lg border border-border bg-card p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-accent" />
                <span className="text-sm text-foreground">{type}</span>
              </div>
              <Badge variant="secondary" className="text-xs">{count}</Badge>
            </div>
          ))}
        </div>

        {/* Area breakdown */}
        {Object.keys(areaCounts).length > 1 && (
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="text-sm font-medium text-foreground mb-3">Distribution by Area</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {Object.entries(areaCounts).sort((a, b) => b[1] - a[1]).map(([area, count]) => (
                <div key={area} className="flex items-center justify-between py-1.5 px-2 rounded hover:bg-muted/50">
                  <span className="text-sm text-foreground">{area}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full rounded-full bg-accent"
                        style={{ width: `${(count / filteredObjects.length) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground w-8 text-right">{count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Selected object */}
        {selectedObject && (
          <div className="rounded-lg border border-accent/30 bg-accent/5 p-4 flex flex-wrap gap-6 items-start">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Object ID</p>
              <p className="text-sm font-mono text-foreground">{selectedObject.id}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Type</p>
              <Badge variant="secondary">{selectedObject.type}</Badge>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Area</p>
              <p className="text-sm text-foreground">{selectedObject.area}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Latitude</p>
              <p className="text-sm font-mono text-foreground">{selectedObject.latitude}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Longitude</p>
              <p className="text-sm font-mono text-foreground">{selectedObject.longitude}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Frame Ref</p>
              <p className="text-sm font-mono text-foreground">{selectedObject.frameRef}</p>
            </div>
            <Button variant="ghost" size="sm" className="ml-auto" onClick={() => setSelectedObject(null)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
