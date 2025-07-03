
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Database, Settings, CheckCircle, AlertCircle, Link, Eye, EyeOff } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const DataSources = () => {
  const [showApiKeys, setShowApiKeys] = useState(false);
  const { toast } = useToast();

  const [sources, setSources] = useState([
    {
      id: 'apollo',
      name: 'Apollo.io',
      description: 'Plataforma líder em dados de contatos B2B',
      enabled: true,
      configured: true,
      apiKey: 'ap-*********************xyz',
      status: 'active',
      lastSync: '2 horas atrás',
      quota: { used: 2840, total: 5000 },
      features: ['Busca por empresa', 'Contatos diretos', 'Email finder', 'Enriquecimento'],
      logo: '🚀',
      color: 'bg-blue-50 border-blue-200'
    },
    {
      id: 'linkedin',
      name: 'LinkedIn Sales Navigator',
      description: 'Rede profissional com dados ricos de perfis',
      enabled: true,
      configured: false,
      apiKey: '',
      status: 'inactive',
      lastSync: 'Nunca',
      quota: { used: 0, total: 1000 },
      features: ['Busca avançada', 'Perfis detalhados', 'Conexões', 'InMail'],
      logo: '💼',
      color: 'bg-gray-50 border-gray-200'
    },
    {
      id: 'zoominfo',
      name: 'ZoomInfo',
      description: 'Base de dados B2B com informações empresariais',
      enabled: false,
      configured: false,
      apiKey: '',
      status: 'inactive',
      lastSync: 'Nunca',
      quota: { used: 0, total: 2000 },
      features: ['Dados empresariais', 'Tecnografias', 'Intent data', 'Hierarquia'],
      logo: '🔍',
      color: 'bg-gray-50 border-gray-200'
    },
    {
      id: 'hunter',
      name: 'Hunter.io',
      description: 'Especialista em descoberta e verificação de emails',
      enabled: true,
      configured: true,
      apiKey: 'hun-*********************abc',
      status: 'active',
      lastSync: '1 hora atrás',
      quota: { used: 180, total: 500 },
      features: ['Email finder', 'Verificação', 'Domain search', 'Bulk tasks'],
      logo: '📧',
      color: 'bg-green-50 border-green-200'
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

  const handleSaveApiKey = (sourceId: string, apiKey: string) => {
    setSources(prev => prev.map(source => 
      source.id === sourceId 
        ? { ...source, apiKey, configured: !!apiKey, status: apiKey ? 'active' : 'inactive' }
        : source
    ));
    
    toast({
      title: "API Key Salva",
      description: "A chave de API foi configurada com sucesso.",
    });
  };

  const testConnection = (sourceId: string) => {
    toast({
      title: "Testando Conexão",
      description: "Verificando conectividade com a fonte de dados...",
    });
    
    // Simulate test
    setTimeout(() => {
      toast({
        title: "Conexão Bem-sucedida",
        description: "A fonte de dados está funcionando corretamente.",
      });
    }, 2000);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Ativo</Badge>;
      case 'inactive':
        return <Badge variant="secondary">Inativo</Badge>;
      case 'error':
        return <Badge variant="destructive">Erro</Badge>;
      default:
        return <Badge variant="outline">Desconhecido</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Fontes de Dados</h2>
          <p className="text-gray-600">Configure e gerencie suas fontes de dados para prospecção</p>
        </div>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setShowApiKeys(!showApiKeys)}
        >
          {showApiKeys ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
          {showApiKeys ? 'Ocultar' : 'Mostrar'} API Keys
        </Button>
      </div>

      <Tabs defaultValue="sources" className="space-y-6">
        <TabsList>
          <TabsTrigger value="sources">Fontes Disponíveis</TabsTrigger>
          <TabsTrigger value="settings">Configurações Gerais</TabsTrigger>
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

                  {/* Quota */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <Label className="text-sm font-medium">Cota de API</Label>
                      <span className="text-sm text-gray-600">
                        {source.quota.used}/{source.quota.total}
                      </span>
                    </div>
                    <Progress 
                      value={(source.quota.used / source.quota.total) * 100} 
                      className="h-2"
                    />
                  </div>

                  {/* API Key Configuration */}
                  <div>
                    <Label htmlFor={`api-key-${source.id}`} className="text-sm font-medium">
                      API Key
                    </Label>
                    <div className="flex gap-2 mt-1">
                      <Input
                        id={`api-key-${source.id}`}
                        type={showApiKeys ? "text" : "password"}
                        placeholder="Cole sua API key aqui..."
                        defaultValue={source.apiKey}
                        className="flex-1"
                      />
                      <Button
                        size="sm"
                        onClick={() => handleSaveApiKey(source.id, 'nova-api-key')}
                        disabled={!source.enabled}
                      >
                        Salvar
                      </Button>
                    </div>
                  </div>

                  {/* Status & Actions */}
                  <div className="flex items-center justify-between pt-2 border-t">
                    <div className="text-sm text-gray-600">
                      <span>Última sincronização: {source.lastSync}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => testConnection(source.id)}
                        disabled={!source.configured || !source.enabled}
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Testar
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={!source.configured || !source.enabled}
                      >
                        <Link className="h-4 w-4 mr-1" />
                        Configurar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="settings">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Configurações de Coleta</CardTitle>
                <CardDescription>Configure como os dados são coletados</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Coleta Automática</Label>
                    <p className="text-sm text-gray-600">Executar coleta automaticamente a cada hora</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Deduplicação</Label>
                    <p className="text-sm text-gray-600">Remover leads duplicados automaticamente</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Validação de Email</Label>
                    <p className="text-sm text-gray-600">Verificar emails antes de adicionar ao CRM</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div>
                  <Label htmlFor="max-leads">Limite Diário de Leads</Label>
                  <Input
                    id="max-leads"
                    type="number"
                    defaultValue="200"
                    className="mt-1"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Configurações de Privacidade</CardTitle>
                <CardDescription>Conformidade com LGPD e privacidade</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Conformidade LGPD</Label>
                    <p className="text-sm text-gray-600">Aplicar filtros de conformidade</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Criptografia de Dados</Label>
                    <p className="text-sm text-gray-600">Criptografar dados sensíveis</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Log de Auditoria</Label>
                    <p className="text-sm text-gray-600">Registrar todas as atividades</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div>
                  <Label htmlFor="retention">Retenção de Dados (dias)</Label>
                  <Input
                    id="retention"
                    type="number"
                    defaultValue="365"
                    className="mt-1"
                  />
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
