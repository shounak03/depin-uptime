import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Activity, Shield, Clock, Zap } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-6xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl text-primary">
              Monitor Your Applications with Confidence
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Real-time monitoring, instant alerts, and comprehensive analytics for your web applications.
              Keep your services running smoothly 24/7.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href="/dashboard">
                <Button size="lg">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="#features">
                <Button variant="outline" size="lg">
                  Learn more
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-24 sm:py-32 bg-muted/50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">Monitoring Made Simple</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Everything you need to monitor your applications
            </p>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Get comprehensive insights into your application's performance and uptime with our powerful monitoring tools.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              <div className="flex flex-col items-start">
                <div className="rounded-lg bg-primary p-2 ring-1 ring-muted">
                  <Activity className="h-6 w-6 text-white" />
                </div>
                <dt className="mt-4 font-semibold">Real-time Monitoring</dt>
                <dd className="mt-2 leading-7 text-muted-foreground">
                  Monitor your applications in real-time with instant updates and notifications.
                </dd>
              </div>
              <div className="flex flex-col items-start">
                <div className="rounded-lg bg-primary p-2 ring-1 ring-muted">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <dt className="mt-4 font-semibold">Secure & Reliable</dt>
                <dd className="mt-2 leading-7 text-muted-foreground">
                  Enterprise-grade security and reliability for your monitoring needs.
                </dd>
              </div>
              <div className="flex flex-col items-start">
                <div className="rounded-lg bg-primary p-2 ring-1 ring-muted">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <dt className="mt-4 font-semibold">24/7 Availability</dt>
                <dd className="mt-2 leading-7 text-muted-foreground">
                  Round-the-clock monitoring and instant alerts when issues arise.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}