import { managementStructureData, managementSections } from './data';

export function ManagementStructureSection() {
  const data = managementStructureData;
  const sectionMeta = managementSections[3];

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
        </div>

        <div className="mx-auto mt-16 max-w-4xl space-y-8">
          {data.sections.map((section, index) => (
            <div
              key={index}
              className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
                <div className="h-8 w-8 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-semibold text-sm">
                    {index + 1}
                  </span>
                </div>
                {section.title}
              </h3>
              <div className="space-y-4 ml-11">
                {section.content.map((paragraph, pIndex) => (
                  <p key={pIndex} className="text-base leading-7 text-gray-600">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
