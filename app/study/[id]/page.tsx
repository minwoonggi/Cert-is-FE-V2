"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  ArrowLeft,
  Calendar,
  Clock,
  Users,
  MapPin,
  Plus,
  FileText,
  ChevronDown,
  ChevronUp,
  Edit,
  Trash2,
} from "lucide-react"

// Mock data for the study
const studyData = {
  id: "web-hacking-fundamentals",
  title: "웹 해킹 기초 스터디",
  description: "웹 애플리케이션 보안의 기초부터 고급 기법까지 체계적으로 학습하는 스터디입니다.",
  fullDescription: `이 스터디는 웹 애플리케이션 보안에 대한 포괄적인 이해를 목표로 합니다. 

**학습 목표:**
- 웹 애플리케이션의 기본 구조와 동작 원리 이해
- 주요 웹 취약점(OWASP Top 10) 학습
- 실습을 통한 취약점 발견 및 악용 기법 습득
- 보안 코딩 및 방어 기법 학습

**커리큘럼:**
1주차: 웹 기초 및 HTTP 프로토콜
2주차: SQL Injection 이론 및 실습
3주차: XSS (Cross-Site Scripting) 공격
4주차: CSRF 및 세션 관리
5주차: 파일 업로드 취약점
6주차: 인증 및 권한 부여 우회
7주차: 서버 사이드 취약점
8주차: 클라이언트 사이드 취약점
9주차: 웹 애플리케이션 방화벽 우회
10주차: 종합 실습 및 CTF

**준비물:**
- 개인 노트북 (Kali Linux 설치 권장)
- 기본적인 웹 개발 지식
- 열정적인 학습 의지`,
  leader: {
    name: "김보안",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "4학년",
  },
  participants: [
    { name: "이해커", avatar: "/placeholder.svg?height=32&width=32", role: "3학년" },
    { name: "박펜테", avatar: "/placeholder.svg?height=32&width=32", role: "2학년" },
    { name: "최시큐", avatar: "/placeholder.svg?height=32&width=32", role: "3학년" },
    { name: "정웹해", avatar: "/placeholder.svg?height=32&width=32", role: "1학년" },
  ],
  schedule: {
    day: "매주 수요일",
    time: "19:00 - 21:00",
    location: "IT융합응용공학과 실습실 2",
  },
  period: "2024.03.06 ~ 2024.05.29",
  dDay: 15,
  maxParticipants: 8,
  currentParticipants: 5,
  tags: ["웹해킹", "보안", "실습", "OWASP"],
  status: "모집중",
}

// Mock data for meeting minutes
const meetingMinutes = [
  {
    id: 1,
    week: 1,
    title: "웹 기초 및 HTTP 프로토콜",
    date: "2024.03.06",
    content:
      "HTTP 프로토콜의 기본 구조와 요청/응답 메커니즘에 대해 학습했습니다. Burp Suite를 이용한 HTTP 트래픽 분석 실습을 진행했습니다.",
    attendees: ["김보안", "이해커", "박펜테", "최시큐"],
    materials: ["HTTP 프로토콜 개요.pdf", "Burp Suite 설치 가이드.pdf"],
    author: "김보안",
  },
  {
    id: 2,
    week: 2,
    title: "SQL Injection 이론 및 실습",
    date: "2024.03.13",
    content:
      "SQL Injection의 원리와 다양한 공격 기법에 대해 학습했습니다. DVWA를 이용한 실습을 통해 Union-based, Boolean-based, Time-based SQL Injection을 실습했습니다.",
    attendees: ["김보안", "이해커", "박펜테", "최시큐", "정웹해"],
    materials: ["SQL Injection 가이드.pdf", "DVWA 실습 환경.zip"],
    author: "김보안",
  },
  {
    id: 3,
    week: 3,
    title: "XSS (Cross-Site Scripting) 공격",
    date: "2024.03.20",
    content:
      "XSS 공격의 종류(Reflected, Stored, DOM-based)와 각각의 특징을 학습했습니다. 실제 웹사이트에서 XSS 취약점을 찾고 악용하는 실습을 진행했습니다.",
    attendees: ["김보안", "이해커", "박펜테", "최시큐"],
    materials: ["XSS 공격 기법.pdf", "XSS 실습 코드.html"],
    author: "김보안",
  },
]

