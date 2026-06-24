export const startPageTransition = (path: string) => {
  window.dispatchEvent(
    new CustomEvent("eram-page-transition", { detail: { path } })
  );
};