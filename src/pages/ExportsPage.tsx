import { useState, useMemo } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { allObjects, objectTypes, projects, lagosAreas } from "@/lib/mockData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Download, FileJson, FileSpreadsheet, CheckCircle, Info, AlertTriangle } from "lucide-react";

export default function ExportsPage() {
  const [selectedProject, setSelectedProject] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [areaFilter, setAreaFilter] = useState("all");
  const [lastExport, setLastExport] = useState<{ format: string; count: number; time: string } | null>(null);

  const filteredObjects = useMemo(() => {
    return allObjects.filter((obj) => {
      if (selectedProject !== "all" && obj.projectId !== selectedProject) return false;
      if (typeFilter !== "all" && obj.type !== typeFilter) return false;
      if (areaFilter !== "all" && obj.area !== areaFilter) return false;
      return true;
    });
  }, [selectedProject, typeFilter, areaFilter]);

  const handleExport = (format: "csv" | "geojson" | "kml") => {
    const data = filteredObjects;
    let content: string;
    let filename: string;
    let mime: string;

    if (format === "csv") {
      const header = "ID,Type,Area,Latitude,Longitude,Frame,Project\n";
      const rows = data.map((o) => `${o.id},${o.type},${o.area},${o.latitude},${o.longitude},${o.frameRef || ""},${o.projectId}`).join("\n");
      content = header + rows;
      filename = "geoextract-export.csv";
      mime = "text/csv";
    } else if (format === "kml") {
      const placemarks = data.map((o) => `    <Placemark><name>${o.id}</name><description>${o.type} - ${o.area}</description><Point><coordinates>${o.longitude},${o.latitude},0</coordinates></Point></Placemark>`).join("\n");
      content = `<?xml version="1.0" encoding="UTF-8"?>\n<kml xmlns="http://www.opengis.net/kml/2.2">\n  <Document>\n    <name>GeoExtract Export</name>\n${placemarks}\n  </Document>\n</kml>`;
      filename = "geoextract-export.kml";
      mime = "application/vnd.google-earth.kml+xml";
    } else {
      const geojson = {
        type: "FeatureCollection",
        features: data.map((o) => ({
          type: "Feature",
          properties: { id: o.id, objectType: o.type, area: o.area, frameRef: o.frameRef, projectId: o.projectId },
          geometry: { type: "Point", coordinates: [o.longitude, o.latitude] },
        })),
      };
      content = JSON.stringify(geojson, null, 2);
      filename = "geoextract-export.geojson";
      mime = "application/json";
    }

    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    setLastExport({ format: format.toUpperCase(), count: data.length, time: new Date().toLocaleTimeString() });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Export Data</h2>
          <p className="text-sm text-muted-foreground">Download filtered geospatial data in GIS-ready formats</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Select value={areaFilter} onValueChange={setAreaFilter}>
            <SelectTrigger className="w-48"><SelectValue placeholder="All Areas" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Areas (Lagos)</SelectItem>
              {lagosAreas.map((a) => <SelectItem key={a} value={a}>{a}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={selectedProject} onValueChange={setSelectedProject}>
            <SelectTrigger className="w-48"><SelectValue placeholder="All Projects" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Projects</SelectItem>
              {projects.map((p) => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-44"><SelectValue placeholder="All Types" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {objectTypes.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        {/* Export summary */}
        <div className="rounded-lg border border-border bg-card p-5">
          <div className="flex items-center gap-2 mb-1">
            <Info className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium text-foreground">Export Preview</span>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            <span className="font-semibold text-foreground">{filteredObjects.length}</span> objects match your current filters and will be included in the export.
          </p>

          {filteredObjects.length === 0 && (
            <div className="flex items-center gap-2 text-sm text-destructive mb-4">
              <AlertTriangle className="h-4 w-4" />
              <span>No objects match your current filters. Adjust filters to export data.</span>
            </div>
          )}

          <div className="grid sm:grid-cols-3 gap-4 max-w-2xl">
            <Button variant="outline" size="lg" className="h-24 flex-col gap-2" onClick={() => handleExport("csv")} disabled={filteredObjects.length === 0}>
              <FileSpreadsheet className="h-6 w-6 text-accent" />
              <div className="text-center">
                <p className="text-sm font-medium">Export CSV</p>
                <p className="text-xs text-muted-foreground">Spreadsheet format</p>
              </div>
            </Button>
            <Button variant="outline" size="lg" className="h-24 flex-col gap-2" onClick={() => handleExport("geojson")} disabled={filteredObjects.length === 0}>
              <FileJson className="h-6 w-6 text-accent" />
              <div className="text-center">
                <p className="text-sm font-medium">Export GeoJSON</p>
                <p className="text-xs text-muted-foreground">GIS-ready format</p>
              </div>
            </Button>
            <Button variant="outline" size="lg" className="h-24 flex-col gap-2" onClick={() => handleExport("kml")} disabled={filteredObjects.length === 0}>
              <Download className="h-6 w-6 text-accent" />
              <div className="text-center">
                <p className="text-sm font-medium">Export KML</p>
                <p className="text-xs text-muted-foreground">Google Earth format</p>
              </div>
            </Button>
          </div>
        </div>

        {/* Last export confirmation */}
        {lastExport && (
          <div className="rounded-lg border border-success/30 bg-success/5 p-4 flex items-center gap-3">
            <CheckCircle className="h-5 w-5 text-success shrink-0" />
            <div>
              <p className="text-sm font-medium text-foreground">Export Complete</p>
              <p className="text-xs text-muted-foreground">
                Downloaded {lastExport.count} objects as {lastExport.format} at {lastExport.time}
              </p>
            </div>
          </div>
        )}

        {/* Format info */}
        <div className="rounded-lg border border-border bg-card p-5">
          <h3 className="text-sm font-medium text-foreground mb-3">Format Details</h3>
          <div className="space-y-3">
            <div className="flex gap-3">
              <Badge variant="secondary" className="shrink-0">CSV</Badge>
              <p className="text-xs text-muted-foreground">Comma-separated values. Compatible with Excel, Google Sheets, and most data analysis tools.</p>
            </div>
            <div className="flex gap-3">
              <Badge variant="secondary" className="shrink-0">GeoJSON</Badge>
              <p className="text-xs text-muted-foreground">Standard GIS format. Compatible with QGIS, ArcGIS, Mapbox, and Leaflet for spatial analysis.</p>
            </div>
            <div className="flex gap-3">
              <Badge variant="secondary" className="shrink-0">KML</Badge>
              <p className="text-xs text-muted-foreground">Keyhole Markup Language. Compatible with Google Earth, Google Maps, and other geographic browsers.</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
