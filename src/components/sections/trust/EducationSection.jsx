// export default function EducationSection({ active, setActive }) {

//   return (
//     <section className="bg-[#F5EFE8] pt-[80px] pb-[80px]">
//       <div className="max-w-[1100px] mx-auto px-[20px]">
//         {/* ================= PILLAR ONE ================= */}
//         <div id="pillar-1" className="mb-[20px]">
//           <div className="flex items-start justify-between">
//             <div>
//               <span className=" font-rethink text-[11px] tracking-[0.3em] uppercase text-[#8B1E1E]">
//                 PILLAR ONE
//               </span>

//               <div className="flex items-center gap-6 mt-2">
//                 <span className="font-serif text-[48px] text-black/10">01</span>

//                 <div>
//                   <h2 className="font-display text-[32px] font-light">
//                     Education
//                   </h2>

//                   <p className="font-rethink text-[14.5px] text-black/60 mt-1">
//                     Expanding Access Through Structured Institutions
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <button
//               onClick={() => setActive(active === 0 ? null : 0)}
//               className="mt-[18px] text-[20px]"
//             >
//               <span className={`${active === 0 ? "rotate-45" : ""}`}>+</span>
//             </button>
//           </div>

//           <div className="mt-5 border-t border-black/10" />
//         </div>

//         {active === 0 && (
//           <div className=" pb-[30px]">
//             {/* TOP WHITE CARD */}
//             <div className="font-rethink rounded-2xl border border-black/10 bg-white/40 p-[28px] mb-[20px] grid md:grid-cols-2 gap-[40px]">
//               {/* LEFT */}
//               <div>
//                 <span className="text-[11px] uppercase text-[#8B1E1E]">
//                   PALAKKAD DISTRICT
//                 </span>

//                 <h3 className=" mt-3 font-serif text-[18px]">
//                   Structured Educational Institutions
//                 </h3>

//                 <p className="mt-3 text-[14px] text-black/70 leading-[1.7]">
//                   The Trust established a structured network of institutions
//                   beginning with AMLP, followed by MMPS and MMITE in 2004, then
//                   MMHSS in 2005, and EASE in 2015. These institutions follow
//                   State and CBSE curricula, unified into a single academic
//                   ecosystem rather than isolated schools.
//                 </p>

//                 <div className="mt-4 text-[12px] text-black/60 space-y-1">
//                   <p>
//                     <strong>Location</strong> — Palakkad District
//                   </p>
//                   <p>
//                     <strong>Institutions</strong> — AMLP, MMPS, MMHSS, MMITE,
//                     EASE
//                   </p>
//                 </div>
//               </div>

//               {/* RIGHT */}
//               <div>
//                 <p className="text-[14px] text-black/70 leading-[1.7]">
//                   The purpose was clear: create disciplined, value-based
//                   institutions where access and excellence coexist.
//                   Infrastructure compliant with Board regulations includes:
//                 </p>

//                 <ul className="mt-4 space-y-2 text-[14px] list-disc pl-4 marker:text-[#8B1E1E] text-black/70">
//                   <li>Proper land and fully equipped academic buildings</li>
//                   <li>Laboratories and well-stocked libraries</li>
//                   <li>Dedicated sports infrastructure</li>
//                   <li>Prescribed safety and compliance standards</li>
//                 </ul>

//                 <p className="mt-4 text-[14px] text-black/70 leading-[1.7]">
//                   The Trust safeguards the autonomy of institutional leadership
//                   while maintaining academic oversight through structured
//                   governance.
//                 </p>
//               </div>
//             </div>

//             {/* BOTTOM GRID */}
//             <div className="grid md:grid-cols-2 gap-[20px]">
//               {/* RED CARD */}
//               <div className="font-rethink rounded-2xl bg-[#8B1E1E] text-white p-[26px]">
//                 <span className="text-[11px] uppercase text-white/70">
//                   KOZHIKODE DISTRICT
//                 </span>

//                 <h3 className="mt-3 font-serif text-[18px]">
//                   Thanal School for Special Needs
//                 </h3>

//                 <div className="mt-2 text-[12px] text-white/70 space-y-1">
//                   <p>
//                     <strong>Location</strong> — Paleri Village, Kozhikode
//                   </p>
//                   <p>
//                     <strong>Campus Size</strong> — 60,000+ sq.ft
//                   </p>
//                 </div>

//                 <p className="mt-3 text-[14px] text-white/80 leading-[1.7]">
//                   A dedicated institution for children with cerebral palsy,
//                   autism, intellectual disabilities, multiple disabilities, and
//                   sensory impairments — designed as a comprehensive educational
//                   support system integrating academics, healthcare, and
//                   recreation.
//                 </p>

//                 <ul className="mt-4 space-y-2 text-[14px] list-disc pl-4 marker:text-white">
//                   <li>Academic & administration blocks</li>
//                   <li>Dispensary & dining facilities</li>
//                   <li>Amphitheatre & athletic track</li>
//                 </ul>
//               </div>

//               {/* DARK CARD */}
//               <div className="font-rethink rounded-2xl bg-[#111111] text-white p-[26px]">
//                 <span className="text-[11px] uppercase text-white/60">
//                   PALAKKAD DISTRICT
//                 </span>

//                 <h3 className="mt-3 font-serif text-[18px]">
//                   WHO-Certified Teacher Training Workshops
//                 </h3>

//                 <p className="mt-3 text-[14px] text-white/70 leading-[1.7]">
//                   Recognising that institutional quality is sustained through
//                   faculty excellence, the Trust implemented structured teacher
//                   development programs including WHO-certified workshops —
//                   institutionalised as continuous professional development, not
//                   periodic compliance.
//                 </p>

//                 <ul className="mt-4 space-y-2 text-[14px] list-disc pl-4 marker:text-[#8B1E1E]">
//                   <li>Enhanced pedagogical standards</li>
//                   <li>Strengthened classroom delivery</li>
//                   <li>Alignment with evolving academic frameworks</li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* ================= PILLAR TWO ================= */}
//         <div id="pillar-2" className="mt-[20px] mb-[20px]">
//           <div className="flex items-start justify-between">
//             <div>
//               <span className="font-rethink text-[11px] tracking-[0.3em] uppercase text-[#8B1E1E]">
//                 PILLAR TWO
//               </span>

