
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle, Search, Users, Target, TrendingUp, Download, Settings, Play, Pause } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import ProspectingAgent from '@/components/ProspectingAgent';
import LeadDashboard from '@/components/LeadDashboard';
import LeadScoring from '@/components/LeadScoring';
import DataSources from '@/components/DataSources';

const Index = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  const handleStartProspecting = () => {
    setIsRunning(true);
    setProgress(0);
    
    // Simulate prospecting progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsRunning(false);
          toast({
            title: "Prospecção Concluída!",
            description: "47 novos leads qualificados foram encontrados e adicionados ao seu CRM.",
          });
          return 100;
        }
        return prev + 10;
      });
    }, 1000);

    toast({
      title: "Prospecção Iniciada",
      description: "O agente está buscando leads com base nos seus critérios.",
    });
  };

  const handleStopProspecting = () => {
    setIsRunning(false);
    setProgress(0);
    toast({
      title: "Prospecção Interrompida",
      description: "O processo foi pausado com segurança.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
                <Target className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Agente de Prospecção</h1>
                <p className="text-sm text-gray-600">Automação Inteligente de Leads</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                Sistema Ativo
              </Badge>
              {isRunning ? (
                <Button onClick={handleStopProspecting} variant="destructive" size="sm">
                  <Pause className="h-4 w-4 mr-2" />
                  Pausar
                </Button>
              ) : (
                <Button onClick={handleStartProspecting} className="bg-blue-600 hover:bg-blue-700" size="sm">
                  <Play className="h-4 w-4 mr-2" />
                  Iniciar Prospecção
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Progress Bar */}
        {isRunning && (
          <Card className="mb-8 border-blue-200 bg-blue-50/50">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <Label className="text-blue-700 font-medium">Progresso da Prospecção</Label>
                <span className="text-sm text-blue-600">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
              <p className="text-sm text-blue-600 mt-2">
                Processando dados de múltiplas fontes...
              </p>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-fit">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="prospecting" className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              Prospecção
            </TabsTrigger>
            <TabsTrigger value="scoring" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Qualificação
            </TabsTrigger>
            <TabsTrigger value="sources" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Fontes de Dados
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <LeadDashboard />
          </TabsContent>

          <TabsContent value="prospecting">
            <ProspectingAgent />
          </TabsContent>

          <TabsContent value="scoring">
            <LeadScoring />
          </TabsContent>

          <TabsContent value="sources">
            <DataSources />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
