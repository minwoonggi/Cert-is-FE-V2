"use client";

import { useState } from "react";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calendar,
  Clock,
  MapPin,
  Plus,
  Users,
  CheckCircle,
  XCircle,
  AlertCircle,
  Shield,
  Terminal,
  Lock,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface LabReservation {
  id: number;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  room: string;
  requester: string;
  participants: number;
  description: string;
  type: "practical" | "meeting" | "workshop" | "study" | "conference";
  status: "approved" | "pending" | "rejected";
}

// 현재 날짜 기준으로 동적 이벤트 생성
const generateMockReservations = () => {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  return [
    {
      id: 1,
      title: "보안 세미나",
      date: new Date(currentYear, currentMonth, 5).toISOString().split("T")[0],
      startTime: "14:00",
      endTime: "16:00",
      room: "보안랩 A",
      requester: "김보안",
      status: "approved" as const,
      participants: 25,
      description: "최신 사이버보안 트렌드와 위협 동향 분석",
      type: "workshop" as const,
    },
    {
      id: 2,
      title: "CTF 대회",
      date: new Date(currentYear, currentMonth, 12).toISOString().split("T")[0],
      startTime: "10:00",
      endTime: "18:00",
      room: "컨퍼런스룸",
      requester: "CTF팀",
      status: "approved" as const,
      participants: 50,
      description: "교내 해킹 경진대회 - 웹, 포렌식, 리버싱 문제",
      type: "conference" as const,
    },
    {
      id: 3,
      title: "정기 모임",
      date: new Date(currentYear, currentMonth, 18).toISOString().split("T")[0],
      startTime: "19:00",
      endTime: "21:00",
      room: "보안랩 B",
      requester: "동아리회장",
      status: "approved" as const,
      participants: 30,
      description: "월례 정기 미팅 및 활동 계획 수립",
      type: "meeting" as const,
    },
    {
      id: 4,
      title: "해킹 실습",
      date: new Date(currentYear, currentMonth, 25).toISOString().split("T")[0],
      startTime: "15:00",
      endTime: "18:00",
      room: "보안랩 A",
      requester: "실습팀",
      status: "approved" as const,
      participants: 15,
      description: "웹 취약점 실습 및 모의해킹 시나리오",
      type: "practical" as const,
    },
    {
      id: 5,
      title: "암호학 스터디",
      date: new Date(currentYear, currentMonth, today.getDate() + 3)
        .toISOString()
        .split("T")[0],
      startTime: "18:00",
      endTime: "20:00",
      room: "보안랩 C",
      requester: "박암호",
      status: "pending" as const,
      participants: 8,
      description: "블록체인 암호화 기술 스터디",
      type: "study" as const,
    },
    {
      id: 6,
      title: "포렌식 워크샵",
      date: new Date(currentYear, currentMonth, today.getDate() + 7)
        .toISOString()
        .split("T")[0],
      startTime: "13:00",
      endTime: "17:00",
      room: "보안랩 A",
      requester: "관리자",
      status: "approved" as const,
      participants: 20,
      description: "디지털 포렌식 도구 실습 - Autopsy, Volatility",
      type: "workshop" as const,
    },
  ];
};

const mockReservations: LabReservation[] = generateMockReservations();

const rooms = ["보안랩 A", "보안랩 B", "보안랩 C", "컨퍼런스룸"];
const timeSlots = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
];
const activityTypes = [
  "practical",
  "meeting",
  "workshop",
  "study",
  "conference",
];