//               <div className="flex items-center gap-6 mt-2">
//                 <span className="font-serif text-[48px] text-black/10">02</span>

//                 <div>
//                   <h2 className="font-display text-[32px] font-light">
//                     Health & Sanitation
//                   </h2>

//                   <p className=" font-rethink text-[14.5px] text-black/60 mt-1">
//                     Preventive Care and Sustainable Public Health Solutions
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <button
//               onClick={() => setActive(active === 1 ? null : 1)}
//               className="mt-[18px] text-[20px]"
//             >
//               <span className={`${active === 1 ? "rotate-45" : ""}`}>+</span>
//             </button>
//           </div>

//           <div className="mt-5 border-t border-black/10" />
//         </div>

//         {active === 1 && (
//           <div className="pb-[30px]">
//             {/* TOP GRID */}
//             <div className="grid md:grid-cols-3 gap-[20px] mb-[20px]">
//               {/* RED CARD */}
//               <div className="font-rethink rounded-2xl bg-[#8B1E1E] text-white p-[26px]">
//                 <span className="text-[11px] uppercase text-white/70">
//                   4 YEARS · 30 PANCHAYATS
//                 </span>

//                 <h3 className="mt-3 font-serif text-[18px] leading-[1.4]">
//                   30 Medical Camps & 4,000+ Cataract Surgeries
//                 </h3>

//                 <p className="mt-2 text-[13px] text-white/70">
//                   Coverage: Ottapalam, Kongad, Nellyampathy Tribal Regions
//                 </p>

//                 <p className="mt-3 text-[14px] text-white/80 leading-[1.7]">
//                   In collaboration with Lions Club International, the Trust
//                   conducted 30 medical camps and completed more than 4,000
//                   cataract surgeries across underserved communities — combining
//                   outreach with surgical follow-ups to ensure continuity of
//                   care.
//                 </p>

//                 <div className="mt-6 bg-white/10 px-4 py-3 inline-block rounded-lg">
//                   <p className="text-[14px] font-semibold">4,000+</p>
//                   <p className="text-[13px] text-white/70">
//                     Cataract surgeries completed
//                   </p>
//                 </div>
//               </div>

//               {/* WHITE CARD 1 */}
//               <div className="font-rethink rounded-2xl border border-black/10 bg-white/40 p-[26px]">
//                 <span className="text-[11px] uppercase text-[#8B1E1E]">
//                   2015 · MANKARA
//                 </span>

//                 <h3 className="mt-3 font-serif text-[18px]">
//                   Maryumma Memorial Children's Clinic
//                 </h3>

//                 <p className="mt-2 text-[13px] text-black/60">
//                   Location: Mankara Government Hospital, Palakkad
//                 </p>

//                 <p className="mt-3 text-[14px] text-black/70 leading-[1.7]">
//                   A permanent children's clinic established within the
//                   Government Hospital, integrating private CSR investment into
//                   public health infrastructure with a child-friendly
//                   environment.
//                 </p>

//                 <ul className="mt-4 space-y-2 text-[14px] list-disc pl-4 marker:text-[#8B1E1E]">
//                   <li>Examination & treatment rooms</li>
//                   <li>Laboratory & injection room</li>
//                   <li>Play area & child-friendly environment</li>
//                 </ul>
//               </div>

//               {/* WHITE CARD 2 */}
//               <div className="font-rethink rounded-2xl border border-black/10 bg-white/40 p-[26px]">
//                 <span className="text-[11px] uppercase text-[#8B1E1E]">
//                   CRITICAL CARE ACCESS
//                 </span>

//                 <h3 className="mt-3 font-serif text-[18px]">
//                   Dialysis Support Initiative
//                 </h3>

//                 <p className="mt-3 text-[14px] text-black/70 leading-[1.7]">
//                   Addressing the growing prevalence of kidney-related illness,
//                   particularly in regions affected by sanitation challenges, the
//                   Trust provided dialysis machines and extended financial aid to
//                   patients requiring critical renal care — bridging access to
//                   life-sustaining treatment for economically disadvantaged
//                   families.
//                 </p>
//               </div>
//             </div>

//             {/* BOTTOM GRID */}
//             <div className="grid md:grid-cols-2 gap-[20px]">
//               {/* DARK CARD */}
//               <div className="font-rethink rounded-2xl bg-[#111111] text-white p-[26px]">
//                 <span className="text-[11px] uppercase text-white/60">
//                   PUBLIC SANITATION INNOVATION
//                 </span>

//                 <h3 className="mt-3 font-serif text-[18px]">
//                   eToilet – Sustainable Sanitation
//                 </h3>

//                 <p className="mt-3 text-[14px] text-white/70 leading-[1.7]">
//                   Through the R&D wing of Eram Scientific, the Trust supported
//                   the development and deployment of the award-winning eToilet —
//                   a self-cleaning, self-sustaining sanitation unit installed
//                   across public spaces in India. Addressing sanitation as a
//                   long-term systemic challenge rather than temporary relief.
//                 </p>

//                 <p className="mt-3 text-[14px] text-white/70 leading-[1.7]">
//                   Units require minimal maintenance and are accessible at no
//                   cost or minimal charge, integrating technology with civic
//                   public infrastructure.
//                 </p>
//               </div>

//               {/* WHITE CARD */}
//               <div className="font-rethink rounded-2xl border border-black/10 bg-white/40 p-[26px]">
//                 <span className="text-[11px] uppercase text-[#8B1E1E]">
//                   5 PANCHAYATS · PALAKKAD
//                 </span>

//                 <h3 className="mt-3 font-serif text-[18px]">
//                   Financial Aid for 242 BPL Families – Toilet Construction
//                 </h3>

//                 <p className="mt-2 text-[13px] text-black/60">
//                   Impact: 242 toilets for BPL families
//                 </p>

//                 <p className="text-[13px] text-black/60">
//                   Collaboration: Kerala Govt. ODF Program
//                 </p>

//                 <p className="mt-3 text-[14px] text-black/70 leading-[1.7]">
//                   Supporting the Kerala Government's Open Defecation-Free
//                   initiative, the Trust provided financial assistance to 242
//                   Below Poverty Line families to construct household toilets
//                   across five panchayats — directly strengthening sanitation
//                   access while aligning with statewide public health goals.
//                 </p>

