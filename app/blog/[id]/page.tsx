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
  Clock,
  Tag,
  MessageCircle,
} from "lucide-react"
import { renderMarkdown } from "@/lib/markdown"

const mockPost = {
  id: 1,
  title: "첫 번째 프로젝트 회고: React로 만든 할 일 관리 앱",
  content: `# 첫 번째 프로젝트 회고: React로 만든 할 일 관리 앱

안녕하세요! 오늘은 제가 React를 처음 배우면서 만든 할 일 관리 앱 개발 과정과 배운 점들을 정리해보려고 합니다.

## 프로젝트 개요

### 기술 스택
- **Frontend**: React, TypeScript, Tailwind CSS
- **State Management**: React Context API
- **Storage**: Local Storage
- **Build Tool**: Vite

### 주요 기능
1. 할 일 추가/수정/삭제
2. 완료 상태 토글
3. 카테고리별 필터링
4. 검색 기능
5. 다크모드 지원

## 개발 과정

### 1. 프로젝트 설계
처음에는 단순하게 생각했지만, 실제로 설계를 시작하니 고려해야 할 것들이 많았습니다.

\`\`\`typescript
interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}
\`\`\`

### 2. 컴포넌트 구조
컴포넌트를 어떻게 나눌지 고민이 많았습니다. 결국 다음과 같이 구성했어요:

\`\`\`
App
├── Header
├── TodoForm
├── TodoList
│   └── TodoItem
├── FilterBar
└── Footer
\`\`\`

### 3. 상태 관리의 어려움
처음에는 useState만 사용했는데, 컴포넌트가 많아지면서 props drilling 문제가 발생했습니다.

**Before (Props Drilling):**
\`\`\`typescript
// 너무 많은 props를 전달해야 했음
<TodoList 
  todos={todos}
  onToggle={handleToggle}
  onDelete={handleDelete}
  onEdit={handleEdit}
  filter={filter}
  searchTerm={searchTerm}
/>
\`\`\`

**After (Context API):**
\`\`\`typescript
const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  
  return (
    <TodoContext.Provider value={{ todos, setTodos, filter, setFilter }}>
      {children}
    </TodoContext.Provider>
  );
};
\`\`\`

## 마주친 문제들과 해결 과정

### 1. 렌더링 최적화
할 일이 많아질수록 앱이 느려지는 문제가 있었습니다.

**해결책:**
- React.memo로 불필요한 리렌더링 방지
- useMemo로 필터링된 목록 캐싱
- useCallback으로 함수 메모이제이션

\`\`\`typescript
const filteredTodos = useMemo(() => {
  return todos.filter(todo => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'active') return !todo.completed;
    return true;
  }).filter(todo => 
    todo.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
}, [todos, filter, searchTerm]);
\`\`\`

### 2. 로컬 스토리지 동기화
새로고침 시 데이터가 사라지는 문제를 해결하기 위해 로컬 스토리지를 사용했습니다.

\`\`\`typescript
useEffect(() => {
  const savedTodos = localStorage.getItem('todos');
  if (savedTodos) {
    setTodos(JSON.parse(savedTodos));
  }
}, []);

useEffect(() => {
  localStorage.setItem('todos', JSON.stringify(todos));
}, [todos]);
\`\`\`

### 3. TypeScript 도입
중간에 TypeScript를 도입했는데, 처음에는 어려웠지만 버그를 미리 잡을 수 있어서 좋았습니다.

## 배운 점들

### 1. 컴포넌트 설계의 중요성
- 단일 책임 원칙을 지키려고 노력했습니다
- 재사용 가능한 컴포넌트를 만드는 것이 중요하다는 걸 깨달았어요

### 2. 상태 관리
- 언제 로컬 상태를 사용하고 언제 전역 상태를 사용할지 판단하는 능력
- Context API의 장단점을 이해하게 되었습니다

### 3. 성능 최적화
- 불필요한 리렌더링을 줄이는 방법들
- 메모이제이션의 적절한 사용법

### 4. 사용자 경험
- 로딩 상태 표시
- 에러 처리
- 접근성 고려

## 아쉬웠던 점

1. **테스트 코드 부족**: 시간에 쫓겨서 테스트를 제대로 작성하지 못했어요
2. **디자인 시스템**: 일관성 있는 디자인 시스템을 구축하지 못했습니다
3. **성능 측정**: 실제 성능을 측정하고 개선하는 과정이 부족했어요

## 다음 프로젝트에서 개선하고 싶은 점

1. **TDD 적용**: 테스트 주도 개발을 시도해보고 싶어요
2. **상태 관리 라이브러리**: Zustand나 Redux Toolkit 사용해보기
3. **백엔드 연동**: 실제 서버와 연동하는 프로젝트 만들기
4. **배포 자동화**: CI/CD 파이프라인 구축하기

## 마무리

첫 React 프로젝트였지만 정말 많은 것을 배울 수 있었습니다. 특히 컴포넌트 기반 개발의 장점과 상태 관리의 중요성을 깊이 이해하게 되었어요.

앞으로도 꾸준히 학습하고 더 나은 코드를 작성하기 위해 노력하겠습니다!

**GitHub 저장소**: [https://github.com/username/todo-app](https://github.com/username/todo-app)
**라이브 데모**: [https://my-todo-app.vercel.app](https://my-todo-app.vercel.app)

읽어주셔서 감사합니다! 궁금한 점이나 피드백이 있으시면 언제든 댓글로 남겨주세요 😊`,
  author: {
    name: "김개발",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "김개",
    role: "2학년",
  },
  date: "2024-01-15",
  category: "개발",
  tags: ["React", "JavaScript", "프로젝트", "회고"],
  views: 234,
  likes: 18,
  comments: 7,
  readTime: "5분",
}

export default function BlogDetailPage() {
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
                <Badge variant="outline" className={getCategoryColor(post.category)}>
                  {post.category}
                </Badge>
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <Clock className="w-3 h-3" />
                  {post.readTime}
                </div>
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

            {/* Content */}
            <div className="max-w-none mb-8">
              <div
                className="leading-relaxed text-gray-900"
                dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-8 mt-8 border-t border-gray-100">
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
