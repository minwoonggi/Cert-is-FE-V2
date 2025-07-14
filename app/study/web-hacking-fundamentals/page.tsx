"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  ArrowLeft,
  Calendar,
  Users,
  Clock,
  Download,
  ExternalLink,
  MessageSquare,
  Shield,
  Lock,
  Zap,
  AlertTriangle,
  CheckCircle,
  XCircle,
  FileText,
  Globe,
  Target,
  BookOpen,
  Award,
  User,
  Tag,
  Play,
  CheckSquare,
  AlertCircle,
  Mail,
} from "lucide-react"

// Mock study data
const studyData = {
  id: "web-hacking-fundamentals",
  title: "Web Hacking Fundamentals Study",
  description: "웹 해킹의 기초부터 실전까지, OWASP Top 10을 중심으로 한 체계적인 웹 보안 학습 과정입니다.",
  category: "Web Security",
  status: "in-progress", // recruiting, in-progress, completed
  duration: {
    weeks: 2,
    startDate: "2024-01-15",
    endDate: "2024-01-29",
    currentDay: 5, // D-5
    totalDays: 14,
    progressPercentage: 64, // (14-5)/14 * 100
  },
  participants: {
    current: 9,
    max: 10,
    allowMidJoin: true,
  },
  leader: {
    name: "김해커",
    avatar: "/placeholder.svg?height=48&width=48",
    initials: "김해",
    role: "보안 전문가",
    experience: "3년차",
    contact: {
      email: "leader@cert-is.com",
      discord: "kimhacker#1234",
    },
  },
  difficulty: "intermediate", // beginner, intermediate, advanced
  tags: ["OWASP", "Web Security", "Penetration Testing", "실습"],
  overview: {
    objectives: [
      "웹 애플리케이션의 주요 취약점 이해",
      "OWASP Top 10 취약점 실습 및 분석",
      "모의해킹 도구 활용법 습득",
      "보안 코딩 가이드라인 학습",
    ],
    curriculum: [
      {
        week: 1,
        title: "웹 보안 기초 & OWASP Top 10 (1-5)",
        topics: [
          "웹 애플리케이션 구조 이해",
          "SQL Injection 실습",
          "XSS (Cross-Site Scripting) 분석",
          "CSRF 공격 시나리오",
          "인증 우회 기법",
        ],
      },
      {
        week: 2,
        title: "고급 웹 해킹 기법 & 방어 전략",
        topics: [
          "파일 업로드 취약점",
          "XXE (XML External Entity) 공격",
          "SSRF (Server-Side Request Forgery)",
          "보안 헤더 우회 기법",
          "최종 프로젝트: 취약한 웹앱 분석",
        ],
      },
    ],
    prerequisites: [
      "기본적인 웹 개발 지식 (HTML, CSS, JavaScript)",
      "HTTP 프로토콜 이해",
      "Linux 기본 명령어 숙지",
      "Python 또는 다른 스크립팅 언어 경험 (선택사항)",
    ],
    deliverables: [
      "주차별 실습 보고서 작성",
      "OWASP Top 10 취약점 분석 문서",
      "최종 프로젝트: 웹 애플리케이션 모의해킹 보고서",
      "학습 내용 발표 (15분)",
    ],
  },
  materials: [
    {
      name: "Web_Security_Fundamentals.pdf",
      type: "pdf",
      size: "4.2MB",
      description: "웹 보안 기초 이론 자료",
    },
    {
      name: "OWASP_Top10_2023_Guide.pdf",
      type: "pdf",
      size: "2.8MB",
      description: "OWASP Top 10 2023 가이드",
    },
    {
      name: "Lab_Environment_Setup.zip",
      type: "zip",
      size: "156MB",
      description: "실습 환경 구축 파일",
    },
    {
      name: "Vulnerable_Web_App.ova",
      type: "ova",
      size: "1.2GB",
      description: "취약한 웹 애플리케이션 VM",
    },
  ],
  references: [
    {
      title: "OWASP 공식 웹사이트",
      url: "https://owasp.org",
      description: "웹 애플리케이션 보안 표준 가이드",
    },
    {
      title: "PortSwigger Web Security Academy",
      url: "https://portswigger.net/web-security",
      description: "무료 웹 보안 학습 플랫폼",
    },
    {
      title: "DVWA (Damn Vulnerable Web Application)",
      url: "https://github.com/digininja/DVWA",
      description: "실습용 취약한 웹 애플리케이션",
    },
  ],
  policies: {
    penalty: {
      description: "스터디 참여도에 따른 패널티 시스템이 적용됩니다.",
      rules: ["무단 결석 2회 시 자동 제명", "과제 미제출 3회 시 경고", "최종 발표 불참 시 수료증 미발급"],
    },
    grace: {
      description: "예외적인 상황에 대한 유예 정책이 있습니다.",
      rules: [
        "사전 연락 시 1회 결석 허용",
        "과제 지연 제출 시 감점 (최대 3일)",
        "개인 사정으로 인한 중도 포기 시 패널티 없음",
      ],
    },
    requirements: [
      "매주 실습 보고서 제출 필수",
      "스터디 그룹 채팅방 참여 필수",
      "최종 발표 참석 필수",
      "학습 자료 외부 유출 금지",
    ],
  },
}

