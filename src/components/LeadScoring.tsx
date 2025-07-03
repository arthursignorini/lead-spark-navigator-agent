
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Award, Target, Briefcase, Building, MapPin, Mail, Phone } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const LeadScoring = () => {
  const [scoringRules, setScoringRules] = useState({
    position: { weight: 30, enabled: true },
    company_size: { weight: 25, enabled: true },
    industry: { weight: 20, enabled: true },
    location: { weight: 10, enabled: true },
    contact_info: { weight: 15, enabled: true }
  });

  const { toast } = useToast();

  const handleWeightChange = (rule: string, value: number[]) => {
    setScoringRules(prev => ({
      ...prev,
      [rule]: { ...prev[rule], weight: value[0] }
    }));
  };

  const handleToggleRule = (rule: string, enabled: boolean) => {
    setScoringRules(prev => ({
      ...prev,
      [rule]: { ...prev[rule], enabled }
    }));
  };

  const handleSaveRules = () => {
    toast({
      title: "Regras de Qualificação Atualizadas",
      description: "As novas configurações de scoring foram salvas com sucesso.",
    });
  };

  const scoringCriteria = [
    {
      key: 'position',
      title: 'Cargo/Posição',
      description: 'Pontuação baseada no cargo do contato',
      icon: Briefcase,
      examples: ['CEO: 100pts', 'Diretor: 90pts', 'Gerente: 70pts', 'Analista: 40pts']
    },
    {
      key: 'company_size',
      title: 'Tamanho da Empresa',
      description: 'Pontuação baseada no número de funcionários',
      icon: Building,
      examples: ['1000+: 100pts', '500-1000: 80pts', '100-500: 60pts', '<100: 30pts']
    },
    {
      key: 'industry',
      title: 'Setor/Indústria',
      description: 'Pontuação baseada no setor da empresa',
      icon: Target,
      examples: ['Tech: 100pts', 'Saúde: 90pts', 'Finanças: 85pts', 'Outros: 50pts']
    },
    {
      key: 'location',
      title: 'Localização',
      description: 'Pontuação baseada na localização geográfica',
      icon: MapPin,
      examples: ['SP: 100pts', 'RJ: 90pts', 'Sul: 80pts', 'Outros: 60pts']
    },
    {
      key: 'contact_info',
      title: 'Informações de Contato',
      description: 'Pontuação baseada na disponibilidade de contatos',
      icon: Mail,
      examples: ['Email+Tel: 100pts', 'Só Email: 70pts', 'Só Tel: 50pts', 'Nenhum: 0pts']
    }
  ];

  const totalWeight = Object.values(scoringRules).reduce((sum, rule) => 
    sum + (rule.enabled ? rule.weight : 0), 0
  );

  const exampleLead = {
    name: "João Silva",
    position: "CEO",
    company: "TechStart Brasil",
    size: "150 funcionários",
    industry: "SaaS",
    location: "São Paulo, SP",
    email: "joao@techstart.com.br",
    phone: "+55 11 99999-9999"
  };

  const calculateExampleScore = () => {
    let score = 0;
    if (scoringRules.position.enabled) score += (100 * scoringRules.position.weight) / 100;
    if (scoringRules.company_size.enabled) score += (60 * scoringRules.company_size.weight) / 100;
    if (scoringRules.industry.enabled) score += (100 * scoringRules.industry.weight) / 100;
    if (scoringRules.location.enabled) score += (100 * scoringRules.location.weight) / 100;
    if (scoringRules.contact_info.enabled) score += (100 * scoringRules.contact_info.weight) / 100;
    return Math.round(score);
  };

  const exampleScore = calculateExampleScore();

  const getScoreCategory = (score: number) => {
    if (score >= 80) return { label: 'Quente', color: 'bg-red-100 text-red-800' };
    if (score >= 60) return { label: 'Morno', color: 'bg-yellow-100 text-yellow-800' };
    return { label: 'Frio', color: 'bg-blue-100 text-blue-800' };
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Scoring Rules Configuration */}
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-yellow-600" />
              Configuração de Scoring
            </CardTitle>
            <CardDescription>
              Defina os pesos e critérios para qualificação automática de leads
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {scoringCriteria.map((criteria) => {
              const Icon = criteria.icon;
              const rule = scoringRules[criteria.key];
              
              return (
                <div key={criteria.key} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-3 flex-1">
                      <Icon className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{criteria.title}</h3>
                          <Badge variant="outline">Peso: {rule.weight}%</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{criteria.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {criteria.examples.map((example, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {example}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <Switch
                      checked={rule.enabled}
                      onCheckedChange={(enabled) => handleToggleRule(criteria.key, enabled)}
                    />
                  </div>
                  
                  {rule.enabled && (
                    <div className="mt-4">
                      <Label className="text-sm">Peso na Pontuação: {rule.weight}%</Label>
                      <Slider
                        value={[rule.weight]}
                        onValueChange={(value) => handleWeightChange(criteria.key, value)}
                        max={50}
                        min={5}
                        step={5}
                        className="mt-2"
                      />
                    </div>
                  )}
                </div>
              );
            })}

            <div className="flex items-center justify-between pt-4 border-t">
              <div>
                <p className="text-sm text-gray-600">
                  Peso Total: <strong>{totalWeight}%</strong>
                </p>
                {totalWeight !== 100 && (
                  <p className="text-xs text-amber-600">
                    ⚠️ O peso total deve somar 100% para melhor precisão
                  </p>
                )}
              </div>
              <Button onClick={handleSaveRules} className="bg-blue-600 hover:bg-blue-700">
                Salvar Configurações
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Example Scoring & Preview */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-green-600" />
              Exemplo de Scoring
            </CardTitle>
            <CardDescription>
              Veja como um lead seria qualificado com as regras atuais
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className="h-16 w-16 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-xl mx-auto mb-3">
                  JS
                </div>
                <h3 className="font-semibold">{exampleLead.name}</h3>
                <p className="text-sm text-gray-600">{exampleLead.position}</p>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-gray-400" />
                  <span>{exampleLead.company} ({exampleLead.size})</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-gray-400" />
                  <span>{exampleLead.industry}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span>{exampleLead.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span>{exampleLead.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span>{exampleLead.phone}</span>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Score Total</span>
                  <Badge className={getScoreCategory(exampleScore).color}>
                    {getScoreCategory(exampleScore).label}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Progress value={exampleScore} className="flex-1" />
                  <span className="text-sm font-bold">{exampleScore}/100</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Categorias de Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <span className="font-medium">Quente</span>
                </div>
                <span className="text-sm text-gray-600">80-100 pts</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  <span className="font-medium">Morno</span>
                </div>
                <span className="text-sm text-gray-600">60-79 pts</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                  <span className="font-medium">Frio</span>
                </div>
                <span className="text-sm text-gray-600">0-59 pts</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LeadScoring;
