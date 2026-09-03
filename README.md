# Meeting Room Booking System

A responsive internal meeting room booking application for employees.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-black)](https://meeting-roombooking-system.vercel.app/)
![React](https://img.shields.io/badge/React-19-61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6)
![Vite](https://img.shields.io/badge/Vite-powered-646CFF)


## Features
- View meeting rooms
- Search and Filter meeting rooms
- Create bookings
- View booking details
- Edit upcoming bookings
- Cancel bookings
- Search and filter bookings
- Daily and Weekly Schedule
- Persistent data after page refresh
- URL-based filters on the rooms and bookings pages
- Dashboard with today's bookings and room availability
- Responsive design
- Toast notifications for booking actions and validation feedback

## Tech Stack
| Area | Technology |
| --- | --- |
| Frontend | React, TypeScript, Vite |
| Styling | Tailwind CSS |
| Routing | React Router |
| State Management | Zustand |
| Forms | React Hook Form |
| Calendar | FullCalendar |
| Icons | Lucide React |
| Notifications | Sonner |
| Deployment | Vercel |

## Assumptions and Trade-offs
- Authentication and authorization are not implemented because they are not included in the assignment. Because of that, each user can edit or cancel any booking.
- Initial application data is loaded from local JSON files.
- Users can add, edit and cancel bookings. These changes are saved in localStorage, while the original JSON files remain unchanged.
- Canceled bookings are not deleted from the data. Their status is changed from confirmed to canceled.
- Room operational status is treated separately from current booking availability.
- The schedule is read-only. Creating and editing bookings is possible from the related booking pages.
- On small screens the schedule defaults to a daily view for better readability, but users can still switch to the weekly view.
- Bookings are limited to office hours, so users can only book rooms within the allowed time range.
- Rooms have their own operational status, such as active or maintenance. This is different from whether the room is currently occupied or available for booking.
- Users can filter rooms and bookings. Filter state is stored in the URL, so it is preserved after page refresh.

## Getting Started

To run locally:

```bash
npm install
npm run dev
```

To lint the project:

```bash
npm run lint
```

To build for production:

```bash
npm run build
```