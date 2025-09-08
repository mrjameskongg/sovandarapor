import { Button } from "@/components/ui/button";
import bentoHero from "@/assets/bento-hero.jpg";
import { ChefHat, Facebook, TrendingUp } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-bento-cream via-background to-bento-yellow/10 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23f97316%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
      
      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Content Side */}
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 bg-gradient-hero text-white px-4 py-2 rounded-full text-sm font-medium shadow-card">
            <ChefHat className="w-4 h-4" />
            Ghost Kitchen Success Guide
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
            Launch Your 
            <span className="bg-gradient-hero bg-clip-text text-transparent"> Bento Box</span>
            <br />
            Ghost Kitchen
          </h1>
          
          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
            Complete step-by-step process to build a profitable bento box ghost kitchen business on Facebook. 
            From setup to first sale in weeks, not months.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="hero" size="lg" className="text-lg px-8 py-6">
              <TrendingUp className="w-5 h-5 mr-2" />
              Start Your Business
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6 border-bento-orange text-bento-orange hover:bg-bento-orange hover:text-white">
              <Facebook className="w-5 h-5 mr-2" />
              Facebook Guide
            </Button>
          </div>
          
          <div className="flex items-center gap-8 pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-bento-orange">7</div>
              <div className="text-sm text-muted-foreground">Simple Steps</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-bento-green">30+</div>
              <div className="text-sm text-muted-foreground">Success Stories</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-bento-yellow">$5K+</div>
              <div className="text-sm text-muted-foreground">Average Monthly</div>
            </div>
          </div>
        </div>
        
        {/* Image Side */}
        <div className="relative">
          <div className="relative rounded-3xl overflow-hidden shadow-hero transform rotate-3 hover:rotate-0 transition-bounce">
            <img 
              src={bentoHero} 
              alt="Beautiful bento box with colorful Japanese cuisine arranged in compartments"
              className="w-full h-[600px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
          </div>
          
          {/* Floating Stats */}
          <div className="absolute -top-8 -left-8 bg-white rounded-2xl p-4 shadow-card">
            <div className="text-2xl font-bold text-bento-green">95%</div>
            <div className="text-sm text-muted-foreground">Success Rate</div>
          </div>
          
          <div className="absolute -bottom-8 -right-8 bg-gradient-hero rounded-2xl p-4 shadow-hero text-white">
            <div className="text-2xl font-bold">2-4 Weeks</div>
            <div className="text-sm opacity-90">To Launch</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;