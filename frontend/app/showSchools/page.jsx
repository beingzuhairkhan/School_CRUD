'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { School as SchoolIcon, MapPin, Plus, Search, Mail, Phone } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from "sonner"
export default function ShowSchools() {
    const [schools, setSchools] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchSchools();
    }, []);

    useEffect(() => {
        const delayedSearch = setTimeout(() => {
            if (searchTerm.trim()) {
                fetchSchools(searchTerm);
            } else {
                fetchSchools();
            }
        }, 300);

        return () => clearTimeout(delayedSearch);
    }, [searchTerm]);

    const fetchSchools = async (search) => {
        try {
            setLoading(true);
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/schools`, {
                params: search ? { q: search } : {},
            });
          //  console.log(response)
            setSchools(response.data.data);
        } catch (error) {
            toast.error(' schools Not Found', error);
            setSchools([]);
        } finally {
            setLoading(false);
        }
    };

    if (loading && schools.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading schools...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <Link href="/" className="flex items-center gap-3 cursor-pointer">
                            <SchoolIcon className="h-8 w-8 text-blue-600" />
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">School Directory</h1>
                                <p className="text-gray-600">Discover educational institutions in your area</p>
                            </div>
                        </Link>
                        <Link href="/addSchool">
                            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-200">
                                <Plus className="h-4 w-4 mr-2" />
                                Add New School
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Search Bar */}
            <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="relative max-w-md mx-auto">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                        type="text"
                        placeholder="Search schools by name "
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            {/* Schools Grid */}
            <div className="max-w-7xl mx-auto px-4 pb-12">
                {schools.length === 0 ? (
                    <div className="text-center py-12">
                        <SchoolIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-600 mb-2">
                            {searchTerm ? 'No schools found' : 'No schools added yet'}
                        </h3>
                        <p className="text-gray-500 mb-6">
                            {searchTerm ? 'Try adjusting your search criteria' : 'Be the first to add a school to the directory'}
                        </p>
                        {!searchTerm && (
                            <Link href="/addSchool">
                                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add First School
                                </Button>
                            </Link>
                        )}
                    </div>
                ) : (
                    <>
                        <div className="mb-6">
                            <p className="text-gray-600">
                                {schools.length === 1
                                    ? '1 school found'
                                    : `${schools.length} schools found`}
                                {loading && <span className="ml-2 text-blue-600">Searching...</span>}
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {schools?.map((school) => (
                                <Card
                                    key={school.id}
                                    className="overflow-hidden rounded-xl border border-gray-200 shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white"
                                >
                                    {/* Image Section */}
                                    <div className="aspect-video relative  overflow-hidden">
                                        {school.image ? (
                                            <Image
                                                src={school.image}
                                                alt={school.name}
                                                fill
                                                className="object-cover transition-transform duration-500 hover:scale-110"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            />
                                        ) : (
                                            <div className="flex items-center justify-center h-full w-full">
                                                <SchoolIcon className="h-16 w-16 text-gray-300" />
                                            </div>
                                        )}

                                        {/* Gradient overlay for readability */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                                    </div>

                                    {/* Content */}
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-xl font-bold text-gray-900 line-clamp-1 flex items-center gap-2">
                                            <SchoolIcon className="h-5 w-5 text-blue-500" />
                                            {school.name}
                                        </CardTitle>
                                    </CardHeader>

                                    <CardContent className="pt-0 space-y-3">
                                        {/* Address */}
                                        <div className="flex items-start gap-2">
                                            <MapPin className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                                            <div className="text-sm text-gray-600">
                                                <p className="line-clamp-2">{school.address}</p>
                                                <p className="font-medium text-gray-800 mt-1">
                                                    {school.city}, {school.state}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Contact */}
                                        <div className="flex items-center gap-2">
                                            <Phone className="h-4 w-4 text-gray-400" />
                                            <span className="text-sm text-gray-600">{school.contact || "N/A"}</span>
                                        </div>

                                        {/* Email */}
                                        <div className="flex items-center gap-2">
                                            <Mail className="h-4 w-4 text-gray-400" />
                                            <span className="text-sm text-gray-600 truncate">
                                                {school.email_id || "N/A"}
                                            </span>
                                        </div>

                                        {/* Footer (Added Date) */}
                                        <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                                            <span className="text-xs text-gray-500">
                                                📅 Added {new Date(school.created_at).toLocaleDateString()}
                                            </span>

                                        </div>
                                    </CardContent>
                                </Card>

                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
