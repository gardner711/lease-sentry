import { ScoreCard } from './ScoreCard';
import { CategoryBreakdown } from './CategoryBreakdown';
import { Recommendations } from './Recommendations';
import { RotateCcw, Download } from 'lucide-react';

interface AnalysisResult {
  fileName: string;
  overallScore: number;
  categories: {
    name: string;
    score: number;
    issues: string[];
    strengths: string[];
  }[];
  recommendations: string[];
  riskLevel: 'low' | 'medium' | 'high';
}

interface ContractAnalysisProps {
  analysis: AnalysisResult;
  onReset: () => void;
}

export function ContractAnalysis({ analysis, onReset }: ContractAnalysisProps) {
  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-slate-900">Analysis Results</h2>
          <p className="text-slate-600 mt-1">{analysis.fileName}</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onReset}
            className="flex items-center gap-2 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Analyze New Contract
          </button>
          <button
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* Overall Score Card */}
      <ScoreCard 
        score={analysis.overallScore} 
        riskLevel={analysis.riskLevel}
      />

      {/* Category Breakdown */}
      <CategoryBreakdown categories={analysis.categories} />

      {/* Recommendations */}
      <Recommendations recommendations={analysis.recommendations} />
    </div>
  );
}
