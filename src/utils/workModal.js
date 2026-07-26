export const WORK_MODAL_EVENT = 'dspl:open-work-modal';

export function openWorkModal(source = 'unspecified') {
  window.dispatchEvent(
    new CustomEvent(WORK_MODAL_EVENT, { detail: { source } }),
  );
}
