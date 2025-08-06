# Firebase Firestore Setup Guide

## Current Issue
Your Firestore database has restrictive security rules that are preventing read/write operations. You're seeing "Missing or insufficient permissions" errors.

## Solution: Update Firestore Security Rules

### Option 1: Using Firebase Console (Recommended)

1. **Go to Firebase Console**
   - Open https://console.firebase.google.com/
   - Select your project: `live-ecommerce-c44c5`

2. **Navigate to Firestore Database**
   - Click on "Firestore Database" in the left sidebar
   - Go to the "Rules" tab

3. **Update the Rules**
   Replace the existing rules with:
   ```javascript
   rules_version = '2';
   
   service cloud.firestore {
     match /databases/{database}/documents {
       // Allow read/write access to all documents for demo purposes
       // WARNING: These rules are for demo only - not suitable for production
       match /{document=**} {
         allow read, write: if true;
       }
     }
   }
   ```

4. **Publish the Rules**
   - Click "Publish" to apply the new rules
   - Wait for the rules to be deployed (usually takes a few seconds)

### Option 2: Using Firebase CLI

If you have Firebase CLI installed:

1. **Install Firebase CLI** (if not already installed):
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase**:
   ```bash
   firebase login
   ```

3. **Initialize Firebase in your project**:
   ```bash
   firebase init firestore
   ```

4. **Deploy the rules**:
   ```bash
   firebase deploy --only firestore:rules
   ```

## Verify the Fix

After updating the rules:

1. **Refresh your browser** or restart your development server
2. **Try creating a product again** in the admin dashboard
3. **Check the browser console** - the permission errors should be gone

## Security Note

⚠️ **Important**: These rules allow anyone to read and write to your database. This is fine for a demo project, but for a production application, you should implement proper security rules based on authentication and authorization requirements.

## Next Steps

Once the rules are updated, your application should work correctly:
- ✅ Homepage will load products from Firestore
- ✅ Product detail pages will work
- ✅ Admin dashboard will allow creating, editing, and deleting products