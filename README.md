#  Quick Aid

Quick Aid is a real-time emergency reporting platform that enables users to instantly notify the right authorities — Police, Hospitals, or Fire Brigades — with precise location data.  
The platform ensures **fast response times**, **secure communication**, and **anonymity** for reporters when needed.

---

## 📌 Features

- **Instant Emergency Reporting** – Submit incidents in seconds with location & media.
- **Authority Selection** – Choose which agency to notify: Police, Ambulance, or Fire Brigade.
- **Geo-Location Integration** – Powered by Mapbox for accurate location tracking
- **Real-Time Notifications via SMS** – Alerts sent directly to the selected authority.
- **Anonymous Reporting** – Option to hide your identity for sensitive cases.
- **Admin Dashboard** – Authorities can log in, view, and manage reports.
- **Report Tracking** – Check status updates on submitted incidents.

---

## 🖥️ Tech Stack

**Frontend:**
- [Next.js](https://nextjs.org/) – React framework for the frontend.
- [Tailwind CSS](https://tailwindcss.com/) – Utility-first styling.
- [Lucide Icons](https://lucide.dev/) – Modern icon set

**Backend:**
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)
- [Prisma](https://www.prisma.io/) – Database ORM.
- [NextAuth.js](https://next-auth.js.org/) – Authentication for admin dashboard.
- [Twilio](https://www.twilio.com/) – SMS notifications.
- [Mapbox](https://www.mapbox.com/) – Geo-location support.

**Database:**
- PostgreSQL (can be swapped with MySQL or other Prisma-supported DBs).

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/yourusername/quick-aid.git
cd quick-aid
```
### 2️⃣ Install Dependencies
```bash
npm install
```
### 3️⃣ Set Up Environment Variables  
Create .env file in the root and add: 
```bash
DATABASE_URL=your_database_connection_string
NEXTAUTH_SECRET=your_nextauth_secret
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_number
MAPBOX_ACCESS_TOKEN=your_mapbox_token
```
### 4️⃣ Run Database Migrations
```bash
npx prisma migrate dev

```
### 5️⃣ Start the Development Server
```bash
npm run dev



