"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Calendar,
  BookOpen,
  MessageSquare,
  Edit,
  Eye,
  Clock,
  MapPin,
  User,
  Shield,
} from "lucide-react";

// Mock user data
const currentUser = {
  id: 1,
  name: "김동아리",
  role: "회장",
  year: "4학년",
  major: "컴퓨터공학과",
  avatar: "/placeholder.svg?height=100&width=100",
  initials: "김동",
  email: "president@club.com",
  github: "github.com/president",
  linkedin: "linkedin.com/in/president",
  location: "서울",
  joinDate: "2021-03",
  skills: ["React", "Node.js", "Python", "AWS"],
  bio: "풀스택 개발자를 꿈꾸며 다양한 프로젝트를 진행하고 있습니다. 팀워크와 소통을 중시합니다.",
  achievements: ["해커톤 1위", "프로그래밍 대회 입상", "오픈소스 기여"],
};

// Mock user's studies
const userStudies = [
  {
    id: 1,
    title: "React 18 새로운 기능 정리",
    date: "2024-01-15",
    category: "Frontend",
    tags: ["React", "Frontend", "JavaScript"],
    views: 234,
  },
  {
    id: 2,
    title: "알고리즘 문제 해결 전략",
    date: "2024-01-10",
    category: "Algorithm",
    tags: ["Algorithm", "CodingTest"],
    views: 189,
  },
];

// Mock user's blog posts
const userBlogs = [
  {
    id: 1,
    title: "첫 번째 프로젝트 회고: React로 만든 할 일 관리 앱",
    date: "2024-01-15",
    category: "개발",
    views: 234,
    likes: 18,
    comments: 7,
  },
  {
    id: 2,
    title: "동아리 해커톤 참가 후기",
    date: "2024-01-12",
    category: "활동",
    views: 156,
    likes: 31,
    comments: 9,
  },
];

// Mock today's schedule
const todaySchedule = [
  {
    id: 1,
    title: "React 스터디 모임",
    time: "14:00-16:00",
    location: "동방 A",
    type: "study",
  },
  {
    id: 2,
    title: "프로젝트 팀 미팅",
    time: "19:00-21:00",
    location: "동방 B",
    type: "meeting",
  },
];

