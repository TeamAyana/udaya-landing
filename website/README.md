# Udaya - Medical Cannabis Retreat Platform

A comprehensive Next.js web application for Udaya's medical cannabis retreat programs in Thailand, supporting patients navigating cancer, chronic pain, and serious illness.

## 🌟 Project Overview

Udaya is a patient-focused platform that:
- Provides information about medical cannabis retreat programs
- Manages program inquiries and waitlist applications
- Offers blog content for education and engagement
- Facilitates professional partnerships and referrals
- Enables admin management of content, inquiries, and communications

**Live URL:** https://udaya.one

---

## 🛠️ Technology Stack

### Frontend
- **Framework:** Next.js 15.5.3 (App Router)
- **Language:** TypeScript 5.7.3
- **Styling:** Tailwind CSS 3.4.1 with custom Udaya theme
- **UI Components:** Radix UI primitives + custom design system
- **Animations:** Framer Motion 11.0.0
- **Forms:** React Hook Form 7.54.2 + Zod validation
- **Rich Text Editor:** TipTap 3.4.2 (for blog posts)

### Backend & Database
- **Database:** Firebase Firestore (NoSQL cloud database)
- **Authentication:** Firebase Admin SDK + JWT
- **Server Actions:** Next.js API Routes (serverless functions)

### Third-Party Services
- **Email Service:** Resend v6.4.0 (transactional emails)
- **Marketing Automation:** Klaviyo (email lists & event tracking)
- **Analytics:** Google Analytics 4 (via gtag)
- **Scheduling:** Calendly integration (consultation bookings)

### Security & Performance
- **Rate Limiting:** Custom in-memory rate limiter
- **Input Sanitization:** Custom XSS/injection prevention
- **Error Handling:** React Error Boundaries
- **Password Hashing:** Bcrypt (12 rounds)
- **Session Management:** HTTP-only cookies with JWT

---

## 📁 Project Structure

