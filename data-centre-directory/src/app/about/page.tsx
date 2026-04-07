import '../globals.css';

export default function About() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
          About This Project
        </h1>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-8">
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            This project started as a map-making exercise to better understand where AI data centres were located and how much air and noise pollution they produce. It's important that the residents of Ontario know about new AI data centres coming to their community as well as existing local facilities that are already releasing pollution. It is a crucial time for people to get engaged and hold AI and data centre companies accountable.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Purpose
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            Track the air emissions and noise pollution levels of data centres in Ontario in an accessible way.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Why is it important to track data centres?
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            It's important to recognize AI data centres for what they are: mini energy-intensive factories. AI data centres require enormous amounts of electricity and water in order to produce text, images, and videos prompted by users of AI chatbots (also known as large language models or LLMs). In particular, we are most concerned about hyperscale data centres.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            We need to protect our Great Lakes and air quality from AI data centres as they can worsen our air quality, harm the environment, and risk our public health. For example, AI data centres have on-site diesel and gas generators which can release harmful pollutants like nitrogen oxide and carbon monoxide. AI data centres also risk increasing our utility bills and taxes.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            To understand the scale of the problem, in December 2025, the total amount of electricity demand from data centres hoping to connect to Ontario's grid was equivalent to powering over 6.5 million homes. This is about a three times increase in just 6 months and mostly due to AI.
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            AI data centres should not be popping up in people's backyards without their knowledge. We need to put pressure on the Ontario government to be transparent and conduct proper consultation for all new and expanding AI data centres. Treaty Rights with Indigenous peoples across Ontario must also be honoured and respected at all times. Under no circumstances should the people of Ontario experience negative health consequences from AI data centres, let alone pay for the connection costs of AI data centres.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Where to find information and key resources on nitrogen oxide emissions and laws in Ontario
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            For emissions-related information, you may be able to find information through the following sources:
          </p>
          <ul className="list-disc list-inside space-y-4 text-gray-700 dark:text-gray-300 mb-6">
            <li>
              <strong>Environmental Registry of Ontario (ERO):</strong> Project documents are posted on the ERO for the public to provide comments if a project requires an Environmental Compliance Approval (ECA). A project requires an ECA under section 9(1) of the Environmental Protection Act (EPA) if it will discharge contaminants, such as nitrogen oxides, into the natural environment. However, section 9(4) of the EPA allows for projects to be exempt from ECA requirements if they are instead prescribed to register with the Environmental Activity and Sector Registry (EASR) by section 20.21 and corresponding regulations, such as Regulation 1/17.
            </li>
            <li>
              <strong>Access Environment:</strong> This page provides documents for projects that only require registration with the EASR. However, the EASR does not have procedures requiring public notice and opportunity to comment before projects are registered, or public appeal rights after projects are registered.
            </li>
            <li>
              You may also be able to find emissions information on the <strong>National Pollutant Release Inventory (NPRI)</strong>, a database run by the federal government. Facilities must report their nitrogen oxides emissions to the NPRI if they release at least 20 tonnes of nitrogen oxides and employees work at least 20,000 hours during the year (or other criteria in Part 8.5 of the NPRI reporting guide). You can search for data centres on the NPRI using the North American Industry Classification System (NAICS) code 518210 for data processing, hosting, and related services. However, there do not currently appear to be data centres in Ontario reporting nitrogen oxides emissions to the NPRI.
            </li>
          </ul>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            For energy-related information, you may be able to find information through the following sources:
          </p>
          <ul className="list-disc list-inside space-y-4 text-gray-700 dark:text-gray-300 mb-6">
            <li>
              The IESO does not appear to publish the locations of proposed data centre projects.
            </li>
            <li>
              Submit an information request from IESO (as a $5 fee).
            </li>
          </ul>
          <p className="text-gray-700 dark:text-gray-300">
            You may also find it helpful to contact the <strong>Canadian Environmental Law Association (CELA)</strong> through their intake form at{' '}
            <a href="https://cela.ca/intake-form/" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">https://cela.ca/intake-form/</a>.
            {' '}If your issue involves urgent deadlines, you can reach them at 416-960-2284, ext. 7216 (toll free: 1-844-755-1420) or{' '}
            <a href="mailto:articling@cela.ca" className="text-blue-600 dark:text-blue-400 hover:underline">articling@cela.ca</a>.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Additional Links and Resources
          </h2>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li>
              <a href="https://thenarwhal.ca/ontario-data-centres-great-lakes/" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">
                Are data centres a threat to the Great Lakes?
              </a>{' '}by Stephen Starr, The Narwhal
            </li>
            <li>
              <a href="https://www.psu.edu/news/engineering/story/why-ai-uses-so-much-energy/" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">
                Why AI uses so much energy
              </a>{' '}by Professor Mahmut Kandemir at Penn State University
            </li>
            <li>
              <a href="https://www.unep.org/news-and-stories/story/ai-has-environmental-problem" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">
                AI has an environmental problem
              </a>{' '}by the UNEP
            </li>
            <li>
              <a href="https://ketanjoshi.co/2024/04/10/the-ai-climate-hoax/" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">
                The AI Climate Hoax: Behind the Curtain of How Big Tech Greenwashes Impacts
              </a>{' '}(report by Ketan Joshi and multiple climate groups)
            </li>
            <li>
              <a href="https://www.southernlive.com/experts-warn-of-serious-health-risks-from-xai-power-plant-in-southaven/" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">
                Experts warn of serious health risks from xAI power plant in Southaven
              </a>{' '}by Lauren Turman
            </li>
            <li>
              <a href="https://www.youtube.com/watch?v=dTBPt8xDCD8" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">
                Datacenters Behaving Like Acoustic Weapons
              </a>{' '}by Benn Jordan (about AI data centres and infrasound)
            </li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
            Other data centre maps
          </h3>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li>
              <a href="https://www.datacentermap.com/canada/ontario/" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">
                List of data centres
              </a>{' '}— Ontario
            </li>
            <li>
              <a href="https://www.datacentermap.com/" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">
                Data centre map
              </a>{' '}— Worldwide
            </li>
            <li>
              <a href="https://openinframap.org/" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">
                Open Infrastructure Map
              </a>{' '}(includes data centres) — Worldwide
            </li>
          </ul>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Contact us
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-2">
            Email: info[at]climatefast.ca
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            Instagram: @climatefastaction
          </p>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Take Action
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            Join our virtual town hall meetings to Say No to AI data centres in Ontario by emailing info[at]climatefast.ca or sign up by filling out the form here!
          </p>
        </div>
      </div>
    </main>
  );
}
