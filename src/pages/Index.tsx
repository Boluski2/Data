import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  MapPin, Table2, FolderOpen,
  TreePine, Compass, BarChart3, ArrowRight, Globe, Mail,
  Briefcase, Award, Building2, Filter, FileDown,
  Map, Database, ChevronRight, Facebook, Twitter, Linkedin,
  Instagram, MessageSquare
} from "lucide-react";
import HeroMap from "@/components/HeroMap";

const stats = [
  { icon: MapPin, value: "0K+", label: "Objects Mapped" },
  { icon: FolderOpen, value: "0+", label: "Projects" },
  { icon: Award, value: "99.2%", label: "Accuracy Rate" },
  { icon: Globe, value: "0", label: "Lagos Areas" },
];

const features = [
  {
    icon: Map,
    title: "Interactive Maps",
    desc: "Plot extracted object coordinates on live OpenStreetMap tiles with layer controls and area filtering.",
    color: "bg-accent/10",
    iconColor: "text-accent",
  },
  {
    icon: Table2,
    title: "Data Tables",
    desc: "Browse structured records: Latitude, Longitude, Object Type, Frame Reference, and Area.",
    color: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    icon: FileDown,
    title: "GIS Exports",
    desc: "Download in CSV, GeoJSON, or KML (Google Earth) formats — ready for QGIS, ArcGIS, and more.",
    color: "bg-accent/10",
    iconColor: "text-accent",
  },
];

const sampleProjects = [
  { name: "Lekki Corridor Survey", area: "Lekki", count: 342, type: "Infrastructure", color: "from-accent/20 to-accent/5" },
  { name: "VI Road Audit", area: "Victoria Island", count: 187, type: "Road Signs", color: "from-primary/20 to-primary/5" },
  { name: "Ikeja Infrastructure Map", area: "Ikeja", count: 95, type: "Utilities", color: "from-accent/20 to-accent/5" },
  { name: "Surulere Asset Survey", area: "Surulere", count: 120, type: "Street Assets", color: "from-primary/20 to-primary/5" },
  { name: "Yaba Urban Mapping", area: "Yaba", count: 78, type: "Trees & Bins", color: "from-accent/20 to-accent/5" },
  { name: "Apapa Port Zone Scan", area: "Apapa", count: 156, type: "Port Assets", color: "from-primary/20 to-primary/5" },
];

const actions = [
  { icon: Filter, title: "Filter by Area", desc: "Narrow data to any Lagos LGA or zone.", href: "/dashboard/map" },
  { icon: Database, title: "Browse Data", desc: "Explore all extracted objects in the data table.", href: "/dashboard/table" },
  { icon: Map, title: "View Map", desc: "See objects plotted on an interactive Leaflet map.", href: "/dashboard/map" },
  { icon: FileDown, title: "Export Data", desc: "Download GIS-ready datasets in multiple formats.", href: "/dashboard/exports" },
  { icon: MessageSquare, title: "Make Enquiry", desc: "Contact us for bespoke survey projects.", href: "/login" },
];

const audiences = [
  { icon: Compass, label: "Surveyors" },
  { icon: BarChart3, label: "GIS Analysts" },
  { icon: TreePine, label: "Asset Managers" },
  { icon: MapPin, label: "Road Inspectors" },
  { icon: Building2, label: "Urban Planners" },
  { icon: Briefcase, label: "Infrastructure Teams" },
];

const navLinks = ["Home", "About", "Features", "Projects", "Contact"];

