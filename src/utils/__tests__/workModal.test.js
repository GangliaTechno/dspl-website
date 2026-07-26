import { describe, expect, it, vi } from 'vitest';
import { openWorkModal, WORK_MODAL_EVENT } from '../workModal';

describe('openWorkModal', () => {
  it('dispatches one named event with its source', () => {
    const listener = vi.fn();
    window.addEventListener(WORK_MODAL_EVENT, listener);

    openWorkModal('homepage-hero');

    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener.mock.calls[0][0].detail).toEqual({
      source: 'homepage-hero',
    });

    window.removeEventListener(WORK_MODAL_EVENT, listener);
  });
});
