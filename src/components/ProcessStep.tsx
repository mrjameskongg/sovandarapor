import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Circle, ArrowRight } from "lucide-react";

interface ProcessStepProps {
  stepNumber: number;
  title: string;
  description: string;
  details: string[];
  completed?: boolean;
  icon: React.ReactNode;
}

const ProcessStep = ({ stepNumber, title, description, details, completed = false, icon }: ProcessStepProps) => {
  return (
    <Card className="p-6 bg-gradient-card shadow-card hover:shadow-hero/20 transition-smooth transform hover:scale-[1.02] border-2 border-transparent hover:border-bento-orange/20">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-gradient-hero rounded-full flex items-center justify-center text-white font-bold text-lg shadow-card">
            {stepNumber}
          </div>
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <div className="text-bento-orange">{icon}</div>
            <h3 className="text-xl font-bold text-foreground">{title}</h3>
            {completed ? (
              <CheckCircle className="w-5 h-5 text-bento-green" />
            ) : (
              <Circle className="w-5 h-5 text-muted-foreground" />
            )}
          </div>
          
          <p className="text-muted-foreground mb-4 leading-relaxed">{description}</p>
          
          <div className="space-y-2">
            {details.map((detail, index) => (
              <div key={index} className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 text-bento-orange mt-0.5 flex-shrink-0" />
                <span className="text-sm text-foreground">{detail}</span>
              </div>
            ))}
          </div>
          
          {completed && (
            <div className="mt-4">
              <Button variant="success" size="sm">
                Completed ✓
              </Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ProcessStep;