//                 <div className="mt-6 bg-[#8B1E1E] text-white px-4 py-3 inline-block rounded-lg">
//                   <p className="text-[14px] font-semibold">242</p>
//                   <p className="text-[12px] text-white/80">
//                     Households with new sanitation access
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* ================= PILLAR THREE ================= */}
//         <div id="pillar-3" className="mt-[20px] mb-[20px]">
//           <div className="flex items-start justify-between">
//             <div>
//               <span className="font-rethink text-[11px] tracking-[0.3em] uppercase text-[#8B1E1E]">
//                 PILLAR THREE
//               </span>

//               <div className="flex items-center gap-6 mt-2">
//                 <span className="font-display text-[48px] text-black/10">03</span>

//                 <div>
//                   <h2 className="font-display text-[32px] font-light leading-[1.2]">
//                     Humanitarian & Rehabilitation
//                   </h2>

//                   <p className="font-rethink text-[14.5px] text-black/60 mt-1">
//                     Direct & Structured Intervention During Social Crisis
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <button
//               onClick={() => setActive(active === 2 ? null : 2)}
//               className="mt-[18px] text-[20px]"
//             >
//               <span className={`${active === 2 ? "rotate-45" : ""}`}>+</span>
//             </button>
//           </div>

//           <div className="mt-5 border-t border-black/10" />
//         </div>

//         {active === 2 && (
//           <div className="pb-[30px]">
//             {/* TOP ROW */}
//             <div className="grid md:grid-cols-2 gap-[20px] mb-[20px]">
//               {/* RED CARD */}
//               <div className="font-rethink rounded-2xl bg-[#8B1E1E] text-white p-[26px]">
//                 <span className="text-[11px] uppercase text-white/70">
//                   PERMANENT SHELTER
//                 </span>

//                 <h3 className="mt-3 font-serif text-[18px]">
//                   Housing Initiative – Shelter for the Homeless
//                 </h3>

//                 <div className="mt-3 text-[13px] text-white/70 space-y-1">
//                   <p>
//                     <strong>Completed</strong> — 60+ Houses
//                   </p>
//                   <p>
//                     <strong>In Progress</strong> — 25 Under Construction
//                   </p>
//                   <p>
//                     <strong>Unit Size</strong> — 600–1000 sq.ft
//                   </p>
//                 </div>

//                 <p className="mt-4 text-[14px] text-white/80 leading-[1.7]">
//                   More than 50 permanent homes constructed for homeless
//                   families, with 25 currently under development. Each home is
//                   designed for durable, long-term habitation — a shift from
//                   short-term relief to sustainable rehabilitation.
//                 </p>
//               </div>

//               {/* WHITE CARD */}
//               <div className="font-rethink rounded-2xl border border-black/10 bg-white/40 p-[26px]">
//                 <span className="text-[11px] uppercase text-[#8B1E1E]">
//                   2013 · REPATRIATION
//                 </span>

//                 <h3 className="mt-3 font-serif text-[18px]">
//                   Nitaqat Charter Flight Initiative
//                 </h3>

//                 <div className="mt-3 text-[13px] text-black/60 space-y-1">
//                   <p>
//                     <strong>Impact</strong> — 100+ Flight Tickets Sponsored
//                   </p>
//                   <p>
//                     <strong>Route</strong> — Dammam to Nedumbassery
//                   </p>
//                 </div>

//                 <p className="mt-4 text-[14px] text-black/70 leading-[1.7]">
//                   During the Saudi Nitaqat labour law crisis, the Trust
//                   sponsored a chartered flight for more than 100 affected
//                   expatriates — enabling immediate repatriation and family
//                   reunification during a period of severe employment
//                   instability.
//                 </p>
//               </div>
//             </div>

//             {/* BOTTOM ROW */}
//             <div className="grid md:grid-cols-2 gap-[20px]">
//               {/* DARK CARD */}
//               <div className="font-rethink rounded-2xl bg-[#111111] text-white p-[26px]">
//                 <span className="text-[11px] uppercase text-white/60">
//                   NORKA COLLABORATION
//                 </span>

//                 <h3 className="mt-3 font-serif text-[18px]">
//                   Swapnasafalyam – Repatriation & Reintegration Support
//                 </h3>

//                 <p className="mt-3 text-[14px] text-white/70 leading-[1.7]">
//                   For Malayali expatriates who had completed prison sentences
//                   abroad but lacked the means to return, the Trust partnered
//                   with NORKA to sponsor return travel and coordinate with
//                   authorities for safe, dignified repatriation — restoring
//                   family connections and preventing prolonged displacement.
//                 </p>

//                 <p className="mt-3 text-[14px] text-white/70 leading-[1.7]">
//                   The program facilitated multiple family reunifications and
//                   addressed a humanitarian gap often overlooked in expatriate
//                   welfare.
//                 </p>
//               </div>

//               {/* WHITE CARD */}
//               <div className="font-rethink rounded-2xl border border-black/10 bg-white/40 p-[26px]">
//                 <span className="text-[11px] uppercase text-[#8B1E1E]">
//                   REHABILITATION SUPPORT
//                 </span>

//                 <h3 className="mt-3 font-serif text-[18px]">
//                   Individual Rehabilitation & Livelihood Support
//                 </h3>

//                 <p className="mt-3 text-[14px] text-black/70 leading-[1.7]">
//                   In cases of severe physical trauma resulting in limb loss, the
//                   Trust sponsored advanced prosthetic solutions — enabling
//                   individuals to regain mobility, continue education, and
//                   restore independence. Prioritising functional recovery over
//                   short-term relief.
//                 </p>

//                 <p className="mt-3 text-[14px] text-black/70 leading-[1.7]">
//                   Beyond emergency relief, the Trust has also supported
//                   livelihood-oriented interventions for economically vulnerable
//                   families — enabling income generation, reducing dependency,
//                   and promoting self-sufficiency as a bridge between
//                   humanitarian relief and sustained rehabilitation.
//                 </p>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* ================= PILLAR FOUR ================= */}
//         <div id="pillar-4" className="mt-[20px] mb-[20px]">
//           <div className="flex items-start justify-between">
//             <div>
//               <span className="font-rethink text-[11px] tracking-[0.3em] uppercase text-[#8B1E1E]">
//                 PILLAR FOUR
//               </span>

//               <div className="flex items-center gap-6 mt-2">
//                 <span className="font-diplay text-[48px] text-black/10">04</span>

