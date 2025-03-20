export const data = Array.from({ length: 1 }, (_, index) => ({
  created: `2023-01-${String(index + 1).padStart(2, '0')}`,
  views: Math.floor(Math.random() * 1000),
  userid: `User ${index + 1}`,
  title: `Project ${index + 1}`,
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  image: `/card.png`,
  category: "Category " + ((index % 5) + 1),
}));
