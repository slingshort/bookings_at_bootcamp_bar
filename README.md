# bookings_at_bootcamp_bar

## Resources used

- <https://github.com/necolas/normalize.css>
- <https://nodemailer.com/about/>

## APIs

### Capacity

Returns the number of available seats by seating time.

POST /api/capacity

```json
{
  "date": "07/11/2022"
}
```

Response

```json
[
  {
    "available": 15,
    "seating": "6 PM"
  },
  {
    "available": 15,
    "seating": "8 PM"
  }
]
```
