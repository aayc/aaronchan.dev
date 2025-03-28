import mixpanel from 'mixpanel-browser';

// Mixpanel token should be stored in environment variables in production
const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN || 'your-token-here';

// Initialize Mixpanel
if (typeof window !== 'undefined') {
  mixpanel.init(MIXPANEL_TOKEN, { debug: process.env.NODE_ENV !== 'production' });
}

// Track page views
export const trackPageView = (pageName: string) => {
  mixpanel.track('Page View', { page: pageName });
};

// Track user actions
export const trackAction = (actionName: string, properties?: Record<string, any>) => {
  mixpanel.track(actionName, properties);
};

// Identify a user (when you have user data)
export const identifyUser = (userId: string, userProperties?: Record<string, any>) => {
  mixpanel.identify(userId);
  if (userProperties) {
    mixpanel.people.set(userProperties);
  }
};

// Reset user identification on logout
export const reset = () => {
  mixpanel.reset();
};

const mixpanelTracker = {
  trackPageView,
  trackAction,
  identifyUser,
  reset,
};

export default mixpanelTracker; 