```
udaya/website/
├── src/
│   ├── app/                          # Next.js App Router pages
│   │   ├── page.tsx                  # Homepage
│   │   ├── inquiry/                  # Program inquiry form (main conversion)
│   │   ├── programs/                 # Program overview & details
│   │   ├── blog/                     # Blog listing & posts
│   │   ├── contact/                  # Contact form
│   │   ├── referrals/                # Professional partnerships
│   │   ├── admin/                    # Admin dashboard
│   │   └── api/                      # API routes (serverless)
│   │       ├── auth/                 # Authentication endpoints
│   │       ├── blog/                 # Blog CRUD operations
│   │       ├── admin/                # Admin data endpoints
│   │       ├── inquiry/              # Program inquiry submissions
│   │       ├── contact/              # Contact form submissions
│   │       └── referrals/            # Partnership inquiries
│   ├── components/
│   │   ├── ui/                       # Reusable UI components
│   │   ├── sections/                 # Homepage sections
│   │   ├── layout/                   # Navigation & Footer
│   │   └── admin/                    # Admin-specific components
│   ├── lib/
│   │   ├── firebase.ts               # Firebase client SDK
│   │   ├── firebase-admin.ts         # Firebase Admin SDK
│   │   ├── auth-firebase.ts          # Authentication utilities
│   │   ├── resend.tsx                # Email sending functions
│   │   ├── klaviyo.ts                # Klaviyo API integration
│   │   ├── analytics.ts              # Google Analytics tracking
│   │   ├── rate-limit.ts             # Rate limiting utilities
│   │   ├── sanitize.ts               # Input sanitization
│   │   ├── constants.ts              # Site configuration
│   │   ├── emails/                   # React Email templates (8 types)
│   │   └── utils/                    # Helper utilities
│   ├── types/
│   │   └── blog.ts                   # TypeScript interfaces
│   └── middleware.ts                 # Route protection
├── public/                           # Static assets
├── scripts/                          # Utility scripts
├── content/                          # Content configuration
├── FIREBASE_SETUP.md                 # Firebase setup guide
├── ENVIRONMENT_SETUP.md              # Environment variables guide
└── README.md                         # This file
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Firebase project with Firestore enabled
- Resend account (for emails)
- Klaviyo account (for marketing automation)
- Google Analytics 4 property (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd udaya/website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory (see `ENVIRONMENT_SETUP.md` for detailed instructions):

   ```env
   # Firebase Client SDK (public - used in browser)
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

   # Firebase Admin SDK (server-side only)
   FIREBASE_PROJECT_ID=your_project_id
   FIREBASE_CLIENT_EMAIL=your_service_account_email
   FIREBASE_PRIVATE_KEY="your_private_key"

   # Authentication
   JWT_SECRET=your_secure_random_string
   ADMIN_EMAIL=admin@udaya.one
   ADMIN_PASSWORD=your_secure_password

   # Email Service (Resend)
   RESEND_API_KEY=re_your_resend_api_key

   # Marketing Automation (Klaviyo)
   KLAVIYO_PRIVATE_API_KEY=pk_your_klaviyo_api_key
   KLAVIYO_WAITLIST_LIST_ID=your_list_id

   # Analytics (optional)
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```

4. **Set up Firebase**

   Follow instructions in `FIREBASE_SETUP.md`:
   - Create Firestore database
   - Set up Firestore security rules
   - Create required collections
   - Add indexes

5. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000)

---

## 🗄️ Database Structure (Firebase Firestore)

### Collections

#### `inquiry` (formerly `waitlist`)
Program inquiry submissions with medical information and program preferences.

**Fields:**
- Personal: `fullName`, `email`, `phone`, `country`, `age`
- Medical: `diagnosis`, `diagnosisDate`, `currentTreatments`, `healthStatus`, `medications`, `dietaryRequirements`
- Goals: `healingGoals`, `treatmentPhilosophy`
- Experience: `cannabisExperience`
- Program: `programPreference`, `caregiverInfo`
- Metadata: `inquiryNumber`, `createdAt`, `status`, `source`, `ipAddress`

#### `contacts`
General contact form submissions.

**Fields:**
- `name`, `email`, `country`, `userType`, `subject`, `message`
- `createdAt`, `status`

#### `referrals`
Professional partnership inquiries.

**Fields:**
- `name`, `email`, `phone`, `country`, `organization`, `professionalRole`, `message`
- `createdAt`, `status`, `totalReferrals`, `successfulReferrals`

#### `newsletter`
Newsletter subscribers with unsubscribe tokens.

**Fields:**
- `email`, `subscribedAt`, `unsubscribeToken`, `unsubscribedAt`, `source`

#### `users`
Admin user accounts.

**Fields:**
- `email`, `name`, `role`, `passwordHash`, `permissions`, `createdAt`, `lastLogin`, `isActive`

#### `posts`
Blog posts with rich content.

**Fields:**
- Content: `title`, `slug`, `excerpt`, `content`, `author`, `category`, `tags`
- Media: `featuredImage`
- Dates: `publishedAt`, `updatedAt`
- Status: `status` (draft/published)
- Metrics: `views`, `readingTime`
- SEO: `metaTitle`, `metaDescription`, `focusKeyword`, `ogTitle`, `ogDescription`, `ogImage`

#### `categories`
Blog categories.

**Fields:**
- `name`, `slug`, `description`, `createdAt`

#### `notifications`
Admin dashboard notifications.

**Fields:**
- `type`, `title`, `message`, `link`, `read`, `createdAt`

---

## 📧 Email System

### Email Service: Resend

**Purpose:** Instant transactional emails for all form submissions.

**Templates (React Email):**
1. **Inquiry Confirmation** - Sent to users after program inquiry submission
2. **Inquiry Admin Notification** - Sent to team@udaya.one with inquiry details
3. **Contact Confirmation** - Sent to users after contact form submission
4. **Contact Admin Notification** - Sent to admin with contact details
5. **Referral Confirmation** - Sent to partners after partnership inquiry
6. **Referral Admin Notification** - Sent to admin with referral details
7. **Newsletter Confirmation** - Sent to new newsletter subscribers
8. **Newsletter Admin Notification** - Sent to admin about new subscriber

**Features:**
- Beautiful branded HTML emails with Udaya styling
- Personalized content (first name, inquiry number, etc.)
- Reply-to headers for easy communication
- Email tags for tracking
- Non-blocking sends (forms succeed even if email fails)

### Marketing Automation: Klaviyo

**Purpose:** Email list building and behavioral event tracking.

**Integration:**
- Automatically adds inquiry submissions to designated list
- Tracks custom events (Joined Waitlist, Subscribed to Newsletter, etc.)
- Stores profile properties (diagnosis, age, experience, etc.)
- Enables future email flows and segmentation

---

## 🔐 Security Features

### Rate Limiting
- **Forms:** 5 submissions per 15 minutes per IP
- **Login:** 5 attempts per 15 minutes per IP
- **Returns:** HTTP 429 with Retry-After header

### Input Sanitization
- Removes HTML tags and scripts (XSS prevention)
- Validates email, phone, URL formats
- Limits input length
- Field-specific sanitization (plain text, multiline, rich text)

### Authentication
- JWT tokens stored in HTTP-only cookies
- Bcrypt password hashing (12 rounds)
- Middleware route protection for admin pages
- Token expiration (7 days)

### Error Handling
- React Error Boundaries in admin dashboard
- Graceful degradation for failed services
- Detailed error logging (dev only)
- User-friendly error messages

---

## 🎨 Design System

### Colors (Udaya Palette)
- **Sage Green:** `#5C7B65` - Primary brand color
- **White:** `#FFFFFF` - Secondary
- **Cream:** `#F6F2E6` - Backgrounds
- **Gold:** `#D9A441` - Accent
- **Terracotta:** `#C98A6D` - Warm accent
- **Charcoal:** `#2B2B2B` - Text

