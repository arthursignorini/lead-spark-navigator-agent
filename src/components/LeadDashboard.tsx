import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, Target, Download, Mail, Phone, Building, Award } from 'lucide-react';
import { SearchCriteria } from './ProspectingAgent';

interface LeadDashboardProps {
  searchCriteria?: SearchCriteria;
}

const LeadDashboard = ({ searchCriteria }: LeadDashboardProps) => {
  // Função para gerar hash baseado nos critérios (para consistência)
  const getCriteriaHash = () => {
    const criteriaString = [
      searchCriteria?.keywords || '',
      searchCriteria?.location || '',
      searchCriteria?.industry || '',
      searchCriteria?.companySize || '',
      searchCriteria?.jobTitles || ''
    ].join('|');
    
    let hash = 0;
    for (let i = 0; i < criteriaString.length; i++) {
      const char = criteriaString.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
  };

  // Função para gerar dados consistentes mas variados baseados nos critérios
  const generateDynamicData = () => {
    // Se não há critérios, mostra dados padrão baixos
    if (!searchCriteria?.keywords && !searchCriteria?.location && 
        !searchCriteria?.industry && !searchCriteria?.companySize && 
        !searchCriteria?.jobTitles) {
      return {
        totalLeads: 23,
        qualifiedLeads: 8,
        contactedLeads: 3,
        conversionRate: "34.8"
      };
    }

    const hash = getCriteriaHash();
    const random = (seed: number) => (Math.sin(seed) * 10000) % 1;
    
    // Base leads baseado na combinação de critérios
    let baseLeads = 15;
    
    // Multiplicadores por indústria
    const industryLeads: { [key: string]: number } = {
      "Tecnologia": 150,
      "SaaS": 89,
      "Marketing": 76,
      "E-commerce": 93,
      "Finanças": 67,
      "Consultoria": 54,
      "Saúde": 41,
      "Educação": 28,
      "Manufatura": 35,
      "Varejo": 48,
      "Imobiliário": 62,
      "Telecom": 71
    };

    // Multiplicadores por localização
    const locationLeads: { [key: string]: number } = {
      "São Paulo": 2.1,
      "Rio de Janeiro": 1.6,
      "Belo Horizonte": 1.2,
      "Brasília": 1.1,
      "Porto Alegre": 1.0,
      "Curitiba": 0.9,
      "Salvador": 0.8,
      "Recife": 0.7,
      "Fortaleza": 0.6
    };

    // Calcular leads baseado na indústria
    if (searchCriteria?.industry && industryLeads[searchCriteria.industry]) {
      baseLeads = industryLeads[searchCriteria.industry];
    }

    // Ajustar por localização
    if (searchCriteria?.location) {
      const locationKey = Object.keys(locationLeads).find(loc => 
        searchCriteria.location!.toLowerCase().includes(loc.toLowerCase())
      );
      if (locationKey) {
        baseLeads = Math.round(baseLeads * locationLeads[locationKey]);
      } else {
        baseLeads = Math.round(baseLeads * 0.7); // Cidade menor
      }
    }

    // Ajustar por tamanho da empresa
    const sizeMultipliers: { [key: string]: number } = {
      "1-10 funcionários": 2.8,
      "11-50 funcionários": 1.9,
      "51-200 funcionários": 1.2,
      "201-500 funcionários": 0.7,
      "501-1000 funcionários": 0.4,
      "1000+ funcionários": 0.2
    };

    if (searchCriteria?.companySize && sizeMultipliers[searchCriteria.companySize]) {
      baseLeads = Math.round(baseLeads * sizeMultipliers[searchCriteria.companySize]);
    }

    // Ajustar por palavras-chave
    if (searchCriteria?.keywords) {
      const keywordCount = searchCriteria.keywords.split(',').length;
      baseLeads = Math.round(baseLeads * (1 + keywordCount * 0.15));
    }

    // Adicionar variação consistente baseada no hash
    const variation = 0.8 + (Math.abs(random(hash)) * 0.4);
    baseLeads = Math.round(baseLeads * variation);

    const qualifiedRate = 0.20 + (Math.abs(random(hash + 1)) * 0.20); // 20-40%
    const contactRate = 0.15 + (Math.abs(random(hash + 2)) * 0.15); // 15-30%

    const qualifiedLeads = Math.round(baseLeads * qualifiedRate);
    const contactedLeads = Math.round(qualifiedLeads * contactRate);
    const conversionRate = ((qualifiedLeads / baseLeads) * 100).toFixed(1);

    return {
      totalLeads: Math.max(1, baseLeads),
      qualifiedLeads: Math.max(1, qualifiedLeads),
      contactedLeads: Math.max(1, contactedLeads),
      conversionRate
    };
  };

  // Função para gerar dados semanais específicos
  const generateWeeklyData = () => {
    const today = new Date();
    const weekData = [];
    const hash = getCriteriaHash();
    const random = (seed: number) => (Math.sin(seed) * 10000) % 1;
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      const dayName = date.toLocaleDateString('pt-BR', { weekday: 'short' });
      
      // Base leads baseado nos critérios
      let baseDayLeads = 5;
      
      if (searchCriteria?.industry) {
        const industryMultiplier: { [key: string]: number } = {
          "Tecnologia": 3.5,
          "SaaS": 2.8,
          "Marketing": 2.3,
          "E-commerce": 2.1,
          "Finanças": 1.8,
          "Consultoria": 1.5,
          "Saúde": 1.2,
          "Educação": 1.0
        };
        baseDayLeads *= (industryMultiplier[searchCriteria.industry] || 1);
      }

      if (searchCriteria?.companySize) {
        const sizeMultiplier: { [key: string]: number } = {
          "1-10 funcionários": 2.5,
          "11-50 funcionários": 1.8,
          "51-200 funcionários": 1.3,
          "201-500 funcionários": 0.8,
          "501-1000 funcionários": 0.5,
          "1000+ funcionários": 0.3
        };
        baseDayLeads *= (sizeMultiplier[searchCriteria.companySize] || 1);
      }

      // Variação por dia da semana
      const dayMultiplier = [0.3, 1.2, 1.4, 1.3, 1.5, 1.1, 0.4][date.getDay()];
      
      // Variação consistente baseada no hash + dia
      const dayVariation = 0.7 + (Math.abs(random(hash + i)) * 0.6);
      
      const leads = Math.round(baseDayLeads * dayMultiplier * dayVariation);
      const qualified = Math.round(leads * (0.15 + Math.abs(random(hash + i + 10)) * 0.25));
      
      weekData.push({
        day: dayName.charAt(0).toUpperCase() + dayName.slice(1),
        date: date.toLocaleDateString('pt-BR'),
        leads: Math.max(0, leads),
        qualified: Math.max(0, qualified)
      });
    }
    
    return weekData;
  };

  // Gerar leads específicos baseados nos critérios
  const generateTopLeads = () => {
    const hash = getCriteriaHash();
    const random = (seed: number) => (Math.sin(seed) * 10000) % 1;

    // Base de nomes e empresas
    const names = [
      "Maria Silva Santos", "João Carlos Oliveira", "Ana Paula Costa", "Carlos Eduardo Lima",
      "Fernanda Rodrigues", "Roberto Almeida", "Juliana Ferreira", "Pedro Henrique Souza",
      "Camila Nascimento", "Rafael Santos", "Larissa Mendes", "Gustavo Pereira"
    ];

    const positions = {
      "Tecnologia": ["CTO", "Head of Engineering", "Tech Lead", "VP de Produto"],
      "SaaS": ["CEO", "Head of Growth", "VP de Vendas", "Chief Revenue Officer"],
      "Marketing": ["CMO", "Diretor de Marketing", "Head of Marketing", "Gerente de Marketing"],
      "E-commerce": ["Head of E-commerce", "Diretor Comercial", "VP de Vendas", "Gerente de Vendas"],
      "Finanças": ["CFO", "Diretor Financeiro", "Controller", "Gerente Financeiro"],
      "Consultoria": ["Partner", "Diretor", "Gerente Senior", "Consultor Senior"],
      "Saúde": ["Diretor Médico", "Administrador", "Gerente de Operações", "Coordenador"],
      "Educação": ["Diretor Acadêmico", "Coordenador", "Reitor", "Vice-Reitor"]
    };

    const companies = {
      "Tecnologia": ["TechCorp", "DevSolutions", "InnovaTech", "CodeLab"],
      "SaaS": ["CloudWorks", "SaaS Innovations", "PlatformPro", "DataStream"],
      "Marketing": ["MarketingPro", "DigitalBoost", "CreativeHub", "BrandForce"],
      "E-commerce": ["ShopTech", "E-commerce Plus", "RetailPro", "CommerceHub"],
      "Finanças": ["FinanceCorpP", "InvestPro", "CapitalGroup", "MoneyTech"],
      "Consultoria": ["ConsultPro", "StrategyCorp", "BusinessSolutions", "ExpertHub"],
      "Saúde": ["HealthTech", "MedicalCorp", "CareSystem", "HealthPro"],
      "Educação": ["EduTech", "LearnCorp", "AcademyPro", "StudyHub"]
    };

    const industryKey = searchCriteria?.industry || "Tecnologia";
    
    const leads = [];
    for (let i = 0; i < 4; i++) {
      const nameIndex = Math.floor(Math.abs(random(hash + i)) * names.length);
      const positionIndex = Math.floor(Math.abs(random(hash + i + 20)) * (positions[industryKey] || positions["Tecnologia"]).length);
      const companyIndex = Math.floor(Math.abs(random(hash + i + 40)) * (companies[industryKey] || companies["Tecnologia"]).length);
      
      const score = 70 + Math.floor(Math.abs(random(hash + i + 60)) * 30);
      const status = score > 85 ? "Quente" : score > 75 ? "Morno" : "Frio";
      
      const name = names[nameIndex];
      const position = (positions[industryKey] || positions["Tecnologia"])[positionIndex];
      let company = (companies[industryKey] || companies["Tecnologia"])[companyIndex];
      
      // Adicionar localização se especificada
      if (searchCriteria?.location) {
        company += ` ${searchCriteria.location.split(',')[0]}`;
      }

      leads.push({
        name,
        company,
        position,
        score,
        email: `${name.toLowerCase().replace(/\s+/g, '.')}@${company.toLowerCase().replace(/\s+/g, '')}.com`,
        phone: `+55 ${11 + i} ${Math.floor(10000 + Math.abs(random(hash + i + 80)) * 90000)}-${Math.floor(1000 + Math.abs(random(hash + i + 100)) * 9000)}`,
        status
      });
    }

    return leads;
  };

  const dynamicData = generateDynamicData();
  const weeklyData = generateWeeklyData();
  const topLeads = generateTopLeads();

  const stats = [
    { 
      title: "Total de Leads", 
      value: dynamicData.totalLeads.toLocaleString(), 
      change: "+12%", 
      icon: Users, 
      color: "text-blue-600" 
    },
    { 
      title: "Leads Qualificados", 
      value: dynamicData.qualifiedLeads.toString(), 
      change: "+8%", 
      icon: Target, 
      color: "text-green-600" 
    },
    { 
      title: "Taxa de Conversão", 
      value: `${dynamicData.conversionRate}%`, 
      change: "+2.1%", 
      icon: TrendingUp, 
      color: "text-purple-600" 
    },
    { 
      title: "Leads Contatados", 
      value: dynamicData.contactedLeads.toString(), 
      change: "+15%", 
      icon: Mail, 
      color: "text-orange-600" 
    }
  ];

  // Ajustar distribuição por fonte baseada nos critérios
  const getSourceDistribution = () => {
    const hash = getCriteriaHash();
    const random = (seed: number) => (Math.sin(seed) * 10000) % 1;

    // Distribuição baseada na indústria
    let linkedinPercent = 45;
    let apolloPercent = 30;
    let zoomInfoPercent = 15;
    let othersPercent = 10;

    if (searchCriteria?.industry === 'Tecnologia' || searchCriteria?.industry === 'SaaS') {
      linkedinPercent = 55;
      apolloPercent = 35;
      zoomInfoPercent = 8;
      othersPercent = 2;
    } else if (searchCriteria?.industry === 'Saúde' || searchCriteria?.industry === 'Educação') {
      linkedinPercent = 35;
      apolloPercent = 25;
      zoomInfoPercent = 25;
      othersPercent = 15;
    }

    // Adicionar variação baseada nos critérios
    const variation = Math.abs(random(hash)) * 10;
    linkedinPercent = Math.max(30, Math.min(60, linkedinPercent + variation - 5));
    apolloPercent = Math.max(20, Math.min(40, apolloPercent + variation - 5));

    // Normalizar para 100%
    const total = linkedinPercent + apolloPercent + zoomInfoPercent + othersPercent;
    
    return [
      { name: 'LinkedIn', value: Math.round((linkedinPercent / total) * 100), color: '#0077B5' },
      { name: 'Apollo.io', value: Math.round((apolloPercent / total) * 100), color: '#FF6B35' },
      { name: 'ZoomInfo', value: Math.round((zoomInfoPercent / total) * 100), color: '#00C896' },
      { name: 'Outros', value: Math.round((othersPercent / total) * 100), color: '#6B73FF' }
    ];
  };

  const leadsBySource = getSourceDistribution();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Quente': return 'bg-red-100 text-red-800';
      case 'Morno': return 'bg-yellow-100 text-yellow-800';
      case 'Frio': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Indicador de critérios ativos */}
      {(searchCriteria?.keywords || searchCriteria?.location || searchCriteria?.industry) && (
        <Card className="border-blue-200 bg-blue-50/50">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2 text-sm text-blue-700">
              <Target className="h-4 w-4" />
              <span>Dashboard atualizado com base nos critérios: {searchCriteria?.industry || 'Geral'} 
                {searchCriteria?.location && ` • ${searchCriteria.location}`}
                {searchCriteria?.companySize && ` • ${searchCriteria.companySize}`}
              </span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <Badge variant="secondary" className="mt-1 bg-green-100 text-green-800">
                      {stat.change}
                    </Badge>
                  </div>
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Performance dos Últimos 7 Dias</CardTitle>
            <CardDescription>
              Leads coletados vs qualificados
              {searchCriteria?.industry && ` • Setor: ${searchCriteria.industry}`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [value, name === 'leads' ? 'Total de Leads' : 'Qualificados']}
                  labelFormatter={(label, payload) => {
                    const data = payload?.[0]?.payload;
                    return data ? `${label} - ${data.date}` : label;
                  }}
                />
                <Bar dataKey="leads" fill="#3b82f6" name="leads" />
                <Bar dataKey="qualified" fill="#10b981" name="qualified" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Sources Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Distribuição por Fonte</CardTitle>
            <CardDescription>
              Origem dos leads
              {searchCriteria?.industry && ` • Otimizado para ${searchCriteria.industry}`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={leadsBySource}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {leadsBySource.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top Leads Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Leads de Alto Potencial</CardTitle>
            <CardDescription>
              {searchCriteria?.industry ? 
                `Leads do setor ${searchCriteria.industry}${searchCriteria?.location ? ` em ${searchCriteria.location}` : ''}` : 
                'Os leads mais qualificados encontrados recentemente'
              }
            </CardDescription>
          </div>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topLeads.map((lead, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-semibold">
                      {lead.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-gray-900 truncate">{lead.name}</p>
                      <Badge className={getStatusColor(lead.status)} variant="secondary">
                        {lead.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Building className="h-3 w-3" />
                        {lead.company}
                      </span>
                      <span>{lead.position}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                      <span className="flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {lead.email}
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {lead.phone}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="flex items-center gap-1">
                      <Award className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm font-medium">{lead.score}</span>
                    </div>
                    <Progress value={lead.score} className="w-20 h-2 mt-1" />
                  </div>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    Contatar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeadDashboard;
