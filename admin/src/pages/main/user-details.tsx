import { useAdmin } from "@/hooks";
import { MainLayout } from "@/layouts";
import { Loader, TriangleAlert, ArrowLeft, Phone, MapPin, Calendar, Star, BookOpen, Clock, DollarSign, Save, CheckCircle, XCircle, Shield, ShieldCheck } from "lucide-react";
import { useParams, Link } from "react-router-dom";
import { useComics } from "@/hooks";
import { useAuth } from "@/hooks";

export default function UserDetails() {
   const { id } = useParams();
   const { users, toggleAdminStatus, isLoading } = useAdmin();
   const { allComics } = useComics();
   const { user: currentUser } = useAuth();
   const user = users?.find((user) => user.id === id);

   // Get user's comics if they're a creator
   const userComics = allComics?.filter((comic) => comic.creator.id === id) || [];
   const pendingComics = userComics.filter((comic) => comic.status === "pending");
   const approvedComics = userComics.filter((comic) => comic.status === "approved");

   if (!user) {
    return (
        <MainLayout title="User Details" description="Manage your user details">
            <div className="flex items-center gap-2">
                <TriangleAlert size={20} className="text-primary" /> 
                User not found. Retrying... 
                <Loader size={20} className="animate-spin" />
            </div>
        </MainLayout>
    );
   }

   const formatDate = (date: Date | string) => {
     return new Date(date).toLocaleDateString('en-US', {
       year: 'numeric',
       month: 'long',
       day: 'numeric'
     });
   };

   const handleToggleAdmin = async () => {
     if (!user) return;
     await toggleAdminStatus(user.id);
   };

   return (
        <MainLayout title={user.name} description={user.email}>
            <div className="space-y-6">
                {/* Back Button */}
                <Link 
                    to="/users" 
                    className="inline-flex items-center gap-2 text-primary-2 hover:underline"
                >
                    <ArrowLeft size={16} />
                    Back to Users
                </Link>

                {/* User Header */}
                <div className="bg-white rounded-lg p-6 border border-line shadow-sm">
                    <div className="flex items-start gap-6">
                        <div className="h-24 w-24 bg-blue-300 rounded-full overflow-hidden flex-shrink-0">
                            <img src={user.image} alt={user.name} className="h-full w-full object-cover" />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center flex-wrap gap-3 mb-2">
                                <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                                <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${
                                    user.role === 'creator' 
                                        ? 'bg-purple-100 text-purple-800' 
                                        : 'bg-blue-100 text-blue-800'
                                }`}>
                                    {user.role}
                                </span>
                                {user.isAdmin && (
                                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                                        Admin
                                    </span>
                                )}
                            </div>
                            {/* Admin Toggle Button */}
                            {currentUser?.id !== user.id && (
                                <div className="flex items-center flex-wrap gap-2 mb-4">
                                    <button
                                        onClick={handleToggleAdmin}
                                        disabled={isLoading.toggleAdmin}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                            user.isAdmin
                                                ? 'bg-red-100 text-red-700 hover:bg-red-200'
                                                : 'bg-green-100 text-green-700 hover:bg-green-200'
                                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                                    >
                                        {isLoading.toggleAdmin ? (
                                            <Loader size={16} className="animate-spin" />
                                        ) : user.isAdmin ? (
                                            <>
                                                <Shield size={18} className="flex-shrink-0" />
                                                Remove Admin
                                            </>
                                        ) : (
                                            <>
                                                <ShieldCheck size={18} className="flex-shrink-0" />
                                                Make Admin
                                            </>
                                        )}
                                    </button>
                                    <span className="text-xs text-gray-500">
                                        {user.isAdmin ? 'Remove admin privileges' : 'Grant admin privileges'}
                                    </span>
                                </div>
                            )}
                            <p className="text-gray-600 mb-4">{user.email}</p>
                            
                            {/* Personal Info Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {user.phone && (
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <Phone size={16} />
                                        <span>{user.phone}</span>
                                    </div>
                                )}
                                {user.address && (
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <MapPin size={16} />
                                        <span>{user.address}</span>
                                    </div>
                                )}
                                {user.dob && (
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <Calendar size={16} />
                                        <span>Born: {formatDate(user.dob)}</span>
                                    </div>
                                )}
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Calendar size={16} />
                                    <span>Joined: {formatDate(user.createdAt)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Role-Specific Stats */}
                {user.role === 'reader' ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Credits */}
                        <div className="bg-white rounded-lg p-6 border border-line shadow-sm">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-yellow-100 rounded-lg">
                                    <Star size={20} className="text-yellow-600" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">Credit Tokens</h3>
                                    <p className="text-sm text-gray-600">Available balance</p>
                                </div>
                            </div>
                            <div className="text-3xl font-bold text-yellow-600">
                                {user.credits.toLocaleString()}
                            </div>
                        </div>

                        {/* Saved Comics */}
                        <div className="bg-white rounded-lg p-6 border border-line shadow-sm">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <Save size={20} className="text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">Saved Comics</h3>
                                    <p className="text-sm text-gray-600">Total saved</p>
                                </div>
                            </div>
                            <div className="text-3xl font-bold text-blue-600">
                                <span className="text-gray-400">-</span>
                            </div>
                        </div>

                        {/* Email Verification */}
                        <div className="bg-white rounded-lg p-6 border border-line shadow-sm">
                            <div className="flex items-center gap-3 mb-4">
                                <div className={`p-2 rounded-lg ${
                                    user.isEmailVerified ? 'bg-green-100' : 'bg-red-100'
                                }`}>
                                    {user.isEmailVerified ? (
                                        <CheckCircle size={20} className="text-green-600" />
                                    ) : (
                                        <XCircle size={20} className="text-red-600" />
                                    )}
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">Email Status</h3>
                                    <p className="text-sm text-gray-600">Verification</p>
                                </div>
                            </div>
                            <div className={`text-sm font-medium ${
                                user.isEmailVerified ? 'text-green-600' : 'text-red-600'
                            }`}>
                                {user.isEmailVerified ? 'Verified' : 'Not Verified'}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* Total Comics */}
                        <div className="bg-white rounded-lg p-6 border border-line shadow-sm">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <BookOpen size={20} className="text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">Total Comics</h3>
                                    <p className="text-sm text-gray-600">All time</p>
                                </div>
                            </div>
                            <div className="text-3xl font-bold text-blue-600">
                                {userComics.length}
                            </div>
                        </div>

                        {/* Pending Comics */}
                        <div className="bg-white rounded-lg p-6 border border-line shadow-sm">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-yellow-100 rounded-lg">
                                    <Clock size={20} className="text-yellow-600" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">Pending</h3>
                                    <p className="text-sm text-gray-600">Awaiting review</p>
                                </div>
                            </div>
                            <div className="text-3xl font-bold text-yellow-600">
                                {pendingComics.length}
                            </div>
                        </div>

                        {/* Approved Comics */}
                        <div className="bg-white rounded-lg p-6 border border-line shadow-sm">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-green-100 rounded-lg">
                                    <CheckCircle size={20} className="text-green-600" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">Approved</h3>
                                    <p className="text-sm text-gray-600">Published</p>
                                </div>
                            </div>
                            <div className="text-3xl font-bold text-green-600">
                                {approvedComics.length}
                            </div>
                        </div>

                        {/* Earnings */}
                        <div className="bg-white rounded-lg p-6 border border-line shadow-sm">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-green-100 rounded-lg">
                                    <DollarSign size={20} className="text-green-600" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">Earnings</h3>
                                    <p className="text-sm text-gray-600">Total earned</p>
                                </div>
                            </div>
                            <div className="text-3xl font-bold text-green-600">
                                ₦{user.earnings.toLocaleString()}
                            </div>
                        </div>
                    </div>
                )}

                {/* Recent Comics (for creators) */}
                {user.role === 'creator' && userComics.length > 0 && (
                    <div className="bg-white rounded-lg p-6 border border-line shadow-sm">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Comics</h3>
                        <div className="space-y-3">
                            {userComics.slice(0, 5).map((comic) => (
                                <div key={comic.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div className="h-12 w-12 bg-gray-200 rounded overflow-hidden">
                                            <img 
                                                src={comic.coverImage.url} 
                                                alt={comic.title} 
                                                className="h-full w-full object-cover" 
                                            />
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-gray-900">{comic.title}</h4>
                                            <p className="text-sm text-gray-600">{comic.chapters.length} chapters</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                            comic.status === 'approved' ? 'bg-green-100 text-green-800' :
                                            comic.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                            'bg-red-100 text-red-800'
                                        }`}>
                                            {comic.status}
                                        </span>
                                        <span className="text-sm text-gray-600">
                                            {formatDate(comic.createdAt)}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Additional Info */}
                <div className="bg-white rounded-lg p-6 border border-line shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {user.country && (
                            <div>
                                <label className="text-sm font-medium text-gray-600">Country</label>
                                <p className="text-gray-900">{user.country}</p>
                            </div>
                        )}
                        {user.state && (
                            <div>
                                <label className="text-sm font-medium text-gray-600">State</label>
                                <p className="text-gray-900">{user.state}</p>
                            </div>
                        )}
                        {user.city && (
                            <div>
                                <label className="text-sm font-medium text-gray-600">City</label>
                                <p className="text-gray-900">{user.city}</p>
                            </div>
                        )}
                        {user.gender && (
                            <div>
                                <label className="text-sm font-medium text-gray-600">Gender</label>
                                <p className="text-gray-900 capitalize">{user.gender}</p>
                            </div>
                        )}
                        <div>
                            <label className="text-sm font-medium text-gray-600">Last Updated</label>
                            <p className="text-gray-900">{formatDate(user.updatedAt)}</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-600">Email Preferences</label>
                            <p className="text-gray-900">
                                {user.preferences.sendEmail ? 'Receives emails' : 'Opted out of emails'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