export default function SchedulePage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [reservations, setReservations] =
    useState<LabReservation[]>(mockReservations);

  const [newReservation, setNewReservation] = useState({
    title: "",
    date: "",
    startTime: "",
    endTime: "",
    room: "",
    participants: "",
    description: "",
    type: "practical" as const,
  });

  const formatKoreanDate = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const weekdays = [
      "일요일",
      "월요일",
      "화요일",
      "수요일",
      "목요일",
      "금요일",
      "토요일",
    ];
    const weekday = weekdays[date.getDay()];
    return `${year}년 ${month}월 ${day}일 ${weekday}`;
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dateString = date.toISOString().split("T")[0];
      const hasReservation = reservations.some(
        (res) => res.date === dateString
      );
      const approvedReservations = reservations.filter(
        (res) => res.date === dateString && res.status === "approved"
      );
      const pendingReservations = reservations.filter(
        (res) => res.date === dateString && res.status === "pending"
      );

      days.push({
        day,
        date,
        hasReservation,
        approvedCount: approvedReservations.length,
        pendingCount: pendingReservations.length,
        isToday: date.toDateString() === new Date().toDateString(),
        isSelected: selectedDate?.toDateString() === date.toDateString(),
      });
    }

    return days;
  };

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  const handleReservationSubmit = () => {
    if (
      newReservation.title &&
      newReservation.date &&
      newReservation.startTime &&
      newReservation.endTime &&
      newReservation.room
    ) {
      const reservation: LabReservation = {
        id: reservations.length + 1,
        title: newReservation.title,
        date: newReservation.date,
        startTime: newReservation.startTime,
        endTime: newReservation.endTime,
        room: newReservation.room,
        requester: "현재 사용자",
        participants: Number.parseInt(newReservation.participants) || 1,
        description: newReservation.description,
        type: newReservation.type,
        status: "pending",
      };
      setReservations([...reservations, reservation]);
      setNewReservation({
        title: "",
        date: "",
        startTime: "",
        endTime: "",
        room: "",
        participants: "",
        description: "",
        type: "practical",
      });
      setIsDialogOpen(false);
    }
  };

  const getSelectedDateReservations = () => {
    if (!selectedDate) return [];
    const dateString = selectedDate.toISOString().split("T")[0];
    return reservations.filter((res) => res.date === dateString);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-green-50 text-green-600 border-green-200">
            <CheckCircle className="w-3 h-3 mr-1" />
            승인
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-50 text-yellow-600 border-yellow-200">
            <AlertCircle className="w-3 h-3 mr-1" />
            대기중
          </Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-red-50 text-red-600 border-red-200">
            <XCircle className="w-3 h-3 mr-1" />
            거부
          </Badge>
        );
      default:
        return null;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "practical":
        return <Terminal className="w-4 h-4" />;
      case "meeting":
        return <Users className="w-4 h-4" />;
      case "workshop":
        return <Shield className="w-4 h-4" />;
      case "study":
        return <Calendar className="w-4 h-4" />;
      case "conference":
        return <Lock className="w-4 h-4" />;
      default:
        return <Calendar className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "practical":
        return "bg-blue-50 text-blue-600 border-blue-200";
      case "meeting":
        return "bg-green-50 text-green-600 border-green-200";
      case "workshop":
        return "bg-purple-50 text-purple-600 border-purple-200";
      case "study":
        return "bg-orange-50 text-orange-600 border-orange-200";
      case "conference":
        return "bg-red-50 text-red-600 border-red-200";
      default:
        return "bg-gray-50 text-gray-600 border-gray-200";
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "practical":
        return "실습";
      case "meeting":
        return "회의";
      case "workshop":
        return "워크샵";
      case "study":
        return "스터디";
      case "conference":
        return "컨퍼런스";
      default:
        return "기타";
    }
  };

  const days = getDaysInMonth(currentDate);
  const monthYear = `${currentDate.getFullYear()}년 ${
    currentDate.getMonth() + 1
  }월`;
  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="w-8 h-8 text-cert-red" />
            <h1 className="text-3xl font-bold text-gray-900">Schedule & Lab</h1>
          </div>
          <p className="text-gray-600">
            동아리 일정과 랩실 예약을 관리하는 공간입니다.
          </p>
        </div>

        {/* Calendar and Reservations Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <Card className="bg-white border-gray-200 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl text-gray-900">
                    {formatKoreanDate(currentDate)}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigateMonth("prev")}
                      className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigateMonth("next")}
                      className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Calendar Header */}
                <div className="grid grid-cols-7 gap-1 mb-4">
                  {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
                    <div
                      key={day}
                      className="text-center text-sm font-medium text-gray-600 p-2"
                    >
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Days */}
                <div className="grid grid-cols-7 gap-1">
                  {getDaysInMonth(currentDate).map((dayData, index) => {
                    if (!dayData) {
                      return (
                        <div
                          key={index}
                          className="min-h-[80px] p-2 border border-gray-100 bg-gray-50"
                        ></div>
                      );
                    }

                    const isToday =
                      dayData.date.toDateString() === new Date().toDateString();
                    const isCurrentMonth =
                      dayData.date.getMonth() === currentDate.getMonth();
                    const dayReservations = reservations.filter(
                      (r) => r.date === dayData.date.toISOString().split("T")[0]
                    );
                    const hasEvents = dayReservations.length > 0;

                    return (
                      <div
                        key={index}
                        className={`
                          relative min-h-[80px] p-2 border border-gray-100 cursor-pointer transition-all duration-200 hover:bg-gray-50
                          ${isCurrentMonth ? "bg-white" : "bg-gray-50"}
                          ${isToday ? "bg-blue-50 border-blue-200" : ""}
                          ${
                            selectedDate &&
                            dayData.date.toDateString() ===
                              selectedDate.toDateString()
                              ? "bg-cert-red/5 border-cert-red"
                              : ""
                          }
                        `}
                        onClick={() => handleDateClick(dayData.date)}
                      >
                        <div
                          className={`text-sm font-medium mb-1 ${
                            isCurrentMonth ? "text-gray-900" : "text-gray-400"
                          } ${isToday ? "text-blue-600 font-bold" : ""}`}
                        >
                          {dayData.date.getDate()}
                        </div>
                        {hasEvents && (
                          <div className="space-y-1">
                            {dayReservations.slice(0, 2).map((reservation) => (
                              <div
                                key={reservation.id}
                                className={`text-xs p-1 rounded text-center truncate ${
                                  reservation.status === "approved"
                                    ? "bg-green-100 text-green-700"
                                    : reservation.status === "pending"
                                    ? "bg-yellow-100 text-yellow-700"
                                    : "bg-red-100 text-red-700"
                                }`}
                              >
                                {reservation.title}
                              </div>
                            ))}
                            {dayReservations.length > 2 && (
                              <div className="text-xs text-gray-500 text-center">
                                +{dayReservations.length - 2}개 더
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Reservation Form & List */}
          <div className="space-y-6">
            {/* Add New Reservation */}
            <Card className="bg-white border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg text-gray-900 flex items-center gap-2">
                  <Plus className="w-5 h-5 text-cert-red" />새 예약
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-cert-red hover:bg-cert-red/80 text-white">
                      랩실 예약하기
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-white border-gray-200">
                    <DialogHeader>
                      <DialogTitle className="text-gray-900">
                        새 랩실 예약
                      </DialogTitle>
                      <DialogDescription className="text-gray-600">
                        랩실 예약 정보를 입력해주세요.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="title" className="text-gray-700">
                          제목
                        </Label>
                        <Input
                          id="title"
                          value={newReservation.title}
                          onChange={(e) =>
                            setNewReservation({
                              ...newReservation,
                              title: e.target.value,
                            })
                          }
                          className="bg-white border-gray-300 text-gray-900"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="date" className="text-gray-700">
                            날짜
                          </Label>
                          <Input
                            id="date"
                            type="date"
                            value={newReservation.date}
                            onChange={(e) =>
                              setNewReservation({
                                ...newReservation,
                                date: e.target.value,
                              })
                            }
                            className="bg-white border-gray-300 text-gray-900"
                          />
                        </div>
                        <div>
                          <Label htmlFor="room" className="text-gray-700">
                            랩실
                          </Label>
                          <Select
                            value={newReservation.room}
                            onValueChange={(value) =>
                              setNewReservation({
                                ...newReservation,
                                room: value,
                              })
                            }
                          >
                            <SelectTrigger className="bg-white border-gray-300 text-gray-900">
                              <SelectValue placeholder="랩실 선택" />
                            </SelectTrigger>
                            <SelectContent className="bg-white border-gray-200">
                              {rooms.map((room) => (
                                <SelectItem
                                  key={room}
                                  value={room}
                                  className="text-gray-900"
                                >
                                  {room}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="startTime" className="text-gray-700">
                            시작 시간
                          </Label>
                          <Select
                            value={newReservation.startTime}
                            onValueChange={(value) =>
                              setNewReservation({
                                ...newReservation,
                                startTime: value,
                              })
                            }
                          >
                            <SelectTrigger className="bg-white border-gray-300 text-gray-900">
                              <SelectValue placeholder="시작" />
                            </SelectTrigger>
                            <SelectContent className="bg-white border-gray-200">
                              {timeSlots.map((time) => (
                                <SelectItem
                                  key={time}
                                  value={time}
                                  className="text-gray-900"
                                >
                                  {time}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="endTime" className="text-gray-700">
                            종료 시간
                          </Label>
                          <Select
                            value={newReservation.endTime}
                            onValueChange={(value) =>
                              setNewReservation({
                                ...newReservation,
                                endTime: value,
                              })
                            }
                          >
                            <SelectTrigger className="bg-white border-gray-300 text-gray-900">
                              <SelectValue placeholder="종료" />
                            </SelectTrigger>
                            <SelectContent className="bg-white border-gray-200">
                              {timeSlots.map((time) => (
                                <SelectItem
                                  key={time}
                                  value={time}
                                  className="text-gray-900"
                                >
                                  {time}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="type" className="text-gray-700">
                            활동 유형
                          </Label>
                          <Select
                            value={newReservation.type}
                            onValueChange={(value) =>
                              setNewReservation({
                                ...newReservation,
                                type: value as any,
                              })
                            }
                          >
                            <SelectTrigger className="bg-white border-gray-300 text-gray-900">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-white border-gray-200">
                              {activityTypes.map((type) => (
                                <SelectItem
                                  key={type}
                                  value={type}
                                  className="text-gray-900"
                                >
                                  {getTypeLabel(type)}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label
                            htmlFor="participants"
                            className="text-gray-700"
                          >
                            참가자 수
                          </Label>
                          <Input
                            id="participants"
                            type="number"
                            value={newReservation.participants}
                            onChange={(e) =>
                              setNewReservation({
                                ...newReservation,
                                participants: e.target.value,
                              })
                            }
                            className="bg-white border-gray-300 text-gray-900"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="description" className="text-gray-700">
                          설명
                        </Label>
                        <Textarea
                          id="description"
                          value={newReservation.description}
                          onChange={(e) =>
                            setNewReservation({
                              ...newReservation,
                              description: e.target.value,
                            })
                          }
                          className="bg-white border-gray-300 text-gray-900"
                        />
                      </div>
                      <Button
                        onClick={handleReservationSubmit}
                        className="w-full bg-cert-red hover:bg-cert-red/80 text-white"
                      >
                        예약 신청
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            {/* Selected Date Events */}
            {selectedDate && (
              <Card className="bg-white border-gray-200">
                <CardHeader>
                  <CardTitle className="text-lg text-gray-900">
                    {selectedDate.toLocaleDateString("ko-KR", {
                      month: "long",
                      day: "numeric",
                      weekday: "long",
                    })}{" "}
                    일정
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {getSelectedDateReservations().length > 0 ? (
                      getSelectedDateReservations().map((reservation) => (
                        <div
                          key={reservation.id}
                          className="p-3 bg-gray-50 rounded-lg border border-gray-200"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-medium text-gray-900">
                              {reservation.title}
                            </h4>
                            <div className="flex items-center gap-2">
                              <Badge
                                variant="outline"
                                className={getTypeColor(reservation.type)}
                              >
                                {getTypeIcon(reservation.type)}
                                <span className="ml-1">
                                  {getTypeLabel(reservation.type)}
                                </span>
                              </Badge>
                              {getStatusBadge(reservation.status)}
                            </div>
                          </div>
                          <div className="text-sm text-gray-600 space-y-1">
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              {reservation.startTime} - {reservation.endTime}
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4" />
                              {reservation.room}
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4" />
                              {reservation.participants}명
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mt-2">
                            {reservation.description}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 text-center py-4">
                        선택한 날짜에 일정이 없습니다.
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* All Reservations List */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            전체 예약 현황
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reservations
              .sort(
                (a, b) =>
                  new Date(a.date).getTime() - new Date(b.date).getTime()
              )
              .map((reservation) => (
                <Card
                  key={reservation.id}
                  className="bg-white border-gray-200 hover:border-cert-red/50 transition-all duration-300 hover:shadow-lg"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg text-gray-900">
                        {reservation.title}
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className={getTypeColor(reservation.type)}
                        >
                          {getTypeIcon(reservation.type)}
                          <span className="ml-1">
                            {getTypeLabel(reservation.type)}
                          </span>
                        </Badge>
                        {getStatusBadge(reservation.status)}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="text-gray-600 mb-3">
                      {reservation.description}
                    </CardDescription>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {new Date(reservation.date).toLocaleDateString("ko-KR")}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {reservation.startTime} - {reservation.endTime}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {reservation.room}
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        {reservation.participants}명 • {reservation.requester}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>

        {/* Lab Usage Statistics */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            랩실 이용 현황
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                title: "총 예약",
                value: reservations.length,
                icon: Calendar,
              },
              {
                title: "승인된 예약",
                value: reservations.filter((r) => r.status === "approved")
                  .length,
                icon: CheckCircle,
              },
              {
                title: "이번 달 이용자",
                value: reservations.reduce((acc, r) => acc + r.participants, 0),
                icon: Users,
              },
              {
                title: "활성 랩실",
                value: rooms.length,
                icon: MapPin,
              },
            ].map((stat, index) => (
              <Card
                key={index}
                className="text-center bg-white border-gray-200 hover:border-cert-red/50 transition-all duration-300 hover:shadow-lg group"
              >
                <CardHeader>
                  <div className="flex justify-center mb-2">
                    <stat.icon className="w-8 h-8 text-cert-red group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900 group-hover:text-cert-red transition-colors">
                    {stat.value}
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    {stat.title}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
