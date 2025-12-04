import { Lightbulb, Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface RecommendationsProps {
  recommendations: string[];
}

export function Recommendations({ recommendations }: RecommendationsProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-purple-100 rounded-lg">
          <Lightbulb className="w-5 h-5 text-purple-600" />
        </div>
        <div>
          <h3 className="text-slate-900">Recommendations</h3>
          <p className="text-slate-600 text-sm">
            Actionable steps to improve your contract
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {recommendations.map((recommendation, index) => (
          <div
            key={index}
            className="flex gap-4 p-4 bg-slate-50 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors group"
          >
            <div className="flex-shrink-0 w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center">
              {index + 1}
            </div>
            <div className="flex-1">
              <p className="text-slate-700">{recommendation}</p>
            </div>
            <button
              onClick={() => handleCopy(recommendation, index)}
              className="flex-shrink-0 p-2 hover:bg-white rounded-lg transition-colors opacity-0 group-hover:opacity-100"
              title="Copy to clipboard"
            >
              {copiedIndex === index ? (
                <Check className="w-4 h-4 text-green-600" />
              ) : (
                <Copy className="w-4 h-4 text-slate-400" />
              )}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-blue-900 text-sm">
          <strong>Important:</strong> These recommendations are generated based on common contract patterns 
          and should not replace professional legal advice. Always consult with a qualified real estate 
          attorney before making decisions about your contract.
        </p>
      </div>
    </div>
  );
}
