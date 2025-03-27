
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from 'react';
import { Plus, ArrowUpRight, ArrowDownRight, Clock, Activity } from 'lucide-react';
import useWebsites from '@/hooks/useWebsites';
import { API_BACKRDEND_URL } from '@/config';
import axios from 'axios';
import { useAuth } from '@clerk/nextjs';

interface StatusCheck {
  timestamp: string;
  status: 'up' | 'down';
}

interface Service {
  id: string;
  name: string;
  url: string;
  status: string;
  uptime: string;
  responseTime: string;
  lastChecked: string;
  statusHistory: StatusCheck[];
}

function StatusCandlestick({ status, timestamp }: { status: string; timestamp: string }) {
  return (
    <div className="relative group">
      <div 
        className={`w-2 gap-2 h-10 rounded ${
          status === 'up' 
            ? 'bg-green-500 dark:bg-green-600' 
            : 'bg-red-500 dark:bg-red-600'
        }`}
      />
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        {timestamp}
      </div>
    </div>
  );
}



export default function DashboardPage() {
  const [services, setServices] = useState<Service[]>([]);
  const {Websites,refresh} = useWebsites();

  function AddServiceDialog() {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [url, setUrl] = useState('');
    const { getToken } = useAuth();
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        const token = await getToken();
        const res =  await axios.post(`${API_BACKRDEND_URL}/api/v1/website`, {
          name,
          url
        }, {
          headers: {
            Authorization: token
          }
        });
        console.log('Added website:',res)
        setOpen(false);
        setName('');
        setUrl('');
      } catch (error) {
        console.error('Error adding website:', error);
      }finally{
        refresh()
      }
    };
  
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Service
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Service</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Service Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="My Website"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="url">URL</Label>
              <Input
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                type="url"
                required
              />
            </div>
            <Button type="submit" className="w-full">Add Service</Button>
          </form>
        </DialogContent>
      </Dialog>
    );
  }

  useEffect(() => {
    if (!Websites) return;
    
    const transformedServices = Websites.map(website => ({
      id: website.id,
      name: website.name,
      url: website.url,
      status: website.status?.state || 'unknown',
      uptime: '99.9%',
      responseTime: `${website.status?.latency || 0}ms`,
      lastChecked: new Date(website.status?.createdAt || Date.now()).toLocaleString(),
      statusHistory: Array.from({ length: 10 }, (_, i) => ({
        timestamp: new Date(Date.now() - i * 180000).toLocaleTimeString(),
        status: website.status?.state === 'up' ? 'up' : 'down'
      })).reverse()
    }));

    setServices(transformedServices);
  }, [Websites]);

  // Calculate statistics
  const totalIncidents = services.filter(service => service.status === 'down').length;
  const averageUptime = services.length 
    ? (services.reduce((acc, service) => acc + parseFloat(service.uptime), 0) / services.length).toFixed(1) + '%'
    : '0%';
  const averageResponseTime = services.length
    ? Math.round(services.reduce((acc, service) => acc + parseInt(service.responseTime), 0) / services.length) + 'ms'
    : '0ms';

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <AddServiceDialog />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Services</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{services.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Uptime</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageUptime}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageResponseTime}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Incidents</CardTitle>
            <ArrowDownRight className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalIncidents}</div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Monitored Services</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex w-full max-w-sm items-center space-x-2 mb-4">
            <Input type="search" placeholder="Search services..." />
            <Button>Search</Button>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {services.map((service) => (
              <AccordionItem key={service.id} value={`service-${service.id}`}>
                <AccordionTrigger>
                  <div className="flex items-center justify-between w-full pr-4">
                    <div className="flex items-center space-x-4">
                      <span className="font-medium">{service.name}</span>
                      <span className="text-sm text-muted-foreground">{service.url}</span>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      service.status === 'up' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {service.status.toUpperCase()}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pt-4">
                    <h4 className="text-sm font-semibold mb-2">Last 30 Minutes Status</h4>
                    <div className="flex items-end gap-4 h-12 justify-start">
                      {service.statusHistory.map((check, index) => (
                        <StatusCandlestick
                          key={index}
                          status={check.status}
                          timestamp={check.timestamp}
                        />
                      ))}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}