"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  Building2,
  CreditCard,
  DollarSign,
  TrendingUp,
  CheckCircle,
  XCircle,
  Clock,
  MoreHorizontal,
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  FileText,
  Calendar,
} from "lucide-react"

// Mock data for demonstration
const mockUsers = [
  { id: 1, name: "John Doe", email: "john@example.com", status: "active", joinDate: "2024-01-15" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", status: "active", joinDate: "2024-01-20" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", status: "inactive", joinDate: "2024-02-01" },
]

const mockBusinesses = [
  {
    id: 1,
    name: "Tech Solutions Inc",
    owner: "John Doe",
    status: "approved",
    type: "Technology",
    appliedDate: "2024-01-16",
    email: "john@techsolutions.com",
    phone: "+1 (555) 123-4567",
    address: "123 Tech Street, San Francisco, CA 94105",
    description:
      "We provide comprehensive IT solutions for small and medium businesses, specializing in cloud infrastructure and cybersecurity services.",
    website: "https://techsolutions.com",
    businessLicense: "BL-2024-001234",
    taxId: "12-3456789",
    expectedVolume: "$50,000/month",
    documents: ["Business License", "Tax Certificate", "Bank Statement"],
  },
  {
    id: 2,
    name: "Coffee Corner",
    owner: "Jane Smith",
    status: "pending",
    type: "Food & Beverage",
    appliedDate: "2024-01-25",
    email: "jane@coffeecorner.com",
    phone: "+1 (555) 987-6543",
    address: "456 Main Street, Portland, OR 97201",
    description:
      "A cozy neighborhood coffee shop serving artisanal coffee and fresh pastries. We focus on sustainable sourcing and community engagement.",
    website: "https://coffeecorner.com",
    businessLicense: "BL-2024-005678",
    taxId: "98-7654321",
    expectedVolume: "$15,000/month",
    documents: ["Business License", "Food Service Permit", "Insurance Certificate"],
  },
  {
    id: 3,
    name: "Digital Marketing Pro",
    owner: "Bob Johnson",
    status: "pending",
    type: "Marketing",
    appliedDate: "2024-02-02",
    email: "bob@digitalmarketingpro.com",
    phone: "+1 (555) 456-7890",
    address: "789 Business Ave, Austin, TX 73301",
    description:
      "Full-service digital marketing agency helping businesses grow their online presence through SEO, social media, and paid advertising campaigns.",
    website: "https://digitalmarketingpro.com",
    businessLicense: "BL-2024-009876",
    taxId: "45-6789012",
    expectedVolume: "$30,000/month",
    documents: ["Business License", "Professional Liability Insurance", "Client References"],
  },
]