export default function StudyDetailPage() {
  const router = useRouter()
  const [isJoined, setIsJoined] = useState(false)
  const [showFullDescription, setShowFullDescription] = useState(false)
  const [newMinute, setNewMinute] = useState({
    title: "",
    content: "",
    materials: "",
  })

  const handleJoinStudy = () => {
    setIsJoined(true)
    // Here you would typically make an API call to join the study
  }

  const handleAddMinute = () => {
    // Here you would typically make an API call to add the meeting minute
    console.log("Adding meeting minute:", newMinute)
    setNewMinute({ title: "", content: "", materials: "" })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "모집중":
        return "bg-green-50 text-green-700 border-green-200"
      case "진행중":
        return "bg-blue-50 text-blue-700 border-blue-200"
      case "완료":
        return "bg-gray-50 text-gray-700 border-gray-200"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200"
    }
  }

  const truncateDescription = (text: string, maxLength = 200) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + "..."
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" onClick={() => router.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            스터디 목록으로
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Study Info Card */}
            <Card className="bg-white dark:bg-gray-800">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="text-2xl text-black dark:text-white">{studyData.title}</CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(studyData.status)}>{studyData.status}</Badge>
                      <Badge variant="outline" className="text-cert-red border-cert-red">
                        D-{studyData.dDay}
                      </Badge>
                    </div>
                  </div>
                  {!isJoined && (
                    <Button onClick={handleJoinStudy} className="bg-cert-red hover:bg-cert-red/80 text-white">
                      스터디 참여하기
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Basic Description */}
                <div>
                  <p className="text-black dark:text-gray-300 leading-relaxed">{studyData.description}</p>
                </div>

                {/* Full Description with Show More */}
                <div>
                  <div className="text-black dark:text-gray-300 leading-relaxed whitespace-pre-line">
                    {showFullDescription
                      ? studyData.fullDescription
                      : truncateDescription(studyData.fullDescription, 300)}
                  </div>
                  <Button
                    variant="ghost"
                    onClick={() => setShowFullDescription(!showFullDescription)}
                    className="mt-2 p-0 h-auto text-cert-red hover:text-cert-red/80"
                  >
                    {showFullDescription ? (
                      <>
                        접기 <ChevronUp className="w-4 h-4 ml-1" />
                      </>
                    ) : (
                      <>
                        더 보기 <ChevronDown className="w-4 h-4 ml-1" />
                      </>
                    )}
                  </Button>
                </div>

                <Separator />

                {/* Study Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-cert-red" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">일정</p>
                      <p className="font-medium text-black dark:text-white">{studyData.schedule.day}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-cert-red" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">시간</p>
                      <p className="font-medium text-black dark:text-white">{studyData.schedule.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-cert-red" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">장소</p>
                      <p className="font-medium text-black dark:text-white">{studyData.schedule.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-cert-red" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">참여 인원</p>
                      <p className="font-medium text-black dark:text-white">
                        {studyData.currentParticipants}/{studyData.maxParticipants}명
                      </p>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <div className="flex flex-wrap gap-2">
                    {studyData.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="bg-cert-red/10 text-cert-red">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Meeting Minutes */}
            <Card className="bg-white dark:bg-gray-800">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-black dark:text-white">회의록</CardTitle>
                  {isJoined && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" className="bg-cert-red hover:bg-cert-red/80 text-white">
                          <Plus className="w-4 h-4 mr-2" />
                          회의록 추가
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl bg-white dark:bg-gray-800">
                        <DialogHeader>
                          <DialogTitle className="text-black dark:text-white">회의록 추가</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="title" className="text-black dark:text-white">
                              제목
                            </Label>
                            <Input
                              id="title"
                              value={newMinute.title}
                              onChange={(e) => setNewMinute({ ...newMinute, title: e.target.value })}
                              placeholder="회의록 제목을 입력하세요"
                              className="bg-white dark:bg-gray-700 text-black dark:text-white"
                            />
                          </div>
                          <div>
                            <Label htmlFor="content" className="text-black dark:text-white">
                              내용
                            </Label>
                            <Textarea
                              id="content"
                              value={newMinute.content}
                              onChange={(e) => setNewMinute({ ...newMinute, content: e.target.value })}
                              placeholder="회의 내용을 입력하세요"
                              rows={6}
                              className="bg-white dark:bg-gray-700 text-black dark:text-white"
                            />
                          </div>
                          <div>
                            <Label htmlFor="materials" className="text-black dark:text-white">
                              자료
                            </Label>
                            <Input
                              id="materials"
                              value={newMinute.materials}
                              onChange={(e) => setNewMinute({ ...newMinute, materials: e.target.value })}
                              placeholder="자료명을 쉼표로 구분하여 입력하세요"
                              className="bg-white dark:bg-gray-700 text-black dark:text-white"
                            />
                          </div>
                          <Button
                            onClick={handleAddMinute}
                            className="w-full bg-cert-red hover:bg-cert-red/80 text-white"
                          >
                            회의록 추가
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {meetingMinutes.map((minute) => (
                    <Card
                      key={minute.id}
                      className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-semibold text-black dark:text-white">
                              {minute.week}주차: {minute.title}
                            </h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{minute.date}</p>
                          </div>
                          {isJoined && (
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          )}
                        </div>

                        <p className="text-black dark:text-gray-300 mb-3 leading-relaxed">{minute.content}</p>

                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4 text-gray-500" />
                              <span className="text-gray-600 dark:text-gray-400">
                                참석: {minute.attendees.length}명
                              </span>
                            </div>
                            {minute.materials.length > 0 && (
                              <div className="flex items-center gap-2">
                                <FileText className="w-4 h-4 text-gray-500" />
                                <span className="text-gray-600 dark:text-gray-400">
                                  자료: {minute.materials.length}개
                                </span>
                              </div>
                            )}
                          </div>
                          <span className="text-gray-500 dark:text-gray-400">작성자: {minute.author}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Study Leader */}
            <Card className="bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-lg text-black dark:text-white">스터디 리더</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={studyData.leader.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-cert-red text-white">{studyData.leader.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-black dark:text-white">{studyData.leader.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{studyData.leader.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Participants */}
            <Card className="bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-lg text-black dark:text-white">참여자</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {studyData.participants.map((participant, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={participant.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-gray-200 text-black text-xs">
                          {participant.name[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium text-black dark:text-white">{participant.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{participant.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Study Period */}
            <Card className="bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-lg text-black dark:text-white">스터디 기간</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-2xl font-bold text-cert-red mb-2">D-{studyData.dDay}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{studyData.period}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
