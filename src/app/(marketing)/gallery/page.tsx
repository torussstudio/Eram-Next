// import GalleryClient from '@/components/sections/gallery/page';

// export default function GalleryPage() {
//   return <GalleryClient />;
// }


import { Suspense } from "react";
import GalleryClient from "@/components/sections/gallery/page";

export default function GalleryPage() {
  return (
    <Suspense fallback={null}>
      <GalleryClient />
    </Suspense>
  );
}