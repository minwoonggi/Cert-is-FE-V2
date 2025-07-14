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
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Mail,
  Github,
  Linkedin,
  MapPin,
  Calendar,
  Award,
  Users,
  Filter,
} from "lucide-react";

const mockMembers = [
  {
    id: 1,
    name: "김동아리",
    role: "회장",
    year: "4학년",
    major: "컴퓨터공학과",
    avatar: "/placeholder.svg?height=80&width=80",
    initials: "김동",
    email: "president@club.com",
    github: "github.com/president",
    linkedin: "linkedin.com/in/president",
    location: "서울",
    joinDate: "2021-03",
    skills: ["React", "Node.js", "Python", "AWS"],
    projects: 12,
    bio: "풀스택 개발자를 꿈꾸며 다양한 프로젝트를 진행하고 있습니다. 팀워크와 소통을 중시합니다.",
    achievements: ["해커톤 1위", "프로그래밍 대회 입상", "오픈소스 기여"],
  },
  {
    id: 2,
    name: "이부회장",
    role: "부회장",
    year: "3학년",
    major: "소프트웨어학과",
    avatar: "/placeholder.svg?height=80&width=80",
    initials: "이부",
    email: "vicepresident@club.com",
    github: "github.com/vicepresident",
    linkedin: "linkedin.com/in/vicepresident",
    location: "경기",
    joinDate: "2022-03",
    skills: ["JavaScript", "TypeScript", "React", "Vue.js"],
    projects: 8,
    bio: "프론트엔드 개발에 관심이 많으며, UI/UX에 대한 깊은 이해를 바탕으로 사용자 친화적인 웹을 만들고 있습니다.",
    achievements: ["웹 디자인 공모전 수상", "인턴십 수료"],
  },
  {
    id: 3,
    name: "박개발자",
    role: "개발팀장",
    year: "3학년",
    major: "컴퓨터공학과",
    avatar: "/placeholder.svg?height=80&width=80",
    initials: "박개",
    email: "devlead@club.com",
    github: "github.com/devlead",
    linkedin: "linkedin.com/in/devlead",
    location: "서울",
    joinDate: "2022-09",
    skills: ["Java", "Spring", "MySQL", "Docker"],
    projects: 6,
    bio: "백엔드 개발과 시스템 아키텍처에 관심이 많습니다. 효율적이고 확장 가능한 시스템 구축을 목표로 합니다.",
    achievements: ["기업 프로젝트 참여", "알고리즘 대회 입상"],
  },
  {
    id: 4,
    name: "최신입생",
    role: "일반회원",
    year: "1학년",
    major: "컴퓨터공학과",
    avatar: "/placeholder.svg?height=80&width=80",
    initials: "최신",
    email: "newbie@club.com",
    github: "github.com/newbie",
    linkedin: "",
    location: "인천",
    joinDate: "2024-03",
    skills: ["Python", "C++", "HTML", "CSS"],
    projects: 2,
    bio: "프로그래밍을 배우기 시작한 신입생입니다. 열정적으로 학습하며 성장하고 있습니다.",
    achievements: ["신입생 프로젝트 완주"],
  },
  {
    id: 5,
    name: "정디자이너",
    role: "디자인팀장",
    year: "2학년",
    major: "시각디자인학과",
    avatar: "/placeholder.svg?height=80&width=80",
    initials: "정디",
    email: "designer@club.com",
    github: "",
    linkedin: "linkedin.com/in/designer",
    location: "서울",
    joinDate: "2023-03",
    skills: ["Figma", "Photoshop", "Illustrator", "UI/UX"],
    projects: 5,
    bio: "사용자 경험을 중시하는 디자이너입니다. 개발자와의 협업을 통해 더 나은 제품을 만들어가고 있습니다.",
    achievements: ["디자인 공모전 수상", "UI/UX 자격증 취득"],
  },
  {
    id: 6,
    name: "한알고리즘",
    role: "일반회원",
    year: "2학년",
    major: "수학과",
    avatar: "/placeholder.svg?height=80&width=80",
    initials: "한알",
    email: "algorithm@club.com",
    github: "github.com/algorithm",
    linkedin: "",
    location: "서울",
    joinDate: "2023-09",
    skills: ["Python", "C++", "Algorithm", "Data Structure"],
    projects: 4,
    bio: "알고리즘과 자료구조에 특화된 개발자입니다. 문제 해결 능력을 기르며 효율적인 코드 작성을 추구합니다.",
    achievements: ["프로그래밍 대회 다수 입상", "알고리즘 스터디 리더"],
  },
];

const roles = ["전체", "회장", "부회장", "개발팀장", "디자인팀장", "일반회원"];
const years = ["전체", "1학년", "2학년", "3학년", "4학년"];

