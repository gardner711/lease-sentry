import { useState } from 'react';
import { FileUpload } from './FileUpload';
import { ContractAnalysis } from './ContractAnalysis';
import { FileText, Home } from 'lucide-react';

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

interface AnalysisToolProps {
  onBackToHome: () => void;
  selectedTier: string | null;
}

export function AnalysisTool({ onBackToHome, selectedTier }: AnalysisToolProps) {
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleFileUpload = async (file: File) => {
    setIsAnalyzing(true);
    
    // Simulate analysis delay
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    // Mock analysis result
    const mockAnalysis: AnalysisResult = {
      fileName: file.name,
      overallScore: 78,
      riskLevel: 'medium',
      categories: [
        {
          name: 'Legal Compliance',
          score: 85,
          issues: [
            'Missing state-specific disclosure requirements',
            'Contingency clause timeline needs clarification'
          ],
          strengths: [
            'Proper identification of all parties',
            'Clear property description and legal boundaries',
            'Valid signatures and dates'
          ]
        },
        {
          name: 'Financial Terms',
          score: 72,
          issues: [
            'Earnest money deposit percentage below market standard',
            'No clear timeline for financing contingency',
            'Missing details on who pays for title insurance'
          ],
          strengths: [
            'Purchase price clearly stated',
            'Closing cost allocation defined'
          ]
        },
        {
          name: 'Property Condition',
          score: 80,
          issues: [
            'Home inspection contingency period is shorter than recommended',
            'As-is clause may limit buyer protections'
          ],
          strengths: [
            'Right to home inspection included',
            'Clear deadline for requesting repairs',
            'Pest inspection provision included'
          ]
        },
        {
          name: 'Contingencies & Deadlines',
          score: 75,
          issues: [
            'Appraisal contingency missing',
            'Some deadlines are too aggressive for current market'
          ],
          strengths: [
            'Financing contingency included',
            'Clear closing date specified',
            'Title review period defined'
          ]
        },
        {
          name: 'Rights & Obligations',
          score: 82,
          issues: [
            'Default remedies could be more specific',
            'Missing force majeure clause'
          ],
          strengths: [
            'Clear assignment rights',
            'Proper disclosure requirements outlined',
            'Mediation clause included for disputes'
          ]
        }
      ],
      recommendations: [
        'Add an appraisal contingency to protect against overpaying if the property doesn\'t appraise at the purchase price',
        'Extend the home inspection period from 7 to 10-14 days to allow adequate time for thorough inspection',
        'Include state-specific disclosure forms as required by local regulations',
        'Clarify the earnest money deposit timeline and conditions for release or forfeiture',
        'Add a force majeure clause to address unforeseen circumstances beyond either party\'s control',
        'Specify which party is responsible for title insurance costs',
        'Consider extending financing contingency deadline to 21-30 days for adequate loan processing time',
        'Review the as-is clause carefully and consider negotiating repair rights for major defects'
      ]
    };
    
    setAnalysis(mockAnalysis);
    setIsAnalyzing(false);
  };

  const handleReset = () => {
    setAnalysis(null);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-slate-900">ContractIQ</h1>
                <p className="text-slate-600 text-sm">Real Estate Contract Analysis Platform</p>
              </div>
            </div>
            <button
              onClick={onBackToHome}
              className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <Home className="w-4 h-4" />
              Back to Home
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {selectedTier && !analysis && !isAnalyzing && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-blue-900 text-sm">
              <strong>Selected Plan: {selectedTier.charAt(0).toUpperCase() + selectedTier.slice(1)}</strong>
              {' '}- This is a demo. In production, you would be redirected to complete your subscription.
            </p>
          </div>
        )}

        {!analysis && !isAnalyzing && (
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-slate-900 mb-3">
                Intelligent Contract Analysis
              </h2>
              <p className="text-slate-600">
                Upload your real estate contract and receive instant analysis with detailed scoring, 
                risk assessment, and actionable recommendations.
              </p>
            </div>
            <FileUpload onFileUpload={handleFileUpload} />
            
            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-slate-900 mb-1">Comprehensive Scoring</h3>
                <p className="text-slate-600 text-sm">
                  Get detailed scores across multiple categories
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-slate-900 mb-1">Risk Assessment</h3>
                <p className="text-slate-600 text-sm">
                  Identify potential issues and vulnerabilities
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-slate-900 mb-1">Smart Recommendations</h3>
                <p className="text-slate-600 text-sm">
                  Receive actionable advice to improve your contract
                </p>
              </div>
            </div>
          </div>
        )}

        {isAnalyzing && (
          <div className="max-w-2xl mx-auto text-center py-20">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-slate-200 border-t-blue-600 mb-6"></div>
            <h3 className="text-slate-900 mb-2">Analyzing Your Contract</h3>
            <p className="text-slate-600">
              Please wait while we review the document and generate your scorecard...
            </p>
          </div>
        )}

        {analysis && !isAnalyzing && (
          <ContractAnalysis analysis={analysis} onReset={handleReset} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-slate-600 text-sm">
            This is a demonstration tool. Always consult with a qualified real estate attorney before signing any contract.
          </p>
        </div>
      </footer>
    </div>
  );
}
