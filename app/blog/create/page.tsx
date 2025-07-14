"use client"

import type React from "react"

import { useState, useRef, useCallback, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  ArrowLeft,
  Save,
  Eye,
  Settings,
  Maximize2,
  Minimize2,
  Bold,
  Italic,
  Code,
  Link,
  List,
  ListOrdered,
  Quote,
  Hash,
  Table,
  ImageIcon,
  Upload,
  Tag,
  X,
  Globe,
  Lock,
  Loader2,
  CheckCircle,
  AlertCircle,
  FileText,
  Download,
  Copy,
  Heading1,
  Heading2,
  Heading3,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { renderMarkdown } from "@/lib/markdown"

// Types
interface FileUpload {
  id: string
  name: string
  size: number
  type: string
  url: string
  uploadedAt: Date
}

interface PostData {
  title: string
  content: string
  category: string
  tags: string[]
  isPublic: boolean
  attachments: FileUpload[]
  seoTitle?: string
  seoDescription?: string
  seoKeywords?: string
  linkedStudyProject?: string
}

// Mock data
const categories = [
  { value: "tech", label: "기술", color: "bg-blue-50 text-blue-700 border-blue-200" },
  { value: "security", label: "보안", color: "bg-red-50 text-red-700 border-red-200" },
  { value: "project", label: "프로젝트", color: "bg-green-50 text-green-700 border-green-200" },
  { value: "study", label: "스터디", color: "bg-purple-50 text-purple-700 border-purple-200" },
  { value: "news", label: "뉴스", color: "bg-yellow-50 text-yellow-700 border-yellow-200" },
  { value: "review", label: "리뷰", color: "bg-pink-50 text-pink-700 border-pink-200" },
]

const suggestedTags = [
  "웹해킹",
  "네트워크보안",
  "암호학",
  "포렌식",
  "리버싱",
  "모의해킹",
  "CTF",
  "버그바운티",
  "취약점분석",
  "보안도구",
  "파이썬",
  "자바스크립트",
  "리액트",
  "노드js",
  "데이터베이스",
  "클라우드",
  "DevOps",
  "AI",
  "머신러닝",
  "블록체인",
]

const studiesProjects = [
  { id: "web-hacking", title: "웹 해킹 기초 스터디", type: "study" },
  { id: "network-security", title: "네트워크 보안 프로젝트", type: "project" },
  { id: "ctf-team", title: "CTF 팀 활동", type: "study" },
  { id: "bug-bounty", title: "버그바운티 프로그램", type: "project" },
]

export default function CreateBlogPost() {
  const router = useRouter()
  const editorRef = useRef<HTMLTextAreaElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)

  const [postData, setPostData] = useState<PostData>({
    title: "",
    content: `# React 학습 노트

## 개요
React는 사용자 인터페이스를 구축하기 위한 JavaScript 라이브러리입니다.

## 주요 개념

### 컴포넌트
React 애플리케이션은 컴포넌트로 구성됩니다.

\`\`\`javascript
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
\`\`\`

### Props와 State
- **Props**: 컴포넌트에 전달되는 데이터
- **State**: 컴포넌트 내부에서 관리되는 데이터

## Key Learnings

### State Management
React의 상태 관리는 컴포넌트의 핵심입니다.

### Effect Hook
\`useEffect\`를 사용하여 사이드 이펙트를 처리할 수 있습니다.

## Next Steps
- [ ] Advanced hooks 학습
- [ ] Context API 이해
- [ ] Performance optimization`,
    category: "",
    tags: [],
    isPublic: false,
    attachments: [],
  })

  const [tagInput, setTagInput] = useState("")
  const [filteredTags, setFilteredTags] = useState<string[]>([])
  const [showTagSuggestions, setShowTagSuggestions] = useState(false)
  const [saveStatus, setSaveStatus] = useState<"saved" | "saving" | "unsaved">("unsaved")
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({})

  // Auto-save functionality
  useEffect(() => {
    const timer = setTimeout(() => {
      if (saveStatus === "unsaved") {
        handleAutoSave()
      }
    }, 2000)

    return () => clearTimeout(timer)
  }, [postData, saveStatus])

  // Tag filtering
  useEffect(() => {
    if (tagInput) {
      const filtered = suggestedTags.filter(
        (tag) => tag.toLowerCase().includes(tagInput.toLowerCase()) && !postData.tags.includes(tag),
      )
      setFilteredTags(filtered.slice(0, 5))
      setShowTagSuggestions(true)
    } else {
      setShowTagSuggestions(false)
    }
  }, [tagInput, postData.tags])

  // Scroll synchronization
  const handleEditorScroll = useCallback(() => {
    if (editorRef.current && previewRef.current) {
      const editor = editorRef.current
      const preview = previewRef.current
      const scrollPercentage = editor.scrollTop / (editor.scrollHeight - editor.clientHeight)
      preview.scrollTop = scrollPercentage * (preview.scrollHeight - preview.clientHeight)
    }
  }, [])

  const handleAutoSave = async () => {
    setSaveStatus("saving")
    // Simulate auto-save
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setSaveStatus("saved")
  }

  const handleSave = async () => {
    setSaveStatus("saving")
    // Simulate save
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setSaveStatus("saved")
  }

  const handlePublish = async () => {
    setSaveStatus("saving")
    // Simulate publish
    await new Promise((resolve) => setTimeout(resolve, 2000))
    router.push("/blog")
  }

  const insertMarkdown = (syntax: string, placeholder?: string) => {
    if (!editorRef.current) return

    const textarea = editorRef.current
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = textarea.value.substring(start, end)

    let insertText = syntax
    if (placeholder && !selectedText) {
      insertText = syntax.replace("{}", placeholder)
    } else if (selectedText) {
      insertText = syntax.replace("{}", selectedText)
    }

    const newContent = textarea.value.substring(0, start) + insertText + textarea.value.substring(end)

    setPostData((prev) => ({ ...prev, content: newContent }))
    setSaveStatus("unsaved")

    // Set cursor position
    setTimeout(() => {
      textarea.focus()
      const newPosition = start + insertText.length
      textarea.setSelectionRange(newPosition, newPosition)
    }, 0)
  }

  const handleTagAdd = (tag: string) => {
    if (!postData.tags.includes(tag)) {
      setPostData((prev) => ({
        ...prev,
        tags: [...prev.tags, tag],
      }))
      setSaveStatus("unsaved")
    }
    setTagInput("")
    setShowTagSuggestions(false)
  }

  const handleTagRemove = (tagToRemove: string) => {
    setPostData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
    setSaveStatus("unsaved")
  }

  const handleFileUpload = async (files: FileList) => {
    const newUploads: FileUpload[] = []

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const fileId = `file-${Date.now()}-${i}`

      // Simulate upload progress
      setUploadProgress((prev) => ({ ...prev, [fileId]: 0 }))

      // Simulate file upload
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise((resolve) => setTimeout(resolve, 100))
        setUploadProgress((prev) => ({ ...prev, [fileId]: progress }))
      }

      const upload: FileUpload = {
        id: fileId,
        name: file.name,
        size: file.size,
        type: file.type,
        url: URL.createObjectURL(file),
        uploadedAt: new Date(),
      }

      newUploads.push(upload)

      // If it's an image, insert into markdown
      if (file.type.startsWith("image/")) {
        const imageMarkdown = `
![${file.name}](${upload.url})
`
        setPostData((prev) => ({
          ...prev,
          content: prev.content + imageMarkdown,
        }))
      }
    }

    setPostData((prev) => ({
      ...prev,
      attachments: [...prev.attachments, ...newUploads],
    }))

    setSaveStatus("unsaved")

    // Clear upload progress
    setTimeout(() => {
      setUploadProgress({})
    }, 1000)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)

    if (e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
  }

  const getCategoryColor = (categoryValue: string) => {
    const category = categories.find((cat) => cat.value === categoryValue)
    return category?.color || "bg-gray-50 text-gray-600 border-gray-200"
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <div
      className={cn(
        "min-h-screen bg-gray-50 dark:bg-gray-900 transition-all duration-300",
        isFullscreen ? "fixed inset-0 z-50 bg-white dark:bg-gray-900" : "",
      )}
    >
      {/* Top Toolbar */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {!isFullscreen && (
              <Button variant="ghost" size="sm" onClick={() => router.back()}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                뒤로가기
              </Button>
            )}

            <div className="flex items-center gap-2">
              <Input
                placeholder="제목을 입력하세요..."
                value={postData.title}
                onChange={(e) => {
                  setPostData((prev) => ({ ...prev, title: e.target.value }))
                  setSaveStatus("unsaved")
                }}
                className="w-80 font-medium bg-white dark:bg-gray-700 text-black dark:text-white"
              />

              <Select
                value={postData.category}
                onValueChange={(value) => {
                  setPostData((prev) => ({ ...prev, category: value }))
                  setSaveStatus("unsaved")
                }}
              >
                <SelectTrigger className="w-40 bg-white dark:bg-gray-700 text-black dark:text-white">
                  <SelectValue placeholder="카테고리" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-700">
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value} className="text-black dark:text-white">
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Save Status */}
            <div className="flex items-center gap-2 text-sm">
              {saveStatus === "saving" && (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-cert-red" />
                  <span className="text-gray-600 dark:text-gray-400">저장 중...</span>
                </>
              )}
              {saveStatus === "saved" && (
                <>
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-gray-600 dark:text-gray-400">저장됨</span>
                </>
              )}
              {saveStatus === "unsaved" && (
                <>
                  <AlertCircle className="w-4 h-4 text-yellow-500" />
                  <span className="text-gray-600 dark:text-gray-400">저장되지 않음</span>
                </>
              )}
            </div>

            {/* Visibility Toggle */}
            <div className="flex items-center gap-2">
              <Label htmlFor="public-toggle" className="text-sm text-black dark:text-white">
                {postData.isPublic ? (
                  <div className="flex items-center gap-1 text-green-600">
                    <Globe className="w-4 h-4" />
                    공개
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                    <Lock className="w-4 h-4" />
                    내부
                  </div>
                )}
              </Label>
              <Switch
                id="public-toggle"
                checked={postData.isPublic}
                onCheckedChange={(checked) => {
                  setPostData((prev) => ({ ...prev, isPublic: checked }))
                  setSaveStatus("unsaved")
                }}
              />
            </div>

            {/* Action Buttons */}
            <Button variant="outline" onClick={handleSave} disabled={saveStatus === "saving"}>
              <Save className="w-4 h-4 mr-2" />
              저장
            </Button>

            <Button onClick={handlePublish} className="bg-cert-red hover:bg-cert-red/80 text-white">
              <Eye className="w-4 h-4 mr-2" />
              발행
            </Button>

            {/* Settings */}
            <Dialog open={showSettings} onOpenChange={setShowSettings}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Settings className="w-4 h-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl bg-white dark:bg-gray-800">
                <DialogHeader>
                  <DialogTitle className="text-black dark:text-white">게시글 설정</DialogTitle>
                </DialogHeader>
                <div className="space-y-6">
                  {/* SEO Settings */}
                  <div className="space-y-4">
                    <h3 className="font-medium text-black dark:text-white">SEO 설정</h3>
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="seo-title" className="text-black dark:text-white">
                          SEO 제목
                        </Label>
                        <Input
                          id="seo-title"
                          placeholder="검색 엔진에 표시될 제목"
                          value={postData.seoTitle || ""}
                          onChange={(e) => setPostData((prev) => ({ ...prev, seoTitle: e.target.value }))}
                          className="bg-white dark:bg-gray-700 text-black dark:text-white"
                        />
                      </div>
                      <div>
                        <Label htmlFor="seo-description" className="text-black dark:text-white">
                          SEO 설명
                        </Label>
                        <Textarea
                          id="seo-description"
                          placeholder="검색 엔진에 표시될 설명"
                          value={postData.seoDescription || ""}
                          onChange={(e) => setPostData((prev) => ({ ...prev, seoDescription: e.target.value }))}
                          className="bg-white dark:bg-gray-700 text-black dark:text-white"
                        />
                      </div>
                      <div>
                        <Label htmlFor="seo-keywords" className="text-black dark:text-white">
                          SEO 키워드
                        </Label>
                        <Input
                          id="seo-keywords"
                          placeholder="키워드를 쉼표로 구분"
                          value={postData.seoKeywords || ""}
                          onChange={(e) => setPostData((prev) => ({ ...prev, seoKeywords: e.target.value }))}
                          className="bg-white dark:bg-gray-700 text-black dark:text-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Study/Project Linking */}
                  <div className="space-y-4">
                    <h3 className="font-medium text-black dark:text-white">스터디/프로젝트 연결</h3>
                    <Select
                      value={postData.linkedStudyProject || ""}
                      onValueChange={(value) => setPostData((prev) => ({ ...prev, linkedStudyProject: value }))}
                    >
                      <SelectTrigger className="bg-white dark:bg-gray-700 text-black dark:text-white">
                        <SelectValue placeholder="연결할 스터디/프로젝트 선택" />
                      </SelectTrigger>
                      <SelectContent className="bg-white dark:bg-gray-700">
                        {studiesProjects.map((item) => (
                          <SelectItem key={item.id} value={item.id} className="text-black dark:text-white">
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">
                                {item.type === "study" ? "스터디" : "프로젝트"}
                              </Badge>
                              {item.title}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            {/* Fullscreen Toggle */}
            <Button variant="ghost" size="sm" onClick={() => setIsFullscreen(!isFullscreen)}>
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Tags Section */}
        <div className="mt-3 flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <div className="flex flex-wrap gap-2">
              {postData.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="text-xs bg-cert-red/10 text-cert-red hover:bg-cert-red/20"
                >
                  {tag}
                  <button onClick={() => handleTagRemove(tag)} className="ml-1 hover:text-cert-red/80">
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          <div className="relative">
            <Input
              placeholder="태그 추가..."
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && tagInput.trim()) {
                  e.preventDefault()
                  handleTagAdd(tagInput.trim())
                }
              }}
              className="w-32 text-sm bg-white dark:bg-gray-700 text-black dark:text-white"
            />

            {showTagSuggestions && filteredTags.length > 0 && (
              <div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md shadow-lg z-10 mt-1">
                {filteredTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleTagAdd(tag)}
                    className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-600 text-black dark:text-white"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Editor Area */}
      <div className="flex h-[calc(100vh-120px)]">
        {/* Left Panel - Editor */}
        <div className="flex-1 flex flex-col border-r border-gray-200 dark:border-gray-700">
          {/* Markdown Toolbar */}
          <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-2">
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm" onClick={() => insertMarkdown("# {}", "제목")} title="제목 1">
                <Heading1 className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => insertMarkdown("## {}", "부제목")} title="제목 2">
                <Heading2 className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => insertMarkdown("### {}", "소제목")} title="제목 3">
                <Heading3 className="w-4 h-4" />
              </Button>

              <Separator orientation="vertical" className="h-6 mx-2" />

              <Button variant="ghost" size="sm" onClick={() => insertMarkdown("**{}**", "굵은 텍스트")} title="굵게">
                <Bold className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => insertMarkdown("*{}*", "기울인 텍스트")} title="기울임">
                <Italic className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => insertMarkdown("`{}`", "코드")} title="인라인 코드">
                <Code className="w-4 h-4" />
              </Button>

              <Separator orientation="vertical" className="h-6 mx-2" />

              <Button variant="ghost" size="sm" onClick={() => insertMarkdown("[{}](url)", "링크 텍스트")} title="링크">
                <Link className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => insertMarkdown("- {}", "목록 항목")} title="목록">
                <List className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => insertMarkdown("1. {}", "번호 목록 항목")}
                title="번호 목록"
              >
                <ListOrdered className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => insertMarkdown("> {}", "인용문")} title="인용">
                <Quote className="w-4 h-4" />
              </Button>

              <Separator orientation="vertical" className="h-6 mx-2" />

              <Button
                variant="ghost"
                size="sm"
                onClick={() => insertMarkdown("```javascript\n{}\n```", "// 코드를 입력하세요")}
                title="코드 블록"
              >
                <Hash className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => insertMarkdown("| 헤더1 | 헤더2 |\n|-------|-------|\n| {} | 내용2 |", "내용1")}
                title="테이블"
              >
                <Table className="w-4 h-4" />
              </Button>

              <Separator orientation="vertical" className="h-6 mx-2" />

              <label htmlFor="image-upload">
                <Button variant="ghost" size="sm" asChild>
                  <span title="이미지 업로드">
                    <ImageIcon className="w-4 h-4" />
                  </span>
                </Button>
              </label>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
              />

              <label htmlFor="file-upload">
                <Button variant="ghost" size="sm" asChild>
                  <span title="파일 업로드">
                    <Upload className="w-4 h-4" />
                  </span>
                </Button>
              </label>
              <input
                id="file-upload"
                type="file"
                multiple
                className="hidden"
                onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
              />
            </div>
          </div>

          {/* Editor */}
          <div
            className={cn("flex-1 relative", dragOver && "bg-cert-red/5 border-2 border-dashed border-cert-red")}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <Textarea
              ref={editorRef}
              value={postData.content}
              onChange={(e) => {
                setPostData((prev) => ({ ...prev, content: e.target.value }))
                setSaveStatus("unsaved")
              }}
              onScroll={handleEditorScroll}
              placeholder="마크다운으로 작성하세요..."
              className="w-full h-full resize-none border-0 rounded-none font-mono text-sm leading-relaxed p-4 focus-visible:ring-0 bg-white dark:bg-gray-800 text-black dark:text-white"
              style={{ minHeight: "100%" }}
            />

            {dragOver && (
              <div className="absolute inset-0 flex items-center justify-center bg-cert-red/5 border-2 border-dashed border-cert-red">
                <div className="text-center">
                  <Upload className="w-12 h-12 text-cert-red mx-auto mb-2" />
                  <p className="text-cert-red font-medium">파일을 여기에 드롭하세요</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - Preview */}
        <div className="flex-1 flex flex-col bg-white dark:bg-gray-800">
          <div className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600 px-4 py-2">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-black dark:text-white">미리보기</h3>
              <div className="flex items-center gap-2">
                {postData.category && (
                  <Badge variant="outline" className={getCategoryColor(postData.category)}>
                    {categories.find((cat) => cat.value === postData.category)?.label}
                  </Badge>
                )}
                <Badge variant="outline" className="text-xs">
                  {postData.isPublic ? "공개" : "내부"}
                </Badge>
              </div>
            </div>
          </div>

          <div ref={previewRef} className="flex-1 overflow-y-auto p-6" style={{ maxHeight: "100%" }}>
            {postData.title && <h1 className="text-3xl font-bold mb-6 text-black dark:text-white">{postData.title}</h1>}

            <div className="prose prose-lg max-w-none">
              <div
                className="leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: renderMarkdown(postData.content),
                }}
              />
            </div>
          </div>
        </div>

        {/* Upload Progress Overlay */}
        {Object.keys(uploadProgress).length > 0 && (
          <div className="fixed bottom-4 right-4 space-y-2 z-50">
            {Object.entries(uploadProgress).map(([fileId, progress]) => (
              <Card key={fileId} className="w-80 bg-white dark:bg-gray-800 shadow-lg">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Upload className="w-5 h-5 text-cert-red" />
                    <div className="flex-1">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-black dark:text-white">파일 업로드 중...</span>
                        <span className="text-black dark:text-white">{progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                        <div
                          className="bg-cert-red h-2 rounded-full transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Panel - Attachments */}
      {postData.attachments.length > 0 && (
        <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center gap-2 mb-3">
            <FileText className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <span className="text-sm font-medium text-black dark:text-white">
              첨부파일 ({postData.attachments.length})
            </span>
          </div>

          <div className="flex flex-wrap gap-3">
            {postData.attachments.map((file) => (
              <div
                key={file.id}
                className="flex items-center gap-3 bg-white dark:bg-gray-700 rounded-lg p-3 border border-gray-200 dark:border-gray-600"
              >
                <div className="flex-shrink-0">
                  {file.type.startsWith("image/") ? (
                    <ImageIcon className="w-5 h-5 text-blue-500" />
                  ) : (
                    <FileText className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-black dark:text-white truncate">{file.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{formatFileSize(file.size)}</p>
                </div>

                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="sm" title="다운로드">
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" title="링크 복사">
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setPostData((prev) => ({
                        ...prev,
                        attachments: prev.attachments.filter((a) => a.id !== file.id),
                      }))
                      setSaveStatus("unsaved")
                    }}
                    title="삭제"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
