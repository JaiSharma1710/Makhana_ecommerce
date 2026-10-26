export type KhaoBetterModal = "waitlist" | "reward-wheel";

export const modalChangeEvent = "khao-better:modal-change";

export function getActiveModal(): KhaoBetterModal | null {
  if (typeof document === "undefined") return null;
  const value = document.documentElement.dataset.khaoBetterModal;
  return value === "waitlist" || value === "reward-wheel" ? value : null;
}

export function claimModal(modal: KhaoBetterModal) {
  if (typeof document === "undefined") return false;
  const active = getActiveModal();
  if (active && active !== modal) return false;
  document.documentElement.dataset.khaoBetterModal = modal;
  document.dispatchEvent(new CustomEvent(modalChangeEvent, { detail: modal }));
  return true;
}

export function releaseModal(modal: KhaoBetterModal) {
  if (typeof document === "undefined") return;
  if (getActiveModal() !== modal) return;
  delete document.documentElement.dataset.khaoBetterModal;
  document.dispatchEvent(new CustomEvent(modalChangeEvent, { detail: null }));
}
