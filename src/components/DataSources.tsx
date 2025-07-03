
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Database, Settings, CheckCircle, AlertCircle, Link, Eye, EyeOff, Globe, Users, Building, Mail } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const DataSources = () => {
  const [showUrls, setShowUrls] = useState(false);
  const { toast } = useToast();

  const [sources, setSources] = useState([
    {
      id: 'linkedin-free',
      name: 'LinkedIn (Busca Gratuita)',
      description: 'Pesquisa manual no LinkedIn usando busca avançada',
      enabled: true,
      configured: true,
      url: 'https://www.linkedin.com/search/results/people/',
      status: 'active',
      lastSync: 'Manual',
      quota: { used: 0, total: 'Ilimitado' },
      features: ['Busca por cargo', 'Filtros de localização', 'Filtros de empresa', 'Visualização de perfis'],
      logo: '💼',
      color: 'bg-blue-50 border-blue-200',
      type: 'manual',
      instructions: 'Use filtros: cargo, localização, empresa atual, conexões'
    },
    {
      id: 'google-maps',
      name: 'Google Maps Business',
      description: 'Busca empresas locais através do Google Maps',
      enabled: true,
      configured: true,
      url: 'https://www.google.com/maps/search/',
      status: 'active',
      lastSync: 'Manual',
      quota: { used: 0, total: 'Ilimitado' },
      features: ['Empresas locais', 'Informações de contato', 'Horários', 'Avaliações'],
      logo: '🗺️',
      color: 'bg-green-50 border-green-200',
      type: 'manual',
      instructions: 'Pesquise por: "empresas de tecnologia São Paulo" ou similar'
    },
    {
      id: 'crunchbase-free',
      name: 'Crunchbase (Gratuito)',
      description: 'Informações de startups e empresas em crescimento',
      enabled: true,
      configured: true,
      url: 'https://www.crunchbase.com/discover/organization.companies/',
      status: 'active',
      lastSync: 'Manual',
      quota: { used: 0, total: '10 visualizações/dia' },
      features: ['Startups', 'Financiamento', 'Executivos', 'Dados de empresa'],
      logo: '🚀',
      color: 'bg-purple-50 border-purple-200',
      type: 'manual',
      instructions: 'Filtre por: localização, setor, tamanho, status de financiamento'
    },
    {
      id: 'github-devs',
      name: 'GitHub Developers',
      description: 'Encontre desenvolvedores e empresas tech no GitHub',
      enabled: true,
      configured: true,
      url: 'https://github.com/search?type=users',
      status: 'active',
      lastSync: 'Manual',
      quota: { used: 0, total: 'Ilimitado' },
      features: ['Desenvolvedores', 'Empresas tech', 'Tecnologias', 'Localização'],
      logo: '👨‍💻',
      color: 'bg-gray-50 border-gray-200',
      type: 'manual',
      instructions: 'Busque por: location:"São Paulo" language:JavaScript'
    },
    {
      id: 'instagram-business',
      name: 'Instagram Business',
      description: 'Empresas e empreendedores no Instagram',
      enabled: false,
      configured: true,
      url: 'https://www.instagram.com/explore/tags/',
      status: 'inactive',
      lastSync: 'Manual',
      quota: { used: 0, total: 'Ilimitado' },
      features: ['Empresas locais', 'Empreendedores', 'Hashtags', 'Stories'],
      logo: '📸',
      color: 'bg-pink-50 border-pink-200',
      type: 'manual',
      instructions: 'Use hashtags: #empresasp #startupbrasil #empreendedorismo'
    },
    {
      id: 'email-finder',
      name: 'Email Finder (Gratuito)',
      description: 'Técnicas gratuitas para encontrar emails corporativos',
      enabled: true,
      configured: true,
      url: '',
      status: 'active',
      lastSync: 'Manual',
      quota: { used: 0, total: 'Ilimitado' },
      features: ['Padrões de email', 'Verificação simples', 'Redes sociais', 'Sites corporativos'],
      logo: '📧',
      color: 'bg-yellow-50 border-yellow-200',
      type: 'technique',
      instructions: 'Padrões: nome.sobrenome@empresa.com, nome@empresa.com'
    }
  ]);

  const handleToggleSource = (sourceId: string) => {
    setSources(prev => prev.map(source => 
      source.id === sourceId 
        ? { ...source, enabled: !source.enabled }
        : source
    ));
    
    toast({
      title: "Fonte Atualizada",
      description: "A configuração da fonte de dados foi alterada.",
    });
  };

  const openSource = (source: any) => {
    if (source.type === 'manual' && source.url) {
      window.open(source.url, '_blank');
      toast({
        title: "Fonte Aberta",
        description: `Abrindo ${source.name} em nova aba para pesquisa manual.`,
      });
    } else if (source.type === 'technique') {
      toast({
        title: "Técnica de Email",
        description: "Veja as instruções para encontrar emails corporativos.",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Ativo</Badge>;
      case 'inactive':
        return <Badge variant="secondary">Inativo</Badge>;
      default:
        return <Badge variant="outline">Manual</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Fontes de Dados Gratuitas</h2>
          <p className="text-gray-600">Métodos gratuitos e eficazes para encontrar leads qualificados</p>
        </div>
        <Badge variant="outline" className="bg-green-50 text-green-700">
          <CheckCircle className="h-4 w-4 mr-1" />
          100% Gratuito
        </Badge>
      </div>

      <Tabs defaultValue="sources" className="space-y-6">
        <TabsList>
          <TabsTrigger value="sources">Fontes Disponíveis</TabsTrigger>
          <TabsTrigger value="techniques">Técnicas de Prospecção</TabsTrigger>
          <TabsTrigger value="templates">Templates de Pesquisa</TabsTrigger>
        </TabsList>

        <TabsContent value="sources">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {sources.map((source) => (
              <Card key={source.id} className={`${source.color} transition-all hover:shadow-md`}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{source.logo}</div>
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {source.name}
                          {getStatusBadge(source.status)}
                        </CardTitle>
                        <CardDescription>{source.description}</CardDescription>
                      </div>
                    </div>
                    <Switch
                      checked={source.enabled}
                      onCheckedChange={() => handleToggleSource(source.id)}
                    />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Features */}
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Recursos Disponíveis</Label>
                    <div className="flex flex-wrap gap-1">
                      {source.features.map((feature, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Instructions */}
                  <div className="bg-white/50 p-3 rounded-lg">
                    <Label className="text-sm font-medium mb-1 block">Como Usar</Label>
                    <p className="text-sm text-gray-600">{source.instructions}</p>
                  </div>

                  {/* Quota */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <Label className="text-sm font-medium">Limite</Label>
                      <span className="text-sm text-gray-600">
                        {typeof source.quota.total === 'string' ? source.quota.total : `${source.quota.used}/${source.quota.total}`}
                      </span>
                    </div>
                    {typeof source.quota.total === 'number' && (
                      <Progress 
                        value={(source.quota.used / source.quota.total) * 100} 
                        className="h-2"
                      />
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-2 border-t">
                    <div className="text-sm text-gray-600">
                      <span>Método: {source.lastSync}</span>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => openSource(source)}
                      disabled={!source.enabled}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      {source.type === 'manual' ? (
                        <>
                          <Globe className="h-4 w-4 mr-1" />
                          Abrir Site
                        </>
                      ) : (
                        <>
                          <Eye className="h-4 w-4 mr-1" />
                          Ver Técnica
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="techniques">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Técnicas de Email Finding
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Padrões Comuns de Email:</h4>
                  <ul className="text-sm space-y-1 text-gray-600">
                    <li>• nome.sobrenome@empresa.com</li>
                    <li>• nome@empresa.com</li>
                    <li>• inicial.sobrenome@empresa.com</li>
                    <li>• nome.inicial@empresa.com</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Ferramentas de Verificação:</h4>
                  <ul className="text-sm space-y-1 text-gray-600">
                    <li>• Verificar no LinkedIn se tem email</li>
                    <li>• Buscar no site da empresa</li>
                    <li>• Verificar assinatura em posts/artigos</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Estratégias de Pesquisa
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">LinkedIn Avançado:</h4>
                  <ul className="text-sm space-y-1 text-gray-600">
                    <li>• Use aspas para termos exatos</li>
                    <li>• Combine filtros de localização + cargo</li>
                    <li>• Procure por mudanças recentes de emprego</li>
                    <li>• Veja conexões em comum</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Google Maps:</h4>
                  <ul className="text-sm space-y-1 text-gray-600">
                    <li>• "empresas de [setor] em [cidade]"</li>
                    <li>• Verificar horários de funcionamento</li>
                    <li>• Ler reviews para entender necessidades</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="templates">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Templates de Pesquisa por Setor</CardTitle>
                <CardDescription>Copie e use estes templates para suas pesquisas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">🏢 Tecnologia</h4>
                      <p className="text-sm text-gray-600 mb-2">LinkedIn:</p>
                      <code className="text-xs bg-white p-2 rounded block">
                        "CTO" OR "Head of Technology" AND "São Paulo"
                      </code>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">💰 Finanças</h4>
                      <p className="text-sm text-gray-600 mb-2">LinkedIn:</p>
                      <code className="text-xs bg-white p-2 rounded block">
                        "CFO" OR "Diretor Financeiro" AND "Brasil"
                      </code>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">🏥 Saúde</h4>
                      <p className="text-sm text-gray-600 mb-2">Google Maps:</p>
                      <code className="text-xs bg-white p-2 rounded block">
                        clínicas médicas Rio de Janeiro
                      </code>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">🛒 E-commerce</h4>
                      <p className="text-sm text-gray-600 mb-2">Crunchbase:</p>
                      <code className="text-xs bg-white p-2 rounded block">
                        E-commerce AND Brazil AND Series A
                      </code>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DataSources;
