let capacity;

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

const handleDateChange = async (event) => {
  const date = event.target.value;
  const response = await fetch('/api/capacity', {
    method: 'post',
    body: JSON.stringify({
      date,
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    const data = await response.json();
    if (data) {
      capacity = data;
      const seating1El = document.getElementById('seating1');
      const seating2El = document.getElementById('seating2');
      seating1El.innerText = `6PM (${data['6PM']} available)`;
      seating2El.innerText = `8PM (${data['8PM']} available)`;
    }
  }
};

const handleBooking = async (event) => {
  event.preventDefault();
  const date = document.getElementById('date').value;
  const seating = parseInt(document.getElementById('seating').value);
  const seats = document.getElementById('seats').value;

  if (seating === 1 && capacity['6PM'] - seats < 0) {
    alert(`${seats} seats not available!`);
    return;
  }

  if (seating === 2 && capacity['8PM'] - seats < 0) {
    alert(`${seats} seats not available!`);
    return;
  }

  const response = await fetch('/api/bookings', {
    method: 'post',
    body: JSON.stringify({
      date,
      seating_id: seating,
      seats,
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    alert(response.statusText);
    location.reload();
  } else {
    alert(response.statusText);
  }
};

document.querySelector('#date').addEventListener('change', handleDateChange);
document.querySelector('#logoutBtn').addEventListener('click', handleLogout);

document
  .querySelector('#bookingForm')
  .addEventListener('submit', handleBooking);
document
  .querySelectorAll('.delete-btn')
  .forEach((element) => element.addEventListener('click', handleDelete));
