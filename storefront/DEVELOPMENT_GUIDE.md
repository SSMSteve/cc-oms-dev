# Storefront Development Guide

## Getting Started

### Prerequisites
- Node.js 16 or higher
- npm or yarn
- Backend API running on `http://localhost:3001`

### Initial Setup
```bash
cd storefront
npm install
npm run dev
```

The app will be available at `http://localhost:5173`

---

## Project Structure Best Practices

### File Organization
```
src/
├── components/          # React components
├── styles/             # Component-specific CSS
├── assets/             # Images, icons, etc.
├── App.jsx             # Root component
├── main.jsx            # Entry point
└── index.css           # Global styles
```

### Component Structure
Each component should:
1. Import dependencies at top
2. Define component function
3. Manage state with hooks
4. Define helper functions
5. Return JSX
6. Export as default

**Example:**
```javascript
import { useState, useEffect } from 'react';
import '../styles/Component.css';

export default function Component({ prop1, prop2 }) {
  const [state, setState] = useState(null);

  useEffect(() => {
    // Side effects
  }, []);

  const handleAction = () => {
    // Handler logic
  };

  return (
    <div className="component">
      {/* JSX */}
    </div>
  );
}
```

---

## Coding Standards

### Naming Conventions
- **Components:** PascalCase (ProductCatalog.jsx)
- **Functions:** camelCase (handleCheckout)
- **Constants:** UPPER_SNAKE_CASE (STATUS_OPTIONS)
- **CSS Classes:** kebab-case (.product-card)
- **State variables:** camelCase (cartItems)

### Component Props
Always define prop types in comments:
```javascript
export default function Component({
  items,           // Array - List of items
  onUpdate,        // Function - Callback on update
  isLoading        // Boolean - Loading state
}) {
  // ...
}
```

### State Management
- Keep state as close to where it's used as possible
- Lift state up only when needed by multiple components
- Use descriptive state names
- Initialize state with appropriate default values

---

## API Integration

### Making API Calls
```javascript
const fetchData = async () => {
  try {
    setLoading(true);
    setError(null);
    
    const response = await fetch('http://localhost:3001/api/endpoint');
    
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    
    const data = await response.json();
    setData(data);
  } catch (err) {
    setError(err.message);
    console.error('Error:', err);
  } finally {
    setLoading(false);
  }
};
```

### Error Handling
- Always use try-catch blocks
- Set error state for UI display
- Log errors to console for debugging
- Provide user-friendly error messages
- Include retry buttons for failed requests

### API URL Configuration
Currently hardcoded in App.jsx:
```javascript
const API_URL = 'http://localhost:3001/api';
```

**For production:** Create environment variables
```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
```

---

## Styling Guidelines

### CSS Organization
- One CSS file per component
- Use descriptive class names
- Group related styles together
- Use CSS Grid for layouts
- Use Flexbox for alignment

### Responsive Design
```css
/* Mobile first approach */
.container {
  display: grid;
  grid-template-columns: 1fr;
}

/* Tablet and up */
@media (min-width: 768px) {
  .container {
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

### Color Scheme
- Primary: #007bff (blue)
- Success: #28a745 (green)
- Warning: #ffc107 (yellow)
- Danger: #dc3545 (red)
- Status colors defined in components

---

## Common Tasks

### Adding a New Component

1. Create component file in `src/components/`
```javascript
// src/components/NewComponent.jsx
import { useState } from 'react';
import '../styles/NewComponent.css';

export default function NewComponent({ prop }) {
  const [state, setState] = useState(null);

  return (
    <div className="new-component">
      {/* JSX */}
    </div>
  );
}
```

2. Create CSS file in `src/styles/`
```css
/* src/styles/NewComponent.css */
.new-component {
  /* styles */
}
```

3. Import in App.jsx
```javascript
import NewComponent from './components/NewComponent';
```

4. Use in App.jsx
```javascript
{currentPage === 'new' && <NewComponent />}
```

---

### Adding a New API Endpoint

1. Create fetch function in component or App.jsx
```javascript
const fetchNewData = async () => {
  try {
    const response = await fetch(`${API_URL}/new-endpoint`);
    if (!response.ok) throw new Error('Failed');
    const data = await response.json();
    setData(data);
  } catch (err) {
    setError(err.message);
  }
};
```

2. Call in useEffect
```javascript
useEffect(() => {
  fetchNewData();
}, []);
```

---

### Modifying Component Props

1. Update component function signature
2. Update all parent components passing props
3. Update prop documentation comments
4. Test component with new props

---

## Debugging

### Browser DevTools
- **Console:** Check for errors and logs
- **Network:** Monitor API calls
- **React DevTools:** Inspect component state and props
- **Performance:** Check rendering performance

### Common Issues

**API calls not working:**
- Check backend is running on port 3001
- Verify API URL in code
- Check network tab for request/response
- Look for CORS errors

**Components not rendering:**
- Check console for errors
- Verify component is imported
- Check conditional rendering logic
- Verify props are passed correctly

**Styling issues:**
- Check CSS file is imported
- Verify class names match
- Check CSS specificity
- Use browser DevTools to inspect

---

## Testing

### Manual Testing Checklist
- [ ] All components render without errors
- [ ] API calls work correctly
- [ ] Form validation works
- [ ] Error states display properly
- [ ] Loading states display properly
- [ ] Navigation between tabs works
- [ ] Cart operations work (add, remove, update)
- [ ] Order creation works
- [ ] Order status updates work
- [ ] Search functionality works
- [ ] Responsive design works on mobile

---

## Performance Optimization

### Current Optimizations
- Client-side search (no API call)
- Conditional rendering of components
- useEffect dependencies properly set

### Future Optimizations
- Implement pagination for products/orders
- Add caching for API responses
- Use React.memo for expensive components
- Implement lazy loading for images
- Code splitting with React.lazy

---

## Deployment

### Build for Production
```bash
npm run build
```

### Output
- `dist/` folder contains production build
- All assets are minified and optimized
- Source maps are generated

### Deployment Steps
1. Build the app: `npm run build`
2. Upload `dist/` folder to web server
3. Configure backend API URL for production
4. Ensure CORS is enabled on backend
5. Test all functionality in production

### Environment Variables
Create `.env` file:
```
VITE_API_URL=https://api.example.com
```

Access in code:
```javascript
const API_URL = import.meta.env.VITE_API_URL;
```

---

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9
```

### Dependencies Issues
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Errors
```bash
# Check for linting errors
npm run lint

# Fix linting errors
npm run lint -- --fix
```

---

## Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [MDN Web Docs](https://developer.mozilla.org)
- [CSS-Tricks](https://css-tricks.com)

---

## Contributing

### Code Review Checklist
- [ ] Code follows naming conventions
- [ ] Components are properly documented
- [ ] Error handling is implemented
- [ ] Loading states are handled
- [ ] Responsive design is tested
- [ ] No console errors or warnings
- [ ] API calls use proper error handling
- [ ] CSS is organized and clean

---

## Support

For issues or questions:
1. Check existing documentation
2. Review component code
3. Check browser console for errors
4. Review network requests in DevTools
5. Check backend logs

