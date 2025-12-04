import { useState } from 'react';
import { ChevronDown, ChevronUp, AlertCircle, CheckCircle2 } from 'lucide-react';

interface Category {
  name: string;
  score: number;
  issues: string[];
  strengths: string[];
}

interface CategoryBreakdownProps {
  categories: Category[];
}

export function CategoryBreakdown({ categories }: CategoryBreakdownProps) {
  const [expandedCategories, setExpandedCategories] = useState<Set<number>>(new Set([0]));

  const toggleCategory = (index: number) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedCategories(newExpanded);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getScoreTextColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
      <h3 className="text-slate-900 mb-6">Category Breakdown</h3>
      
      <div className="space-y-4">
        {categories.map((category, index) => {
          const isExpanded = expandedCategories.has(index);
          
          return (
            <div
              key={index}
              className="border border-slate-200 rounded-lg overflow-hidden"
            >
              {/* Category Header */}
              <button
                onClick={() => toggleCategory(index)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="text-left flex-1">
                    <h4 className="text-slate-900">{category.name}</h4>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex-1 max-w-xs bg-slate-100 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full ${getScoreColor(category.score)}`}
                          style={{ width: `${category.score}%` }}
                        />
                      </div>
                      <span className={`${getScoreTextColor(category.score)}`}>
                        {category.score}/100
                      </span>
                    </div>
                  </div>
                </div>
                {isExpanded ? (
                  <ChevronUp className="w-5 h-5 text-slate-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400" />
                )}
              </button>

              {/* Category Details */}
              {isExpanded && (
                <div className="px-6 pb-6 pt-2 border-t border-slate-200 bg-slate-50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Issues */}
                    {category.issues.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <AlertCircle className="w-4 h-4 text-red-600" />
                          <h5 className="text-slate-900">Issues Found</h5>
                        </div>
                        <ul className="space-y-2">
                          {category.issues.map((issue, issueIndex) => (
                            <li
                              key={issueIndex}
                              className="flex gap-2 text-slate-700 text-sm"
                            >
                              <span className="text-red-500 mt-1">•</span>
                              <span>{issue}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Strengths */}
                    {category.strengths.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                          <h5 className="text-slate-900">Strengths</h5>
                        </div>
                        <ul className="space-y-2">
                          {category.strengths.map((strength, strengthIndex) => (
                            <li
                              key={strengthIndex}
                              className="flex gap-2 text-slate-700 text-sm"
                            >
                              <span className="text-green-500 mt-1">•</span>
                              <span>{strength}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
