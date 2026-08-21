"use client";
import { useEffect, useState, useCallback } from "react";
import { Bell } from "lucide-react";
import api from "@/lib/api";
import { startPageTransition } from "@/lib/pageTransition";

const LAST_SEEN_KEY = "eram_last_seen_notifications";
const POLL_INTERVAL = 3 * 60 * 1000; // 3 mins

export default function NotificationBell() {
  const [hasUnread, setHasUnread] = useState(false);
  const [latestTimestamp, setLatestTimestamp] = useState<string | null>(null);

  const checkUnread = useCallback(async () => {
    try {
      const { data } = await api.get("/events/latest-timestamp");
      if (!data.latestTimestamp) return;

      setLatestTimestamp(data.latestTimestamp);
      const lastSeen = localStorage.getItem(LAST_SEEN_KEY);
      const lastSeenTime = lastSeen ? new Date(lastSeen).getTime() : 0;
      const latestTime = new Date(data.latestTimestamp).getTime();

      setHasUnread(latestTime > lastSeenTime);
    } catch (err) {
      console.error("Failed to check notifications:", err);
    }
  }, []);

  useEffect(() => {
    checkUnread();

    const interval = setInterval(() => {
      if (document.visibilityState === "visible") checkUnread();
    }, POLL_INTERVAL);

    // Cross-tab sync — vere tab il mark-seen cheythaal ivideyum reflect aavum
    const handleStorage = (e: StorageEvent) => {
      if (e.key === LAST_SEEN_KEY) checkUnread();
    };
    window.addEventListener("storage", handleStorage);

    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", handleStorage);
    };
  }, [checkUnread]);

  const handleClick = () => {
    if (latestTimestamp) {
      localStorage.setItem(LAST_SEEN_KEY, latestTimestamp);
    }
    setHasUnread(false);
    startPageTransition("/events");
  };

  return (
    <button
      onClick={handleClick}
      className="relative cursor-pointer rounded-full h-[42px] w-[42px] flex items-center justify-center bg-white border border-black/15 hover:border-[#ae1431]/40 transition-colors duration-200"
      aria-label="Notifications"
    >
      <Bell size={18} className="text-[#111111]" />
      {hasUnread && (
        <span className="absolute right-2 top-2 flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ae1431] opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#ae1431]" />
        </span>
      )}
    </button>
  );
}