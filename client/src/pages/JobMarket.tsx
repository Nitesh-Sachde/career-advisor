
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Search, TrendingUp, MapPin, Building, BarChart3, PieChart as PieChartIcon } from 'lucide-react';

// Sample data for market trends
const skillTrends = [
  { name: 'Jan', JavaScript: 78, Python: 65, React: 45, AWS: 55 },
  { name: 'Feb', JavaScript: 75, Python: 67, React: 47, AWS: 58 },
  { name: 'Mar', JavaScript: 76, Python: 70, React: 50, AWS: 60 },
  { name: 'Apr', JavaScript: 74, Python: 72, React: 52, AWS: 63 },
  { name: 'May', JavaScript: 75, Python: 75, React: 55, AWS: 65 },
  { name: 'Jun', JavaScript: 77, Python: 78, React: 60, AWS: 68 },
  { name: 'Jul', JavaScript: 80, Python: 80, React: 65, AWS: 70 },
  { name: 'Aug', JavaScript: 82, Python: 83, React: 70, AWS: 73 },
  { name: 'Sep', JavaScript: 85, Python: 85, React: 75, AWS: 75 },
  { name: 'Oct', JavaScript: 88, Python: 88, React: 80, AWS: 78 },
  { name: 'Nov', JavaScript: 90, Python: 90, React: 85, AWS: 80 },
  { name: 'Dec', JavaScript: 92, Python: 93, React: 88, AWS: 83 }
];

// Sample data for top skills
const topSkills = [
  { name: 'JavaScript', value: 92 },
  { name: 'Python', value: 93 },
  { name: 'React', value: 88 },
  { name: 'AWS', value: 83 },
  { name: 'Node.js', value: 78 },
  { name: 'SQL', value: 75 },
  { name: 'Docker', value: 70 },
  { name: 'TypeScript', value: 68 }
];

// Sample data for location demand
const locationDemand = [
  { name: 'San Francisco', jobs: 12500 },
  { name: 'New York', jobs: 10800 },
  { name: 'Seattle', jobs: 8700 },
  { name: 'Austin', jobs: 7200 },
  { name: 'Boston', jobs: 6500 },
  { name: 'Chicago', jobs: 5900 },
  { name: 'Los Angeles', jobs: 5700 },
  { name: 'Denver', jobs: 4800 }
];

// Sample data for industry distribution
const industryDistribution = [
  { name: 'Technology', value: 35 },
  { name: 'Finance', value: 20 },
  { name: 'Healthcare', value: 15 },
  { name: 'E-commerce', value: 12 },
  { name: 'Education', value: 8 },
  { name: 'Manufacturing', value: 6 },
  { name: 'Other', value: 4 }
];

const COLORS = ['#6366F1', '#8B5CF6', '#A78BFA', '#C4B5FD', '#818CF8', '#93C5FD', '#BAE6FD', '#E0F2FE'];

