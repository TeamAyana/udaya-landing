# Quick Start Guide - Udaya Website (Post Security Patch)

**Last Updated**: December 10, 2025
**Next.js Version**: 15.5.7 (Patched for CVE-2025-55182)

---

## Starting Development Server

### Option 1: Fresh Terminal (Recommended)
1. **Close your current PowerShell/terminal completely**
2. Open a new terminal window
3. Navigate to project:
   ```bash
   cd X:\Projects\udaya\website
   ```
4. Start dev server:
   ```bash
   npm run dev
   ```
5. Verify you see: **▲ Next.js 15.5.7**

### Option 2: If You See Cached Version (15.5.3)

If the dev server shows "Next.js 15.5.3", the old version is cached:

```bash
# 1. Stop all running servers (Ctrl+C)

# 2. Clear caches
rm -rf .next
rm -rf node_modules/.cache
rm -rf .swc

# 3. Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# 4. Start dev server
npm run dev
```

You should now see: **▲ Next.js 15.5.7**

---

## Building for Production

```bash
npm run build
```

Expected output:
- ✅ Compiled successfully
- ✅ 48 pages generated
- ✅ No webpack module errors

---

## Deployment to Vercel

### Method 1: Git Push (Automatic)
```bash
git add .
git commit -m "Security patch: Upgrade Next.js to 15.5.7 (CVE-2025-55182)"
git push
```

### Method 2: Vercel CLI (Manual)
```bash
vercel --prod
```

---

## Verification Commands

### Check Next.js Version
```bash
npm list next
```
Expected: `next@15.5.7`

### Check for Vulnerabilities
```bash
npm audit
```
Expected: `found 0 vulnerabilities`

### Verify Build Works
```bash
npm run build
```
Expected: All 48 pages compile successfully

---

## Environment Setup

Ensure you have these environment variables in `.env.local`:

```env
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# Firebase Admin
FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=

# Klaviyo
KLAVIYO_PRIVATE_API_KEY=
KLAVIYO_WAITLIST_LIST_ID=

# Resend
RESEND_API_KEY=

# Admin Auth
JWT_SECRET=
ADMIN_USERNAME=
ADMIN_PASSWORD=

# Vercel Blob (optional)
BLOB_READ_WRITE_TOKEN=
```

---

## Common Development Tasks

### Run Linting
```bash
npm run lint
```

### Run Content Linting
```bash
npm run lint:content
```

### Run All Lints
```bash
npm run lint:all
```

### Start Production Server Locally
```bash
npm run build
npm start
```

---

## Troubleshooting

### Issue: Dev server shows old Next.js version
**Solution**: Close terminal completely and open a new one. The old version was cached in the process.

### Issue: Webpack module errors
**Solution**: Clear all caches and reinstall:
```bash
rm -rf .next node_modules/.cache .swc node_modules package-lock.json
npm install
```

### Issue: Port 3000 in use
**Solution**: Next.js will automatically use an available port (3001, 3002, etc.)

To kill the process on port 3000:
```bash
# Windows PowerShell
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process

# Or find and kill manually
netstat -ano | findstr :3000
taskkill /PID <process_id> /F
```

### Issue: Build fails with TypeScript errors
**Solution**: Check the error output. The build warnings (react-hooks/exhaustive-deps) are non-critical.

---

## Project Structure Overview

```
X:\Projects\udaya\website\
├── src/
│   ├── app/              # Pages (Next.js App Router)
│   ├── components/       # Reusable components
│   ├── lib/              # Utilities, helpers, integrations
│   └── types/            # TypeScript types
├── public/               # Static assets
├── .env.local            # Environment variables (not in git)
├── package.json          # Dependencies (Next.js 15.5.7)
├── next.config.js        # Next.js configuration
└── tailwind.config.ts    # Tailwind CSS configuration
```

---

## Security Notes

- ✅ **CVE-2025-55182 Patched**: Next.js upgraded to 15.5.7
- ✅ **No Vulnerabilities**: Clean npm audit
- ⚠️ **Action Required**: Deploy to production immediately
- ⚠️ **Rotate Secrets**: If site was exposed Dec 4+, rotate all secrets
- ⚠️ **Enable Protection**: Turn on Standard Protection for preview deployments

See `SECURITY-PATCH-2025-12-10.md` for complete details.

---

## Support Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Security Bulletin**: https://vercel.com/security/react2shell
- **Project Issues**: X:\Projects\udaya\website\SECURITY-PATCH-2025-12-10.md

---

**Ready to deploy!** 🚀

The site is fully patched, tested, and ready for production deployment.