export default function UserPage() {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editedUser, setEditedUser] = useState(currentUser);

  const handleSaveProfile = () => {
    // Here you would typically save to backend
    setIsEditDialogOpen(false);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "study":
        return "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800";
      case "meeting":
        return "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800";
      default:
        return "bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <User className="w-8 h-8 text-red-600 dark:text-red-400" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2 transition-colors duration-300">
              마이페이지
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 transition-colors duration-300">
            개인 정보와 활동 내역을 관리하세요.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-red-300 dark:hover:border-red-500 transition-all duration-300 hover:shadow-lg group">
              <CardHeader className="text-center">
                <div className="relative mb-4">
                  <Avatar className="w-24 h-24 mx-auto border-2 border-gray-200 dark:border-gray-600 group-hover:border-red-300 dark:group-hover:border-red-500 transition-colors">
                    <AvatarImage
                      src={currentUser.avatar || "/placeholder.svg"}
                    />
                    <AvatarFallback className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-2xl">
                      {currentUser.initials}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <CardTitle className="text-xl text-gray-900 dark:text-gray-100 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                  {currentUser.name}
                </CardTitle>
                <div className="flex justify-center gap-2 mb-2">
                  <Badge className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800">
                    {currentUser.role}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400"
                  >
                    {currentUser.year}
                  </Badge>
                </div>
                <CardDescription className="text-gray-600 dark:text-gray-400 transition-colors duration-300">
                  {currentUser.major}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center transition-colors duration-300">
                  {currentUser.bio}
                </p>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-red-600 dark:text-red-400" />
                    <span className="text-gray-600 dark:text-gray-400 transition-colors duration-300">
                      {currentUser.location}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-red-600 dark:text-red-400" />
                    <span className="text-gray-600 dark:text-gray-400 transition-colors duration-300">
                      {currentUser.joinDate} 가입
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2 transition-colors duration-300">
                    기술 스택
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {currentUser.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="outline"
                        className="text-xs border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:border-red-300 dark:hover:border-red-500 transition-colors"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Dialog
                  open={isEditDialogOpen}
                  onOpenChange={setIsEditDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button className="w-full bg-red-600 hover:bg-red-700 text-white transition-all duration-300">
                      <Edit className="w-4 h-4 mr-2" />
                      프로필 수정
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px] bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                    <DialogHeader>
                      <DialogTitle className="text-gray-900 dark:text-gray-100 transition-colors duration-300">
                        프로필 수정
                      </DialogTitle>
                      <DialogDescription className="text-gray-600 dark:text-gray-400 transition-colors duration-300">
                        People 카드에서 이렇게 보입니다.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label
                          htmlFor="name"
                          className="text-gray-900 dark:text-gray-100 transition-colors duration-300"
                        >
                          이름
                        </Label>
                        <Input
                          id="name"
                          value={editedUser.name}
                          onChange={(e) =>
                            setEditedUser({
                              ...editedUser,
                              name: e.target.value,
                            })
                          }
                          className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label
                          htmlFor="bio"
                          className="text-gray-900 dark:text-gray-100 transition-colors duration-300"
                        >
                          소개
                        </Label>
                        <Textarea
                          id="bio"
                          value={editedUser.bio}
                          onChange={(e) =>
                            setEditedUser({
                              ...editedUser,
                              bio: e.target.value,
                            })
                          }
                          className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label
                          htmlFor="location"
                          className="text-gray-900 dark:text-gray-100 transition-colors duration-300"
                        >
                          지역
                        </Label>
                        <Input
                          id="location"
                          value={editedUser.location}
                          onChange={(e) =>
                            setEditedUser({
                              ...editedUser,
                              location: e.target.value,
                            })
                          }
                          className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                        />
                      </div>

                      {/* Preview Card */}
                      <div className="mt-4 p-4 border rounded-lg bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 transition-colors duration-300">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2 transition-colors duration-300">
                          미리보기
                        </h4>
                        <Card className="scale-90 origin-top-left bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                          <CardHeader className="text-center pb-2">
                            <Avatar className="w-12 h-12 mx-auto mb-2 border border-gray-200 dark:border-gray-600">
                              <AvatarImage
                                src={editedUser.avatar || "/placeholder.svg"}
                              />
                              <AvatarFallback className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm">
                                {editedUser.initials}
                              </AvatarFallback>
                            </Avatar>
                            <CardTitle className="text-sm text-gray-900 dark:text-gray-100 transition-colors duration-300">
                              {editedUser.name}
                            </CardTitle>
                            <CardDescription className="text-xs text-gray-600 dark:text-gray-400 transition-colors duration-300">
                              {editedUser.bio}
                            </CardDescription>
                          </CardHeader>
                        </Card>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        onClick={() => setIsEditDialogOpen(false)}
                        className="border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:border-red-400 dark:hover:border-red-500 hover:text-red-600 dark:hover:text-red-400"
                      >
                        취소
                      </Button>
                      <Button
                        className="bg-red-600 hover:bg-red-700 text-white"
                        onClick={handleSaveProfile}
                      >
                        저장
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            {/* Today's Schedule */}
            <Card className="mt-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-red-300 dark:hover:border-red-500 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100 transition-colors duration-300">
                  <Clock className="w-5 h-5 text-red-600 dark:text-red-400" />
                  오늘 일정
                </CardTitle>
              </CardHeader>
              <CardContent>
                {todaySchedule.length > 0 ? (
                  <div className="space-y-3">
                    {todaySchedule.map((schedule) => (
                      <div
                        key={schedule.id}
                        className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-red-200 dark:hover:border-red-700 transition-colors group"
                      >
                        <div>
                          <div className="font-medium text-sm text-gray-900 dark:text-gray-100 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                            {schedule.title}
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1 transition-colors duration-300">
                            <Clock className="w-3 h-3" />
                            {schedule.time}
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1 transition-colors duration-300">
                            <MapPin className="w-3 h-3" />
                            {schedule.location}
                          </div>
                        </div>
                        <Badge className={getTypeColor(schedule.type)}>
                          {schedule.type === "study" ? "스터디" : "미팅"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-600 dark:text-gray-400 text-center py-4 transition-colors duration-300">
                    오늘 일정이 없습니다.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="studies" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-gray-100 dark:bg-gray-800">
                <TabsTrigger
                  value="studies"
                  className="flex items-center gap-2 data-[state=active]:bg-red-600 data-[state=active]:text-white"
                >
                  <BookOpen className="w-4 h-4" />내 스터디
                </TabsTrigger>
                <TabsTrigger
                  value="blogs"
                  className="flex items-center gap-2 data-[state=active]:bg-red-600 data-[state=active]:text-white"
                >
                  <MessageSquare className="w-4 h-4" />내 블로그
                </TabsTrigger>
              </TabsList>

              <TabsContent value="studies" className="space-y-4 mt-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 transition-colors duration-300">
                    내가 작성한 스터디 자료
                  </h3>
                  <Button
                    size="sm"
                    className="bg-red-600 hover:bg-red-700 text-white transition-all duration-300"
                  >
                    새 자료 작성
                  </Button>
                </div>

                {userStudies.map((study) => (
                  <Card
                    key={study.id}
                    className="hover:shadow-lg transition-all duration-300 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-red-300 dark:hover:border-red-500 group"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg text-gray-900 dark:text-gray-100 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors cursor-pointer">
                            {study.title}
                          </CardTitle>
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
                            <span>{study.date}</span>
                            <Badge
                              variant="outline"
                              className="border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:border-red-300 dark:hover:border-red-500 transition-colors"
                            >
                              {study.category}
                            </Badge>
                            <div className="flex items-center gap-1">
                              <Eye className="w-4 h-4" />
                              {study.views}
                            </div>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:border-red-400 dark:hover:border-red-500 hover:text-red-600 dark:hover:text-red-400"
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          수정
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-1">
                        {study.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="text-xs border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:border-red-300 dark:hover:border-red-500 transition-colors"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="blogs" className="space-y-4 mt-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 transition-colors duration-300">
                    내가 작성한 블로그 포스트
                  </h3>
                  <Button
                    size="sm"
                    className="bg-red-600 hover:bg-red-700 text-white transition-all duration-300"
                  >
                    새 포스트 작성
                  </Button>
                </div>

                {userBlogs.map((blog) => (
                  <Card
                    key={blog.id}
                    className="hover:shadow-lg transition-all duration-300 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-red-300 dark:hover:border-red-500 group"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg text-gray-900 dark:text-gray-100 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors cursor-pointer">
                            {blog.title}
                          </CardTitle>
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
                            <span>{blog.date}</span>
                            <Badge
                              variant="outline"
                              className="border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:border-red-300 dark:hover:border-red-500 transition-colors"
                            >
                              {blog.category}
                            </Badge>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:border-red-400 dark:hover:border-red-500 hover:text-red-600 dark:hover:text-red-400"
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          수정
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
                        <div className="flex items-center gap-1 hover:text-gray-900 dark:hover:text-gray-200 transition-colors">
                          <Eye className="w-4 h-4" />
                          {blog.views}
                        </div>
                        <div className="flex items-center gap-1 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                          <span>❤️</span>
                          {blog.likes}
                        </div>
                        <div className="flex items-center gap-1 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                          <MessageSquare className="w-4 h-4" />
                          {blog.comments}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>

            {/* Activity Statistics */}
            <div className="mt-10">
              <h3 className="text-lg font-semibold mb-6 text-gray-900 dark:text-gray-100 flex items-center gap-2 transition-colors duration-300">
                <Shield className="w-5 h-5 text-red-600 dark:text-red-400" />
                활동 통계
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    title: "스터디 자료",
                    value: userStudies.length,
                    color: "red-600",
                  },
                  {
                    title: "블로그 포스트",
                    value: userBlogs.length,
                    color: "red-600",
                  },
                  {
                    title: "총 조회수",
                    value:
                      userStudies.reduce((acc, study) => acc + study.views, 0) +
                      userBlogs.reduce((acc, blog) => acc + blog.views, 0),
                    color: "red-600",
                  },
                ].map((stat, index) => (
                  <Card
                    key={index}
                    className="text-center bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-red-300 dark:hover:border-red-500 transition-all duration-300 hover:shadow-lg group"
                  >
                    <CardHeader>
                      <CardTitle
                        className={`text-2xl font-bold text-red-600 dark:text-red-400 group-hover:scale-105 transition-transform duration-300`}
                      >
                        {stat.value}
                      </CardTitle>
                      <CardDescription className="text-gray-600 dark:text-gray-400 transition-colors duration-300">
                        {stat.title}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
