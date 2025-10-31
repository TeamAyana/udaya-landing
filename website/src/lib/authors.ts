export interface Author {
  id: string;
  name: string;
  title: string;
  bio: string;
  avatar: string;
  email?: string;
}

export const AUTHORS: Author[] = [
  {
    id: 'jean-luc',
    name: 'Jean-Luc',
    title: 'Education & Product',
    bio: 'Leading our medical cannabis education programs with deep expertise in cannabinoid therapeutics and patient care.',
    avatar: '/images/team/jean-luc-placeholder.jpg',
  },
  {
    id: 'andrey',
    name: 'Andrey',
    title: 'Operations & Co-Facilitation',
    bio: 'Ensuring smooth retreat operations and co-facilitating group sessions with compassion and professional expertise.',
    avatar: '/images/team/andrey-placeholder.jpg',
  },
  {
    id: 'chris',
    name: 'Chris',
    title: 'Retreat Manager',
    bio: 'Managing all aspects of the retreat experience to ensure each participant feels supported and cared for.',
    avatar: '/images/team/chris-placeholder.jpg',
  },
];

export function getAuthorById(id: string): Author | undefined {
  return AUTHORS.find(author => author.id === id);
}