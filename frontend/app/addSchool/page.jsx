'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Upload, School } from 'lucide-react';
import Link from 'next/link';
import { toast } from "sonner"

export default function AddSchool() {
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setValue('image', file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('address', data.address);
      formData.append('city', data.city);
      formData.append('state', data.state);
      formData.append('contact', data.contact);
      formData.append('email_id', data.email_id);

      if (data.image && data.image instanceof File) {
        formData.append('image', data.image);
      }

      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/schools`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.success('School added successfully!');
      reset();
      setImagePreview(null);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error adding school');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="lg:flex items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2">
            <School className="h-6 w-6 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Add New School</h1>
          </div>
          <Link href="/showSchools">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Schools
            </Button>
          </Link>

        </div>

        <Card className="shadow-lg border-0">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg mt-[-23] p-2">
            <CardTitle className="text-xl">School Registration Form</CardTitle>
            <CardDescription className="text-blue-100">
              Please fill in all the required information about the school
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* School Name */}
                <div className="space-y-2">
                  <Label htmlFor="name">School Name *</Label>
                  <Input
                    id="name"
                    {...register('name', {
                      required: 'School name is required',
                      minLength: { value: 3, message: 'Name must be at least 3 characters' },
                    })}
                    placeholder="Enter school name"
                  />
                  {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email_id">Email Address *</Label>
                  <Input
                    id="email_id"
                    type="email"
                    {...register('email_id', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Invalid email format (must contain @)',
                      },
                    })}
                    placeholder="school@example.com"
                  />
                  {errors.email_id && <p className="text-sm text-red-600">{errors.email_id.message}</p>}
                </div>
              </div>

              {/* Address */}
              <div className="space-y-2">
                <Label htmlFor="address">Address *</Label>
                <Input
                  id="address"
                  {...register('address', { required: 'Address is required' })}
                  placeholder="Enter complete address"
                />
                {errors.address && <p className="text-sm text-red-600">{errors.address.message}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* City */}
                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    {...register('city', { required: 'City is required' })}
                    placeholder="Enter city"
                  />
                  {errors.city && <p className="text-sm text-red-600">{errors.city.message}</p>}
                </div>

                {/* State */}
                <div className="space-y-2">
                  <Label htmlFor="state">State *</Label>
                  <Input
                    id="state"
                    {...register('state', { required: 'State is required' })}
                    placeholder="Enter state"
                  />
                  {errors.state && <p className="text-sm text-red-600">{errors.state.message}</p>}
                </div>
              </div>

              {/* Contact */}
              <div className="space-y-2">
                <Label htmlFor="contact">Contact Number *</Label>
                <Input
                  id="contact"
                  type="tel"
                  {...register('contact', {
                    required: 'Contact is required',
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: 'Contact number must be 10 digits',
                    },
                  })}
                  placeholder="Enter contact number"
                />
                {errors.contact && <p className="text-sm text-red-600">{errors.contact.message}</p>}
              </div>

              {/* Image */}
              <div className="space-y-2">
                <Label htmlFor="image">School Image</Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  <Upload className="h-5 w-5 text-gray-400" />
                </div>
                {imagePreview && (
                  <div className="mt-4">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-32 h-32 object-cover rounded-lg border-2 border-gray-200"
                    />
                  </div>
                )}
              </div>

              {/* Buttons */}
              <div className="flex gap-4 pt-6">
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                >
                  {loading ? 'Adding School...' : 'Add School'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    reset();
                    setImagePreview(null);
                  }}
                >
                  Reset Form
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
