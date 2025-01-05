import { useEffect, useRef, useState } from "react";
import "../style.css"; // Ensure you have the associated CSS

const VideoCall = () => {
    const videoRef = useRef(null);
    const [isMicMuted, setIsMicMuted] = useState(false); // State to track microphone status
    const [isVideoOff, setIsVideoOff] = useState(false); // State to track video status
    const [mediaStream, setMediaStream] = useState(null); // Store media stream in state

    useEffect(() => {
        const startMedia = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: { aspectRatio: 16 / 9 },
                    audio: true,
                });
                setMediaStream(stream);
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (err) {
                console.error("Error accessing media devices:", err);
            }
        };

        startMedia();

        return () => {
            // Cleanup to stop tracks when the component unmounts
            if (mediaStream) {
                mediaStream.getTracks().forEach((track) => track.stop());
            }
        };
    }, []); // Empty dependency array ensures this runs only once

    // Function to toggle the microphone mute status
    const toggleMic = () => {
        const audioTrack = mediaStream?.getAudioTracks()[0];
        if (audioTrack) {
            audioTrack.enabled = !audioTrack.enabled; // Toggle the audio track
            setIsMicMuted(!audioTrack.enabled);
        }
    };

    // Function to toggle the video camera status
    const toggleVideo = () => {
        const videoTrack = mediaStream?.getVideoTracks()[0];
        if (videoTrack) {
            videoTrack.enabled = !videoTrack.enabled; // Toggle the video track
            setIsVideoOff(!videoTrack.enabled);
        }
    };

    return (
        <div className="video-container">
            <h1 className="video-title">Video and Audio Page</h1>
            <video
                ref={videoRef}
                autoPlay
                playsInline
                muted={isMicMuted} // Only mute the audio, not video
                className="video-stream"
            ></video>
            <p className="video-text">
                {isVideoOff ? "Video is off" : "Camera is active"}
                {isMicMuted ? " | Mic is muted" : " | Mic is active"}
            </p>

            <div className="controls">
                <button className="toggleBtn" onClick={toggleMic}>
                    {isMicMuted ? "Unmute Mic" : "Mute Mic"}
                </button>
                <button className="toggleBtn" onClick={toggleVideo}>
                    {isVideoOff ? "Turn On Video" : "Turn Off Video"}
                </button>
            </div>
        </div>
    );
};

export default VideoCall;

