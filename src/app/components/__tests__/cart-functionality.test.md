# Cart Functionality Manual Test Guide

## Test Overview
This document provides manual test cases for the enhanced industrial cart functionality implemented in Story 1.7.

## Test Cases

### TC-01: Cart Open/Close Functionality
**Objective**: Verify cart can be opened and closed properly
**Steps**:
1. Navigate to the main page
2. Click the cart icon in navigation
3. Verify cart drawer slides in from right
4. Click the "×" close button
5. Verify cart drawer slides out

**Expected Results**:
- Cart opens with industrial styling and "PROCUREMENT REQUISITION FORM" header
- Close button responds with industrial button styling
- Animation is smooth (300ms transition)
- Backdrop is clickable to close cart

### TC-02: Empty Cart State
**Objective**: Verify empty cart displays proper industrial messaging
**Steps**:
1. Ensure cart is empty (clear localStorage if needed)
2. Open cart

**Expected Results**:
- "NO ACTIVE REQUISITIONS" header displayed
- "No items in procurement queue" message shown
- Industrial warning icon displayed
- "BROWSE INVENTORY" button present and functional

### TC-03: Add Items to Cart
**Objective**: Verify items can be added with enhanced data structure
**Steps**:
1. Navigate to products page
2. Add 1x "Pre-famulated Amulite baseplate" to cart
3. Add 2x "Turbo Encabulator" to cart
4. Open cart

**Expected Results**:
- Items display as "REQUISITION LINE ITEMS"
- Part numbers shown in monospace font (LDB-1-X, LDB-2-X)
- Stock status displayed with appropriate colors
- Certifications shown as industrial badges
- Added timestamp stored in localStorage

### TC-04: Quantity Controls
**Objective**: Test industrial quantity control functionality
**Steps**:
1. Open cart with items
2. Use "+" button to increase quantity
3. Use "−" button to decrease quantity
4. Verify minimum quantity of 1

**Expected Results**:
- Quantity controls have industrial metal styling
- Buttons respond with mechanical feel
- Quantity updates immediately
- Cannot decrease below 1
- Local storage updates with changes

### TC-05: Item Removal
**Objective**: Test removal confirmation workflow
**Steps**:
1. Open cart with items
2. Click "REMOVE FROM REQUISITION" button
3. Verify confirmation prompt appears
4. Test both "YES" and "NO" options

**Expected Results**:
- Warning-style remove button displayed
- Confirmation shows "CONFIRM REMOVAL?" message
- YES removes item completely
- NO cancels removal action
- Industrial button styling maintained

### TC-06: Procurement Summary
**Objective**: Verify industrial pricing calculations
**Steps**:
1. Add multiple items to cart
2. Open cart and scroll to bottom
3. Verify all pricing calculations

**Expected Results**:
- "PROCUREMENT SUMMARY" header shown
- Subtotal calculated correctly
- HAZMAT fee added for applicable items
- Certification surcharge of $15.50 applied
- Total calculation accurate
- "PROCESS PURCHASE ORDER" button functional

### TC-07: Data Persistence
**Objective**: Test enhanced cart data structure persistence
**Steps**:
1. Add items to cart
2. Refresh page
3. Open cart
4. Check browser localStorage

**Expected Results**:
- Items persist across page refreshes
- Enhanced data structure stored (version, timestamps)
- Backward compatibility maintained with old cart data

### TC-08: Responsive Behavior
**Objective**: Test cart behavior across screen sizes
**Steps**:
1. Test cart on mobile (< 768px)
2. Test cart on tablet (768px - 1024px)
3. Test cart on desktop (> 1024px)

**Expected Results**:
- Mobile: Full-screen overlay
- Tablet: Wider drawer (400-500px)
- Desktop: Drawer from right side
- All touch targets minimum 44px
- Industrial styling maintained at all sizes

### TC-09: Accessibility
**Objective**: Verify WCAG 2.1 AA compliance
**Steps**:
1. Test with keyboard navigation
2. Test with screen reader
3. Verify ARIA labels and roles

**Expected Results**:
- Cart operable with keyboard only
- Proper ARIA roles (dialog, modal)
- Screen reader announcements correct
- Color contrast meets standards

### TC-10: Process Purchase Order
**Objective**: Test checkout integration placeholder
**Steps**:
1. Add items to cart
2. Click "PROCESS PURCHASE ORDER"

**Expected Results**:
- "Coming Soon" alert displayed
- Future checkout functionality placeholder working
- Industrial button styling maintained

## Test Completion Checklist
- [ ] TC-01: Cart Open/Close ✓
- [ ] TC-02: Empty Cart State ✓
- [ ] TC-03: Add Items ✓
- [ ] TC-04: Quantity Controls ✓
- [ ] TC-05: Item Removal ✓
- [ ] TC-06: Procurement Summary ✓
- [ ] TC-07: Data Persistence ✓
- [ ] TC-08: Responsive Behavior ✓
- [ ] TC-09: Accessibility ✓
- [ ] TC-10: Purchase Order ✓

## Test Environment
- Browser: Chrome/Firefox/Safari latest
- Viewport: 320px - 1920px
- Operating System: Any modern OS
- Network: Any connection speed

## Notes
All tests should be performed with and without the `prefers-reduced-motion` accessibility setting to ensure animations respect user preferences.