import HeroSection from "@/components/HeroSection";
import ProcessStep from "@/components/ProcessStep";
import { 
  FileText, 
  Store, 
  Camera, 
  Facebook, 
  DollarSign, 
  Truck, 
  BarChart3,
  Smartphone,
  MapPin,
  Users,
  ChefHat
} from "lucide-react";

const processSteps = [
  {
    stepNumber: 1,
    title: "Business Registration & Planning",
    description: "Set up your legal foundation and create a solid business plan for your bento box ghost kitchen.",
    details: [
      "Register your business name and obtain necessary licenses",
      "Get food handler's certification and health permits",
      "Create a comprehensive business plan with target market analysis",
      "Set up business banking and accounting systems"
    ],
    icon: <FileText className="w-6 h-6" />,
    completed: false
  },
  {
    stepNumber: 2,
    title: "Kitchen Setup & Equipment",
    description: "Establish your ghost kitchen space with proper equipment for bento box preparation and packaging.",
    details: [
      "Find and lease a commercial kitchen space or shared kitchen",
      "Purchase essential equipment: rice cookers, food warmers, packaging supplies",
      "Set up efficient workflow stations for assembly line production",
      "Install proper refrigeration and storage systems"
    ],
    icon: <Store className="w-6 h-6" />,
    completed: false
  },
  {
    stepNumber: 3,
    title: "Menu Development & Photography", 
    description: "Create appealing bento box menu items and capture professional photos for your Facebook presence.",
    details: [
      "Develop 5-10 signature bento box combinations with authentic Japanese flavors",
      "Test recipes and standardize portions for consistency",
      "Take high-quality photos of each menu item in proper lighting",
      "Create detailed ingredient lists and nutritional information"
    ],
    icon: <Camera className="w-6 h-6" />,
    completed: false
  },
  {
    stepNumber: 4,
    title: "Facebook Business Page Setup",
    description: "Create and optimize your Facebook business presence to attract local customers.",
    details: [
      "Create Facebook Business Page with complete profile information",
      "Upload menu photos and create engaging cover images",
      "Set up Facebook Shop with menu items and pricing",
      "Enable online ordering and payment processing through Facebook"
    ],
    icon: <Facebook className="w-6 h-6" />,
    completed: false
  },
  {
    stepNumber: 5,
    title: "Pricing & Payment Systems",
    description: "Establish competitive pricing and seamless payment processing for your bento boxes.",
    details: [
      "Research competitor pricing and set competitive rates ($12-18 per bento)",
      "Set up payment processing (Square, PayPal, or Facebook Pay)",
      "Create combo deals and loyalty program structure",
      "Implement dynamic pricing for peak and off-peak hours"
    ],
    icon: <DollarSign className="w-6 h-6" />,
    completed: false
  },
  {
    stepNumber: 6,
    title: "Delivery & Fulfillment Setup",
    description: "Organize efficient delivery systems to get fresh bento boxes to your customers quickly.",
    details: [
      "Partner with delivery services (DoorDash, Uber Eats, or local drivers)",
      "Set delivery zones and minimum order requirements",
      "Create packaging that keeps food fresh during transport",
      "Establish pickup and delivery time windows"
    ],
    icon: <Truck className="w-6 h-6" />,
    completed: false
  },
  {
    stepNumber: 7,
    title: "Launch & Marketing Strategy",
    description: "Execute your grand opening and implement marketing strategies to build a customer base.",
    details: [
      "Plan soft launch with friends and family for feedback",
      "Create Facebook marketing campaigns targeting local food lovers",
      "Implement customer review and feedback systems",
      "Track key metrics: orders, customer acquisition cost, retention rate"
    ],
    icon: <BarChart3 className="w-6 h-6" />,
    completed: false
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Process Section */}
      <section className="py-20 bg-gradient-to-b from-background to-bento-cream/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Your Path to 
              <span className="bg-gradient-hero bg-clip-text text-transparent"> Success</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Follow this proven 7-step process to launch your profitable bento box ghost kitchen business on Facebook. 
              Each step builds on the previous one to ensure your success.
            </p>
          </div>
          
          <div className="grid gap-8 max-w-4xl mx-auto">
            {processSteps.map((step, index) => (
              <ProcessStep
                key={step.stepNumber}
                {...step}
              />
            ))}
          </div>
          
          <div className="text-center mt-16">
            <div className="bg-gradient-hero rounded-3xl p-8 text-white shadow-hero max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">Ready to Start Your Journey?</h3>
              <p className="mb-6 opacity-90">Join hundreds of successful ghost kitchen owners who followed this exact process.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-bento-orange px-8 py-3 rounded-xl font-semibold hover:bg-bento-cream transition-smooth shadow-card">
                  <Smartphone className="w-5 h-5 inline mr-2" />
                  Get Started Now
                </button>
                <button className="border border-white/30 px-8 py-3 rounded-xl font-semibold hover:bg-white/10 transition-smooth">
                  <Users className="w-5 h-5 inline mr-2" />
                  Join Community
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-bento-brown text-bento-cream py-12">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
              <ChefHat className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">Bento Success</span>
          </div>
          <p className="text-bento-cream/80 mb-4">Empowering entrepreneurs to build successful ghost kitchen businesses</p>
          <div className="flex items-center justify-center gap-4 text-sm">
            <span>© 2024 Bento Success Guide</span>
            <span>•</span>
            <span>Built for Entrepreneurs</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;