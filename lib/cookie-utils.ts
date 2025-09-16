export interface UserFormData {
  firstName: string;
  lastName: string;
  email: string;
}

/**
 * Get a cookie value by name
 */
export function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null; // SSR safety
  
  try {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop()?.split(';').shift() || null;
    }
    return null;
  } catch (error) {
    console.error('Error reading cookie:', error);
    return null;
  }
}

/**
 * Get user form data from plain cookie
 * Returns null if no data found or invalid data
 */
export function getUserFormData(): UserFormData | null {
  try {
    const cookieValue = getCookie('user-form-data');
    if (!cookieValue) return null;
    
    // Try to parse directly first, then with URL decoding if needed
    let data;
    try {
      data = JSON.parse(cookieValue);
    } catch {
      data = JSON.parse(decodeURIComponent(cookieValue));
    }
    
    // Validate the data structure
    if (data && typeof data === 'object' && 
        typeof data.firstName === 'string' && 
        typeof data.lastName === 'string' && 
        typeof data.email === 'string') {
      return data as UserFormData;
    }
    
    return null;
  } catch (error) {
    console.error('Error parsing user form data from cookie:', error);
    return null;
  }
}

/**
 * Clear user form data cookie
 */
export function clearUserFormData(): void {
  if (typeof document === 'undefined') return; // SSR safety
  
  try {
    document.cookie = 'user-form-data=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=reosm.com; path=/;';
  } catch (error) {
    console.error('Error clearing cookie:', error);
  }
}
