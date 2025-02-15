import React, { useState, useRef } from 'react';
import axios from 'axios';
import Webcam from 'react-webcam';
import { Mic, Camera, MessageSquare, Loader2 } from 'lucide-react';

const API_URL = 'http://localhost:5001';

interface MoodInputProps {
  onMoodDetected: (mood: string) => void;
}

export const MoodInput: React.FC<MoodInputProps> = ({ onMoodDetected }) => {
  const [text, setText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const webcamRef = useRef<Webcam>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const analyzeText = async () => {
    if (!text.trim()) return;
    setIsLoading(true);
    try {
      const response = await axios.post(`${API_URL}/analyze_text`, { text });
      onMoodDetected(response.data.emotion);
    } catch (error) {
      console.error('Error analyzing text:', error);
    }
    setIsLoading(false);
    setText('');
  };

  const startRecording = () => {
    setIsRecording(true);
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        mediaRecorderRef.current = new MediaRecorder(stream);
        mediaRecorderRef.current.ondataavailable = (e) => {
          chunksRef.current.push(e.data);
        };
        mediaRecorderRef.current.onstop = async () => {
          const audioBlob = new Blob(chunksRef.current, { type: 'audio/wav' });
          const formData = new FormData();
          formData.append('audio', audioBlob);
          
          setIsLoading(true);
          try {
            const response = await axios.post(`${API_URL}/analyze_speech`, formData);
            onMoodDetected(response.data.emotion);
          } catch (error) {
            console.error('Error analyzing speech:', error);
          }
          setIsLoading(false);
          chunksRef.current = [];
        };
        mediaRecorderRef.current.start();
      });
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  const captureImage = async () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        const blob = await fetch(imageSrc).then(res => res.blob());
        const formData = new FormData();
        formData.append('image', blob);

        setIsLoading(true);
        try {
          const response = await axios.post(`${API_URL}/analyze_face`, formData);
          onMoodDetected(response.data.emotion);
        } catch (error) {
          console.error('Error analyzing face:', error);
        }
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow-md">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-800">Mood Detection</h2>
        
        {/* Text Analysis */}
        <div className="space-y-2">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="How are you feeling today?"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            rows={3}
          />
          <button
            onClick={analyzeText}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            <MessageSquare size={20} />
            Analyze Text
          </button>
        </div>

        {/* Voice Analysis */}
        <div>
          <button
            onClick={isRecording ? stopRecording : startRecording}
            className={`flex items-center gap-2 px-4 py-2 ${
              isRecording ? 'bg-red-600' : 'bg-green-600'
            } text-white rounded-lg hover:opacity-90`}
          >
            <Mic size={20} />
            {isRecording ? 'Stop Recording' : 'Start Recording'}
          </button>
        </div>

        {/* Face Analysis */}
        <div className="space-y-2">
          <div className="relative">
            <Webcam
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="w-full rounded-lg"
            />
          </div>
          <button
            onClick={captureImage}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
          >
            <Camera size={20} />
            Analyze Face
          </button>
        </div>
      </div>

      {isLoading && (
        <div className="flex items-center justify-center">
          <Loader2 className="animate-spin" size={24} />
        </div>
      )}
    </div>
  );
};