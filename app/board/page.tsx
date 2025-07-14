"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import NewPostModal from "@/components/new-post-modal"
import { Search, MessageCircle, Eye, ThumbsUp, Shield, AlertTriangle, Info, Zap } from "lucide-react"

const mockPosts = [
  {
    id: 1,
    title: "2024년 상반기 CTF 대회 참가 안내",
    content: "국제 CTF 대회에 팀 단위로 참가합니다. 웹 해킹, 포렌식, 암호학 등 다양한 분야의 문제가 출제됩니다...",
    author: "관리자",
    date: "2024-01-15",
    category: "공지사항",
    views: 256,
    likes: 18,
    comments: 12,
    isNotice: true,
    priority: "high",
  },
  {
    id: 2,
    title: "신규 취약점 CVE-2024-0001 분석 보고서",
    content: "최근 발견된 Apache 웹서버 취약점에 대한 상세 분석과 대응 방안을 공유합니다...",
    author: "김보안",
    date: "2024-01-14",
    category: "보안분석",
    views: 189,
    likes: 25,
    comments: 8,
    isNotice: false,
    priority: "medium",
  },
  {
    id: 3,
    title: "모의해킹 실습 환경 구축 가이드",
    content: "Kali Linux와 Metasploit을 활용한 모의해킹 실습 환경 구축 방법을 단계별로 설명합니다...",
    author: "이해커",
    date: "2024-01-13",
    category: "기술자료",
    views: 334,
    likes: 42,
    comments: 15,
    isNotice: false,
    priority: "medium",
  },
  {
    id: 4,
    title: "보안 동아리 랩실 이용 규칙 업데이트",
    content: "랩실 보안 강화를 위한 새로운 이용 규칙이 적용됩니다. 모든 회원은 필독 바랍니다...",
    author: "관리자",
    date: "2024-01-12",
    category: "공지사항",
    views: 178,
    likes: 8,
    comments: 5,
    isNotice: true,
    priority: "high",
  },
  {
    id: 5,
    title: "CISSP 자격증 스터디 그룹 모집",
    content: "CISSP 자격증 취득을 목표로 하는 스터디 그룹을 모집합니다. 함께 공부하실 분들을 찾습니다...",
    author: "박자격증",
    date: "2024-01-11",
    category: "스터디",
    views: 145,
    likes: 19,
    comments: 7,
    isNotice: false,
    priority: "low",
  },
]

const categories = ["전체", "공지사항", "보안분석", "기술자료", "스터디", "자유게시판"]

export default function BoardPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("전체")

  const filteredPosts = mockPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "전체" || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "공지사항":
        return "bg-red-50 text-red-600 border-red-200"
      case "보안분석":
        return "bg-orange-50 text-orange-600 border-orange-200"
      case "기술자료":
        return "bg-blue-50 text-blue-600 border-blue-200"
      case "스터디":
        return "bg-green-50 text-green-600 border-green-200"
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
      default:
        return <Zap className="w-4 h-4 text-blue-600" />
    }
  }

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-8 h-8 text-cert-red" />
            <h1 className="text-3xl font-bold text-gray-900">Security Board</h1>
          </div>
          <p className="text-gray-600">보안 정보와 기술 자료를 공유하는 전문 게시판입니다.</p>
        </div>

        {/* Search and Filter */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="보안 정보 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-cert-red"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={
                  selectedCategory === category
                    ? "bg-cert-red text-white hover:bg-cert-red/80"
                    : "border-gray-300 text-gray-600 hover:border-cert-red hover:text-cert-red"
                }
              >
                {category}
              </Button>
            ))}
          </div>
          <NewPostModal type="board" />
        </div>

        {/* Posts List */}
        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <Link key={post.id} href={`/board/${post.id}`}>
              <Card
                className={`bg-white border-gray-200 hover:border-cert-red/50 transition-all duration-300 hover:shadow-lg cursor-pointer group ${
                  post.isNotice ? "border-red-200 bg-red-50" : ""
                }`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      {post.isNotice && (
                        <div className="flex items-center gap-1 px-2 py-1 bg-red-100 text-red-600 rounded-full text-xs font-medium">
                          <AlertTriangle className="w-3 h-3" />
                          공지
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        {getPriorityIcon(post.priority)}
                        <Badge variant="outline" className={getCategoryColor(post.category)}>
                          {post.category}
                        </Badge>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">{post.date}</span>
                  </div>
                  <CardTitle className="text-lg text-gray-900 group-hover:text-cert-red transition-colors mt-2">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="text-gray-600 mb-4 line-clamp-2">{post.content}</CardDescription>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="font-medium text-gray-700">{post.author}</span>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          <span>{post.views}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <ThumbsUp className="w-4 h-4" />
                          <span>{post.likes}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="w-4 h-4" />
                          <span>{post.comments}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <Shield className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">검색 결과가 없습니다</h3>
            <p className="text-gray-500">다른 검색어나 카테고리를 시도해보세요.</p>
          </div>
        )}
      </div>
    </div>
  )
}
