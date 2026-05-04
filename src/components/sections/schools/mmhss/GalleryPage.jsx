import { Drama, PartyPopper, Droplet, HeartPulse } from "lucide-react";

const galleryItems = [
  {
    title: "CULTURAL PROGRAMS",
    icon: Drama,
  },
  {
    title: "SCHOOL CELEBRATIONS",
    icon: PartyPopper,
  },
  {
    title: "NSS BLOOD DONATION",
    icon: Droplet,
  },
  {
    title: "COMMUNITY HEALTH DRIVES",
    icon: HeartPulse,
  },
];

export default function GalleryPage() {
  return (
    <div className=" bg-[#1f1f1f] text-white">
      {/* SECTION */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* HEADER */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs tracking-widest text-gray-400 uppercase">
                Gallery
              </span>
            </div>

            <p className="text-gray-400 max-w-xl">
              Cultural programs, school celebrations, NSS activities, and campus
              life at MMHSS.
            </p>
          </div>

          {/* GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-1">
            {galleryItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="relative h-[260px] border border-white/10 bg-[#2a2a2a] overflow-hidden group transition duration-300 hover:scale-[1.02]"
                >
                  {/* ICON */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-50">
                    <Icon size={36} />
                  </div>

                  {/* GRADIENT OVERLAY */}
                  <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/80 to-transparent"></div>

                  {/* TITLE */}
                  <div className="absolute bottom-4 left-4 text-sm tracking-wide text-gray-300">
                    {item.title}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
