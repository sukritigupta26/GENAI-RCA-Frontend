import { Zap, TrendingUp, Activity, AlertTriangle, Info } from 'lucide-react';

export function NewEvents() {
  const events = [
    {
      id: 'EVT-2024-156',
      type: 'deployment',
      title: 'Deployment Completed: backend-api v3.2.1',
      description: 'Successfully deployed to production cluster',
      timestamp: '2 minutes ago',
      severity: 'info',
      source: 'Jenkins Pipeline',
      details: 'All health checks passed, 12 pods updated',
    },
    {
      id: 'EVT-2024-155',
      type: 'scaling',
      title: 'Auto-scaling Triggered: prod-frontend',
      description: 'Increased replica count from 3 to 5',
      timestamp: '8 minutes ago',
      severity: 'info',
      source: 'Kubernetes HPA',
      details: 'CPU usage exceeded 70% threshold',
    },
    {
      id: 'EVT-2024-154',
      type: 'alert',
      title: 'Warning: High Memory Usage Detected',
      description: 'Development cluster node-02 at 82% memory',
      timestamp: '15 minutes ago',
      severity: 'warning',
      source: 'Prometheus Alert',
      details: 'Monitoring for potential memory leak',
    },
    {
      id: 'EVT-2024-153',
      type: 'build',
      title: 'Build Successful: integration-tests',
      description: 'All 247 tests passed successfully',
      timestamp: '22 minutes ago',
      severity: 'success',
      source: 'Jenkins',
      details: 'Build time: 4m 32s',
    },
    {
      id: 'EVT-2024-152',
      type: 'ansible',
      title: 'Ansible Playbook Executed: security-patches',
      description: 'Applied security updates to 15 servers',
      timestamp: '34 minutes ago',
      severity: 'success',
      source: 'Ansible Tower',
      details: 'All tasks completed without errors',
    },
    {
      id: 'EVT-2024-151',
      type: 'performance',
      title: 'Performance Metric: API Response Time Improved',
      description: 'Average response time decreased by 23%',
      timestamp: '1 hour ago',
      severity: 'success',
      source: 'APM Monitoring',
      details: 'After database optimization',
    },
    {
      id: 'EVT-2024-150',
      type: 'security',
      title: 'Security Scan Completed',
      description: 'No vulnerabilities found in production images',
      timestamp: '1 hour ago',
      severity: 'success',
      source: 'Trivy Scanner',
      details: 'Scanned 24 container images',
    },
    {
      id: 'EVT-2024-149',
      type: 'alert',
      title: 'Notice: Scheduled Maintenance Window',
      description: 'Staging environment maintenance at 02:00 UTC',
      timestamp: '2 hours ago',
      severity: 'info',
      source: 'Operations Team',
      details: 'Expected downtime: 30 minutes',
    },
  ];

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'deployment':
        return <Zap className="w-5 h-5" />;
      case 'scaling':
        return <TrendingUp className="w-5 h-5" />;
      case 'alert':
        return <AlertTriangle className="w-5 h-5" />;
      case 'build':
      case 'ansible':
      case 'performance':
      case 'security':
        return <Activity className="w-5 h-5" />;
      default:
        return <Info className="w-5 h-5" />;
    }
  };

  const getSeverityStyle = (severity: string) => {
    switch (severity) {
      case 'success':
        return 'bg-green-500/10 border-green-500/30 text-green-400';
      case 'warning':
        return 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400';
      case 'info':
        return 'bg-blue-500/10 border-blue-500/30 text-blue-400';
      default:
        return 'bg-slate-500/10 border-slate-500/30 text-slate-400';
    }
  };

  return (
    <div className="h-full overflow-y-auto bg-slate-950">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-950 border-b border-slate-800 px-8 py-6">
        <h1 className="text-2xl font-bold text-slate-100 mb-2">New Events</h1>
        <p className="text-sm text-slate-400">Real-time system events and notifications</p>
      </div>

      <div className="p-8">
        {/* Stats */}
        <div className="grid grid-cols-5 gap-6 mb-8">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <div className="text-3xl font-bold text-slate-100 mb-1">8</div>
            <div className="text-sm text-slate-400">Events (Last Hour)</div>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <div className="text-3xl font-bold text-green-400 mb-1">5</div>
            <div className="text-sm text-slate-400">Successful</div>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <div className="text-3xl font-bold text-yellow-400 mb-1">1</div>
            <div className="text-sm text-slate-400">Warnings</div>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <div className="text-3xl font-bold text-blue-400 mb-1">2</div>
            <div className="text-sm text-slate-400">Info</div>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <div className="text-3xl font-bold text-red-400 mb-1">0</div>
            <div className="text-sm text-slate-400">Errors</div>
          </div>
        </div>

        {/* Events Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-800"></div>

          {/* Events */}
          <div className="space-y-6">
            {events.map((event, index) => (
              <div key={event.id} className="relative pl-16">
                {/* Timeline dot */}
                <div
                  className={`absolute left-4 top-4 w-5 h-5 rounded-full border-2 border-slate-950 ${getSeverityStyle(event.severity)}`}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    {getEventIcon(event.type)}
                  </div>
                </div>

                {/* Event card */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs font-mono text-slate-400">{event.id}</span>
                        <span className={`text-xs px-3 py-1 rounded-full uppercase font-semibold border ${getSeverityStyle(event.severity)}`}>
                          {event.severity}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-slate-100 mb-1">{event.title}</h3>
                      <p className="text-sm text-slate-300 mb-2">{event.description}</p>
                    </div>
                    <span className="text-xs text-slate-400 whitespace-nowrap ml-4">{event.timestamp}</span>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span className="bg-slate-800 px-2 py-1 rounded">{event.source}</span>
                      <span>•</span>
                      <span>{event.details}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Load more */}
        <div className="mt-8 text-center">
          <button className="bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 px-6 py-3 rounded-lg transition-colors">
            Load More Events
          </button>
        </div>
      </div>
    </div>
  );
}
