const mockActivities = [
  {
    time: "10:20",
    title: "Free Walking Tour",
    description: (
      <>
        Explore Copenhagen with a guide from the hostel. We meet at reception.{" "}
        <a
          href="https://politicallyincorrectfreetours.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-blue-600"
        >
          More info
        </a>
      </>
    ),
    icon: "🚶",
  },
  {
    time: "19:30",
    title: "Hostel Dinner",
    description:
      'Sign up before 19:00 at reception. Tonight we serve "Biskemad", a Danish classic!',
    icon: "🍽️",
  },
  {
    time: "21:00",
    title: "Beer Pong",
    description: "Join us in the venue for our nightly beer pong tournament!",
    icon: "🏓",
  },
];

export default function Activities({ onBack }) {
  return (
    <div className="flex flex-col h-screen bg-[#1a1a1a] text-white p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-blackops">📅 Today's Activities</h2>
        <button
          onClick={onBack}
          className="px-4 py-1 rounded-xl bg-[#04f9c2] text-black font-blackops hover:bg-[#02e1af]"
        >
          Back
        </button>
      </div>

      <div className="space-y-4">
        {mockActivities.map((activity, index) => (
          <div
            key={index}
            className="bg-white text-[#262626] rounded-xl p-4 shadow-md"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-lg font-semibold">
                {activity.icon} {activity.title}
              </span>
              <span className="text-sm font-bold">{activity.time}</span>
            </div>
            <p className="text-sm">{activity.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}