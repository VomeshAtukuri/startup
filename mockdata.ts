export const bios = [
  "A passionate entrepreneur with a vision to revolutionize the tech industry through innovative solutions.",
  "An experienced startup founder dedicated to fostering collaboration and building impactful projects.",
  "A creative thinker and problem solver, always seeking feedback to refine and improve ideas.",
  "A visionary leader with a strong background in business development and a knack for identifying market opportunities.",
  "An aspiring innovator focused on creating sustainable and scalable solutions for modern challenges.",
  "A collaborative team player, eager to connect with co-founders and investors to bring ideas to life.",
  "A results-driven entrepreneur with a proven track record of turning ideas into successful ventures.",
  "A forward-thinking individual passionate about building a community of like-minded innovators.",
  "A detail-oriented strategist with expertise in pitching ideas and securing funding for startups.",
  "A motivated self-starter with a deep commitment to driving innovation and creating value in the startup ecosystem."
];

export function getRandomBio(): string {
  const randomIndex = Math.floor(Math.random() * bios.length);
  return bios[randomIndex];
}