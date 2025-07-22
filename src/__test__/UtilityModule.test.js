import { describe, it, expect, beforeEach, vi } from 'vitest';
import UtilityModule from '../js-components/UtilityModule.js';

let root = null;

beforeEach(() => {
  document.body.innerHTML = `<div id="root"></div>`;
  UtilityModule.rootDiv = document.querySelector('#root');
  root = UtilityModule.rootDiv;
});

describe('UtilityModule.js', () => {
  describe('createElement()', () => {
    it('should create an element with class and append to parent', () => {
      const parent = document.createElement('div');
      const element = UtilityModule.createElement(
        'div',
        parent,
        'Hello',
        'test-class'
      );
      expect(element).toBeInstanceOf(HTMLDivElement);
      expect(element.classList.contains('test-class')).toBe(true);
      expect(element.textContent).toBe('Hello');
      expect(parent.contains(element)).toBe(true);
    });
    it('createElement() should handle missing texts and classNames gracefully', () => {
      const parent = document.createElement('div');
      const el = UtilityModule.createElement('span', parent);
      expect(el).toBeInstanceOf(HTMLSpanElement);
      expect(el.textContent).toBe('');
      expect(el.classList.length).toBe(0);
    });
  });

  describe('activityMsg()', () => {
    it('should create activity message box with correct structure and text', () => {
      const message = 'Test message';
      UtilityModule.activityMsg(message);

      const activityMsg = root.querySelector('.activity-msg-box');
      const closeBtn = root.querySelector('.activity-close-btn');
      const closeImg = root.querySelector('.activity-close-btn img');
      const msgPara = root.querySelector('.msg-para');

      expect(activityMsg).toBeTruthy();
      expect(closeBtn).toBeTruthy();
      expect(closeImg).toBeTruthy();
      expect(msgPara).toBeTruthy();
      expect(msgPara.textContent).toBe(message);
    });

    it('should remove activityMsg on close button click', () => {
      UtilityModule.activityMsg('Click to close');
      const closeBtn = root.querySelector('.activity-close-btn');
      closeBtn.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      expect(root.querySelector('.activity-msg-box')).toBeNull();
    });

    it('should auto-remove activityMsg after 6000ms', () => {
      vi.useFakeTimers();

      UtilityModule.activityMsg('Auto-dismiss test');
      expect(root.querySelector('.activity-msg-box')).toBeTruthy();

      vi.advanceTimersByTime(5999);
      expect(root.querySelector('.activity-msg-box')).toBeTruthy();

      vi.advanceTimersByTime(1);
      expect(root.querySelector('.activity-msg-box')).toBeNull();

      vi.useRealTimers();
    });
    it('should allow multiple activityMsg() calls and remove them independently', () => {
      vi.useFakeTimers();
      UtilityModule.activityMsg('Msg 1');
      UtilityModule.activityMsg('Msg 2');
      expect(root.querySelectorAll('.activity-msg-box').length).toBe(2);
      vi.advanceTimersByTime(6000);
      expect(root.querySelectorAll('.activity-msg-box').length).toBe(0);
      vi.useRealTimers();
    });
  });
});
