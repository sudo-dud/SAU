import React, { useState } from 'react';
import { SocietyEvent } from '../data/editorialData';
import { Ticket, CheckCircle2, Download, Printer, X, MapPin, Calendar, Clock, UserCheck } from 'lucide-react';

interface ActivityPassModalProps {
  event: SocietyEvent | null;
  onClose: () => void;
}

export const ActivityPassModal: React.FC<ActivityPassModalProps> = ({ event, onClose }) => {
  const [studentName, setStudentName] = useState('Arthur Pendelton');
  const [college, setCollege] = useState('Christ Church');
  const [studentId, setStudentId] = useState('OX-2024-ENG-841');
  const [isConfirmed, setIsConfirmed] = useState(false);

  if (!event) return null;

  const passReference = `PASS-${event.id.toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

  const handleConfirmReservation = (e: React.FormEvent) => {
    e.preventDefault();
    setIsConfirmed(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#FFFFFF] border border-[#CBD5E1] rounded max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#74777F] hover:text-[#161C27] p-1 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!isConfirmed ? (
          <div className="space-y-5">
            <div className="border-b border-[#E2E8F0] pb-3 space-y-1">
              <span className="text-[10px] font-bold tracking-wider text-[#D69E2E] uppercase">
                Collegiate Activities Pass Registration
              </span>
              <h3 className="font-editorial text-2xl font-bold text-[#002045]">
                Reserve Colloquium Attendance Slip
              </h3>
              <p className="text-xs text-[#74777F]">
                {event.society} · Michaelmas Term 2026
              </p>
            </div>

            {/* Event Summary Card */}
            <div className="p-4 bg-[#F1F3FF] border border-[#E2E8F0] rounded space-y-2 text-xs">
              <div className="font-bold text-[#002045] font-editorial text-base">
                {event.title}
              </div>
              <div className="flex flex-wrap items-center gap-4 text-[#43474E]">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#1A365D]" />
                  <span>{event.date}</span>
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#7D5700]" />
                  <span>{event.time}</span>
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#1A365D]" />
                  <span>{event.location}</span>
                </span>
              </div>
            </div>

            {/* Registration Form */}
            <form onSubmit={handleConfirmReservation} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block font-semibold text-[#161C27]">
                    Student / Scholar Name
                  </label>
                  <input
                    type="text"
                    required
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#CBD5E1] rounded focus:border-[#1A365D] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-semibold text-[#161C27]">
                    College Affiliation
                  </label>
                  <input
                    type="text"
                    required
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#CBD5E1] rounded focus:border-[#1A365D] focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block font-semibold text-[#161C27]">
                  University Matriculation / Bodleian Card No.
                </label>
                <input
                  type="text"
                  required
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#CBD5E1] rounded focus:border-[#1A365D] focus:outline-none font-mono"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] text-[#74777F]">
                  Admission is complimentary for members.
                </span>

                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#1A365D] hover:bg-[#2B6CB0] text-white font-semibold rounded cursor-pointer transition-colors"
                >
                  Confirm & Issue Slip
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* ISSUED BROADSHEET MATRICULATION PASS */
          <div className="space-y-6">
            <div className="border-2 border-[#1A365D] rounded p-6 bg-[#FEFCF6] relative space-y-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-[#D69E2E]/40 pb-3">
                <div>
                  <span className="text-[10px] font-bold tracking-widest text-[#7D5700] uppercase block">
                    FACULTY OF ENGLISH · STUDENT ACTIVITIES PASS
                  </span>
                  <div className="font-editorial font-bold text-lg text-[#002045]">
                    {event.society}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono font-bold text-[#1A365D] bg-[#F1F3FF] px-2 py-0.5 rounded border border-[#CBD5E1]">
                    {passReference}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-editorial text-xl font-bold text-[#002045]">
                  {event.title}
                </h4>

                <div className="grid grid-cols-2 gap-2 text-xs text-[#43474E] pt-2">
                  <div>
                    <span className="text-[#74777F] block text-[10px] uppercase">Attendee:</span>
                    <span className="font-semibold text-[#161C27]">{studentName}</span> ({college})
                  </div>
                  <div>
                    <span className="text-[#74777F] block text-[10px] uppercase">Matriculation:</span>
                    <span className="font-mono text-[#161C27]">{studentId}</span>
                  </div>
                  <div>
                    <span className="text-[#74777F] block text-[10px] uppercase">Date & Time:</span>
                    <span>{event.date} · {event.time}</span>
                  </div>
                  <div>
                    <span className="text-[#74777F] block text-[10px] uppercase">Hall / Cloister:</span>
                    <span className="font-semibold text-[#1A365D]">{event.location}</span>
                  </div>
                </div>
              </div>

              {/* Barcode & Seal Simulation */}
              <div className="pt-3 border-t border-[#D69E2E]/30 flex items-center justify-between">
                <div className="space-y-1">
                  <div className="h-7 w-40 flex items-center gap-[2px] opacity-75">
                    {[1, 3, 2, 4, 1, 3, 2, 1, 4, 2, 3, 1, 2, 4, 1, 3, 2, 1, 3, 4, 2].map((w, idx) => (
                      <div
                        key={idx}
                        className="h-full bg-[#1A365D]"
                        style={{ width: `${w * 2}px` }}
                      ></div>
                    ))}
                  </div>
                  <span className="text-[9px] font-mono text-[#74777F]">AUTHENTICATED SIGNATURE VALID</span>
                </div>

                <div className="w-12 h-12 rounded-full border border-[#D69E2E] flex items-center justify-center text-[#7D5700] text-center p-1">
                  <span className="text-[8px] font-serif font-bold uppercase tracking-tighter leading-none">
                    SEAL OF FACULTY
                  </span>
                </div>
              </div>
            </div>

            {/* Pass Actions */}
            <div className="flex items-center justify-between gap-3 text-xs">
              <button
                onClick={() => {
                  alert(`Attendance Slip ${passReference} saved to device as PDF.`);
                }}
                className="py-2 px-4 border border-[#CBD5E1] rounded hover:bg-[#F1F3FF] flex items-center gap-1.5 cursor-pointer font-semibold"
              >
                <Download className="w-3.5 h-3.5 text-[#1A365D]" />
                <span>Save PDF Slip</span>
              </button>

              <button
                onClick={() => {
                  window.print();
                }}
                className="py-2 px-4 border border-[#CBD5E1] rounded hover:bg-[#F1F3FF] flex items-center gap-1.5 cursor-pointer font-semibold"
              >
                <Printer className="w-3.5 h-3.5 text-[#1A365D]" />
                <span>Print Pass</span>
              </button>

              <button
                onClick={onClose}
                className="py-2 px-5 bg-[#1A365D] text-white rounded hover:bg-[#2B6CB0] cursor-pointer font-semibold"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
