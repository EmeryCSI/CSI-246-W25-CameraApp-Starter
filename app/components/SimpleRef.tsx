"use client";

import React, { useRef, useState } from "react";

/**
 * AudioPlayer Component
 *
 * This component demonstrates a fundamental use case for useRef: controlling HTML media elements.
 *
 * What is useRef?
 * - useRef is a React Hook that provides a way to create a mutable reference that persists
 *   across component re-renders
 * - Unlike state variables, updating a ref doesn't cause a re-render
 * - useRef returns an object with a .current property that can hold any value
 *
 * Why do we need useRef here?
 * 1. Direct DOM Access: We need to directly control the audio element using methods like
 *    play() and pause(). React's declarative state management isn't sufficient for this.
 * 2. Persistence: The reference to the audio element needs to persist between renders
 * 3. Performance: Using state to store the audio element would cause unnecessary re-renders
 */
const AudioPlayer = () => {
  // Create a ref to store the audio element
  // The type HTMLAudioElement tells TypeScript this ref will point to an audio element
  // null is the initial value before the element is mounted
  const audioRef = useRef<HTMLAudioElement>(null);

  // State to track playing status - this SHOULD be state (not ref) because
  // we want the UI to re-render when it changes
  const [isPlaying, setIsPlaying] = useState(false);

  /**
   * Toggles play/pause state of the audio
   *
   * Why we need useRef here:
   * - We need to call .play() and .pause() directly on the audio element
   * - These are imperative commands that can't be handled through React's normal props/state
   * - audioRef.current gives us direct access to the DOM element
   */
  const togglePlay = () => {
    if (audioRef.current) {
      // Check if audio element exists
      if (isPlaying) {
        audioRef.current.pause(); // Direct DOM manipulation
      } else {
        audioRef.current.play(); // Direct DOM manipulation
      }
      setIsPlaying(!isPlaying); // Update state to trigger UI re-render
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      {/* 
        The ref attribute connects our audioRef to the actual audio element
        This is how React sets up the reference to the DOM element
        Once mounted, audioRef.current will point to this audio element
      */}
      <audio
        ref={audioRef}
        src="https://incompetech.com/music/royalty-free/mp3-royaltyfree/Monkeys%20Spinning%20Monkeys.mp3"
      />

      {/* 
        The button's appearance changes based on isPlaying state
        We use state here (not ref) because we want the UI to update
      */}
      <button
        onClick={togglePlay}
        className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center justify-center gap-2"
      >
        {isPlaying ? "⏸️ Pause" : "▶️ Play"}
      </button>

      <p className="mt-4 text-sm text-gray-600">
        Simple audio player using useRef to control the audio element.
      </p>
    </div>
  );
};

export default AudioPlayer;
