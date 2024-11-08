import React, { useState, useRef, Dispatch, SetStateAction } from 'react';

export default function TimeInput({
  hours,
  minutes,
  period,
  setHours,
  setMinutes,
  setPeriod,
}: {
  hours: string;
  minutes: string;
  period: string;
  setHours: Dispatch<SetStateAction<string>>;
  setMinutes: Dispatch<SetStateAction<string>>;
  setPeriod: Dispatch<SetStateAction<string>>;
}) {
  const hoursRef = useRef<HTMLInputElement>(null);
  const minutesRef = useRef<HTMLInputElement>(null);
  const periodRef = useRef<HTMLInputElement>(null);
  function onTimeSelect(time: string) {
    console.log(time);
  }

  const validateHours = (value: string) => {
    const num = parseInt(value);
    if (num >= 1 && num <= 12) return true;
    return false;
  };

  const validateMinutes = (value: string) => {
    const num = parseInt(value);
    if (num >= 0 && num <= 59) return true;
    return false;
  };

  const handleHoursChange = (value: string) => {
    const sanitizedValue = value.replace(/[^0-9]/g, '');

    if (sanitizedValue.length === 2) {
      if (validateHours(sanitizedValue) && minutesRef.current) {
        setHours(sanitizedValue);
        minutesRef.current.focus();
      }
    } else {
      setHours(sanitizedValue);
    }
  };

  const handleMinutesChange = (value: string) => {
    const sanitizedValue = value.replace(/[^0-9]/g, '');

    if (sanitizedValue.length === 2) {
      if (validateMinutes(sanitizedValue) && periodRef.current) {
        setMinutes(sanitizedValue);
        periodRef.current.focus();
      }
    } else {
      setMinutes(sanitizedValue);
    }
  };

  const handlePeriodChange = (value: string) => {
    // Convert to uppercase for consistency
    const upperValue = value.toUpperCase();

    // Handle backspace/deletion
    if (value === '') {
      setPeriod('');
      return;
    }

    // Handle single character input (A or P)
    if (upperValue.length === 1) {
      if (upperValue === 'A' || upperValue === 'P') {
        setPeriod(upperValue === 'A' ? 'AM' : 'PM');
      }
      return;
    }

    // Handle two character input (AM or PM)
    if (upperValue === 'AM' || upperValue === 'PM') {
      setPeriod(upperValue);
      if (hours && minutes) {
        onTimeSelect(`${hours}:${minutes} ${upperValue}`);
      }
    }
  };

  const handleHoursBlur = () => {
    if (hours.length === 1) {
      setHours(`0${hours}`);
    }
  };

  const handleMinutesBlur = () => {
    if (minutes.length === 1) {
      setMinutes(`0${minutes}`);
    }
  };

  const handlePeriodKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace
    if (e.key === 'Backspace') {
      setPeriod('');
      return;
    }

    // Quick switch between AM/PM using arrow keys
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault();
      setPeriod((prev) => (prev === 'AM' ? 'PM' : 'AM'));
      if (hours && minutes) {
        onTimeSelect(`${hours}:${minutes} ${period === 'AM' ? 'PM' : 'AM'}`);
      }
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    currentRef: React.RefObject<HTMLInputElement>,
    previousRef: React.RefObject<HTMLInputElement> | null
  ) => {
    if (e.key === 'Backspace' && (e.target as HTMLInputElement).value === '') {
      e.preventDefault();
      if (previousRef && previousRef.current) {
        previousRef.current.focus();

        if (previousRef === hoursRef) {
          setHours('');
        } else if (previousRef === minutesRef) {
          setMinutes('');
        }
      }
    }
  };

  const handleHoursFocus = () => {
    if (hours.length === 1 && hoursRef.current) {
      hoursRef.current.setSelectionRange(1, 1);
    }
  };

  const handleMinutesFocus = () => {
    if (minutes.length === 1 && minutesRef.current) {
      minutesRef.current.setSelectionRange(1, 1);
    }
  };

  const inputStyle = `
    size-8
    text-center text-base 
    border-none outline-none ring-0
    focus:border-none focus:outline-none focus:ring-0 
    transition-all duration-200
    bg-inherit text-inherit placeholder:text-inherit
  `;

  return (
    <div
      className="flex flex-row items-center justify-center gap-1"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <input
        ref={hoursRef}
        type="text"
        value={hours}
        onChange={(e) => handleHoursChange(e.target.value)}
        onKeyDown={(e) => handleKeyDown(e, hoursRef, null)}
        onFocus={handleHoursFocus}
        onBlur={handleHoursBlur}
        className={inputStyle}
        maxLength={2}
        placeholder="HH"
        autoFocus
      />

      <span className="text-base">:</span>

      <input
        ref={minutesRef}
        type="text"
        value={minutes}
        onChange={(e) => handleMinutesChange(e.target.value)}
        onKeyDown={(e) => handleKeyDown(e, minutesRef, hoursRef)}
        onFocus={handleMinutesFocus}
        onBlur={handleMinutesBlur}
        className={inputStyle}
        maxLength={2}
        placeholder="MM"
      />

      <input
        ref={periodRef}
        type="text"
        value={period}
        onChange={(e) => handlePeriodChange(e.target.value)}
        onKeyDown={(e) => {
          handlePeriodKeyDown(e);
          handleKeyDown(e, periodRef, minutesRef);
        }}
        className={inputStyle}
        maxLength={2}
        placeholder="AM"
      />
    </div>
  );
}
