import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Layout from "@/components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import CambodiaWork from "./pages/CambodiaWork";
import BrandBuilding from "./pages/BrandBuilding";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import BlogCategory from "./pages/BlogCategory";
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import PostEditor from "./pages/admin/PostEditor";
import { AdminGuard } from "./components/AdminGuard";
import { AuthProvider } from "./hooks/useAuth";
import NotFound from "./pages/NotFound";
import { ReactNode } from "react";

const queryClient = new QueryClient();

const ConditionalLayout = ({ children }: { children: ReactNode }) => {
  const { pathname } = useLocation();
  if (pathname.startsWith('/admin')) return <>{children}</>;
  return <Layout>{children}</Layout>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <ConditionalLayout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<Profile />} />
              <Route path="/cambodia-work" element={<CambodiaWork />} />
              <Route path="/brand-building" element={<BrandBuilding />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/category/:slug" element={<BlogCategory />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/about-old" element={<About />} />

              {/* Admin */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminGuard><AdminDashboard /></AdminGuard>} />
              <Route path="/admin/posts/new" element={<AdminGuard><PostEditor /></AdminGuard>} />
              <Route path="/admin/posts/:id" element={<AdminGuard><PostEditor /></AdminGuard>} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </ConditionalLayout>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
