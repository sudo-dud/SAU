import React, { useState } from 'react';
import {
  Users,
  Calendar,
  Clock,
  MapPin,
  Ticket,
  Search,
  Filter,
  CheckCircle2,
  Sparkles,
  Award,
  ChevronRight,
  Info,
  BookOpen,
} from 'lucide-react';
import { Society, SocietyEvent, SOCIETIES, SOCIETY_EVENTS } from '../data/editorialData';

interface StudentActivitiesViewProps {
  onOpenEventPass: (event: SocietyEvent) => void;
}

export const StudentActivitiesView: React.FC<StudentActivitiesViewProps> = ({
  onOpenEventPass,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSocietyModal, setSelectedSocietyModal] = useState<Society | null>(null);
  const [joinedSocieties, setJoinedSocieties] = useState<string[]>([]);
  const [joinSuccessMsg, setJoinSuccessMsg] = useState<string | null>(null);

  const categories = ['All', 'Workshop', 'Debate', 'Performance', 'Colloquium', 'Reading'];

  const filteredEvents = SOCIETY_EVENTS.filter((evt) => {
    const matchesCat = selectedCategory === 'All' || evt.category === selectedCategory;
    const matchesSearch =
      evt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.society.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.host.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleJoinSociety = (soc: Society) => {
    if (!joinedSocieties.includes(soc.id)) {
      setJoinedSocieties([...joinedSocieties, soc.id]);
      setJoinSuccessMsg(`You have joined ${soc.name}. Michaelmas term updates sent to your university pigeonhole.`);
      setTimeout(() => setJoinSuccessMsg(null), 4000);
    }
  };

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8 space-y-12 pb-20">
      {/* Student Activities Unit Masthead */}
      <section className="bg-[#FFFFFF] border border-[#E2E8F0] rounded p-6 sm:p-10 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E2E8F0] pb-3 text-xs">
          <span className="font-bold tracking-[0.12em] text-[#D69E2E] uppercase">
            Collegiate Student Life & Co-Curricular Inquiry
          </span>
          <span className="text-[#74777F]">Michaelmas 2026 Term Program</span>
        </div>

        <div className="max-w-3xl space-y-3">
          <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-[#002045]">
            Student Activities Unit & Literary Societies
          </h1>
          <p className="text-sm sm:text-base text-[#43474E] leading-relaxed">
            The Student Activities Unit serves as the coordinating hearth for student-led intellectual societies, forensic debate unions, dramatic staging collectives, and creative writing workshops within the Faculty of English.
          </p>
        </div>

        {joinSuccessMsg && (
          <div className="p-3 bg-[#FEFCF6] border border-[#D69E2E] text-xs text-[#7D5700] rounded flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#D69E2E]" />
            <span>{joinSuccessMsg}</span>
          </div>
        )}
      </section>

      {/* RECOGNIZED STUDENT SOCIETIES DIRECTORY */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-[#CBD5E1] pb-2">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-[#1A365D]" />
            <h2 className="font-editorial text-2xl font-bold text-[#002045]">
              Chartered Collegiate Societies
            </h2>
          </div>
          <span className="text-xs text-[#74777F]">5 Active Guilds</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SOCIETIES.map((society) => {
            const isMember = joinedSocieties.includes(society.id);
            return (
              <div
                key={society.id}
                className="bg-[#FFFFFF] border border-[#E2E8F0] rounded p-5 flex flex-col justify-between hover:border-[#CBD5E1] transition-all shadow-sm space-y-4 group"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-bold tracking-wider text-[#7D5700] uppercase">
                    <span>Est. {society.founded}</span>
                    <span className="bg-[#F1F3FF] text-[#1A365D] px-2 py-0.5 rounded">
                      {society.category}
                    </span>
                  </div>

                  <h3 className="font-editorial text-lg font-bold text-[#002045] group-hover:text-[#1A365D] transition-colors">
                    {society.name}
                  </h3>

                  <p className="text-xs italic font-serif text-[#2B6CB0]">
                    "{society.tagline}"
                  </p>

                  <p className="text-xs text-[#43474E] line-clamp-3 leading-relaxed">
                    {society.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E2E8F0] space-y-2 text-xs text-[#74777F]">
                  <div className="flex items-center justify-between">
                    <span>President:</span>
                    <span className="font-medium text-[#161C27]">{society.president}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Meetings:</span>
                    <span className="font-medium text-[#161C27] text-right truncate max-w-[180px]">
                      {society.meetingSchedule}
                    </span>
                  </div>

                  <div className="pt-2 flex items-center gap-2">
                    <button
                      onClick={() => setSelectedSocietyModal(society)}
                      className="flex-1 py-1.5 px-2 text-xs font-semibold text-[#1A365D] border border-[#CBD5E1] hover:bg-[#F1F3FF] rounded transition-colors cursor-pointer text-center"
                    >
                      Constitution
                    </button>

                    <button
                      onClick={() => handleJoinSociety(society)}
                      disabled={isMember}
                      className={`flex-1 py-1.5 px-2 text-xs font-semibold rounded transition-colors cursor-pointer text-center ${
                        isMember
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                          : 'bg-[#1A365D] hover:bg-[#2B6CB0] text-white'
                      }`}
                    >
                      {isMember ? 'Enrolled' : 'Join Society'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* UPCOMING COLLOQUIUMS & WORKSHOPS SCHEDULE */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#CBD5E1] pb-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#1A365D]" />
            <h2 className="font-editorial text-2xl font-bold text-[#002045]">
              Colloquiums, Masterclasses & Debates
            </h2>
          </div>

          {/* Search & Filter */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-[#74777F] absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search event, host, or guild..."
                className="pl-8 pr-3 py-1.5 text-xs bg-[#FFFFFF] border border-[#CBD5E1] rounded focus:outline-none focus:border-[#1A365D] w-[200px]"
              />
            </div>

            {/* Filter buttons */}
            <div className="flex items-center gap-1 bg-[#F1F3FF] p-1 rounded">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded cursor-pointer transition-colors ${
                    selectedCategory === cat
                      ? 'bg-white text-[#002045] shadow-xs'
                      : 'text-[#43474E] hover:text-[#002045]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Event List */}
        <div className="space-y-4">
          {filteredEvents.length === 0 ? (
            <div className="p-8 text-center bg-white border border-[#E2E8F0] rounded text-sm text-[#74777F]">
              No activities found matching your criteria. Try resetting the category filter.
            </div>
          ) : (
            filteredEvents.map((evt) => {
              const remaining = evt.capacity - evt.registeredCount;
              return (
                <div
                  key={evt.id}
                  className="bg-[#FFFFFF] border border-[#E2E8F0] rounded p-6 hover:border-[#CBD5E1] transition-all shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-3 text-xs">
                      <span className="font-bold tracking-wider text-[#D69E2E] uppercase text-[10px]">
                        {evt.category}
                      </span>
                      <span className="text-[#C4C6CF]">·</span>
                      <span className="font-semibold text-[#1A365D]">{evt.society}</span>
                      <span className="text-[#C4C6CF]">·</span>
                      <span className="text-[#74777F]">{evt.date}</span>
                    </div>

                    <h3 className="font-editorial text-xl font-bold text-[#002045]">
                      {evt.title}
                    </h3>

                    <p className="text-xs text-[#43474E] leading-relaxed max-w-2xl">
                      {evt.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-[#74777F] pt-1">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#7D5700]" />
                        <span>{evt.time}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#1A365D]" />
                        <span>{evt.location}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-[#74777F]" />
                        <span>Host: {evt.host}</span>
                      </span>
                    </div>

                    {evt.prerequisites && (
                      <div className="text-[11px] font-serif italic text-[#7D5700]">
                        Prerequisite: {evt.prerequisites}
                      </div>
                    )}
                  </div>

                  {/* Booking / Pass action */}
                  <div className="w-full md:w-auto shrink-0 flex flex-col items-end gap-2 border-t md:border-t-0 pt-4 md:pt-0 border-[#E2E8F0]">
                    <div className="text-right text-xs">
                      <div className="text-[11px] text-[#74777F]">
                        Capacity: <span className="font-mono font-bold text-[#161C27]">{evt.registeredCount}/{evt.capacity}</span>
                      </div>
                      <div className="text-[10px] text-emerald-700 font-medium">
                        {remaining} places remaining
                      </div>
                    </div>

                    <button
                      onClick={() => onOpenEventPass(evt)}
                      className="w-full md:w-auto px-5 py-2.5 bg-[#1A365D] hover:bg-[#2B6CB0] text-white text-xs font-semibold rounded transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                    >
                      <Ticket className="w-3.5 h-3.5 text-[#D69E2E]" />
                      <span>Issue Attendance Slip</span>
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>

      {/* SOCIETY CONSTITUTION MODAL */}
      {selectedSocietyModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FFFFFF] border border-[#CBD5E1] rounded max-w-lg w-full p-6 space-y-4 shadow-xl">
            <div className="flex items-start justify-between border-b border-[#E2E8F0] pb-3">
              <div>
                <span className="text-[10px] font-bold tracking-wider text-[#D69E2E] uppercase">
                  Faculty Society Charter
                </span>
                <h3 className="font-editorial text-xl font-bold text-[#002045]">
                  {selectedSocietyModal.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedSocietyModal(null)}
                className="text-[#74777F] hover:text-[#161C27] text-lg font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-[#43474E] leading-relaxed">
              <p>
                <strong>Established:</strong> {selectedSocietyModal.founded} by presidential mandate of the Faculty of English.
              </p>
              <p>
                <strong>Faculty Advisor:</strong> {selectedSocietyModal.facultyAdvisor}
              </p>
              <p>
                <strong>Meeting Protocol:</strong> {selectedSocietyModal.meetingSchedule}
              </p>
              <div className="p-3 bg-[#FEFCF6] border border-[#D69E2E]/30 rounded">
                <strong className="block text-[#1A365D] mb-1">Preamble & Standing Orders:</strong>
                "Members shall uphold collegiate decorum, submit critical contributions with rigorous citation, and respect freedom of academic dialectic in accordance with Department statutes."
              </div>
            </div>

            <div className="pt-3 border-t border-[#E2E8F0] flex justify-end">
              <button
                onClick={() => setSelectedSocietyModal(null)}
                className="px-4 py-2 text-xs font-semibold bg-[#1A365D] text-white rounded cursor-pointer hover:bg-[#2B6CB0]"
              >
                Dismiss Charter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
