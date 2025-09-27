'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { loadingController } from '@/lib/loadingController';

export default function Loading() {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchParamsKey = searchParams?.toString();
  const incrementTimer = useRef<number | null>(null);
  const hideTimer = useRef<number | null>(null);

  const clearIncrementTimer = useCallback(() => {
    if (incrementTimer.current !== null) {
      window.clearInterval(incrementTimer.current);
      incrementTimer.current = null;
    }
  }, []);

  const clearHideTimer = useCallback(() => {
    if (hideTimer.current !== null) {
      window.clearTimeout(hideTimer.current);
      hideTimer.current = null;
    }
  }, []);

  const startProgress = useCallback(() => {
    clearHideTimer();
    clearIncrementTimer();

    setIsVisible(true);
    setProgress(0);

    requestAnimationFrame(() => {
      setProgress(18);
    });

    incrementTimer.current = window.setInterval(() => {
      setProgress((prev) => {
        if (prev >= 85) {
          clearIncrementTimer();
          return prev;
        }
        const next = prev + Math.random() * 10;
        return Math.min(next, 90);
      });
    }, 250);
  }, [clearHideTimer, clearIncrementTimer]);

  const finishProgress = useCallback(() => {
    clearIncrementTimer();
    setProgress(100);

    clearHideTimer();
    hideTimer.current = window.setTimeout(() => {
      setIsVisible(false);
      setProgress(0);
    }, 200);
  }, [clearIncrementTimer, clearHideTimer]);

  useEffect(() => {
    const unsubscribe = loadingController.subscribe(({ active }) => {
      if (active) {
        startProgress();
      } else {
        finishProgress();
      }
    });

    return () => {
      unsubscribe();
      clearIncrementTimer();
      clearHideTimer();
    };
  }, [startProgress, finishProgress, clearIncrementTimer, clearHideTimer]);

  useEffect(() => {
    loadingController.hide();
  }, [pathname, searchParamsKey]);

  useEffect(() => {
    const handleLinkClick = (event: MouseEvent) => {
      if (event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const target = event.target as HTMLElement | null;
      const link = target?.closest('a');
      if (!link) return;

      const href = link.getAttribute('href');
      if (!href || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('#')) {
        return;
      }

      loadingController.show();
    };

    document.addEventListener('click', handleLinkClick, true);
    return () => document.removeEventListener('click', handleLinkClick, true);
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999]">
      <div className="h-1 bg-gray-200/60 overflow-hidden">
        <div
          className="h-full transition-[width] duration-200 ease-out"
          style={{
            width: `${progress}%`,
            backgroundImage:
              'repeating-linear-gradient(90deg, #45A091 0, #45A091 12px, rgba(69, 160, 145, 0.3) 12px, rgba(69, 160, 145, 0.3) 24px)',
            backgroundSize: '24px 100%',
          }}
        />
      </div>
    </div>
  );
}