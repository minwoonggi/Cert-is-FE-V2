"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  User,
  Calendar,
  Clock,
  BookOpen,
  Code,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Upload,
  FileText,
  Award,
  Users,
  MapPin,
  ExternalLink,
  Bell,
  Activity,
  Star,
  Trophy,
  Heart,
  Eye,
  MessageSquare,
  CalendarIcon,
  Info,
} from "lucide-react"

// Mock user data
const currentUser = {
  id: 1,
  name: "김개발",
  studentId: "202012345",
  email: "kim.developer@pknu.ac.kr",
  department: "컴퓨터공학과",
  year: "3학년",
  joinDate: "2023-03-15",
  avatar: "/placeholder.svg?height=120&width=120",
  initials: "김개",
  role: "정회원",
  penaltyPoints: 1,
  maxPenaltyPoints: 3,
  gracePeriodDays: 2,
  nextActivityRecommendedDate: "2024-01-20",
  penaltyDueDate: "2024-01-25",
}

// Mock current activities
const currentActivities = [
  {
    id: 1,
    title: "React 심화 스터디",
    type: "study",
    category: "Frontend",
    startDate: "2024-01-01",
    endDate: "2024-01-21",
    daysRemaining: 5,
    progress: 75,
    participants: 8,
    maxParticipants: 10,
    leader: "박리액트",
    status: "진행중",
    nextMeeting: "2024-01-17 19:00",
    location: "동방 A",
    meetingMinutes: [
      {
        id: 1,
        date: "2024-01-03",
        title: "1주차 - React 기초",
        url: "https://notion.so/react-week1",
        uploader: "김개발",
      },
      {
        id: 2,
        date: "2024-01-10",
        title: "2주차 - State Management",
        url: "https://notion.so/react-week2",
        uploader: "김개발",
      },
    ],
  },
  {
    id: 2,
    title: "보안 스캐너 프로젝트",
    type: "project",
    category: "Security",
    startDate: "2023-12-01",
    endDate: "2024-02-29",
    daysRemaining: 45,
    progress: 60,
    participants: 5,
    maxParticipants: 6,
    leader: "이보안",
    status: "진행중",
    nextMeeting: "2024-01-18 20:00",
    location: "동방 B",
    meetingMinutes: [
      {
        id: 3,
        date: "2024-01-05",
        title: "프로젝트 킥오프",
        url: "https://notion.so/security-kickoff",
        uploader: "김개발",
      },
    ],
  },
]

// Mock today's schedule
const todaySchedule = [
  {
    id: 1,
    title: "React 스터디 모임",
    time: "19:00-21:00",
    location: "동방 A",
    type: "study",
    activityId: 1,
  },
  {
    id: 2,
    title: "동아리 정기 회의",
    time: "21:30-22:30",
    location: "동방 C",
    type: "meeting",
  },
  {
    id: 3,
    title: "CTF 대회 준비",
    time: "14:00-17:00",
    location: "온라인",
    type: "event",
  },
]

// Mock activity history
const activityHistory = {
  completedStudies: [
    {
      id: 1,
      title: "JavaScript 기초 스터디",
      category: "Frontend",
      completedDate: "2023-12-15",
      duration: "2주",
      role: "참여자",
      achievement: "우수 참여자",
    },
    {
      id: 2,
      title: "네트워크 보안 스터디",
      category: "Security",
      completedDate: "2023-11-30",
      duration: "3주",
      role: "스터디장",
      achievement: "완주",
    },
  ],
  completedProjects: [
    {
      id: 1,
      title: "웹 취약점 스캐너",
      category: "Security",
      completedDate: "2023-10-20",
      duration: "6주",
      role: "팀원",
      achievement: "최우수 프로젝트",
    },
  ],
  blogPosts: [
    {
      id: 1,
      title: "React Hooks 완전 정복",
      category: "개발",
      publishedDate: "2024-01-10",
      views: 234,
      likes: 18,
      comments: 7,
    },
    {
      id: 2,
      title: "XSS 공격과 방어 기법",
      category: "보안",
      publishedDate: "2023-12-28",
      views: 189,
      likes: 31,
      comments: 12,
    },
  ],
  badges: [
    {
      id: 1,
      name: "스터디 마스터",
      description: "5개 이상의 스터디 완주",
      earnedDate: "2023-12-01",
      icon: "🎓",
      rarity: "rare",
    },
    {
      id: 2,
      name: "프로젝트 리더",
      description: "프로젝트 팀장 역할 수행",
      earnedDate: "2023-10-20",
      icon: "👑",
      rarity: "epic",
    },
    {
      id: 3,
      name: "블로그 작가",
      description: "10개 이상의 블로그 포스트 작성",
      earnedDate: "2024-01-10",
      icon: "✍️",
      rarity: "common",
    },
  ],
}

