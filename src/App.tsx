import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { lazy, Suspense, ReactNode } from "react";
import Layout from "@/components/Layout";
import { AdminGuard } from "./components/AdminGuard";
import { AuthProvider } from "./hooks/useAuth";
import { SiteSettingsLoader } from "./lib/siteSettings";

// Code-split every route — large pages load only when visited.
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Profile = lazy(() => import("./pages/Profile"));
const Nondual = lazy(() => import("./pages/Nondual"));
const CountryPage = lazy(() => import("./pages/CountryPage"));
const BrandBuilding = lazy(() => import("./pages/BrandBuilding"));
const Contact = lazy(() => import("./pages/Contact"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const BlogCategory = lazy(() => import("./pages/BlogCategory"));
const AdminLogin = lazy(() => import("./pages/admin/Login"));
const AdminDashboard = lazy(() => import("./pages/admin/Dashboard"));
const AdminSettings = lazy(() => import("./pages/admin/Settings"));
const PostEditor = lazy(() => import("./pages/admin/PostEditor"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const ConditionalLayout = ({ children }: { children: ReactNode }) => {
  const { pathname } = useLocation();
  if (pathname.startsWith('/admin')) return <>{children}</>;
  return <Layout>{children}</Layout>;
};

const RouteFallback = () => (
  <div className="py-32 text-center font-ui text-[10px] uppercase tracking-[0.3em] text-content-muted">Loading</div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <SiteSettingsLoader />
      <BrowserRouter>
        <AuthProvider>
          <ConditionalLayout>
            <Suspense fallback={<RouteFallback />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<Profile />} />
                <Route path="/cambodia" element={<CountryPage country="cambodia" />} />
                <Route path="/thailand" element={<CountryPage country="thailand" />} />
                <Route path="/vietnam" element={<CountryPage country="vietnam" />} />
                <Route path="/france" element={<CountryPage country="france" />} />
                <Route path="/cambodia-work" element={<Navigate to="/cambodia" replace />} />
                <Route path="/brand-building" element={<BrandBuilding />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/category/:slug" element={<BlogCategory />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/nondual" element={<Nondual />} />
                <Route path="/about-old" element={<About />} />

                {/* Admin */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin" element={<AdminGuard><AdminDashboard /></AdminGuard>} />
                <Route path="/admin/settings" element={<AdminGuard><AdminSettings /></AdminGuard>} />
                <Route path="/admin/posts/new" element={<AdminGuard><PostEditor /></AdminGuard>} />
                <Route path="/admin/posts/:id" element={<AdminGuard><PostEditor /></AdminGuard>} />

                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </ConditionalLayout>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
