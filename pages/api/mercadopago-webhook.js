// Webhook handler for MercadoPago payment notifications
// This runs on the server when MercadoPago sends payment updates

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { type, data } = req.body;

    console.log('MercadoPago Webhook received:', {
      type,
      data,
      query: req.query,
    });

    // Handle different notification types
    switch (type) {
      case 'payment':
        // Payment notification
        const paymentId = data.id;
        console.log('Payment notification received:', paymentId);
        
        // TODO: Here you would:
        // 1. Verify the payment status with MercadoPago API
        // 2. Update your database with the payment status
        // 3. Send confirmation email to customer
        // 4. Deliver the digital product (ebook/course access)
        
        break;

      case 'merchant_order':
        // Merchant order notification
        console.log('Merchant order notification received:', data.id);
        break;

      default:
        console.log('Unknown notification type:', type);
    }

    // Always return 200 to acknowledge receipt
    return res.status(200).json({ success: true });

  } catch (error) {
    console.error('Webhook error:', error);
    
    // Still return 200 to prevent MercadoPago from retrying
    return res.status(200).json({ success: false, error: error.message });
  }
}
