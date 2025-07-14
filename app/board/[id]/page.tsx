"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  ArrowLeft,
  Calendar,
  Eye,
  Heart,
  Share2,
  Bookmark,
  MoreVertical,
  Edit,
  Flag,
  Trash2,
  Tag,
  MessageCircle,
  Pin,
  Download,
} from "lucide-react"
import { renderMarkdown } from "@/lib/markdown"

const mockPost = {
  id: 1,
  title: "웹 애플리케이션 보안 취약점 분석 및 대응 방안",
  content: `# 웹 애플리케이션 보안 취약점 분석 및 대응 방안

## 개요

최근 웹 애플리케이션에서 발견되는 주요 보안 취약점들을 분석하고, 각각에 대한 효과적인 대응 방안을 제시합니다.

## 주요 취약점 유형

### 1. SQL Injection

SQL Injection은 가장 일반적이면서도 위험한 웹 애플리케이션 취약점 중 하나입니다.

**공격 예시:**
\`\`\`sql
SELECT * FROM users WHERE username = 'admin' OR '1'='1' --' AND password = 'password'
\`\`\`

**대응 방안:**
- Prepared Statement 사용
- 입력값 검증 및 이스케이프 처리
- 최소 권한 원칙 적용

### 2. Cross-Site Scripting (XSS)

XSS 공격은 악성 스크립트를 웹 페이지에 삽입하여 사용자의 브라우저에서 실행시키는 공격입니다.

**공격 유형:**
- **Stored XSS**: 서버에 저장된 악성 스크립트
- **Reflected XSS**: URL 파라미터를 통한 즉시 반사
- **DOM-based XSS**: 클라이언트 측 DOM 조작

**대응 방안:**
- 입력값 검증 및 출력값 인코딩
- Content Security Policy (CSP) 적용
- HttpOnly 쿠키 사용

### 3. Cross-Site Request Forgery (CSRF)

CSRF는 사용자가 의도하지 않은 요청을 강제로 실행시키는 공격입니다.

**대응 방안:**
- CSRF 토큰 사용
- SameSite 쿠키 속성 설정
- Referer 헤더 검증

## 보안 테스트 도구

### 자동화 도구
- **OWASP ZAP**: 무료 웹 애플리케이션 보안 스캐너
- **Burp Suite**: 전문적인 웹 보안 테스트 플랫폼
- **Nessus**: 종합적인 취약점 스캐너

### 수동 테스트 체크리스트
- [ ] 인증 및 세션 관리 검증
- [ ] 입력값 검증 테스트
- [ ] 권한 부여 확인
- [ ] 에러 처리 검증
- [x] SSL/TLS 설정 확인

## 보안 개발 생명주기 (SDLC)

> 보안은 개발 프로세스의 모든 단계에서 고려되어야 합니다.

### 단계별 보안 활동

1. **요구사항 분석**
   - 보안 요구사항 정의
   - 위험 분석 수행

2. **설계**
   - 보안 아키텍처 설계
   - 위협 모델링

3. **구현**
   - 보안 코딩 가이드라인 준수
   - 정적 분석 도구 활용

4. **테스트**
   - 보안 테스트 수행
   - 침투 테스트 실시

5. **배포**
   - 보안 설정 검증
   - 모니터링 체계 구축

## 최신 보안 동향

### Zero Trust 아키텍처

전통적인 경계 기반 보안에서 벗어나 **"신뢰하지 않고 검증하라"**는 원칙을 기반으로 합니다.

**핵심 원칙:**
- 모든 트래픽을 기본적으로 신뢰하지 않음
- 최소 권한 접근 제어
- 지속적인 검증 및 모니터링

### DevSecOps

개발(Dev), 보안(Sec), 운영(Ops)을 통합하여 보안을 개발 프로세스에 자동화하고 통합합니다.

## 참고 자료

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [NIST Cybersecurity Framework](https://www.nist.gov/cyberframework)
- [CWE/SANS Top 25](https://cwe.mitre.org/top25/)

---

**작성자**: 보안팀  
**최종 수정**: 2024년 1월 15일  
**태그**: #웹보안 #취약점분석 #OWASP #보안테스트`,
  author: {
    name: "김보안",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "김보",
    role: "보안팀",
  },
  date: "2024-01-15",
  category: "보안분석",
  tags: ["웹보안", "취약점분석", "OWASP", "보안테스트"],
  views: 456,
  likes: 23,
  comments: 12,
  isPinned: true,
  attachments: [
    {
      name: "security-checklist.pdf",
      size: "2.3 MB",
      type: "application/pdf",
    },
    {
      name: "vulnerability-report.xlsx",
      size: "1.8 MB",
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    },
  ],
}

