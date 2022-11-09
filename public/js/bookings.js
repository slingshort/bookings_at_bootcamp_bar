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

document
  .querySelectorAll('.delete-btn')
  .forEach((element) => element.addEventListener('click', handleDelete));
