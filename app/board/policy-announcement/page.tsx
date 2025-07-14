"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  ArrowLeft,
  Calendar,
  Eye,
  Heart,
  Bookmark,
  Share2,
  Copy,
  Twitter,
  Facebook,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  Info,
  Zap,
  Shield,
  FileText,
  Download,
  ExternalLink,
  TrendingUp,
  Bell,
  Award,
  Gavel,
} from "lucide-react"

// Mock data for the policy announcement post
const policyPost = {
  id: "policy-announcement-2024",
  title: "2024 Project/Study Policy Announcement",
  content: `# 2024년 CERT-IS 프로젝트/스터디 정책 공지

안녕하세요, CERT-IS 동아리 회원 여러분!

새로운 학기를 맞아 **2024년 프로젝트 및 스터디 운영 정책**을 공지드립니다. 모든 회원은 반드시 숙지하시기 바랍니다.

## 📋 주요 변경사항

### 1. 프로젝트 참여 정책
- **최소 참여 기간**: 4주 이상
- **중도 포기 시 패널티**: 다음 프로젝트 참여 제한 (1개월)
- **성과 발표 의무화**: 프로젝트 종료 시 필수 발표

### 2. 스터디 운영 정책
- **출석률 기준**: 80% 이상 필수
- **과제 제출**: 지정된 기한 내 100% 제출
- **스터디 리더 책임**: 주차별 진도 관리 및 보고서 제출

## ⚠️ 패널티 시스템

### 경고 단계
1. **1차 경고**: 구두 주의
2. **2차 경고**: 서면 경고 + 1주일 활동 제한
3. **3차 경고**: 1개월 활동 정지

### 패널티 대상 행위
- 무단 결석 (3회 이상)
- 과제 미제출 (2회 이상)
- 프로젝트 중도 포기
- 동아리 규칙 위반

## 🎯 혜택 시스템

### 우수 활동자 혜택
- **MVP 선정**: 월 1회, 상품 지급
- **추천서 작성**: 취업/대학원 진학 시 지원
- **컨퍼런스 참가비 지원**: 연 1회, 최대 50만원

### 성과 인정 기준
- 프로젝트 완주 및 우수 성과
- 스터디 100% 참여 및 발표
- 동아리 발전에 기여한 활동

## 📅 2024년 주요 일정

### 1분기 (1-3월)
- **신입생 모집**: 3월 1일 ~ 3월 15일
- **오리엔테이션**: 3월 20일
- **첫 번째 프로젝트 시작**: 3월 25일

### 2분기 (4-6월)
- **중간 성과 발표회**: 5월 15일
- **CTF 대회 참가**: 6월 중
- **여름 워크샵 계획**: 6월 말

### 3분기 (7-9월)
- **여름 집중 스터디**: 7월 ~ 8월
- **인턴십 지원 프로그램**: 8월
- **2학기 준비**: 9월

### 4분기 (10-12월)
- **최종 성과 발표회**: 11월
- **송년회 및 시상식**: 12월
- **차년도 계획 수립**: 12월 말

## 💡 신규 프로그램

### 멘토링 시스템
- **시니어-주니어 매칭**: 1:2 비율
- **정기 미팅**: 주 1회, 1시간
- **성과 평가**: 분기별 리뷰

### 기술 세미나
- **월례 세미나**: 매월 마지막 주 금요일
- **외부 전문가 초청**: 분기별 1회
- **회원 발표**: 자유 주제, 사전 신청

## 📞 문의 및 건의사항

정책에 대한 문의사항이나 건의사항이 있으시면 언제든지 연락주세요.

**연락처**:
- 이메일: policy@cert-is.ac.kr
- 카카오톡: CERT-IS 정책팀
- 오피스 아워: 매주 수요일 14:00-16:00 (동아리방)

## ⚖️ 정책 시행일

**시행일**: 2024년 3월 1일부터
**유효기간**: 2024년 12월 31일까지

모든 회원은 본 정책을 숙지하고 준수해주시기 바랍니다. 
건전하고 발전적인 동아리 문화 조성에 여러분의 적극적인 참여와 협조를 부탁드립니다.

---

**CERT-IS 운영진 일동**  
**발표일**: 2024년 2월 15일`,
  author: {
    name: "운영진",
    avatar: "/placeholder.svg?height=48&width=48",
    initials: "운영",
    role: "관리자",
    department: "CERT-IS 운영팀",
  },
  date: "2024-02-15",
  category: "공지사항",
  priority: "high",
  views: 1247,
  likes: 89,
  isNotice: true,
  isPolicyPost: true,
  tags: ["정책", "공지", "프로젝트", "스터디", "패널티"],
  attachments: [
    {
      id: 1,
      name: "2024_CERT-IS_정책_상세.pdf",
      size: "2.4 MB",
      type: "pdf",
      downloadUrl: "#",
    },
    {
      id: 2,
      name: "패널티_시스템_가이드.docx",
      size: "1.1 MB",
      type: "docx",
      downloadUrl: "#",
    },
    {
      id: 3,
      name: "2024_활동_일정표.xlsx",
      size: "856 KB",
      type: "xlsx",
      downloadUrl: "#",
    },
  ],
  relatedLinks: [
    {
      id: 1,
      title: "동아리 규정 전문",
      url: "#",
      description: "CERT-IS 동아리 운영 규정 전체 문서",
    },
    {
      id: 2,
      title: "프로젝트 신청 양식",
      url: "#",
      description: "새로운 프로젝트 제안 및 신청 양식",
    },
  ],
}

