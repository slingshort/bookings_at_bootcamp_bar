const handleDelete = async (event) => {
  const bookingId = event.target.getAttribute('data-booking-id');

  const response = await fetch(`/api/bookings/${bookingId}`, {
    method: 'delete',
    headers: { 'Content-Type': 'application/json' },
  });
  if (response.ok) {
    location.reload();
    return;
  } else {
    alert(response.statusText);
  }
};

async function handleLogout() {
  const response = await fetch('/api/logout', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert(response.statusText);
  }
}

document.querySelector('#logoutBtn').addEventListener('click', handleLogout);

document
  .querySelectorAll('.delete-btn')
  .forEach((element) => element.addEventListener('click', handleDelete));
