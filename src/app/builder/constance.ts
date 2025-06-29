export const fieldToDbPathMap: Record<string, string> = {
  email: 'email',
  name: 'name',
  location: 'address.location', // nested path
  city: 'address.city',
  bsc: 'education.bsc',
  msc: 'education.msc',
  skill: 'skills',
  experience: 'experience',
  expertise: 'expertise',
  academicInterests: 'academicInterests',
  course: 'course',
  researchArea: 'researchArea',
};