//                 <div>
//                   <h2 className="font-display text-[32px] font-light">
//                     Youth & Sports
//                   </h2>

//                   <p className="font-rethink text-[14.5px] text-black/60 mt-1">
//                     Structured Support for Competitive Potential
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <button
//               onClick={() => setActive(active === 3 ? null : 3)}
//               className="mt-[18px] text-[20px]"
//             >
//               <span className={`${active === 3 ? "rotate-45" : ""}`}>+</span>
//             </button>
//           </div>

//           <div className="mt-5 border-t border-black/10" />
//         </div>

//         {active === 3 && (
//           <div className="pb-[30px]">
//             <div className="grid md:grid-cols-3 gap-[20px]">
//               {/* RED CARD */}
//               <div className="font-rethink rounded-2xl bg-[#8B1E1E] text-white p-[26px]">
//                 <span className="text-[11px] uppercase text-white/70">
//                   NATIONAL SCHOOLS GAMES
//                 </span>

//                 <h3 className="mt-3 font-serif text-[18px]">
//                   Athlete Support Program
//                 </h3>

//                 <p className="mt-2 text-[13px] text-white/70">
//                   Support — 36+ Athletes Supported
//                 </p>

//                 <p className="mt-3 text-[14px] text-white/80 leading-[1.7]">
//                   International-quality sports kits distributed to more than 36
//                   athletes who qualified for the National Schools Games —
//                   reducing resource barriers that hinder competitive
//                   progression.
//                 </p>

//                 <div className="mt-4">
//                   <p className="text-[11px] uppercase text-white/60 mb-2">
//                     Recognised Athletes
//                   </p>

//                   <ul className="text-[13px] space-y-2 list-disc pl-4 marker:text-white">
//                     <li>P.U. Chithra — National Gold Medalist</li>
//                     <li>Mohammed Asal — National Gold Medalist</li>
//                   </ul>
//                 </div>
//               </div>

//               {/* WHITE CARD */}
//               <div className="font-rethink rounded-2xl border border-black/10 bg-white/40 p-[26px]">
//                 <span className="text-[11px] uppercase text-[#8B1E1E]">
//                   PROFESSIONAL SPORTS
//                 </span>

//                 <h3 className="mt-3 font-serif text-[18px]">
//                   Support for Professional Athletes
//                 </h3>

//                 <p className="mt-3 text-[14px] text-black/70 leading-[1.7]">
//                   The Trust extended support to Diljith T.S., Indian motor
//                   racing and karting champion — assisting his participation in
//                   competitive circuits and strengthening pathways from regional
//                   talent to national-level professional sport.
//                 </p>
//               </div>

//               {/* DARK CARD */}
//               <div className="font-rethink rounded-2xl bg-[#111111] text-white p-[26px]">
//                 <span className="text-[11px] uppercase text-white/60">
//                   2015 · 2026 MILESTONE
//                 </span>

//                 <h3 className="mt-3 font-serif text-[18px]">
//                   EASE & The ERAM Sports Arena
//                 </h3>

//                 <p className="mt-3 text-[14px] text-white/70 leading-[1.7]">
//                   In 2015, the ERAM Academy for Sports & Excellence (EASE) was
//                   established to integrate sports training within formal
//                   academics. In 2026, the Trust advances this vision further
//                   with the development of the ERAM Sports Arena.
//                 </p>

//                 <p className="mt-3 text-[14px] text-white/70 leading-[1.7]">
//                   Designed to host institutional competitions and external
//                   sporting events, the Arena marks a significant milestone in
//                   integrating sports excellence within the educational
//                   ecosystem.
//                 </p>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* ================= PILLAR FIVE ================= */}
//         <div id="pillar-5" className="mt-[20px] mb-[20px]">
//           <div className="flex items-start justify-between">
//             <div>
//               <span className="font-rethink text-[11px] tracking-[0.3em] uppercase text-[#8B1E1E]">
//                 PILLAR FIVE
//               </span>

//               <div className="flex items-center gap-6 mt-2">
//                 <span className="font-display text-[48px] text-black/10">05</span>

//                 <div>
//                   <h2 className="font-display text-[32px] font-light">
//                     Environment
//                   </h2>

//                   <p className="font-rethink text-[14.5px] text-black/60 mt-1">
//                     Water Conservation & Ecological Responsibility
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <button
//               onClick={() => setActive(active === 4 ? null : 4)}
//               className="mt-[18px] text-[20px]"
//             >
//               <span className={`${active === 4 ? "rotate-45" : ""}`}>+</span>
//             </button>
//           </div>

//           <div className="mt-5 border-t border-black/10" />
//         </div>

//         {active === 4 && (
//           <div className="pb-[30px]">
//             {/* TOP FULL CARD */}
//             <div className="font-rethink rounded-2xl border border-black/10 bg-white/40 p-[28px] mb-[20px] grid md:grid-cols-2 gap-[40px]">
//               {/* LEFT */}
//               <div>
//                 <span className="text-[11px] uppercase text-[#8B1E1E]">
//                   MANKARA · KOTTAYI PANCHAYATS
//                 </span>

//                 <h3 className="mt-3 font-serif text-[18px]">
//                   Bharathapuzha Shutter Restoration
//                 </h3>

//                 <div className="mt-3 text-[13px] text-black/60 space-y-1">
//                   <p>
//                     <strong>Location</strong> — Mankara–Kottayi Panchayats,
//                     Palakkad
//                   </p>
//                   <p>
//                     <strong>Impact</strong> — Structural intervention for river
//                     water retention
//                   </p>
//                 </div>

//                 <p className="mt-4 text-[14px] text-black/70 leading-[1.7]">
//                   Bharathapuzha — Kerala's second-longest river — sustained
//                   critical damage to wooden causeway shutters, weakening water
//                   retention and reducing river levels. The Trust replaced
//                   deteriorated wooden shutters with durable iron structures,
//                   restoring controlled water retention and reinforcing
//                   ecological resilience in the region.
//                 </p>
//               </div>

//               {/* RIGHT BOX */}
//               <div className="rounded-xl bg-[#E9E1D6] p-[20px] h-fit">
//                 <span className="text-[11px] uppercase text-black/50">
//                   ENVIRONMENTAL SCOPE
//                 </span>

