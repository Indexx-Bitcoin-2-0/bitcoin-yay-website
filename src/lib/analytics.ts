/**
 * Utility for tracking user events and pushing them to the GTM dataLayer.
 */

type AnalyticsEvent = {
  event: string;
  category?: string;
  action?: string;
  label?: string;
  value?: number;
  [key: string]: any;
};

/**
 * Pushes an event to the window.dataLayer.
 * Standard GTM approach for event tracking.
 */
export const trackEvent = (payload: AnalyticsEvent) => {
  if (typeof window !== "undefined") {
    // Initialize dataLayer if it doesn't exist
    window.dataLayer = window.dataLayer || [];
    
    // Log to console in development mode to help debugging
    if (process.env.NODE_ENV === "development") {
      console.log("📊 [Analytics Event]:", payload);
    }
    
    window.dataLayer.push(payload);
  }
};

/**
 * Specific tracking functions for better consistency
 */
export const analytics = {
  // Page Views
  trackPageView: (pageTitle: string) => {
    trackEvent({
      event: "page_view",
      page_title: pageTitle,
      page_location: typeof window !== "undefined" ? window.location.href : "",
    });
  },

  // Buy Flow
  trackBuyIntent: (data: { amount: number; currency: string; network?: string }) => {
    trackEvent({
      event: "buy_intent",
      category: "Ecommerce",
      action: "Initiate Buy",
      ...data,
    });
  },

  trackOrderCreated: (data: { order_id: string; amount: number; currency: string }) => {
    trackEvent({
      event: "order_created",
      category: "Ecommerce",
      action: "Order Created",
      ...data,
    });
  },

  trackPurchaseComplete: (data: { order_id: string; amount: number; currency: string }) => {
    trackEvent({
      event: "purchase_complete",
      category: "Ecommerce",
      action: "Purchase Successful",
      ...data,
    });
  },

  // Sell Flow
  trackSellIntent: (data: { amount: number }) => {
    trackEvent({
      event: "sell_intent",
      category: "Ecommerce",
      action: "Initiate Sell",
      ...data,
    });
  },

  trackSellSubmitted: (data: { amount: number }) => {
    trackEvent({
      event: "sell_submitted",
      category: "Ecommerce",
      action: "Sell Request Submitted",
      ...data,
    });
  },

  // General Errors/Popups
  trackError: (errorMsg: string, step: string) => {
    trackEvent({
      event: "flow_error",
      category: "Error",
      action: step,
      label: errorMsg,
    });
  },

  trackPopupOpen: (popupName: string) => {
    trackEvent({
      event: "popup_open",
      category: "UI",
      action: "Open",
      label: popupName,
    });
  },
};

// Extend Window interface for TypeScript
declare global {
  interface Window {
    dataLayer: any[];
  }
}
