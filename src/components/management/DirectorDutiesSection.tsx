import { directorDutiesData, managementSections } from './data';

export function DirectorDutiesSection() {
  const data = directorDutiesData;
  const sectionMeta = managementSections[4];

  return (
    <section id={sectionMeta.id} className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-green-600">
            {sectionMeta.subtitle}
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {sectionMeta.title}
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            {data.description}
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-5xl">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {data.roles.map((role, index) => (
              <div
                key={index}
                className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-lg">
                      {index + 1}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {role.role}
                  </h3>
                </div>
                <ul className="space-y-3">
                  {role.duties.map((duty, dutyIndex) => (
                    <li key={dutyIndex} className="flex items-start gap-3">
                      <div className="h-2 w-2 bg-green-400 rounded-full flex-shrink-0 mt-2"></div>
                      <span className="text-sm leading-7 text-gray-600">
                        {duty}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
