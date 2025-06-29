"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fieldToDbPathMap = void 0;
exports.fieldToDbPathMap = {
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
