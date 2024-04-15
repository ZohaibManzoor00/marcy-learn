const timeline = [
  {
    name: "Founded company",
    description:
      "Marcy was founded by Maya and Reuben as their first instructors with a brave class of 11 fellows.",
    date: "Sep 2018",
    dateTime: "2018-09",
  },
  {
    name: "Secured $65m in funding",
    description:
      "Provident quia ut esse. Vero vel eos repudiandae aspernatur. Cumque minima impedit sapiente a architecto nihil.",
    date: "Dec 2021",
    dateTime: "2021-12",
  },
  {
    name: "Released beta",
    description:
      "Sunt perspiciatis incidunt. Non necessitatibus aliquid. Consequatur ut officiis earum eum quia facilis. Hic deleniti dolorem quia et.",
    date: "Feb 2022",
    dateTime: "2022-02",
  },
  {
    name: "Scaling and beyond",
    description:
      "Join us as we begin to scale our organization like never before!",
    date: "Dec 2022",
    dateTime: "2022-12",
  },
];

export function Timeline() {
  return (
    <div className="mx-auto -mt-8 max-w-7xl px-6 lg:px-8">
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 overflow-hidden lg:mx-0 lg:max-w-none lg:grid-cols-4">
        {timeline.map((item) => (
          <div key={item.name}>
            <time
              dateTime={item.dateTime}
              className="flex items-center text-sm font-semibold leading-6 text-sky-600"
            >
              <svg
                viewBox="0 0 4 4"
                className="mr-4 h-1 w-1 flex-none"
                aria-hidden="true"
              >
                <circle cx={2} cy={2} r={2} fill="currentColor" />
              </svg>
              {item.date}
              <div
                className="absolute -ml-2 h-px w-screen -translate-x-full bg-gray-900/10 sm:-ml-4 lg:static lg:-mr-6 lg:ml-8 lg:w-auto lg:flex-auto lg:translate-x-0"
                aria-hidden="true"
              />
            </time>
            <p className="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900">
              {item.name}
            </p>
            <p className="mt-1 text-base leading-7 text-gray-600">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
