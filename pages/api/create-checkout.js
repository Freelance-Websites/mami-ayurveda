// API Route for creating MercadoPago checkout preference
// This runs on the server (as a serverless function on Netlify)

import { MercadoPagoConfig, Preference } from 'mercadopago';
import { getProductBySlug } from '../../lib/products';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { category, productSlug, email, name, phone } = req.body;

    // Validate required fields
    if (!category || !productSlug) {
      return res.status(400).json({ 
        error: 'Missing required fields: category and productSlug' 
      });
    }

    // Log user info (optional - for debugging)
    if (email && name) {
      console.log('Checkout initiated by:', { name, email, phone });
    }

    // Get product data
    const product = getProductBySlug(category, productSlug);

    if (!product) {
      return res.status(404).json({ 
        error: 'Product not found' 
      });
    }

    // Validate that product has a price
    if (!product.price || product.price <= 0) {
      return res.status(400).json({ 
        error: 'Product does not have a valid price' 
      });
    }

    // Initialize MercadoPago client
    const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;
    
    if (!accessToken) {
      console.error('MERCADOPAGO_ACCESS_TOKEN is not configured');
      return res.status(500).json({ 
        error: 'Payment system is not configured. Please contact support.' 
      });
    }

    const client = new MercadoPagoConfig({ 
      accessToken: accessToken 
    });

    const preference = new Preference(client);

    // Clean product title (remove HTML tags)
    const cleanTitle = product.title.replace(/<[^>]*>/g, '');

    // Get the base URL for callbacks
    let fullBaseUrl = process.env.NEXT_PUBLIC_SITE_URL;
    
    // If not set in env, construct from request headers
    if (!fullBaseUrl) {
      const protocol = req.headers['x-forwarded-proto'] || 'http';
      const host = req.headers.host;
      fullBaseUrl = `${protocol}://${host}`;
    }
    
    // Remove trailing slash if present
    fullBaseUrl = fullBaseUrl.replace(/\/$/, '');

    console.log('Using base URL:', fullBaseUrl);

    // Determine if we should enable auto_return
    // Only enable for non-localhost URLs as MercadoPago may have issues with localhost
    const isLocalhost = fullBaseUrl.includes('localhost') || fullBaseUrl.includes('127.0.0.1');
    
    // Create preference body
    const preferenceBody = {
      items: [
        {
          title: cleanTitle,
          quantity: 1,
          unit_price: product.price,
          currency_id: 'ARS', // Argentine Peso - change if needed
          description: product.text ? product.text.replace(/<[^>]*>/g, '').substring(0, 250) : '',
        }
      ],
      back_urls: {
        success: `${fullBaseUrl}/checkout/success`,
        failure: `${fullBaseUrl}/checkout/${category}/${productSlug}?error=payment_failed`,
        pending: `${fullBaseUrl}/checkout/pending`,
      },
      statement_descriptor: 'MAMI AYURVEDA',
      external_reference: `${category}-${productSlug}-${Date.now()}`,
      metadata: {
        category: category,
        product_slug: productSlug,
        product_type: product.categoryDisplay,
      },
    };
    
    // Only add auto_return for non-localhost environments
    if (!isLocalhost) {
      preferenceBody.auto_return = 'approved';
    }

    // Add payer information if provided
    if (email || name || phone) {
      preferenceBody.payer = {
        email: email || '',
        name: name || '',
        phone: phone ? {
          number: phone.replace(/\D/g, ''), // Remove non-numeric characters
        } : undefined,
      };
      
      // Also add to metadata for tracking
      preferenceBody.metadata = {
        ...preferenceBody.metadata,
        customer_name: name,
        customer_email: email,
        customer_phone: phone,
      };
    }

    // Log preference details for debugging
    console.log('Creating preference with body:', JSON.stringify(preferenceBody, null, 2));

    // Create the preference
    const response = await preference.create({ body: preferenceBody });

    // Return the checkout URL
    return res.status(200).json({
      success: true,
      checkoutUrl: response.init_point, // URL to redirect user to MercadoPago checkout
      preferenceId: response.id,
    });

  } catch (error) {
    console.error('Error creating checkout:', error);
    
    // Return appropriate error message
    return res.status(500).json({
      error: 'Failed to create checkout. Please try again.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
}
