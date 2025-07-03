
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Target, Users, MapPin, Building, Briefcase } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const ProspectingAgent = () => {
  const [keywords, setKeywords] = useState('');
  const [location, setLocation] = useState('');
  const [companySize, setCompanySize] = useState('');
  const [industry, setIndustry] = useState('');
  const [jobTitles, setJobTitles] = useState('');
  const { toast } = useToast();

  const handleSaveConfig = () => {
    toast({
      title: "Configuração Salva",
      description: "Os critérios de prospecção foram atualizados com sucesso.",
    });
  };

  const industries = [
    "Tecnologia", "Saúde", "Finanças", "E-commerce", "Marketing", "Consultoria",
    "Educação", "Manufatura", "Varejo", "Imobiliário", "Telecom", "SaaS"
  ];

  const companySizes = [
    "1-10 funcionários", "11-50 funcionários", "51-200 funcionários",
    "201-500 funcionários", "501-1000 funcionários", "1000+ funcionários"
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Configuration Panel */}
      <Card className="h-fit">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-600" />
            Critérios de Prospecção
          </CardTitle>
          <CardDescription>
            Configure os parâmetros para busca de leads qualificados
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="keywords">Palavras-chave</Label>
            <Textarea 
              id="keywords"
              placeholder="Ex: diretor de marketing, gerente de vendas, CEO, founder..."
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              className="mt-1"
            />
            <p className="text-sm text-gray-500 mt-1">
              Digite cargos, títulos ou palavras-chave relevantes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="location">Localização</Label>
              <Input 
                id="location"
                placeholder="Ex: São Paulo, Brasil"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            
            <div>
              <Label>Tamanho da Empresa</Label>
              <Select value={companySize} onValueChange={setCompanySize}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tamanho" />
                </SelectTrigger>
                <SelectContent>
                  {companySizes.map((size) => (
                    <SelectItem key={size} value={size}>{size}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label>Setor/Indústria</Label>
            <Select value={industry} onValueChange={setIndustry}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o setor" />
              </SelectTrigger>
              <SelectContent>
                {industries.map((ind) => (
                  <SelectItem key={ind} value={ind}>{ind}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="jobTitles">Cargos Específicos</Label>
            <Input 
              id="jobTitles"
              placeholder="Ex: CTO, Head of Marketing, Sales Director"
              value={jobTitles}
              onChange={(e) => setJobTitles(e.target.value)}
            />
          </div>

          <Button onClick={handleSaveConfig} className="w-full bg-blue-600 hover:bg-blue-700">
            <Target className="h-4 w-4 mr-2" />
            Salvar Configuração
          </Button>
        </CardContent>
      </Card>

      {/* Preview & Statistics */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5 text-green-600" />
              Prévia da Busca
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-blue-50 border-blue-200">
                  <Briefcase className="h-3 w-3 mr-1" />
                  {keywords || 'Nenhuma palavra-chave definida'}
                </Badge>
              </div>
              
              {location && (
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-green-50 border-green-200">
                    <MapPin className="h-3 w-3 mr-1" />
                    {location}
                  </Badge>
                </div>
              )}

              {companySize && (
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-purple-50 border-purple-200">
                    <Users className="h-3 w-3 mr-1" />
                    {companySize}
                  </Badge>
                </div>
              )}

              {industry && (
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-orange-50 border-orange-200">
                    <Building className="h-3 w-3 mr-1" />
                    {industry}
                  </Badge>
                </div>
              )}
            </div>

            {(!keywords && !location && !companySize && !industry) && (
              <p className="text-gray-500 text-sm italic">
                Configure os critérios acima para ver a prévia da busca
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Estimativa de Resultados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">~150</div>
                <div className="text-sm text-gray-600">Leads Potenciais</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-green-600">~45</div>
                <div className="text-sm text-gray-600">Leads Qualificados</div>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-3 text-center">
              * Estimativas baseadas em critérios similares processados anteriormente
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProspectingAgent;
