import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { School, Plus, Eye, Database, Globe } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br pt-4 from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 rounded-full">
              <School className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            School Management
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              System
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
            A comprehensive platform for managing and discovering educational institutions with Node.js backend and MySQL database
          </p>
          
          <div className="flex items-center justify-center gap-6 text-sm text-gray-500 mb-8">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              <span>Next.js Frontend</span>
            </div>
            <div className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              <span>Node.js + MySQL</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 shadow-md">
            <CardHeader className="pb-4">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Plus className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle className="text-xl">Add School</CardTitle>
              <CardDescription>
                Register a new educational institution with comprehensive form validation and image upload
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/addSchool" className="block">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-200">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New School
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 shadow-md">
            <CardHeader className="pb-4">
              <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Eye className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle className="text-xl">View Schools</CardTitle>
              <CardDescription>
                Browse all registered schools in an ecommerce-style layout with search functionality
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/showSchools" className="block">
                <Button variant="outline" className="w-full hover:bg-green-50 hover:border-green-300 transition-all duration-200">
                  <Eye className="h-4 w-4 mr-2" />
                  View All Schools
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

      
      </div>
    </div>
  );
}