const mockTransactions = [
  {
    id: "tx_001",
    business: "Tech Solutions Inc",
    amount: 1500,
    currency: "USDC",
    status: "completed",
    date: "2024-02-15",
  },
  { id: "tx_002", business: "Coffee Corner", amount: 250, currency: "USDT", status: "failed", date: "2024-02-14" },
  {
    id: "tx_003",
    business: "Digital Marketing Pro",
    amount: 800,
    currency: "USDC",
    status: "pending",
    date: "2024-02-13",
  },
]

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedBusiness, setSelectedBusiness] = useState<number | null>(null)

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "bg-green-100 text-green-800",
      inactive: "bg-gray-100 text-gray-800",
      approved: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      completed: "bg-green-100 text-green-800",
      failed: "bg-red-100 text-red-800",
    }
    return variants[status as keyof typeof variants] || "bg-gray-100 text-gray-800"
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
      case "approved":
      case "active":
        return <CheckCircle className="h-4 w-4" />
      case "failed":
        return <XCircle className="h-4 w-4" />
      case "pending":
        return <Clock className="h-4 w-4" />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="flex h-16 items-center px-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">StableFlow Admin</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-sidebar border-r border-sidebar-border">
          <nav className="p-4 space-y-2">
            <Button
              variant="ghost"
              className={`w-full justify-start ${
                activeTab === "overview"
                  ? "bg-primary/10 text-primary hover:bg-primary/15"
                  : "hover:bg-accent hover:text-accent-foreground"
              }`}
              onClick={() => setActiveTab("overview")}
            >
              <TrendingUp className="mr-2 h-4 w-4" />
              Overview
            </Button>
            <Button
              variant="ghost"
              className={`w-full justify-start ${
                activeTab === "users"
                  ? "bg-primary/10 text-primary hover:bg-primary/15"
                  : "hover:bg-accent hover:text-accent-foreground"
              }`}
              onClick={() => setActiveTab("users")}
            >
              <Users className="mr-2 h-4 w-4" />
              Users
            </Button>
            <Button
              variant="ghost"
              className={`w-full justify-start ${
                activeTab === "businesses"
                  ? "bg-primary/10 text-primary hover:bg-primary/15"
                  : "hover:bg-accent hover:text-accent-foreground"
              }`}
              onClick={() => setActiveTab("businesses")}
            >
              <Building2 className="mr-2 h-4 w-4" />
              Businesses
            </Button>
            <Button
              variant="ghost"
              className={`w-full justify-start ${
                activeTab === "transactions"
                  ? "bg-primary/10 text-primary hover:bg-primary/15"
                  : "hover:bg-accent hover:text-accent-foreground"
              }`}
              onClick={() => setActiveTab("transactions")}
            >
              <CreditCard className="mr-2 h-4 w-4" />
              Transactions
            </Button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-foreground">Dashboard Overview</h2>
                <p className="text-muted-foreground">Monitor your StableFlow platform performance</p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{mockUsers.length}</div>
                    <p className="text-xs text-muted-foreground">+2 from last month</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Businesses</CardTitle>
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {mockBusinesses.filter((b) => b.status === "approved").length}
                    </div>
                    <p className="text-xs text-muted-foreground">1 pending approval</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{mockTransactions.length}</div>
                    <p className="text-xs text-muted-foreground">+1 from yesterday</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Transaction Volume</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      ${mockTransactions.reduce((sum, tx) => sum + tx.amount, 0).toLocaleString()}
                    </div>
                    <p className="text-xs text-muted-foreground">USDC + USDT combined</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "users" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-3xl font-bold text-foreground">Users Management</h2>
                  <p className="text-muted-foreground">Manage registered users on the platform</p>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Registered Users</CardTitle>
                  <CardDescription>List of all users registered on StableFlow</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockUsers.map((user) => (
                      <div
                        key={user.id}
                        className="flex items-center justify-between p-4 border border-border rounded-lg"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                            <Users className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{user.name}</p>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                            <p className="text-xs text-muted-foreground">Joined: {user.joinDate}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusBadge(user.status)}>
                            {getStatusIcon(user.status)}
                            <span className="ml-1">{user.status}</span>
                          </Badge>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "businesses" && (
            <div className="space-y-6">
              {selectedBusiness ? (
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedBusiness(null)}
                      className="hover:bg-accent hover:text-accent-foreground"
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back to Applications
                    </Button>
                  </div>

                  {(() => {
                    const business = mockBusinesses.find((b) => b.id === selectedBusiness)
                    if (!business) return null

                    return (
                      <div className="space-y-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <h2 className="text-3xl font-bold text-foreground">{business.name}</h2>
                            <p className="text-muted-foreground">Business Application Details</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className={getStatusBadge(business.status)}>
                              {getStatusIcon(business.status)}
                              <span className="ml-1">{business.status}</span>
                            </Badge>
                            {business.status === "pending" && (
                              <div className="flex space-x-2">
                                <Button size="sm" className="bg-primary hover:bg-primary/90">
                                  Approve
                                </Button>
                                <Button size="sm" variant="outline">
                                  Reject
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          <Card>
                            <CardHeader>
                              <CardTitle>Business Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                              <div className="flex items-center space-x-3">
                                <Building2 className="h-5 w-5 text-muted-foreground" />
                                <div>
                                  <p className="font-medium">{business.name}</p>
                                  <p className="text-sm text-muted-foreground">Business Name</p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-3">
                                <Users className="h-5 w-5 text-muted-foreground" />
                                <div>
                                  <p className="font-medium">{business.owner}</p>
                                  <p className="text-sm text-muted-foreground">Business Owner</p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-3">
                                <FileText className="h-5 w-5 text-muted-foreground" />
                                <div>
                                  <p className="font-medium">{business.type}</p>
                                  <p className="text-sm text-muted-foreground">Business Type</p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-3">
                                <Calendar className="h-5 w-5 text-muted-foreground" />
                                <div>
                                  <p className="font-medium">{business.appliedDate}</p>
                                  <p className="text-sm text-muted-foreground">Application Date</p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>

                          <Card>
                            <CardHeader>
                              <CardTitle>Contact Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                              <div className="flex items-center space-x-3">
                                <Mail className="h-5 w-5 text-muted-foreground" />
                                <div>
                                  <p className="font-medium">{business.email}</p>
                                  <p className="text-sm text-muted-foreground">Email Address</p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-3">
                                <Phone className="h-5 w-5 text-muted-foreground" />
                                <div>
                                  <p className="font-medium">{business.phone}</p>
                                  <p className="text-sm text-muted-foreground">Phone Number</p>
                                </div>
                              </div>
                              <div className="flex items-start space-x-3">
                                <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                                <div>
                                  <p className="font-medium">{business.address}</p>
                                  <p className="text-sm text-muted-foreground">Business Address</p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-3">
                                <DollarSign className="h-5 w-5 text-muted-foreground" />
                                <div>
                                  <p className="font-medium">{business.website}</p>
                                  <p className="text-sm text-muted-foreground">Website</p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>

                          <Card className="lg:col-span-2">
                            <CardHeader>
                              <CardTitle>Business Description</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-foreground leading-relaxed">{business.description}</p>
                            </CardContent>
                          </Card>

                          <Card>
                            <CardHeader>
                              <CardTitle>Legal & Financial</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                              <div>
                                <p className="font-medium">{business.businessLicense}</p>
                                <p className="text-sm text-muted-foreground">Business License</p>
                              </div>
                              <div>
                                <p className="font-medium">{business.taxId}</p>
                                <p className="text-sm text-muted-foreground">Tax ID</p>
                              </div>
                              <div>
                                <p className="font-medium">{business.expectedVolume}</p>
                                <p className="text-sm text-muted-foreground">Expected Monthly Volume</p>
                              </div>
                            </CardContent>
                          </Card>

                          <Card>
                            <CardHeader>
                              <CardTitle>Submitted Documents</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-2">
                                {business.documents.map((doc, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center justify-between p-2 border border-border rounded"
                                  >
                                    <div className="flex items-center space-x-2">
                                      <FileText className="h-4 w-4 text-muted-foreground" />
                                      <span className="text-sm">{doc}</span>
                                    </div>
                                    <Button variant="ghost" size="sm">
                                      View
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    )
                  })()}
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-3xl font-bold text-foreground">Business Management</h2>
                      <p className="text-muted-foreground">Review and approve business applications</p>
                    </div>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>Business Applications</CardTitle>
                      <CardDescription>Manage business registrations and approvals</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {mockBusinesses.map((business) => (
                          <div
                            key={business.id}
                            className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/50 cursor-pointer transition-colors"
                            onClick={() => setSelectedBusiness(business.id)}
                          >
                            <div className="flex items-center space-x-4">
                              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                <Building2 className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <p className="font-medium text-foreground">{business.name}</p>
                                <p className="text-sm text-muted-foreground">Owner: {business.owner}</p>
                                <p className="text-xs text-muted-foreground">
                                  Type: {business.type} • Applied: {business.appliedDate}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge className={getStatusBadge(business.status)}>
                                {getStatusIcon(business.status)}
                                <span className="ml-1">{business.status}</span>
                              </Badge>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          )}

          {activeTab === "transactions" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-3xl font-bold text-foreground">Transaction Management</h2>
                  <p className="text-muted-foreground">Monitor and manage stablecoin transactions</p>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                  <CardDescription>USDC and USDT payment transactions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockTransactions.map((transaction) => (
                      <div
                        key={transaction.id}
                        className="flex items-center justify-between p-4 border border-border rounded-lg"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                            <CreditCard className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{transaction.id}</p>
                            <p className="text-sm text-muted-foreground">Business: {transaction.business}</p>
                            <p className="text-xs text-muted-foreground">Date: {transaction.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <p className="font-medium text-foreground">
                              ${transaction.amount.toLocaleString()} {transaction.currency}
                            </p>
                          </div>
                          <Badge className={getStatusBadge(transaction.status)}>
                            {getStatusIcon(transaction.status)}
                            <span className="ml-1">{transaction.status}</span>
                          </Badge>
                          {transaction.status === "failed" && (
                            <Button size="sm" variant="outline">
                              Retry
                            </Button>
                          )}
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
