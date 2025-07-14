"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Lock, User, Eye, EyeOff, KeyRound, Fingerprint, UserPlus } from "lucide-react"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    id: "",
    password: "",
    rememberMe: false,
    autoLogin: false,
  })

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Login logic will be handled by parent component
    console.log("Login attempt:", formData)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4 transition-colors duration-300">
      {/* Background Security Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 opacity-5 dark:opacity-10">
          <Shield className="w-full h-full text-cert-red" />
        </div>
        <div className="absolute top-32 right-20 w-16 h-16 opacity-5 dark:opacity-10">
          <Lock className="w-full h-full text-cert-red" />
        </div>
        <div className="absolute bottom-20 left-20 w-24 h-24 opacity-5 dark:opacity-10">
          <Fingerprint className="w-full h-full text-cert-red" />
        </div>
        <div className="absolute bottom-32 right-10 w-18 h-18 opacity-5 dark:opacity-10">
          <KeyRound className="w-full h-full text-cert-red" />
        </div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <Card className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-2xl transition-colors duration-300">
          <CardHeader className="text-center space-y-4">
            {/* Logo and Title */}
            <div className="flex justify-center">
              <div className="relative w-16 h-16 mb-2">
                <Image
                  src="/images/cert-is-logo.png"
                  alt="CERT-IS Logo"
                  fill
                  className="object-contain drop-shadow-lg"
                />
                <div
                  className="absolute inset-0 rounded-full blur-lg opacity-20"
                  style={{ backgroundColor: "#9E0101" }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center justify-center gap-2">
                <Shield className="w-6 h-6 text-cert-red" />
                CERT-IS 로그인
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                사이버 보안 동아리 회원 전용 시스템
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleLogin} className="space-y-4">
              {/* ID Input */}
              <div className="space-y-2">
                <Label
                  htmlFor="id"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2"
                >
                  <User className="w-4 h-4 text-cert-red" />
                  아이디
                </Label>
                <Input
                  id="id"
                  type="text"
                  placeholder="아이디를 입력하세요"
                  value={formData.id}
                  onChange={(e) => handleInputChange("id", e.target.value)}
                  className="h-11 border-gray-300 dark:border-gray-600 focus:border-cert-red focus:ring-cert-red/20 transition-all duration-300"
                  required
                />
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2"
                >
                  <Lock className="w-4 h-4 text-cert-red" />
                  비밀번호
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="비밀번호를 입력하세요"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className="h-11 pr-10 border-gray-300 dark:border-gray-600 focus:border-cert-red focus:ring-cert-red/20 transition-all duration-300"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-11 px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4 text-gray-500" />
                    ) : (
                      <Eye className="w-4 h-4 text-gray-500" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Checkboxes */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="rememberMe"
                    checked={formData.rememberMe}
                    onCheckedChange={(checked) => handleInputChange("rememberMe", checked as boolean)}
                    className="border-gray-300 dark:border-gray-600 data-[state=checked]:bg-cert-red data-[state=checked]:border-cert-red"
                  />
                  <Label htmlFor="rememberMe" className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                    아이디 기억하기
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="autoLogin"
                    checked={formData.autoLogin}
                    onCheckedChange={(checked) => handleInputChange("autoLogin", checked as boolean)}
                    className="border-gray-300 dark:border-gray-600 data-[state=checked]:bg-cert-red data-[state=checked]:border-cert-red"
                  />
                  <Label htmlFor="autoLogin" className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                    자동 로그인
                  </Label>
                </div>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                className="w-full h-12 text-white font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
                style={{ backgroundColor: "#9E0101" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(158, 1, 1, 0.9)"
                  e.currentTarget.style.transform = "translateY(-1px)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#9E0101"
                  e.currentTarget.style.transform = "translateY(0)"
                }}
              >
                <Shield className="w-5 h-5 mr-2" />
                보안 로그인
              </Button>
            </form>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300 dark:border-gray-600" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white dark:bg-gray-800 px-2 text-gray-500 dark:text-gray-400">또는</span>
              </div>
            </div>

            {/* Sign Up Link */}
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">아직 회원이 아니신가요?</p>
              <Link href="/signup">
                <Button
                  variant="outline"
                  className="w-full h-11 border-cert-red/30 text-cert-red hover:bg-cert-red/5 hover:border-cert-red transition-all duration-300 bg-transparent"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  회원가입
                </Button>
              </Link>
            </div>

            {/* Security Notice */}
            <div className="bg-cert-red/5 dark:bg-cert-red/10 border border-cert-red/20 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <Fingerprint className="w-4 h-4 text-cert-red mt-0.5 flex-shrink-0" />
                <div className="text-xs text-gray-700 dark:text-gray-300">
                  <p className="font-medium mb-1">보안 알림</p>
                  <p>
                    안전한 로그인을 위해 개인정보를 보호하고, 의심스러운 활동이 감지되면 즉시 관리자에게 문의하세요.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Back to Home Link */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-sm text-gray-500 dark:text-gray-400 hover:text-cert-red transition-colors duration-300"
          >
            ← 홈으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  )
}