export default function BoardDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [post, setPost] = useState(mockPost)
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)

  const handleLike = () => {
    setIsLiked(!isLiked)
    setPost((prev) => ({
      ...prev,
      likes: isLiked ? prev.likes - 1 : prev.likes + 1,
    }))
  }

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "공지사항":
        return "bg-red-50 text-red-600 border-red-200"
      case "보안분석":
        return "bg-blue-50 text-blue-600 border-blue-200"
      case "기술자료":
        return "bg-green-50 text-green-600 border-green-200"
      case "스터디":
        return "bg-purple-50 text-purple-600 border-purple-200"
      case "자유게시판":
        return "bg-yellow-50 text-yellow-600 border-yellow-200"
      default:
        return "bg-gray-50 text-gray-600 border-gray-200"
    }
  }

  const getFileIcon = (type: string) => {
    if (type.includes("pdf")) return "📄"
    if (type.includes("excel") || type.includes("spreadsheet")) return "📊"
    if (type.includes("word") || type.includes("document")) return "📝"
    if (type.includes("image")) return "🖼️"
    return "📎"
  }

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" onClick={() => router.back()} className="mb-4 text-gray-600 hover:text-cert-red">
            <ArrowLeft className="w-4 h-4 mr-2" />
            목록으로 돌아가기
          </Button>
        </div>

        {/* Post Content */}
        <Card className="bg-white border-gray-200 shadow-lg mb-8">
          <CardHeader className="border-b border-gray-100">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                {post.isPinned && <Pin className="w-4 h-4 text-cert-red" />}
                <Badge variant="outline" className={getCategoryColor(post.category)}>
                  {post.category}
                </Badge>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Edit className="w-4 h-4 mr-2" />
                    수정
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Share2 className="w-4 h-4 mr-2" />
                    공유
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Flag className="w-4 h-4 mr-2" />
                    신고
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600">
                    <Trash2 className="w-4 h-4 mr-2" />
                    삭제
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <CardTitle className="text-3xl text-gray-900 mb-6 leading-tight">{post.title}</CardTitle>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={post.author.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-gray-100 text-gray-600">{post.author.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900">{post.author.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {post.author.role}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  {post.views}
                </div>
                <div className="flex items-center gap-1">
                  <Heart className="w-4 h-4" />
                  {post.likes}
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="w-4 h-4" />
                  {post.comments}
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-8">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="text-xs bg-gray-100 text-gray-600 hover:bg-gray-200 cursor-pointer"
                >
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Content with Markdown */}
            <div className="max-w-none mb-8">
              <div
                className="leading-relaxed text-gray-900"
                dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
              />
            </div>

            {/* Attachments */}
            {post.attachments && post.attachments.length > 0 && (
              <div className="border-t border-gray-100 pt-6 mb-6">
                <h4 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  첨부파일 ({post.attachments.length})
                </h4>
                <div className="space-y-3">
                  {post.attachments.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <span className="text-2xl">{getFileIcon(file.type)}</span>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{file.name}</p>
                        <p className="text-sm text-gray-500">{file.size}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        다운로드
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-100">
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
                  좋아요 {post.likes}
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
              </div>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                공유하기
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
