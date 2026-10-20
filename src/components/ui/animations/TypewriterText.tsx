"use client";

import { useState, useEffect, useRef } from "react";

interface TypewriterTextProps {
  text: string;
  speed?: number;
  start?: boolean;
  onComplete?: () => void;
  ariaLabel?: string;
  className?: string;
}

export function TypewriterText({
  text,
  speed = 30,
  start = true,
  onComplete,
  ariaLabel,
  className,
}: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    if (!start) {
      const resetTimer = setTimeout(() => {
        setDisplayedText("");
        setShowCursor(false);
      }, 0);
      return () => clearTimeout(resetTimer);
    }

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      const reduceTimer = setTimeout(() => {
        setDisplayedText(text);
        if (onCompleteRef.current) onCompleteRef.current();
      }, 0);
      return () => clearTimeout(reduceTimer);
    }

    let i = 0;
    const startTimer = setTimeout(() => {
      setShowCursor(true);
      setDisplayedText("");

      const typeChar = () => {
        if (i < text.length) {
          setDisplayedText(text.substring(0, i + 1));
          i++;
          timerRef.current = setTimeout(typeChar, speed);
        } else {
          if (onCompleteRef.current) onCompleteRef.current();
          timerRef.current = setTimeout(() => {
            setShowCursor(false);
          }, 400);
        }
      };

      timerRef.current = setTimeout(typeChar, speed);
    }, 0);

    return () => {
      clearTimeout(startTimer);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [text, speed, start]);

  return (
    <span className={className}>
      <span className="sr-only">{ariaLabel || text}</span>
      <span aria-hidden="true">
        {displayedText}
        {showCursor && (
          <span className="inline-block w-[0.1em] h-[0.9em] bg-current ml-[0.05em] align-middle animate-pulse" />
        )}
      </span>
    </span>
  );
}
