"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, Download, FileText, Search } from "lucide-react"
import NewPostModal from "@/components/new-post-modal"
import Link from "next/link"

// Mock data for studies
const mockStudies = [
  {
    id: 1,
    title: "네트워크 보안 모니터링",
    description: "Wireshark와 Snort를 활용한 네트워크 트래픽 분석 및 침입 시스템 구축 방법을 다룹니다.",
    status: "중료", // 진행중, 모집중, 중료
    period: "2025-2 진행",
    tags: ["Network Security", "Wireshark", "IDS"],
    attachments: [
      { name: "Network_Monitoring.pdf", size: "3.8MB" },
      { name: "Snort_Rules.conf", size: "45KB" },
    ],
    participants: { current: 8, max: 8 },
    progress: 100,
    leader: "재학생",
    category: "정네트워크",
    duration: "4주",
    startDate: "2025-01-15",
    endDate: "2025-02-12",
    daysLeft: 0,
  },
  {
    id: 2,
    title: "웹 해킹 기초 스터디",
    description: "OWASP Top 10을 중심으로 한 웹 애플리케이션 보안 취약점 분석 및 실습을 진행합니다.",
    status: "진행중",
    period: "2025-1 진행",
    tags: ["Web Security", "OWASP", "Penetration Testing"],
    attachments: [
      { name: "OWASP_Top10_Guide.pdf", size: "2.1MB" },
      { name: "Lab_Environment.zip", size: "156MB" },
    ],
    participants: { current: 6, max: 10 },
    progress: 65,
    leader: "김보안",
    category: "웹보안",
    duration: "6주",
    startDate: "2025-01-08",
    endDate: "2025-02-19",
    daysLeft: 12,
  },
  {
    id: 3,
    title: "암호학 기초 이론",
    description: "대칭키, 비대칭키 암호화부터 해시 함수, 디지털 서명까지 암호학의 기본 개념을 학습합니다.",
    status: "모집중",
    period: "2025-2 예정",
    tags: ["Cryptography", "Theory", "Mathematics"],
    attachments: [],
    participants: { current: 3, max: 8 },
    progress: 0,
    leader: "이암호",
    category: "암호학",
    duration: "8주",
    startDate: "2025-02-01",
    endDate: "2025-03-26",
    daysLeft: 18,
  },
  {
    id: 4,
    title: "디지털 포렌식 실습",
    description: "실제 사건 사례를 바탕으로 한 디지털 증거 수집 및 분석 기법을 실습합니다.",
    status: "진행중",
    period: "2025-1 진행",
    tags: ["Digital Forensics", "Investigation", "Tools"],
    attachments: [
      { name: "Forensics_Tools_Guide.pdf", size: "4.2MB" },
      { name: "Case_Study_1.docx", size: "890KB" },
      { name: "Evidence_Sample.img", size: "2.1GB" },
    ],
    participants: { current: 5, max: 6 },
    progress: 40,
    leader: "박포렌식",
    category: "포렌식",
    duration: "10주",
    startDate: "2025-01-01",
    endDate: "2025-03-12",
    daysLeft: 25,
  },
]

