"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, X, Upload, Save, Tag, ImageIcon, Calendar } from "lucide-react"
import { renderMarkdown } from "@/lib/markdown"

interface NewPostModalProps {
  type: "board" | "blog" | "study"
  trigger?: React.ReactNode
}

export default function NewPostModal({ type, trigger }: NewPostModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [category, setCategory] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")
  const [attachments, setAttachments] = useState<File[]>([])
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [maxParticipants, setMaxParticipants] = useState("")
  const [activeTab, setActiveTab] = useState("write")

  const getCategories = () => {
    switch (type) {
      case "board":
        return ["공지사항", "보안분석", "기술자료", "스터디", "자유게시판"]
      case "blog":
        return ["개발", "학습", "활동", "가이드", "디자인"]
      case "study":
        return [
          "Web Security",
          "Penetration Testing",
          "Cryptography",
          "Digital Forensics",
          "Network Security",
          "Malware Analysis",
        ]
      default:
        return []
    }
  }

  const getModalTitle = () => {
    switch (type) {
      case "board":
        return "새 게시글 작성"
      case "blog":
        return "새 블로그 포스트 작성"
      case "study":
        return "새 스터디 개설"
      default:
        return "새 글 작성"
    }
  }

  const getModalDescription = () => {
    switch (type) {
      case "board":
        return "보안 관련 정보나 공지사항을 공유해주세요."
      case "blog":
        return "개발 경험이나 학습 내용을 블로그 형태로 공유해주세요."
      case "study":
        return "새로운 스터디를 개설하고 참가자를 모집해보세요."
      default:
        return "내용을 작성해주세요."
    }
  }

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setAttachments([...attachments, ...files])
  }

  const handleRemoveFile = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index))
  }

  const handleSubmit = () => {
    // 여기에 실제 제출 로직 구현
    console.log({
      type,
      title,
      content,
      category,
      tags,
      attachments,
      startDate,
      endDate,
      maxParticipants,
    })

    // 폼 초기화
    setTitle("")
    setContent("")
    setCategory("")
    setTags([])
    setAttachments([])
    setStartDate("")
    setEndDate("")
    setMaxParticipants("")
    setIsOpen(false)
  }

  const handleSaveDraft = () => {
    // 임시저장 로직
    console.log("Draft saved")
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="bg-cert-red hover:bg-cert-red/80 text-white">
            <Plus className="w-4 h-4 mr-2" />
            {type === "study" ? "스터디 개설" : "새 글 작성"}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-black">{getModalTitle()}</DialogTitle>
          <DialogDescription className="text-black">{getModalDescription()}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium text-black">
              제목 *
            </Label>
            <Input
              id="title"
              placeholder="제목을 입력하세요..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-white border-gray-300 text-black"
            />
          </div>

          {/* Category and Study-specific fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-black">카테고리 *</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="bg-white border-gray-300 text-black">
                  <SelectValue placeholder="카테고리 선택" />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-200">
                  {getCategories().map((cat) => (
                    <SelectItem key={cat} value={cat} className="text-black">
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {type === "study" && (
              <div className="space-y-2">
                <Label className="text-sm font-medium text-black">최대 참가자 수</Label>
                <Input
                  type="number"
                  placeholder="최대 참가자 수"
                  value={maxParticipants}
                  onChange={(e) => setMaxParticipants(e.target.value)}
                  className="bg-white border-gray-300 text-black"
                  min="1"
                  max="20"
                />
              </div>
            )}
          </div>

          {/* Study Duration */}
          {type === "study" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-black">시작일 *</Label>
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="bg-white border-gray-300 text-black"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-black">종료일 *</Label>
                <Input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="bg-white border-gray-300 text-black"
                />
              </div>
            </div>
          )}

          {/* Duration Policy Notice for Study */}
          {type === "study" && (
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start gap-2">
                <Calendar className="w-5 h-5 text-blue-600 mt-0.5" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-1">스터디 기간 정책</p>
                  <ul className="space-y-1 text-xs">
                    <li>• 스터디: 1주 ~ 2개월 수행 가능</li>
                    <li>• 2주 이하: 모든 주제 가능 (운동, 노래, 시험공부 등)</li>
                    <li>• 2주 이상: 보안 또는 컴퓨터 관련 주제만 가능</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Tags */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-black">태그</Label>
            <div className="flex gap-2 mb-2">
              <Input
                placeholder="태그 입력 후 Enter"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAddTag()}
                className="flex-1 bg-white border-gray-300 text-black"
              />
              <Button
                type="button"
                variant="outline"
                onClick={handleAddTag}
                className="border-gray-300 text-black hover:border-cert-red hover:text-cert-red bg-transparent"
              >
                <Tag className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="bg-gray-100 text-black hover:bg-gray-200">
                  {tag}
                  <button onClick={() => handleRemoveTag(tag)} className="ml-1 hover:text-red-600">
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          {/* File Upload for Study */}
          {type === "study" && (
            <div className="space-y-2">
              <Label className="text-sm font-medium text-black">첨부 파일</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-cert-red transition-colors bg-white">
                <input type="file" multiple onChange={handleFileUpload} className="hidden" id="file-upload" />
                <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center gap-2">
                  <Upload className="w-8 h-8 text-gray-400" />
                  <span className="text-sm text-black">파일을 드래그하거나 클릭하여 업로드</span>
                </label>
              </div>
              {attachments.length > 0 && (
                <div className="space-y-2">
                  {attachments.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200"
                    >
                      <div className="flex items-center gap-2">
                        <ImageIcon className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-black">{file.name}</span>
                        <span className="text-xs text-gray-500">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveFile(index)}
                        className="text-gray-500 hover:text-red-600"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Content Editor */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-black">내용 *</Label>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 bg-red-200">
                <TabsTrigger
                  value="write"
                  className="bg-red-200 text-black data-[state=active]:bg-cert-red data-[state=active]:text-white"
                >
                  작성
                </TabsTrigger>
                <TabsTrigger
                  value="preview"
                  className="bg-red-200 text-black data-[state=active]:bg-cert-red data-[state=active]:text-white"
                >
                  미리보기
                </TabsTrigger>
              </TabsList>
              <TabsContent value="write" className="mt-4">
                <Textarea
                  placeholder={`내용을 입력하세요... (Markdown 지원)

# 제목 1
## 제목 2
### 제목 3

**굵은 글씨** *기울임*

- 목록 항목 1
- 목록 항목 2

1. 번호 목록 1
2. 번호 목록 2

[링크 텍스트](URL)
![이미지 설명](이미지URL)

\`인라인 코드\`

\`\`\`
코드 블록
\`\`\`

> 인용문

| 표 | 헤더 |
|-----|------|
| 내용 | 내용 |`}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="min-h-[400px] bg-white border-gray-300 text-black"
                />
              </TabsContent>
              <TabsContent value="preview" className="mt-4">
                <div className="min-h-[400px] p-4 border border-gray-300 rounded-md bg-gray-50">
                  <div className="prose max-w-none">
                    {content ? (
                      <div className="leading-relaxed" dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }} />
                    ) : (
                      <p className="text-gray-500 italic">미리보기할 내용이 없습니다.</p>
                    )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={handleSaveDraft}
              className="border-gray-300 text-black hover:border-gray-400 bg-transparent"
            >
              <Save className="w-4 h-4 mr-2" />
              임시저장
            </Button>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setIsOpen(false)}
                className="border-gray-300 text-black hover:border-gray-400"
              >
                취소
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={
                  !title.trim() || !content.trim() || !category || (type === "study" && (!startDate || !endDate))
                }
                className="bg-cert-red hover:bg-cert-red/80 text-white disabled:bg-gray-300"
              >
                {type === "study" ? "스터디 개설" : "게시하기"}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