export default function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ── Nav ── */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/90 backdrop-blur-md">
        <div className="container mx-auto flex h-24 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2.5">
            {/* <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <MapPin className="h-4 w-4 text-primary-foreground" />
            </div> */}
            <span className="text-base font-bold tracking-tight text-foreground">DataExtraction</span>
          </div>
          <nav className="hidden items-center gap-7 text-sm font-medium text-muted-foreground md:flex">
            {navLinks.map((n) => (
              <a key={n} href={`#${n.toLowerCase()}`} className="transition-colors hover:text-foreground">
                {n}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Link to="/login"><Button variant="ghost" size="sm">Login</Button></Link>
            {/* <Link to="/signup"><Button size="sm">Get Started</Button></Link> */}
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <section id="home" className="border-b border-border bg-primary">
        <div className="container mx-auto grid min-h-[560px] grid-cols-1 items-center gap-12 px-4 py-20 md:grid-cols-2 md:px-8 md:py-28">
          {/* Left */}
          <div>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-primary-foreground md:text-5xl lg:text-6xl">
              inst 360<br />Data Platform
            </h1>
            <p className="mt-4 text-lg font-medium text-primary-foreground/70">
              Object Detection · Coordinate Extraction · Spatial Analytics
            </p>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-primary-foreground/60">
              Access structured, field-verified geospatial data from 360° survey footage across Lagos. 
              Filter by area, explore on an interactive map, and export GIS-ready datasets instantly.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link to="/signup">
                <Button size="lg" className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90">
                  Get Started <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>

          {/* Right — Real Leaflet Map (sticky below navbar) */}
          <div className="relative flex items-center justify-center md:sticky md:top-24 md:self-start">
            <div className="w-full overflow-hidden rounded-2xl border border-primary-foreground/15 shadow-2xl">
              {/* map header */}
              <div className="flex items-center gap-2 border-b border-primary-foreground/20 bg-primary/80 px-4 py-3 backdrop-blur-sm">
                <Map className="h-4 w-4 text-accent" />
                <span className="text-xs font-semibold text-primary-foreground">Nigeria — Live Map Preview</span>
                <span className="ml-auto text-[10px] text-primary-foreground/50">Pan &amp; zoom to explore</span>
              </div>
              {/* Live Leaflet Map */}
              <div className="h-72 w-full md:h-80">
                <HeroMap />
              </div>
              {/* legend */}
              <div className="flex flex-wrap items-center gap-2 border-t border-primary-foreground/10 bg-primary/70 px-4 py-3 backdrop-blur-sm">
                <span className="text-[10px] text-primary-foreground/50 mr-1">Lagos Areas:</span>
                {["Lekki", "VI", "Ikeja", "Ajah", "Apapa"].map((t) => (
                  <span key={t} className="rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-2.5 py-0.5 text-[10px] font-medium text-primary-foreground/80">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" className="border-b border-border bg-muted/50">
        <div className="container mx-auto max-w-3xl px-4 py-20 text-center md:px-8 md:py-24">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-accent">About GeoExtract</p>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">What is GeoExtract?</h2>
          <p className="mt-6 leading-relaxed text-muted-foreground">
            GeoExtract is a purpose-built platform for accessing, reviewing, and exporting object-based coordinate data
            extracted from 360° survey footage across Lagos State. It bridges the gap between raw field data and actionable
            geospatial intelligence — giving surveyors, GIS analysts, and infrastructure teams structured, reliable spatial 
            data without the complexity of traditional GIS pipelines.
          </p>
          <p className="mt-5 leading-relaxed text-muted-foreground">
            The object detection and coordinate extraction are already done. GeoExtract is where you work with the results:
            visualize on maps, filter by area, search by type, and download in your preferred GIS format.
          </p>
          <div className="mt-10">
            <Link to="/signup">
              <Button className="gap-2">Learn More <ChevronRight className="h-4 w-4" /></Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="border-b border-border bg-primary/8">
        <div className="container mx-auto px-4 py-16 md:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-3 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-accent/15">
                  <s.icon className="h-6 w-6 text-accent" />
                </div>
                <p className="text-4xl font-extrabold text-foreground">{s.value}</p>
                <p className="text-sm text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="border-b border-border bg-muted/30">
        <div className="container mx-auto px-4 py-20 md:px-8 md:py-24">
          <div className="mb-12 text-center">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-accent">Platform Features</p>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Features</h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="group overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-lg">
                <div className={`flex h-44 items-center justify-center bg-gradient-to-br ${f.color} border-b border-border`}>
                  <f.icon className={`h-16 w-16 ${f.iconColor} opacity-60 transition-transform group-hover:scale-110`} />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-foreground">{f.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
                </div>
                <div className="border-t border-border px-6 pb-5 pt-4">
                  <Link to="/signup">
                    <Button variant="outline" size="sm" className="w-full text-xs">Explore</Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Who It's For ── */}
      <section id="audience" className="border-b border-border bg-secondary/50">
        <div className="container mx-auto px-4 py-20 md:px-8">
          <div className="mb-10 text-center">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-accent">Our Members</p>
            <h2 className="text-3xl font-bold tracking-tight">Who Uses GeoExtract?</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {audiences.map((a) => (
              <div key={a.label}
                className="flex items-center gap-3 rounded-full border border-border bg-card px-6 py-3 shadow-sm hover:border-accent/40 hover:shadow transition-all">
                <a.icon className="h-5 w-5 text-accent" />
                <span className="text-sm font-medium">{a.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sample Projects / Maps ── */}
      <section id="projects" className="border-b border-border bg-muted/30">
        <div className="container mx-auto px-4 py-20 md:px-8 md:py-24">
          <div className="mb-10 text-center">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-accent">Survey Projects</p>
            <h2 className="text-3xl font-bold tracking-tight">Shared Maps &amp; Projects</h2>
            <p className="mt-4 text-sm text-muted-foreground">A sample of surveys completed across Lagos State.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sampleProjects.map((p) => (
              <div key={p.name}
                className="group overflow-hidden rounded-xl border border-border bg-card hover:shadow-lg transition-shadow">
                <div className={`relative h-44 bg-gradient-to-br ${p.color} flex items-end p-4 border-b border-border`}>
                  <div className="absolute inset-0 flex items-center justify-center opacity-20">
                    <Map className="h-20 w-20 text-foreground" />
                  </div>
                  <div className="absolute inset-0 overflow-hidden">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div key={i}
                        className="absolute h-2 w-2 rounded-full bg-accent/70"
                        style={{
                          left: `${15 + Math.sin(i * 1.3) * 35 + i * 9}%`,
                          top: `${20 + Math.cos(i * 0.9) * 25 + i * 5}%`,
                        }}
                      />
                    ))}
                  </div>
                  <span className="relative z-10 rounded-full border border-border bg-card/90 px-2.5 py-1 text-[10px] font-semibold text-foreground backdrop-blur-sm">
                    {p.type}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-foreground">{p.name}</h3>
                  <p className="mt-2 text-xs text-muted-foreground">{p.area}, Lagos · {p.count} objects</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link to="/signup">
              <Button variant="outline" className="gap-2">See All Projects <ArrowRight className="h-4 w-4" /></Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── What do you want to do ── */}
      <section id="actions" className="border-b border-border bg-secondary/40">
        <div className="container mx-auto px-4 py-20 md:px-8 md:py-24">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              WHAT DO <span className="underline decoration-accent decoration-2">YOU</span> WANT TO DO?
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {actions.map((a) => (
              <Link key={a.title} to={a.href}>
                <div className="flex h-full flex-col items-center gap-4 rounded-xl border border-border bg-card p-6 text-center hover:border-accent/40 hover:shadow-lg transition-all group">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-accent/10 group-hover:bg-accent/20 transition-colors">
                    <a.icon className="h-7 w-7 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{a.title}</p>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{a.desc}</p>
                  </div>
                  <Button size="sm" variant="outline" className="mt-auto w-full text-xs">
                    Go Now
                  </Button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Newsletter ── */}
      <section id="contact" className="border-b border-border bg-muted/40">
        <div className="container mx-auto max-w-xl px-4 py-20 text-center md:px-8">
          {/* <Mail className="mx-auto mb-5 h-12 w-12 text-accent" /> */}
          <h2 className="text-3xl font-bold tracking-tight">Subscribe to our newsletter</h2>
          <p className="mt-3 text-sm text-muted-foreground">Stay updated with the latest geospatial data and platform updates</p>
          <form className="mt-8 flex gap-3" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 rounded-md border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <Button type="submit" className="gap-2 shrink-0">Subscribe</Button>
          </form>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-primary/95">
        <div className="container mx-auto px-4 py-14 md:px-8">
          <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
            {/* Brand */}
            <div>
              <div className="mb-5 flex items-center gap-2">
                {/* <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent">
                  <MapPin className="h-4 w-4 text-accent-foreground" />
                </div> */}
                <span className="font-bold text-primary-foreground">DataExtraction</span>
              </div>
              <p className="text-xs leading-relaxed text-primary-foreground/60">
                A professional geospatial data platform serving surveyors, GIS analysts, and infrastructure teams across Lagos State and beyond.
              </p>
            </div>
            {/* Resources */}
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-widest text-primary-foreground/50">Resources</p>
              <ul className="space-y-2.5 text-sm text-primary-foreground/70">
                {["Blog", "Community Guidelines", "Donate"].map((l) => (
                  <li key={l}><a href="#" className="hover:text-primary-foreground transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
            {/* Socials */}
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-widest text-primary-foreground/50">Socials</p>
              <div className="flex flex-col gap-2.5 text-sm text-primary-foreground/70">
                {[
                  { icon: Facebook, label: "Facebook" },
                  { icon: Linkedin, label: "LinkedIn" },
                  { icon: Twitter, label: "X (Twitter)" },
                  { icon: Instagram, label: "Instagram" },
                ].map((s) => (
                  <a key={s.label} href="#" className="flex items-center gap-2 hover:text-primary-foreground transition-colors">
                    <s.icon className="h-4 w-4" />{s.label}
                  </a>
                ))}
              </div>
            </div>
            {/* Legal */}
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-widest text-primary-foreground/50">Legal</p>
              <ul className="space-y-2.5 text-sm text-primary-foreground/70">
                {["Terms of Service", "Privacy Policy", "Data Use"].map((l) => (
                  <li key={l}><a href="#" className="hover:text-primary-foreground transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-10 border-t border-primary-foreground/10 pt-6 text-center text-xs text-primary-foreground/40">
             © 2026 GeoExtract. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