export default function PeoplePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("전체");
  const [selectedYear, setSelectedYear] = useState("전체");

  const filteredMembers = mockMembers.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.major.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.skills.some((skill) =>
        skill.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesRole = selectedRole === "전체" || member.role === selectedRole;
    const matchesYear = selectedYear === "전체" || member.year === selectedYear;
    return matchesSearch && matchesRole && matchesYear;
  });

  const getRoleColor = (role: string) => {
    switch (role) {
      case "회장":
        return "border";
      case "부회장":
        return "bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-700";
      case "개발팀장":
        return "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-700";
      case "디자인팀장":
        return "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-700";
      default:
        return "bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-600";
    }
  };

  const getRoleStyle = (role: string) => {
    if (role === "회장") {
      return {
        backgroundColor: "rgba(158, 1, 1, 0.05)",
        color: "#9E0101",
        borderColor: "rgba(158, 1, 1, 0.2)",
      };
    }
    return {};
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-8 h-8" style={{ color: "#9E0101" }} />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              People
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            우리 동아리의 멋진 멤버들을 소개합니다.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4" />
            <Input
              placeholder="이름, 전공, 기술스택으로 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500"
              style={{ borderColor: "rgba(158, 1, 1, 0.3)" }}
              onFocus={(e) => {
                e.target.style.borderColor = "#9E0101";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "rgba(158, 1, 1, 0.3)";
              }}
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger className="w-32 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100">
                <SelectValue placeholder="역할" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600">
                {roles.map((role) => (
                  <SelectItem
                    key={role}
                    value={role}
                    className="text-gray-900 dark:text-gray-100"
                  >
                    {role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-32 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100">
                <SelectValue placeholder="학년" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600">
                {years.map((year) => (
                  <SelectItem
                    key={year}
                    value={year}
                    className="text-gray-900 dark:text-gray-100"
                  >
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMembers.map((member) => (
            <Card
              key={member.id}
              className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-all duration-500 group hover:shadow-lg transform hover:-translate-y-1 relative z-10"
              style={{
                borderColor: "rgba(158, 1, 1, 0.2)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(158, 1, 1, 0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(158, 1, 1, 0.2)";
              }}
            >
              <CardHeader className="text-center pb-4">
                <div className="relative mb-4">
                  <Avatar
                    className="w-20 h-20 mx-auto border-2 border-gray-200 dark:border-gray-600 transition-colors"
                    style={{
                      borderColor: "rgba(158, 1, 1, 0.3)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor =
                        "rgba(158, 1, 1, 0.5)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor =
                        "rgba(158, 1, 1, 0.3)";
                    }}
                  >
                    <AvatarImage src={member.avatar} />
                    <AvatarFallback className="text-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                      {member.initials}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="space-y-2">
                  <CardTitle className="text-xl text-gray-900 dark:text-gray-100">
                    {member.name}
                  </CardTitle>
                  <div className="flex justify-center">
                    <Badge
                      variant="outline"
                      className={getRoleColor(member.role)}
                      style={getRoleStyle(member.role)}
                    >
                      {member.role}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                    <p>
                      {member.year} • {member.major}
                    </p>
                    <div className="flex items-center justify-center gap-1 text-gray-400 dark:text-gray-500">
                      <MapPin className="w-3 h-3" />
                      <span>{member.location}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="text-center text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed">
                  {member.bio}
                </CardDescription>

                {/* Skills */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    기술 스택
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {member.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="flex justify-between text-center mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {member.projects}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      프로젝트
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {member.achievements?.length || 0}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      성과
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-gray-400 dark:text-gray-500">
                    <Calendar className="w-3 h-3" />
                    <span className="text-xs">{member.joinDate}</span>
                  </div>
                </div>

                {/* Contact */}
                <div className="flex justify-center gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-gray-400 dark:text-gray-500 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#9E0101";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "";
                    }}
                  >
                    <Mail className="w-4 h-4" />
                  </Button>
                  {member.github && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-gray-400 dark:text-gray-500 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "#9E0101";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "";
                      }}
                    >
                      <Github className="w-4 h-4" />
                    </Button>
                  )}
                  {member.linkedin && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-gray-400 dark:text-gray-500 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "#9E0101";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "";
                      }}
                    >
                      <Linkedin className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredMembers.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
              검색 결과가 없습니다
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              다른 검색어나 필터를 시도해보세요.
            </p>
          </div>
        )}

        {/* Team Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { title: "총 멤버", value: mockMembers.length, icon: Users },
            {
              title: "총 프로젝트",
              value: mockMembers.reduce(
                (acc, member) => acc + member.projects,
                0
              ),
              icon: Award,
            },
            {
              title: "평균 경력",
              value: `${Math.round(
                mockMembers.reduce((acc, member) => {
                  const joinYear = parseInt(member.joinDate.split("-")[0]);
                  const experience = 2024 - joinYear;
                  return acc + experience;
                }, 0) / mockMembers.length
              )}년`,
              icon: Calendar,
            },
            {
              title: "기술 스택",
              value: new Set(mockMembers.flatMap((m) => m.skills)).size,
              icon: Filter,
            },
          ].map((stat, index) => (
            <Card
              key={index}
              className="text-center bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-lg group relative z-10"
              style={{
                borderColor: "rgba(158, 1, 1, 0.2)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(158, 1, 1, 0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(158, 1, 1, 0.2)";
              }}
            >
              <CardHeader>
                <div className="flex justify-center mb-2">
                  <stat.icon
                    className="w-8 h-8 group-hover:scale-110 transition-transform duration-300"
                    style={{ color: "#9E0101" }}
                  />
                </div>
                <CardTitle
                  className="text-2xl font-bold text-gray-900 dark:text-gray-100 transition-colors"
                  style={{
                    color: "#9E0101",
                  }}
                >
                  {stat.value}
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  {stat.title}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
