"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import NewPostModal from "@/components/new-post-modal"
import { Search, Eye, Heart, MessageCircle } from "lucide-react"

const mockPosts = [
  {
    id: 1,
    title: "첫 번째 프로젝트 회고: React로 만든 할 일 관리 앱",
    excerpt:
      "React를 처음 배우면서 만든 할 일 관리 앱 개발 과정과 배운 점들을 정리해보았습니다. 컴포넌트 설계부터 상태 관리까지...",
    content: "React를 처음 배우면서 만든 할 일 관리 앱 개발 과정과 배운 점들을 정리해보았습니다...",
    author: {
      name: "김개발",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "김개",
    },
    date: "2024-01-15",
    category: "개발",
    tags: ["React", "JavaScript", "프로젝트"],
    views: 234,
    likes: 18,
    comments: 7,
    readTime: "5분",
  },
  {
    id: 2,
    title: "알고리즘 스터디 3개월 후기",
    excerpt:
      "코딩테스트 준비를 위해 시작한 알고리즘 스터디 3개월간의 여정을 돌아보며, 성장한 점과 아쉬웠던 점들을 공유합니다...",
    content: "코딩테스트 준비를 위해 시작한 알고리즘 스터디 3개월간의 여정을 돌아보며...",
    author: {
      name: "박알고",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "박알",
    },
    date: "2024-01-12",
    category: "학습",
    tags: ["Algorithm", "Study", "CodingTest"],
    views: 189,
    likes: 25,
    comments: 12,
    readTime: "7분",
  },
  {
    id: 3,
    title: "동아리 해커톤 참가 후기",
    excerpt:
      "지난 주말에 열린 대학교 연합 해커톤에 참가했습니다. 48시간 동안 팀원들과 함께 아이디어를 구현하며 느낀 점들을...",
    content: "지난 주말에 열린 대학교 연합 해커톤에 참가했습니다...",
    author: {
      name: "이해커",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "이해",
    },
    date: "2024-01-10",
    category: "활동",
    tags: ["Hackathon", "TeamWork", "Experience"],
    views: 156,
    likes: 31,
    comments: 9,
    readTime: "6분",
  },
  {
    id: 4,
    title: "신입생을 위한 개발 환경 설정 가이드",
    excerpt:
      "개발을 처음 시작하는 신입생들을 위한 개발 환경 설정 가이드입니다. VS Code 설치부터 Git 설정까지 차근차근...",
    content: "개발을 처음 시작하는 신입생들을 위한 개발 환경 설정 가이드입니다...",
    author: {
      name: "최멘토",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "최멘",
    },
    date: "2024-01-08",
    category: "가이드",
    tags: ["Guide", "Setup", "Beginner"],
    views: 298,
    likes: 42,
    comments: 15,
    readTime: "10분",
  },
  {
    id: 5,
    title: "UI/UX 디자인 공부 시작하기",
    excerpt:
      "개발자로서 디자인 감각을 기르고 싶어 시작한 UI/UX 공부 과정을 공유합니다. 추천 도서와 온라인 강의, 실습 프로젝트까지...",
    content: "개발자로서 디자인 감각을 기르고 싶어 시작한 UI/UX 공부 과정을 공유합니다...",
    author: {
      name: "정디자인",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "정디",
    },
    date: "2024-01-05",
    category: "디자인",
    tags: ["UI/UX", "Design", "Learning"],
    views: 167,
    likes: 22,
    comments: 6,
    readTime: "8분",
  },
]

const categories = ["전체", "개발", "학습", "활동", "가이드", "디자인"]

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("전체")

  const filteredPosts = mockPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "전체" || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "개발":
        return "bg-blue-50 text-blue-600 border-blue-200"
      case "학습":
        return "bg-green-50 text-green-600 border-green-200"
      case "활동":
        return "bg-purple-50 text-purple-600 border-purple-200"
      case "가이드":
        return "bg-yellow-50 text-yellow-600 border-yellow-200"
      case "디자인":
        return "bg-pink-50 text-pink-600 border-pink-200"
      default:
        return "bg-gray-50 text-gray-600 border-gray-200"
    }
  }

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <MessageCircle className="w-8 h-8 text-cert-red" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Blog</h1>
          </div>
          <p className="text-gray-600">동아리 멤버들의 경험과 지식을 공유하는 공간입니다.</p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="제목, 내용, 작성자로 검색..."
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
                    ? "bg-cert-red hover:bg-cert-red/80 text-white"
                    : "border-gray-300 text-gray-600 hover:border-cert-red hover:text-cert-red"
                }
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.id}`}>
              <Card className="bg-white border-gray-200 hover:border-cert-red/50 transition-all duration-300 hover:shadow-lg group">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-3">
                    <Badge variant="outline" className={`${getCategoryColor(post.category)} text-xs`}>
                      {post.category}
                    </Badge>
                    <span className="text-xs text-gray-400">{post.readTime}</span>
                  </div>
                  <CardTitle className="text-lg text-gray-900 group-hover:text-cert-red transition-colors">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</CardDescription>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {post.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="text-xs bg-gray-100 text-gray-600 hover:bg-gray-200"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={post.author.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="text-xs bg-gray-100 text-gray-600">
                          {post.author.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{post.author.name}</p>
                        <p className="text-xs text-gray-500">{post.date}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-1 text-gray-500">
                      <Eye className="w-4 h-4" />
                      <span className="text-sm">{post.views}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-500">
                      <Heart className="w-4 h-4" />
                      <span className="text-sm">{post.likes}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-500">
                      <MessageCircle className="w-4 h-4" />
                      <span className="text-sm">{post.comments}</span>
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
            <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">검색 결과가 없습니다</h3>
            <p className="text-gray-500">다른 검색어나 카테고리를 시도해보세요.</p>
          </div>
        )}

        {/* Add New Post Button */}
        <div className="mt-12 text-center">
          <NewPostModal type="blog" />
        </div>
      </div>
    </div>
  )
}