// Mock application status
const applicationStatus = [
  {
    id: 1,
    title: "Vue.js 스터디",
    type: "study",
    status: "대기중",
    appliedDate: "2024-01-12",
    expectedResult: "2024-01-18",
  },
  {
    id: 2,
    title: "AI 보안 프로젝트",
    type: "project",
    status: "승인됨",
    appliedDate: "2024-01-08",
    approvedDate: "2024-01-15",
  },
]

export default function MyPage() {
  const [isMinutesModalOpen, setIsMinutesModalOpen] = useState(false)
  const [selectedActivity, setSelectedActivity] = useState<any>(null)
  const [minutesUrl, setMinutesUrl] = useState("")
  const [minutesTitle, setMinutesTitle] = useState("")
  const [minutesDescription, setMinutesDescription] = useState("")

  const handleUploadMinutes = () => {
    if (selectedActivity && minutesUrl && minutesTitle) {
      // Here you would typically save to backend
      console.log("Uploading minutes:", {
        activityId: selectedActivity.id,
        url: minutesUrl,
        title: minutesTitle,
        description: minutesDescription,
      })
      setIsMinutesModalOpen(false)
      setMinutesUrl("")
      setMinutesTitle("")
      setMinutesDescription("")
    }
  }

  const openMinutesModal = (activity: any) => {
    setSelectedActivity(activity)
    setIsMinutesModalOpen(true)
  }

  const getPenaltyColor = (points: number, max: number) => {
    const ratio = points / max
    if (ratio >= 0.8) return "text-red-600"
    if (ratio >= 0.5) return "text-yellow-600"
    return "text-green-600"
  }

  const getPenaltyBgColor = (points: number, max: number) => {
    const ratio = points / max
    if (ratio >= 0.8) return "bg-red-50 border-red-200"
    if (ratio >= 0.5) return "bg-yellow-50 border-yellow-200"
    return "bg-green-50 border-green-200"
  }

  const getActivityTypeColor = (type: string) => {
    switch (type) {
      case "study":
        return "bg-blue-50 text-blue-600 border-blue-200"
      case "project":
        return "bg-purple-50 text-purple-600 border-purple-200"
      case "meeting":
        return "bg-green-50 text-green-600 border-green-200"
      case "event":
        return "bg-orange-50 text-orange-600 border-orange-200"
      default:
        return "bg-gray-50 text-gray-600 border-gray-200"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "승인됨":
        return "bg-green-50 text-green-600 border-green-200"
      case "대기중":
        return "bg-yellow-50 text-yellow-600 border-yellow-200"
      case "거절됨":
        return "bg-red-50 text-red-600 border-red-200"
      default:
        return "bg-gray-50 text-gray-600 border-gray-200"
    }
  }

  const getBadgeRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "bg-gray-100 text-gray-700 border-gray-300"
      case "rare":
        return "bg-blue-100 text-blue-700 border-blue-300"
      case "epic":
        return "bg-purple-100 text-purple-700 border-purple-300"
      case "legendary":
        return "bg-yellow-100 text-yellow-700 border-yellow-300"
      default:
        return "bg-gray-100 text-gray-700 border-gray-300"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <User className="w-8 h-8 text-cert-red" />
            <h1 className="text-3xl font-bold text-gray-900">마이페이지</h1>
          </div>
          <p className="text-gray-600">개인 활동 현황과 동아리 참여 정보를 한눈에 확인하세요.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Profile Section */}
          <div className="lg:col-span-1">
            <Card className="bg-white shadow-lg border-0 mb-6">
              <CardHeader className="text-center pb-4">
                <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-cert-red/20">
                  <AvatarImage src={currentUser.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="bg-cert-red text-white text-2xl">{currentUser.initials}</AvatarFallback>
                </Avatar>
                <CardTitle className="text-xl text-gray-900">{currentUser.name}</CardTitle>
                <div className="flex justify-center gap-2 mb-2">
                  <Badge variant="outline" className="text-cert-red border-cert-red">
                    {currentUser.role}
                  </Badge>
                  <Badge variant="outline">{currentUser.year}</Badge>
                </div>
                <CardDescription className="text-gray-600">{currentUser.department}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">학번:</span>
                    <span className="font-medium">{currentUser.studentId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">가입일:</span>
                    <span className="font-medium">{currentUser.joinDate}</span>
                  </div>
                </div>

                {/* Penalty Status */}
                <div
                  className={`p-4 rounded-lg border ${getPenaltyBgColor(currentUser.penaltyPoints, currentUser.maxPenaltyPoints)}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">페널티 현황</span>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          <Info className="w-4 h-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>페널티 시스템 안내</AlertDialogTitle>
                          <AlertDialogDescription className="space-y-2">
                            <p>• 총 3점까지 누적 가능합니다.</p>
                            <p>• 3점 누적 시 1개월 활동 제한됩니다.</p>
                            <p>• 스터디/프로젝트 무단 불참 시 1점 부과됩니다.</p>
                            <p>• 회의록 미제출 시 0.5점 부과됩니다.</p>
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogAction>확인</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1">
                      <Progress
                        value={(currentUser.penaltyPoints / currentUser.maxPenaltyPoints) * 100}
                        className="h-2"
                      />
                    </div>
                    <span
                      className={`font-bold ${getPenaltyColor(currentUser.penaltyPoints, currentUser.maxPenaltyPoints)}`}
                    >
                      {currentUser.penaltyPoints}/{currentUser.maxPenaltyPoints}
                    </span>
                  </div>
                  {currentUser.penaltyPoints > 0 && (
                    <div className="mt-2 text-xs text-gray-600">
                      <AlertTriangle className="w-3 h-3 inline mr-1" />
                      주의: 페널티 누적 상태입니다.
                    </div>
                  )}
                </div>

                {/* Grace Period Status */}
                <div className="p-4 rounded-lg border bg-blue-50 border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span className="font-medium text-gray-900">유예 기간</span>
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">남은 기간:</span>
                      <span className="font-medium text-blue-600">D-{currentUser.gracePeriodDays}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">권장 시작일:</span>
                      <span className="font-medium">{currentUser.nextActivityRecommendedDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">페널티 예정일:</span>
                      <span className="font-medium text-red-600">{currentUser.penaltyDueDate}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="bg-white shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Activity className="w-5 h-5 text-cert-red" />
                  활동 통계
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-cert-red">{currentActivities.length}</div>
                    <div className="text-xs text-gray-500">진행중</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-cert-red">
                      {activityHistory.completedStudies.length + activityHistory.completedProjects.length}
                    </div>
                    <div className="text-xs text-gray-500">완료</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-cert-red">{activityHistory.blogPosts.length}</div>
                    <div className="text-xs text-gray-500">블로그</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-cert-red">{activityHistory.badges.length}</div>
                    <div className="text-xs text-gray-500">뱃지</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="current" className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-gray-100">
                <TabsTrigger value="current" className="data-[state=active]:bg-cert-red data-[state=active]:text-white">
                  현재 활동
                </TabsTrigger>
                <TabsTrigger
                  value="schedule"
                  className="data-[state=active]:bg-cert-red data-[state=active]:text-white"
                >
                  오늘 일정
                </TabsTrigger>
                <TabsTrigger value="history" className="data-[state=active]:bg-cert-red data-[state=active]:text-white">
                  활동 이력
                </TabsTrigger>
                <TabsTrigger
                  value="applications"
                  className="data-[state=active]:bg-cert-red data-[state=active]:text-white"
                >
                  신청 현황
                </TabsTrigger>
              </TabsList>

              {/* Current Activities Tab */}
              <TabsContent value="current" className="space-y-6 mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {currentActivities.map((activity) => (
                    <Card key={activity.id} className="bg-white shadow-lg border-0 hover:shadow-xl transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg text-gray-900 mb-2">{activity.title}</CardTitle>
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="outline" className={getActivityTypeColor(activity.type)}>
                                {activity.type === "study" ? (
                                  <BookOpen className="w-3 h-3 mr-1" />
                                ) : (
                                  <Code className="w-3 h-3 mr-1" />
                                )}
                                {activity.type === "study" ? "스터디" : "프로젝트"}
                              </Badge>
                              <Badge variant="outline">{activity.category}</Badge>
                            </div>
                            <CardDescription className="text-gray-600">
                              리더: {activity.leader} | {activity.participants}/{activity.maxParticipants}명
                            </CardDescription>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-cert-red">D-{activity.daysRemaining}</div>
                            <div className="text-xs text-gray-500">남음</div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {/* Progress Bar */}
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-600">진행률</span>
                            <span className="font-medium">{activity.progress}%</span>
                          </div>
                          <Progress value={activity.progress} className="h-2" />
                        </div>

                        {/* Next Meeting */}
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-2 mb-1">
                            <Calendar className="w-4 h-4 text-cert-red" />
                            <span className="font-medium text-gray-900">다음 모임</span>
                          </div>
                          <div className="text-sm text-gray-600">
                            {activity.nextMeeting} | {activity.location}
                          </div>
                        </div>

                        {/* Meeting Minutes */}
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-gray-900">회의록</span>
                            <Button
                              size="sm"
                              onClick={() => openMinutesModal(activity)}
                              className="bg-cert-red hover:bg-cert-red/80 text-white"
                            >
                              <Upload className="w-3 h-3 mr-1" />
                              업로드
                            </Button>
                          </div>
                          <div className="space-y-2 max-h-32 overflow-y-auto">
                            {activity.meetingMinutes.map((minute: any) => (
                              <div key={minute.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                <div>
                                  <div className="font-medium text-sm">{minute.title}</div>
                                  <div className="text-xs text-gray-500">{minute.date}</div>
                                </div>
                                <a href={minute.url} target="_blank" rel="noopener noreferrer">
                                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                    <ExternalLink className="w-3 h-3" />
                                  </Button>
                                </a>
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Today's Schedule Tab */}
              <TabsContent value="schedule" className="space-y-6 mt-6">
                <Card className="bg-white shadow-lg border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CalendarIcon className="w-5 h-5 text-cert-red" />
                      오늘의 일정
                    </CardTitle>
                    <CardDescription>
                      {new Date().toLocaleDateString("ko-KR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        weekday: "long",
                      })}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {todaySchedule.length > 0 ? (
                      <div className="space-y-4">
                        {todaySchedule.map((schedule) => (
                          <div
                            key={schedule.id}
                            className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                          >
                            <div className="flex-shrink-0">
                              <div className="w-12 h-12 bg-cert-red rounded-full flex items-center justify-center">
                                {schedule.type === "study" && <BookOpen className="w-6 h-6 text-white" />}
                                {schedule.type === "project" && <Code className="w-6 h-6 text-white" />}
                                {schedule.type === "meeting" && <Users className="w-6 h-6 text-white" />}
                                {schedule.type === "event" && <Star className="w-6 h-6 text-white" />}
                              </div>
                            </div>
                            <div className="flex-1">
                              <h3 className="font-medium text-gray-900">{schedule.title}</h3>
                              <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                                <div className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {schedule.time}
                                </div>
                                <div className="flex items-center gap-1">
                                  <MapPin className="w-3 h-3" />
                                  {schedule.location}
                                </div>
                              </div>
                            </div>
                            <Badge variant="outline" className={getActivityTypeColor(schedule.type)}>
                              {schedule.type === "study" && "스터디"}
                              {schedule.type === "project" && "프로젝트"}
                              {schedule.type === "meeting" && "회의"}
                              {schedule.type === "event" && "이벤트"}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                        <p>오늘 예정된 일정이 없습니다.</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Activity History Tab */}
              <TabsContent value="history" className="space-y-6 mt-6">
                {/* Completed Activities */}
                <Card className="bg-white shadow-lg border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      완료한 활동
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="studies" className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="studies">스터디</TabsTrigger>
                        <TabsTrigger value="projects">프로젝트</TabsTrigger>
                      </TabsList>
                      <TabsContent value="studies" className="space-y-3 mt-4">
                        {activityHistory.completedStudies.map((study) => (
                          <div
                            key={study.id}
                            className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                          >
                            <div>
                              <h4 className="font-medium text-gray-900">{study.title}</h4>
                              <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                                <Badge variant="outline">{study.category}</Badge>
                                <span>{study.completedDate}</span>
                                <span>{study.duration}</span>
                                <span>{study.role}</span>
                              </div>
                            </div>
                            <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                              <Trophy className="w-3 h-3 mr-1" />
                              {study.achievement}
                            </Badge>
                          </div>
                        ))}
                      </TabsContent>
                      <TabsContent value="projects" className="space-y-3 mt-4">
                        {activityHistory.completedProjects.map((project) => (
                          <div
                            key={project.id}
                            className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                          >
                            <div>
                              <h4 className="font-medium text-gray-900">{project.title}</h4>
                              <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                                <Badge variant="outline">{project.category}</Badge>
                                <span>{project.completedDate}</span>
                                <span>{project.duration}</span>
                                <span>{project.role}</span>
                              </div>
                            </div>
                            <Badge variant="outline" className="bg-purple-50 text-purple-600 border-purple-200">
                              <Award className="w-3 h-3 mr-1" />
                              {project.achievement}
                            </Badge>
                          </div>
                        ))}
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>

                {/* Blog Posts */}
                <Card className="bg-white shadow-lg border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-cert-red" />
                      작성한 블로그
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {activityHistory.blogPosts.map((post) => (
                        <div
                          key={post.id}
                          className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                        >
                          <div>
                            <h4 className="font-medium text-gray-900">{post.title}</h4>
                            <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                              <Badge variant="outline">{post.category}</Badge>
                              <span>{post.publishedDate}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              {post.views}
                            </div>
                            <div className="flex items-center gap-1">
                              <Heart className="w-3 h-3" />
                              {post.likes}
                            </div>
                            <div className="flex items-center gap-1">
                              <MessageSquare className="w-3 h-3" />
                              {post.comments}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Badges */}
                <Card className="bg-white shadow-lg border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="w-5 h-5 text-cert-red" />
                      획득한 뱃지
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {activityHistory.badges.map((badge) => (
                        <div key={badge.id} className={`p-4 rounded-lg border ${getBadgeRarityColor(badge.rarity)}`}>
                          <div className="text-center">
                            <div className="text-3xl mb-2">{badge.icon}</div>
                            <h4 className="font-medium text-gray-900 mb-1">{badge.name}</h4>
                            <p className="text-xs text-gray-600 mb-2">{badge.description}</p>
                            <div className="text-xs text-gray-500">{badge.earnedDate}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Applications Tab */}
              <TabsContent value="applications" className="space-y-6 mt-6">
                <Card className="bg-white shadow-lg border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="w-5 h-5 text-cert-red" />
                      신청 현황
                    </CardTitle>
                    <CardDescription>스터디 및 프로젝트 참여 신청 상태를 확인하세요.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {applicationStatus.map((application) => (
                        <div
                          key={application.id}
                          className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                        >
                          <div>
                            <h4 className="font-medium text-gray-900">{application.title}</h4>
                            <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                              <Badge variant="outline" className={getActivityTypeColor(application.type)}>
                                {application.type === "study" ? "스터디" : "프로젝트"}
                              </Badge>
                              <span>신청일: {application.appliedDate}</span>
                              {application.approvedDate && <span>승인일: {application.approvedDate}</span>}
                              {application.expectedResult && <span>결과 예정: {application.expectedResult}</span>}
                            </div>
                          </div>
                          <Badge variant="outline" className={getStatusColor(application.status)}>
                            {application.status === "승인됨" && <CheckCircle className="w-3 h-3 mr-1" />}
                            {application.status === "대기중" && <Clock className="w-3 h-3 mr-1" />}
                            {application.status === "거절됨" && <XCircle className="w-3 h-3 mr-1" />}
                            {application.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Meeting Minutes Upload Modal */}
        <Dialog open={isMinutesModalOpen} onOpenChange={setIsMinutesModalOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>회의록 업로드</DialogTitle>
              <DialogDescription>{selectedActivity?.title}의 회의록 URL을 업로드하세요.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">제목</Label>
                <Input
                  id="title"
                  value={minutesTitle}
                  onChange={(e) => setMinutesTitle(e.target.value)}
                  placeholder="예: 3주차 - React Hooks 심화"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="url">URL</Label>
                <Input
                  id="url"
                  value={minutesUrl}
                  onChange={(e) => setMinutesUrl(e.target.value)}
                  placeholder="https://notion.so/..."
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">설명 (선택사항)</Label>
                <Textarea
                  id="description"
                  value={minutesDescription}
                  onChange={(e) => setMinutesDescription(e.target.value)}
                  placeholder="회의 내용에 대한 간단한 설명을 입력하세요."
                  rows={3}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsMinutesModalOpen(false)}>
                취소
              </Button>
              <Button
                onClick={handleUploadMinutes}
                disabled={!minutesUrl || !minutesTitle}
                className="bg-cert-red hover:bg-cert-red/80 text-white"
              >
                <Upload className="w-4 h-4 mr-2" />
                업로드
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
