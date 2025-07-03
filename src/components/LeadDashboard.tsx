
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
  // Função para gerar dados dinâmicos baseados nos critérios de pesquisa
  const generateDynamicData = () => {
    const hasKeywords = searchCriteria?.keywords?.trim();
    const hasLocation = searchCriteria?.location?.trim();
    const hasIndustry = searchCriteria?.industry;
    const hasCompanySize = searchCriteria?.companySize;

    // Multiplier baseado nos critérios preenchidos
    let multiplier = 1;
    if (hasKeywords) multiplier += 0.3;
    if (hasLocation) multiplier += 0.2;
    if (hasIndustry) multiplier += 0.25;
    if (hasCompanySize) multiplier += 0.25;

    const baseLeads = Math.round(847 * multiplier);
    const baseQualified = Math.round(289 * multiplier);
    const baseContacted = Math.round(126 * multiplier);

    return {
      totalLeads: baseLeads,
      qualifiedLeads: baseQualified,
      contactedLeads: baseContacted,
      conversionRate: ((baseQualified / baseLeads) * 100).toFixed(1)
    };
  };

  // Função para gerar dados semanais baseados em datas reais
  const generateWeeklyData = () => {
    const today = new Date();
    const weekData = [];
    
    // Gerar dados para os últimos 7 dias
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      const dayName = date.toLocaleDateString('pt-BR', { weekday: 'short' });
      const multiplier = searchCriteria?.keywords ? 1.5 : 1;
      
      // Variação baseada no dia da semana (menos atividade nos fins de semana)
      const dayMultiplier = [0, 1, 1.2, 1.1, 1.3, 1.0, 0.7][date.getDay()];
      
      weekData.push({
        day: dayName.charAt(0).toUpperCase() + dayName.slice(1),
        date: date.toLocaleDateString('pt-BR'),
        leads: Math.round((35 + Math.random() * 40) * multiplier * dayMultiplier),
        qualified: Math.round((10 + Math.random() * 20) * multiplier * dayMultiplier)
      });
    }
    
    return weekData;
  };

  const dynamicData = generateDynamicData();
  const weeklyData = generateWeeklyData();

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
    let linkedinPercent = 45;
    let apolloPercent = 30;
    let zoomInfoPercent = 15;
    let othersPercent = 10;

    // Se tem critérios específicos, ajusta a distribuição
    if (searchCriteria?.industry === 'Tecnologia' || searchCriteria?.industry === 'SaaS') {
      linkedinPercent = 55;
      apolloPercent = 35;
      zoomInfoPercent = 8;
      othersPercent = 2;
    }

    return [
      { name: 'LinkedIn', value: linkedinPercent, color: '#0077B5' },
      { name: 'Apollo.io', value: apolloPercent, color: '#FF6B35' },
      { name: 'ZoomInfo', value: zoomInfoPercent, color: '#00C896' },
      { name: 'Outros', value: othersPercent, color: '#6B73FF' }
    ];
  };

  const leadsBySource = getSourceDistribution();

  // Gerar leads principais baseados nos critérios
  const generateTopLeads = () => {
    const baseLeads = [
      {
        name: "Maria Silva Santos",
        company: "TechCorp Brasil",
        position: "Diretora de Marketing",
        score: 95,
        email: "maria.santos@techcorp.com.br",
        phone: "+55 11 99999-9999",
        status: "Quente"
      },
      {
        name: "João Carlos Oliveira",
        company: "Fintech Solutions",
        position: "CEO & Founder",
        score: 92,
        email: "joao@fintechsolutions.com",
        phone: "+55 21 88888-8888",
        status: "Quente"
      },
      {
        name: "Ana Paula Costa",
        company: "E-commerce Plus",
        position: "VP de Vendas",
        score: 88,
        email: "ana.costa@ecommerceplus.com",
        phone: "+55 11 77777-7777",
        status: "Morno"
      },
      {
        name: "Carlos Eduardo Lima",
        company: "SaaS Innovations",
        position: "Head of Growth",
        score: 85,
        email: "carlos@saasinnovations.com",
        phone: "+55 11 66666-6666",
        status: "Morno"
      }
    ];

    // Ajustar leads baseado nos critérios de busca
    if (searchCriteria?.industry) {
      const industryMap: { [key: string]: string } = {
        'Tecnologia': 'Tech Solutions',
        'SaaS': 'SaaS Innovations',
        'Finanças': 'Financial Services',
        'E-commerce': 'E-commerce Plus',
        'Marketing': 'Marketing Pro',
        'Saúde': 'HealthTech'
      };
      
      const industryCompany = industryMap[searchCriteria.industry];
      if (industryCompany) {
        baseLeads[0].company = `${industryCompany} ${searchCriteria.location || 'Brasil'}`;
      }
    }

    if (searchCriteria?.location) {
      baseLeads.forEach(lead => {
        lead.company = `${lead.company.split(' ')[0]} ${searchCriteria.location}`;
      });
    }

    return baseLeads;
  };

  const topLeads = generateTopLeads();

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
              <span>Dashboard atualizado com base nos critérios de pesquisa</span>
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
            <CardDescription>Leads coletados vs qualificados (dados atualizados)</CardDescription>
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
            <CardDescription>Origem dos leads (ajustada pelos critérios)</CardDescription>
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
              {searchCriteria?.keywords || searchCriteria?.industry ? 
                'Leads filtrados pelos seus critérios de pesquisa' : 
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