### Typography
- **Serif:** Playfair Display - Headings, elegant text
- **Sans:** Inter - Body text, readable content
- **Display:** Space Grotesk - Display headings

### Components
- Built with Radix UI primitives
- Custom styled with Tailwind CSS
- Consistent spacing and responsive design
- Accessible (ARIA labels, keyboard navigation)

---

## 📱 Key Features

### Public-Facing

1. **Homepage**
   - Hero section with value proposition
   - Method overview (3 pillars)
   - Retreat spotlight
   - Patient testimonials
   - Trust/credibility section

2. **Program Inquiry Form** (`/inquiry`)
   - Multi-section comprehensive form
   - Medical information collection
   - Healing goals assessment
   - Cannabis experience tracking
   - Automatic inquiry numbering
   - Email confirmations (user + admin)
   - Klaviyo list subscription

3. **Programs Pages**
   - Overview of all programs (`/programs`)
   - Detailed cancer program page (`/programs/cancer`)
   - Future programs section

4. **Blog System**
   - Blog listing with categories
   - Individual blog posts with rich content
   - Search and filter functionality
   - Reading time estimation
   - View tracking

5. **Contact & Partnerships**
   - General contact form (`/contact`)
   - Professional partnership inquiries (`/referrals`)
   - Calendly integration for consultations (`/schedule`)

6. **Information Pages**
   - The Udaya Method (`/method`)
   - About Udaya (`/about`)
   - FAQ (`/faq`)
   - Privacy Policy, Terms, Disclaimer

### Admin Dashboard

1. **Dashboard Overview**
   - Key metrics (inquiries, posts, subscribers, etc.)
   - Recent activity
   - Quick actions

2. **Blog Management**
   - Create/edit/delete blog posts
   - TipTap rich text editor
   - Category management
   - Author management
   - SEO fields (meta tags, OG images)
   - Publishing workflow (draft/published)

3. **Data Management**
   - View inquiry submissions
   - View contact form submissions
   - View partnership inquiries
   - Newsletter subscriber list
   - Export capabilities

4. **User Management**
   - Admin user accounts
   - Role-based permissions
   - Activity tracking

5. **Analytics**
   - Google Analytics integration
   - View counts and engagement metrics

---

## 🔧 Development

### Available Scripts

```bash
# Development
npm run dev              # Start dev server (http://localhost:3000)
npm run build            # Production build
npm run start            # Start production server
npm run lint             # Run ESLint
npm run lint:content     # Lint content quality
npm run lint:all         # Run all linters

# Testing (scripts in /scripts)
node scripts/send-test-email.js           # Test email sending
node scripts/test-form-submission.js      # Test form API
node scripts/test-resend.js               # Test Resend integration
```