//                 <ul className="mt-3 space-y-2 text-[13px] list-disc pl-4 marker:text-[#8B1E1E] text-black/70">
//                   <li>Iron shutter replacement for structural integrity</li>
//                   <li>Coordination with local panchayat bodies</li>
//                   <li>Restored controlled water retention</li>
//                   <li>Long-term ecological resilience strengthened</li>
//                 </ul>
//               </div>
//             </div>

//             {/* BOTTOM GRID */}
//             <div className="grid md:grid-cols-2 gap-[20px]">
//               {/* RED CARD */}
//               <div className="font-rethink rounded-2xl bg-[#8B1E1E] text-white p-[26px]">
//                 <span className="text-[11px] uppercase text-white/70">
//                   PALAKKAD REGION
//                 </span>

//                 <h3 className="mt-3 font-serif text-[18px]">
//                   Drinking Water Infrastructure
//                 </h3>

//                 <p className="mt-3 text-[14px] text-white/80 leading-[1.7]">
//                   A structured, end-to-end water infrastructure program ensuring
//                   sustained access to safe drinking water across rural Palakkad
//                   — from source creation to household-level connectivity.
//                 </p>

//                 <ul className="mt-4 space-y-2 text-[14px] list-disc pl-4 marker:text-white">
//                   <li>Construction of over 180 wells</li>
//                   <li>Borewell drilling in water-scarce areas</li>
//                   <li>Elevated water storage tanks built</li>
//                   <li>Plumbing networks & household connectivity</li>
//                 </ul>

//                 <div className="mt-6 bg-white/10 px-4 py-3 inline-block rounded-lg">
//                   <p className="text-[14px] font-semibold">180+</p>
//                   <p className="text-[12px] text-white/70">
//                     Wells constructed across communities
//                   </p>
//                 </div>
//               </div>

//               {/* WHITE CARD */}
//               <div className="font-rethink rounded-2xl border border-black/10 bg-white/40 p-[26px]">
//                 <span className="text-[11px] uppercase text-[#8B1E1E]">
//                   PALAKKAD REGION
//                 </span>

//                 <h3 className="mt-3 font-serif text-[18px]">
//                   Multiple Check Dams Constructed
//                 </h3>

//                 <p className="mt-2 text-[13px] text-black/60">
//                   Impact — Strengthened water retention
//                 </p>

//                 <p className="mt-3 text-[14px] text-black/70 leading-[1.7]">
//                   To improve groundwater recharge and regulate seasonal flow,
//                   the Trust supported the construction of multiple check dams
//                   across vulnerable stretches — retaining monsoon runoff and
//                   improving soil moisture for surrounding agricultural
//                   communities.
//                 </p>

//                 <p className="mt-3 text-[14px] text-black/70 leading-[1.7]">
//                   By focusing on decentralized water retention, the initiative
//                   strengthened long-term ecological stability and agricultural
//                   resilience.
//                 </p>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* ================= PILLAR SIX ================= */}
//         <div id="pillar-6" className="mt-[20px] mb-[20px]">
//           <div className="flex items-start justify-between">
//             <div>
//               <span className="font-rethink text-[11px] tracking-[0.3em] uppercase text-[#8B1E1E]">
//                 PILLAR SIX
//               </span>

//               <div className="flex items-center gap-6 mt-2">
//                 <span className="font-display text-[48px] text-black/10">06</span>

//                 <div>
//                   <h2 className="font-display text-[32px] font-light leading-[1.2]">
//                     Community Infrastructure & Welfare
//                   </h2>

//                   <p className="font-rethink text-[14.5px] text-black/60 mt-1">
//                     System-Based Community Support — Strengthening Civic Systems
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <button
//               onClick={() => setActive(active === 5 ? null : 5)}
//               className="mt-[18px] text-[20px]"
//             >
//               <span className={`${active === 5 ? "rotate-45" : ""}`}>+</span>
//             </button>
//           </div>

//           <div className="mt-5 border-t border-black/10" />
//         </div>

//         {active === 5 && (
//           <div className="pb-[30px]">
//             <div className="grid md:grid-cols-3 gap-[20px]">
//               {/* WHITE CARD */}
//               <div className="font-rethink rounded-2xl border border-black/10 bg-white/40 p-[26px]">
//                 <span className="text-[11px] uppercase text-[#8B1E1E]">
//                   PALAKKAD DISTRICT
//                 </span>

//                 <h3 className="mt-3 font-serif text-[18px]">
//                   Ambulance Sponsorship Initiative
//                 </h3>

//                 <p className="mt-3 text-[14px] text-black/70 leading-[1.7]">
//                   The Trust sponsored ambulances for deployment across
//                   panchayats and NGOs in Palakkad, strengthening emergency
//                   response systems and reducing response time to tertiary care
//                   facilities. In rural healthcare ecosystems, mobility
//                   determines survival.
//                 </p>

//                 <p className="mt-3 text-[14px] text-black/70 leading-[1.7]">
//                   The initiative reinforced the essential link between rural
//                   communities and emergency healthcare.
//                 </p>
//               </div>

//               {/* RED CARD */}
//               <div className="font-rethink rounded-2xl bg-[#8B1E1E] text-white p-[26px]">
//                 <span className="text-[11px] uppercase text-white/70">
//                   KERALA ODF INITIATIVE
//                 </span>

//                 <h3 className="mt-3 font-serif text-[18px]">
//                   Toilet Construction Aid – Sanitation Infrastructure
//                 </h3>

//                 <div className="mt-3 text-[13px] text-white/70 space-y-1">
//                   <p>
//                     <strong>Families</strong> — 242 BPL families supported
//                   </p>
//                   <p>
//                     <strong>Districts</strong> — 5 Panchayats, Palakkad
//                   </p>
//                   <p>
//                     <strong>Collaboration</strong> — Kerala Govt. ODF Program
//                   </p>
//                 </div>

//                 <p className="mt-4 text-[14px] text-white/80 leading-[1.7]">
//                   Financial assistance to 242 Below Poverty Line families for
//                   household toilet construction — directly strengthening
//                   sanitation access while aligning with statewide public health
//                   goals.
//                 </p>
//               </div>

//               {/* DARK CARD */}
//               <div className="font-rethink rounded-2xl bg-[#111111] text-white p-[26px]">
//                 <span className="text-[11px] uppercase text-white/60">
//                   SOCIAL COHESION
//                 </span>

