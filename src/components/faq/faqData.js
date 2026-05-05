/** FAQ copy grouped by storefront category — tune in CMS later if needed */

export const FAQ_CATEGORIES = [
  {
    id: "ordering",
    label: "Ordering",
    items: [
      {
        id: "place-order",
        question: "How do I place an order?",
        answer:
          "Browse our catalog, add items to your cart, and checkout securely. You’ll confirm shipping and payment in one flow; we’ll email an order summary with tracking once your package ships.",
      },
      {
        id: "guest",
        question: "Do I need an account to place an order?",
        answer:
          "You can checkout as a guest. Creating an account saves addresses and order history and makes returns faster—we recommend it if you shop with us often.",
      },
      {
        id: "change-cancel",
        question: "Can I change or cancel my order after placing it?",
        answer:
          "Contact us as soon as possible. If the order hasn’t shipped, we’ll try to update or cancel it. Once it’s with the carrier, you can use our return flow after delivery.",
      },
      {
        id: "payment-methods",
        question: "Which payment methods do you accept?",
        answer:
          "We accept major credit and debit cards and other methods shown at checkout. Your payment is processed securely; we never store full card numbers on our servers.",
      },
    ],
  },
  {
    id: "shipping",
    label: "Shipping",
    items: [
      {
        id: "shipping-time",
        question: "How long does shipping take?",
        answer:
          "Most orders ship within 3-5 business days. Transit time depends on your region—you’ll receive tracking details by email as soon as your label is created.",
      },
      {
        id: "shipping-cost",
        question: "How much does shipping cost?",
        answer:
          "Rates are calculated at checkout based on size, weight, and destination. Promotional free-shipping thresholds appear on the cart page when available.",
      },
      {
        id: "international",
        question: "Do you ship internationally?",
        answer:
          "Where we offer international delivery, options and duties will be shown at checkout. Some oversized pieces may be restricted—contact us for a quote.",
      },
      {
        id: "tracking",
        question: "How do I track my package?",
        answer:
          "Use the tracking link in your shipment email or sign in and open order details. Tracking may take up to 24 hours to show movement after the label is printed.",
      },
    ],
  },
  {
    id: "returns",
    label: "Returns",
    items: [
      {
        id: "return-window",
        question: "What is your return window?",
        answer:
          "Most items qualify for returns within 30 days of delivery if unused and in original packaging. Final-sale pieces are marked clearly on the product page.",
      },
      {
        id: "start-return",
        question: "How do I start a return?",
        answer:
          "From your account orders page, choose the item and follow the prompts—or email support with your order number. We’ll send instructions and a label when eligible.",
      },
      {
        id: "refund-time",
        question: "When will I receive my refund?",
        answer:
          "After we receive and inspect your return, refunds typically post within 5–10 business days to your original payment method, depending on your bank.",
      },
      {
        id: "exchange",
        question: "Can I exchange instead of return?",
        answer:
          "When inventory allows, we can help with an exchange. Contact us with your order number and the item you’d prefer—we’ll confirm availability and next steps.",
      },
    ],
  },
  {
    id: "subscribe",
    label: "Subscribe & save",
    items: [
      {
        id: "what-is-subscribe",
        question: "What is Subscribe & save?",
        answer:
          "Subscribe & save is for replenishable items—think care products or accessories—delivered on your schedule with a discount on each shipment.",
      },
      {
        id: "manage-subscription",
        question: "How do I skip, pause, or cancel?",
        answer:
          "Manage deliveries from your account under Subscriptions. You can change frequency, skip a shipment, pause, or cancel before the next charge date.",
      },
      {
        id: "subscribe-discount",
        question: "Is the discount locked in?",
        answer:
          "Your subscriber price applies for active subscriptions. If our base price changes, we’ll notify you before your next billing cycle where required.",
      },
    ],
  },
];

export const FAQ_CONTACT = {
  phone: "+1-222-333-4444",
  phoneHref: "tel:+12223334444",
  phoneHours: "Monday to Friday: 9 AM - 5 PM EST",
  email: "support@example.com",
  emailHref: "mailto:support@example.com",
  emailHours: "Monday to Sunday: 24/7",
};