export default function StudyDetailPage() {
  const router = useRouter()
  const [joinMessage, setJoinMessage] = useState("")
  const [showJoinDialog, setShowJoinDialog] = useState(false)
  const [showContactDialog, setShowContactDialog] = useState(false)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "recruiting":
        return (
          <Badge className="bg-blue-50 text-blue-600 border-blue-200">
            <Users className="w-3 h-3 mr-1" />
            모집중
          </Badge>
        )
      case "in-progress":
        return (
          <Badge className="bg-green-50 text-green-600 border-green-200">
            <Play className="w-3 h-3 mr-1" />
            진행중
          </Badge>
        )
      case "completed":
        return (
          <Badge className="bg-gray-50 text-gray-600 border-gray-200">
            <CheckSquare className="w-3 h-3 mr-1" />
            완료
          </Badge>
        )
      default:
        return null
    }
  }

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return (
          <Badge className="bg-green-50 text-green-600 border-green-200">
            <Shield className="w-3 h-3 mr-1" />
            초급
          </Badge>
        )
      case "intermediate":
        return (
          <Badge className="bg-yellow-50 text-yellow-600 border-yellow-200">
            <Lock className="w-3 h-3 mr-1" />
            중급
          </Badge>
        )
      case "advanced":
        return (
          <Badge className="bg-red-50 text-red-600 border-red-200">
            <Zap className="w-3 h-3 mr-1" />
            고급
          </Badge>
        )
      default:
        return null
    }
  }

  const getFileIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileText className="w-5 h-5 text-red-600" />
      case "zip":
        return <FileText className="w-5 h-5 text-yellow-600" />
      case "ova":
        return <FileText className="w-5 h-5 text-blue-600" />
      default:
        return <FileText className="w-5 h-5 text-gray-600" />
    }
  }

  const getDaysRemaining = () => {
    const { currentDay, status } = studyData.duration
    if (status === "completed") return "완료"
    if (status === "recruiting") return "모집중"
    return `D-${currentDay}`
  }

  const getProgressColor = () => {
    const { progressPercentage } = studyData.duration
    if (progressPercentage < 30) return "bg-red-500"
    if (progressPercentage < 70) return "bg-yellow-500"
    return "bg-green-500"
  }

  const handleJoinRequest = () => {
    // Handle join request logic here
    console.log("Join request:", joinMessage)
    setShowJoinDialog(false)
    setJoinMessage("")
  }

  const handleDownload = (fileName: string) => {
    // Handle file download logic here
    console.log("Downloading:", fileName)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Button variant="ghost" onClick={() => router.back()} className="mb-6 text-gray-600 hover:text-cert-red">
          <ArrowLeft className="w-4 h-4 mr-2" />
          스터디 목록으로 돌아가기
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header Section */}
            <Card className="bg-white shadow-lg border-0">
              <CardHeader className="border-b border-gray-100">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  {getStatusBadge(studyData.status)}
                  {getDifficultyBadge(studyData.difficulty)}
                  <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
                    {studyData.category}
                  </Badge>
                </div>

                <CardTitle className="text-3xl font-bold text-gray-900 mb-4">{studyData.title}</CardTitle>

                <p className="text-gray-600 text-lg mb-6">{studyData.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {studyData.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs bg-gray-100 text-gray-600">
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
            </Card>

            {/* Study Information Card */}
            <Card className="bg-white shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-cert-red" />
                  스터디 정보
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Participants */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-blue-50 rounded-lg">
                      <Users className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">참여 인원</p>
                      <p className="text-xl font-bold text-gray-900">
                        {studyData.participants.current}/{studyData.participants.max}
                      </p>
                    </div>
                  </div>

                  {/* Duration */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-green-50 rounded-lg">
                      <Calendar className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">진행 기간</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {studyData.duration.weeks}주 ({getDaysRemaining()})
                      </p>
                      <p className="text-sm text-gray-500">
                        {studyData.duration.startDate} ~ {studyData.duration.endDate}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">진행률</span>
                    <span className="text-sm text-gray-500">{studyData.duration.progressPercentage}%</span>
                  </div>
                  <Progress value={studyData.duration.progressPercentage} className="h-3" />
                </div>

                {/* Duration Guidance */}
                <Alert className="border-yellow-200 bg-yellow-50">
                  <AlertTriangle className="w-4 h-4 text-yellow-600" />
                  <AlertDescription className="text-yellow-800">
                    <strong>2주 과정 안내:</strong> 집중적인 학습을 위해 주제를 핵심 내용으로 제한하여 진행합니다. 심화
                    학습을 원하시면 후속 스터디 참여를 권장합니다.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            {/* Study Leader */}
            <Card className="bg-white shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-cert-red" />
                  스터디 리더
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={studyData.leader.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-cert-red text-white text-lg">
                      {studyData.leader.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-lg">{studyData.leader.name}</h3>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline">{studyData.leader.role}</Badge>
                      <Badge variant="secondary">{studyData.leader.experience}</Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        {studyData.leader.contact.email}
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="w-3 h-3" />
                        {studyData.leader.contact.discord}
                      </div>
                    </div>
                  </div>
                  <Dialog open={showContactDialog} onOpenChange={setShowContactDialog}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        연락하기
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-white">
                      <DialogHeader>
                        <DialogTitle>스터디 리더에게 메시지 보내기</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <Textarea
                          placeholder="궁금한 점이나 문의사항을 입력해주세요..."
                          value={joinMessage}
                          onChange={(e) => setJoinMessage(e.target.value)}
                          className="min-h-[100px]"
                        />
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" onClick={() => setShowContactDialog(false)}>
                            취소
                          </Button>
                          <Button
                            className="bg-cert-red hover:bg-cert-red/80 text-white"
                            onClick={() => setShowContactDialog(false)}
                          >
                            메시지 전송
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>

            {/* Detailed Description */}
            <Card className="bg-white shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-cert-red" />
                  스터디 상세 정보
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Objectives */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Target className="w-5 h-5 text-cert-red" />
                    학습 목표
                  </h3>
                  <ul className="space-y-2">
                    {studyData.overview.objectives.map((objective, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Curriculum */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-cert-red" />
                    커리큘럼
                  </h3>
                  <div className="space-y-6">
                    {studyData.overview.curriculum.map((week) => (
                      <div key={week.week} className="border border-gray-200 rounded-lg p-6">
                        <h4 className="text-lg font-semibold text-gray-900 mb-3">
                          {week.week}주차: {week.title}
                        </h4>
                        <ul className="space-y-2">
                          {week.topics.map((topic, index) => (
                            <li key={index} className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-cert-red rounded-full mt-2 flex-shrink-0" />
                              <span className="text-gray-700">{topic}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Prerequisites */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-cert-red" />
                    사전 요구사항
                  </h3>
                  <ul className="space-y-2">
                    {studyData.overview.prerequisites.map((prerequisite, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-gray-700">{prerequisite}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Deliverables */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Award className="w-5 h-5 text-cert-red" />
                    최종 결과물
                  </h3>
                  <ul className="space-y-2">
                    {studyData.overview.deliverables.map((deliverable, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckSquare className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{deliverable}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Attached Materials */}
            <Card className="bg-white shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-cert-red" />
                  첨부 자료
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {studyData.materials.map((material, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-cert-red/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        {getFileIcon(material.type)}
                        <div>
                          <p className="font-medium text-gray-900">{material.name}</p>
                          <p className="text-sm text-gray-500">{material.description}</p>
                          <p className="text-xs text-gray-400">{material.size}</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDownload(material.name)}
                        className="text-cert-red hover:bg-cert-red/10"
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                {/* Reference Links */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Globe className="w-5 h-5 text-cert-red" />
                    참고 링크
                  </h4>
                  <div className="space-y-3">
                    {studyData.references.map((reference, index) => (
                      <a
                        key={index}
                        href={reference.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-cert-red/50 transition-colors group"
                      >
                        <div>
                          <p className="font-medium text-gray-900 group-hover:text-cert-red">{reference.title}</p>
                          <p className="text-sm text-gray-500">{reference.description}</p>
                        </div>
                        <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-cert-red" />
                      </a>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Policy Information */}
            <Card className="bg-white shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-cert-red" />
                  스터디 정책
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Penalty System */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <XCircle className="w-5 h-5 text-red-500" />
                    패널티 시스템
                  </h4>
                  <p className="text-gray-600 mb-3">{studyData.policies.penalty.description}</p>
                  <ul className="space-y-2">
                    {studyData.policies.penalty.rules.map((rule, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Grace Period */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-yellow-500" />
                    유예 정책
                  </h4>
                  <p className="text-gray-600 mb-3">{studyData.policies.grace.description}</p>
                  <ul className="space-y-2">
                    {studyData.policies.grace.rules.map((rule, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Requirements */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <CheckSquare className="w-5 h-5 text-blue-500" />
                    필수 요구사항
                  </h4>
                  <ul className="space-y-2">
                    {studyData.policies.requirements.map((requirement, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-gray-700">{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Participation Application */}
              <Card className="bg-white shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-cert-red" />
                    참여 신청
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-cert-red mb-2">
                        {studyData.participants.current}/{studyData.participants.max}
                      </div>
                      <p className="text-sm text-gray-500">현재 참여 인원</p>
                    </div>

                    {studyData.participants.allowMidJoin && studyData.status === "in-progress" && (
                      <Alert className="border-blue-200 bg-blue-50">
                        <AlertCircle className="w-4 h-4 text-blue-600" />
                        <AlertDescription className="text-blue-800">
                          중도 참여가 가능합니다. 이전 내용은 자료를 통해 학습하실 수 있습니다.
                        </AlertDescription>
                      </Alert>
                    )}

                    <Dialog open={showJoinDialog} onOpenChange={setShowJoinDialog}>
                      <DialogTrigger asChild>
                        <Button
                          className="w-full bg-cert-red hover:bg-cert-red/80 text-white"
                          disabled={
                            studyData.participants.current >= studyData.participants.max ||
                            studyData.status === "completed"
                          }
                        >
                          <Users className="w-4 h-4 mr-2" />
                          {studyData.status === "completed"
                            ? "모집 완료"
                            : studyData.participants.current >= studyData.participants.max
                              ? "정원 마감"
                              : "참여 신청"}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-white">
                        <DialogHeader>
                          <DialogTitle>스터디 참여 신청</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <p className="text-sm text-gray-600 mb-2">스터디 리더에게 전달할 메시지를 작성해주세요.</p>
                            <Textarea
                              placeholder="자기소개, 참여 동기, 궁금한 점 등을 자유롭게 작성해주세요..."
                              value={joinMessage}
                              onChange={(e) => setJoinMessage(e.target.value)}
                              className="min-h-[120px]"
                            />
                          </div>
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" onClick={() => setShowJoinDialog(false)}>
                              취소
                            </Button>
                            <Button className="bg-cert-red hover:bg-cert-red/80 text-white" onClick={handleJoinRequest}>
                              신청하기
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Info */}
              <Card className="bg-white shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-cert-red" />
                    빠른 정보
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">난이도</span>
                      {getDifficultyBadge(studyData.difficulty)}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">기간</span>
                      <span className="text-sm font-medium">{studyData.duration.weeks}주</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">상태</span>
                      {getStatusBadge(studyData.status)}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">중도 참여</span>
                      <span className="text-sm font-medium">
                        {studyData.participants.allowMidJoin ? "가능" : "불가능"}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Study Stats */}
              <Card className="bg-white shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-cert-red" />
                    스터디 통계
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900 mb-1">{studyData.materials.length}</div>
                      <p className="text-sm text-gray-500">학습 자료</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900 mb-1">
                        {studyData.overview.curriculum.reduce((acc, week) => acc + week.topics.length, 0)}
                      </div>
                      <p className="text-sm text-gray-500">학습 주제</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900 mb-1">
                        {studyData.overview.deliverables.length}
                      </div>
                      <p className="text-sm text-gray-500">결과물</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