const JobMarket: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedSkill, setSelectedSkill] = useState('JavaScript');
  const [filteredSkills, setFilteredSkills] = useState(topSkills);
  
  useEffect(() => {
    if (searchTerm) {
      setFilteredSkills(topSkills.filter(skill => 
        skill.name.toLowerCase().includes(searchTerm.toLowerCase())
      ));
    } else {
      setFilteredSkills(topSkills);
    }
  }, [searchTerm]);

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <h1 className="page-header">Job Market Analysis</h1>
        
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Search for a skill..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-4">
            <div className="w-40">
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="europe">Europe</SelectItem>
                  <SelectItem value="asia">Asia</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button className="bg-primary">
              Apply Filters
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="trends" className="mb-6">
          <TabsList className="w-full mb-6">
            <TabsTrigger value="trends" className="flex-1">
              <TrendingUp className="mr-2 h-4 w-4" />
              Market Trends
            </TabsTrigger>
            <TabsTrigger value="skills" className="flex-1">
              <BarChart3 className="mr-2 h-4 w-4" />
              In-Demand Skills
            </TabsTrigger>
            <TabsTrigger value="locations" className="flex-1">
              <MapPin className="mr-2 h-4 w-4" />
              Location Analysis
            </TabsTrigger>
            <TabsTrigger value="industries" className="flex-1">
              <Building className="mr-2 h-4 w-4" />
              Industry Breakdown
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="trends">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Skill Demand Trends (Last 12 Months)
                </CardTitle>
                <CardDescription>
                  Track how demand for key tech skills has changed over the past year.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={skillTrends}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="JavaScript" stackId="1" stroke="#6366F1" fill="#6366F1" />
                      <Area type="monotone" dataKey="Python" stackId="2" stroke="#8B5CF6" fill="#8B5CF6" />
                      <Area type="monotone" dataKey="React" stackId="3" stroke="#A78BFA" fill="#A78BFA" />
                      <Area type="monotone" dataKey="AWS" stackId="4" stroke="#C4B5FD" fill="#C4B5FD" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="mt-4 flex flex-wrap gap-2 justify-center">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-[#6366F1] mr-1 rounded-sm"></div>
                    <span className="text-sm">JavaScript</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-[#8B5CF6] mr-1 rounded-sm"></div>
                    <span className="text-sm">Python</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-[#A78BFA] mr-1 rounded-sm"></div>
                    <span className="text-sm">React</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-[#C4B5FD] mr-1 rounded-sm"></div>
                    <span className="text-sm">AWS</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="skills">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Top In-Demand Skills
                </CardTitle>
                <CardDescription>
                  The most sought-after technical skills by employers right now.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={filteredSkills}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 50, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" domain={[0, 100]} />
                      <YAxis dataKey="name" type="category" />
                      <Tooltip />
                      <Bar dataKey="value" fill="#6366F1" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="mt-6">
                  <Label>Select skill to view detailed trends</Label>
                  <Select value={selectedSkill} onValueChange={setSelectedSkill}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select Skill" />
                    </SelectTrigger>
                    <SelectContent>
                      {topSkills.map(skill => (
                        <SelectItem key={skill.name} value={skill.name}>{skill.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="locations">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Job Opportunities by Location
                </CardTitle>
                <CardDescription>
                  Cities with the highest number of tech job openings.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={locationDemand}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="jobs" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gray-50 p-3 rounded-md text-center">
                    <div className="text-lg font-bold text-primary">$120K</div>
                    <div className="text-sm text-gray-600">Avg. Salary in SF</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-md text-center">
                    <div className="text-lg font-bold text-primary">$115K</div>
                    <div className="text-sm text-gray-600">Avg. Salary in NYC</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-md text-center">
                    <div className="text-lg font-bold text-primary">$110K</div>
                    <div className="text-sm text-gray-600">Avg. Salary in Seattle</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-md text-center">
                    <div className="text-lg font-bold text-primary">$105K</div>
                    <div className="text-sm text-gray-600">Avg. Salary in Austin</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="industries">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5 text-primary" />
                  Industry Distribution of Tech Jobs
                </CardTitle>
                <CardDescription>
                  How tech jobs are distributed across different industries.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row">
                  <div className="h-[350px] w-full md:w-1/2">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={industryDistribution}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={120}
                          fill="#8884d8"
                          paddingAngle={2}
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {industryDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="md:w-1/2 p-4">
                    <h3 className="text-lg font-semibold mb-4">Industry Insights</h3>
                    <div className="space-y-4">
                      <div className="bg-gray-50 p-3 rounded-md">
                        <h4 className="font-medium text-primary">Technology</h4>
                        <p className="text-sm text-gray-600">Pure tech companies remain the largest employers of tech talent, offering competitive salaries and advancement opportunities.</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-md">
                        <h4 className="font-medium text-primary">Finance</h4>
                        <p className="text-sm text-gray-600">Financial institutions are rapidly expanding their tech teams as digital transformation accelerates in banking and investment services.</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-md">
                        <h4 className="font-medium text-primary">Healthcare</h4>
                        <p className="text-sm text-gray-600">The healthcare industry shows strong growth in tech hiring, particularly in telehealth, data analytics, and medical software development.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default JobMarket;
