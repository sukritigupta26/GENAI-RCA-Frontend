import { Activity, Server, Cpu, HardDrive, Zap, CheckCircle, AlertCircle } from 'lucide-react';

export function Dashboard() {
  const clusters = [
    { name: 'Production Cluster', status: 'healthy', cpu: 45, memory: 62, pods: 48, nodes: 5 },
    { name: 'Staging Cluster', status: 'healthy', cpu: 32, memory: 48, pods: 22, nodes: 3 },
    { name: 'Development Cluster', status: 'warning', cpu: 78, memory: 81, pods: 15, nodes: 2 },
  ];

  const ansibleTowers = [
    { name: 'Tower Primary', status: 'operational', jobs: 18, success: 18, failed: 0 },
    { name: 'Tower DR', status: 'operational', jobs: 12, success: 12, failed: 0 },
  ];

  const jenkinsWorkers = [
    { name: 'Jenkins Master', status: 'online', builds: 24, queue: 0, executors: '8/8' },
    { name: 'Worker Node 1', status: 'online', builds: 18, queue: 0, executors: '4/4' },
    { name: 'Worker Node 2', status: 'online', builds: 15, queue: 0, executors: '4/4' },
    { name: 'Worker Node 3', status: 'online', builds: 12, queue: 0, executors: '4/4' },
    { name: 'Worker Node 4', status: 'online', builds: 8, queue: 0, executors: '2/2' },
  ];

  return (
    <div className="h-full overflow-y-auto bg-slate-950">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-950 border-b border-slate-800 px-8 py-6">
        <h1 className="text-2xl font-bold text-slate-100 mb-2">Dashboard</h1>
        <p className="text-sm text-slate-400">Real-time metrics and system health overview</p>
      </div>

      <div className="p-8">
        {/* System Overview Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Activity className="w-8 h-8 text-cyan-400" />
              <span className="text-xs bg-green-500/10 text-green-400 px-2 py-1 rounded-full">Active</span>
            </div>
            <div className="text-3xl font-bold text-slate-100 mb-1">3</div>
            <div className="text-sm text-slate-400">K8s Clusters</div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Server className="w-8 h-8 text-purple-400" />
              <span className="text-xs bg-green-500/10 text-green-400 px-2 py-1 rounded-full">Online</span>
            </div>
            <div className="text-3xl font-bold text-slate-100 mb-1">2</div>
            <div className="text-sm text-slate-400">Ansible Towers</div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Zap className="w-8 h-8 text-green-400" />
              <span className="text-xs bg-green-500/10 text-green-400 px-2 py-1 rounded-full">5/5</span>
            </div>
            <div className="text-3xl font-bold text-slate-100 mb-1">77</div>
            <div className="text-sm text-slate-400">Total Builds Today</div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <CheckCircle className="w-8 h-8 text-emerald-400" />
              <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-full">99.8%</span>
            </div>
            <div className="text-3xl font-bold text-slate-100 mb-1">Uptime</div>
            <div className="text-sm text-slate-400">Last 30 days</div>
          </div>
        </div>

        {/* Kubernetes Clusters */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-slate-100 mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-cyan-400" />
            Kubernetes Clusters
          </h2>
          <div className="grid grid-cols-3 gap-6">
            {clusters.map((cluster) => (
              <div key={cluster.name} className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-slate-100">{cluster.name}</h3>
                  {cluster.status === 'healthy' ? (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-yellow-400" />
                  )}
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-400">CPU Usage</span>
                      <span className="text-slate-100">{cluster.cpu}%</span>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${cluster.cpu > 70 ? 'bg-yellow-500' : 'bg-cyan-500'}`}
                        style={{ width: `${cluster.cpu}%` }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-400">Memory Usage</span>
                      <span className="text-slate-100">{cluster.memory}%</span>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${cluster.memory > 70 ? 'bg-yellow-500' : 'bg-purple-500'}`}
                        style={{ width: `${cluster.memory}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800 grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-2xl font-bold text-slate-100">{cluster.pods}</div>
                      <div className="text-xs text-slate-400">Pods Running</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-slate-100">{cluster.nodes}</div>
                      <div className="text-xs text-slate-400">Nodes</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ansible Towers */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-slate-100 mb-4 flex items-center gap-2">
            <Server className="w-5 h-5 text-purple-400" />
            Ansible Towers
          </h2>
          <div className="grid grid-cols-2 gap-6">
            {ansibleTowers.map((tower) => (
              <div key={tower.name} className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-slate-100">{tower.name}</h3>
                  <span className="text-xs bg-green-500/10 text-green-400 px-3 py-1 rounded-full uppercase">
                    {tower.status}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <div className="text-2xl font-bold text-slate-100">{tower.jobs}</div>
                    <div className="text-xs text-slate-400">Jobs Today</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-400">{tower.success}</div>
                    <div className="text-xs text-slate-400">Successful</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-red-400">{tower.failed}</div>
                    <div className="text-xs text-slate-400">Failed</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Jenkins Workers */}
        <div>
          <h2 className="text-xl font-bold text-slate-100 mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-green-400" />
            Jenkins Workers
          </h2>
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-800/50">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-300">Worker</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-300">Status</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-300">Builds Today</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-300">Queue</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-300">Executors</th>
                </tr>
              </thead>
              <tbody>
                {jenkinsWorkers.map((worker, index) => (
                  <tr key={worker.name} className={index !== jenkinsWorkers.length - 1 ? 'border-b border-slate-800' : ''}>
                    <td className="px-6 py-4 text-sm text-slate-100">{worker.name}</td>
                    <td className="px-6 py-4">
                      <span className="text-xs bg-green-500/10 text-green-400 px-3 py-1 rounded-full uppercase">
                        {worker.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-100">{worker.builds}</td>
                    <td className="px-6 py-4 text-sm text-slate-100">{worker.queue}</td>
                    <td className="px-6 py-4 text-sm text-slate-100">{worker.executors}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
