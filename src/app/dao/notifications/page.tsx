const notifications = [
  {
    id: 1,
    title: "Voting closes in 3 hours for Proposal #22",
    time: "3 hours ago",
    active: true,
  },
  {
    id: 2,
    title: "You've been promoted to Captain Bee",
    time: "5 hours ago",
    active: true,
  },
  {
    id: 3,
    title: "Task #101 has been verified and rewarded (+50 rep)",
    time: "2 Days ago",
    active: false,
  },
  {
    id: 4,
    title: "New Proposal",
    time: "3 hours ago",
    active: true,
  },
  {
    id: 5,
    title: "New Proposal 2",
    time: "3 hours ago",
    active: true,
  },
  {
    id: 6,
    title: "New Proposal",
    time: "3 hours ago",
    active: false,
  },
  {
    id: 7,
    title: "New Proposal",
    time: "3 hours ago",
    active: true,
  },
  {
    id: 8,
    title: "New Proposal",
    time: "3 hours ago",
    active: true,
  },
];

export default function Notifications() {
  return (
    <div className="mx-auto mt-60 px-4 md:px-20 xl:px-40">
      <div className="max-w-6xl mx-auto">
        <div>
          <h1 className="text-3xl md:text-7xl text-center md:text-left font-semibold">
            Notifications
          </h1>
        </div>

        <div className="mt-20">
          <div className="flex flex-col space-y-8">
            {notifications.map((notification) => (
              <div key={notification.id} className="flex items-start space-x-4">
                {/* Oval indicator */}
                <div
                  className={`w-8 h-8 rounded-br-4xl rounded-tl-4xl rounded-tr-xl rounded-bl-xl mt-1 ${
                    notification.active ? "bg-primary" : "bg-tertiary"
                  }`}
                />

                {/* Content */}
                <div className="flex flex-col">
                  <h2
                    className={`text-base md:text-2xl ${
                      notification.active ? "font-medium" : "font-light"
                    }`}
                  >
                    {notification.title}
                  </h2>
                  <p className="text-base text-tertiary mt-1">
                    {notification.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}