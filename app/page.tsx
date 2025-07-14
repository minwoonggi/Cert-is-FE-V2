"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowDown,
  Shield,
  Lock,
  Eye,
  Terminal,
  Users,
  Calendar,
  BookOpen,
  MessageSquare,
  Zap,
  Globe,
  Server,
  Bug,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Korean Calendar Component
function KoreanCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const today = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - firstDay.getDay());

  const days = [];
  const current = new Date(startDate);

  while (current <= lastDay || days.length % 7 !== 0) {
    days.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }

  // 동적 이벤트 생성 - 현재 달 기준
  const events = {
    [new Date(year, month, 5).toDateString()]: "보안 세미나",
    [new Date(year, month, 12).toDateString()]: "CTF 대회",
    [new Date(year, month, 18).toDateString()]: "정기 모임",
    [new Date(year, month, 25).toDateString()]: "해킹 실습",
  };

  const monthNames = [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ];

  const dayNames = ["일", "월", "화", "수", "목", "금", "토"];

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  return (
    <div className="bg-white border border-gray-300 rounded-lg p-4 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={prevMonth}
          className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <h3 className="text-lg font-semibold text-gray-900">
          {year}년 {monthNames[month]}
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={nextMonth}
          className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map((day) => (
          <div
            key={day}
            className="text-center text-xs font-medium text-gray-600 p-2"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => {
          const isToday = day.toDateString() === today.toDateString();
          const isCurrentMonth = day.getMonth() === month;
          const hasEvent = events[day.toDateString()];

          return (
            <div
              key={index}
              className={`
                relative p-2 text-center text-sm rounded cursor-pointer transition-all duration-200
                ${isCurrentMonth ? "text-gray-900" : "text-gray-400"}
                ${isToday ? "text-white font-bold" : "hover:bg-gray-100"}
                ${hasEvent ? "border" : ""}
              `}
              style={{
                backgroundColor: isToday
                  ? "#9E0101"
                  : hasEvent
                  ? "rgba(158, 1, 1, 0.05)"
                  : "",
                borderColor: hasEvent ? "rgba(158, 1, 1, 0.2)" : "",
              }}
              title={hasEvent}
            >
              {day.getDate()}
              {hasEvent && (
                <div
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full"
                  style={{ backgroundColor: "#9E0101" }}
                ></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function HomePage() {
  const router = useRouter();
  const aboutRef = useRef<HTMLElement>(null);
  const [typedText, setTypedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const texts = [
    "Computer Emergency Response Team",
    "Information Security",
    "Ethical Hacking Experts",
    "Digital Forensics Analysts",
  ];

  // 동적 이벤트 생성
  const generateUpcomingEvents = () => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    return [
      {
        date: 5,
        title: "보안 세미나",
        description: "최신 사이버보안 트렌드",
        color: "red",
      },
      {
        date: 12,
        title: "CTF 대회",
        description: "교내 해킹 경진대회",
        color: "red",
      },
      {
        date: 18,
        title: "정기 모임",
        description: "월례 정기 미팅",
        color: "red",
      },
      {
        date: 25,
        title: "해킹 실습",
        description: "웹 취약점 실습",
        color: "red",
      },
    ].filter(
      (event) =>
        event.date >= today.getDate() || currentMonth !== today.getMonth()
    );
  };

  const upcomingEvents = generateUpcomingEvents();

  useEffect(() => {
    const currentText = texts[currentIndex];
    let charIndex = 0;

    const typeTimer = setInterval(() => {
      if (charIndex < currentText.length) {
        setTypedText(currentText.slice(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(typeTimer);
        setTimeout(() => {
          const deleteTimer = setInterval(() => {
            if (charIndex > 0) {
              setTypedText(currentText.slice(0, charIndex - 1));
              charIndex--;
            } else {
              clearInterval(deleteTimer);
              setCurrentIndex((prev) => (prev + 1) % texts.length);
            }
          }, 50);
        }, 2000);
      }
    }, 100);

    return () => clearInterval(typeTimer);
  }, [currentIndex]);

  useEffect(() => {
    const handleScroll = () => {
      if (aboutRef.current) {
        const rect = aboutRef.current.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          // Auto scroll logic can be implemented here
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToAbout = () => {
    aboutRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const navigateToSchedule = () => {
    router.push("/schedule");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br"></div>
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(158, 1, 1, 0.03), transparent 50%)",
            }}
          ></div>
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: "rgba(158, 1, 1, 0.6)" }}
            ></div>
            <div
              className="absolute top-3/4 right-1/4 w-1 h-1 rounded-full animate-pulse"
              style={{
                backgroundColor: "rgba(158, 1, 1, 0.4)",
                animationDelay: "1s",
              }}
            ></div>
            <div
              className="absolute top-1/2 left-3/4 w-1.5 h-1.5 rounded-full animate-pulse"
              style={{
                backgroundColor: "rgba(158, 1, 1, 0.6)",
                animationDelay: "2s",
              }}
            ></div>
          </div>
        </div>

        <div className="text-center text-gray-900 z-10 max-w-5xl mx-auto px-4">
          <h1 className="text-6xl md:text-8xl font-bold mb-8 animate-fade-in">
            <span className="text-gray-900 drop-shadow-lg">CERT</span>
            <span className="text-gray-900">-</span>
            <span className="text-gray-900 drop-shadow-lg">IS</span>
          </h1>

          <div className="text-xl md:text-2xl mb-8 text-gray-700 font-mono min-h-[3rem] flex items-center justify-center">
            <span
              className="animate-pulse mr-1"
              style={{ borderRight: "2px solid #9E0101" }}
            >
              {typedText}
            </span>
            <span
              className="w-0.5 h-6 animate-pulse"
              style={{ backgroundColor: "#9E0101" }}
            ></span>
          </div>
        </div>

        {/* Floating Security Icons */}
        <div className="absolute top-20 left-10 animate-bounce opacity-20">
          <Lock className="w-8 h-8" style={{ color: "rgba(158, 1, 1, 0.6)" }} />
        </div>
        <div
          className="absolute bottom-20 right-10 animate-bounce opacity-20"
          style={{ animationDelay: "1s" }}
        >
          <Shield
            className="w-10 h-10"
            style={{ color: "rgba(158, 1, 1, 0.6)" }}
          />
        </div>
        <div
          className="absolute top-1/3 right-20 animate-bounce opacity-20"
          style={{ animationDelay: "2s" }}
        >
          <Eye className="w-6 h-6" style={{ color: "rgba(158, 1, 1, 0.6)" }} />
        </div>
        <div
          className="absolute bottom-1/3 left-20 animate-bounce opacity-20"
          style={{ animationDelay: "3s" }}
        >
          <Bug className="w-7 h-7" style={{ color: "rgba(158, 1, 1, 0.6)" }} />
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <Badge
              className="mb-8 px-6 py-3 text-sm border"
              style={{
                backgroundColor: "rgba(158, 1, 1, 0.05)",
                color: "#9E0101",
                borderColor: "rgba(158, 1, 1, 0.2)",
              }}
            >
              About CERT-IS
            </Badge>
            <h2 className="text-5xl font-bold text-gray-900 mb-8">
              사이버보안의 최전선
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              CERT-IS는 급변하는 사이버 위협 환경에서 우리나라의 정보보안을
              책임질 전문가를 양성하는 대학교 동아리입니다. 실무 중심의 교육과
              최신 보안 기술 연구를 통해 미래의 사이버보안 리더를 키워나갑니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="bg-white border-gray-200 shadow-sm">
              <CardHeader className="text-center pb-6">
                <div className="mb-6">
                  <Shield
                    className="w-16 h-16 mx-auto"
                    style={{ color: "#9E0101" }}
                  />
                </div>
                <CardTitle className="text-gray-900 text-lg">
                  Penetration Testing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-center leading-relaxed">
                  실제 시스템 취약점 분석과 모의해킹을 통한 보안 강화 기법을
                  학습합니다
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200 shadow-sm">
              <CardHeader className="text-center pb-6">
                <div className="mb-6">
                  <Lock
                    className="w-16 h-16 mx-auto"
                    style={{ color: "#9E0101" }}
                  />
                </div>
                <CardTitle className="text-gray-900 text-lg">
                  Cryptography
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-center leading-relaxed">
                  암호학 이론과 실습을 통한 데이터 보호 기술 및 암호화 시스템을
                  구축합니다
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200 shadow-sm">
              <CardHeader className="text-center pb-6">
                <div className="mb-6">
                  <Eye
                    className="w-16 h-16 mx-auto"
                    style={{ color: "#9E0101" }}
                  />
                </div>
                <CardTitle className="text-gray-900 text-lg">
                  Digital Forensics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-center leading-relaxed">
                  디지털 증거 수집과 분석을 통한 사이버 범죄 수사 기법을
                  연구합니다
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200 shadow-sm">
              <CardHeader className="text-center pb-6">
                <div className="mb-6">
                  <Terminal
                    className="w-16 h-16 mx-auto"
                    style={{ color: "#9E0101" }}
                  />
                </div>
                <CardTitle className="text-gray-900 text-lg">
                  Incident Response
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-center leading-relaxed">
                  보안 사고 대응과 복구를 위한 체계적인 프로세스와 절차를
                  학습합니다
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Compact Calendar Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge
              className="mb-8 px-6 py-3 text-sm border"
              style={{
                backgroundColor: "rgba(158, 1, 1, 0.05)",
                color: "#9E0101",
                borderColor: "rgba(158, 1, 1, 0.2)",
              }}
            >
              Schedule
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              이번 달 주요 일정
            </h2>
            <p className="text-gray-600 text-lg">
              동아리 활동과 교육 스케줄을 확인하세요
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 items-center justify-center">
            <div className="max-w-sm mx-auto lg:mx-0">
              <KoreanCalendar />
            </div>

            <div className="flex-1 max-w-md">
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <Calendar
                    className="mr-2 w-5 h-5"
                    style={{ color: "#9E0101" }}
                  />
                  다가오는 일정
                </h3>

                <div className="space-y-4">
                  {upcomingEvents.map((event, index) => (
                    <div
                      key={index}
                      className="flex items-start p-3 bg-gray-50 rounded-lg border-l-4"
                      style={{ borderLeftColor: "#9E0101" }}
                    >
                      <div className="flex-shrink-0 mr-3">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                          style={{ backgroundColor: "#9E0101" }}
                        >
                          {event.date}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-gray-900 font-medium">
                          {event.title}
                        </h4>
                        <p className="text-gray-600 text-sm">
                          {event.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200">
                  <Button
                    variant="outline"
                    onClick={navigateToSchedule}
                    className="w-full transition-colors border text-gray-700 hover:text-white"
                    style={{
                      borderColor: "rgba(158, 1, 1, 0.2)",
                      color: "#9E0101",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor =
                        "rgba(158, 1, 1, 0.05)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "";
                    }}
                  >
                    전체 일정 보기
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">
              동아리 플랫폼
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              체계적인 학습 관리와 효율적인 협업을 위한 통합 플랫폼을 제공합니다
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Users,
                title: "People",
                desc: "보안 전문가들과의 네트워킹",
              },
              {
                icon: Calendar,
                title: "Schedule",
                desc: "체계적인 교육 일정 관리",
              },
              {
                icon: BookOpen,
                title: "Study",
                desc: "최신 보안 기술 연구 자료",
              },
              {
                icon: MessageSquare,
                title: "Blog",
                desc: "보안 지식 공유와 소통",
              },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
                  <div className="mb-6">
                    <item.icon
                      className="w-12 h-12 mx-auto"
                      style={{ color: "#9E0101" }}
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge
                className="mb-8 px-6 py-3 border"
                style={{
                  backgroundColor: "rgba(158, 1, 1, 0.05)",
                  color: "#9E0101",
                  borderColor: "rgba(158, 1, 1, 0.2)",
                }}
              >
                Our Mission
              </Badge>
              <h3 className="text-4xl font-bold text-gray-900 mb-8 leading-tight">
                사이버보안 전문가 양성을 통한
                <br />
                <span style={{ color: "#9E0101" }}>디지털 세상 보호</span>
              </h3>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                급변하는 사이버 위협 환경에서 우리나라의 정보보안을 책임질
                전문가를 양성하고, 실무 중심의 교육을 통해 즉시 현장에 투입
                가능한 인재를 기르는 것이 우리의 목표입니다.
              </p>
              <ul className="space-y-4 text-gray-600">
                {[
                  { icon: Zap, text: "실시간 위협 분석 및 대응 훈련" },
                  { icon: Globe, text: "국제 보안 컨퍼런스 참가 및 발표" },
                  { icon: Server, text: "기업 연계 실무 프로젝트 수행" },
                  { icon: Shield, text: "보안 자격증 취득 지원 프로그램" },
                ].map((item, index) => (
                  <li key={index} className="flex items-center">
                    <div className="mr-4">
                      <item.icon
                        className="w-6 h-6"
                        style={{ color: "#9E0101" }}
                      />
                    </div>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-10 shadow-sm">
              <div className="text-center mb-8">
                <div className="mb-6">
                  <Image
                    src="/images/cert-is-logo.png"
                    alt="CERT-IS 무당벌레 마스코트"
                    width={80}
                    height={80}
                    className="rounded-full mx-auto"
                  />
                </div>
                <h4 className="text-3xl font-bold mb-4 text-gray-900">
                  Join CERT-IS
                </h4>
                <p className="mb-8 text-gray-600 leading-relaxed">
                  사이버보안의 미래를 함께 만들어갈 동료를 찾습니다. 열정과
                  도전정신이 있다면 언제든 환영합니다!
                </p>
              </div>
              <div className="space-y-4 mb-8">
                {[
                  { label: "모집 분야", value: "모든 전공 환영" },
                  { label: "활동 시간", value: "주 2회 정기 모임" },
                  { label: "지원 자격", value: "보안에 대한 열정" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between text-sm border-b border-gray-200 pb-2"
                  >
                    <span className="text-gray-600">{item.label}</span>
                    <span className="text-gray-900 font-medium">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
              <Button
                className="w-full text-white transition-colors"
                style={{ backgroundColor: "#9E0101" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "rgba(158, 1, 1, 0.9)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#9E0101";
                }}
              >
                지원하기
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "50+", label: "Active Members" },
              { number: "100+", label: "Security Projects" },
              { number: "25+", label: "CTF Competitions" },
              { number: "5+", label: "Years of Excellence" },
            ].map((stat, index) => (
              <div key={index}>
                <div
                  className="text-4xl md:text-5xl font-bold mb-3"
                  style={{ color: "#9E0101" }}
                >
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
