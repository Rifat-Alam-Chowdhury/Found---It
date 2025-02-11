import React from "react";

const reunionStories = [
  {
    id: 1,
    title: "Family Reunited!",
    content:
      "I lost my heirloom necklace and a kind stranger returned it. I'm forever grateful!",
    user: "Emily R.",
  },
  {
    id: 2,
    title: "Found My Wallet",
    content:
      "After a stressful day, I finally got my wallet back thanks to the community!",
    user: "Mark T.",
  },
];

const topHeroes = [
  {
    id: 1,
    name: "Alice",
    badge: "Gold",
    image:
      "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  },
  {
    id: 2,
    name: "Bob",
    badge: "Silver",
    image:
      "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  },
  {
    id: 3,
    name: "Charlie",
    badge: "Bronze",
    image:
      "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  },
];

const thankYouNotes = [
  {
    id: 1,
    note: "Thank you for reuniting me with my lost keys!",
    sender: "Samantha",
  },
  {
    id: 2,
    note: "Grateful for the community's help with my lost phone.",
    sender: "David",
  },
];

const partnerLogos = [
  { id: 1, src: "/images/partner1.png", alt: "City Transport" },
  { id: 2, src: "/images/partner2.png", alt: "Local Authority" },
  { id: 3, src: "/images/partner3.png", alt: "Community Org" },
];

const Community = () => {
  return (
    <section className="bg-white py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-color">Community Heroes</h2>
          <p className="mt-2 text-purple-400">
            Celebrating reunion stories, top finders, and community gratitude
          </p>
        </div>

        <div className="mb-8">
          <h3 className="lg:text-2xl textarea-lg font-semibold text-color mb-4">
            User-Submitted Reunion Stories
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            {reunionStories.map((story) => (
              <div
                key={story.id}
                className="border border-purple-200 rounded-lg p-4 shadow hover:shadow-lg transition-shadow duration-300"
              >
                <h4 className="text-xl font-bold text-purple-500">
                  {story.title}
                </h4>
                <p className="text-color mt-2">{story.content}</p>
                <p className="mt-4 text-sm font-medium text-purple-500">
                  - {story.user}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* logo  */}
        <div className="mb-8">
          <h3 className="lg:text-2xl text-lg font-semibold text-color mb-4">
            Top Finders & Reporters
          </h3>
          <div className="flex flex-wrap gap-4 justify-center">
            {topHeroes.map((hero) => (
              <div
                key={hero.id}
                className="relative flex flex-col items-center p-4 bg-purple-50 rounded-full border-2 border-purple-300 hover:bg-purple-200 transition-colors duration-300 cursor-pointer"
              >
                <span className="absolute top-0 right-0 bg-purple-300 text-white text-xs font-semibold py-1 px-2 rounded-bl-lg">
                  {hero.badge} Hero
                </span>

                <img
                  src={hero.image}
                  alt={hero.name}
                  className="w-16 h-16 object-cover rounded-full"
                />

                <p className="mt-2 text-purple-700 font-semibold">
                  {hero.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Thank You Notes */}
        <div className="mb-8">
          <h3 className="lg:text-2xl text-lg font-semibold text-color mb-4">
            Live Feed of Thank You Notes
          </h3>
          <div className="space-y-4">
            {thankYouNotes.map((note) => (
              <div
                key={note.id}
                className="p-4 border border-purple-200 rounded-lg shadow hover:shadow-md transition-shadow duration-300"
              >
                <p className="text-blue-500">{note.note}</p>
                <p className="mt-2 text-right text-sm text-purple-500">
                  - {note.sender}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* partner */}
        <div>
          <h3 className="lg:text-2xl text-lg font-semibold text-color mb-4">
            Our Partners
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {partnerLogos.map((partner) => (
              <div
                key={partner.id}
                className="w-24 h-24 flex items-center justify-center"
              >
                <img
                  src={partner.src}
                  alt={partner.alt}
                  className="max-w-full max-h-full"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Community;
