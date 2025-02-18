"use client";

import { useEffect, useRef } from "react";

export default function WebcamCapture() {
  // We use useRef to maintain a reference to the video element in the DOM
  // Why useRef? Because we need a stable reference to the DOM element that persists
  // across re-renders without causing the component to re-render when it changes
  // current gives us the current value of the ref
  // current.srcObject is the actual video stream
  const videoRef = useRef<HTMLVideoElement>(null);

  // This effect runs once when the component mounts
  useEffect(() => {
    // Function to start the webcam
    const startVideo = async () => {
      try {
        // Request access to the user's webcam
        // The getUserMedia API returns a stream when the user grants permission
        // The stream contains the video and audio tracks
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });

        // Here's why we need useRef:
        // 1. We need to set the srcObject property on the actual DOM element
        // 2. This reference needs to persist between renders
        // 3. Changing the ref value doesn't cause a re-render (unlike state)
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing webcam:", error);
      }
    };

    startVideo();

    // Cleanup: Stop the webcam when component unmounts
    return () => {
      const stream = videoRef.current?.srcObject as MediaStream;
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []); // Empty dependency array means this runs once on mount

  return (
    <div className="flex justify-center">
      {/* The video element that we reference with useRef */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="min-h-[480px] min-w-[640px]"
      />
    </div>
  );
}