export default function StudyPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const filteredStudies = mockStudies.filter((study) => {
    const matchesSearch =
      study.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      study.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      study.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesStatus = statusFilter === "all" || study.status === statusFilter
    const matchesCategory = categoryFilter === "all" || study.category === categoryFilter

    return matchesSearch && matchesStatus && matchesCategory
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "진행중":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "모집중":
        return "bg-green-100 text-green-800 border-green-200"
      case "중료":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">스터디</h1>
            <p className="text-gray-600 mt-2">보안 관련 학습 자료와 스터디 그룹을 확인하세요</p>
          </div>
          <NewPostModal type="study" />
        </div>

        {/* Filters */}
        <Card className="bg-white shadow-sm mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="스터디 제목, 설명, 태그로 검색..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white border-gray-300 text-black"
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-32 bg-white border-gray-300 text-black">
                    <SelectValue placeholder="상태" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="all" className="text-black">
                      전체
                    </SelectItem>
                    <SelectItem value="모집중" className="text-black">
                      모집중
                    </SelectItem>
                    <SelectItem value="진행중" className="text-black">
                      진행중
                    </SelectItem>
                    <SelectItem value="중료" className="text-black">
                      완료
                    </SelectItem>
                  </SelectContent>
                </Select>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-32 bg-white border-gray-300 text-black">
                    <SelectValue placeholder="분야" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="all" className="text-black">
                      전체
                    </SelectItem>
                    <SelectItem value="웹보안" className="text-black">
                      웹보안
                    </SelectItem>
                    <SelectItem value="정네트워크" className="text-black">
                      네트워크
                    </SelectItem>
                    <SelectItem value="암호학" className="text-black">
                      암호학
                    </SelectItem>
                    <SelectItem value="포렌식" className="text-black">
                      포렌식
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Studies Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredStudies.map((study) => (
            <Link key={study.id} href={`/study/${study.id}`}>
              <Card className="bg-white shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={getStatusColor(study.status)}>
                        {study.status}
                      </Badge>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        <span>{study.period}</span>
                      </div>
                    </div>
                    {study.daysLeft > 0 && (
                      <div className="text-sm text-gray-500">
                        <Clock className="w-4 h-4 inline mr-1" />
                        {study.daysLeft}일 남음
                      </div>
                    )}
                  </div>

                  <CardTitle className="text-xl font-bold text-black mb-3 hover:text-cert-red transition-colors">
                    {study.title}
                  </CardTitle>

                  <p className="text-black text-sm leading-relaxed mb-4">{study.description}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {study.tags.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className={`text-xs ${
                          index === 0
                            ? "bg-green-100 text-green-800"
                            : index === 1
                              ? "bg-purple-100 text-purple-800"
                              : "bg-orange-100 text-orange-800"
                        }`}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  {/* Attachments */}
                  {study.attachments.length > 0 && (
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <FileText className="w-4 h-4 text-gray-500" />
                        <span className="text-sm font-medium text-black">첨부 파일</span>
                      </div>
                      <div className="space-y-2">
                        {study.attachments.slice(0, 2).map((file, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between text-sm bg-white p-2 rounded border border-gray-200"
                          >
                            <div className="flex items-center gap-2">
                              <FileText className="w-4 h-4 text-red-500" />
                              <span className="text-black">{file.name}</span>
                              <span className="text-gray-500">{file.size}</span>
                            </div>
                            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-cert-red">
                              <Download className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                        {study.attachments.length > 2 && (
                          <div className="text-xs text-gray-500">+{study.attachments.length - 2}개 더</div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Participants and Progress */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-black">참가자</span>
                      <span className="font-medium text-black">
                        {study.participants.current}/{study.participants.max}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <Progress value={(study.participants.current / study.participants.max) * 100} className="h-2" />
                      <div className="text-xs text-gray-500">
                        {Math.round((study.participants.current / study.participants.max) * 100)}%
                      </div>
                    </div>

                    {/* Leader and Category */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div className="flex items-center gap-4">
                        <Badge variant="outline" className="text-xs bg-blue-50 text-blue-600 border-blue-200">
                          {study.leader}
                        </Badge>
                        <span className="text-sm text-black">{study.category}</span>
                      </div>

                      {study.status === "모집중" && (
                        <Button size="sm" className="bg-cert-red hover:bg-cert-red/80 text-white">
                          참가 요청
                        </Button>
                      )}

                      {study.status === "진행중" && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-cert-red text-cert-red hover:bg-cert-red hover:text-white bg-transparent"
                        >
                          참가 요청
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {filteredStudies.length === 0 && (
          <Card className="bg-white shadow-sm">
            <CardContent className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-black mb-2">검색 결과가 없습니다</h3>
              <p className="text-black mb-6">다른 검색어나 필터를 시도해보세요.</p>
              <Button
                onClick={() => {
                  setSearchTerm("")
                  setStatusFilter("all")
                  setCategoryFilter("all")
                }}
                variant="outline"
                className="border-cert-red text-cert-red hover:bg-cert-red hover:text-white"
              >
                필터 초기화
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Study Statistics */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-white shadow-sm">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-cert-red mb-2">
                {mockStudies.filter((s) => s.status === "진행중").length}
              </div>
              <div className="text-sm text-black">진행중인 스터디</div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-green-600 mb-2">
                {mockStudies.filter((s) => s.status === "모집중").length}
              </div>
              <div className="text-sm text-black">모집중인 스터디</div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-gray-600 mb-2">
                {mockStudies.filter((s) => s.status === "중료").length}
              </div>
              <div className="text-sm text-black">완료된 스터디</div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-blue-600 mb-2">
                {mockStudies.reduce((acc, study) => acc + study.participants.current, 0)}
              </div>
              <div className="text-sm text-black">총 참가자 수</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
