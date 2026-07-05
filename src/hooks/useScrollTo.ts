export function useScrollTo() {
  return (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const nav = document.getElementById("navbar");
    const offset = nav ? nav.offsetHeight + 8 : 72;
    window.scrollTo({
      top: el.getBoundingClientRect().top + window.scrollY - offset,
      behavior: "smooth",
    });
  };
}