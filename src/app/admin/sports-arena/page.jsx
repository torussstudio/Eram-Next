'use client';

import { useEffect, useState, useCallback } from 'react';
import {
  Mail,
  Phone,
  User,
  Building2,
  CalendarDays,
  Clock,
  Users,
  MapPin,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  X,
} from 'lucide-react';
import api from '@/lib/api';

const STATUSES = [
  { id: 'pending', label: 'Pending' },
  { id: 'reviewed', label: 'Reviewed' },
  { id: 'approved', label: 'Approved' },
  { id: 'rejected', label: 'Rejected' },
];

const STATUS_COLORS = {
  pending: '#a15c2e',
  reviewed: '#3f5f8b',
  approved: '#3f6b52',
  rejected: '#ae1431',
};

const DURATION_LABELS = {
  'one-day': 'One Day',
  'multi-day': 'Multi Day',
  recurring: 'Recurring',
};

function formatDate(d) {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export default function AdminHostEventPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [selected, setSelected] = useState(null);
  const [updating, setUpdating] = useState(false);

  const [toasts, setToasts] = useState([]);
  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  }, []);
  function dismissToast(id) {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }

  const fetchItems = () => {
    setLoading(true);
    api
      .get('/host-event')
      .then(({ data }) => setItems(data))
      .catch((err) => console.error('Failed to fetch host event requests:', err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const counts = STATUSES.reduce((acc, s) => {
    acc[s.id] = items.filter((i) => i.status === s.id).length;
    return acc;
  }, {});

  const visibleItems =
    activeTab === 'all' ? items : items.filter((i) => i.status === activeTab);

  const updateStatus = async (id, status) => {
    setUpdating(true);
    try {
      const { data } = await api.patch(`/host-event/${id}/status`, { status });
      setItems((prev) => prev.map((i) => (i._id === id ? { ...i, status } : i)));
      setSelected((prev) => (prev && prev._id === id ? { ...prev, status } : prev));
      showToast('Status updated', 'success');
      return data;
    } catch (err) {
      console.error(err);
      showToast('Update failed. Try again.', 'error');
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5EFE8]">
      <div className="mx-auto w-full min-w-0 max-w-6xl px-4 sm:px-6 py-8 sm:py-10">
        <h1 className="text-2xl sm:text-3xl font-display text-[#2b2620]">Host Event Requests</h1>
        <p className="mt-1 text-sm sm:text-base font-rethink text-[#8a7f6f]">
          Review and manage event hosting submissions.
        </p>

        {/* Status tabs */}
        <div className="mt-8 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none]">
          <button
            onClick={() => setActiveTab('all')}
            className={`shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-rethink font-medium transition-colors cursor-pointer ${
              activeTab === 'all'
                ? 'border-[#2b2620] bg-[#2b2620] text-white'
                : 'border-[#e3d6c3] bg-white text-[#8a7f6f] hover:border-[#2b2620]/30 hover:text-[#2b2620]'
            }`}
          >
            All <span className="opacity-70">({items.length})</span>
          </button>
          {STATUSES.map((s) => {
            const active = activeTab === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setActiveTab(s.id)}
                className={`shrink-0 flex items-center cursor-pointer gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-rethink font-medium transition-colors ${
                  active ? 'border-transparent text-white' : 'border-[#e3d6c3] bg-white text-[#8a7f6f] hover:text-[#2b2620]'
                }`}
                style={active ? { backgroundColor: STATUS_COLORS[s.id] } : { borderColor: '#e3d6c3' }}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: active ? '#fff' : STATUS_COLORS[s.id] }}
                />
                {s.label} <span className="opacity-70">({counts[s.id] || 0})</span>
              </button>
            );
          })}
        </div>

        {/* List */}
        <div className="mt-6">
          {loading ? (
            <p className="font-rethink text-sm text-[#8a7f6f]">Loading requests…</p>
          ) : visibleItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-[#e3d6c3] bg-white/50 py-16 text-center">
              <AlertCircle size={22} className="text-[#b5aa98]" />
              <p className="font-rethink text-sm text-[#8a7f6f]">No requests in this category yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {visibleItems.map((item) => (
                <button
                  key={item._id}
                  onClick={() => setSelected(item)}
                  className="group text-left overflow-hidden rounded-xl border border-[#e3d6c3] bg-white p-4 shadow-[0_1px_2px_rgba(43,38,32,0.04)] transition-shadow hover:shadow-[0_8px_24px_rgba(43,38,32,0.08)] cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-rethink text-sm font-semibold text-[#2b2620] leading-snug">
                      {item.eventName}
                    </p>
                    <span
                      className="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-rethink font-semibold uppercase tracking-wide text-white"
                      style={{ backgroundColor: STATUS_COLORS[item.status] }}
                    >
                      {item.status}
                    </span>
                  </div>
                  <p className="mt-1 font-rethink text-xs text-[#8a7f6f]">
                    {item.sport} · {item.eventType}
                  </p>
                  <div className="mt-3 space-y-1 font-rethink text-xs text-[#8a7f6f]">
                    <p className="flex items-center gap-1.5">
                      <User size={12} /> {item.fullName}
                      {item.organisation ? ` · ${item.organisation}` : ''}
                    </p>
                    <p className="flex items-center gap-1.5">
                      <CalendarDays size={12} /> {formatDate(item.preferredDate)}
                    </p>
                    <p className="flex items-center gap-1.5">
                      <Users size={12} /> {item.expectedParticipants} participants
                    </p>
                  </div>
                  <p className="mt-3 text-[11px] font-rethink text-[#b5aa98]">
                    Submitted {formatDate(item.createdAt)}
                  </p>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Detail modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#2b2620]/50 backdrop-blur-sm px-4 py-8">
          <div className="w-full max-w-2xl max-h-full overflow-y-auto rounded-xl border border-[#e3d6c3] bg-white p-6 shadow-[0_8px_24px_rgba(43,38,32,0.12)]">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-display text-xl text-[#2b2620]">{selected.eventName}</h3>
                <span
                  className="mt-2 inline-block rounded-full px-2.5 py-1 text-[10px] font-rethink font-semibold uppercase tracking-wide text-white"
                  style={{ backgroundColor: STATUS_COLORS[selected.status] }}
                >
                  {selected.status}
                </span>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="rounded-full p-1.5 text-[#8a7f6f] hover:bg-[#F5EFE8] cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Section title="Contact">
                <Row icon={User} label={selected.fullName} />
                {selected.organisation && <Row icon={Building2} label={selected.organisation} />}
                <Row icon={Mail} label={selected.email} />
                <Row icon={Phone} label={selected.phone} />
                {selected.role && <Row icon={User} label={selected.role} />}
              </Section>

              <Section title="Event">
                <Row label={`Type: ${selected.eventType}`} />
                <Row label={`Sport: ${selected.sport}`} />
                <Row icon={Users} label={`${selected.expectedParticipants} participants`} />
                {selected.expectedAudience && (
                  <Row icon={Users} label={`${selected.expectedAudience} audience (est.)`} />
                )}
              </Section>

              <Section title="Schedule">
                <Row icon={CalendarDays} label={`Preferred: ${formatDate(selected.preferredDate)}`} />
                {selected.alternativeDate && (
                  <Row icon={CalendarDays} label={`Alternative: ${formatDate(selected.alternativeDate)}`} />
                )}
                <Row icon={Clock} label={`${selected.startTime} – ${selected.endTime}`} />
                <Row label={`Duration: ${DURATION_LABELS[selected.duration] || selected.duration}`} />
                {selected.duration === 'multi-day' && selected.endDate && (
                  <Row icon={CalendarDays} label={`Ends: ${formatDate(selected.endDate)}`} />
                )}
              </Section>

              <Section title="Venue">
                {selected.facilities?.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5">
                    {selected.facilities.map((f) => (
                      <span
                        key={f}
                        className="flex items-center gap-1 rounded-full border border-[#e3d6c3] px-2 py-0.5 text-[11px] font-rethink text-[#2b2620]"
                      >
                        <MapPin size={10} /> {f}
                      </span>
                    ))}
                  </div>
                ) : (
                  <Row label="No facilities specified" />
                )}
                {selected.additionalDetails && (
                  <p className="mt-2 font-rethink text-xs text-[#8a7f6f]">{selected.additionalDetails}</p>
                )}
              </Section>

              {(selected.hearAboutUs || selected.specificRequests) && (
                <Section title="Additional Info" full>
                  {selected.hearAboutUs && (
                    <Row label={`Heard about us via: ${selected.hearAboutUs}`} />
                  )}
                  {selected.specificRequests && (
                    <div className="mt-1 flex gap-1.5 font-rethink text-xs text-[#2b2620]">
                      <MessageSquare size={13} className="shrink-0 mt-0.5 text-[#8a7f6f]" />
                      <span>{selected.specificRequests}</span>
                    </div>
                  )}
                </Section>
              )}
            </div>

            <p className="mt-6 text-[11px] font-rethink text-[#b5aa98]">
              Submitted {formatDate(selected.createdAt)}
            </p>

            {/* Status actions */}
            <div className="mt-6 flex flex-wrap gap-2 border-t border-[#e3d6c3] pt-5">
              {STATUSES.filter((s) => s.id !== selected.status).map((s) => (
                <button
                  key={s.id}
                  disabled={updating}
                  onClick={() => updateStatus(selected._id, s.id)}
                  className="rounded-md cursor-pointer border border-[#e3d6c3] px-3.5 py-2 text-xs font-rethink font-medium text-[#2b2620] transition-colors hover:border-[#ae1431]/40 disabled:cursor-not-allowed disabled:opacity-50"
                  style={{ color: STATUS_COLORS[s.id] }}
                >
                  Mark as {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Toast container */}
      <div className="fixed bottom-5 right-5 z-[100] flex flex-col items-end gap-2.5 pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            onClick={() => dismissToast(t.id)}
            className="pointer-events-auto flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-[0_10px_30px_rgba(43,38,32,0.25)] cursor-pointer max-w-xs"
            style={{ backgroundColor: t.type === 'error' ? '#ae1431' : '#3f6b52', color: '#ffffff' }}
          >
            {t.type === 'error' ? <AlertCircle size={16} className="shrink-0" /> : <CheckCircle2 size={16} className="shrink-0" />}
            <span className="text-[13px] font-rethink font-medium leading-snug">{t.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Section({ title, children, full }) {
  return (
    <div className={full ? 'sm:col-span-2' : ''}>
      <p className="text-[10px] font-rethink font-semibold uppercase tracking-wide text-[#b5aa98]">
        {title}
      </p>
      <div className="mt-1.5 space-y-1">{children}</div>
    </div>
  );
}

function Row({ icon: Icon, label }) {
  return (
    <p className="flex items-center gap-1.5 font-rethink text-xs text-[#2b2620]">
      {Icon && <Icon size={12} className="text-[#8a7f6f] shrink-0" />}
      {label}
    </p>
  );
}