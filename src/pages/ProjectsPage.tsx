import DashboardLayout from "@/components/DashboardLayout";
import { projects, allObjects } from "@/lib/mockData";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { FolderOpen, MapPin, Calendar, Activity, BarChart3 } from "lucide-react";
import { useMemo } from "react";

export default function ProjectsPage() {
  const projectStats = useMemo(() => {
    return projects.map((p) => {
      const objs = allObjects.filter((o) => o.projectId === p.id);
      const types = new Set(objs.map((o) => o.type));
      return { ...p, actualCount: objs.length, typeCount: types.size, types: [...types].slice(0, 3) };
    });
  }, []);

  const totalObjects = allObjects.length;
  const totalAreas = new Set(allObjects.map((o) => o.area)).size;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Projects</h2>
          <p className="text-sm text-muted-foreground">All survey projects across Lagos</p>
        </div>

        {/* Summary stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-lg border border-border bg-card p-4 flex items-center gap-3">
            <FolderOpen className="h-5 w-5 text-accent" />
            <div>
              <p className="text-xl font-semibold text-foreground">{projects.length}</p>
              <p className="text-xs text-muted-foreground">Total Projects</p>
            </div>
          </div>
          <div className="rounded-lg border border-border bg-card p-4 flex items-center gap-3">
            <Activity className="h-5 w-5 text-accent" />
            <div>
              <p className="text-xl font-semibold text-foreground">{totalObjects}</p>
              <p className="text-xs text-muted-foreground">Total Objects</p>
            </div>
          </div>
          <div className="rounded-lg border border-border bg-card p-4 flex items-center gap-3">
            <BarChart3 className="h-5 w-5 text-accent" />
            <div>
              <p className="text-xl font-semibold text-foreground">{totalAreas}</p>
              <p className="text-xs text-muted-foreground">Areas Covered</p>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projectStats.map((p) => (
            <Card key={p.id} className="border-border hover:border-accent/30 transition-colors">
              <CardContent className="p-5 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="h-9 w-9 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                    <FolderOpen className="h-4 w-4 text-accent" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-medium text-sm text-foreground truncate">{p.name}</h3>
                    <div className="flex items-center gap-1.5 mt-1 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {p.location}
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {p.types.map((t) => (
                    <Badge key={t} variant="outline" className="text-xs">{t}</Badge>
                  ))}
                  {p.typeCount > 3 && (
                    <Badge variant="outline" className="text-xs">+{p.typeCount - 3} more</Badge>
                  )}
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <Badge variant="secondary" className="text-xs">{p.actualCount} objects</Badge>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {p.lastUpdated}
                  </div>
                </div>
                <Badge variant="outline" className="text-xs">{p.area}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