//                 <h3 className="mt-3 font-serif text-[18px]">
//                   Interreligious Harmony & Social Cohesion Initiatives
//                 </h3>

//                 <div className="mt-2 text-[13px] text-white/60">
//                   <p>
//                     <strong>Format</strong> — Multi-community engagement
//                     platforms
//                   </p>
//                 </div>

//                 <p className="mt-3 text-[14px] text-white/70 leading-[1.7]">
//                   Through dialogue platforms, collaborative community events,
//                   and inclusive institutional policies, the Trust has fostered
//                   environments where diversity is respected and mutual
//                   understanding is encouraged.
//                 </p>

//                 <p className="mt-3 text-[14px] text-white/70 leading-[1.7]">
//                   These initiatives reinforce the Trust's belief that education
//                   and welfare must operate within socially stable and inclusive
//                   ecosystems.
//                 </p>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }


// ─── Card primitives ───────────────────────────────────────────────
const Card = ({ variant = "white", label, title, meta = [], body, list, badge, children }) => {
  const base = "font-rethink rounded-2xl p-[26px]";
  const styles = {
    white: `${base} border border-black/10 bg-white/40`,
    red:   `${base} bg-[#8B1E1E] text-white`,
    dark:  `${base} bg-[#111111] text-white`,
  };
  const labelColor  = variant === "white" ? "text-[#8B1E1E]" : "text-white/70";
  const titleColor  = variant === "white" ? "" : "";
  const textColor   = variant === "white" ? "text-black/70" : "text-white/80";
  const metaColor   = variant === "white" ? "text-black/60" : "text-white/70";
  const markerColor = variant === "red" ? "marker:text-white" : "marker:text-[#8B1E1E]";

  return (
    <div className={styles[variant]}>
      {label && <span className="text-[11px] uppercase tracking-[0.2em] block mb-3"
        style={{ color: variant === "white" ? "#8B1E1E" : variant === "dark" ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.7)" }}>
        {label}
      </span>}
      {title && <h3 className="font-serif text-[18px] leading-[1.4]">{title}</h3>}
      {meta.length > 0 && (
        <div className={`mt-2 text-[12px] space-y-1 ${metaColor}`}>
          {meta.map((m, i) => <p key={i}>{m}</p>)}
        </div>
      )}
      {body && Array.isArray(body)
        ? body.map((b, i) => <p key={i} className={`mt-3 text-[14px] leading-[1.7] ${textColor}`}>{b}</p>)
        : body && <p className={`mt-3 text-[14px] leading-[1.7] ${textColor}`}>{body}</p>
      }
      {list && (
        <ul className={`mt-4 space-y-2 text-[14px] list-disc pl-4 ${markerColor} ${textColor}`}>
          {list.map((l, i) => <li key={i}>{l}</li>)}
        </ul>
      )}
      {badge && (
        <div className={`mt-6 px-4 py-3 inline-block rounded-lg ${variant === "white" ? "bg-[#8B1E1E] text-white" : "bg-white/10"}`}>
          <p className="text-[14px] font-semibold">{badge.value}</p>
          <p className={`text-[12px] ${variant === "white" ? "text-white/80" : "text-white/70"}`}>{badge.label}</p>
        </div>
      )}
      {children}
    </div>
  );
};

// ─── Pillar header ──────────────────────────────────────────────────
const PillarHeader = ({ num, label, title, subtitle, active, onClick }) => (
  <div className="mt-[20px] mb-[20px]">
    <div className="flex items-start justify-between">
      <div>
        <span className="font-rethink text-[11px] tracking-[0.3em] uppercase text-[#8B1E1E]">
          {label}
        </span>
        <div className="flex items-center gap-6 mt-2">
          <span className="font-display text-[48px] text-black/10">{num}</span>
          <div>
            <h2 className="font-display text-[32px] font-light leading-[1.2]">{title}</h2>
            <p className="font-rethink text-[14.5px] text-black/60 mt-1">{subtitle}</p>
          </div>
        </div>
      </div>
      <button onClick={onClick} className="mt-[18px] text-[20px] cursor-pointer">
        <span className={active ? "inline-block rotate-45" : ""}> + </span>
      </button>
    </div>
    <div className="mt-5 border-t border-black/10" />
  </div>
);

// ─── Pillar content panels ──────────────────────────────────────────
const panels = [
  // 0 — Education
  () => (
    <div className="pb-[30px]">
      <div className="font-rethink rounded-2xl border border-black/10 bg-white/40 p-[28px] mb-[20px] grid md:grid-cols-2 gap-[40px]">
        <div>
          <span className="text-[11px] uppercase text-[#8B1E1E]">PALAKKAD DISTRICT</span>
          <h3 className="mt-3 font-serif text-[18px]">Structured Educational Institutions</h3>
          <p className="mt-3 text-[14px] text-black/70 leading-[1.7]">
            The Trust established a structured network of institutions beginning with AMLP,
            followed by MMPS and MMITE in 2004, then MMHSS in 2005, and EASE in 2015.
            These institutions follow State and CBSE curricula, unified into a single
            academic ecosystem rather than isolated schools.
          </p>
          <div className="mt-4 text-[12px] text-black/60 space-y-1">
            <p><strong>Location</strong> — Palakkad District</p>
            <p><strong>Institutions</strong> — AMLP, MMPS, MMHSS, MMITE, EASE</p>
          </div>
        </div>
        <div>
          <p className="text-[14px] text-black/70 leading-[1.7]">
            The purpose was clear: create disciplined, value-based institutions where access
            and excellence coexist. Infrastructure compliant with Board regulations includes:
          </p>
          <ul className="mt-4 space-y-2 text-[14px] list-disc pl-4 marker:text-[#8B1E1E] text-black/70">
            <li>Proper land and fully equipped academic buildings</li>
            <li>Laboratories and well-stocked libraries</li>
            <li>Dedicated sports infrastructure</li>
            <li>Prescribed safety and compliance standards</li>
          </ul>
          <p className="mt-4 text-[14px] text-black/70 leading-[1.7]">
            The Trust safeguards the autonomy of institutional leadership while maintaining
            academic oversight through structured governance.
          </p>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-[20px]">
        <Card variant="red" label="KOZHIKODE DISTRICT" title="Thanal School for Special Needs"
          meta={["Location — Paleri Village, Kozhikode", "Campus Size — 60,000+ sq.ft"]}
          body="A dedicated institution for children with cerebral palsy, autism, intellectual disabilities, multiple disabilities, and sensory impairments — designed as a comprehensive educational support system integrating academics, healthcare, and recreation."
          list={["Academic & administration blocks", "Dispensary & dining facilities", "Amphitheatre & athletic track"]}
        />
        <Card variant="dark" label="PALAKKAD DISTRICT" title="WHO-Certified Teacher Training Workshops"
          body="Recognising that institutional quality is sustained through faculty excellence, the Trust implemented structured teacher development programs including WHO-certified workshops — institutionalised as continuous professional development, not periodic compliance."
          list={["Enhanced pedagogical standards", "Strengthened classroom delivery", "Alignment with evolving academic frameworks"]}
        />
      </div>
    </div>
  ),

  // 1 — Health & Sanitation
  () => (
    <div className="pb-[30px]">
      <div className="grid md:grid-cols-3 gap-[20px] mb-[20px]">
        <Card variant="red" label="4 YEARS · 30 PANCHAYATS" title="30 Medical Camps & 4,000+ Cataract Surgeries"
          meta={["Coverage: Ottapalam, Kongad, Nellyampathy Tribal Regions"]}
          body="In collaboration with Lions Club International, the Trust conducted 30 medical camps and completed more than 4,000 cataract surgeries across underserved communities — combining outreach with surgical follow-ups to ensure continuity of care."
          badge={{ value: "4,000+", label: "Cataract surgeries completed" }}
        />
        <Card variant="white" label="2015 · MANKARA" title="Maryumma Memorial Children's Clinic"
          meta={["Location: Mankara Government Hospital, Palakkad"]}
          body="A permanent children's clinic established within the Government Hospital, integrating private CSR investment into public health infrastructure with a child-friendly environment."
          list={["Examination & treatment rooms", "Laboratory & injection room", "Play area & child-friendly environment"]}
        />
        <Card variant="white" label="CRITICAL CARE ACCESS" title="Dialysis Support Initiative"
          body="Addressing the growing prevalence of kidney-related illness, particularly in regions affected by sanitation challenges, the Trust provided dialysis machines and extended financial aid to patients requiring critical renal care — bridging access to life-sustaining treatment for economically disadvantaged families."
        />
      </div>
      <div className="grid md:grid-cols-2 gap-[20px]">
        <Card variant="dark" label="PUBLIC SANITATION INNOVATION" title="eToilet – Sustainable Sanitation"
          body={[
            "Through the R&D wing of Eram Scientific, the Trust supported the development and deployment of the award-winning eToilet — a self-cleaning, self-sustaining sanitation unit installed across public spaces in India.",
            "Units require minimal maintenance and are accessible at no cost or minimal charge, integrating technology with civic public infrastructure.",
          ]}
        />
        <Card variant="white" label="5 PANCHAYATS · PALAKKAD" title="Financial Aid for 242 BPL Families – Toilet Construction"
          meta={["Impact: 242 toilets for BPL families", "Collaboration: Kerala Govt. ODF Program"]}
          body="Supporting the Kerala Government's Open Defecation-Free initiative, the Trust provided financial assistance to 242 Below Poverty Line families to construct household toilets across five panchayats."
          badge={{ value: "242", label: "Households with new sanitation access" }}
        />
      </div>
    </div>
  ),

  // 2 — Humanitarian
  () => (
    <div className="pb-[30px]">
      <div className="grid md:grid-cols-2 gap-[20px] mb-[20px]">
        <Card variant="red" label="PERMANENT SHELTER" title="Housing Initiative – Shelter for the Homeless"
          meta={["Completed — 60+ Houses", "In Progress — 25 Under Construction", "Unit Size — 600–1000 sq.ft"]}
          body="More than 50 permanent homes constructed for homeless families, with 25 currently under development. Each home is designed for durable, long-term habitation — a shift from short-term relief to sustainable rehabilitation."
        />
        <Card variant="white" label="2013 · REPATRIATION" title="Nitaqat Charter Flight Initiative"
          meta={["Impact — 100+ Flight Tickets Sponsored", "Route — Dammam to Nedumbassery"]}
          body="During the Saudi Nitaqat labour law crisis, the Trust sponsored a chartered flight for more than 100 affected expatriates — enabling immediate repatriation and family reunification during a period of severe employment instability."
        />
      </div>
      <div className="grid md:grid-cols-2 gap-[20px]">
        <Card variant="dark" label="NORKA COLLABORATION" title="Swapnasafalyam – Repatriation & Reintegration Support"
          body={[
            "For Malayali expatriates who had completed prison sentences abroad but lacked the means to return, the Trust partnered with NORKA to sponsor return travel and coordinate with authorities for safe, dignified repatriation.",
            "The program facilitated multiple family reunifications and addressed a humanitarian gap often overlooked in expatriate welfare.",
          ]}
        />
        <Card variant="white" label="REHABILITATION SUPPORT" title="Individual Rehabilitation & Livelihood Support"
          body={[
            "In cases of severe physical trauma resulting in limb loss, the Trust sponsored advanced prosthetic solutions — enabling individuals to regain mobility, continue education, and restore independence.",
            "Beyond emergency relief, the Trust has also supported livelihood-oriented interventions for economically vulnerable families — enabling income generation, reducing dependency, and promoting self-sufficiency.",
          ]}
        />
      </div>
    </div>
  ),

  // 3 — Youth & Sports
  () => (
    <div className="pb-[30px]">
      <div className="grid md:grid-cols-3 gap-[20px]">
        <Card variant="red" label="NATIONAL SCHOOLS GAMES" title="Athlete Support Program"
          meta={["Support — 36+ Athletes Supported"]}
          body="International-quality sports kits distributed to more than 36 athletes who qualified for the National Schools Games — reducing resource barriers that hinder competitive progression."
        >
          <div className="mt-4">
            <p className="text-[11px] uppercase text-white/60 mb-2">Recognised Athletes</p>
            <ul className="text-[13px] space-y-2 list-disc pl-4 marker:text-white">
              <li>P.U. Chithra — National Gold Medalist</li>
              <li>Mohammed Asal — National Gold Medalist</li>
            </ul>
          </div>
        </Card>
        <Card variant="white" label="PROFESSIONAL SPORTS" title="Support for Professional Athletes"
          body="The Trust extended support to Diljith T.S., Indian motor racing and karting champion — assisting his participation in competitive circuits and strengthening pathways from regional talent to national-level professional sport."
        />
        <Card variant="dark" label="2015 · 2026 MILESTONE" title="EASE & The ERAM Sports Arena"
          body={[
            "In 2015, the ERAM Academy for Sports & Excellence (EASE) was established to integrate sports training within formal academics. In 2026, the Trust advances this vision further with the development of the ERAM Sports Arena.",
            "Designed to host institutional competitions and external sporting events, the Arena marks a significant milestone in integrating sports excellence within the educational ecosystem.",
          ]}
        />
      </div>
    </div>
  ),

  // 4 — Environment
  () => (
    <div className="pb-[30px]">
      <div className="font-rethink rounded-2xl border border-black/10 bg-white/40 p-[28px] mb-[20px] grid md:grid-cols-2 gap-[40px]">
        <div>
          <span className="text-[11px] uppercase text-[#8B1E1E]">MANKARA · KOTTAYI PANCHAYATS</span>
          <h3 className="mt-3 font-serif text-[18px]">Bharathapuzha Shutter Restoration</h3>
          <div className="mt-3 text-[13px] text-black/60 space-y-1">
            <p><strong>Location</strong> — Mankara–Kottayi Panchayats, Palakkad</p>
            <p><strong>Impact</strong> — Structural intervention for river water retention</p>
          </div>
          <p className="mt-4 text-[14px] text-black/70 leading-[1.7]">
            Bharathapuzha — Kerala's second-longest river — sustained critical damage to wooden
            causeway shutters, weakening water retention and reducing river levels. The Trust
            replaced deteriorated wooden shutters with durable iron structures, restoring
            controlled water retention and reinforcing ecological resilience in the region.
          </p>
        </div>
        <div className="rounded-xl bg-[#E9E1D6] p-[20px] h-fit">
          <span className="text-[11px] uppercase text-black/50">ENVIRONMENTAL SCOPE</span>
          <ul className="mt-3 space-y-2 text-[13px] list-disc pl-4 marker:text-[#8B1E1E] text-black/70">
            <li>Iron shutter replacement for structural integrity</li>
            <li>Coordination with local panchayat bodies</li>
            <li>Restored controlled water retention</li>
            <li>Long-term ecological resilience strengthened</li>
          </ul>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-[20px]">
        <Card variant="red" label="PALAKKAD REGION" title="Drinking Water Infrastructure"
          body="A structured, end-to-end water infrastructure program ensuring sustained access to safe drinking water across rural Palakkad — from source creation to household-level connectivity."
          list={["Construction of over 180 wells", "Borewell drilling in water-scarce areas", "Elevated water storage tanks built", "Plumbing networks & household connectivity"]}
          badge={{ value: "180+", label: "Wells constructed across communities" }}
        />
        <Card variant="white" label="PALAKKAD REGION" title="Multiple Check Dams Constructed"
          meta={["Impact — Strengthened water retention"]}
          body={[
            "To improve groundwater recharge and regulate seasonal flow, the Trust supported the construction of multiple check dams across vulnerable stretches — retaining monsoon runoff and improving soil moisture for surrounding agricultural communities.",
            "By focusing on decentralized water retention, the initiative strengthened long-term ecological stability and agricultural resilience.",
          ]}
        />
      </div>
    </div>
  ),

  // 5 — Community
  () => (
    <div className="pb-[30px]">
      <div className="grid md:grid-cols-3 gap-[20px]">
        <Card variant="white" label="PALAKKAD DISTRICT" title="Ambulance Sponsorship Initiative"
          body={[
            "The Trust sponsored ambulances for deployment across panchayats and NGOs in Palakkad, strengthening emergency response systems and reducing response time to tertiary care facilities.",
            "The initiative reinforced the essential link between rural communities and emergency healthcare.",
          ]}
        />
        <Card variant="red" label="KERALA ODF INITIATIVE" title="Toilet Construction Aid – Sanitation Infrastructure"
          meta={["Families — 242 BPL families supported", "Districts — 5 Panchayats, Palakkad", "Collaboration — Kerala Govt. ODF Program"]}
          body="Financial assistance to 242 Below Poverty Line families for household toilet construction — directly strengthening sanitation access while aligning with statewide public health goals."
        />
        <Card variant="dark" label="SOCIAL COHESION" title="Interreligious Harmony & Social Cohesion Initiatives"
          meta={["Format — Multi-community engagement platforms"]}
          body={[
            "Through dialogue platforms, collaborative community events, and inclusive institutional policies, the Trust has fostered environments where diversity is respected and mutual understanding is encouraged.",
            "These initiatives reinforce the Trust's belief that education and welfare must operate within socially stable and inclusive ecosystems.",
          ]}
        />
      </div>
    </div>
  ),
];

const pillars = [
  { num: "01", label: "PILLAR ONE",   title: "Education",                          subtitle: "Expanding Access Through Structured Institutions" },
  { num: "02", label: "PILLAR TWO",   title: "Health & Sanitation",                subtitle: "Preventive Care and Sustainable Public Health Solutions" },
  { num: "03", label: "PILLAR THREE", title: "Humanitarian & Rehabilitation",       subtitle: "Direct & Structured Intervention During Social Crisis" },
  { num: "04", label: "PILLAR FOUR",  title: "Youth & Sports",                     subtitle: "Structured Support for Competitive Potential" },
  { num: "05", label: "PILLAR FIVE",  title: "Environment",                        subtitle: "Water Conservation & Ecological Responsibility" },
  { num: "06", label: "PILLAR SIX",   title: "Community Infrastructure & Welfare", subtitle: "System-Based Community Support — Strengthening Civic Systems" },
];

// ─── Main component ─────────────────────────────────────────────────
export default function EducationSection({ active, setActive }) {
  return (
    <section className="bg-[#F5EFE8] pt-[80px] pb-[80px]">
      <div className="max-w-[1100px] mx-auto px-[20px]">
        {pillars.map((p, i) => {
          const Panel = panels[i];
          return (
            <div key={i} id={`pillar-${i + 1}`}>
              <PillarHeader
                {...p}
                active={active === i}
                onClick={() => setActive(active === i ? null : i)}
              />
              {active === i && <Panel />}
            </div>
          );
        })}
      </div>
    </section>
  );
}