// Related posts data
const relatedPosts = [
  {
    id: 1,
    title: "동아리 활동 평가 기준 안내",
    category: "공지사항",
    priority: "medium",
    date: "2024-02-10",
    views: 456,
    isNotice: true,
  },
  {
    id: 2,
    title: "2024년 1분기 프로젝트 모집 공고",
    category: "모집공고",
    priority: "high",
    date: "2024-02-12",
    views: 789,
    isNotice: false,
  },
  {
    id: 3,
    title: "신입생 오리엔테이션 일정 안내",
    category: "공지사항",
    priority: "medium",
    date: "2024-02-08",
    views: 623,
    isNotice: true,
  },
]

// Popular posts data
const popularPosts = [
  {
    id: 1,
    title: "CTF 대회 참가 가이드",
    category: "기술자료",
    views: 2341,
    likes: 156,
  },
  {
    id: 2,
    title: "웹 해킹 기초 실습 자료",
    category: "학습자료",
    views: 1987,
    likes: 134,
  },
  {
    id: 3,
    title: "보안 취업 준비 로드맵",
    category: "진로정보",
    views: 1654,
    likes: 98,
  },
]

// Navigation posts
const navigationPosts = {
  previous: {
    id: "prev-post",
    title: "2023년 동아리 활동 결산 보고",
    category: "보고서",
  },
  next: {
    id: "next-post",
    title: "신입생 모집 설명회 안내",
    category: "공지사항",
  },
}

