import { AlertTriangle, CheckCircle, AlertCircle } from 'lucide-react';

interface ScoreCardProps {
  score: number;
  riskLevel: 'low' | 'medium' | 'high';
}

export function ScoreCard({ score, riskLevel }: ScoreCardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBackground = (score: number) => {
    if (score >= 80) return 'bg-green-50 border-green-200';
    if (score >= 60) return 'bg-yellow-50 border-yellow-200';
    return 'bg-red-50 border-red-200';
  };

  const getRiskConfig = (level: 'low' | 'medium' | 'high') => {
    switch (level) {
      case 'low':
        return {
          icon: CheckCircle,
          color: 'text-green-600',
          bg: 'bg-green-100',
          label: 'Low Risk',
          description: 'This contract appears to have strong protections and clear terms.'
        };
      case 'medium':
        return {
          icon: AlertCircle,
          color: 'text-yellow-600',
          bg: 'bg-yellow-100',
          label: 'Medium Risk',
          description: 'Some areas need attention. Review recommendations carefully.'
        };
      case 'high':
        return {
          icon: AlertTriangle,
          color: 'text-red-600',
          bg: 'bg-red-100',
          label: 'High Risk',
          description: 'Critical issues identified. Consult with an attorney before proceeding.'
        };
    }
  };

  const riskConfig = getRiskConfig(riskLevel);
  const RiskIcon = riskConfig.icon;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Overall Score */}
        <div className="text-center">
          <p className="text-slate-600 mb-4">Overall Contract Score</p>
          <div className={`inline-flex items-center justify-center w-40 h-40 rounded-full border-8 ${getScoreBackground(score)}`}>
            <div>
              <div className={`${getScoreColor(score)}`}>
                {score}
              </div>
              <p className="text-slate-600 text-sm">out of 100</p>
            </div>
          </div>
          <div className="mt-6">
            <div className="bg-slate-100 rounded-full h-3 overflow-hidden">
              <div 
                className={`h-full transition-all duration-1000 ${
                  score >= 80 ? 'bg-green-600' : score >= 60 ? 'bg-yellow-600' : 'bg-red-600'
                }`}
                style={{ width: `${score}%` }}
              />
            </div>
          </div>
        </div>

        {/* Risk Level */}
        <div className="flex flex-col justify-center">
          <div className="flex items-start gap-4">
            <div className={`p-3 ${riskConfig.bg} rounded-lg`}>
              <RiskIcon className={`w-8 h-8 ${riskConfig.color}`} />
            </div>
            <div className="flex-1">
              <p className="text-slate-600 text-sm mb-1">Risk Assessment</p>
              <h3 className={`${riskConfig.color} mb-2`}>
                {riskConfig.label}
              </h3>
              <p className="text-slate-600">
                {riskConfig.description}
              </p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-200">
            <div className="text-center">
              <div className="text-slate-900">5</div>
              <p className="text-slate-600 text-sm">Categories</p>
            </div>
            <div className="text-center">
              <div className="text-slate-900">11</div>
              <p className="text-slate-600 text-sm">Issues Found</p>
            </div>
            <div className="text-center">
              <div className="text-slate-900">14</div>
              <p className="text-slate-600 text-sm">Strengths</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
