import { AlertTriangle, CheckCircle, Clock, ArrowRight } from 'lucide-react';

export function PreviousIncidents() {
  const incidents = [
    {
      id: 'INC-2024-042',
      title: 'Elevated API Response Time',
      severity: 'high',
      status: 'resolved',
      timestamp: '2026-04-02 14:23',
      duration: '47 minutes',
      rootCause: 'Database connection pool exhaustion',
      resolution: 'Scaled connection pool from 50 to 150 connections',
      affectedServices: ['prod-api', 'prod-auth'],
      resolvedBy: 'Auto-remediation + SRE Team',
    },
    {
      id: 'INC-2024-041',
      title: 'Memory Spike in Staging Environment',
      severity: 'medium',
      status: 'resolved',
      timestamp: '2026-04-02 08:15',
      duration: '23 minutes',
      rootCause: 'Memory leak in cache service v2.3.1',
      resolution: 'Service restarted, rolled back to v2.3.0',
      affectedServices: ['staging-cache', 'staging-api'],
      resolvedBy: 'RCS Bot + DevOps Team',
    },
    {
      id: 'INC-2024-040',
      title: 'Jenkins Pipeline Timeout',
      severity: 'low',
      status: 'resolved',
      timestamp: '2026-04-01 16:42',
      duration: '12 minutes',
      rootCause: 'Worker node network connectivity issue',
      resolution: 'Restarted affected worker node',
      affectedServices: ['jenkins-worker-03'],
      resolvedBy: 'RCS Bot',
    },
    {
      id: 'INC-2024-039',
      title: 'Pod CrashLoopBackOff in Production',
      severity: 'high',
      status: 'resolved',
      timestamp: '2026-04-01 11:08',
      duration: '1 hour 15 minutes',
      rootCause: 'Configuration error in deployment manifest',
      resolution: 'Updated configmap and redeployed',
      affectedServices: ['prod-payment-service'],
      resolvedBy: 'SRE Team',
    },
    {
      id: 'INC-2024-038',
      title: 'Ansible Playbook Execution Failed',
      severity: 'medium',
      status: 'resolved',
      timestamp: '2026-03-31 22:30',
      duration: '35 minutes',
      rootCause: 'SSH key authentication expired',
      resolution: 'Rotated SSH keys and re-executed playbook',
      affectedServices: ['ansible-tower-primary'],
      resolvedBy: 'RCA Bot',
    },
    {
      id: 'INC-2024-037',
      title: 'High CPU Usage on Dev Cluster',
      severity: 'low',
      status: 'resolved',
      timestamp: '2026-03-31 15:20',
      duration: '28 minutes',
      rootCause: 'Resource-intensive test suite running',
      resolution: 'Test job completed normally',
      affectedServices: ['dev-cluster-node-02'],
      resolvedBy: 'Auto-resolved',
    },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'text-red-400 bg-red-500/10 border-red-500/30';
      case 'medium':
        return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30';
      case 'low':
        return 'text-blue-400 bg-blue-500/10 border-blue-500/30';
      default:
        return 'text-slate-400 bg-slate-500/10 border-slate-500/30';
    }
  };

  return (
    <div className="h-full overflow-y-auto bg-slate-950">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-950 border-b border-slate-800 px-4 lg:px-8 py-4 lg:py-6">
        <h1 className="text-xl lg:text-2xl font-bold text-slate-100 mb-2">Previous Incidents</h1>
        <p className="text-xs lg:text-sm text-slate-400">Historical incident records and resolutions</p>
      </div>

      <div className="p-4 lg:p-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6 mb-6 lg:mb-8">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 lg:p-6">
            <div className="text-2xl lg:text-3xl font-bold text-slate-100 mb-1">6</div>
            <div className="text-xs lg:text-sm text-slate-400">Total Incidents (7 days)</div>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 lg:p-6">
            <div className="text-2xl lg:text-3xl font-bold text-green-400 mb-1">6</div>
            <div className="text-xs lg:text-sm text-slate-400">Resolved</div>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 lg:p-6">
            <div className="text-2xl lg:text-3xl font-bold text-slate-100 mb-1">42m</div>
            <div className="text-xs lg:text-sm text-slate-400">Avg Resolution Time</div>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 lg:p-6">
            <div className="text-2xl lg:text-3xl font-bold text-purple-400 mb-1">50%</div>
            <div className="text-xs lg:text-sm text-slate-400">Auto-remediated</div>
          </div>
        </div>

        {/* Incidents List */}
        <div className="space-y-3 lg:space-y-4">
          {incidents.map((incident) => (
            <div
              key={incident.id}
              className="bg-slate-900 border border-slate-800 rounded-xl p-4 lg:p-6 hover:border-slate-700 transition-colors"
            >
              <div className="flex items-start justify-between mb-3 lg:mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 lg:gap-3 mb-2 flex-wrap">
                    <span className="text-xs font-mono text-slate-400">{incident.id}</span>
                    <span className={`text-xs px-2 lg:px-3 py-1 rounded-full uppercase font-semibold border ${getSeverityColor(incident.severity)}`}>
                      {incident.severity}
                    </span>
                    <div className="flex items-center gap-1 text-green-400">
                      <CheckCircle className="w-3 h-3 lg:w-4 lg:h-4" />
                      <span className="text-xs uppercase font-semibold">{incident.status}</span>
                    </div>
                  </div>
                  <h3 className="text-base lg:text-lg font-semibold text-slate-100 mb-2">{incident.title}</h3>
                  <div className="flex items-center gap-2 lg:gap-4 text-xs lg:text-sm text-slate-400 flex-wrap">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 lg:w-4 lg:h-4" />
                      <span>{incident.timestamp}</span>
                    </div>
                    <span className="hidden lg:inline">•</span>
                    <span>Duration: {incident.duration}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 bg-slate-950 rounded-lg p-3 lg:p-4 mb-3 lg:mb-4">
                <div>
                  <div className="text-xs text-slate-400 mb-1">Root Cause</div>
                  <div className="text-xs lg:text-sm text-slate-100">{incident.rootCause}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-400 mb-1">Resolution</div>
                  <div className="text-xs lg:text-sm text-slate-100">{incident.resolution}</div>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs text-slate-400">Affected:</span>
                  {incident.affectedServices.map((service) => (
                    <span
                      key={service}
                      className="text-xs bg-slate-800 text-slate-300 px-2 py-1 rounded"
                    >
                      {service}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-2 text-xs lg:text-sm text-slate-400">
                  <span>Resolved by: {incident.resolvedBy}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}