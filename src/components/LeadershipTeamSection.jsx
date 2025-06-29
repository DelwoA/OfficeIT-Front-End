const LeadershipTeamSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-7">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold">
            Our Leadership Team
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
            Meet the talented individuals who drive our vision and success
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="bg-white rounded-lg overflow-hidden shadow-md">
            <img
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              alt="CEO"
              className="w-full h-48 sm:h-64 object-cover"
            />
            <div className="p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-semibold mb-1">
                Michael Johnson
              </h3>
              <p className="text-purple-700 mb-2 sm:mb-3 text-sm sm:text-base">
                Chief Executive Officer
              </p>
              <p className="text-gray-600 text-sm sm:text-base">
                With over 20 years of experience in the IT industry, Michael
                leads our company with a focus on innovation and strategic
                growth.
              </p>
            </div>
          </div>
          <div className="bg-white rounded-lg overflow-hidden shadow-md">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              alt="CTO"
              className="w-full h-48 sm:h-64 object-cover"
            />
            <div className="p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-semibold mb-1">
                Sarah Williams
              </h3>
              <p className="text-purple-700 mb-2 sm:mb-3 text-sm sm:text-base">
                Chief Technology Officer
              </p>
              <p className="text-gray-600 text-sm sm:text-base">
                Sarah oversees our technical strategy and ensures we remain at
                the forefront of technological advancements in the industry.
              </p>
            </div>
          </div>
          <div className="bg-white rounded-lg overflow-hidden shadow-md">
            <img
              src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              alt="COO"
              className="w-full h-48 sm:h-64 object-cover"
            />
            <div className="p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-semibold mb-1">
                David Chen
              </h3>
              <p className="text-purple-700 mb-2 sm:mb-3 text-sm sm:text-base">
                Chief Operations Officer
              </p>
              <p className="text-gray-600 text-sm sm:text-base">
                David ensures seamless operations across all departments,
                optimizing processes for maximum efficiency and customer
                satisfaction.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadershipTeamSection;
