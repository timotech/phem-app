"use client";

import React, { useState, useRef } from "react";
//import Image from "next/image";
import {
  PlayCircle,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  Maximize2,
  BookOpen,
  CheckCircle,
  ChevronDown,
  Menu,
  Download,
  Star,
  HelpCircle,
  Bookmark,
  Share2,
  Settings,
  SquareLibrary,
  AlertCircle,
} from "lucide-react";

interface Lesson {
  id: string;
  title: string;
  duration: number; // in minutes
  type: "video" | "reading" | "quiz" | "assignment";
  completed: boolean;
  freePreview: boolean;
  description?: string;
}

interface Chapter {
  id: string;
  title: string;
  lessons: Lesson[];
  completed: boolean;
}

interface CourseData {
  id: string;
  title: string;
  instructor: string;
  instructorTitle: string;
  instructorImage: string;
  rating: number;
  totalStudents: number;
  totalLessons: number;
  totalHours: number;
  progress: number;
  lastWatched: string;
  chapters: Chapter[];
}

const CourseLearn: React.FC = () => {
  // Mock course data - in real app, fetch from API based on course ID
  const [course, setCourse] = useState<CourseData>({
    id: "1",
    title: "Disease Surveillance and Epidemiology",
    instructor: "Dr. Ifeanyi Okafor",
    instructorTitle: "Public Health Specialist",
    instructorImage: "/instructor.jpg",
    rating: 4.7,
    totalStudents: 1250,
    totalLessons: 24,
    totalHours: 12.5,
    progress: 33,
    lastWatched: "2024-03-20",
    chapters: [
      {
        id: "1",
        title: "Introduction to Disease Surveillance",
        completed: true,
        lessons: [
          {
            id: "1",
            title: "Welcome to the Course",
            duration: 5,
            type: "video",
            completed: true,
            freePreview: true,
          },
          {
            id: "2",
            title: "What is Disease Surveillance?",
            duration: 15,
            type: "video",
            completed: true,
            freePreview: true,
          },
          {
            id: "3",
            title: "History of Epidemiology",
            duration: 20,
            type: "reading",
            completed: true,
            freePreview: false,
          },
          {
            id: "4",
            title: "Key Terminology",
            duration: 10,
            type: "video",
            completed: true,
            freePreview: true,
          },
        ],
      },
      {
        id: "2",
        title: "Surveillance Systems in Nigeria",
        completed: false,
        lessons: [
          {
            id: "5",
            title: "National Surveillance Structure",
            duration: 25,
            type: "video",
            completed: true,
            freePreview: false,
          },
          {
            id: "6",
            title: "Integrated Disease Surveillance and Response",
            duration: 30,
            type: "video",
            completed: false,
            freePreview: false,
          },
          {
            id: "7",
            title: "Case Study: Lassa Fever Outbreak",
            duration: 35,
            type: "video",
            completed: false,
            freePreview: false,
          },
          {
            id: "8",
            title: "Reading: Surveillance Guidelines",
            duration: 15,
            type: "reading",
            completed: false,
            freePreview: false,
          },
        ],
      },
      {
        id: "3",
        title: "Data Collection and Analysis",
        completed: false,
        lessons: [
          {
            id: "9",
            title: "Data Collection Methods",
            duration: 20,
            type: "video",
            completed: false,
            freePreview: false,
          },
          {
            id: "10",
            title: "Epidemiological Data Tools",
            duration: 25,
            type: "video",
            completed: false,
            freePreview: false,
          },
          {
            id: "11",
            title: "Quiz: Data Analysis Basics",
            duration: 10,
            type: "quiz",
            completed: false,
            freePreview: false,
          },
          {
            id: "12",
            title: "Assignment: Create Surveillance Report",
            duration: 45,
            type: "assignment",
            completed: false,
            freePreview: false,
          },
        ],
      },
      {
        id: "4",
        title: "Outbreak Response and Management",
        completed: false,
        lessons: [
          {
            id: "13",
            title: "Rapid Response Teams",
            duration: 30,
            type: "video",
            completed: false,
            freePreview: false,
          },
          {
            id: "14",
            title: "Containment Strategies",
            duration: 25,
            type: "video",
            completed: false,
            freePreview: false,
          },
          {
            id: "15",
            title: "Case Study: COVID-19 Response",
            duration: 40,
            type: "video",
            completed: false,
            freePreview: false,
          },
        ],
      },
    ],
  });

  const [currentLesson, setCurrentLesson] = useState<Lesson>(
    course.chapters[0].lessons[0],
  );
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(300); // 5 minutes in seconds
  const [volume, setVolume] = useState(80);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showChapters, setShowChapters] = useState(true);
  const [showNotes, setShowNotes] = useState(false);
  const [showResources, setShowResources] = useState(false);
  const [showQna, setShowQna] = useState(false);
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState<string[]>([]);
  //const [showSettings, setShowSettings] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Format time in MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // Handle lesson selection
  const handleSelectLesson = (chapterIndex: number, lessonIndex: number) => {
    const chapter = course.chapters[chapterIndex];
    const lesson = chapter.lessons[lessonIndex];

    setCurrentChapterIndex(chapterIndex);
    setCurrentLessonIndex(lessonIndex);
    setCurrentLesson(lesson);
    setCurrentTime(0);
    setIsPlaying(true);

    // In real app, mark lesson as viewed
    const updatedChapters = [...course.chapters];
    updatedChapters[chapterIndex].lessons[lessonIndex].completed = true;
    setCourse({ ...course, chapters: updatedChapters });
  };

  // Play/Pause toggle
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  };

  // Skip forward/backward
  const skip = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  // Handle progress bar click
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const progressBar = e.currentTarget;
    const clickPosition = e.clientX - progressBar.getBoundingClientRect().left;
    const progressBarWidth = progressBar.clientWidth;
    const percentage = clickPosition / progressBarWidth;
    const newTime = percentage * duration;

    setCurrentTime(newTime);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
  };

  // Add note
  const handleAddNote = () => {
    if (note.trim()) {
      setNotes([...notes, note]);
      setNote("");
    }
  };

  // Next lesson
  const goToNextLesson = () => {
    const currentChapter = course.chapters[currentChapterIndex];

    if (currentLessonIndex < currentChapter.lessons.length - 1) {
      handleSelectLesson(currentChapterIndex, currentLessonIndex + 1);
    } else if (currentChapterIndex < course.chapters.length - 1) {
      handleSelectLesson(currentChapterIndex + 1, 0);
    }
  };

  // Previous lesson
  const goToPrevLesson = () => {
    if (currentLessonIndex > 0) {
      handleSelectLesson(currentChapterIndex, currentLessonIndex - 1);
    } else if (currentChapterIndex > 0) {
      const prevChapter = course.chapters[currentChapterIndex - 1];
      handleSelectLesson(
        currentChapterIndex - 1,
        prevChapter.lessons.length - 1,
      );
    }
  };

  // Calculate total completed lessons
  const totalCompleted = course.chapters.reduce(
    (acc, chapter) => acc + chapter.lessons.filter((l) => l.completed).length,
    0,
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Top Navigation */}
      <div className="bg-gray-800 border-b border-gray-700 px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => (window.location.href = "/home/courses")}
              className="text-gray-400 hover:text-white"
            >
              <SquareLibrary size={20} />
            </button>
            <div className="hidden md:block">
              <h1 className="text-sm font-medium truncate max-w-md">
                {course.title}
              </h1>
              <p className="text-xs text-gray-400">
                {totalCompleted} of {course.totalLessons} lessons •{" "}
                {course.progress}% complete
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="text-gray-400 hover:text-white">
              <Bookmark size={20} />
            </button>
            <button className="text-gray-400 hover:text-white">
              <Download size={20} />
            </button>
            <button className="text-gray-400 hover:text-white">
              <Share2 size={20} />
            </button>
            <button className="text-gray-400 hover:text-white">
              <Settings size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row h-[calc(100vh-64px)]">
        {/* Video Player Section */}
        <div className="lg:w-2/3 bg-black relative">
          {/* Video Container */}
          <div className="relative aspect-video bg-black">
            {/* Placeholder for video player */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="mb-4">
                  <div className="w-20 h-20 mx-auto bg-gray-800 rounded-full flex items-center justify-center">
                    {isPlaying ? (
                      <Pause size={32} className="text-white" />
                    ) : (
                      <PlayCircle size={32} className="text-white" />
                    )}
                  </div>
                </div>
                {/* <p className="text-gray-300">Video player would appear here</p> */}
                <p className="text-sm text-gray-500 mt-2">
                  Currently playing: {currentLesson.title}
                </p>
              </div>
            </div>

            {/* Video Controls Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
              {/* Progress Bar */}
              <div
                className="w-full h-1 bg-gray-600 rounded-full mb-4 cursor-pointer"
                onClick={handleProgressClick}
              >
                <div
                  className="h-full bg-green-500 rounded-full"
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                ></div>
              </div>

              {/* Control Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={goToPrevLesson}
                    className="text-gray-300 hover:text-white"
                    disabled={
                      currentChapterIndex === 0 && currentLessonIndex === 0
                    }
                  >
                    <SkipBack size={20} />
                  </button>
                  <button onClick={togglePlay} className="text-white">
                    {isPlaying ? <Pause size={24} /> : <PlayCircle size={24} />}
                  </button>
                  <button
                    onClick={goToNextLesson}
                    className="text-gray-300 hover:text-white"
                    disabled={
                      currentChapterIndex === course.chapters.length - 1 &&
                      currentLessonIndex ===
                        course.chapters[currentChapterIndex].lessons.length - 1
                    }
                  >
                    <SkipForward size={20} />
                  </button>

                  <div className="flex items-center space-x-2">
                    <Volume2 size={18} />
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={volume}
                      onChange={(e) => setVolume(parseInt(e.target.value))}
                      className="w-20 accent-green-500"
                    />
                  </div>

                  <div className="text-sm">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <select
                    value={playbackSpeed}
                    onChange={(e) =>
                      setPlaybackSpeed(parseFloat(e.target.value))
                    }
                    className="bg-white text-sm border border-gray-600 rounded px-2 py-1"
                  >
                    <option value="0.5">0.5x</option>
                    <option value="0.75">0.75x</option>
                    <option value="1">Normal</option>
                    <option value="1.25">1.25x</option>
                    <option value="1.5">1.5x</option>
                    <option value="2">2x</option>
                  </select>

                  <button
                    onClick={() => setIsFullscreen(!isFullscreen)}
                    className="text-gray-300 hover:text-white"
                  >
                    <Maximize2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Lesson Content Below Video */}
          <div className="p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold mb-2">
                  {currentLesson.title}
                </h1>
                <div className="flex items-center space-x-4 text-gray-400 text-sm">
                  <span>
                    Lesson {currentLessonIndex + 1} • Chapter{" "}
                    {currentChapterIndex + 1}
                  </span>
                  <span>•</span>
                  <span>{currentLesson.duration} min</span>
                  <span>•</span>
                  <span className="capitalize">{currentLesson.type}</span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {currentLesson.completed && (
                  <span className="flex items-center text-green-400 text-sm">
                    <CheckCircle size={16} className="mr-1" />
                    Completed
                  </span>
                )}
                {currentLesson.freePreview && (
                  <span className="bg-green-500 text-xs px-2 py-1 rounded">
                    Free Preview
                  </span>
                )}
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-700 mb-6">
              <div className="flex space-x-8">
                <button
                  onClick={() => {
                    setShowNotes(true);
                    setShowResources(false);
                    setShowQna(false);
                  }}
                  className={`pb-3 font-medium ${showNotes ? "text-white border-b-2 border-green-500" : "text-gray-400"}`}
                >
                  Notes
                </button>
                <button
                  onClick={() => {
                    setShowNotes(false);
                    setShowResources(true);
                    setShowQna(false);
                  }}
                  className={`pb-3 font-medium ${showResources ? "text-white border-b-2 border-green-500" : "text-gray-400"}`}
                >
                  Resources
                </button>
                <button
                  onClick={() => {
                    setShowNotes(false);
                    setShowResources(false);
                    setShowQna(true);
                  }}
                  className={`pb-3 font-medium ${showQna ? "text-white border-b-2 border-green-500" : "text-gray-400"}`}
                >
                  Q&A
                </button>
              </div>
            </div>

            {/* Notes Section */}
            {showNotes && (
              <div>
                <div className="mb-6">
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Add a note about this lesson..."
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg p-4 text-white placeholder-gray-500 focus:outline-none focus:border-green-500"
                    rows={4}
                  />
                  <div className="flex justify-end mt-2">
                    <button
                      onClick={handleAddNote}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
                    >
                      Add Note
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-4">Your Notes</h3>
                  {notes.length === 0 ? (
                    <p className="text-gray-400 text-center py-8">
                      No notes yet. Add your first note above.
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {notes.map((noteItem, index) => (
                        <div
                          key={index}
                          className="bg-gray-800 rounded-lg p-4 border border-gray-700"
                        >
                          <p className="text-gray-300">{noteItem}</p>
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-xs text-gray-500">
                              {new Date().toLocaleDateString()}
                            </span>
                            <button className="text-gray-400 hover:text-white text-sm">
                              Edit
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Resources Section */}
            {showResources && (
              <div>
                <h3 className="font-medium mb-4">Downloadable Resources</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between bg-gray-800 p-4 rounded-lg hover:bg-gray-700">
                    <div className="flex items-center">
                      <div className="bg-gray-700 p-2 rounded mr-4">
                        <BookOpen size={20} />
                      </div>
                      <div>
                        <h4 className="font-medium">Lecture Slides</h4>
                        <p className="text-sm text-gray-400">PDF • 2.4 MB</p>
                      </div>
                    </div>
                    <button className="text-green-400 hover:text-green-300">
                      <Download size={20} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between bg-gray-800 p-4 rounded-lg hover:bg-gray-700">
                    <div className="flex items-center">
                      <div className="bg-gray-700 p-2 rounded mr-4">
                        <BookOpen size={20} />
                      </div>
                      <div>
                        <h4 className="font-medium">Additional Reading</h4>
                        <p className="text-sm text-gray-400">PDF • 1.8 MB</p>
                      </div>
                    </div>
                    <button className="text-green-400 hover:text-green-300">
                      <Download size={20} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between bg-gray-800 p-4 rounded-lg hover:bg-gray-700">
                    <div className="flex items-center">
                      <div className="bg-gray-700 p-2 rounded mr-4">
                        <BookOpen size={20} />
                      </div>
                      <div>
                        <h4 className="font-medium">Practice Worksheet</h4>
                        <p className="text-sm text-gray-400">DOCX • 356 KB</p>
                      </div>
                    </div>
                    <button className="text-green-400 hover:text-green-300">
                      <Download size={20} />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Q&A Section */}
            {showQna && (
              <div>
                <div className="mb-6">
                  <textarea
                    placeholder="Ask a question about this lesson..."
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg p-4 text-white placeholder-gray-500 focus:outline-none focus:border-green-500"
                    rows={3}
                  />
                  <div className="flex justify-end mt-2">
                    <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
                      Post Question
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-4">Recent Questions</h3>
                  <div className="space-y-4">
                    <div className="bg-gray-800 rounded-lg p-4">
                      <div className="flex items-start mb-3">
                        <div className="w-8 h-8 bg-gray-700 rounded-full mr-3"></div>
                        <div>
                          <h4 className="font-medium">
                            What&apos;s the difference between surveillance and
                            monitoring?
                          </h4>
                          <p className="text-sm text-gray-400">
                            Asked by John • 2 days ago
                          </p>
                        </div>
                      </div>
                      <div className="ml-11">
                        <div className="flex items-start mb-2">
                          <div className="w-8 h-8 bg-green-900 rounded-full mr-3"></div>
                          <div className="bg-gray-900 rounded-lg p-3">
                            <div className="flex items-center mb-1">
                              <span className="font-medium">
                                Dr. Ifeanyi Okafor
                              </span>
                              <span className="mx-2 text-gray-400">•</span>
                              <span className="text-sm text-gray-400">
                                Instructor
                              </span>
                            </div>
                            <p className="text-gray-300">
                              Surveillance is continuous and systematic, while
                              monitoring is periodic...
                            </p>
                          </div>
                        </div>
                        <button className="text-sm text-gray-400 hover:text-white ml-11">
                          Show 3 more replies
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Chapters Sidebar */}
        <div
          className={`lg:w-1/3 bg-gray-900 border-l border-gray-800 overflow-y-auto transition-all duration-300 ${showChapters ? "block" : "hidden"}`}
        >
          <div className="p-6">
            {/* Course Progress */}
            <div className="bg-gray-800 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Course Progress</span>
                <span className="text-green-400">{course.progress}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="h-2 bg-green-500 rounded-full"
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                {totalCompleted} of {course.totalLessons} lessons •{" "}
                {course.totalHours} total hours
              </p>
            </div>

            {/* Course Content */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold">Course Content</h2>
                <button className="text-sm text-gray-400 hover:text-white">
                  Collapse all
                </button>
              </div>

              {/* Chapters List */}
              <div className="space-y-2">
                {course.chapters.map((chapter, chapterIndex) => (
                  <div
                    key={chapter.id}
                    className="border border-gray-800 rounded-lg overflow-hidden"
                  >
                    {/* Chapter Header */}
                    <div
                      className="flex items-center justify-between p-4 bg-gray-800 hover:bg-gray-750 cursor-pointer"
                      onClick={() => {
                        const updatedChapters = [...course.chapters];
                        updatedChapters[chapterIndex].completed =
                          !chapter.completed;
                        setCourse({ ...course, chapters: updatedChapters });
                      }}
                    >
                      <div className="flex items-center">
                        <div
                          className={`w-6 h-6 rounded-full border flex items-center justify-center mr-3 ${chapter.completed ? "bg-green-500 border-green-500" : "border-gray-500"}`}
                        >
                          {chapter.completed && <CheckCircle size={14} />}
                        </div>
                        <div>
                          <h3 className="font-medium">{chapter.title}</h3>
                          <p className="text-xs text-gray-400">
                            {chapter.lessons.length} lessons •{" "}
                            {chapter.lessons.reduce(
                              (acc, l) => acc + l.duration,
                              0,
                            )}{" "}
                            min
                          </p>
                        </div>
                      </div>
                      <ChevronDown size={20} className="text-gray-400" />
                    </div>

                    {/* Lessons List */}
                    <div className="bg-gray-900">
                      {chapter.lessons.map((lesson, lessonIndex) => (
                        <div
                          key={lesson.id}
                          className={`flex items-center p-4 border-t border-gray-800 hover:bg-gray-850 cursor-pointer ${currentLesson.id === lesson.id ? "bg-gray-850" : ""}`}
                          onClick={() =>
                            handleSelectLesson(chapterIndex, lessonIndex)
                          }
                        >
                          <div className="flex items-center flex-1">
                            <div
                              className={`w-6 h-6 rounded-full border flex items-center justify-center mr-3 ${lesson.completed ? "bg-green-500 border-green-500" : "border-gray-500"}`}
                            >
                              {lesson.completed && <CheckCircle size={14} />}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center">
                                <span className="font-medium text-sm">
                                  {lesson.title}
                                </span>
                                {lesson.freePreview && (
                                  <span className="ml-2 text-xs bg-green-500 px-2 py-0.5 rounded">
                                    Preview
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center text-xs text-gray-400 mt-1">
                                <span className="capitalize">
                                  {lesson.type}
                                </span>
                                <span className="mx-2">•</span>
                                <span>{lesson.duration} min</span>
                              </div>
                            </div>
                          </div>
                          <div className="ml-2">
                            {lesson.type === "video" && (
                              <PlayCircle size={16} className="text-gray-400" />
                            )}
                            {lesson.type === "reading" && (
                              <BookOpen size={16} className="text-gray-400" />
                            )}
                            {lesson.type === "quiz" && (
                              <HelpCircle size={16} className="text-gray-400" />
                            )}
                            {lesson.type === "assignment" && (
                              <AlertCircle
                                size={16}
                                className="text-gray-400"
                              />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Instructor Info */}
            <div className="bg-gray-800 rounded-lg p-4 mb-6">
              <h3 className="font-medium mb-3">Instructor</h3>
              <div className="flex items-center mb-3">
                <div className="w-12 h-12 bg-gray-700 rounded-full mr-3"></div>
                <div>
                  <h4 className="font-medium">{course.instructor}</h4>
                  <p className="text-sm text-gray-400">
                    {course.instructorTitle}
                  </p>
                </div>
              </div>
              <div className="flex items-center text-sm text-gray-400">
                <Star size={14} className="text-yellow-400 mr-1" />
                <span>{course.rating} instructor rating</span>
                <span className="mx-2">•</span>
                <span>{course.totalStudents.toLocaleString()} students</span>
              </div>
            </div>

            {/* Course Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-800 rounded-lg p-3 text-center">
                <div className="text-lg font-bold">{totalCompleted}</div>
                <div className="text-xs text-gray-400">Completed</div>
              </div>
              <div className="bg-gray-800 rounded-lg p-3 text-center">
                <div className="text-lg font-bold">
                  {course.totalLessons - totalCompleted}
                </div>
                <div className="text-xs text-gray-400">Remaining</div>
              </div>
              <div className="bg-gray-800 rounded-lg p-3 text-center">
                <div className="text-lg font-bold">{course.totalHours}h</div>
                <div className="text-xs text-gray-400">Total hours</div>
              </div>
              <div className="bg-gray-800 rounded-lg p-3 text-center">
                <div className="text-lg font-bold">4.7</div>
                <div className="text-xs text-gray-400">Course rating</div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Toggle for Chapters */}
        <button
          onClick={() => setShowChapters(!showChapters)}
          className="lg:hidden fixed bottom-6 right-6 bg-green-600 text-white p-3 rounded-full shadow-lg z-50"
        >
          <Menu size={24} />
        </button>
      </div>
    </div>
  );
};

export default CourseLearn;
