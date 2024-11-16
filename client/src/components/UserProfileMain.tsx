import { useState } from 'react';
import { PhoneOutlined, MailOutlined, SettingOutlined, LikeOutlined, DislikeOutlined, ReadOutlined } from '@ant-design/icons';

const UserProfileMain = () => {
    const [isFollowing, setIsFollowing] = useState(false);

    const profile = {
        firstName: "John",
        lastName: "Doe",
        headline: "Senior Software Engineer | Web3 Enthusiast | Tech Writer",
        location: "San Francisco, CA",
        bio: "Building the future of web technologies. Passionate about React, blockchain, and user experience. Writing about tech and sharing knowledge with the community.",
        email: "johndoe@example.com",
        phone: 90340349304,
        stats: {
            likes: 128,
            Unlikes: 892,
            Articles: 435
        },
        highlights: [
            { label: 'Projects', value: '24' },
            { label: 'Articles', value: '86' },
            { label: 'Reviews', value: '142' }
        ]
    };

    return (
        <div className="max-w-7xl mx-auto bg-gray-50 min-h-screen px-4 sm:px-6 lg:px-8">
            <div className="relative pt-12 pb-8">
                <div className="flex flex-col items-center">
                    {/* Profile Picture Section */}
                    <div className="relative">
                        <img
                            src="/article.jpg"
                            alt="Profile"
                            className="w-40 h-40 rounded-full border-4 border-white shadow-lg object-cover"
                        />
                        <button className="absolute bottom-2 right-2 p-2 bg-gray-800 rounded-full text-white hover:bg-gray-700">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                            </svg>
                        </button>
                    </div>

                    {/* Profile Details */}
                    <div className="mt-4 text-center">
                        <h1 className="text-3xl font-bold text-gray-900">
                            {profile.firstName} {profile.lastName}
                        </h1>
                        <p className="text-gray-600 mt-1">{profile.headline}</p>

                        {/* Email */}
                        <div className="flex items-center justify-center mt-2 text-gray-600 text-sm">
                            <MailOutlined className="mr-1" />
                            <a href={`mailto:${profile.email}`} className="text-blue-600 hover:underline">
                                {profile.email}
                            </a>
                        </div>

                        {/* Phone */}
                        <div className="flex items-center justify-center mt-2 text-gray-600 text-sm">
                            <PhoneOutlined className="mr-1" />
                            <a href={`tel:${profile.phone}`} className="text-blue-600 hover:underline">
                                {profile.phone}
                            </a>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-6 flex gap-3 justify-center">
                        <button
                            onClick={() => setIsFollowing(!isFollowing)}
                            className={`px-6 py-2 rounded-lg font-medium ${isFollowing
                                    ? 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                                    : 'bg-blue-600 text-white hover:bg-blue-700'
                                }`}
                        >
                            {isFollowing ? 'Following' : 'Follow'}
                        </button>
                        <button className="px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                                />
                            </svg>
                        </button>
                        <button className="px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                            </svg>
                        </button>
                    </div>

                    {/* Stats Section */}
                    <div className="mt-6 flex gap-12">
                        <div className="flex items-center space-x-3">
                            {/* <LikeOutlined className="text-black text-2xl" /> */}
                            <div>
                                <span className="block text-xl font-semibold text-gray-900">
                                    {profile.stats.likes}
                                </span>
                                <p className="text-sm text-gray-600">Likes</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            {/* <DislikeOutlined className="text-black text-2xl" /> */}
                            <div>
                                <span className="block text-xl font-semibold text-gray-900">
                                    {profile.stats.Unlikes}
                                </span>
                                <p className="text-sm text-gray-600">Unlikes</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            {/* <ReadOutlined className="text-black text-2xl" /> */}
                            <div>
                                <span className="block text-xl font-semibold text-gray-900">
                                    {profile.stats.Articles}
                                </span>
                                <p className="text-sm text-gray-600">Articles</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>





            <div className="mt-8 text-center sm:text-left">
                <h2 className="text-2xl font-bold text-gray-800">About</h2>
                <p className="mt-2 text-gray-600">{profile.bio}</p>
            </div>
        </div>

    );
};

export default UserProfileMain;
