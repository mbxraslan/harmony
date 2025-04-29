# Harmony Carers Website

A modern, responsive website for Harmony Carers, an NDIS provider offering disability support services.

## Features

- Responsive design that works on mobile, tablet, and desktop
- Modern UI with smooth animations and transitions
- Accessible navigation and content structure
- Interactive elements including:
  - Testimonial slider
  - Contact form with validation
  - Mobile-friendly navigation menu
  - Back-to-top button
  - Smooth scrolling

## Project Structure

```
harmony-carers/
├── css/
│   └── styles.css       # Main stylesheet
├── js/
│   └── main.js          # JavaScript functionality
├── images/              # Image assets directory
└── index.html           # Main HTML file
```

## Getting Started

To view the website locally:

1. Clone or download this repository
2. Open `index.html` in your web browser

## Customization

### Replacing Placeholder Images

The website currently uses placeholder images. Replace them with actual images by:

1. Adding your images to the `images/` directory
2. Updating the image paths in `index.html`

### Customizing Colors

The color scheme can be easily modified by changing the CSS variables in the `:root` selector in `styles.css`.

### Contact Form

The contact form is currently set up for front-end validation only. To make it functional:

1. Set up a server to handle form submissions
2. Update the form action and method attributes in `index.html`
3. Modify the form submission handler in `main.js`

## Browser Support

This website is compatible with:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is licensed under the MIT License - see the LICENSE file for details.