### Code Quality

- **TypeScript:** Strict mode enabled
- **ESLint:** Next.js configuration
- **Prettier:** Code formatting (via ESLint)
- **Git Hooks:** Pre-commit linting (optional)

---

## 🚢 Deployment

### Recommended: Vercel

1. **Connect repository to Vercel**
2. **Add environment variables** in Vercel dashboard
3. **Deploy**

**Build settings:**
- Framework Preset: Next.js
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`

### Other Platforms

Works with any platform supporting Node.js 18+:
- Netlify
- Railway
- Render
- AWS Amplify
- Self-hosted with PM2/Docker

### Post-Deployment

1. Verify Firebase connection
2. Test form submissions
3. Confirm email sending (Resend)
4. Verify Klaviyo integration
5. Check Google Analytics tracking
6. Test admin login and dashboard

---

## 📊 Monitoring & Maintenance

### Logs to Monitor
- Vercel/hosting logs for API errors
- Firebase Console for data verification
- Resend Dashboard for email delivery
- Klaviyo Dashboard for list growth and events
- Google Analytics for traffic and conversions

### Regular Tasks
- Review inquiry submissions daily
- Monitor email deliverability
- Check blog post performance
- Update content as needed
- Review security logs

---

## 🐛 Troubleshooting

### Common Issues

**Forms not submitting:**
- Check Firebase credentials in environment variables
- Verify Firestore security rules allow writes
- Check browser console for errors

**Emails not sending:**
- Verify `RESEND_API_KEY` is set correctly
- Check that `team@udaya.one` domain is verified in Resend
- View Resend dashboard for delivery status

**Klaviyo not receiving data:**
- Verify `KLAVIYO_PRIVATE_API_KEY` starts with `pk_`
- Check list ID is correct
- View Klaviyo activity feed for events

**Admin login failing:**
- Ensure `ADMIN_EMAIL` and `ADMIN_PASSWORD` are set
- Check `JWT_SECRET` is configured
- Verify Firebase Admin SDK is initialized

---

## 📝 API Documentation

### Public Endpoints

**POST `/api/inquiry`**
- Submit program inquiry form
- Rate limited: 5 requests per 15 minutes
- Returns: `{ success: true, id: string, inquiryNumber: number }`

**POST `/api/contact`**
- Submit contact form
- Rate limited: 5 requests per 15 minutes
- Returns: `{ success: true, id: string }`

**POST `/api/referrals`**
- Submit partnership inquiry
- Rate limited: 5 requests per 15 minutes
- Returns: `{ success: true, id: string }`

**GET `/api/blog/posts`**
- Get published blog posts (or all if authenticated)
- Returns: `{ posts: BlogPost[] }`

**GET `/api/blog/posts/[id]`**
- Get single blog post by ID
- Returns: `{ post: BlogPost }`

### Protected Endpoints (Admin Only)

**POST `/api/auth/login`**
- Admin login with email/password
- Rate limited: 5 attempts per 15 minutes
- Returns: `{ success: true, user: User }` + HTTP-only cookie

**POST `/api/auth/logout`**
- Admin logout (clears cookie)
- Returns: `{ success: true }`

**POST `/api/blog/posts`** (Admin)
- Create new blog post
- Requires authentication
- Returns: `{ post: BlogPost }`

**PUT `/api/blog/posts/[id]`** (Admin)
- Update blog post
- Requires authentication
- Returns: `{ post: BlogPost }`

**DELETE `/api/blog/posts/[id]`** (Admin)
- Delete blog post
- Requires authentication
- Returns: `{ success: true }`

---

## 🤝 Contributing

This is a private project for Udaya. For questions or issues:
- Contact: team@udaya.one

---

## 📄 License

Proprietary - All rights reserved by Udaya.

---

## 🙏 Acknowledgments

Built with:
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Firebase](https://firebase.google.com/)
- [Resend](https://resend.com/)
- [Klaviyo](https://www.klaviyo.com/)
- [Radix UI](https://www.radix-ui.com/)
- [TipTap](https://tiptap.dev/)

---

**Last Updated:** November 2024
**Version:** 1.0.0
**Status:** Production Ready ✅