export default function SecurityBoardPolicyPage() {
  const router = useRouter()
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [showShareMenu, setShowShareMenu] = useState(false)

  const handleLike = () => {
    setIsLiked(!isLiked)
  }

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
  }

  const handleShare = (platform: string) => {
    const url = window.location.href
    const title = policyPost.title

    switch (platform) {
      case "copy":
        navigator.clipboard.writeText(url)
        break
      case "twitter":
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`)
        break
      case "facebook":
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`)
        break
    }
    setShowShareMenu(false)
  }

  const handleFileDownload = (file: any) => {
    // Simulate file download
    console.log(`Downloading ${file.name}`)
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "공지사항":
        return "bg-red-50 text-red-600 border-red-200"
      case "모집공고":
        return "bg-blue-50 text-blue-600 border-blue-200"
      case "기술자료":
        return "bg-purple-50 text-purple-600 border-purple-200"
      case "학습자료":
        return "bg-green-50 text-green-600 border-green-200"
      case "진로정보":
        return "bg-orange-50 text-orange-600 border-orange-200"
      case "보고서":
        return "bg-gray-50 text-gray-600 border-gray-200"
      default:
        return "bg-gray-50 text-gray-600 border-gray-200"
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return <AlertTriangle className="w-4 h-4 text-red-600" />
      case "medium":
        return <Info className="w-4 h-4 text-yellow-600" />
      case "low":
        return <Zap className="w-4 h-4 text-blue-600" />
      default:
        return <Info className="w-4 h-4 text-gray-600" />
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-50 text-red-600 border-red-200"
      case "medium":
        return "bg-yellow-50 text-yellow-600 border-yellow-200"
      case "low":
        return "bg-blue-50 text-blue-600 border-blue-200"
      default:
        return "bg-gray-50 text-gray-600 border-gray-200"
    }
  }

  const getFileIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileText className="w-5 h-5 text-red-600" />
      case "docx":
        return <FileText className="w-5 h-5 text-blue-600" />
      case "xlsx":
        return <FileText className="w-5 h-5 text-green-600" />
      default:
        return <FileText className="w-5 h-5 text-gray-600" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Back Button */}
            <Button variant="ghost" onClick={() => router.back()} className="mb-6 text-gray-600 hover:text-cert-red">
              <ArrowLeft className="w-4 h-4 mr-2" />
              목록으로 돌아가기
            </Button>

            {/* Main Post Card */}
            <Card
              className={`bg-white shadow-lg border-0 mb-8 ${policyPost.isPolicyPost ? "border-l-4 border-l-cert-red" : ""}`}
            >
              <CardHeader className="border-b border-gray-100 pb-8">
                {/* Category, Priority, and Notice Badges */}
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  {policyPost.isNotice && (
                    <Badge variant="outline" className="bg-cert-red text-white border-cert-red">
                      <Bell className="w-3 h-3 mr-1" />
                      공지
                    </Badge>
                  )}
                  <Badge variant="outline" className={getCategoryColor(policyPost.category)}>
                    <Shield className="w-3 h-3 mr-1" />
                    {policyPost.category}
                  </Badge>
                  <Badge variant="outline" className={getPriorityBadge(policyPost.priority)}>
                    {getPriorityIcon(policyPost.priority)}
                    <span className="ml-1 capitalize">{policyPost.priority}</span>
                  </Badge>
                  {policyPost.isPolicyPost && (
                    <Badge variant="outline" className="bg-purple-50 text-purple-600 border-purple-200">
                      <Gavel className="w-3 h-3 mr-1" />
                      정책
                    </Badge>
                  )}
                </div>

                {/* Title */}
                <CardTitle className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
                  {policyPost.title}
                </CardTitle>

                {/* Author and Meta Info */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-14 h-14">
                      <AvatarImage src={policyPost.author.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="bg-cert-red text-white text-lg">
                        {policyPost.author.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900">{policyPost.author.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {policyPost.author.role}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {policyPost.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {policyPost.views.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleLike}
                      className={`${
                        isLiked
                          ? "bg-cert-red text-white border-cert-red"
                          : "border-gray-300 text-gray-600 hover:border-cert-red hover:text-cert-red"
                      }`}
                    >
                      <Heart className="w-4 h-4 mr-2" />
                      {policyPost.likes + (isLiked ? 1 : 0)}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleBookmark}
                      className={`${
                        isBookmarked
                          ? "bg-yellow-50 text-yellow-600 border-yellow-200"
                          : "border-gray-300 text-gray-600 hover:border-yellow-400 hover:text-yellow-600"
                      }`}
                    >
                      <Bookmark className="w-4 h-4 mr-2" />
                      북마크
                    </Button>
                    <DropdownMenu open={showShareMenu} onOpenChange={setShowShareMenu}>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Share2 className="w-4 h-4 mr-2" />
                          공유
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-white">
                        <DropdownMenuItem onClick={() => handleShare("copy")}>
                          <Copy className="w-4 h-4 mr-2" />
                          링크 복사
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleShare("twitter")}>
                          <Twitter className="w-4 h-4 mr-2" />
                          Twitter
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleShare("facebook")}>
                          <Facebook className="w-4 h-4 mr-2" />
                          Facebook
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-6">
                  {policyPost.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="text-xs bg-gray-100 text-gray-600 hover:bg-gray-200 cursor-pointer"
                    >
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </CardHeader>

              <CardContent className="pt-8">
                {/* Policy Alert */}
                {policyPost.isPolicyPost && (
                  <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-red-800 mb-2">중요 정책 공지</h4>
                        <p className="text-red-700 text-sm">
                          본 게시물은 동아리 운영 정책에 관한 중요한 공지사항입니다. 모든 회원은 반드시 숙지하시기
                          바랍니다.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Post Content */}
                <div className="prose prose-lg max-w-none mb-8">
                  <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">{policyPost.content}</div>
                </div>

                {/* Attachments Section */}
                {policyPost.attachments.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Download className="w-5 h-5 text-cert-red" />
                      첨부 파일
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {policyPost.attachments.map((file) => (
                        <Card key={file.id} className="border border-gray-200 hover:border-cert-red transition-colors">
                          <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                              {getFileIcon(file.type)}
                              <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-gray-900 truncate">{file.name}</h4>
                                <p className="text-sm text-gray-500">{file.size}</p>
                              </div>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleFileDownload(file)}
                                className="hover:bg-cert-red hover:text-white"
                              >
                                <Download className="w-4 h-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {/* Related Links Section */}
                {policyPost.relatedLinks.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <ExternalLink className="w-5 h-5 text-cert-red" />
                      관련 링크
                    </h3>
                    <div className="space-y-3">
                      {policyPost.relatedLinks.map((link) => (
                        <Card key={link.id} className="border border-gray-200 hover:border-cert-red transition-colors">
                          <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                              <ExternalLink className="w-5 h-5 text-cert-red" />
                              <div className="flex-1">
                                <h4 className="font-medium text-gray-900 hover:text-cert-red">
                                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                                    {link.title}
                                  </a>
                                </h4>
                                <p className="text-sm text-gray-500">{link.description}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Navigation Posts */}
            <Card className="bg-white shadow-lg border-0 mb-8">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Previous Post */}
                  {navigationPosts.previous && (
                    <Link href={`/board/${navigationPosts.previous.id}`}>
                      <div className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-cert-red transition-colors group">
                        <ChevronLeft className="w-5 h-5 text-gray-400 group-hover:text-cert-red" />
                        <div>
                          <p className="text-sm text-gray-500 mb-1">이전 글</p>
                          <h4 className="font-medium text-gray-900 group-hover:text-cert-red line-clamp-2">
                            {navigationPosts.previous.title}
                          </h4>
                          <Badge variant="outline" className="text-xs mt-2">
                            {navigationPosts.previous.category}
                          </Badge>
                        </div>
                      </div>
                    </Link>
                  )}

                  {/* Next Post */}
                  {navigationPosts.next && (
                    <Link href={`/board/${navigationPosts.next.id}`}>
                      <div className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-cert-red transition-colors group">
                        <div className="text-right flex-1">
                          <p className="text-sm text-gray-500 mb-1">다음 글</p>
                          <h4 className="font-medium text-gray-900 group-hover:text-cert-red line-clamp-2">
                            {navigationPosts.next.title}
                          </h4>
                          <Badge variant="outline" className="text-xs mt-2">
                            {navigationPosts.next.category}
                          </Badge>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-cert-red" />
                      </div>
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Category Navigation */}
            <Card className="bg-white shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-cert-red" />
                  {policyPost.category} 카테고리 더보기
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Link href={`/board?category=${encodeURIComponent(policyPost.category)}`}>
                    <Button variant="outline" size="sm" className="hover:bg-cert-red hover:text-white bg-transparent">
                      전체 {policyPost.category} 보기
                    </Button>
                  </Link>
                  <Link href="/board">
                    <Button variant="outline" size="sm" className="hover:bg-cert-red hover:text-white bg-transparent">
                      전체 게시판 보기
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Post Quick Info */}
              <Card className="bg-white shadow-lg border-0">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Info className="w-5 h-5 text-cert-red" />
                    게시물 정보
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">카테고리</span>
                      <Badge variant="outline" className={getCategoryColor(policyPost.category)}>
                        {policyPost.category}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">우선순위</span>
                      <Badge variant="outline" className={getPriorityBadge(policyPost.priority)}>
                        {getPriorityIcon(policyPost.priority)}
                        <span className="ml-1 capitalize">{policyPost.priority}</span>
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">조회수</span>
                      <span className="text-sm font-medium">{policyPost.views.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">좋아요</span>
                      <span className="text-sm font-medium">{policyPost.likes}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">첨부파일</span>
                      <span className="text-sm font-medium">{policyPost.attachments.length}개</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Related Posts */}
              <Card className="bg-white shadow-lg border-0">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-cert-red" />
                    관련 게시물
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    {relatedPosts.map((post) => (
                      <Link key={post.id} href={`/board/${post.id}`}>
                        <div className="p-3 rounded-lg border border-gray-200 hover:border-cert-red transition-colors group">
                          <div className="flex items-start gap-2 mb-2">
                            {post.isNotice && <Bell className="w-3 h-3 text-cert-red mt-1" />}
                            {getPriorityIcon(post.priority)}
                          </div>
                          <h4 className="font-medium text-sm text-gray-900 group-hover:text-cert-red line-clamp-2 mb-2">
                            {post.title}
                          </h4>
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <Badge variant="outline" className={getCategoryColor(post.category)}>
                              {post.category}
                            </Badge>
                            <div className="flex items-center gap-2">
                              <span>{post.date}</span>
                              <span>•</span>
                              <span>{post.views} 조회</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Popular Posts */}
              <Card className="bg-white shadow-lg border-0">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Award className="w-5 h-5 text-cert-red" />
                    인기 게시물
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    {popularPosts.map((post, index) => (
                      <Link key={post.id} href={`/board/${post.id}`}>
                        <div className="p-3 rounded-lg border border-gray-200 hover:border-cert-red transition-colors group">
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-6 h-6 bg-cert-red text-white rounded-full flex items-center justify-center text-xs font-bold">
                              {index + 1}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-sm text-gray-900 group-hover:text-cert-red line-clamp-2 mb-2">
                                {post.title}
                              </h4>
                              <div className="flex items-center justify-between text-xs text-gray-500">
                                <Badge variant="outline" className={getCategoryColor(post.category)}>
                                  {post.category}
                                </Badge>
                                <div className="flex items-center gap-2">
                                  <span>{post.views} 조회</span>
                                  <span>•</span>
                                  <span>{post.likes} 좋아요</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
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
