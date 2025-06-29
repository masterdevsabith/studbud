export default function MainSection() {
  return (
    <section className="w-4/5 h-screen bg-gray-100 p-6">
      <div className="top flex items-center justify-between">
        <div className="left">
          <h2 className="text-2xl font-black text-black">Welcome Sabith</h2>
          <p className="text-gray-600">
            Welcome back! Here's what's happening today.
          </p>
        </div>
        <div className="right">
          <span className="text-gray-600">Today</span>
          <h4 className="font-semibold text-black">6/27/2025</h4>
        </div>
      </div>

      <div className="bottom mt-6 space-y-6">
        {/* Top Stat Cards */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <p className="text-gray-500 text-sm">Total Students</p>
            <h2 className="text-3xl font-bold text-black">6</h2>
            <p className="text-green-500 text-xs mt-1">↑ 12% from last month</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <p className="text-gray-500 text-sm">Announcements Posted</p>
            <h2 className="text-3xl font-bold text-black">15</h2>
            <p className="text-green-500 text-xs mt-1">↑ 3 this week</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <p className="text-gray-500 text-sm">Pending Homeworks</p>
            <h2 className="text-3xl font-bold text-black">8</h2>
            <p className="text-red-500 text-xs mt-1">↓ 2 due today</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <p className="text-gray-500 text-sm">Upcoming Tests</p>
            <h2 className="text-3xl font-bold text-black">5</h2>
            <p className="text-green-500 text-xs mt-1">→ Next: Tomorrow</p>
          </div>
        </div>

        {/* Quick Actions & Recent Activities */}
        <div className="grid grid-cols-2 gap-4">
          {/* Quick Actions */}
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-black mb-4">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <button className="w-full py-2 px-4 bg-gray-100 border-1 text-gray-900 font-semibold rounded-lg text-left ">
                ＋ Add Homework
              </button>
              <button className="w-full py-2 px-4 bg-gray-100 border-1 text-gray-900 font-semibold rounded-lg text-left ">
                ＋ Create Announcement
              </button>
              <button className="w-full py-2 px-4 bg-gray-100 border-1 text-gray-900 font-semibold rounded-lg text-left ">
                ＋ Create Test
              </button>
              <button className="w-full py-2 px-4 bg-gray-100 border-1 text-gray-900 font-semibold rounded-lg text-left ">
                📅 View Timetable
              </button>
              <button className="w-full py-2 px-4 bg-gray-100 border-1 text-gray-900 font-semibold rounded-lg text-left ">
                📊 View Analytics
              </button>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-black mb-4">
              Recent Activities
            </h3>
            <div className="space-y-4 text-sm text-gray-800">
              <div className="bg-gray-50 p-2 rounded">
                🔵 Math homework submitted by 25 students{" "}
                <span className="block text-xs text-gray-500">2 hours ago</span>
              </div>
              <div className="bg-gray-50 p-2 rounded">
                🔵 New announcement posted for Class 10A{" "}
                <span className="block text-xs text-gray-500">4 hours ago</span>
              </div>
              <div className="bg-gray-50 p-2 rounded">
                🔵 Science test completed by Class 9B{" "}
                <span className="block text-xs text-gray-500">6 hours ago</span>
              </div>
              <div className="bg-gray-50 p-2 rounded">
                🔵 New student registered: John Smith{" "}
                <span className="block text-xs text-gray-500">1 day ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
