"use client";
import { useAuthContext } from "@/components/AuthProvider";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from 'next/image';

export default function ProfilePage() {
  const { user, logout } = useAuthContext();
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(user?.profileImage || "");
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [interests, setInterests] = useState(user?.interests || []);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Generate initials from user name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Generate a color based on user name
  const getAvatarColor = (name: string) => {
    const colors = [
      'bg-gradient-to-br from-blue-500 to-blue-600',
      'bg-gradient-to-br from-green-500 to-green-600',
      'bg-gradient-to-br from-purple-500 to-purple-600',
      'bg-gradient-to-br from-pink-500 to-pink-600',
      'bg-gradient-to-br from-indigo-500 to-indigo-600',
      'bg-gradient-to-br from-red-500 to-red-600',
      'bg-gradient-to-br from-yellow-500 to-yellow-600',
      'bg-gradient-to-br from-teal-500 to-teal-600',
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Here you would typically make an API call to update the user profile
      // For now, we'll just simulate the update
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsEditing(false);
      // You would update the user context here
    } catch (error) {
      console.error('Failed to update profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setProfileImage(user?.profileImage || "");
    setName(user?.name || "");
    setEmail(user?.email || "");
    setInterests(user?.interests || []);
    setIsEditing(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[var(--foreground)] mb-4">Please log in to view your profile</h1>
          <Link href="/login" className="bg-gradient-to-r from-blue-600 to-cyan-400 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-cyan-500 transition-all duration-300">
            Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background)] pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-[var(--card-bg)] rounded-3xl shadow-lg border border-[var(--border)] overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-cyan-400 p-8 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg ${getAvatarColor(name)}`}>
                  {profileImage ? (
                    <Image 
                      src={profileImage} 
                      alt={name}
                      width={80}
                      height={80}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    getInitials(name)
                  )}
                </div>
                <div>
                  <h1 className="text-3xl font-bold">{name}</h1>
                  <p className="text-blue-100">{email}</p>
                </div>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="px-6 py-3 bg-white/20 hover:bg-white/30 rounded-xl font-semibold transition-all duration-300 backdrop-blur-sm"
              >
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </button>
            </div>
          </div>

          {/* Profile Content */}
          <div className="p-8">
            {isEditing ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                {/* Profile Image Upload */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-[var(--foreground)]">Profile Image</h3>
                  <div className="flex items-center space-x-4">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-semibold text-lg shadow-lg ${getAvatarColor(name)}`}>
                      {profileImage ? (
                        <Image 
                          src={profileImage} 
                          alt={name}
                          width={64}
                          height={64}
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        getInitials(name)
                      )}
                    </div>
                    <div>
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-400 text-white rounded-xl font-medium hover:from-blue-700 hover:to-cyan-500 transition-all duration-300"
                      >
                        Upload Image
                      </button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </div>
                  </div>
                </div>

                {/* Name */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-[var(--foreground)]">Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 border border-[var(--border)] rounded-xl bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-[var(--foreground)]">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-[var(--border)] rounded-xl bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  />
                </div>

                {/* Interests */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-[var(--foreground)]">Interests</label>
                  <div className="flex flex-wrap gap-2">
                    {['Technology', 'Sports', 'Politics', 'Entertainment', 'Business', 'Science'].map((interest) => (
                      <button
                        key={interest}
                        onClick={() => {
                          if (interests.includes(interest)) {
                            setInterests(interests.filter(i => i !== interest));
                          } else {
                            setInterests([...interests, interest]);
                          }
                        }}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
                          interests.includes(interest)
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 dark:bg-gray-700 text-[var(--foreground)] hover:bg-blue-100 dark:hover:bg-gray-600'
                        }`}
                      >
                        {interest}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4 pt-6">
                  <button
                    onClick={handleSave}
                    disabled={isLoading}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-400 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-cyan-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button
                    onClick={handleCancel}
                    className="px-6 py-3 border border-[var(--border)] text-[var(--foreground)] rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                {/* Profile Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-[var(--foreground)]">Personal Information</h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm text-[var(--muted-foreground)]">Name</span>
                        <p className="text-[var(--foreground)] font-medium">{name}</p>
                      </div>
                      <div>
                        <span className="text-sm text-[var(--muted-foreground)]">Email</span>
                        <p className="text-[var(--foreground)] font-medium">{email}</p>
                      </div>
                      <div>
                        <span className="text-sm text-[var(--muted-foreground)]">Member Since</span>
                        <p className="text-[var(--foreground)] font-medium">January 2024</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-[var(--foreground)]">Interests</h3>
                    <div className="flex flex-wrap gap-2">
                      {interests.length > 0 ? (
                        interests.map((interest) => (
                          <span
                            key={interest}
                            className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium"
                          >
                            {interest}
                          </span>
                        ))
                      ) : (
                        <p className="text-[var(--muted-foreground)]">No interests selected</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Account Actions */}
                <div className="border-t border-[var(--border)] pt-6">
                  <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4">Account Actions</h3>
                  <div className="flex flex-wrap gap-4">
                    <Link
                      href="/bookmarks"
                      className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-400 text-white rounded-xl font-medium hover:from-green-700 hover:to-emerald-500 transition-all duration-300"
                    >
                      View Bookmarks
                    </Link>
                    <button
                      onClick={logout}
                      className="px-4 py-2 bg-gradient-to-r from-red-600 to-pink-400 text-white rounded-xl font-medium hover:from-red-700 hover:to-pink-500 transition-all duration-300"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
} 