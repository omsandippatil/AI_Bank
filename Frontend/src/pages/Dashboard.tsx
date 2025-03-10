// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState, useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
const UserDashboard: React.FC = () => {
const [isDarkMode, setIsDarkMode] = useState(false);
const [balance, setBalance] = useState(20567890.89);
const [isVoiceAssistantActive, setVoiceAssistantActive] = useState(false);
const [showAmounts, setShowAmounts] = useState(false);
const [selectedTimeRange, setSelectedTimeRange] = useState('1W');
const [notifications, setNotifications] = useState([
{ id: 1, type: 'alert', message: 'Unusual transaction detected: ₹89,999 at Croma Electronics', time: '2 hours ago', read: false },
{ id: 2, type: 'reminder', message: 'Credit card payment due in 3 days', time: '5 hours ago', read: false },
{ id: 3, type: 'alert', message: 'New investment opportunity in mutual funds', time: '1 day ago', read: false },
]);
const [showNotifications, setShowNotifications] = useState(false);
const notificationRef = useRef<HTMLDivElement>(null);
const chartRef = useRef<HTMLDivElement>(null);
const pieChartRef = useRef<HTMLDivElement>(null);
const transactions = [
{ id: 1, type: 'expense', category: 'Shopping', amount: -29999, merchant: 'Reliance Digital', date: '2025-03-08', icon: 'fa-shopping-bag' },
{ id: 2, type: 'income', category: 'Salary', amount: 850000, merchant: 'TCS Limited', date: '2025-03-07', icon: 'fa-money-bill-wave' },
{ id: 3, type: 'expense', category: 'Dining', amount: -12550, merchant: 'Taj Restaurant', date: '2025-03-07', icon: 'fa-utensils' },
{ id: 4, type: 'expense', category: 'Transport', amount: -4500, merchant: 'Ola Cabs', date: '2025-03-06', icon: 'fa-car' },
{ id: 5, type: 'income', category: 'Investment', amount: 25000, merchant: 'SIP Returns', date: '2025-03-06', icon: 'fa-chart-line' },
];
const accounts = [
{ type: 'Savings', balance: 4567890, number: '**** 4532', color: 'bg-gradient-to-r from-blue-500 to-blue-600', icon: 'fa-piggy-bank' },
{ type: 'Current', balance: 15678945, number: '**** 7890', color: 'bg-gradient-to-r from-purple-500 to-purple-600', icon: 'fa-landmark' },
{ type: 'Investment', balance: 4609954, number: '**** 1234', color: 'bg-gradient-to-r from-emerald-500 to-emerald-600', icon: 'fa-chart-pie' },
{ type: 'Fixed Deposit', balance: 2500000, number: '**** 5678', color: 'bg-gradient-to-r from-amber-500 to-amber-600', icon: 'fa-vault' },
];
useEffect(() => {
const handleClickOutside = (event: MouseEvent) => {
if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
setShowNotifications(false);
}
};
document.addEventListener('mousedown', handleClickOutside);
return () => document.removeEventListener('mousedown', handleClickOutside);
}, []);
const handleMarkAllAsRead = () => {
setNotifications(notifications.map(notification => ({ ...notification, read: true })));
};
const unreadCount = notifications.filter(notification => !notification.read).length;
useEffect(() => {
if (chartRef.current) {
const chart = echarts.init(chartRef.current);
const option = {
animation: false,
tooltip: {
trigger: 'axis',
axisPointer: {
type: 'shadow'
}
},
grid: {
left: '3%',
right: '4%',
bottom: '3%',
containLabel: true
},
xAxis: {
type: 'category',
data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
axisLine: {
lineStyle: {
color: isDarkMode ? '#ffffff40' : '#00000040'
}
},
axisLabel: {
color: isDarkMode ? '#fff' : '#000'
}
},
yAxis: {
type: 'value',
axisLine: {
lineStyle: {
color: isDarkMode ? '#ffffff40' : '#00000040'
}
},
axisLabel: {
color: isDarkMode ? '#fff' : '#000'
}
},
series: [{
data: [82000, 93200, 90100, 93400, 129000, 133000, 132000],
type: 'line',
smooth: true,
areaStyle: {
opacity: 0.2,
color: isDarkMode ? '#7C4DFF80' : '#7C4DFF40'
},
itemStyle: {
color: '#7C4DFF'
},
lineStyle: {
width: 3
}
}]
};
chart.setOption(option);
}
if (pieChartRef.current) {
const pieChart = echarts.init(pieChartRef.current);
const pieOption = {
animation: false,
tooltip: {
trigger: 'item'
},
series: [
{
type: 'pie',
radius: ['40%', '70%'],
avoidLabelOverlap: false,
itemStyle: {
borderRadius: 10,
borderColor: isDarkMode ? '#1a1a1a' : '#fff',
borderWidth: 2
},
label: {
show: false,
position: 'center',
color: isDarkMode ? '#fff' : '#000'
},
emphasis: {
label: {
show: true,
fontSize: 20,
fontWeight: 'bold',
color: isDarkMode ? '#fff' : '#000'
}
},
labelLine: {
show: false
},
data: [
{ value: 35, name: 'Shopping', itemStyle: { color: '#7C4DFF' } },
{ value: 25, name: 'Investment', itemStyle: { color: '#4CAF50' } },
{ value: 20, name: 'Bills', itemStyle: { color: '#FF4081' } },
{ value: 15, name: 'Entertainment', itemStyle: { color: '#FFC107' } },
{ value: 5, name: 'Others', itemStyle: { color: '#00BCD4' } }
]
}
]
};
pieChart.setOption(pieOption);
}
}, [isDarkMode]);
return (
<div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900'}`}>
{/* Header */}
<header className={`h-20 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg px-8 flex items-center justify-between`}>
<div className="flex items-center gap-4">
<h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
Nexus<span className="font-light">Bank</span>
</h1>
</div>
<div className="flex items-center gap-6">
<button
onClick={() => setIsDarkMode(!isDarkMode)}
className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-700 text-yellow-400' : 'bg-gray-100 text-gray-600'} cursor-pointer !rounded-button whitespace-nowrap`}
>
<i className={`fas ${isDarkMode ? 'fa-sun' : 'fa-moon'} text-xl`}></i>
</button>
<div className="relative" ref={notificationRef}>
<button
className={`${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} cursor-pointer`}
onClick={() => setShowNotifications(!showNotifications)}
>
<i className="fas fa-bell text-xl"></i>
{unreadCount > 0 && (
<span className="bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 absolute -mt-2 -ml-1">
{unreadCount}
</span>
)}
</button>
{showNotifications && (
<div className={`absolute right-0 mt-2 w-96 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-2xl z-50`}>
<div className={`p-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
<div className="flex justify-between items-center">
<h3 className="font-semibold">Notifications</h3>
<button
onClick={handleMarkAllAsRead}
className="text-sm text-blue-500 hover:text-blue-600 !rounded-button whitespace-nowrap"
>
Mark all as read
</button>
</div>
</div>
<div className="max-h-96 overflow-y-auto">
{notifications.map((notification) => (
<div
key={notification.id}
className={`p-4 border-b ${isDarkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50'}
${notification.read ? '' : (isDarkMode ? 'bg-gray-700/50' : 'bg-blue-50')}`}
>
<div className="flex items-start gap-3">
<i className={`fas ${notification.type === 'alert' ? 'fa-exclamation-circle text-red-500' : 'fa-clock text-blue-500'} mt-1`}></i>
<div>
<p className="text-sm">{notification.message}</p>
<p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mt-1`}>{notification.time}</p>
</div>
</div>
</div>
))}
</div>
</div>
)}
</div>
<div className="flex items-center gap-3">
<div className="relative">
<img
src="https://public.readdy.ai/ai/img_res/7972dbcd17ac08fe1557534bc61a05c6.jpg"
alt="Profile"
className="w-10 h-10 rounded-full object-cover ring-2 ring-purple-500"
/>
<div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
</div>
<span className="font-medium">Arjun Sharma</span>
</div>
</div>
</header>
<main className="container mx-auto px-8 py-6">
{/* Balance Overview */}
<div className="grid grid-cols-4 gap-6 mb-8">
{accounts.map((account) => (
<div
key={account.number}
className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
>
<div className="flex justify-between items-center mb-4">
<span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>{account.type}</span>
<div className={`w-12 h-12 rounded-full ${account.color} flex items-center justify-center`}>
<i className={`fas ${account.icon} text-white text-xl`}></i>
</div>
</div>
<div className="mb-2 flex items-center gap-2">
<span className="text-2xl font-bold">{showAmounts ? `₹${account.balance.toLocaleString()}` : '₹•••••••'}</span>
<button onClick={() => setShowAmounts(!showAmounts)} className="text-gray-500 hover:text-gray-700 !rounded-button whitespace-nowrap">
<i className={`fas ${showAmounts ? 'fa-eye-slash' : 'fa-eye'}`}></i>
</button>
</div>
<div className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-sm`}>{account.number}</div>
</div>
))}
</div>
{/* Charts and Transactions */}
<div className="grid grid-cols-2 gap-6 mb-8">
<div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
<h2 className="text-xl font-semibold mb-4">Spending Overview</h2>
<div ref={chartRef} style={{ height: '300px' }}></div>
</div>
<div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
<h2 className="text-xl font-semibold mb-4">Expense Distribution</h2>
<div ref={pieChartRef} style={{ height: '300px' }}></div>
</div>
</div>
{/* Recent Transactions */}
<div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
<div className="flex justify-between items-center mb-6">
<h2 className="text-xl font-semibold">Recent Transactions</h2>
<div className="flex gap-2">
{['1D', '1W', '1M', '1Y'].map((range) => (
<button
key={range}
className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 !rounded-button whitespace-nowrap ${
selectedTimeRange === range
? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
: isDarkMode
? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
: 'bg-gray-100 text-gray-600 hover:bg-gray-200'
}`}
onClick={() => setSelectedTimeRange(range)}
>
{range}
</button>
))}
</div>
</div>
<div className="space-y-4">
{transactions.map((transaction) => (
<div
key={transaction.id}
className={`flex items-center justify-between p-4 ${
isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
} rounded-lg transition-colors cursor-pointer`}
>
<div className="flex items-center gap-4">
<div className={`w-12 h-12 rounded-full ${
transaction.type === 'expense'
? 'bg-gradient-to-br from-red-400 to-red-500'
: 'bg-gradient-to-br from-green-400 to-green-500'
} flex items-center justify-center`}>
<i className={`fas ${transaction.icon} text-white text-xl`}></i>
</div>
<div>
<div className="font-medium">{transaction.merchant}</div>
<div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{transaction.category}</div>
</div>
</div>
<div className="text-right">
<div className={`font-medium ${
transaction.type === 'expense' ? 'text-red-500' : 'text-green-500'
} flex items-center gap-2`}>
<span>
{transaction.type === 'expense' ? '-' : '+'}₹{showAmounts ? Math.abs(transaction.amount).toLocaleString() : '•••••••'}
</span>
</div>
<div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{transaction.date}</div>
</div>
</div>
))}
</div>
</div>
</main>
{/* AI Assistant Buttons */}
<div className="fixed bottom-8 right-8 flex flex-col gap-4">
<a 
href="https://readdy.ai/home/83e9d1e1-625d-4c76-a840-55d88cbc2132/0605cbb6-b615-4f04-87ef-90d4a0513413"
data-readdy="true"
>
<button
className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full shadow-lg flex items-center justify-center cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 !rounded-button whitespace-nowrap"
>
<i className="fas fa-headset text-white text-2xl"></i>
</button>
</a>
<button
className={`w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-lg flex items-center justify-center cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 !rounded-button whitespace-nowrap ${
isVoiceAssistantActive ? 'animate-pulse' : ''
}`}
onClick={() => setVoiceAssistantActive(!isVoiceAssistantActive)}
>
<i className={`fas ${isVoiceAssistantActive ? 'fa-times' : 'fa-microphone'} text-white text-2xl`}></i>
</button>
</div>
</div>
);
};
export default UserDashboard
