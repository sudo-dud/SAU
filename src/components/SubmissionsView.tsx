import React, { useState } from 'react';
import {
  Feather,
  Award,
  Upload,
  FileCheck,
  CheckCircle,
  AlertCircle,
  HelpCircle,
  ChevronDown,
  BookOpen,
  Calendar,
} from 'lucide-react';
import { LITERARY_PRIZES, LiteraryPrize } from '../data/editorialData';

interface SubmissionData {
  id: string;
  title: string;
  genre: string;
  authorName: string;
  email: string;
  affiliation: string;
  status: 'Undergraduate' | 'Postgraduate' | 'Faculty' | 'Independent Scholar';
  abstract: string;
  wordCount: number;
  submittedAt: string;
  referenceCode: string;
}

interface SubmissionsViewProps {
  onAddSubmittedManuscript?: (sub: SubmissionData) => void;
}

export const SubmissionsView: React.FC<SubmissionsViewProps> = ({
  onAddSubmittedManuscript,
}) => {
  // Form fields
  const [authorName, setAuthorName] = useState('');
  const [email, setEmail] = useState('');
  const [affiliation, setAffiliation] = useState('Faculty of English');
  const [academicStatus, setAcademicStatus] = useState<SubmissionData['status']>('Undergraduate');
  const [manuscriptTitle, setManuscriptTitle] = useState('');
  const [genre, setGenre] = useState('Critical Essay');
  const [abstract, setAbstract] = useState('');
  const [manuscriptFile, setManuscriptFile] = useState<string | null>(null);
  const [wordCount, setWordCount] = useState<number>(4500);
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedReceipt, setSubmittedReceipt] = useState<SubmissionData | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!authorName.trim() || !email.trim() || !manuscriptTitle.trim() || !abstract.trim()) {
      setErrorMessage('Please complete all required fields (Author name, institutional email, title, and abstract).');
      return;
    }

    if (!agreeTerms) {
      setErrorMessage('You must certify that the submission represents original, unpublished scholarship.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const code = `MS-2026-ENG-${Math.floor(1000 + Math.random() * 9000)}`;
      const submission: SubmissionData = {
        id: `sub-${Date.now()}`,
        title: manuscriptTitle,
        genre,
        authorName,
        email,
        affiliation,
        status: academicStatus,
        abstract,
        wordCount,
        submittedAt: new Date().toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        }),
        referenceCode: code,
      };

      setSubmittedReceipt(submission);
      if (onAddSubmittedManuscript) {
        onAddSubmittedManuscript(submission);
      }
      setIsSubmitting(false);
    }, 700);
  };

  const handleReset = () => {
    setManuscriptTitle('');
    setAbstract('');
    setManuscriptFile(null);
    setAgreeTerms(false);
    setSubmittedReceipt(null);
  };

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8 space-y-12 pb-24">
      {/* Call for Papers Header Banner */}
      <section className="bg-[#FFFFFF] border border-[#CBD5E1] rounded p-6 sm:p-10 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E2E8F0] pb-3 text-xs">
          <span className="font-bold tracking-[0.12em] text-[#D69E2E] uppercase">
            Call for Papers · Volume XV (Michaelmas 2027)
          </span>
          <span className="text-[#7D5700] font-semibold flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            <span>Submission Deadline: December 1, 2026</span>
          </span>
        </div>

        <div className="max-w-3xl space-y-3">
          <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-[#002045]">
            Call for Papers: "Palimpsests, Erased Texts, and Digital Scarcity"
          </h1>
          <p className="text-sm sm:text-base text-[#43474E] leading-relaxed">
            The editorial board welcomes submissions exploring textual erasure, marginalia, manuscript recovery, and the tension between physical parchment and algorithmic ephemerality. All submissions undergo double-blind peer review by faculty fellows and senior student editors.
          </p>
        </div>
      </section>

      {/* 2-COLUMN SPLIT: SUBMISSION DESK VS GUIDELINES & PRIZES */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column (7 cols): Interactive Manuscript Submission Form */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-[#FFFFFF] border border-[#E2E8F0] rounded p-6 sm:p-8 shadow-xs">
            <div className="border-b border-[#E2E8F0] pb-4 mb-6">
              <div className="flex items-center gap-2 text-[#1A365D]">
                <Feather className="w-5 h-5 text-[#D69E2E]" />
                <h2 className="font-editorial text-2xl font-bold text-[#002045]">
                  Academic Submission Portal
                </h2>
              </div>
              <p className="text-xs text-[#74777F] mt-1">
                Submissions are anonymized prior to editorial committee circulation.
              </p>
            </div>

            {submittedReceipt ? (
              /* SUBMISSION RECEIPT CONFIRMATION VIEW */
              <div className="space-y-6 py-4 animate-in fade-in duration-300">
                <div className="p-6 bg-[#FEFCF6] border-2 border-[#D69E2E]/60 rounded space-y-4">
                  <div className="flex items-center gap-3 text-emerald-700">
                    <CheckCircle className="w-6 h-6 text-emerald-600 shrink-0" />
                    <div>
                      <h3 className="font-editorial text-xl font-bold text-[#002045]">
                        Manuscript Docket Issued
                      </h3>
                      <p className="text-xs text-[#7D5700]">
                        Assigned Reference: <span className="font-mono font-bold">{submittedReceipt.referenceCode}</span>
                      </p>
                    </div>
                  </div>

                  <div className="divide-y divide-[#E2E8F0] text-xs space-y-2 pt-2">
                    <div className="pt-2 flex justify-between">
                      <span className="text-[#74777F]">Manuscript Title:</span>
                      <span className="font-bold text-[#002045] text-right max-w-xs">{submittedReceipt.title}</span>
                    </div>
                    <div className="pt-2 flex justify-between">
                      <span className="text-[#74777F]">Author & Status:</span>
                      <span>{submittedReceipt.authorName} ({submittedReceipt.status})</span>
                    </div>
                    <div className="pt-2 flex justify-between">
                      <span className="text-[#74777F]">Classification:</span>
                      <span className="font-semibold text-[#1A365D]">{submittedReceipt.genre}</span>
                    </div>
                    <div className="pt-2 flex justify-between">
                      <span className="text-[#74777F]">Date Logged:</span>
                      <span className="font-mono">{submittedReceipt.submittedAt}</span>
                    </div>
                    <div className="pt-2 flex justify-between">
                      <span className="text-[#74777F]">Editorial Status:</span>
                      <span className="text-[#D69E2E] font-bold">Stage 1: Anonymized Editorial Review</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 pt-2">
                  <button
                    onClick={() => {
                      alert(`Official Docket Print Summary for ${submittedReceipt.referenceCode} sent to ${submittedReceipt.email}`);
                    }}
                    className="py-2 px-4 border border-[#CBD5E1] text-xs font-semibold rounded hover:bg-[#F1F3FF] cursor-pointer"
                  >
                    Print Docket Summary
                  </button>

                  <button
                    onClick={handleReset}
                    className="py-2 px-4 bg-[#1A365D] text-white text-xs font-semibold rounded hover:bg-[#2B6CB0] cursor-pointer"
                  >
                    Submit Another Manuscript
                  </button>
                </div>
              </div>
            ) : (
              /* ACTIVE SUBMISSION FORM */
              <form onSubmit={handleSubmit} className="space-y-5">
                {errorMessage && (
                  <div className="p-3 bg-red-50 border border-red-200 text-xs text-red-700 rounded flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Author Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-[#161C27]">
                      Author Full Name <span className="text-[#D69E2E]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      placeholder="e.g., Jonathan Sterling"
                      className="w-full px-3 py-2 text-xs bg-[#FFFFFF] border border-[#CBD5E1] rounded focus:border-[#1A365D] focus:ring-2 focus:ring-[#D69E2E]/20 focus:outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-[#161C27]">
                      Institutional Email <span className="text-[#D69E2E]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="scholar@university.edu"
                      className="w-full px-3 py-2 text-xs bg-[#FFFFFF] border border-[#CBD5E1] rounded focus:border-[#1A365D] focus:ring-2 focus:ring-[#D69E2E]/20 focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-[#161C27]">
                      College or Faculty Affiliation
                    </label>
                    <input
                      type="text"
                      value={affiliation}
                      onChange={(e) => setAffiliation(e.target.value)}
                      placeholder="e.g. Balliol College, Faculty of English"
                      className="w-full px-3 py-2 text-xs bg-[#FFFFFF] border border-[#CBD5E1] rounded focus:border-[#1A365D] focus:ring-2 focus:ring-[#D69E2E]/20 focus:outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-[#161C27]">
                      Academic Standing
                    </label>
                    <select
                      value={academicStatus}
                      onChange={(e) => setAcademicStatus(e.target.value as any)}
                      className="w-full px-3 py-2 text-xs bg-[#FFFFFF] border border-[#CBD5E1] rounded focus:border-[#1A365D] focus:ring-2 focus:ring-[#D69E2E]/20 focus:outline-none transition-all cursor-pointer"
                    >
                      <option value="Undergraduate">Undergraduate Student</option>
                      <option value="Postgraduate">Master's / DPhil Candidate</option>
                      <option value="Faculty">Faculty Fellow / Postdoc</option>
                      <option value="Independent Scholar">Independent Scholar</option>
                    </select>
                  </div>
                </div>

                {/* Manuscript Info */}
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-[#161C27]">
                    Manuscript Title <span className="text-[#D69E2E]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={manuscriptTitle}
                    onChange={(e) => setManuscriptTitle(e.target.value)}
                    placeholder="e.g. Subversive Prosody in Early Modern Sonnet Sequences"
                    className="w-full px-3 py-2 text-xs bg-[#FFFFFF] border border-[#CBD5E1] rounded focus:border-[#1A365D] focus:ring-2 focus:ring-[#D69E2E]/20 focus:outline-none transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-[#161C27]">
                      Genre Classification
                    </label>
                    <select
                      value={genre}
                      onChange={(e) => setGenre(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-[#FFFFFF] border border-[#CBD5E1] rounded focus:border-[#1A365D] focus:ring-2 focus:ring-[#D69E2E]/20 focus:outline-none transition-all cursor-pointer"
                    >
                      <option value="Critical Essay">Critical Monograph (4,000–8,000 words)</option>
                      <option value="Poetry">Poetic Suite (Up to 150 lines)</option>
                      <option value="Faculty Research">Textual Recovery / Paleography</option>
                      <option value="Translations">Annotated Verse Translation</option>
                      <option value="Department News">Department Review / Colloquium Dispatch</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-[#161C27]">
                      Estimated Word / Line Count
                    </label>
                    <input
                      type="number"
                      value={wordCount}
                      onChange={(e) => setWordCount(Number(e.target.value))}
                      className="w-full px-3 py-2 text-xs bg-[#FFFFFF] border border-[#CBD5E1] rounded focus:border-[#1A365D] focus:ring-2 focus:ring-[#D69E2E]/20 focus:outline-none transition-all font-mono"
                    />
                  </div>
                </div>

                {/* Abstract Textarea */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-semibold text-[#161C27]">
                      Scholarly Abstract (150–250 words) <span className="text-[#D69E2E]">*</span>
                    </label>
                    <span className="text-[10px] text-[#74777F] font-mono">
                      {abstract.length} characters
                    </span>
                  </div>
                  <textarea
                    rows={4}
                    required
                    value={abstract}
                    onChange={(e) => setAbstract(e.target.value)}
                    placeholder="Provide a concise summary articulating your central thesis, archival evidence, methodology, and intervention in contemporary scholarship..."
                    className="w-full px-3 py-2 text-xs bg-[#FFFFFF] border border-[#CBD5E1] rounded focus:border-[#1A365D] focus:ring-2 focus:ring-[#D69E2E]/20 focus:outline-none transition-all"
                  ></textarea>
                </div>

                {/* Simulated Document Upload Box */}
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-[#161C27]">
                    Anonymized Manuscript (PDF or Word DOCX)
                  </label>
                  <div
                    onClick={() => {
                      setManuscriptFile('Sterling_Monograph_Anonymized_Final.pdf');
                    }}
                    className="border-2 border-dashed border-[#CBD5E1] hover:border-[#1A365D] rounded p-5 text-center cursor-pointer bg-[#F1F3FF]/40 transition-colors"
                  >
                    <Upload className="w-6 h-6 text-[#1A365D] mx-auto mb-2 opacity-70" />
                    {manuscriptFile ? (
                      <div className="flex items-center justify-center gap-2 text-xs font-semibold text-emerald-800">
                        <FileCheck className="w-4 h-4 text-emerald-600" />
                        <span>Attached: {manuscriptFile} (412 KB)</span>
                      </div>
                    ) : (
                      <div>
                        <div className="text-xs font-medium text-[#1A365D]">
                          Click to attach draft manuscript
                        </div>
                        <div className="text-[10px] text-[#74777F]">
                          Ensure author names are stripped from header and running heads.
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Integrity Agreement Checkbox with 1px border in #1A365D */}
                <div className="pt-2">
                  <label className="flex items-start gap-2.5 text-xs text-[#43474E] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      className="mt-0.5 rounded border border-[#1A365D] text-[#1A365D] focus:ring-0 cursor-pointer w-4 h-4"
                    />
                    <span>
                      I certify that this manuscript is my original scholarly work, has not been published elsewhere, complies with Departmental ethical guidelines, and is free of unacknowledged algorithmic synthesis.
                    </span>
                  </label>
                </div>

                {/* Submit Action (Accent Button with #1A365D text) */}
                <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-between">
                  <div className="text-[11px] text-[#74777F]">
                    Double-blind peer review turn-around: ~4 weeks
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2.5 bg-[#1A365D] hover:bg-[#2B6CB0] text-white text-xs font-semibold rounded transition-colors cursor-pointer shadow-sm disabled:opacity-50"
                  >
                    {isSubmitting ? 'Verifying Docket...' : 'Transmit for Peer Review'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Right Column (5 cols): Peer Review Rubric & Endowment Prizes */}
        <div className="lg:col-span-5 space-y-6">
          {/* Peer Review Rubric */}
          <div className="bg-[#FFFFFF] border border-[#E2E8F0] rounded p-6 space-y-4 shadow-xs">
            <div className="flex items-center gap-2 border-b border-[#E2E8F0] pb-3 text-xs">
              <span className="font-bold tracking-wider text-[#D69E2E] uppercase">
                Departmental Guidelines
              </span>
              <span className="text-[#C4C6CF]">·</span>
              <span className="text-[#74777F]">Evaluation Rubric</span>
            </div>

            <h3 className="font-editorial text-lg font-bold text-[#002045]">
              Double-Blind Review Criteria
            </h3>

            <div className="space-y-3 text-xs text-[#43474E]">
              <div className="p-3 bg-[#F1F3FF] rounded border border-[#E2E8F0] space-y-1">
                <span className="font-bold text-[#1A365D]">1. Archival & Bibliographic Rigor:</span>
                <p>Primary sources must cite verified folio editions, standard Oxford World's Classics, or recognized archival repositories.</p>
              </div>

              <div className="p-3 bg-[#F1F3FF] rounded border border-[#E2E8F0] space-y-1">
                <span className="font-bold text-[#1A365D]">2. Originality of Intervention:</span>
                <p>The argument must move beyond recapitulation of existing secondary literature to offer an original hermeneutic or philological insight.</p>
              </div>

              <div className="p-3 bg-[#F1F3FF] rounded border border-[#E2E8F0] space-y-1">
                <span className="font-bold text-[#1A365D]">3. Prose Pacing & Cadence:</span>
                <p>In accordance with broadside tradition, prose should exhibit precision, elegance, and clarity, avoiding jargon-laden obfuscation.</p>
              </div>
            </div>
          </div>

          {/* Endowment Prizes & Laureates */}
          <div className="bg-[#FEFCF6] border border-[#D69E2E]/40 rounded p-6 space-y-4 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-bold text-[#7D5700] uppercase tracking-wider">
              <Award className="w-4 h-4 text-[#D69E2E]" />
              <span>Faculty Endowment Prizes</span>
            </div>

            <div className="space-y-4">
              {LITERARY_PRIZES.map((prize) => (
                <div key={prize.id} className="border-b border-[#D69E2E]/20 pb-4 last:border-b-0 space-y-1.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-[#002045] font-editorial text-sm">
                      {prize.name}
                    </span>
                    <span className="text-[#7D5700] font-mono font-semibold">
                      {prize.endowment}
                    </span>
                  </div>

                  <p className="text-xs text-[#43474E] leading-relaxed">
                    {prize.description}
                  </p>

                  <div className="text-[11px] text-[#74777F] pt-1">
                    <em>Recent Laureate:</em> {prize.recentWinner.recipient} ({prize.recentWinner.year}) for <em>"{prize.recentWinner.workTitle}"</em>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
