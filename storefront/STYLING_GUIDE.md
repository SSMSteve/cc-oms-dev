# Styling Guide

## CSS Architecture

The storefront uses a **component-scoped CSS** approach where each component has its own CSS file.

### File Structure
```
src/
├── index.css                    # Global styles
├── App.css                      # App layout
└── styles/
    ├── ProductCatalog.css       # Product component
    ├── ShoppingCart.css         # Cart component
    └── OrderManagement.css      # Order components
```

---

## Global Styles (index.css)

### Base Styles
- Reset default browser styles
- Define global font family
- Set base colors and spacing
- Define global button and input styles

### Color Palette
```css
/* Primary Colors */
--primary: #007bff;
--success: #28a745;
--warning: #ffc107;
--danger: #dc3545;
--info: #17a2b8;

/* Neutral Colors */
--dark: #343a40;
--light: #f8f9fa;
--gray: #6c757d;
--border: #dee2e6;
```

### Typography
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
font-size: 16px;
line-height: 1.5;
```

---

## Component Styles

### ProductCatalog.css

**Layout:**
- Grid layout for product cards
- Responsive columns (1 → 2 → 3)
- Search input styling

**Key Classes:**
```css
.product-catalog          /* Container */
.catalog-header           /* Header with title and search */
.search-input             /* Search input field */
.products-grid            /* Grid container */
.product-card             /* Individual product card */
.product-image            /* Product image container */
.product-price            /* Price display */
.add-to-cart-btn          /* Add to cart button */
.no-products              /* Empty state */
```

**Responsive Breakpoints:**
```css
/* Mobile: 1 column */
.products-grid {
  grid-template-columns: 1fr;
}

/* Tablet: 2 columns */
@media (min-width: 768px) {
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Desktop: 3 columns */
@media (min-width: 1024px) {
  .products-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

---

### ShoppingCart.css

**Layout:**
- Two-column layout (items + checkout)
- Responsive stacking on mobile
- Form styling

**Key Classes:**
```css
.shopping-cart            /* Container */
.cart-container           /* Main layout container */
.cart-items               /* Items list */
.cart-item                /* Individual item */
.item-quantity            /* Quantity controls */
.qty-btn                  /* +/- buttons */
.qty-input                /* Quantity input */
.checkout-form            /* Checkout form */
.form-group               /* Form field */
.order-summary            /* Order summary */
.summary-row              /* Summary row */
.checkout-btn             /* Checkout button */
.error-message            /* Error display */
.empty-cart               /* Empty state */
```

**Responsive Design:**
```css
/* Mobile: Stack vertically */
.cart-container {
  display: flex;
  flex-direction: column;
}

/* Desktop: Side by side */
@media (min-width: 768px) {
  .cart-container {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 2rem;
  }
}
```

---

### OrderManagement.css

**Layout:**
- Card-based layout for orders
- Expandable details
- Table for order items
- Timeline for status history

**Key Classes:**
```css
.order-management         /* Container */
.orders-list              /* Orders list */
.order-card               /* Order card */
.order-header             /* Card header (clickable) */
.order-info               /* Order info section */
.order-meta               /* Order metadata */
.status-badge             /* Status badge */
.order-details            /* Expandable details */
.order-items              /* Items section */
.items-table              /* Items table */
.order-status-section     /* Status update section */
.status-select            /* Status dropdown */
.status-notes             /* Notes textarea */
.order-history            /* History section */
.history-timeline         /* Timeline container */
.history-entry            /* Timeline entry */
.order-footer             /* Footer section */
.delete-btn               /* Delete button */
.no-orders                /* Empty state */
```

---

## App.css

**Layout:**
- Header with navigation
- Main content area
- Navigation tabs

**Key Classes:**
```css
.app                      /* Root container */
.app-header               /* Header */
.nav                      /* Navigation */
.nav-btn                  /* Nav button */
.nav-btn.active           /* Active nav button */
.app-main                 /* Main content */
```

---

## Color Scheme

### Status Colors
```javascript
pending:    #ffa500  (Orange)
processing: #4169e1  (Blue)
shipped:    #9370db  (Purple)
delivered:  #32cd32  (Green)
cancelled:  #dc143c  (Red)
```

### Button Colors
```css
.add-to-cart-btn    /* Primary button */
.checkout-btn       /* Success button */
.delete-btn         /* Danger button */
.qty-btn            /* Secondary button */
```

---

## Responsive Design

### Breakpoints
```css
/* Mobile: < 768px */
/* Tablet: 768px - 1023px */
/* Desktop: >= 1024px */
```

### Mobile-First Approach
1. Write styles for mobile first
2. Add media queries for larger screens
3. Use `min-width` for progressive enhancement

**Example:**
```css
/* Mobile */
.container {
  display: block;
}

/* Tablet and up */
@media (min-width: 768px) {
  .container {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .container {
    grid-template-columns: 1fr 1fr 1fr;
  }
}
```

---

## Common Patterns

### Flexbox Layout
```css
.flex-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}
```

### Grid Layout
```css
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}
```

### Card Component
```css
.card {
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}
```

### Button Styles
```css
.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

### Form Styles
```css
input, textarea, select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
  font-family: inherit;
}

input:focus, textarea:focus, select:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
}
```

---

## Spacing System

### Margin & Padding
```css
/* Use consistent spacing */
0.25rem  /* 4px */
0.5rem   /* 8px */
1rem     /* 16px */
1.5rem   /* 24px */
2rem     /* 32px */
3rem     /* 48px */
```

### Gap (Flexbox/Grid)
```css
gap: 0.5rem;   /* Tight spacing */
gap: 1rem;     /* Normal spacing */
gap: 1.5rem;   /* Loose spacing */
gap: 2rem;     /* Extra loose spacing */
```

---

## Typography

### Font Sizes
```css
h1: 2rem      (32px)
h2: 1.5rem    (24px)
h3: 1.25rem   (20px)
h4: 1rem      (16px)
p:  0.9rem    (14px)
```

### Font Weights
```css
normal:  400
medium:  500
bold:    700
```

---

## Transitions & Animations

### Smooth Transitions
```css
transition: all 0.3s ease;
transition: background-color 0.2s ease;
transition: transform 0.3s ease;
```

### Hover Effects
```css
.interactive:hover {
  background-color: #f0f0f0;
  transform: translateY(-2px);
}
```

---

## Accessibility

### Color Contrast
- Ensure sufficient contrast ratio (4.5:1 for text)
- Don't rely on color alone for information
- Use status badges with text labels

### Focus States
```css
button:focus {
  outline: 2px solid #007bff;
  outline-offset: 2px;
}
```

### Readable Text
- Minimum font size: 14px
- Line height: 1.5 or greater
- Adequate spacing between elements

---

## Performance Tips

1. **Minimize CSS:** Remove unused styles
2. **Use CSS Grid/Flexbox:** Better than floats
3. **Avoid deep nesting:** Keep specificity low
4. **Use shorthand:** `margin: 1rem` vs `margin-top: 1rem`
5. **Optimize images:** Use appropriate formats and sizes

---

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile browsers: Latest versions

---

## Customization

### Changing Colors
Update status colors in component files:
```javascript
const STATUS_COLORS = {
  pending: '#your-color',
  processing: '#your-color',
  // ...
};
```

### Changing Fonts
Update in `index.css`:
```css
body {
  font-family: 'Your Font', sans-serif;
}
```

### Changing Spacing
Update gap and padding values in CSS files.

---

## Resources

- [MDN CSS Guide](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [CSS-Tricks](https://css-tricks.com)
- [Web.dev](https://web.dev)
- [Can I Use](https://caniuse.com)