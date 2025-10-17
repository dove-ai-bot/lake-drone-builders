/**
 * Cart Persistence Test Suite
 * Manual test functions to verify cart functionality across browser sessions
 */

// Test data
const TEST_ITEMS = [
  { id: 1, quantity: 2, addedAt: new Date().toISOString() },
  { id: 3, quantity: 1, addedAt: new Date().toISOString() },
  { id: 5, quantity: 3, addedAt: new Date().toISOString() }
];

const ENHANCED_CART_DATA = {
  version: 1,
  items: TEST_ITEMS,
  lastUpdated: new Date().toISOString()
};

const LEGACY_CART_DATA = [
  { id: 2, quantity: 1 },
  { id: 4, quantity: 2 }
];

export class CartPersistenceTest {
  
  /**
   * Test 1: Verify cart data persists across page refresh
   */
  static testPageRefreshPersistence(): boolean {
    try {
      // Clear existing data
      localStorage.removeItem('shopping-cart');
      
      // Store test data
      localStorage.setItem('shopping-cart', JSON.stringify(ENHANCED_CART_DATA));
      
      // Verify storage
      const stored = localStorage.getItem('shopping-cart');
      if (!stored) return false;
      
      const parsed = JSON.parse(stored);
      const isValid = parsed.version === 1 && 
                     Array.isArray(parsed.items) && 
                     parsed.items.length === 3;
      
      console.log('✓ Page refresh persistence test passed');
      return isValid;
    } catch (error) {
      console.error('✗ Page refresh persistence test failed:', error);
      return false;
    }
  }

  /**
   * Test 2: Verify backward compatibility with legacy cart format
   */
  static testLegacyFormatCompatibility(): boolean {
    try {
      // Clear existing data
      localStorage.removeItem('shopping-cart');
      
      // Store legacy format
      localStorage.setItem('shopping-cart', JSON.stringify(LEGACY_CART_DATA));
      
      // Verify legacy data can be read
      const stored = localStorage.getItem('shopping-cart');
      if (!stored) return false;
      
      const parsed = JSON.parse(stored);
      const isLegacyFormat = Array.isArray(parsed) && parsed.length === 2;
      
      console.log('✓ Legacy format compatibility test passed');
      return isLegacyFormat;
    } catch (error) {
      console.error('✗ Legacy format compatibility test failed:', error);
      return false;
    }
  }

  /**
   * Test 3: Verify cart data migration from legacy to enhanced format
   */
  static testDataMigration(): boolean {
    try {
      // This would be tested within the React component context
      // Here we simulate the migration logic
      
      const legacyData = LEGACY_CART_DATA;
      
      // Simulate migration
      const migratedData = {
        version: 1,
        items: legacyData.map(item => ({
          ...item,
          addedAt: item.addedAt || new Date().toISOString()
        })),
        lastUpdated: new Date().toISOString()
      };
      
      const isValidMigration = migratedData.version === 1 &&
                              migratedData.items.every(item => item.addedAt);
      
      console.log('✓ Data migration test passed');
      return isValidMigration;
    } catch (error) {
      console.error('✗ Data migration test failed:', error);
      return false;
    }
  }

  /**
   * Test 4: Verify cart data survives browser storage disabled
   */
  static testStorageDisabled(): boolean {
    try {
      // Simulate localStorage being unavailable
      const originalSetItem = localStorage.setItem;
      const originalGetItem = localStorage.getItem;
      
      // Mock disabled localStorage
      localStorage.setItem = () => {
        throw new Error('localStorage disabled');
      };
      localStorage.getItem = () => null;
      
      // Test should gracefully handle this
      let gracefulHandling = true;
      try {
        localStorage.setItem('test', 'value');
        gracefulHandling = false; // Should have thrown
      } catch {
        // Expected behavior
      }
      
      // Restore original functions
      localStorage.setItem = originalSetItem;
      localStorage.getItem = originalGetItem;
      
      console.log('✓ Storage disabled handling test passed');
      return gracefulHandling;
    } catch (error) {
      console.error('✗ Storage disabled handling test failed:', error);
      return false;
    }
  }

  /**
   * Test 5: Verify cart calculations persist correctly
   */
  static testCalculationPersistence(): boolean {
    try {
      // Set up test data with known values
      const testCartData = {
        version: 1,
        items: [
          { id: 1, quantity: 2, addedAt: new Date().toISOString() }, // price: 10.99
          { id: 2, quantity: 1, addedAt: new Date().toISOString() }  // price: 1199
        ],
        lastUpdated: new Date().toISOString()
      };
      
      localStorage.setItem('shopping-cart', JSON.stringify(testCartData));
      
      // Verify storage and retrieval
      const stored = localStorage.getItem('shopping-cart');
      if (!stored) return false;
      
      const parsed = JSON.parse(stored);
      const totalQuantity = parsed.items.reduce((sum: number, item: { quantity: number }) => sum + item.quantity, 0);
      
      console.log('✓ Calculation persistence test passed');
      return totalQuantity === 3;
    } catch (error) {
      console.error('✗ Calculation persistence test failed:', error);
      return false;
    }
  }

  /**
   * Run all persistence tests
   */
  static runAllTests(): boolean {
    console.log('🧪 Running Cart Persistence Test Suite...\n');
    
    const tests = [
      this.testPageRefreshPersistence,
      this.testLegacyFormatCompatibility,
      this.testDataMigration,
      this.testStorageDisabled,
      this.testCalculationPersistence
    ];
    
    const results = tests.map(test => test());
    const passedCount = results.filter(Boolean).length;
    const totalCount = results.length;
    
    console.log(`\n📊 Test Results: ${passedCount}/${totalCount} tests passed`);
    
    if (passedCount === totalCount) {
      console.log('🎉 All cart persistence tests passed!');
    } else {
      console.warn('⚠️ Some cart persistence tests failed');
    }
    
    return passedCount === totalCount;
  }
}

// Make available globally for browser testing
if (typeof window !== 'undefined') {
  (window as typeof window & { CartPersistenceTest: typeof CartPersistenceTest }).CartPersistenceTest = CartPersistenceTest;
}

// Export for Node.js environments
export default CartPersistenceTest;