import { useState, useMemo } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { allObjects, objectTypes, lagosAreas, type GeoObject } from "@/lib/mockData";
import { Badge } from "@/components/ui/badge";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { X, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import LeafletMap from "@/components/LeafletMap";

const typeColors: Record<string, string> = {
  Tree: "#22c55e",
  "Light Pole": "#f59e0b",
  Dustbin: "#8b5cf6",
  "Road Sign": "#ef4444",
  "Fire Hydrant": "#ec4899",
  Bench: "#06b6d4",
  "Utility Box": "#64748b",
  "Manhole Cover": "#78716c",
  "Traffic Signal": "#f97316",
  "Bus Stop": "#3b82f6",
};

export default function MapPage() {
  const [typeFilter, setTypeFilter] = useState("all");
  const [areaFilter, setAreaFilter] = useState("all");
  const [selectedObject, setSelectedObject] = useState<GeoObject | null>(null);

  const filteredObjects = useMemo(() => {
    return allObjects.filter((obj) => {
      if (typeFilter !== "all" && obj.type !== typeFilter) return false;
      if (areaFilter !== "all" && obj.area !== areaFilter) return false;
      return true;
    });
  }, [typeFilter, areaFilter]);

  const typeCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    filteredObjects.forEach((o) => { counts[o.type] = (counts[o.type] || 0) + 1; });
    return counts;
  }, [filteredObjects]);

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex flex-wrap gap-3 items-center">
          <Select value={areaFilter} onValueChange={setAreaFilter}>
            <SelectTrigger className="w-48"><SelectValue placeholder="All Areas" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Areas (Lagos)</SelectItem>
              {lagosAreas.map((a) => <SelectItem key={a} value={a}>{a}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-44"><SelectValue placeholder="All Types" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {objectTypes.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
            </SelectContent>
          </Select>
          <Badge variant="outline" className="text-xs ml-auto">
            {filteredObjects.length} objects
          </Badge>
        </div>

        <div className="rounded-lg border border-border bg-card overflow-hidden">
          <div className="h-10 border-b border-border flex items-center px-4 gap-4">
            <span className="text-xs font-medium text-foreground">Map — {areaFilter === "all" ? "All Lagos" : areaFilter}</span>
            <div className="flex gap-2 ml-auto flex-wrap">
              {Object.entries(typeCounts).slice(0, 6).map(([type, count]) => (
                <Badge key={type} variant="secondary" className="text-xs">{type} ({count})</Badge>
              ))}
            </div>
          </div>
          <div className="h-[calc(100vh-280px)] min-h-[400px]">
            <LeafletMap objects={filteredObjects} onSelectObject={setSelectedObject} />
          </div>
        </div>

        {/* Legend */}
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="flex items-center gap-2 mb-3">
            <Info className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-medium text-foreground">Map Legend</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
            {Object.entries(typeColors).map(([type, color]) => (
              <div key={type} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: color }} />
                <span className="text-xs text-muted-foreground">{type}</span>
              </div>
            ))}
          </div>
        </div>

        {selectedObject && (
          <div className="rounded-lg border border-accent/30 bg-accent/5 p-4 flex flex-wrap gap-6 items-start">
            <div>
              <p className="text-xs text-muted-foreground mb-1">ID</p>
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
              <p className="text-xs text-muted-foreground mb-1">Lat</p>
              <p className="text-sm font-mono text-foreground">{selectedObject.latitude}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Lng</p>
              <p className="text-sm font-mono text-foreground">{selectedObject.longitude}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Frame</p>
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
