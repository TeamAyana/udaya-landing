// One-time script to update admin password
// Run this with: node update-admin-password.js

async function updateAdminPassword() {
  try {
    const response = await fetch('http://localhost:3000/api/admin/update-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        currentPassword: 'udaya2024',
        newPassword: '9WU8W5r!,fyn'
      })
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Password updated successfully!');
      console.log('You can now login with:');
      console.log('Email: admin@udaya.one');
      console.log('Password: 9WU8W5r!,fyn');
    } else {
      console.error('❌ Failed to update password:', data.error);
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log('Make sure your Next.js server is running on http://localhost:3000');
  }
}

updateAdminPassword();